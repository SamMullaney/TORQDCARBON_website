# Stripe Automatic Tax Setup Guide

## 🏛️ Overview

Stripe's automatic tax feature calculates and collects sales tax based on:
- **Customer's shipping address**
- **Product tax codes**
- **Your business location**
- **Current tax rates** (automatically updated)

## ✅ What's Included

### **Automatic Features:**
- ✅ Real-time tax rate calculation
- ✅ Address validation
- ✅ Tax ID collection for business customers
- ✅ Tax reporting and documentation
- ✅ Multi-jurisdiction support

### **Supported Regions:**
- **United States**: All 50 states + territories
- **European Union**: VAT calculation
- **Canada**: GST/HST/PST
- **Australia**: GST
- **United Kingdom**: VAT
- **And more...**

## 🚀 Setup Instructions

### **1. Enable Automatic Tax in Stripe Dashboard**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Settings** → **Tax**
3. Click **"Enable automatic tax calculation"**
4. Complete the setup wizard

### **2. Configure Your Business**

1. **Business Location**: Set your primary business address
2. **Tax Registration**: Add your tax registration numbers
3. **Product Tax Codes**: Configure for automotive parts

### **3. Product Tax Code for Steering Wheels**

For automotive steering wheels, use:
- **US**: `txcd_99999999` (General - Tangible Goods)
- **EU**: `txcd_99999999` (Standard Rate)
- **Canada**: `txcd_99999999` (General)

### **4. Test the Implementation**

The code has been updated to include:
```javascript
automatic_tax: {
    enabled: true,
},
customer_creation: 'always',
tax_id_collection: {
    enabled: true,
}
```

## 💰 How It Works

### **For Customers:**
1. Enter shipping address during checkout
2. Tax is automatically calculated
3. Final amount includes tax
4. Tax ID collected for business customers

### **For You:**
1. Tax is collected automatically
2. Tax reports generated monthly
3. Tax documentation provided
4. Compliance handled by Stripe

## 📊 Tax Calculation Examples

### **US Example:**
- **Product**: $849.99
- **Customer Location**: California
- **Tax Rate**: 7.25%
- **Tax Amount**: $61.62
- **Total**: $911.61

### **EU Example:**
- **Product**: €849.99
- **Customer Location**: Germany
- **VAT Rate**: 19%
- **VAT Amount**: €161.50
- **Total**: €1,011.49

## 🔧 Configuration Options

### **Tax Behavior:**
```javascript
automatic_tax: {
    enabled: true,
    // Optional: Customize behavior
    liability: {
        type: 'account' // or 'self'
    }
}
```

### **Tax ID Collection:**
```javascript
tax_id_collection: {
    enabled: true,
    // Optional: Specify required tax IDs
    eu_vat: {
        enabled: true
    }
}
```

## 📋 Compliance Requirements

### **US Requirements:**
- ✅ Nexus determination
- ✅ Tax registration in applicable states
- ✅ Filing requirements handled by Stripe

### **EU Requirements:**
- ✅ VAT registration
- ✅ Distance selling thresholds
- ✅ VAT reporting handled by Stripe

### **Canada Requirements:**
- ✅ GST/HST registration
- ✅ Provincial tax registration
- ✅ Tax reporting handled by Stripe

## 🎯 Benefits

### **For Your Business:**
- ✅ Automatic compliance
- ✅ Reduced manual work
- ✅ Accurate tax calculation
- ✅ Professional checkout experience

### **For Your Customers:**
- ✅ Transparent pricing
- ✅ No surprise fees
- ✅ Professional experience
- ✅ Tax documentation

## ⚠️ Important Notes

### **Before Going Live:**
1. **Verify tax registration** in all applicable jurisdictions
2. **Test with real addresses** in different states/countries
3. **Review tax reports** monthly
4. **Keep business information** updated

### **Limitations:**
- Tax rates updated automatically but may have delays
- Some complex tax scenarios may require manual review
- International shipping may have additional considerations

## 🔍 Testing

### **Test Addresses:**
- **California**: 123 Main St, Los Angeles, CA 90210
- **New York**: 456 Broadway, New York, NY 10013
- **Texas**: 789 Oak Ave, Austin, TX 73301
- **Florida**: 321 Beach Rd, Miami, FL 33101

### **Expected Results:**
- Different tax rates for each state
- Proper tax calculation
- Tax ID collection for business customers
- Accurate final totals

## 📞 Support

- **Stripe Tax Documentation**: https://stripe.com/docs/tax
- **Stripe Support**: Available in dashboard
- **Tax Compliance**: Handled by Stripe

## 🎉 Ready to Go!

Your checkout is now configured for automatic tax calculation. The system will:
1. Calculate tax based on customer address
2. Collect tax ID for business customers
3. Provide tax documentation
4. Handle compliance automatically

Test thoroughly before going live with real customers! 