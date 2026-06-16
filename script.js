/* ── Nav: add scrolled class ───────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Mobile nav toggle ─────────────────────────────── */
const toggle = document.querySelector('.nav-toggle');
const links  = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = links.style.display === 'flex';
  links.style.display = open ? '' : 'flex';
  links.style.flexDirection = 'column';
  links.style.position = 'absolute';
  links.style.top = '64px';
  links.style.left = '0';
  links.style.right = '0';
  links.style.background = '#fff';
  links.style.padding = '1rem 2rem';
  links.style.borderBottom = '1px solid #e8e8e8';
  if (open) links.removeAttribute('style');
});

/* ── Scroll fade-in ────────────────────────────────── */
const fadeEls = document.querySelectorAll(
  '.skill-card, .timeline-item, .project-card, .edu-item, .about-grid, .section-title, .section-sub'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

/* ── Molecule canvas animation ─────────────────────── */
(function () {
  const canvas = document.getElementById('moleculeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, nodes, edges;
  const NODE_COUNT = 28;
  const MAX_DIST   = 160;
  const SPEED      = 0.35;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function initNodes() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - .5) * SPEED,
      vy: (Math.random() - .5) * SPEED,
      r:  Math.random() * 3 + 2,
    }));
  }

  function update() {
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle   = '#2563eb';
    ctx.strokeStyle = '#2563eb';

    // Draw edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          ctx.globalAlpha = (1 - d / MAX_DIST) * 0.5;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); initNodes(); });
  resize();
  initNodes();
  loop();
})();
