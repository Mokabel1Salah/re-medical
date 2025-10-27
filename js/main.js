// Scroll-Zoom-Effekt für Bilder und Elemente
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0
  );
}

function handleScrollZoom() {
  document.querySelectorAll('.scroll-zoom, .scroll-fade, .scroll-slide').forEach(el => {
    if (isInViewport(el)) {
      el.classList.add('in-view');
    } else {
      el.classList.remove('in-view');
    }
  });
}

function handleDynamicZoom() {
  document.querySelectorAll('.scroll-zoom-dynamic').forEach(el => {
    const rect = el.getBoundingClientRect();
    const elCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    const distance = Math.abs(elCenter - viewportCenter);
    const maxScale = 1.12;
    const minScale = 1;
    const maxDistance = window.innerHeight / 2;
    let scale = maxScale - (distance / maxDistance) * (maxScale - minScale);
    scale = Math.max(minScale, Math.min(maxScale, scale));
    el.style.transform = `scale(${scale})`;
  });
}

window.addEventListener('scroll', handleScrollZoom);
window.addEventListener('resize', handleScrollZoom);
document.addEventListener('DOMContentLoaded', handleScrollZoom);
window.addEventListener('scroll', handleDynamicZoom);
window.addEventListener('resize', handleDynamicZoom);
document.addEventListener('DOMContentLoaded', handleDynamicZoom);

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.main-nav ul li a');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      nav.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });
    // Menü schließen, wenn ein Link geklickt wird
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
    // Menü schließen, wenn außerhalb geklickt wird
    document.addEventListener('click', function(e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    });
  }
}); 