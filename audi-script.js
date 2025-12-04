// --- Audi B8-B8.5 Image Carousel ---
let currentAudiImageIndex = 0;
const audiImages = ["images/b8-b8.5%20preset1.JPG", "images/b8-b8.5%20preset2.JPG", "images/b8-b8.5%20preset3.JPG"];

function changeAudiImage(direction) {
    currentAudiImageIndex += direction;
    if (currentAudiImageIndex < 0) {
        currentAudiImageIndex = audiImages.length - 1;
    } else if (currentAudiImageIndex >= audiImages.length) {
        currentAudiImageIndex = 0;
    }
    document.getElementById("audi-image").src = audiImages[currentAudiImageIndex];
}

// --- The Carbon King Image Carousel ---
let currentCarbonKingImageIndex = 0;
const carbonKingImages = ["images/carbonking1.JPG", "images/carbonking2.JPG", "images/carbonking3.JPG", "images/carbonking4.JPG"];

function changeCarbonKingImage(direction) {
    currentCarbonKingImageIndex += direction;
    if (currentCarbonKingImageIndex < 0) {
        currentCarbonKingImageIndex = carbonKingImages.length - 1;
    } else if (currentCarbonKingImageIndex >= carbonKingImages.length) {
        currentCarbonKingImageIndex = 0;
    }
    document.getElementById("carbonking-image").src = carbonKingImages[currentCarbonKingImageIndex];
}

// --- The Perfect Daily Image Carousel ---
let currentPerfectDailyImageIndex = 0;
const perfectDailyImages = ["images/perfectdaily1.JPG", "images/perfectdaily2.JPG", "images/perfectdaily3.JPG"];

function changePerfectDailyImage(direction) {
    currentPerfectDailyImageIndex += direction;
    if (currentPerfectDailyImageIndex < 0) {
        currentPerfectDailyImageIndex = perfectDailyImages.length - 1;
    } else if (currentPerfectDailyImageIndex >= perfectDailyImages.length) {
        currentPerfectDailyImageIndex = 0;
    }
    document.getElementById("perfectdaily-image").src = perfectDailyImages[currentPerfectDailyImageIndex];
}

// --- The Sleeper Image Carousel ---
let currentSleeperImageIndex = 0;
const sleeperImages = ["images/sleeper1.JPG", "images/sleeper2.JPG", "images/sleeper3.JPG", "images/sleeper4.JPG"];

function changeSleeperImage(direction) {
    currentSleeperImageIndex += direction;
    if (currentSleeperImageIndex < 0) {
        currentSleeperImageIndex = sleeperImages.length - 1;
    } else if (currentSleeperImageIndex >= sleeperImages.length) {
        currentSleeperImageIndex = 0;
    }
    document.getElementById("sleeper-image").src = sleeperImages[currentSleeperImageIndex];
}

// --- The Autobahn Special Image Carousel ---
let currentAutobanImageIndex = 0;
const autobanImages = ["images/autoban1.JPG", "images/autoban2.JPG", "images/autoban3.JPG", "images/autoban4.JPG", "images/autoban5.JPG", "images/autoban6.JPG"];

function changeAutobanImage(direction) {
    currentAutobanImageIndex += direction;
    if (currentAutobanImageIndex < 0) {
        currentAutobanImageIndex = autobanImages.length - 1;
    } else if (currentAutobanImageIndex >= autobanImages.length) {
        currentAutobanImageIndex = 0;
    }
    document.getElementById("autoban-image").src = autobanImages[currentAutobanImageIndex];
}

// --- The Spyder Image Carousel ---
let currentSpyderImageIndex = 0;
const spyderImages = ["images/spyder1.JPG", "images/spyder2.JPG", "images/spyder3.JPG", "images/spyder4.JPG", "images/spyder5.JPG", "images/spyder6.JPG"];

