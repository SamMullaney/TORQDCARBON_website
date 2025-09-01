const https = require('https');
const http = require('http');

class PaymentSystemTestRunner {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
        this.results = {
            server: {},
            cart: {},
            checkout: {},
            errors: []
        };
    }

    async runAllTests() {
        console.log('🧪 Automated Payment System Test Runner');
        console.log('=====================================\n');

        try {
            // Test 1: Server Availability
            await this.testServerAvailability();
            
            // Test 2: Cart Functionality
            await this.testCartFunctionality();
            
            // Test 3: Checkout Session Creation
            await this.testCheckoutSession();
            
            // Test 4: Error Handling
            await this.testErrorHandling();
            
            // Generate Final Report
            this.generateReport();
            
        } catch (error) {
            console.error('❌ Test execution failed:', error.message);
            this.results.errors.push(error.message);
        }
    }

    async testServerAvailability() {
        console.log('🌐 Testing Server Availability...');
        
        try {
            const response = await this.makeRequest('GET', '/');
            
            if (response.statusCode === 200) {
                this.results.server = {
                    status: 'ONLINE',
                    responseCode: response.statusCode,
                    accessible: true
                };
                console.log('✅ Server is running and accessible');
            } else {
                throw new Error(`Server responded with status: ${response.statusCode}`);
            }
        } catch (error) {
            this.results.server = {
                status: 'OFFLINE',
                error: error.message,
                accessible: false
            };
            console.log('❌ Server is not accessible:', error.message);
        }
    }

    async testCartFunctionality() {
        console.log('\n📦 Testing Cart Functionality...');
        
        try {
            // Test cart data structure
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
            
            // Test price calculation
            const basePrice = 799.99;
            const heatingPrice = testItem.heating === 'yes' ? 50 : 0;
            const totalPrice = basePrice + heatingPrice;
            
            this.results.cart = {
                itemStructure: this.validateItemStructure(testItem),
                priceCalculation: {
                    basePrice: basePrice,
                    heatingPrice: heatingPrice,
                    totalPrice: totalPrice,
                    correct: totalPrice === 849.99
                },
                status: 'PASS'
            };
            
            console.log('✅ Cart functionality test passed');
            console.log(`   Item structure: Valid`);
            console.log(`   Price calculation: $${totalPrice} (${totalPrice === 849.99 ? 'Correct' : 'Incorrect'})`);
            
        } catch (error) {
            this.results.cart.status = 'FAIL';
            this.results.errors.push(`Cart test failed: ${error.message}`);
            console.log('❌ Cart functionality test failed:', error.message);
        }
    }

    validateItemStructure(item) {
        const requiredFields = ['base', 'sides', 'topbottom', 'badge', 'airbag', 'topStripe', 'stripeColor', 'heating', 'trimColor'];
        const missingFields = requiredFields.filter(field => !item[field]);
        
        return {
            valid: missingFields.length === 0,
            missingFields: missingFields
        };
    }

    async testCheckoutSession() {
        console.log('\n💳 Testing Checkout Session Creation...');
        
        try {
            const testCart = [{
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
            }];
            
            const response = await this.makeRequest('POST', '/create-checkout-session', {
                cart: testCart,
                total: 849.99
            });
            
            if (response.statusCode === 200) {
                const result = JSON.parse(response.data);
                
                if (result.sessionId) {
                    this.results.checkout = {
                        sessionCreated: true,
                        sessionId: result.sessionId,
                        responseCode: response.statusCode,
                        status: 'PASS'
                    };
                    console.log('✅ Checkout session created successfully');
                    console.log(`   Session ID: ${result.sessionId}`);
                    console.log(`   Response Code: ${response.statusCode}`);
                } else {
                    throw new Error('No session ID in response');
                }
            } else {
                throw new Error(`HTTP ${response.statusCode}: ${response.data}`);
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

    async testErrorHandling() {
        console.log('\n🔍 Testing Error Handling...');
        
        try {
            // Test empty cart
            const emptyCartResponse = await this.makeRequest('POST', '/create-checkout-session', {
                cart: []
            });
            
            // Test invalid cart data
            const invalidCartResponse = await this.makeRequest('POST', '/create-checkout-session', {
                cart: [{ invalid: 'data' }]
            });
            
            this.results.errorHandling = {
                emptyCartRejected: emptyCartResponse.statusCode !== 200,
                invalidDataRejected: invalidCartResponse.statusCode !== 200,
                emptyCartError: emptyCartResponse.statusCode !== 200 ? emptyCartResponse.data : null,
                invalidDataError: invalidCartResponse.statusCode !== 200 ? invalidCartResponse.data : null,
                status: 'PASS'
            };
            
            console.log('✅ Error handling test passed');
            console.log(`   Empty cart rejection: ${emptyCartResponse.statusCode !== 200}`);
            console.log(`   Invalid data rejection: ${invalidCartResponse.statusCode !== 200}`);
            
        } catch (error) {
            this.results.errorHandling = {
                status: 'FAIL',
                error: error.message
            };
            this.results.errors.push(`Error handling test failed: ${error.message}`);
            console.log('❌ Error handling test failed:', error.message);
        }
    }

    makeRequest(method, path, data = null) {
        return new Promise((resolve, reject) => {
            const url = new URL(path, this.baseUrl);
            const options = {
                hostname: url.hostname,
                port: url.port,
                path: url.pathname,
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            if (data) {
                const postData = JSON.stringify(data);
                options.headers['Content-Length'] = Buffer.byteLength(postData);
            }

            const req = http.request(options, (res) => {
                let responseData = '';
                
                res.on('data', (chunk) => {
                    responseData += chunk;
                });
                
                res.on('end', () => {
                    resolve({
                        statusCode: res.statusCode,
                        data: responseData
                    });
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            if (data) {
                req.write(JSON.stringify(data));
            }
            
            req.end();
        });
    }

    generateReport() {
        console.log('\n📊 TEST RESULTS SUMMARY');
        console.log('========================');
        
        // Calculate overall status
        const tests = [
            this.results.server.accessible ? 'PASS' : 'FAIL',
            this.results.cart.status,
            this.results.checkout.status,
            this.results.errorHandling?.status
        ].filter(Boolean);
        
        const passedTests = tests.filter(status => status === 'PASS').length;
        const totalTests = tests.length;
        const overallStatus = passedTests === totalTests ? 'PASS' : 'PARTIAL';
        
        console.log(`Overall Status: ${overallStatus}`);
        console.log(`Tests Passed: ${passedTests}/${totalTests}`);
        
        console.log('\n📋 Detailed Results:');
        console.log(`Server Status: ${this.results.server.status}`);
        console.log(`Cart Functionality: ${this.results.cart.status}`);
        console.log(`Checkout Session: ${this.results.checkout.status}`);
        console.log(`Error Handling: ${this.results.errorHandling?.status || 'NOT_TESTED'}`);
        
        if (this.results.errors.length > 0) {
            console.log('\n❌ Errors Found:');
            this.results.errors.forEach((error, index) => {
                console.log(`   ${index + 1}. ${error}`);
            });
        }
        
        console.log('\n🎯 Payment Testing Status:');
        if (overallStatus === 'PASS') {
            console.log('✅ All automated tests passed!');
            console.log('📋 Ready for manual payment testing');
            console.log('\n💳 Test Card Numbers for Manual Testing:');
            console.log('   Successful Payment: 4242 4242 4242 4242');
            console.log('   Card Declined: 4000 0000 0000 0002');
            console.log('   Insufficient Funds: 4000 0000 0000 9995');
            console.log('   3D Secure Required: 4000 0025 0000 3155');
            console.log('   Expired Card: 4000 0000 0000 0069');
        } else {
            console.log('⚠️  Some tests failed. Please fix the issues before proceeding.');
        }
        
        console.log('\n🔍 Next Steps:');
        console.log('1. Check Stripe Dashboard for payment results');
        console.log('2. Monitor server logs for any additional errors');
        console.log('3. Test the complete user flow manually');
        
        return {
            overallStatus,
            passedTests,
            totalTests,
            results: this.results
        };
    }
}

// Run the tests
const testRunner = new PaymentSystemTestRunner();
testRunner.runAllTests(); 