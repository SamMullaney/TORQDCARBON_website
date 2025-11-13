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

        // Normalize and precompute validity for adding product metadata
        const normalizedForMetadata = creatorCode ? String(creatorCode).trim().toLowerCase() : '';
        const creatorCodeIsValidForMetadata = ['zayyxlcusive','soyerick','torqd','m3.cay','n63.heenz','redkey'].includes(normalizedForMetadata);

        const lineItems = cart.map((item, index) => {
            // Preset item flow
            if (item.type === 'preset') {
                const unit = Math.round(Number(item.price) * 100);
                if (!Number.isFinite(unit) || unit <= 0 || unit > 1000000) {
                    throw new Error(`Invalid preset item price at index ${index}`);
                }
                
                // Build description with YMM
                let description = '';
                if (vehicleYMM) {
                    description = `Vehicle: ${vehicleYMM}`;
                }
                
                return {
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

            return {
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
            };
        });

		// Apply $50 creator code discount safely by reducing the first line item's unit_amount
		const normalizedCode = creatorCode ? String(creatorCode).trim().toLowerCase() : '';
		console.log('[Serverless] creatorCode:', normalizedCode);
		if (normalizedCode === 'zayyxlcusive') {
            if (lineItems.length > 0 && lineItems[0]?.price_data?.unit_amount) {
                const original = lineItems[0].price_data.unit_amount;
                const discounted = Math.max(0, original - 5000);
                lineItems[0].price_data.unit_amount = discounted;
            }
        }

		// Apply $50 creator code discount for SOYERICK
		if (normalizedCode === 'soyerick') {
			if (lineItems.length > 0 && lineItems[0]?.price_data?.unit_amount) {
				const original = lineItems[0].price_data.unit_amount;
				const discounted = Math.max(0, original - 5000);
				lineItems[0].price_data.unit_amount = discounted;
			}
		}


		// Apply $50 creator code discount for TORQD
		if (normalizedCode === 'torqd') {
			if (lineItems.length > 0 && lineItems[0]?.price_data?.unit_amount) {
				const original = lineItems[0].price_data.unit_amount;
				const discounted = Math.max(0, original - 5000);
				lineItems[0].price_data.unit_amount = discounted;
			}
		}

		// Apply $50 creator code discount for M3.Cay
		if (normalizedCode === 'm3.cay') {
			if (lineItems.length > 0 && lineItems[0]?.price_data?.unit_amount) {
				const original = lineItems[0].price_data.unit_amount;
				const discounted = Math.max(0, original - 5000);
				lineItems[0].price_data.unit_amount = discounted;
			}
		}

		// Apply $50 creator code discount for N63.HEENZ
		if (normalizedCode === 'n63.heenz') {
			if (lineItems.length > 0 && lineItems[0]?.price_data?.unit_amount) {
				const original = lineItems[0].price_data.unit_amount;
				const discounted = Math.max(0, original - 5000);
				lineItems[0].price_data.unit_amount = discounted;
			}
		}

		// Apply absolute price $409.99 for REDKEY
		if (normalizedCode === 'redkey') {
			if (lineItems.length > 0 && lineItems[0]?.price_data) {
				lineItems[0].price_data.unit_amount = 40999;
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