// Navigation adapter; the upstream source remains byte-for-byte intact.
(() => {
  const destinations = { 'Transit Simulator': 'pipeline', 'Interactive Call Lab': 'live-call', 'Architecture Matrix': 'architecture', 'Packet & Math Lab': 'visualizers', 'Diagnostic Lab': 'diagnostic-lab', 'Knowledge Check': 'quiz', 'Guardrails': 'guardrails' };
  function reveal(id) {
    const section = document.getElementById(id);
    if (!section) return;
    const offset = (document.querySelector('header')?.getBoundingClientRect().height || 0) + 16;
    window.scrollTo({ top: section.getBoundingClientRect().top + scrollY - offset, behavior: 'auto' });
  }
  document.addEventListener('click', event => {
    const button = event.target.closest?.('nav button');
    const id = button && destinations[button.textContent.trim()];
    if (!id) return;
    history.pushState(null, '', `#${id}`);
    requestAnimationFrame(() => reveal(id));
  });
  window.addEventListener('popstate', () => location.hash ? reveal(location.hash.slice(1)) : scrollTo(0, 0));
  if (location.hash) {
    const observer = new MutationObserver(() => {
      if (document.getElementById(location.hash.slice(1))) { reveal(location.hash.slice(1)); observer.disconnect(); }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
