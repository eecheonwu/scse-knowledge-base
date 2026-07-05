// lightweight lightbox script for SCSE header image
(() => {
  const bannerLink = document.getElementById('banner-link');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');

  if (!bannerLink || !lightbox) return;

  const openLightbox = (evt) => {
    evt.preventDefault();
    const href = bannerLink.getAttribute('href') || '/docs/SSOT1.png';
    lightboxImg.setAttribute('src', href);
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // focus for accessibility
    closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  bannerLink.addEventListener('click', openLightbox);
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
      closeLightbox();
    }
  });
})();
