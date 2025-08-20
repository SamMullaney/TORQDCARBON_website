// Customization Interface JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Customizer initialized');
    
    // Current state
    let currentPart = 'base';
    let currentIndexes = {
        base: 0,
        sides: 0,
        topbottom: 0
    };
    
    // Locked selections
    let lockedSelections = {
        base: null,
        sides: null,
        topbottom: null
    };
    
    // Available options
    const options = {
        base: [
            { name: 'Sport B8.5', image: 'basesteeringwheels/sportb8.5full.png' },
            { name: 'Sport B9', image: 'basesteeringwheels/sportb9full.png' },
            { name: 'Sport B9.5', image: 'basesteeringwheels/sportb9.5full.png' },
            { name: 'Comfort B8.5', image: 'basesteeringwheels/comfortb8.5full.png' },
            { name: 'Comfort B9', image: 'basesteeringwheels/comfortb9full.png' },
            { name: 'Comfort B9.5', image: 'basesteeringwheels/comfortb9.5full.png' }
        ],
        sides: [
            { name: 'None', image: null },
            { name: 'Perforated Leather', image: 'Fwd_ wheel files/b9.5 audi/sides/perfleather.sides.sportb9.5.png' },
            { name: 'Alcantara', image: 'Fwd_ wheel files/b9.5 audi/sides/alcantara.sides.comfortb9.5.png' },
            { name: 'Perforated Leather Comfort', image: 'Fwd_ wheel files/b9.5 audi/sides/perfleather.sides.comfortb9.5.png' }
        ],
        topbottom: [
            { name: 'None', image: null },
            { name: 'Smooth Leather', image: 'Fwd_ wheel files/b9.5 audi/topbottom/smoothleather.topbottom.sportb9.5.png' },
            { name: 'Forged Carbon', image: 'Fwd_ wheel files/b9.5 audi/topbottom/forgedcarbon.topbottom.sportb9.5.png' },
            { name: 'Alcantara', image: 'Fwd_ wheel files/b9.5 audi/topbottom/alcantara.topbottom.comfortb9.5.png' },
            { name: 'Leather', image: 'Fwd_ wheel files/b9.5 audi/topbottom/leather.topbottom.comfortb9.png' }
        ]
    };
    
    // Additional customization options
    let additionalSelections = {
        style: 'comfort',
        badge: 's',
        airbag: 'smooth-leather',
        topStripe: 'yes'
    };
    
    // Setup additional option buttons
    setupAdditionalOptions();
    
    function setupAdditionalOptions() {
        const widgetButtons = document.querySelectorAll('.widget-btn');
        widgetButtons.forEach(button => {
            button.addEventListener('click', function() {
                const option = this.getAttribute('data-option');
                const value = this.getAttribute('data-value');
                
                // Update active state
                const widgetGroup = this.closest('.widget-group');
                widgetGroup.querySelectorAll('.widget-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // Update selections
                if (option === 'style') {
                    additionalSelections.style = value;
                } else if (option === 'badge') {
                    additionalSelections.badge = value;
                } else if (option === 'airbag') {
                    additionalSelections.airbag = value;
                } else if (option === 'top-stripe') {
                    additionalSelections.topStripe = value;
                }
                
                console.log('Additional option selected:', option, value);
                updateSummary();
            });
        });
    }
    
    // Initialize
    init();
    
    // Ensure options are visible on page load
    setTimeout(() => {
        console.log('Delayed initialization...');
        populateOptions();
        updateJukebox();
        console.log('Initialization complete');
    }, 100);
    
    function init() {
        console.log('Initializing customizer...');
        setupEventListeners();
        populateOptions();
        updateJukebox();
        updateSummary();
    }
    
    function setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Part selection
        const partItems = document.querySelectorAll('.part-item');
        partItems.forEach(item => {
            item.addEventListener('click', function() {
                const part = this.getAttribute('data-part');
                console.log('Part clicked:', part);
                selectPart(part);
            });
        });
        
        // Navigation buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const lockBtn = document.getElementById('lock-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                console.log('Previous clicked');
                previousOption();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                console.log('Next clicked');
                nextOption();
            });
        }
        
        if (lockBtn) {
            lockBtn.addEventListener('click', function() {
                console.log('Lock clicked');
                lockCurrentSelection();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                previousOption();
            } else if (e.key === 'ArrowRight') {
                nextOption();
            }
        });
    }
    
    function selectPart(part) {
        console.log('Selecting part:', part);
        
        // Check if previous part is locked before allowing selection
        if (part === 'sides' && lockedSelections.base === null) {
            alert('Please lock in your base wheel selection first!');
            return;
        }
        if (part === 'topbottom' && lockedSelections.sides === null) {
            alert('Please lock in your sides selection first!');
            return;
        }
        
        // Update active part
        document.querySelectorAll('.part-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`.part-item[data-part="${part}"]`).classList.add('active');
        
        // Update active option group
        document.querySelectorAll('.option-group').forEach(group => {
            group.classList.remove('active');
        });
        
        const targetOptionGroup = document.querySelector(`.option-group[data-part="${part}"]`);
        if (targetOptionGroup) {
            targetOptionGroup.classList.add('active');
            console.log('Activated option group for:', part);
            
            // Scroll to the options panel to make sure it's visible
            const optionsPanel = document.querySelector('.options-panel');
            if (optionsPanel) {
                optionsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        } else {
            console.error('Could not find option group for:', part);
        }
        
        currentPart = part;
        console.log('Current part set to:', currentPart);
        
        // Reset lock button for new part
        const lockBtn = document.getElementById('lock-btn');
        if (lockBtn) {
            lockBtn.classList.remove('locked');
            lockBtn.innerHTML = '<i class="fas fa-lock-open"></i><span>Lock Selection</span>';
        }
        
        updateJukebox();
        
        // Ensure options are populated for the selected part
        populateOptions();
    }
    
    function populateOptions() {
        console.log('Populating options...');
        
        // Populate base options
        const baseContainer = document.getElementById('base-options');
        if (baseContainer) {
            baseContainer.innerHTML = options.base.map((option, index) => `
                <div class="option-item ${index === 0 ? 'active' : ''}" data-index="${index}" data-part="base">
                    <div class="option-preview">
                        <img src="${option.image}" alt="${option.name}" onerror="this.style.display='none'">
                    </div>
                    <span>${option.name}</span>
                </div>
            `).join('');
        }
        
        // Populate sides options
        const sidesContainer = document.getElementById('sides-options');
        if (sidesContainer) {
            sidesContainer.innerHTML = options.sides.map((option, index) => `
                <div class="option-item ${index === 0 ? 'active' : ''}" data-index="${index}" data-part="sides">
                    <div class="option-preview">
                        ${option.image ? `<img src="${option.image}" alt="${option.name}" onerror="this.style.display='none'">` : '<div class="none-option"></div>'}
                    </div>
                    <span>${option.name}</span>
                </div>
            `).join('');
        }
        
        // Populate top/bottom options
        const topbottomContainer = document.getElementById('topbottom-options');
        if (topbottomContainer) {
            topbottomContainer.innerHTML = options.topbottom.map((option, index) => `
                <div class="option-item ${index === 0 ? 'active' : ''}" data-index="${index}" data-part="topbottom">
                    <div class="option-preview">
                        ${option.image ? `<img src="${option.image}" alt="${option.name}" onerror="this.style.display='none'">` : '<div class="none-option"></div>'}
                    </div>
                    <span>${option.name}</span>
                </div>
            `).join('');
        }
        
        // Add click listeners to option items
        addOptionClickListeners();
    }
    
    function addOptionClickListeners() {
        document.querySelectorAll('.option-item').forEach(item => {
            // Remove existing listeners to prevent duplicates
            item.removeEventListener('click', optionClickHandler);
            item.addEventListener('click', optionClickHandler);
        });
    }
    
    function optionClickHandler() {
        const part = this.getAttribute('data-part');
        const index = parseInt(this.getAttribute('data-index'));
        console.log('Option clicked:', part, index);
        selectOption(part, index);
    }
    
    function selectOption(part, index) {
        console.log('Selecting option:', part, index);
        
        // Update active option within the current part group
        const currentPartOptions = document.querySelectorAll(`.option-item[data-part="${part}"]`);
        currentPartOptions.forEach(item => {
            item.classList.remove('active');
        });
        
        const selectedOption = document.querySelector(`.option-item[data-part="${part}"][data-index="${index}"]`);
        if (selectedOption) {
            selectedOption.classList.add('active');
        }
        
        // Determine animation direction based on current index
        const currentIndex = currentIndexes[part];
        const direction = index > currentIndex ? 'right' : 'left';
        
        // Use animation for option changes
        selectOptionWithAnimation(part, index, direction);
    }
    
    function previousOption() {
        const currentOptions = options[currentPart];
        const currentIndex = currentIndexes[currentPart];
        const newIndex = currentIndex > 0 ? currentIndex - 1 : currentOptions.length - 1;
        selectOptionWithAnimation(currentPart, newIndex, 'left');
    }
    
    function nextOption() {
        const currentOptions = options[currentPart];
        const currentIndex = currentIndexes[currentPart];
        const newIndex = currentIndex < currentOptions.length - 1 ? currentIndex + 1 : 0;
        selectOptionWithAnimation(currentPart, newIndex, 'right');
    }
    
    function selectOptionWithAnimation(part, index, direction) {
        console.log('Selecting option with animation:', part, index, direction);
        
        // Update active option within the current part group
        const currentPartOptions = document.querySelectorAll(`.option-item[data-part="${part}"]`);
        currentPartOptions.forEach(item => {
            item.classList.remove('active');
        });
        
        const selectedOption = document.querySelector(`.option-item[data-part="${part}"][data-index="${index}"]`);
        if (selectedOption) {
            selectedOption.classList.add('active');
        }
        
        // Animate the transition
        animateImageTransition(part, index, direction);
        
        currentIndexes[part] = index;
        updateSummary();
    }
    
    function animateImageTransition(part, newIndex, direction) {
        const prevContainer = document.getElementById('prev-container');
        const currentContainer = document.getElementById('current-container');
        const nextContainer = document.getElementById('next-container');
        
        const currentOptions = options[currentPart];
        const currentIndex = currentIndexes[currentPart];
        
        // Calculate new indices
        const newPrevIndex = newIndex > 0 ? newIndex - 1 : currentOptions.length - 1;
        const newNextIndex = newIndex < currentOptions.length - 1 ? newIndex + 1 : 0;
        
        // Animate the transition
        if (direction === 'left') {
            // Move current to right, prev to center, next to far right
            if (currentContainer) currentContainer.classList.replace('position-center', 'position-right');
            if (prevContainer) prevContainer.classList.replace('position-left', 'position-center');
            if (nextContainer) nextContainer.classList.replace('position-right', 'position-far-right');
        } else {
            // Move current to left, next to center, prev to far left
            if (currentContainer) currentContainer.classList.replace('position-center', 'position-left');
            if (nextContainer) nextContainer.classList.replace('position-right', 'position-center');
            if (prevContainer) prevContainer.classList.replace('position-left', 'position-far-left');
        }
        
        // Update image sources after animation
        setTimeout(() => {
            // Get locked base wheel image for background
            let baseImageSrc = '';
            if (lockedSelections.base !== null) {
                baseImageSrc = options.base[lockedSelections.base].image || '';
            }
            
            // Update container images based on current part
            if (currentPart === 'base') {
                updateContainerImages(prevContainer, currentOptions[newPrevIndex].image || '', '', '');
                updateContainerImages(currentContainer, currentOptions[newIndex].image || '', '', '');
                updateContainerImages(nextContainer, currentOptions[newNextIndex].image || '', '', '');
            } else if (currentPart === 'sides') {
                const prevSidesSrc = currentOptions[newPrevIndex].image || '';
                const currentSidesSrc = currentOptions[newIndex].image || '';
                const nextSidesSrc = currentOptions[newNextIndex].image || '';
                
                // Left container: only previous sides option (no base wheel)
                updateContainerImages(prevContainer, '', prevSidesSrc, '');
                // Center container: locked base + current sides option
                updateContainerImages(currentContainer, baseImageSrc, currentSidesSrc, '');
                // Right container: only next sides option (no base wheel)
                updateContainerImages(nextContainer, '', nextSidesSrc, '');
            } else if (currentPart === 'topbottom') {
                const lockedSidesSrc = lockedSelections.sides !== null ? options.sides[lockedSelections.sides].image || '' : '';
                const prevTopBottomSrc = currentOptions[newPrevIndex].image || '';
                const currentTopBottomSrc = currentOptions[newIndex].image || '';
                const nextTopBottomSrc = currentOptions[newNextIndex].image || '';
                
                // Left container: only previous top/bottom option (no base or sides)
                updateContainerImages(prevContainer, '', '', prevTopBottomSrc);
                // Center container: locked base + locked sides + current top/bottom option
                updateContainerImages(currentContainer, baseImageSrc, lockedSidesSrc, currentTopBottomSrc);
                // Right container: only next top/bottom option (no base or sides)
                updateContainerImages(nextContainer, '', '', nextTopBottomSrc);
            }
            
            // Reset position classes
            if (prevContainer) {
                prevContainer.classList.remove('position-far-left', 'position-left', 'position-center', 'position-right', 'position-far-right');
                prevContainer.classList.add('position-left');
            }
            if (currentContainer) {
                currentContainer.classList.remove('position-far-left', 'position-left', 'position-center', 'position-right', 'position-far-right');
                currentContainer.classList.add('position-center');
            }
            if (nextContainer) {
                nextContainer.classList.remove('position-far-left', 'position-left', 'position-center', 'position-right', 'position-far-right');
                nextContainer.classList.add('position-right');
            }
        }, 250);
    }
    
    function updateImages(part, index) {
        // Update base image
        const baseImage = document.getElementById('base-image');
        if (baseImage) {
            const baseOption = options.base[currentIndexes.base];
            baseImage.src = baseOption.image || '';
            baseImage.style.display = baseOption.image ? 'block' : 'none';
        }
        
        // Update overlay images
        const sidesOverlay = document.getElementById('sides-overlay');
        const topbottomOverlay = document.getElementById('topbottom-overlay');
        
        if (sidesOverlay) {
            const sidesOption = options.sides[currentIndexes.sides];
            if (sidesOption && sidesOption.image) {
                sidesOverlay.src = sidesOption.image;
                sidesOverlay.classList.add('visible');
            } else {
                sidesOverlay.classList.remove('visible');
            }
        }
        
        if (topbottomOverlay) {
            const topbottomOption = options.topbottom[currentIndexes.topbottom];
            if (topbottomOption && topbottomOption.image) {
                topbottomOverlay.src = topbottomOption.image;
                topbottomOverlay.classList.add('visible');
            } else {
                topbottomOverlay.classList.remove('visible');
            }
        }
    }
    
    function updateJukebox() {
        console.log('Updating jukebox for part:', currentPart);
        
        const currentOptions = options[currentPart];
        const currentIndex = currentIndexes[currentPart];
        
        // Get the three carousel containers
        const prevContainer = document.getElementById('prev-container');
        const currentContainer = document.getElementById('current-container');
        const nextContainer = document.getElementById('next-container');
        
        console.log('Containers found:', {
            prev: !!prevContainer,
            current: !!currentContainer,
            next: !!nextContainer
        });
        
        // Calculate indices
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentOptions.length - 1;
        const nextIndex = currentIndex < currentOptions.length - 1 ? currentIndex + 1 : 0;
        
        // Get locked base wheel image for background
        let baseImageSrc = '';
        if (lockedSelections.base !== null) {
            baseImageSrc = options.base[lockedSelections.base].image || '';
        }
        
        console.log('Base image source:', baseImageSrc);
        console.log('Current options:', currentOptions);
        console.log('Current index:', currentIndex);
        
        // Update image sources based on current part
        if (currentPart === 'base') {
            // For base wheel, show different options in all three positions
            const prevSrc = currentOptions[prevIndex].image || '';
            const currentSrc = currentOptions[currentIndex].image || '';
            const nextSrc = currentOptions[nextIndex].image || '';
            
            console.log('Base wheel sources:', { prev: prevSrc, current: currentSrc, next: nextSrc });
            
            updateContainerImages(prevContainer, prevSrc, '', '');
            updateContainerImages(currentContainer, currentSrc, '', '');
            updateContainerImages(nextContainer, nextSrc, '', '');
        } else if (currentPart === 'sides') {
            // For sides, show locked base wheel only in center, sides options only in left/right
            const prevSidesSrc = currentOptions[prevIndex].image || '';
            const currentSidesSrc = currentOptions[currentIndex].image || '';
            const nextSidesSrc = currentOptions[nextIndex].image || '';
            
            // Left container: only previous sides option (no base wheel)
            updateContainerImages(prevContainer, '', prevSidesSrc, '');
            // Center container: locked base + current sides option
            updateContainerImages(currentContainer, baseImageSrc, currentSidesSrc, '');
            // Right container: only next sides option (no base wheel)
            updateContainerImages(nextContainer, '', nextSidesSrc, '');
        } else if (currentPart === 'topbottom') {
            // For top/bottom, show locked base + locked sides only in center, top/bottom options only in left/right
            const lockedSidesSrc = lockedSelections.sides !== null ? options.sides[lockedSelections.sides].image || '' : '';
            const prevTopBottomSrc = currentOptions[prevIndex].image || '';
            const currentTopBottomSrc = currentOptions[currentIndex].image || '';
            const nextTopBottomSrc = currentOptions[nextIndex].image || '';
            
            // Left container: only previous top/bottom option (no base or sides)
            updateContainerImages(prevContainer, '', '', prevTopBottomSrc);
            // Center container: locked base + locked sides + current top/bottom option
            updateContainerImages(currentContainer, baseImageSrc, lockedSidesSrc, currentTopBottomSrc);
            // Right container: only next top/bottom option (no base or sides)
            updateContainerImages(nextContainer, '', '', nextTopBottomSrc);
        }
        
        // Set initial positions
        if (prevContainer) {
            prevContainer.classList.add('visible', 'position-left');
        }
        if (currentContainer) {
            currentContainer.classList.add('visible', 'position-center');
        }
        if (nextContainer) {
            nextContainer.classList.add('visible', 'position-right');
        }
        
        // Update navigation buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) prevBtn.disabled = currentOptions.length <= 1;
        if (nextBtn) nextBtn.disabled = currentOptions.length <= 1;
    }
    
    function updateContainerImages(container, baseSrc, sidesSrc, topBottomSrc) {
        if (!container) {
            console.log('Container not found');
            return;
        }
        
        const baseImg = container.querySelector('.carousel-base');
        const sidesImg = container.querySelector('.carousel-sides');
        const topBottomImg = container.querySelector('.carousel-topbottom');
        
        console.log('Container images found:', {
            base: !!baseImg,
            sides: !!sidesImg,
            topBottom: !!topBottomImg
        });
        
        if (baseImg) {
            if (baseSrc && baseSrc.trim() !== '') {
                baseImg.src = baseSrc;
                baseImg.style.display = 'block';
                console.log('Set base image src:', baseSrc);
            } else {
                baseImg.style.display = 'none';
                console.log('Hiding base image - no source');
            }
        }
        if (sidesImg) {
            if (sidesSrc && sidesSrc.trim() !== '') {
                sidesImg.src = sidesSrc;
                sidesImg.style.display = 'block';
                console.log('Set sides image src:', sidesSrc);
            } else {
                sidesImg.style.display = 'none';
                console.log('Hiding sides image - no source');
            }
        }
        if (topBottomImg) {
            if (topBottomSrc && topBottomSrc.trim() !== '') {
                topBottomImg.src = topBottomSrc;
                topBottomImg.style.display = 'block';
                console.log('Set top/bottom image src:', topBottomSrc);
            } else {
                topBottomImg.style.display = 'none';
                console.log('Hiding top/bottom image - no source');
            }
        }
    }
    
    function createCompositeImage(baseSrc, sidesSrc, topBottomSrc) {
        // If no base image, return empty
        if (!baseSrc) return '';
        
        // For now, we'll use CSS overlays instead of canvas compositing
        // This is a simpler approach that works well for transparent PNGs
        return baseSrc;
    }
    
    function lockCurrentSelection() {
        const lockBtn = document.getElementById('lock-btn');
        
        // Lock the current selection
        lockedSelections[currentPart] = currentIndexes[currentPart];
        
        // Update lock button appearance
        if (lockBtn) {
            lockBtn.classList.add('locked');
            lockBtn.innerHTML = '<i class="fas fa-lock"></i><span>Locked</span>';
        }
        
        // Move to next part if available
        if (currentPart === 'base') {
            selectPart('sides');
        } else if (currentPart === 'sides') {
            selectPart('topbottom');
        } else if (currentPart === 'topbottom') {
            // All parts locked, show completion message
            console.log('All selections locked!');
        }
        
        updateSummary();
    }
    
    function updateSummary() {
        const baseSpec = document.getElementById('base-spec');
        const sidesSpec = document.getElementById('sides-spec');
        const topbottomSpec = document.getElementById('topbottom-spec');
        const styleSpec = document.getElementById('style-spec');
        const badgeSpec = document.getElementById('badge-spec');
        const airbagSpec = document.getElementById('airbag-spec');
        const topstripeSpec = document.getElementById('topstripe-spec');
        const totalPrice = document.getElementById('total-price');
        
        // Use locked selections or current selections
        const baseIndex = lockedSelections.base !== null ? lockedSelections.base : currentIndexes.base;
        const sidesIndex = lockedSelections.sides !== null ? lockedSelections.sides : currentIndexes.sides;
        const topbottomIndex = lockedSelections.topbottom !== null ? lockedSelections.topbottom : currentIndexes.topbottom;
        
        if (baseSpec) baseSpec.textContent = options.base[baseIndex].name;
        if (sidesSpec) sidesSpec.textContent = options.sides[sidesIndex].name;
        if (topbottomSpec) topbottomSpec.textContent = options.topbottom[topbottomIndex].name;
        
        // Update additional options
        if (styleSpec) {
            const styleDisplay = {
                'comfort': 'Comfort',
                'sport': 'Sport'
            };
            styleSpec.textContent = styleDisplay[additionalSelections.style] || 'Comfort';
        }
        
        if (badgeSpec) {
            const badgeDisplay = {
                's': 'S',
                'rs': 'RS'
            };
            badgeSpec.textContent = badgeDisplay[additionalSelections.badge] || 'S';
        }
        
        if (airbagSpec) {
            const airbagDisplay = {
                'smooth-leather': 'Smooth Leather',
                'alcantara': 'Alcantara',
                'no-airbag': 'No Airbag'
            };
            airbagSpec.textContent = airbagDisplay[additionalSelections.airbag] || 'Smooth Leather';
        }
        
        if (topstripeSpec) {
            const topstripeDisplay = {
                'yes': 'Yes',
                'no': 'No'
            };
            topstripeSpec.textContent = topstripeDisplay[additionalSelections.topStripe] || 'Yes';
        }
        
        // Fixed price of $799.99
        if (totalPrice) totalPrice.textContent = '$799.99';
    }
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(n => {
            n.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}); 