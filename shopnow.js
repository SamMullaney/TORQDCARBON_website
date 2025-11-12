// Shop Now page bootstrap
document.addEventListener('DOMContentLoaded', function () {
    console.log('Shop Now page loaded');

    // Custom Request (Don't see your car) - mandatory questionnaire
    const addBtn = document.getElementById('anycar-add');
    if (addBtn) {
        addBtn.addEventListener('click', function () {
            const ymm = (document.getElementById('anycar-ymm') || {}).value || '';
            const email = (document.getElementById('anycar-email') || {}).value || '';
            const sides = (document.getElementById('anycar-sides') || {}).value || '';
            const topbottom = (document.getElementById('anycar-topbottom') || {}).value || '';
            const notes = (document.getElementById('anycar-notes') || {}).value || '';
            const errorBox = document.getElementById('anycar-error');

            // Basic validation
            const errors = [];
            if (!ymm.trim()) errors.push('Please enter the year, make, and model.');
            if (!email.trim()) errors.push('Please enter your email.');
            if (!sides) errors.push('Please select a side grip material.');
            if (!topbottom) errors.push('Please select a top/bottom grip material.');

            if (errors.length) {
                if (errorBox) {
                    errorBox.style.display = '';
                    errorBox.innerHTML = errors.map(e => `<div>${e}</div>`).join('');
                } else {
                    alert(errors.join('\n'));
                }
                return;
            } else if (errorBox) {
                errorBox.style.display = 'none';
                errorBox.textContent = '';
            }

            const cart = JSON.parse(localStorage.getItem('torqdCart')) || [];
            const presetItem = {
                type: 'preset',
                name: `Custom Wheel Request - ${ymm}`,
                price: 749.99,
                variant: `Sides: ${sides}; Top/Bottom: ${topbottom}`,
                email: email,
                additionalSpecs: notes
            };
            cart.push(presetItem);
            localStorage.setItem('torqdCart', JSON.stringify(cart));
            if (typeof updateCartCount === 'function') {
                updateCartCount();
            }
            alert('Added to cart: Custom Wheel Request');
        });
    }
});


