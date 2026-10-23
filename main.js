(function(){
var C=window.SCHOLARFLY_CONFIG||{},$=function(s){return document.querySelector(s)};
var y=$('#year');if(y)y.textContent=new Date().getFullYear();
var mb=$('.menu-btn'),nl=$('.navlinks');
if(mb)mb.addEventListener('click',function(){mb.setAttribute('aria-expanded',nl.classList.toggle('open'))});
if(C.whatsapp){var wl='https://wa.me/'+C.whatsapp.replace(/\D/g,'');
document.querySelectorAll('[data-wa]').forEach(function(e){var a=document.createElement('a');a.href=wl;a.target='_blank';a.rel='noopener noreferrer';a.textContent=e.textContent;e.replaceWith(a)});
document.querySelectorAll('[data-wa-btn]').forEach(function(b){b.href=wl;b.hidden=false})}
if(C.formUrl&&$('#form-btn')){$('#form-btn').href=C.formUrl;$('#form-ready').hidden=false;$('#form-pending').hidden=true;
$('#form-frame').src=C.formUrl+(C.formUrl.indexOf('?')<0?'?embedded=true':'&embedded=true');$('#form-embed').hidden=false}
var D=window.SCHOLAR_DATA;if(!D||!$('#grid'))return;
var LV={B:"Bachelor's",M:"Master's",P:"PhD",D:"Postdoc"},ids=['q','fc','fr','fd','ft','fv'],el={};
ids.forEach(function(i){el[i]=document.getElementById(i)});
var p=new URLSearchParams(location.search);if(p.get('c'))el.fc.value=p.get('c');if(p.get('d'))el.fd.value=p.get('d');
function lv(s){return s.split('').map(function(c){return LV[c]}).join(', ')}
function ok(c,g){var q=el.q.value.toLowerCase();
return (!el.fc.value||c.iso===el.fc.value)&&(!el.fr.value||c.region===el.fr.value)&&(!el.fd.value||g.levels.indexOf(el.fd.value)>-1)&&(!el.ft.value||g.type===el.ft.value)&&(!el.fv.value||g.coverage===el.fv.value)&&(!q||(c.name+' '+g.name+' '+g.provider).toLowerCase().indexOf(q)>-1)}
function render(){var n=0,h='';
D.forEach(function(c){var ps=c.programmes.filter(function(g){return ok(c,g)});if(!ps.length)return;n++;
h+='<article class="card cc"><h3><img class="flag" loading="lazy" width="32" height="22" src="https://flagcdn.com/w80/'+c.iso+'.png" alt="Flag of '+c.name+'">'+c.name+'</h3><p class="meta">'+c.region+'</p><p>'+c.overview+'</p><ul>'+ps.map(function(g){return'<li>'+g.name+'</li>'}).join('')+'</ul><p>'+ps.map(function(g){return'<span class="tag">'+g.type+'</span>'}).filter(function(v,i,a){return a.indexOf(v)===i}).join('')+'</p><button class="btn" data-i="'+c.iso+'">View scholarships</button></article>'});
$('#grid').innerHTML=h||'<p>No matches. Clear a filter to see more.</p>';$('#count').textContent=n+' of '+D.length+' countries shown'}
ids.forEach(function(i){el[i].addEventListener('input',render)});
$('.filters').addEventListener('reset',function(){setTimeout(render)});
var dlg=$('#dlg');
$('#grid').addEventListener('click',function(e){var b=e.target.closest('button[data-i]');if(!b)return;
var c=D.filter(function(x){return x.iso===b.dataset.i})[0];
$('#dbody').innerHTML='<h2 id="dt">'+c.name+'</h2>'+c.programmes.map(function(g){return'<div class="dl"><h3>'+g.name+'</h3><dl><dt>Provider</dt><dd>'+g.provider+'</dd><dt>Funding category</dt><dd>'+g.type+'</dd><dt>Degree levels</dt><dd>'+lv(g.levels)+'</dd><dt>Coverage</dt><dd>'+(g.coverage==='Varies'?'Varies; check official page':g.coverage)+'</dd><dt>Eligibility, documents, language, GPA</dt><dd>Pending verification. See the official page.</dd><dt>Deadline</dt><dd>To be confirmed</dd><dt>Status</dt><dd>Verification pending</dd><dt>Last verified</dt><dd>Not yet verified</dd><dt>Official link</dt><dd><a href="'+g.url+'" target="_blank" rel="noopener noreferrer">'+g.url.replace('https://','')+'</a></dd></dl></div>'}).join('');
dlg.showModal()});
$('.close').addEventListener('click',function(){dlg.close()});
dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
render()})();