function changeSpyderImage(direction) {
    currentSpyderImageIndex += direction;
    if (currentSpyderImageIndex < 0) {
        currentSpyderImageIndex = spyderImages.length - 1;
    } else if (currentSpyderImageIndex >= spyderImages.length) {
        currentSpyderImageIndex = 0;
    }
    document.getElementById("spyder-image").src = spyderImages[currentSpyderImageIndex];
}

// --- The Flat Top Image Carousel ---
let currentFlattopImageIndex = 0;
const flattopImages = ["images/flattop1.JPG", "images/flattop2.JPG", "images/flattop3.JPG", "images/flattop4.JPG"];

function changeFlattopImage(direction) {
    currentFlattopImageIndex += direction;
    if (currentFlattopImageIndex < 0) {
        currentFlattopImageIndex = flattopImages.length - 1;
    } else if (currentFlattopImageIndex >= flattopImages.length) {
        currentFlattopImageIndex = 0;
    }
    document.getElementById("flattop-image").src = flattopImages[currentFlattopImageIndex];
}

// --- b8.5 Forged Red Preset Image Carousel ---
let currentB85ForgedImageIndex = 0;
const b85ForgedImages = ["images/b8.5forgedredpreset.JPG", "images/b8.5forgedredpreset(1).JPG"];

function changeB85ForgedRedImage(direction) {
    currentB85ForgedImageIndex += direction;
    if (currentB85ForgedImageIndex < 0) {
        currentB85ForgedImageIndex = b85ForgedImages.length - 1;
    } else if (currentB85ForgedImageIndex >= b85ForgedImages.length) {
        currentB85ForgedImageIndex = 0;
    }
    document.getElementById("b85forged-image").src = b85ForgedImages[currentB85ForgedImageIndex];
}

// --- b9 Flat Bottom Skeleton Preset Red Image Carousel ---
let currentB9SkeletonImageIndex = 0;
const b9SkeletonImages = ["images/b9flatbottomskeleton.JPG"];

function changeB9SkeletonImage(direction) {
    currentB9SkeletonImageIndex += direction;
    if (currentB9SkeletonImageIndex < 0) {
        currentB9SkeletonImageIndex = b9SkeletonImages.length - 1;
    } else if (currentB9SkeletonImageIndex >= b9SkeletonImages.length) {
        currentB9SkeletonImageIndex = 0;
    }
    document.getElementById("b9skeleton-image").src = b9SkeletonImages[currentB9SkeletonImageIndex];
}

// --- b9 Flat Bottom S Model Preset Red Carousel ---
let currentB9SModelRedIndex = 0;
const b9SModelRedImages = ["images/b9FlatBottomSModelPresetRed.JPG"];

function changeB9SModelRedImage(direction) {
    currentB9SModelRedIndex += direction;
    if (currentB9SModelRedIndex < 0) {
        currentB9SModelRedIndex = b9SModelRedImages.length - 1;
    } else if (currentB9SModelRedIndex >= b9SModelRedImages.length) {
        currentB9SModelRedIndex = 0;
    }
    document.getElementById("b9smodelred-image").src = b9SModelRedImages[currentB9SModelRedIndex];
}

// --- b9 Flat Bottom Preset Blue Carousel ---
let currentB9FlatBlueIndex = 0;
const b9FlatBlueImages = ["images/b9flatbottompresetblue.JPG"];

function changeB9FlatBlueImage(direction) {
    currentB9FlatBlueIndex += direction;
    if (currentB9FlatBlueIndex < 0) {
        currentB9FlatBlueIndex = b9FlatBlueImages.length - 1;
    } else if (currentB9FlatBlueIndex >= b9FlatBlueImages.length) {
        currentB9FlatBlueIndex = 0;
    }
    document.getElementById("b9flatblue-image").src = b9FlatBlueImages[currentB9FlatBlueIndex];
}

// --- Audi B8.5 German F1 Steering Wheel Carousel ---
let currentAudiGermanF1Index = 0;
const audiGermanF1Images = ["images/AudiB8.5GermanF1SteeringWheel.JPG"];

