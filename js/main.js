document.addEventListener('DOMContentLoaded', () => {
  const tryFetch = async (paths) => {
    for (const p of paths) {
      try {
        const res = await fetch(p);
        if (res.ok) return await res.text();
      } catch (e) { /* seguir con siguiente ruta */ }
    }
    throw new Error('No se encontró el recurso en rutas probadas: ' + paths.join(', '));
  };

  const loadComponent = async (selector, candidatePaths = []) => {
    const el = document.querySelector(selector);
    if (!el) return;
    try {
      const html = await tryFetch(candidatePaths);
      el.innerHTML = html;
      const yearEl = el.querySelector('#year') || document.querySelector('#year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    } catch (err) {
      console.error(err);
    }
  };

  // Rutas absolutas para Vercel (primero) y rutas relativas como fallback
  loadComponent('#header-placeholder', [
    '/src/components/header.html',
    '/components/header.html',
    'src/components/header.html',
    './src/components/header.html'
  ]);
  loadComponent('#footer-placeholder', [
    '/src/components/footer.html',
    '/components/footer.html',
    'src/components/footer.html',
    './src/components/footer.html'
  ]);

  // Animación: fade-in al hacer scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.hero, .services, .catalog, .personaliza, .about, .contact, .service-item, .grid > *').forEach(el => {
    if (el) observer.observe(el);
  });
});