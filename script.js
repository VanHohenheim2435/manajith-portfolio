/* ============================================
   MANAJITH — GAME DESIGNER PORTFOLIO
   Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initCursorGlow();
  initNavigation();
  initHeroAnimations();
  initScrollAnimations();
  initCounterAnimations();
  initProjectGalleries();
  initContactForm();
});

/* --- Particle System --- */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };
  const PARTICLE_COUNT = 80;
  const CONNECTION_DISTANCE = 150;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.4 + 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200 * 0.01;
          this.vx += dx * force;
          this.vy += dy * force;
        }
      }

      this.vx *= 0.99;
      this.vy *= 0.99;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DISTANCE) {
          const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    requestAnimationFrame(animate);
  }

  animate();
}

/* --- Cursor Glow --- */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.innerWidth < 768) return;

  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function updateGlow() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    glow.style.left = currentX + 'px';
    glow.style.top = currentY + 'px';
    requestAnimationFrame(updateGlow);
  }

  updateGlow();
}

/* --- Navigation --- */
function initNavigation() {
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 50);
  });

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('mobile-menu--open');
    document.body.style.overflow = mobileMenu.classList.contains('mobile-menu--open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('mobile-menu--open');
      document.body.style.overflow = '';
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = nav.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* --- Hero Animations --- */
function initHeroAnimations() {
  const revealElements = document.querySelectorAll('.reveal-text');

  revealElements.forEach(el => {
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => {
      el.classList.add('visible');
    }, 400 + delay);
  });
}

/* --- Scroll Animations --- */
function initScrollAnimations() {
  const projectCards = document.querySelectorAll('.project-card');
  const sections = document.querySelectorAll('.about, .skills, .contact, .footer');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 150);
        cardObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  projectCards.forEach(card => cardObserver.observe(card));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-section', 'visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.classList.add('fade-in-section');
    sectionObserver.observe(section);
  });
}

/* --- Counter Animations --- */
function initCounterAnimations() {
  const statNumbers = document.querySelectorAll('.stat__number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));
}

function animateCounter(el, target) {
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(eased * target);

    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* --- Project Galleries --- */
function initProjectGalleries() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card) => {
    const mainImage = card.querySelector('.project-card__image img');
    const thumbnails = card.querySelectorAll('.project-card__gallery img');

    if (!mainImage || thumbnails.length === 0) return;

    const setActiveThumbnail = (activeThumb) => {
      thumbnails.forEach((thumb) => {
        thumb.classList.toggle('is-active', thumb === activeThumb);
      });
    };

    thumbnails.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        mainImage.src = thumb.src;
        mainImage.alt = thumb.alt;
        setActiveThumbnail(thumb);
      });
    });

    setActiveThumbnail(thumbnails[0]);
  });
}

/* --- Contact Form (mailto) --- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const to = 'manajith2435@gmail.com';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const bodyText = [
      `Name: ${name}`,
      `Reply-to: ${email}`,
      '',
      message
    ].join('\n');
    let body = encodeURIComponent(bodyText);

    let href = `mailto:${to}?subject=${subject}&body=${body}`;
    const maxLen = 1900;
    if (href.length > maxLen) {
      const truncated =
        bodyText.slice(0, Math.max(0, bodyText.length - (href.length - maxLen) - 40)) +
        '\n\n[Message truncated — please paste full text if needed.]';
      body = encodeURIComponent(truncated);
      href = `mailto:${to}?subject=${subject}&body=${body}`;
    }

    const btn = form.querySelector('.btn');
    const btnText = btn.querySelector('.btn__text');
    const originalText = btnText.textContent;

    window.location.href = href;

    btnText.textContent = 'Finish in your mail app — press Send there';
    btn.style.background = '#00c853';

    setTimeout(() => {
      btnText.textContent = originalText;
      btn.style.background = '';
    }, 5000);
  });
}
