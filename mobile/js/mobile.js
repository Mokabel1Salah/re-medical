// Mobile-spezifisches JavaScript für ReMed

document.addEventListener('DOMContentLoaded', function() {
    // Hamburger-Menü Funktionalität
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Menü schließen beim Klick auf Links
        const navLinks = mobileNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Menü schließen beim Klick außerhalb
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Smooth Scrolling für interne Links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = 60; // Mobile Header Höhe
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Logo Sichtbarkeit basierend auf Scroll-Position
    const mobileLogo = document.getElementById('mobile-logo');
    const heroSection = document.querySelector('.mobile-hero');
    const secondSection = document.querySelector('.mobile-ablauf');
    
    function handleLogoVisibility() {
        if (!mobileLogo || !heroSection || !secondSection) return;
        
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const secondSectionTop = secondSection.offsetTop;
        const scrollY = window.pageYOffset;
        
        // Logo wird sichtbar wenn man die erste Sektion verlässt
        if (scrollY > heroBottom - 100) {
            mobileLogo.classList.add('visible');
        } else {
            mobileLogo.classList.remove('visible');
        }
    }
    
    // Scroll Event für Logo Sichtbarkeit
    window.addEventListener('scroll', handleLogoVisibility);
    document.addEventListener('DOMContentLoaded', handleLogoVisibility);
    
    // Touch-Gesten für bessere mobile Erfahrung
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        // Swipe nach oben - Menü schließen
        if (diff > swipeThreshold && mobileNav.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
    
    // Lazy Loading für Bilder - deaktiviert um das Verschwinden zu verhindern
    // Bilder werden normal geladen und angezeigt
    
    // Scroll-to-Top Button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #25777A;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(37, 119, 122, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Performance-Optimierung: Passive Event Listeners
    const passiveEvents = ['touchstart', 'touchmove', 'wheel', 'mousewheel'];
    passiveEvents.forEach(event => {
        document.addEventListener(event, function() {}, { passive: true });
    });
    
    // PWA-ready: Service Worker Registration (optional)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/mobile/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }
});

// Utility-Funktionen
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimierte Scroll-Event-Handler
const handleScroll = debounce(function() {
    // Scroll-basierte Animationen hier
}, 10);

window.addEventListener('scroll', handleScroll, { passive: true });
