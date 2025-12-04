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

// --- BMW G preset tricolor (single image) ---
let currentBmwGTricolorIndex = 0;
const bmwGTricolorImages = ['images/bmwgpresettricolor.jpg'];
function changeBmwGTricolorImage(direction) {
    currentBmwGTricolorIndex += direction;
    if (currentBmwGTricolorIndex < 0) {
        currentBmwGTricolorIndex = bmwGTricolorImages.length - 1;
    } else if (currentBmwGTricolorIndex >= bmwGTricolorImages.length) {
        currentBmwGTricolorIndex = 0;
    }
    const img = document.getElementById('bmw-gtricolor-image') || document.getElementById('shop-bmw-gtricolor-image');
    if (img) img.src = bmwGTricolorImages[currentBmwGTricolorIndex];
}

// --- BMW F Series Signature Preset (single image) ---
let currentBmwFSignatureIndex = 0;
const bmwFSignatureImages = ['images/e92signaturepreset.JPG'];
function changeBmwFSignatureImage(direction) {
    currentBmwFSignatureIndex += direction;
    if (currentBmwFSignatureIndex < 0) {
        currentBmwFSignatureIndex = bmwFSignatureImages.length - 1;
    } else if (currentBmwFSignatureIndex >= bmwFSignatureImages.length) {
        currentBmwFSignatureIndex = 0;
    }
    const img = document.getElementById('bmw-fsignature-image') || document.getElementById('shop-bmw-fsignature-image');
    if (img) img.src = bmwFSignatureImages[currentBmwFSignatureIndex];
}

// --- e92 Signature Preset (single image) ---
let currentE92SignatureIndex = 0;
const e92SignatureImages = ['images/bmwfseriessignaturepreset.JPG'];
function changeE92SignatureImage(direction) {
    currentE92SignatureIndex += direction;
    if (currentE92SignatureIndex < 0) {
        currentE92SignatureIndex = e92SignatureImages.length - 1;
    } else if (currentE92SignatureIndex >= e92SignatureImages.length) {
        currentE92SignatureIndex = 0;
    }
    const img = document.getElementById('e92-signature-image') || document.getElementById('shop-e92-signature-image');
    if (img) img.src = e92SignatureImages[currentE92SignatureIndex];
}

// --- BMW F Series Simple Preset ---
let currentBmwSimplePresetIndex = 0;
const bmwSimplePresetImages = ['images/BMWFseriessimplepreset.JPG'];
function changeBmwSimplePresetImage(direction) {
    currentBmwSimplePresetIndex += direction;
    if (currentBmwSimplePresetIndex < 0) {
        currentBmwSimplePresetIndex = bmwSimplePresetImages.length - 1;
    } else if (currentBmwSimplePresetIndex >= bmwSimplePresetImages.length) {
        currentBmwSimplePresetIndex = 0;
    }
    const img = document.getElementById('bmw-simplepreset-image') || document.getElementById('shop-bmw-simplepreset-image');
    if (img) img.src = bmwSimplePresetImages[currentBmwSimplePresetIndex];
}

// --- BMW F Series M Steering Wheel (Short Gripped Perforated Leather) ---
let currentBmwFSeriesMIndex = 0;
const bmwFSeriesMImages = ['images/bmwfseriesmsteeringwheel.JPG'];
function changeBmwFSeriesMImage(direction) {
    currentBmwFSeriesMIndex += direction;
    if (currentBmwFSeriesMIndex < 0) {
        currentBmwFSeriesMIndex = bmwFSeriesMImages.length - 1;
    } else if (currentBmwFSeriesMIndex >= bmwFSeriesMImages.length) {
        currentBmwFSeriesMIndex = 0;
    }
    const img = document.getElementById('bmw-fseriesm-image') || document.getElementById('shop-bmw-fseriesm-image');
    if (img) img.src = bmwFSeriesMImages[currentBmwFSeriesMIndex];
}

// --- BMW Yuke Blackout Preset ---
let currentBmwYukeBlackoutIndex = 0;
const bmwYukeBlackoutImages = ['images/bmwyukeblackoutpreset.JPG'];
function changeBmwYukeBlackoutImage(direction) {
    currentBmwYukeBlackoutIndex += direction;
    if (currentBmwYukeBlackoutIndex < 0) {
        currentBmwYukeBlackoutIndex = bmwYukeBlackoutImages.length - 1;
    } else if (currentBmwYukeBlackoutIndex >= bmwYukeBlackoutImages.length) {
        currentBmwYukeBlackoutIndex = 0;
    }
    const img = document.getElementById('bmw-yukeblackout-image') || document.getElementById('shop-bmw-yukeblackout-image');
    if (img) img.src = bmwYukeBlackoutImages[currentBmwYukeBlackoutIndex];
}

