// Automatische Geräteerkennung und Weiterleitung
(function() {
    'use strict';
    
    // Funktion zur Geräteerkennung
    function isMobileDevice() {
        // Prüfe verschiedene mobile Indikatoren
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // Mobile User Agents
        const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
        
        // Touch-Support prüfen
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Bildschirmgröße prüfen
        const isSmallScreen = window.innerWidth <= 768;
        
        // Kombinierte Prüfung
        return mobileRegex.test(userAgent) || (hasTouch && isSmallScreen);
    }
    
    // Prüfe ob wir bereits auf der mobilen Seite sind
    function isOnMobilePage() {
        return window.location.pathname.includes('/mobile/');
    }
    
    // Prüfe ob wir auf der Desktop-Seite sind
    function isOnDesktopPage() {
        return window.location.pathname === '/' || window.location.pathname === '/index.html';
    }
    
    // Weiterleitung basierend auf Gerät
    function redirectBasedOnDevice() {
        const isMobile = isMobileDevice();
        const currentPath = window.location.pathname;
        
        // Wenn auf Desktop-Seite und Mobile-Gerät erkannt
        if (isMobile && !isOnMobilePage()) {
            window.location.href = '/mobile/';
            return;
        }
        
        // Wenn auf Mobile-Seite und Desktop-Gerät erkannt
        if (!isMobile && isOnMobilePage()) {
            window.location.href = '/';
            return;
        }
    }
    
    // Bei Seitenladen ausführen
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', redirectBasedOnDevice);
    } else {
        redirectBasedOnDevice();
    }
    
    // Bei Fenstergrößenänderung prüfen
    window.addEventListener('resize', function() {
        // Verzögerung um Layout-Änderungen abzuwarten
        setTimeout(redirectBasedOnDevice, 100);
    });
    
})();
