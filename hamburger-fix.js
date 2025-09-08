// Separate script to fix hamburger menu on customize page only
document.addEventListener('DOMContentLoaded', function() {
    // Only run on customize page
    if (!window.location.pathname.includes('customize.html')) {
        return;
    }
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        // Remove any existing event listeners by cloning the element
        const newHamburger = hamburger.cloneNode(true);
        hamburger.parentNode.replaceChild(newHamburger, hamburger);
        
        // Add fresh event listener
        newHamburger.addEventListener('click', function() {
            newHamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                newHamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});
