const express = require('express');
require('dotenv').config();

// Require Stripe secret from environment only (no hardcoded fallback)
const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
    console.error('STRIPE_SECRET_KEY is not set. Please set it in your environment (never commit secrets).');
    process.exit(1);
}
const stripe = require('stripe')(stripeSecret);
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Create checkout session endpoint
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { cart, creatorCode } = req.body;

        // Validate request
        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ error: 'Invalid cart data or cart is empty' });
        }

        // Validate each cart item (support both custom and preset)
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];

            if (item.type === 'preset') {
                if (!item.name || typeof item.price === 'undefined') {
                    return res.status(400).json({ error: `Invalid preset item at index ${i}` });
                }
                const price = Number(item.price);
                if (!Number.isFinite(price) || price <= 0 || price > 10000) {
                    return res.status(400).json({ error: `Invalid preset item price at index ${i}` });
                }
                continue;
            }

            // Custom item validation (existing)
            if (!item.base || !item.sides || !item.topbottom) {
                return res.status(400).json({ error: `Invalid item data at index ${i}` });
            }

            if (!item.badge || !item.airbag || !item.topStripe || !item.heating || !item.trimColor) {
                return res.status(400).json({ error: `Missing required specifications for item at index ${i}` });
            }
        }

        // Determine discount in cents
        let discountCents = 0;
        const VALID_CODE1 = 'Zayyxlcusive';
        const VALID_CODE2 = 'TORQD';
        if (creatorCode) {
            const codeLower = String(creatorCode).toLowerCase();
            if (codeLower === VALID_CODE1.toLowerCase()) {
                discountCents = 5000; // $50 in cents
            } else if (codeLower === VALID_CODE2.toLowerCase()) {
                discountCents = 7500; // $75 in cents
            }
        }

        // Create line items for Stripe
        const lineItems = cart.map((item, index) => {
            if (item.type === 'preset') {
                let price = Math.round(Number(item.price) * 100);

                // Apply discount to first item if discount exists
                if (discountCents > 0 && index === 0) {
                    price = Math.max(price - discountCents, 0);
                    discountCents = 0;
                }

                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.variant ? `${item.name} - ${item.variant}` : item.name,
                        },
                        unit_amount: price,
                    },
                    quantity: 1,
                };
            }

            // Custom design pricing
            let basePrice = 799.99;
            if (item.heating === 'yes') basePrice += 50;

            let unitAmount = Math.round(basePrice * 100);
            if (discountCents > 0 && index === 0) {
                unitAmount = Math.max(unitAmount - discountCents, 0);
                discountCents = 0;
            }

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `Custom Steering Wheel - ${item.base}`,
                        description: `Base: ${item.base}, Sides: ${item.sides}, Top/Bottom: ${item.topbottom}, Badge: ${item.badge.toUpperCase()}, Airbag: ${item.airbag}, Top Stripe: ${item.topStripe === 'yes' ? 'Yes' : 'No'}, Heating: ${item.heating === 'yes' ? 'Yes' : 'No'}, Trim Color: ${item.trimColor}${item.additionalSpecs ? `, Additional Specs: ${item.additionalSpecs}` : ''}`,
                        images: ['https://your-domain.com/steering-wheel-image.jpg'],
                    },
                    unit_amount: unitAmount,
                },
                quantity: 1,
            };
        });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://${req.headers.host}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://${req.headers.host}/checkout.html`,
            metadata: {
                cart_items: JSON.stringify(cart),
                total_items: cart.length.toString(),
                created_at: new Date().toISOString(),
                creator_code: creatorCode || '',
            },
            customer_email: req.body.email || undefined,
        });

        console.log('Checkout session created:', session.id);
        res.json({ sessionId: session.id });

    } catch (error) {
        console.error('Error creating checkout session:', error);

        if (error.type === 'StripeCardError') {
            res.status(400).json({ error: 'Card error: ' + error.message });
        } else if (error.type === 'StripeInvalidRequestError') {
            res.status(400).json({ error: 'Invalid request: ' + error.message });
        } else if (error.type === 'StripeAPIError') {
            res.status(500).json({ error: 'Stripe API error: ' + error.message });
        } else {
            res.status(500).json({ error: 'Failed to create checkout session: ' + error.message });
        }
    }
});

// Webhook endpoint for handling successful payments
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = 'whsec_your_webhook_secret_here'; // Replace with your actual webhook secret

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log('Payment successful for session:', session.id);
            // Here you would:
            // 1. Save order to your database
            // 2. Send confirmation email
            // 3. Update inventory
            // 4. Start production process
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
});

// Success page endpoint
app.get('/success', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Payment Successful - TORQD CARBON</title>
            <link rel="stylesheet" href="styles.css">
            <style>
                .success-container { text-align: center; padding: 100px 20px; max-width: 600px; margin: 0 auto; }
                .success-icon { color: #00ff88; font-size: 4rem; margin-bottom: 2rem; }
                .success-title { color: #00ff88; font-size: 2rem; margin-bottom: 1rem; }
                .success-message { color: #cccccc; font-size: 1.1rem; margin-bottom: 2rem; }
                .back-button { background: linear-gradient(45deg, #00ff88, #00cc6a); color: #000; padding: 1rem 2rem; border: none; border-radius: 50px; font-weight: 600; text-decoration: none; display: inline-block; transition: all 0.3s ease; }
                .back-button:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,255,136,0.3); }
            </style>
        </head>
        <body>
            <div class="success-container">
                <div class="success-icon">✓</div>
                <h1 class="success-title">Payment Successful!</h1>
                <p class="success-message">
                    Thank you for your order! We've received your payment and will start working on your custom steering wheel right away.
                    <br><br>
                    You'll receive an email confirmation shortly with your order details.
                    <br><br>
                    Expected delivery: 3-5 weeks
                </p>
                <a href="index.html" class="back-button">Return to Home</a>
            </div>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Make sure to update the webhook secret and product image URL in the code!');
});