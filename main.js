// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Select elements to animate
    const animateElements = document.querySelectorAll('.fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '8px 0';
            navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Initial nav style set
    if (window.scrollY > 50) {
        navbar.style.padding = '8px 0';
        navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
    } else {
        navbar.style.padding = '15px 0';
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-bs-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'bi bi-sun-fill text-warning';
        } else {
            themeIcon.className = 'bi bi-moon-fill';
        }
    }

    // --- Premium Lens Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorLens = document.querySelector('.cursor-lens');

    if (cursorDot && cursorLens) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let lensX = window.innerWidth / 2;
        let lensY = window.innerHeight / 2;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instantly move the crisp dot
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        });

        // Smooth follow physics for the lens
        const animateLens = () => {
            const ease = 0.15; // Smoothness factor
            lensX += (mouseX - lensX) * ease;
            lensY += (mouseY - lensY) * ease;
            
            cursorLens.style.transform = `translate(${lensX}px, ${lensY}px) translate(-50%, -50%)`;
            requestAnimationFrame(animateLens);
        };
        animateLens();

        // Bind interactive elements for magnification bulge and lens expansion
        const interactiveSelectors = 'a, button, .btn, input, textarea, .project-card, .edu-card, .skill-badge, h1, h2, h3, p, img, .timeline-item';
        const interactiveElements = document.querySelectorAll(interactiveSelectors);
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
                el.classList.add('cursor-hover-element');
                // Target text nodes separately for color popping
                if (el.tagName.match(/^H[1-6]$/i) || el.tagName === 'P') {
                    el.classList.add('cursor-hover-text');
                }
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
                el.classList.remove('cursor-hover-element');
                el.classList.remove('cursor-hover-text');
            });
        });
    }
});