function changeAudiGermanF1Image(direction) {
    currentAudiGermanF1Index += direction;
    if (currentAudiGermanF1Index < 0) {
        currentAudiGermanF1Index = audiGermanF1Images.length - 1;
    } else if (currentAudiGermanF1Index >= audiGermanF1Images.length) {
        currentAudiGermanF1Index = 0;
    }
    const img = document.getElementById("audi-germanf1-image") || document.getElementById("shop-audi-germanf1-image");
    if (img) img.src = audiGermanF1Images[currentAudiGermanF1Index];
}

// --- Audi B8.5/C7 Blue Comfort Preset Carousel ---
let currentAudiBlueComfortIndex = 0;
const audiBlueComfortImages = ["images/AudiB8.5:C7BlueComfortpreset.JPG"];

function changeAudiBlueComfortImage(direction) {
    currentAudiBlueComfortIndex += direction;
    if (currentAudiBlueComfortIndex < 0) {
        currentAudiBlueComfortIndex = audiBlueComfortImages.length - 1;
    } else if (currentAudiBlueComfortIndex >= audiBlueComfortImages.length) {
        currentAudiBlueComfortIndex = 0;
    }
    const img = document.getElementById("audi-bluecomfort-image") || document.getElementById("shop-audi-bluecomfort-image");
    if (img) img.src = audiBlueComfortImages[currentAudiBlueComfortIndex];
}

// --- b9 Carbon King Preset (single image) ---
let currentB9CkpIndex = 0;
const b9CkpImages = ["images/b9carbonkingpreset.jpg"];

function changeB9CarbonKingPresetImage(direction) {
    currentB9CkpIndex += direction;
    if (currentB9CkpIndex < 0) {
        currentB9CkpIndex = b9CkpImages.length - 1;
    } else if (currentB9CkpIndex >= b9CkpImages.length) {
        currentB9CkpIndex = 0;
    }
    // Support shopnow and audi pages IDs
    const img = document.getElementById("b9ckp-image") || document.getElementById("shop-b9ckp-image");
    if (img) img.src = b9CkpImages[currentB9CkpIndex];
}

// --- b9 Comfort Style Skeleton Red (single image) ---
let currentB9ComfortRedIndex = 0;
const b9ComfortRedImages = ["images/b9comfortstyleskeletonred.PNG"];

function changeB9ComfortSkeletonRedImage(direction) {
    currentB9ComfortRedIndex += direction;
    if (currentB9ComfortRedIndex < 0) {
        currentB9ComfortRedIndex = b9ComfortRedImages.length - 1;
    } else if (currentB9ComfortRedIndex >= b9ComfortRedImages.length) {
        currentB9ComfortRedIndex = 0;
    }
    const img = document.getElementById("b9comfortred-image") || document.getElementById("shop-b9comfortred-image");
    if (img) img.src = b9ComfortRedImages[currentB9ComfortRedIndex];
}

