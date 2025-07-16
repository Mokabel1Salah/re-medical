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

window.addEventListener('scroll', handleScrollZoom);
window.addEventListener('resize', handleScrollZoom);
document.addEventListener('DOMContentLoaded', handleScrollZoom); 