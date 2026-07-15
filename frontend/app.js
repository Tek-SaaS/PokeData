/* ═══════════════════════════════════════════════════════════════
   POKÉDEX FIELD GUIDE — app.js  v2  (proxy-ready)
   + Prev/Next Navigation        + Favorites system
   + Type Matchups               + Evolution Chain
   + Flavor text cycling         + Species data row
   + Base stat total             + Generation badge
   ═══════════════════════════════════════════════════════════════ */

/* ── CONFIGURACIÓN DE API (proxy) ── */
const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:3001'   // Local: backend en Render corre en este puerto
  : '';                        // Producción: Vercel hará rewrite a Render

// ... (todo el código de app.js permanece exactamente igual, sin cambios) ...

/* ═══════════════════════════════════════════════════════════════
   INIT (MODIFICADO: se añade el registro del SW)
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSound();
  initSearch();
  initStarters();
  initNav();
  initFavorites();
  initFlavorCycle();
  renderRecents();
  $('btnRandom').addEventListener('click', loadRandom);

  // Dynamic header height
  const setHeaderH = () => {
    document.documentElement.style.setProperty(
      '--header-h', ($('header')?.offsetHeight ?? 104) + 'px'
    );
  };
  setHeaderH();
  window.addEventListener('resize', setHeaderH);

  show($('welcomeState'));
  if (!state.recents.length) setTimeout(() => loadPokemon('pikachu'), 500);
  else loadPokemon(state.recents[0].name);

  // ─── REGISTRO DEL SERVICE WORKER (NUEVO) ───
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(reg => console.log('✅ Service Worker registrado con éxito', reg))
      .catch(err => console.error('❌ Error al registrar SW:', err));
  }
});