// --- Toggle Descriptions & Models ---
function toggleAudiDescription() {
    const description = document.getElementById("audi-description");
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleB9CarbonKingPresetDescription() {
    const description = document.getElementById("b9ckp-description") || document.getElementById("shop-b9ckp-description");
    if (!description) return;
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    if (button) button.classList.toggle("active");
}

function toggleB9CarbonKingPresetModels() {
    const models = document.getElementById("b9ckp-models") || document.getElementById("shop-b9ckp-models");
    if (!models) return;
    const button = models.previousElementSibling;
    models.classList.toggle("active");
    if (button) button.classList.toggle("active");
}

function toggleB9ComfortSkeletonRedDescription() {
    const description = document.getElementById("b9comfortred-description") || document.getElementById("shop-b9comfortred-description");
    if (!description) return;
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    if (button) button.classList.toggle("active");
}

function toggleB9ComfortSkeletonRedModels() {
    const models = document.getElementById("b9comfortred-models") || document.getElementById("shop-b9comfortred-models");
    if (!models) return;
    const button = models.previousElementSibling;
    models.classList.toggle("active");
    if (button) button.classList.toggle("active");
}
function toggleAudiModels() {
    const models = document.getElementById("audi-models");
    const button = models.previousElementSibling;
    models.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleCarbonKingDescription() {
    const description = document.getElementById("carbonking-description");
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleCarbonKingModels() {
    const models = document.getElementById("carbonking-models");
    const button = models.previousElementSibling;
    models.classList.toggle("active");
    button.classList.toggle("active");
}

function togglePerfectDailyDescription() {
    const description = document.getElementById("perfectdaily-description");
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    button.classList.toggle("active");
}

function togglePerfectDailyModels() {
    const models = document.getElementById("perfectdaily-models");
    const button = models.previousElementSibling;
    models.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleSleeperDescription() {
    const description = document.getElementById("sleeper-description");
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleSleeperModels() {
    const models = document.getElementById("sleeper-models");
    const button = models.previousElementSibling;
    models.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleAutobanDescription() {
    const description = document.getElementById("autoban-description");
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleAutobanModels() {
    const models = document.getElementById("autoban-models");
    const button = models.previousElementSibling;
    models.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleSpyderDescription() {
    const description = document.getElementById("spyder-description");
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleSpyderModels() {
    const models = document.getElementById("spyder-models");
    const button = models.previousElementSibling;
    models.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleFlattopDescription() {
    const description = document.getElementById("flattop-description");
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleFlattopModels() {
    const models = document.getElementById("flattop-models");
    const button = models.previousElementSibling;
    models.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleB85ForgedDescription() {
    const description = document.getElementById("b85forged-description");
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleB85ForgedModels() {
    const models = document.getElementById("b85forged-models");
    const button = models.previousElementSibling;
    models.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleB9SkeletonDescription() {
    const description = document.getElementById("b9skeleton-description");
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleB9SkeletonModels() {
    const models = document.getElementById("b9skeleton-models");
    const button = models.previousElementSibling;
    models.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleB9SModelRedDescription() {
    const description = document.getElementById("b9smodelred-description");
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleB9SModelRedModels() {
    const models = document.getElementById("b9smodelred-models");
    const button = models.previousElementSibling;
    models.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleB9FlatBlueDescription() {
    const description = document.getElementById("b9flatblue-description");
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleB9FlatBlueModels() {
    const models = document.getElementById("b9flatblue-models");
    const button = models.previousElementSibling;
    models.classList.toggle("active");
    button.classList.toggle("active");
}

function toggleAudiGermanF1Description() {
    const description = document.getElementById("audi-germanf1-description") || document.getElementById("shop-audi-germanf1-description");
    if (!description) return;
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    if (button) button.classList.toggle("active");
}

function toggleAudiGermanF1Models() {
    const models = document.getElementById("audi-germanf1-models") || document.getElementById("shop-audi-germanf1-models");
    if (!models) return;
    const button = models.previousElementSibling;
    models.classList.toggle("active");
    if (button) button.classList.toggle("active");
}

function toggleAudiBlueComfortDescription() {
    const description = document.getElementById("audi-bluecomfort-description") || document.getElementById("shop-audi-bluecomfort-description");
    if (!description) return;
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    if (button) button.classList.toggle("active");
}

function toggleAudiBlueComfortModels() {
    const models = document.getElementById("audi-bluecomfort-models") || document.getElementById("shop-audi-bluecomfort-models");
    if (!models) return;
    const button = models.previousElementSibling;
    models.classList.toggle("active");
    if (button) button.classList.toggle("active");
}
// --- Add to Cart for Audi Presets ---
function setupAudiAddToCartButtons() {
    const productItems = document.querySelectorAll('.audi-product-item');
    productItems.forEach(item => {
        const nameElement = item.querySelector('h3');
        const priceElement = item.querySelector('.audi-product-price');
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
    setupAudiAddToCartButtons();
});
