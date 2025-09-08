// --- BMW Basic Image Carousel ---
let currentBmwBasicImageIndex = 0;
const bmwBasicImages = ["images/bmw6.JPG", "images/bmw5.JPG", "images/bmw7.JPG", "images/bmw8.JPG"];

function changeBmwBasicImage(direction) {
    currentBmwBasicImageIndex += direction;
    if (currentBmwBasicImageIndex < 0) {
        currentBmwBasicImageIndex = bmwBasicImages.length - 1;
    } else if (currentBmwBasicImageIndex >= bmwBasicImages.length) {
        currentBmwBasicImageIndex = 0;
    }
    document.getElementById("bmw-basic-image").src = bmwBasicImages[currentBmwBasicImageIndex];
}

// --- The G Image Carousel ---
let currentBmwGImageIndex = 0;
const bmwGImages = ['images/bmw1.JPG', 'images/bmw2.JPG', 'images/bmw3.JPG', 'images/bmw4.JPG'];

function changeBmwGImage(direction) {
    currentBmwGImageIndex += direction;
    if (currentBmwGImageIndex < 0) {
        currentBmwGImageIndex = bmwGImages.length - 1;
    } else if (currentBmwGImageIndex >= bmwGImages.length) {
        currentBmwGImageIndex = 0;
    }
    document.getElementById("bmw-image").src = bmwGImages[currentBmwGImageIndex];
}

// --- Toggle Descriptions & Models ---
function toggleBmwBasicDescription() {
    const description = document.getElementById("bmw-basic-description");
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleBmwBasicModels() {
    const models = document.getElementById("bmw-basic-models");
    const button = models.previousElementSibling;
    models.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleDescription() {
    const description = document.getElementById("bmw-description");
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleBmwModels() {
    const models = document.getElementById("bmw-models");
    const button = models.previousElementSibling;
    models.classList.toggle("active");
    button.classList.toggle("active");
}

// --- Add to Cart for BMW Presets ---
function setupBmwAddToCartButtons() {
    const productItems = document.querySelectorAll('.bmw-product-item');
    productItems.forEach(item => {
        const nameElement = item.querySelector('h3');
        const priceElement = item.querySelector('.bmw-product-price');
        const button = item.querySelector('.add-to-cart-btn');
        const variantSelect = item.querySelector('.preset-variant-select');
        if (!nameElement || !priceElement || !button) return;

        const name = nameElement.textContent.trim();
        const priceText = priceElement.textContent.trim().replace('$', '').replace(',', '');
        const price = parseFloat(priceText) || 0;

        button.addEventListener('click', function() {
            const cart = JSON.parse(localStorage.getItem('torqdCart')) || [];
            const presetItem = {
                type: 'preset',
                name: name,
                price: price,
                variant: variantSelect ? variantSelect.value : 'Sport'
            };
            cart.push(presetItem);
            localStorage.setItem('torqdCart', JSON.stringify(cart));
            if (typeof updateCartCount === 'function') {
                updateCartCount();
            }
            alert('Added to cart: ' + name + (presetItem.variant ? ' (' + presetItem.variant + ')' : ''));
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupBmwAddToCartButtons();
}); 