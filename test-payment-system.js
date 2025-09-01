// Payment System Testing Script
// Run this in your browser console to test various scenarios

console.log('🧪 TORQD CARBON Payment System Testing');
console.log('=====================================');

// Test cart functionality
function testCartFunctionality() {
    console.log('\n📦 Testing Cart Functionality...');
    
    // Test adding items
    const testItem = {
        base: 'Sport B9.5',
        sides: 'Perforated Leather',
        topbottom: 'Forged Carbon',
        badge: 's',
        airbag: 'smooth-leather',
        topStripe: 'yes',
        stripeColor: '#FFFFFF',
        heating: 'yes',
        trimColor: 'chrome',
        additionalSpecs: 'Test order'
    };
    
    // Simulate adding to cart
    let cart = JSON.parse(localStorage.getItem('torqdCart')) || [];
    cart.push(testItem);
    localStorage.setItem('torqdCart', JSON.stringify(cart));
    
    console.log('✅ Added test item to cart');
    console.log('📊 Cart items:', cart.length);
    
    // Test price calculation
    const basePrice = 799.99;
    const heatingPrice = testItem.heating === 'yes' ? 50 : 0;
    const totalPrice = basePrice + heatingPrice;
    
    console.log('💰 Price calculation:', {
        basePrice: `$${basePrice}`,
        heating: testItem.heating === 'yes' ? '+$50' : '+$0',
        total: `$${totalPrice}`
    });
    
    return cart;
}

// Test checkout session creation
async function testCheckoutSession() {
    console.log('\n💳 Testing Checkout Session Creation...');
    
    try {
        const cart = JSON.parse(localStorage.getItem('torqdCart')) || [];
        
        if (cart.length === 0) {
            console.log('❌ No items in cart');
            return false;
        }
        
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cart: cart,
                total: cart.reduce((sum, item) => {
                    let price = 799.99;
                    if (item.heating === 'yes') price += 50;
                    return sum + price;
                }, 0)
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            console.log('✅ Checkout session created successfully');
            console.log('🆔 Session ID:', result.sessionId);
            return true;
        } else {
            console.log('❌ Failed to create checkout session');
            console.log('🚨 Error:', result.error);
            return false;
        }
        
    } catch (error) {
        console.log('❌ Network error:', error.message);
        return false;
    }
}

// Test validation
function testValidation() {
    console.log('\n🔍 Testing Validation...');
    
    // Test empty cart
    localStorage.removeItem('torqdCart');
    let cart = JSON.parse(localStorage.getItem('torqdCart')) || [];
    console.log('📦 Empty cart validation:', cart.length === 0 ? '✅ Pass' : '❌ Fail');
    
    // Test invalid item
    const invalidItem = {
        base: 'Sport B9.5',
        // Missing required fields
    };
    
    cart.push(invalidItem);
    localStorage.setItem('torqdCart', JSON.stringify(cart));
    
    console.log('🚨 Invalid item in cart:', cart.length);
    
    // Clean up
    localStorage.removeItem('torqdCart');
}

// Test different payment scenarios
function testPaymentScenarios() {
    console.log('\n💳 Payment Test Scenarios:');
    console.log('========================');
    
    const testCards = [
        { name: 'Successful Payment', number: '4242 4242 4242 4242', expected: 'success' },
        { name: 'Card Declined', number: '4000 0000 0000 0002', expected: 'decline' },
        { name: 'Insufficient Funds', number: '4000 0000 0000 9995', expected: 'decline' },
        { name: '3D Secure Required', number: '4000 0025 0000 3155', expected: 'authentication' },
        { name: 'Expired Card', number: '4000 0000 0000 0069', expected: 'decline' }
    ];
    
    testCards.forEach(card => {
        console.log(`📋 ${card.name}: ${card.number} (Expected: ${card.expected})`);
    });
    
    console.log('\n💡 Instructions:');
    console.log('1. Add items to cart');
    console.log('2. Go to checkout page');
    console.log('3. Use the test card numbers above');
    console.log('4. Check Stripe dashboard for results');
}

// Run all tests
function runAllTests() {
    console.log('🚀 Starting Payment System Tests...\n');
    
    // Test cart functionality
    testCartFunctionality();
    
    // Test validation
    testValidation();
    
    // Test payment scenarios
    testPaymentScenarios();
    
    console.log('\n✅ Testing Complete!');
    console.log('📋 Check the checklist in test-cards.md');
    console.log('🔍 Monitor Stripe dashboard for payment results');
}

// Export functions for manual testing
window.testPaymentSystem = {
    testCartFunctionality,
    testCheckoutSession,
    testValidation,
    testPaymentScenarios,
    runAllTests
};

console.log('🎯 Testing functions available:');
console.log('- testPaymentSystem.runAllTests()');
console.log('- testPaymentSystem.testCartFunctionality()');
console.log('- testPaymentSystem.testCheckoutSession()');
console.log('- testPaymentSystem.testValidation()');
console.log('- testPaymentSystem.testPaymentScenarios()'); 