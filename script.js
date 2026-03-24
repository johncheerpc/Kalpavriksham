
// Scroll bar progress
window.addEventListener('scroll', function(){
  var bar = document.getElementById('spbar');
  var total = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (window.scrollY / total * 100) + '%';
}, {passive:true});

// Two-bar sticky: topbar hides on scroll, nav snaps to top
var nav = document.getElementById('site-nav');
var topBar = document.getElementById('top-bar');
var backTop = document.getElementById('back-top');
var topBarH = topBar ? topBar.offsetHeight : 44;

window.addEventListener('scroll', function(){
  var scrolled = window.scrollY > topBarH;
  nav.classList.toggle('scrolled', scrolled);
  if(topBar) topBar.classList.toggle('hidden', scrolled);
  if(backTop) backTop.classList.toggle('visible', window.scrollY > 400);
}, {passive:true});

// Count-up animation for stats
// (no count-up)



// Hamburger
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', function(){
  var open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
});
navLinks.querySelectorAll('.nav-link').forEach(function(l){
  l.addEventListener('click', function(){
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// Active nav
var sections = document.querySelectorAll('section[id], div[id]');
var links = document.querySelectorAll('.nav-link');
var sObs = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){
      links.forEach(function(l){ l.classList.toggle('active', l.getAttribute('href') === '#'+e.target.id); });
    }
  });
}, {rootMargin:'-40% 0px -55% 0px'});
sections.forEach(function(s){ sObs.observe(s); });

// Reveal on scroll
var revObs = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){ e.target.classList.add('visible'); revObs.unobserve(e.target); }
  });
}, {threshold:0.08});
document.querySelectorAll('.reveal').forEach(function(el){
  el.classList.add('animate');
  revObs.observe(el);
});
setTimeout(function(){
  document.querySelectorAll('.reveal.animate:not(.visible)').forEach(function(el){ el.classList.add('visible'); });
}, 1500);

// Contact form
function handleContactSubmit(e){
  e.preventDefault();
  var btn = document.getElementById('contact-submit');
  var txt = document.getElementById('contact-submit-text');
  btn.disabled = true;
  txt.textContent = 'Sending...';
  setTimeout(function(){
    showToast('Thank you! We will get back to you within 24 hours.', 'success');
    btn.disabled = false;
    txt.textContent = 'Send Message';
    e.target.reset();
  }, 1400);
}

// Toast with gradient
function showToast(msg, type){
  document.querySelectorAll('.kv-toast').forEach(function(t){ t.remove(); });
  var t = document.createElement('div');
  t.className = 'kv-toast';
  t.innerHTML = msg;
  Object.assign(t.style, {
    position:'fixed', bottom:'32px', left:'50%', transform:'translateX(-50%)', zIndex:'9999',
    padding:'14px 28px', borderRadius:'12px', fontSize:'14px', fontWeight:'600',
    fontFamily:'DM Sans,sans-serif', backdropFilter:'blur(16px)',
    boxShadow:'0 8px 32px rgba(0,0,0,0.18)',
    background: type==='success'
      ? 'linear-gradient(135deg,rgba(46,139,74,0.14) 0%,rgba(61,171,94,0.08) 100%)'
      : 'linear-gradient(135deg,rgba(224,64,104,0.15) 0%,rgba(212,0,50,0.08) 100%)',
    border: type==='success' ? '1px solid rgba(58,158,82,0.4)' : '1px solid rgba(224,64,104,0.4)',
    color: type==='success' ? '#2a7a3e' : '#c92850',
    transition:'opacity 0.4s ease,transform 0.4s ease',
    whiteSpace:'nowrap'
  });
  document.body.appendChild(t);
  setTimeout(function(){
    t.style.opacity='0';
    t.style.transform='translateX(-50%) translateY(8px)';
    setTimeout(function(){ t.remove(); }, 400);
  }, 4000);
}

// Gallery hover effect (CSS handles it inline, JS for touch support)
document.querySelectorAll('[onmouseover]').forEach(function(el){
  el.addEventListener('touchstart', function(){ el.style.transform='scale(1.04)'; }, {passive:true});
  el.addEventListener('touchend', function(){ el.style.transform=''; }, {passive:true});
});
