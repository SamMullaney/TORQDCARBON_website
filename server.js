const express = require('express');
require('dotenv').config();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

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

// Upload wheel image to Stripe
app.post('/upload-wheel-image', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Upload file to Stripe
        const file = await stripe.files.create({
            file: {
                data: req.file.buffer,
                name: req.file.originalname,
                type: 'application/octet-stream',
            },
            purpose: 'dispute_evidence',
        });

        res.json({ fileId: file.id });
    } catch (error) {
        console.error('Error uploading file to Stripe:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

// Create checkout session endpoint
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { cart, creatorCode, vehicleYMM, wheelImageFileId } = req.body;

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

        const creatorCodeDisplay = creatorCode ? String(creatorCode).trim() : '';
        const normalizedCode = creatorCodeDisplay.toLowerCase();
        const percentDiscountCodes = ['zayyxclusive', 'zayyxlcusive', 'torqd', 'soyerick', 'm3.cay', 'n63.heenz', 'panda', 'jake', 'maxxi', 'doubt'];
        const percentDiscountActive = percentDiscountCodes.includes(normalizedCode);
        const redkeyActive = normalizedCode === 'redkey';
		// Normalize for metadata and validation
		const normalizedCodeForMetadata = normalizedCode;
		const creatorCodeIsValidForMetadata = ['zayyxclusive','zayyxlcusive','torqd','soyerick','m3.cay','n63.heenz','panda','jake','maxxi','doubt','redkey'].includes(normalizedCodeForMetadata);
        if (creatorCode) {
            console.log('[Express] creatorCode:', normalizedCode, 'percentActive:', percentDiscountActive, 'redkeyActive:', redkeyActive);
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

        // Create line items for Stripe
        const preparedItems = cart.map((item, index) => {
            if (item.type === 'preset') {
                let price = Math.round(Number(item.price) * 100);

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
                    unitAmount: price,
                    lineItem: {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.variant ? `${item.name} - ${item.variant}` : item.name,
                                ...(description && { description }),
                                ...(wheelImageFileLink && { images: [wheelImageFileLink.url] }),
                                ...(creatorCodeIsValidForMetadata ? { metadata: { creator_code: String(creatorCode) } } : {})
                            },
                            unit_amount: price,
                        },
                        quantity: 1,
                    }
                };
            }

            // Custom design pricing
            let basePrice = 799.99;
            if (item.heating === 'yes') basePrice += 50;

            let unitAmount = Math.round(basePrice * 100);

            // Build description with all details + YMM
            let customDescription = `Base: ${item.base}, Sides: ${item.sides}, Top/Bottom: ${item.topbottom}, Badge: ${item.badge.toUpperCase()}, Airbag: ${item.airbag}, Top Stripe: ${item.topStripe === 'yes' ? 'Yes' : 'No'}, Heating: ${item.heating === 'yes' ? 'Yes' : 'No'}, Trim Color: ${item.trimColor}${item.additionalSpecs ? `, Additional Specs: ${item.additionalSpecs}` : ''}`;
            if (vehicleYMM) {
                customDescription += ` | Vehicle: ${vehicleYMM}`;
            }
            if (creatorCodeDisplay) {
                customDescription += ` | Creator Code: ${creatorCodeDisplay}`;
            }

            return {
                unitAmount,
                lineItem: {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Custom Steering Wheel - ${item.base}`,
                            description: customDescription,
                            ...(wheelImageFileLink && { images: [wheelImageFileLink.url] }),
                            ...(creatorCodeIsValidForMetadata ? { metadata: { creator_code: String(creatorCode) } } : {})
                        },
                        unit_amount: unitAmount,
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
            console.log('[Express] creatorCode:', normalizedCode, 'firstItemAmountCents:', firstAmount);
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

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://${req.headers.host}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://${req.headers.host}/checkout.html`,
            payment_intent_data: {
                description: paymentDescription,
                metadata: {
                    creator_code: creatorCode || '',
                    total_items: cart.length.toString(),
                    vehicle_ymm: vehicleYMM || '',
                    wheel_image_file_id: wheelImageFileId || '',
                }
            },
            metadata: {
                cart_items: JSON.stringify(cart),
                total_items: cart.length.toString(),
                created_at: new Date().toISOString(),
                creator_code: creatorCode || '',
                vehicle_ymm: vehicleYMM || '',
                wheel_image_file_id: wheelImageFileId || '',
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