document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('#grid');
  if (!grid || typeof SF_COUNTRIES === 'undefined') return;
  const country = document.querySelector('#fc'), query = document.querySelector('#q'), region = document.querySelector('#fr');
  const count = document.querySelector('#count'), empty = document.querySelector('#no-results');
  const regions = { us:'North America', ca:'North America', au:'Oceania', nz:'Oceania', kr:'Asia', jp:'Asia', cn:'Asia', tw:'Asia', sg:'Asia', my:'Asia', sa:'Middle East', qa:'Middle East', ae:'Middle East', tr:'Europe' };
  const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const selected = new URLSearchParams(location.search).get('c');
  if ([...country.options].some(o => o.value === selected)) country.value = selected;
  grid.innerHTML = SF_COUNTRIES.map(([id,name,programmes,timing,url]) => `<article class="card sf-country" data-code="${id}" data-region="${regions[id] || 'Europe'}" data-query="${escape((name+' '+programmes).toLowerCase())}"><div class="country-heading"><img src="https://flagcdn.com/w80/${id}.png" width="44" height="30" alt="" loading="lazy"><h2 class="card-title">${escape(name)}</h2></div><p><strong>Routes to explore</strong><br>${escape(programmes)}</p><p><strong>Application planning</strong><br>${escape(timing)}</p><p class="muted">Confirm current eligibility, dates and funding on the official site.</p><a class="text-link" href="${escape(url)}" target="_blank" rel="noopener noreferrer">Official resources for ${escape(name)} ↗</a></article>`).join('');
  const update = () => {
    let n = 0;
    const needle = query.value.trim().toLowerCase();
    grid.querySelectorAll('.sf-country').forEach(card => {
      const show = (!needle || card.dataset.query.includes(needle)) && (!country.value || card.dataset.code === country.value) && (!region.value || card.dataset.region === region.value);
      card.hidden = !show; if (show) n++;
    });
    count.textContent = `${n} of ${SF_COUNTRIES.length} destinations`;
    empty.hidden = n !== 0;
  };
  [country, query, region].forEach(el => el.addEventListener('input', update));
  document.querySelector('.filters').addEventListener('reset', () => setTimeout(update, 0));
  update();
});
