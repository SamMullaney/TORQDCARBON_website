// Customization Page JavaScript

class SteeringWheelConfigurator {
    constructor() {
        this.currentPart = 'rim';
        this.currentRotation = 0;
        this.configuration = {
            rim: 'carbon-fiber',
            spokes: '3-spoke',
            center: 'carbon-center',
            grips: 'standard-grip',
            buttons: 'carbon-buttons',
            paddles: 'carbon-paddles'
        };
        this.prices = {
            'carbon-fiber': 800,
            'alcantara': 600,
            'leather': 500,
            'suede': 700,
            '3-spoke': 200,
            '4-spoke': 250,
            '5-spoke': 300,
            'flat-bottom': 400,
            'carbon-center': 300,
            'leather-center': 200,
            'alcantara-center': 250,
            'custom-logo': 500,
            'standard-grip': 150,
            'perforated-grip': 200,
            'thick-grip': 250,
            'thin-grip': 100,
            'carbon-buttons': 300,
            'chrome-buttons': 200,
            'black-buttons': 150,
            'no-buttons': 0,
            'carbon-paddles': 400,
            'aluminum-paddles': 300,
            'extended-paddles': 500,
            'no-paddles': 0
        };
        this.basePrice = 1000;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDisplay();
        this.updatePrice();
    }

