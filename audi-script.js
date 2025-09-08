// --- Audi B8-B8.5 Image Carousel ---
let currentAudiImageIndex = 0;
const audiImages = ["images/b8-b8.5 preset1.JPG", "images/b8-b8.5 preset2.JPG", "images/b8-b8.5 preset3.JPG"];

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

// --- Toggle Descriptions & Models ---
function toggleAudiDescription() {
    const description = document.getElementById("audi-description");
    const button = description.previousElementSibling;
    description.classList.toggle("active");
    button.classList.toggle("active");
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
