document.addEventListener('DOMContentLoaded', () => {
    const imageContainers = document.querySelectorAll('.audi-product-image, .bmw-product-image');
    if (!imageContainers.length) return;

    let overlay = document.querySelector('.fullscreen-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'fullscreen-overlay';
        const overlayImg = document.createElement('img');
        overlay.appendChild(overlayImg);
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            document.body.classList.remove('fullscreen-open');
        });
        document.body.appendChild(overlay);
    }

    const overlayImg = overlay.querySelector('img');

    imageContainers.forEach((container) => {
        if (container.querySelector('.fullscreen-btn')) return;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'fullscreen-btn';
        btn.setAttribute('aria-label', 'View image full screen');
        btn.innerHTML = '<i class="fas fa-expand"></i>';

        btn.addEventListener('click', (event) => {
            event.stopPropagation();
            const img = container.querySelector('img');
            if (!img) return;
            overlayImg.src = img.src;
            overlayImg.alt = img.alt || '';
            document.body.classList.add('fullscreen-open');
            overlay.classList.add('visible');
        });

        container.appendChild(btn);
    });
});

