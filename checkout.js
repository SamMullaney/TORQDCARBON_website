// Checkout Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Checkout page initialized');
    
    // Stripe configuration with your test publishable key
    const stripe = Stripe('pk_test_51S09SAR78C1ToqZL9GmXlwr7bQHdtzbZbJSgx8Aax8MWJZAJCYDiIGAjZB2zbKzZEz9yVud7RxTcbW2LKnuSXE2p00UN1aftmZ');
    
    // Cart data
    let cart = JSON.parse(localStorage.getItem('torqdCart')) || [];
    
    // Initialize the page
    initCheckout();
    
    function initCheckout() {
        displayCart();
        setupCheckoutButton();
    }
    
    function displayCart() {
        const cartContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Start customizing your steering wheel to add items to your cart.</p>
                    <a href="customize.html">Go to Customizer</a>
                </div>
            `;
            cartTotal.textContent = '$0.00';
            return;
        }
        
        let total = 0;
        const cartHTML = cart.map((item, index) => {
            const itemPrice = calculateItemPrice(item);
            total += itemPrice;
            
            return `
                <div class="cart-item">
                    <div class="cart-item-header">
                        <div class="cart-item-title">Custom Steering Wheel</div>
                        <div class="cart-item-price">$${itemPrice.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-specs">
                        <div class="cart-item-spec">
                            <span class="cart-item-spec-label">Base:</span>
                            <span class="cart-item-spec-value">${item.base}</span>
                        </div>
                        <div class="cart-item-spec">
                            <span class="cart-item-spec-label">Sides:</span>
                            <span class="cart-item-spec-value">${item.sides}</span>
                        </div>
                        <div class="cart-item-spec">
                            <span class="cart-item-spec-label">Top/Bottom:</span>
                            <span class="cart-item-spec-value">${item.topbottom}</span>
                        </div>
                        <div class="cart-item-spec">
                            <span class="cart-item-spec-label">Badge:</span>
                            <span class="cart-item-spec-value">${item.badge.toUpperCase()}</span>
                        </div>
                        <div class="cart-item-spec">
                            <span class="cart-item-spec-label">Airbag:</span>
                            <span class="cart-item-spec-value">${formatAirbag(item.airbag)}</span>
                        </div>
                        <div class="cart-item-spec">
                            <span class="cart-item-spec-label">Top Stripe:</span>
                            <span class="cart-item-spec-value">${item.topStripe === 'yes' ? 'Yes' : 'No'}</span>
                        </div>
                        ${item.topStripe === 'yes' ? `
                        <div class="cart-item-spec">
                            <span class="cart-item-spec-label">Stripe Color:</span>
                            <span class="cart-item-spec-value">${formatColor(item.stripeColor)}</span>
                        </div>
                        ` : ''}
                        <div class="cart-item-spec">
                            <span class="cart-item-spec-label">Heating:</span>
                            <span class="cart-item-spec-value">${item.heating === 'yes' ? 'Yes (+$50)' : 'No'}</span>
                        </div>
                        <div class="cart-item-spec">
                            <span class="cart-item-spec-label">Trim Color:</span>
                            <span class="cart-item-spec-value">${formatTrimColor(item.trimColor)}</span>
                        </div>
                        ${item.additionalSpecs ? `
                        <div class="cart-item-spec">
                            <span class="cart-item-spec-label">Additional Specs:</span>
                            <span class="cart-item-spec-value">${item.additionalSpecs}</span>
                        </div>
                        ` : ''}
                    </div>
                    <div class="cart-item-actions">
                        <button class="remove-item" onclick="removeFromCart(${index})">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        cartContainer.innerHTML = cartHTML;
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
    
    function calculateItemPrice(item) {
        let basePrice = 799.99;
        
        // Add heating cost if selected
        if (item.heating === 'yes') {
            basePrice += 50;
        }
        
        return basePrice;
    }
    
    function formatAirbag(airbag) {
        const airbagDisplay = {
            'smooth-leather': 'Smooth Leather',
            'alcantara': 'Alcantara',
            'no-airbag': 'No Airbag'
        };
        return airbagDisplay[airbag] || airbag;
    }
    
    function formatColor(color) {
        const colorDisplay = {
            '#FFFFFF': 'White',
            '#A80000': 'Red',
            '#118DFF': 'Blue',
            '#12239E': 'Navy',
            '#480091': 'Purple',
            '#0AAC00': 'Green',
            '#F17925': 'Orange',
            '#ECC846': 'Yellow'
        };
        return colorDisplay[color] || color;
    }
    
    function formatTrimColor(trimColor) {
        const trimColorDisplay = {
            'chrome': 'Chrome',
            'gloss-black': 'Gloss Black'
        };
        return trimColorDisplay[trimColor] || trimColor;
    }
    
    function setupCheckoutButton() {
        const checkoutButton = document.getElementById('checkout-button');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', async function() {
                if (cart.length === 0) {
                    alert('Your cart is empty. Please add items before proceeding.');
                    return;
                }
                
                // Validate cart data
                const validationError = validateCart();
                if (validationError) {
                    alert(validationError);
                    return;
                }
                
                // Disable button and show loading
                checkoutButton.disabled = true;
                checkoutButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Checkout...';
                
                try {
                    // Create checkout session
                    const response = await createCheckoutSession();
                    
                    if (response.error) {
                        throw new Error(response.error);
                    }
                    
                    // Redirect to Stripe Checkout
                    const result = await stripe.redirectToCheckout({
                        sessionId: response.sessionId
                    });
                    
                    if (result.error) {
                        throw new Error(result.error.message);
                    }
                    
                } catch (error) {
                    console.error('Checkout error:', error);
                    
                    // Show user-friendly error message
                    let errorMessage = 'An error occurred while creating checkout. Please try again.';
                    
                    if (error.message.includes('network')) {
                        errorMessage = 'Network error. Please check your internet connection and try again.';
                    } else if (error.message.includes('session')) {
                        errorMessage = 'Unable to create checkout session. Please refresh the page and try again.';
                    }
                    
                    alert(errorMessage);
                    
                    // Re-enable button
                    checkoutButton.disabled = false;
                    checkoutButton.innerHTML = '<i class="fas fa-lock"></i> Proceed to Checkout';
                }
            });
        }
    }
    
    function validateCart() {
        if (!cart || cart.length === 0) {
            return 'Cart is empty';
        }
        
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            
            if (!item.base || !item.sides || !item.topbottom) {
                return 'Invalid cart item data';
            }
            
            if (!item.badge || !item.airbag || !item.topStripe || !item.heating || !item.trimColor) {
                return 'Missing required item specifications';
            }
            
            // Validate price calculation
            const calculatedPrice = calculateItemPrice(item);
            if (calculatedPrice <= 0 || calculatedPrice > 10000) {
                return 'Invalid price calculation';
            }
        }
        
        return null; // No validation errors
    }
    
    async function createCheckoutSession() {
        // Calculate total
        const total = cart.reduce((sum, item) => sum + calculateItemPrice(item), 0);
        
        try {
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cart: cart,
                    total: total
                })
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'Failed to create checkout session');
            }
            
            return result;
            
        } catch (error) {
            console.error('Error creating checkout session:', error);
            throw error;
        }
    }
});

// Global function to remove items from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('torqdCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('torqdCart', JSON.stringify(cart));
    
    // Reload the page to update the display
    location.reload();
} 