// --- BMW F Series Red Stitched Signature Skeleton Preset ---
let currentBmwFRedSkeletonIndex = 0;
const bmwFRedSkeletonImages = ['images/bmwfseriesredstitchedsignatureskeletonpreset.JPG'];
function changeBmwFRedSkeletonImage(direction) {
    currentBmwFRedSkeletonIndex += direction;
    if (currentBmwFRedSkeletonIndex < 0) {
        currentBmwFRedSkeletonIndex = bmwFRedSkeletonImages.length - 1;
    } else if (currentBmwFRedSkeletonIndex >= bmwFRedSkeletonImages.length) {
        currentBmwFRedSkeletonIndex = 0;
    }
    const img = document.getElementById('bmw-fredskeleton-image') || document.getElementById('shop-bmw-fredskeleton-image');
    if (img) img.src = bmwFRedSkeletonImages[currentBmwFRedSkeletonIndex];
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

function toggleBmwGTricolorDescription() {
    const el = document.getElementById('bmw-gtricolor-description') || document.getElementById('shop-bmw-gtricolor-description');
    if (!el) return;
    const button = el.previousElementSibling;
    el.classList.toggle('active');
    if (button) button.classList.toggle('active');
}

function toggleBmwGTricolorModels() {
    const el = document.getElementById('bmw-gtricolor-models') || document.getElementById('shop-bmw-gtricolor-models');
    if (!el) return;
    const button = el.previousElementSibling;
    el.classList.toggle('active');
    if (button) button.classList.toggle('active');
}

function toggleBmwFSignatureDescription() {
    const el = document.getElementById('bmw-fsignature-description') || document.getElementById('shop-bmw-fsignature-description');
    if (!el) return;
    const button = el.previousElementSibling;
    el.classList.toggle('active');
    if (button) button.classList.toggle('active');
}

function toggleBmwFSignatureModels() {
    const el = document.getElementById('bmw-fsignature-models') || document.getElementById('shop-bmw-fsignature-models');
    if (!el) return;
    const button = el.previousElementSibling;
    el.classList.toggle('active');
    if (button) button.classList.toggle('active');
}

function toggleE92SignatureDescription() {
    const el = document.getElementById('e92-signature-description') || document.getElementById('shop-e92-signature-description');
    if (!el) return;
    const button = el.previousElementSibling;
    el.classList.toggle('active');
    if (button) button.classList.toggle('active');
}

function toggleE92SignatureModels() {
    const el = document.getElementById('e92-signature-models') || document.getElementById('shop-e92-signature-models');
    if (!el) return;
    const button = el.previousElementSibling;
    el.classList.toggle('active');
    if (button) button.classList.toggle('active');
}

function toggleBmwSimplePresetDescription() {
    const el = document.getElementById('bmw-simplepreset-description') || document.getElementById('shop-bmw-simplepreset-description');
    if (!el) return;
    const button = el.previousElementSibling;
    el.classList.toggle('active');
    if (button) button.classList.toggle('active');
}

function toggleBmwSimplePresetModels() {
    const el = document.getElementById('bmw-simplepreset-models') || document.getElementById('shop-bmw-simplepreset-models');
    if (!el) return;
    const button = el.previousElementSibling;
    el.classList.toggle('active');
    if (button) button.classList.toggle('active');
}

function toggleBmwFSeriesMDescription() {
    const el = document.getElementById('bmw-fseriesm-description') || document.getElementById('shop-bmw-fseriesm-description');
    if (!el) return;
    const button = el.previousElementSibling;
    el.classList.toggle('active');
    if (button) button.classList.toggle('active');
}

function toggleBmwFSeriesMModels() {
    const el = document.getElementById('bmw-fseriesm-models') || document.getElementById('shop-bmw-fseriesm-models');
    if (!el) return;
    const button = el.previousElementSibling;
    el.classList.toggle('active');
    if (button) button.classList.toggle('active');
}

function toggleBmwYukeBlackoutDescription() {
    const el = document.getElementById('bmw-yukeblackout-description') || document.getElementById('shop-bmw-yukeblackout-description');
    if (!el) return;
    const button = el.previousElementSibling;
    el.classList.toggle('active');
    if (button) button.classList.toggle('active');
}

function toggleBmwYukeBlackoutModels() {
    const el = document.getElementById('bmw-yukeblackout-models') || document.getElementById('shop-bmw-yukeblackout-models');
    if (!el) return;
    const button = el.previousElementSibling;
    el.classList.toggle('active');
    if (button) button.classList.toggle('active');
}

function toggleBmwFRedSkeletonDescription() {
    const el = document.getElementById('bmw-fredskeleton-description') || document.getElementById('shop-bmw-fredskeleton-description');
    if (!el) return;
    const button = el.previousElementSibling;
    el.classList.toggle('active');
    if (button) button.classList.toggle('active');
}

function toggleBmwFRedSkeletonModels() {
    const el = document.getElementById('bmw-fredskeleton-models') || document.getElementById('shop-bmw-fredskeleton-models');
    if (!el) return;
    const button = el.previousElementSibling;
    el.classList.toggle('active');
    if (button) button.classList.toggle('active');
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