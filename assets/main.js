document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-btn, .mobile-btn');
  const nav = document.querySelector('.navlinks');
  if (menu && nav) {
    const close = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); };
    menu.addEventListener('click', () => menu.setAttribute('aria-expanded', String(nav.classList.toggle('open'))));
    nav.addEventListener('click', e => { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { close(); menu.focus(); } });
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
  const form = (window.SCHOLARFLY_FORM_URL || '').trim();
  const wa = (window.SCHOLARFLY_WHATSAPP || '').trim();
  if (/^\d{10,15}$/.test(wa)) document.querySelectorAll('[data-wa-btn], [data-whatsapp]').forEach(a => {
    a.href = 'https://wa.me/' + wa; a.target = '_blank'; a.rel = 'noopener noreferrer';
  });
  if (!/^https:\/\/docs\.google\.com\/forms\/d\/e\/[\w-]+\/viewform$/.test(form)) return;
  const url = new URL(form);
  const params = new URLSearchParams(location.search);
  const degrees = { bachelors: 'Bachelor’s', masters: 'Master’s', integrated: 'Integrated MS/PhD', phd: 'PhD', postdoc: 'Postdoctoral research' };
  const countries = { usa: 'USA', canada: 'Canada', uk: 'UK', germany: 'Germany', korea: 'South Korea', japan: 'Japan', australia: 'Australia', other: 'Other', open: 'Not decided' };
  // Google Form entry IDs observed on the published assessment form.
  if (degrees[params.get('degree')]) url.searchParams.set('entry.2091546555', degrees[params.get('degree')]);
  if (countries[params.get('country')]) url.searchParams.set('entry.623930491', countries[params.get('country')]);
  if (url.search) url.searchParams.set('usp', 'pp_url');
  document.querySelectorAll('[data-form-link], .standalone-link, .form-fallback a').forEach(a => {
    a.href = url.href; a.target = '_blank'; a.rel = 'noopener noreferrer';
  });
  const frame = document.querySelector('#form-frame');
  if (frame && url.search) { url.searchParams.set('embedded', 'true'); frame.src = url.href; }
});

