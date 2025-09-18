// Carga componentes <div data-include="...">, ejecuta scripts embebidos, setea año y marca nav activo.
async function loadIncludes(){
  const includes = Array.from(document.querySelectorAll('[data-include]'));
  await Promise.all(includes.map(async el => {
    let url = el.getAttribute('data-include') || '';
    try {
      // Normaliza la URL para que apunte siempre al root del deploy
      // Si ya es absoluta (empieza por http o /) la usamos tal cual.
      if(!/^(\w+:)?\/\//.test(url) && !url.startsWith('/')){
        // Elimina "./" prefijo y convierte a ruta desde la raíz
        url = '/' + url.replace(/^(\.\/)+/, '');
      }
      const res = await fetch(url);
      if(!res.ok) throw new Error(`No se pudo cargar ${url} (${res.status})`);
      el.innerHTML = await res.text();
      // ejecutar scripts dentro del include si los hubiera
      el.querySelectorAll('script').forEach(old => {
        const s = document.createElement('script');
        if(old.src) s.src = old.src;
        else s.textContent = old.textContent;
        document.body.appendChild(s);
      });
    } catch(e){
      console.error(e);
      el.innerHTML = `<!-- error cargando ${url} -->`;
    }
  }));
}

function setYear(){
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
}

function normalizeName(raw){
  if(!raw) return 'index';
  // quitar query/hash y prefijos
  raw = raw.split('?')[0].split('#')[0].trim();
  // si es una ruta absoluta como "/about" o "/about.html"
  const parts = raw.split('/').filter(Boolean);
  let last = parts.pop() || '';
  if(!last) return 'index';
  return last.replace(/\.html$/i, '');
}

function markActive(){
  const navLinks = document.querySelectorAll('nav a');
  const current = normalizeName(location.pathname || 'index');
  navLinks.forEach(a => {
    const href = a.getAttribute('href') || '';
    const name = normalizeName(href);
    if(name === current) a.classList.add('activo');
    else a.classList.remove('activo');
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadIncludes();
  setYear();
  markActive();
  // Observador para volver a marcar activo si el DOM cambia (p. ej. includes cargados)
  const obs = new MutationObserver(() => { setYear(); markActive(); });
  obs.observe(document.body, {childList:true, subtree:true});
});