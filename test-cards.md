# Stripe Payment Testing Guide
# edit

## Test Card Numbers (No Real Charges)

### ✅ Successful Payments
- **Visa**: `4242 4242 4242 4242`
- **Visa (debit)**: `4000 0566 5566 5556`
- **Mastercard**: `5555 5555 5555 4444`
- **American Express**: `3782 822463 10005`

### ❌ Failed Payments
- **Card declined**: `4000 0000 0000 0002`
- **Insufficient funds**: `4000 0000 0000 9995`
- **Expired card**: `4000 0000 0000 0069`
- **Incorrect CVC**: `4000 0000 0000 0127`
- **Processing error**: `4000 0000 0000 0119`

### 🔐 Authentication Required
- **3D Secure**: `4000 0025 0000 3155`
- **3D Secure 2**: `4000 0027 6000 3184`

### 💳 Other Test Scenarios
- **Generic decline**: `4000 0000 0000 0002`
- **Fraudulent card**: `4100 0000 0000 0019`
- **Lost card**: `4000 0000 0000 9987`
- **Stolen card**: `4000 0000 0000 9979`

## Test Card Details
- **Expiry Date**: Any future date (e.g., 12/25)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP Code**: Any valid ZIP (e.g., 12345)

## Testing Checklist

### ✅ Basic Functionality
- [ ] Add items to cart
- [ ] View cart contents
- [ ] Remove items from cart
- [ ] Calculate total correctly
- [ ] Proceed to checkout
- [ ] Redirect to Stripe
- [ ] Complete successful payment
- [ ] Return to success page
- [ ] Clear cart after payment

### ✅ Payment Scenarios
- [ ] Successful payment with Visa
- [ ] Successful payment with Mastercard
- [ ] Successful payment with Amex
- [ ] Declined payment handling
- [ ] Insufficient funds handling
- [ ] Expired card handling
- [ ] 3D Secure authentication
- [ ] Cancel payment flow

### ✅ Error Handling
- [ ] Empty cart validation
- [ ] Network error handling
- [ ] Server error handling
- [ ] Invalid card number
- [ ] Missing card details

### ✅ Data Validation
- [ ] Cart data integrity
- [ ] Price calculations
- [ ] Product descriptions
- [ ] Order metadata
- [ ] Customer information

### ✅ User Experience
- [ ] Loading states
- [ ] Error messages
- [ ] Success feedback
- [ ] Mobile responsiveness
- [ ] Navigation flow 