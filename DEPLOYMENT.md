# 🚀 TORQD Website Deployment Guide

## 🔑 Switching from Test to Live Stripe Keys

### **Step 1: Get Your Live API Keys**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Developers → API Keys**
3. Switch to **"Live" mode** (toggle in top right)
4. Copy your live keys:
   - **Publishable key**: `pk_live_...`
   - **Secret key**: `sk_live_...`

### **Step 2: Update Server Configuration**

#### **Option A: Environment Variables (Recommended)**
```bash
# Set environment variable before starting server
export STRIPE_SECRET_KEY="sk_live_YOUR_LIVE_SECRET_KEY"
npm start
```

#### **Option B: Direct Update**
Edit `server.js` line 2:
```javascript
const stripe = require('stripe')('sk_live_YOUR_LIVE_SECRET_KEY');
```

### **Step 3: Update Frontend Configuration**
Edit `checkout.js` line 6:
```javascript
const stripe = Stripe('pk_live_YOUR_LIVE_PUBLISHABLE_KEY');
```

### **Step 4: Set Up Webhooks (Important!)**
1. In Stripe Dashboard → **Developers → Webhooks**
2. Add endpoint: `https://yourdomain.com/webhook`
3. Select events: `checkout.session.completed`
4. Copy the webhook secret and update `server.js`:
```javascript
const endpointSecret = 'whsec_YOUR_WEBHOOK_SECRET';
```

### **Step 5: Update Product Images**
In `server.js` line 47, update the image URL:
```javascript
images: ['https://yourdomain.com/steering-wheel-image.jpg'],
```

### **Step 6: Test Live Mode**
1. Use real credit cards (not test cards)
2. Test with small amounts first
3. Monitor Stripe Dashboard for successful payments

## ⚠️ **Important Security Notes**
- **Never commit live keys to version control**
- **Use environment variables for production**
- **Enable webhook signature verification**
- **Monitor your Stripe Dashboard regularly**

## 🧪 **Testing Checklist**
- [ ] Live publishable key loads correctly
- [ ] Checkout session creates successfully
- [ ] Real payment processes through
- [ ] Webhook receives payment confirmation
- [ ] Success page displays correctly
- [ ] Cart functionality works as expected

## 📞 **Support**
If you encounter issues:
1. Check Stripe Dashboard logs
2. Verify webhook endpoint is accessible
3. Ensure all keys are correctly updated
4. Test with small amounts first 