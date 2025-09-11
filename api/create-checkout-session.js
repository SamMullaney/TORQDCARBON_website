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

        const { cart, creatorCode } = req.body || {};

        if (!Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ error: 'Invalid cart data or cart is empty' });
        }

        const lineItems = cart.map((item, index) => {
            // Preset item flow
            if (item.type === 'preset') {
                const unit = Math.round(Number(item.price) * 100);
                if (!Number.isFinite(unit) || unit <= 0 || unit > 1000000) {
                    throw new Error(`Invalid preset item price at index ${index}`);
                }
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.variant ? `${item.name} - ${item.variant}` : item.name,
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

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `Custom Steering Wheel - ${item.base}`,
                        description: `Base: ${item.base}, Sides: ${item.sides}, Top/Bottom: ${item.topbottom}, Badge: ${String(item.badge || '').toUpperCase()}, Airbag: ${item.airbag}, Top Stripe: ${item.topStripe === 'yes' ? 'Yes' : 'No'}, Heating: ${item.heating === 'yes' ? 'Yes' : 'No'}, Trim Color: ${item.trimColor}${item.additionalSpecs ? `, Additional Specs: ${item.additionalSpecs}` : ''}`,
                    },
                    unit_amount: unit,
                },
                quantity: 1,
            };
        });

        // NOTE: To support the creator code in production, configure Coupons/Promotion Codes in Stripe Dashboard
        // and pass allow_promotion_codes: true or discounts: [{coupon: '...'}] here.

        const origin = req.headers.origin || 'http://localhost:3000';
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/checkout.html`,
            allow_promotion_codes: true,
            metadata: {
                total_items: String(cart.length),
                creator_code: creatorCode || '',
            },
        });

        return res.status(200).json({ sessionId: session.id });
    } catch (err) {
        console.error('Stripe error:', err);
        const msg = err && err.message ? err.message : 'Failed to create checkout session';
        return res.status(500).json({ error: msg });
    }
}; 