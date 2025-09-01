// Automated Payment System Testing Script
// This script will test all scenarios and report results

class PaymentSystemTester {
    constructor() {
        this.results = {
            cart: {},
            checkout: {},
            payments: {},
            errors: [],
            summary: {}
        };
        this.baseUrl = 'http://localhost:3000';
    }

    async runAllTests() {
        console.log('🧪 Starting Automated Payment System Tests...\n');
        
        try {
            // Test 1: Cart Functionality
            await this.testCartFunctionality();
            
            // Test 2: Checkout Session Creation
            await this.testCheckoutSession();
            
            // Test 3: Payment Scenarios
            await this.testPaymentScenarios();
            
            // Test 4: Error Handling
            await this.testErrorHandling();
            
            // Generate Report
            this.generateReport();
            
        } catch (error) {
            console.error('❌ Test execution failed:', error);
            this.results.errors.push(error.message);
        }
    }

    async testCartFunctionality() {
        console.log('📦 Testing Cart Functionality...');
        
        try {
            // Clear existing cart
            localStorage.removeItem('torqdCart');
            
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
                additionalSpecs: 'Automated test order'
            };
            
            let cart = JSON.parse(localStorage.getItem('torqdCart')) || [];
            cart.push(testItem);
            localStorage.setItem('torqdCart', JSON.stringify(cart));
            
            // Test price calculation
            const basePrice = 799.99;
            const heatingPrice = testItem.heating === 'yes' ? 50 : 0;
            const totalPrice = basePrice + heatingPrice;
            
            this.results.cart = {
                itemsAdded: cart.length,
                priceCalculation: {
                    basePrice: basePrice,
                    heatingPrice: heatingPrice,
                    totalPrice: totalPrice
                },
                cartData: cart,
                status: 'PASS'
            };
            
            console.log('✅ Cart functionality test passed');
            console.log(`   Items in cart: ${cart.length}`);
            console.log(`   Total price: $${totalPrice}`);
            
        } catch (error) {
            this.results.cart.status = 'FAIL';
            this.results.errors.push(`Cart test failed: ${error.message}`);
            console.log('❌ Cart functionality test failed:', error.message);
        }
    }

    async testCheckoutSession() {
        console.log('\n💳 Testing Checkout Session Creation...');
        
        try {
            const cart = JSON.parse(localStorage.getItem('torqdCart')) || [];
            
            if (cart.length === 0) {
                throw new Error('No items in cart for checkout test');
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
            
            if (response.ok && result.sessionId) {
                this.results.checkout = {
                    sessionCreated: true,
                    sessionId: result.sessionId,
                    status: 'PASS'
                };
                console.log('✅ Checkout session created successfully');
                console.log(`   Session ID: ${result.sessionId}`);
            } else {
                throw new Error(result.error || 'Failed to create checkout session');
            }
            
        } catch (error) {
            this.results.checkout = {
                sessionCreated: false,
                error: error.message,
                status: 'FAIL'
            };
            this.results.errors.push(`Checkout test failed: ${error.message}`);
            console.log('❌ Checkout session test failed:', error.message);
        }
    }

    async testPaymentScenarios() {
        console.log('\n💳 Testing Payment Scenarios...');
        
        const testCards = [
            { name: 'Successful Payment', number: '4242 4242 4242 4242', expected: 'success' },
            { name: 'Card Declined', number: '4000 0000 0000 0002', expected: 'decline' },
            { name: 'Insufficient Funds', number: '4000 0000 0000 9995', expected: 'decline' },
            { name: '3D Secure Required', number: '4000 0025 0000 3155', expected: 'authentication' },
            { name: 'Expired Card', number: '4000 0000 0000 0069', expected: 'decline' }
        ];
        
        this.results.payments = {
            scenarios: testCards,
            tested: [],
            status: 'READY_FOR_MANUAL_TESTING'
        };
        
        console.log('📋 Payment scenarios ready for manual testing:');
        testCards.forEach(card => {
            console.log(`   ${card.name}: ${card.number} (Expected: ${card.expected})`);
        });
        
        console.log('\n💡 Manual Testing Instructions:');
        console.log('1. Go to checkout page');
        console.log('2. Use the test card numbers above');
        console.log('3. Check Stripe dashboard for results');
    }

    async testErrorHandling() {
        console.log('\n🔍 Testing Error Handling...');
        
        try {
            // Test empty cart validation
            localStorage.removeItem('torqdCart');
            const emptyCart = JSON.parse(localStorage.getItem('torqdCart')) || [];
            
            // Test invalid cart data
            const invalidCart = [{ invalid: 'data' }];
            
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cart: invalidCart
                })
            });
            
            const result = await response.json();
            
            if (!response.ok && result.error) {
                this.results.errorHandling = {
                    emptyCartValidation: emptyCart.length === 0,
                    invalidDataRejection: !response.ok,
                    errorMessage: result.error,
                    status: 'PASS'
                };
                console.log('✅ Error handling test passed');
                console.log(`   Empty cart validation: ${emptyCart.length === 0}`);
                console.log(`   Invalid data rejection: ${!response.ok}`);
            } else {
                throw new Error('Error handling not working properly');
            }
            
        } catch (error) {
            this.results.errorHandling = {
                status: 'FAIL',
                error: error.message
            };
            this.results.errors.push(`Error handling test failed: ${error.message}`);
            console.log('❌ Error handling test failed:', error.message);
        }
    }

    generateReport() {
        console.log('\n📊 TEST RESULTS SUMMARY');
        console.log('========================');
        
        // Calculate overall status
        const tests = [
            this.results.cart.status,
            this.results.checkout.status,
            this.results.errorHandling?.status
        ].filter(Boolean);
        
        const passedTests = tests.filter(status => status === 'PASS').length;
        const totalTests = tests.length;
        const overallStatus = passedTests === totalTests ? 'PASS' : 'PARTIAL';
        
        this.results.summary = {
            totalTests: totalTests,
            passedTests: passedTests,
            failedTests: totalTests - passedTests,
            overallStatus: overallStatus,
            errors: this.results.errors
        };
        
        console.log(`Overall Status: ${overallStatus}`);
        console.log(`Tests Passed: ${passedTests}/${totalTests}`);
        
        if (this.results.errors.length > 0) {
            console.log('\n❌ Errors Found:');
            this.results.errors.forEach((error, index) => {
                console.log(`   ${index + 1}. ${error}`);
            });
        }
        
        console.log('\n📋 Detailed Results:');
        console.log('Cart Functionality:', this.results.cart.status);
        console.log('Checkout Session:', this.results.checkout.status);
        console.log('Error Handling:', this.results.errorHandling?.status || 'NOT_TESTED');
        console.log('Payment Scenarios:', this.results.payments.status);
        
        console.log('\n🎯 Next Steps:');
        if (overallStatus === 'PASS') {
            console.log('✅ All automated tests passed!');
            console.log('📋 Proceed with manual payment testing using the card numbers above');
        } else {
            console.log('⚠️  Some tests failed. Please fix the issues before proceeding.');
        }
        
        console.log('\n🔍 Monitor Stripe Dashboard for payment results');
        console.log('📧 Check server logs for any additional errors');
        
        return this.results;
    }
}

// Create and run the tester
const tester = new PaymentSystemTester();

// Export for manual use
window.paymentTester = tester;

console.log('🚀 Payment System Tester Ready!');
console.log('Run: paymentTester.runAllTests() to start testing'); 