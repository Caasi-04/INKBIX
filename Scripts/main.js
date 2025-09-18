document.addEventListener('DOMContentLoaded', () => {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(async (el) => {
    const url = el.getAttribute('data-include');
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`No se pudo cargar ${url}`);
      el.innerHTML = await res.text();
    } catch (err) {
      console.error(err);
    }
  });

  // rellena año en footer (después de cargar componentes puede ejecutarse de nuevo, es seguro)
  const setYear = () => {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  };
  setYear();
  // en caso de que footer se cargue después del primer pase
  document.addEventListener('DOMNodeInserted', setYear);
});