    bindEvents() {
        // Part selection
        document.querySelectorAll('.part-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.selectPart(e.currentTarget.dataset.part);
            });
        });

        // Option selection
        document.querySelectorAll('.option-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.selectOption(e.currentTarget.dataset.option);
            });
        });

        // Rotation controls
        document.getElementById('rotate-left').addEventListener('click', () => {
            this.rotateWheel(-45);
        });

        document.getElementById('rotate-right').addEventListener('click', () => {
            this.rotateWheel(45);
        });

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.rotateWheel(-45);
            } else if (e.key === 'ArrowRight') {
                this.rotateWheel(45);
            }
        });

        // Action buttons
        document.getElementById('get-quote-btn').addEventListener('click', () => {
            this.getQuote();
        });

        document.getElementById('save-design-btn').addEventListener('click', () => {
            this.saveDesign();
        });

        // Mouse drag for rotation
        this.initDragRotation();
    }

    selectPart(part) {
        // Update active part
        document.querySelectorAll('.part-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-part="${part}"]`).classList.add('active');

        // Update active option group
        document.querySelectorAll('.option-group').forEach(group => {
            group.classList.remove('active');
        });
        document.querySelector(`[data-part="${part}"]`).classList.add('active');

        this.currentPart = part;
    }

    selectOption(option) {
        // Update configuration
        this.configuration[this.currentPart] = option;

        // Update active option
        document.querySelectorAll('.option-item').forEach(item => {
            item.classList.remove('active');
        });
        event.target.closest('.option-item').classList.add('active');

        // Update steering wheel appearance
        this.updateWheelAppearance();
        this.updateDisplay();
        this.updatePrice();
    }

    rotateWheel(angle) {
        this.currentRotation += angle;
        const wheel = document.getElementById('steering-wheel');
        wheel.style.transform = `rotateY(${this.currentRotation}deg)`;
    }

    initDragRotation() {
        const wheel = document.getElementById('steering-wheel');
        let isDragging = false;
        let startX = 0;
        let startRotation = 0;

        wheel.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startRotation = this.currentRotation;
            wheel.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const rotation = startRotation + (deltaX * 0.5);
            this.currentRotation = rotation;
            wheel.style.transform = `rotateY(${rotation}deg)`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            wheel.style.cursor = 'grab';
        });

        // Touch events for mobile
        wheel.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            startRotation = this.currentRotation;
        });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            const deltaX = e.touches[0].clientX - startX;
            const rotation = startRotation + (deltaX * 0.5);
            this.currentRotation = rotation;
            wheel.style.transform = `rotateY(${rotation}deg)`;
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    updateWheelAppearance() {
        const wheel = document.getElementById('steering-wheel');
        const rim = wheel.querySelector('.wheel-rim');
        const spokes = wheel.querySelectorAll('.spoke');
        const center = wheel.querySelector('.wheel-center');
        const grips = wheel.querySelectorAll('.grip');
        const buttons = wheel.querySelectorAll('.button');
        const paddles = wheel.querySelectorAll('.paddle');

        // Update rim material
        rim.className = `wheel-rim ${this.configuration.rim}`;

        // Update spokes
        spokes.forEach((spoke, index) => {
            if (this.configuration.spokes === '3-spoke' && index < 3) {
                spoke.style.display = 'block';
            } else if (this.configuration.spokes === '4-spoke' && index < 4) {
                spoke.style.display = 'block';
            } else if (this.configuration.spokes === '5-spoke' && index < 5) {
                spoke.style.display = 'block';
            } else {
                spoke.style.display = 'none';
            }
        });

        // Update center
        center.className = `wheel-center ${this.configuration.center}`;

        // Update grips
        grips.forEach(grip => {
            grip.className = `grip ${this.configuration.grips}`;
        });

        // Update buttons
        buttons.forEach(button => {
            if (this.configuration.buttons === 'no-buttons') {
                button.style.display = 'none';
            } else {
                button.style.display = 'block';
                button.className = `button ${this.configuration.buttons}`;
            }
        });

        // Update paddles
        paddles.forEach(paddle => {
            if (this.configuration.paddles === 'no-paddles') {
                paddle.style.display = 'none';
            } else {
                paddle.style.display = 'block';
                paddle.className = `paddle ${this.configuration.paddles}`;
            }
        });
    }

    updateDisplay() {
        // Update specification display
        document.getElementById('rim-spec').textContent = this.configuration.rim.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        document.getElementById('spokes-spec').textContent = this.configuration.spokes.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        document.getElementById('center-spec').textContent = this.configuration.center.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        document.getElementById('grips-spec').textContent = this.configuration.grips.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        document.getElementById('buttons-spec').textContent = this.configuration.buttons.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        document.getElementById('paddles-spec').textContent = this.configuration.paddles.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    updatePrice() {
        let totalPrice = this.basePrice;
        
        Object.values(this.configuration).forEach(option => {
            totalPrice += this.prices[option] || 0;
        });

        document.getElementById('total-price').textContent = `$${totalPrice.toLocaleString()}`;
    }

    getQuote() {
        const config = JSON.stringify(this.configuration, null, 2);
        const price = document.getElementById('total-price').textContent;
        
        const message = `Custom Steering Wheel Quote\n\nConfiguration:\n${config}\n\nTotal Price: ${price}\n\nPlease contact us for detailed pricing and availability.`;
        
        // For now, just show an alert. In production, this would send to a server
        alert(message);
        
        // You could also redirect to contact page with pre-filled form
        // window.location.href = 'index.html#contact';
    }

    saveDesign() {
        const design = {
            configuration: this.configuration,
            price: document.getElementById('total-price').textContent,
            timestamp: new Date().toISOString()
        };
        
        // Save to localStorage for now
        const savedDesigns = JSON.parse(localStorage.getItem('torqdDesigns') || '[]');
        savedDesigns.push(design);
        localStorage.setItem('torqdDesigns', JSON.stringify(savedDesigns));
        
        alert('Design saved! You can access it later from your saved designs.');
    }

    // Method to load a saved design
    loadDesign(design) {
        this.configuration = design.configuration;
        this.updateWheelAppearance();
        this.updateDisplay();
        this.updatePrice();
        
        // Update UI to reflect loaded design
        Object.entries(this.configuration).forEach(([part, option]) => {
            const optionElement = document.querySelector(`[data-option="${option}"]`);
            if (optionElement) {
                optionElement.classList.add('active');
            }
        });
    }
}

// Initialize the configurator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const configurator = new SteeringWheelConfigurator();
    
    // Make configurator globally available for debugging
    window.configurator = configurator;
});

// Add some visual feedback for interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to steering wheel parts
    const wheel = document.getElementById('steering-wheel');
    
    wheel.addEventListener('mouseenter', () => {
        wheel.style.cursor = 'grab';
    });
    
    wheel.addEventListener('mouseleave', () => {
        wheel.style.cursor = 'default';
    });

    // Add loading animation
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add smooth transitions for option changes
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .wheel-rim, .spoke, .wheel-center, .grip, .button, .paddle {
            transition: all 0.3s ease;
        }
        
        .option-item {
            transition: all 0.2s ease;
        }
        
        .part-item {
            transition: all 0.2s ease;
        }
    `;
    document.head.appendChild(style);
}); 