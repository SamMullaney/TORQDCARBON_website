const Stripe = require('stripe');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const secret = process.env.STRIPE_SECRET_KEY;
        if (!secret || !secret.startsWith('sk_')) {
            return res.status(500).json({ error: 'Stripe secret key is not configured on the server.' });
        }
        const stripe = new Stripe(secret);

        const { cart, creatorCode, vehicleYMM, wheelImageFileId } = req.body || {};

        if (!Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ error: 'Invalid cart data or cart is empty' });
        }

        // Create file link for the wheel image if provided
        let wheelImageFileLink = null;
        if (wheelImageFileId) {
            try {
                wheelImageFileLink = await stripe.fileLinks.create({
                    file: wheelImageFileId,
                });
            } catch (error) {
                console.error('Error creating file link:', error);
            }
        }

        // Normalize and precompute validity for adding product metadata / discounts
        const creatorCodeDisplay = creatorCode ? String(creatorCode).trim() : '';
        const normalizedCode = creatorCodeDisplay.toLowerCase();
        const percentDiscountCodes = ['zayyxclusive','zayyxlcusive','soyerick','torqd','m3.cay','n63.heenz'];
        const percentDiscountActive = percentDiscountCodes.includes(normalizedCode);
        const redkeyActive = normalizedCode === 'redkey';
        const creatorCodeIsValidForMetadata = ['zayyxclusive','zayyxlcusive','soyerick','torqd','m3.cay','n63.heenz','redkey'].includes(normalizedCode);

        const preparedItems = cart.map((item, index) => {
            // Preset item flow
            if (item.type === 'preset') {
                const unit = Math.round(Number(item.price) * 100);
                if (!Number.isFinite(unit) || unit <= 0 || unit > 1000000) {
                    throw new Error(`Invalid preset item price at index ${index}`);
                }
                
                // Build description with YMM
                const descriptionParts = [];
                if (vehicleYMM) {
                    descriptionParts.push(`Vehicle: ${vehicleYMM}`);
                }
                if (creatorCodeDisplay) {
                    descriptionParts.push(`Creator Code: ${creatorCodeDisplay}`);
                }
                const description = descriptionParts.join(' | ');
                return {
                    unitAmount: unit,
                    lineItem: {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.variant ? `${item.name} - ${item.variant}` : item.name,
                                ...(description && { description }),
                                ...(wheelImageFileLink && { images: [wheelImageFileLink.url] }),
                                ...(creatorCodeIsValidForMetadata ? { metadata: { creator_code: String(creatorCode) } } : {})
                            },
                            unit_amount: unit,
                        },
                        quantity: 1,
                    }
                };
            }

            // Custom design flow
            if (!item.base || !item.sides || !item.topbottom) {
                throw new Error(`Invalid custom item data at index ${index}`);
            }

            let basePrice = 799.99;
            if (item.heating === 'yes') basePrice += 50;
            const unit = Math.round(basePrice * 100);
            if (!Number.isFinite(unit) || unit <= 0 || unit > 1000000) {
                throw new Error(`Invalid price calculation for item at index ${index}`);
            }

            // Build description with all details + YMM
            let customDescription = `Base: ${item.base}, Sides: ${item.sides}, Top/Bottom: ${item.topbottom}, Badge: ${String(item.badge || '').toUpperCase()}, Airbag: ${item.airbag}, Top Stripe: ${item.topStripe === 'yes' ? 'Yes' : 'No'}, Heating: ${item.heating === 'yes' ? 'Yes' : 'No'}, Trim Color: ${item.trimColor}${item.additionalSpecs ? `, Additional Specs: ${item.additionalSpecs}` : ''}`;
            if (vehicleYMM) {
                customDescription += ` | Vehicle: ${vehicleYMM}`;
            }
            if (creatorCodeDisplay) {
                customDescription += ` | Creator Code: ${creatorCodeDisplay}`;
            }

            return {
                unitAmount: unit,
                lineItem: {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Custom Steering Wheel - ${item.base}`,
                            description: customDescription,
                            ...(wheelImageFileLink && { images: [wheelImageFileLink.url] }),
                            ...(creatorCodeIsValidForMetadata ? { metadata: { creator_code: String(creatorCode) } } : {})
                        },
                        unit_amount: unit,
                    },
                    quantity: 1,
                }
            };
        });

        const lineItems = preparedItems.map(item => item.lineItem);

        if (lineItems.length > 0) {
            if (redkeyActive) {
                lineItems[0].price_data.unit_amount = 40999;
            } else if (percentDiscountActive) {
                const subtotalCents = preparedItems.reduce((sum, item) => sum + item.unitAmount, 0);
                const percentDiscountCents = Math.round(subtotalCents * 0.05);
                if (percentDiscountCents > 0) {
                    lineItems[0].price_data.unit_amount = Math.max(lineItems[0].price_data.unit_amount - percentDiscountCents, 0);
                }
            }
        }

        // Debug: log first line item amount for verification
        try {
            const firstAmount = lineItems[0]?.price_data?.unit_amount;
            console.log('[Serverless] creatorCode:', normalizedCode, 'firstItemAmountCents:', firstAmount);
        } catch (_) {}

        // Build payment intent description with YMM and image link
        let paymentDescription = `Order for ${cart.length} item(s)`;
        if (vehicleYMM) {
            paymentDescription += ` | Vehicle: ${vehicleYMM}`;
        }
        if (wheelImageFileLink) {
            paymentDescription += ` | Wheel Image: ${wheelImageFileLink.url}`;
        }
        if (creatorCodeDisplay) {
            paymentDescription += ` | Creator Code: ${creatorCodeDisplay}`;
        }

        const origin = req.headers.origin || 'http://localhost:3000';
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/checkout.html`,
            allow_promotion_codes: true,
            payment_intent_data: {
                description: paymentDescription,
                metadata: {
                    creator_code: creatorCode || '',
                    total_items: String(cart.length),
                    vehicle_ymm: vehicleYMM || '',
                    wheel_image_file_id: wheelImageFileId || '',
                },
            },
            metadata: {
                total_items: String(cart.length),
                creator_code: creatorCode || '',
                vehicle_ymm: vehicleYMM || '',
                wheel_image_file_id: wheelImageFileId || '',
            },
        });

        return res.status(200).json({ sessionId: session.id });
    } catch (err) {
        console.error('Stripe error:', err);
        const msg = err && err.message ? err.message : 'Failed to create checkout session';
        return res.status(500).json({ error: msg });
    }
}; 