const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const formidable = require('formidable');
const fs = require('fs').promises;

export const config = {
    api: {
        bodyParser: false, // Disable default body parser to handle multipart/form-data
    },
};

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Parse the multipart form data
        const form = formidable({
            maxFileSize: 10 * 1024 * 1024, // 10MB max
        });

        const [fields, files] = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                resolve([fields, files]);
            });
        });

        const file = files.file?.[0] || files.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Read file buffer
        const fileBuffer = await fs.readFile(file.filepath);

        // Upload to Stripe
        const stripeFile = await stripe.files.create({
            file: {
                data: fileBuffer,
                name: file.originalFilename || file.newFilename,
                type: 'application/octet-stream',
            },
            purpose: 'dispute_evidence',
        });

        res.status(200).json({ fileId: stripeFile.id });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file', details: error.message });
    }
}

