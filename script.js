/* ═══════════════════════════════════════════════
   HAFTEN REDESIGN – script.js
   ═══════════════════════════════════════════════ */

'use strict';

/* ── 1. HERO CANVAS (Particle Network) ─────────────────── */
(function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], animId;

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }

    function getAccent() {
        return getComputedStyle(document.documentElement)
            .getPropertyValue('--accent').trim();
    }

    function spawnParticles() {
        particles = [];
        const count = Math.floor((W * H) / 14000);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                r: Math.random() * 1.8 + 0.5,
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // dark gradient overlay
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, 'rgba(7,9,15,0.85)');
        grad.addColorStop(1, 'rgba(7,9,15,0.97)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        const accent = getAccent();
        const MAX_DIST = 130;

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;

            // draw dot
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = accent;
            ctx.globalAlpha = 0.6;
            ctx.fill();
            ctx.globalAlpha = 1;

            // connect neighbours
            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const dx = p.x - q.x, dy = p.y - q.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAX_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = accent;
                    ctx.globalAlpha = (1 - dist / MAX_DIST) * 0.22;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        });

        animId = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
        resize();
        spawnParticles();
    });
    resize();
    spawnParticles();
    draw();

    // re-draw on theme change
    document.addEventListener('themechange', () => { });
})();


/* ── 2. NAVBAR SCROLL BEHAVIOUR ─────────────────────────── */
(function initNavbar() {
    const nav = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('section[id]');
    const toggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');

        // active nav link
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 100;
            if (window.scrollY >= top) current = sec.id;
        });
        links.forEach(a => {
            a.classList.toggle('active', a.dataset.section === current);
        });
    }, { passive: true });

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('.nav-link').forEach(a => {
        a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
})();


/* ── 3. SCROLL REVEAL ────────────────────────────────────── */
(function initReveal() {
    const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
})();


/* ── 4. COUNTER ANIMATION ────────────────────────────────── */
(function initCounters() {
    const nums = document.querySelectorAll('.stat-num[data-target]');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const target = parseInt(el.dataset.target, 10);
            const dur = 1600;
            const start = performance.now();
            function step(now) {
                const progress = Math.min((now - start) / dur, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(ease * target);
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
            io.unobserve(el);
        });
    }, { threshold: 0.5 });
    nums.forEach(n => io.observe(n));
})();


/* ── 5. COLOR THEME SWITCHER ─────────────────────────────── */
(function initThemeSwitcher() {
    const switcher = document.getElementById('theme-switcher');
    const btn = document.getElementById('theme-toggle-btn');
    const swatches = document.querySelectorAll('.color-swatch');
    const root = document.documentElement;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        switcher.classList.toggle('open');
    });

    document.addEventListener('click', () => {
        switcher.classList.remove('open');
    });

    swatches.forEach(sw => {
        sw.addEventListener('click', () => {
            const theme = sw.dataset.theme;
            root.setAttribute('data-theme', theme);
            swatches.forEach(s => s.classList.remove('active'));
            sw.classList.add('active');
            // persist
            try { localStorage.setItem('haften-theme', theme); } catch (_) { }
            switcher.classList.remove('open');
            document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
        });
    });

    // restore persisted theme
    try {
        const saved = localStorage.getItem('haften-theme');
        if (saved) {
            root.setAttribute('data-theme', saved);
            swatches.forEach(s => {
                s.classList.toggle('active', s.dataset.theme === saved);
            });
        }
    } catch (_) { }
})();


/* ── 6. MEDIA FILTER ─────────────────────────────────────── */
(function initMediaFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.media-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            cards.forEach(card => {
                const show = filter === 'all' || card.dataset.type === filter;
                card.classList.toggle('hidden', !show);
                card.style.animation = show ? 'fadeIn 0.3s ease' : '';
            });
        });
    });
})();


/* ── 7. CONTACT FORM ─────────────────────────────────────── */
(function initContactForm() {
    const form = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('[type="submit"]');
        btn.textContent = 'Enviando...';
        btn.disabled = true;

        setTimeout(() => {
            success.style.display = 'block';
            form.reset();
            btn.innerHTML = '<span>Enviar mensaje</span><span class="btn-arrow">→</span>';
            btn.disabled = false;
            setTimeout(() => { success.style.display = 'none'; }, 5000);
        }, 1200);
    });
})();


/* ── 8. SMOOTH PARALLAX ON HERO ──────────────────────────── */
(function initParallax() {
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero-content');
        const scrollY = window.scrollY;
        if (hero && scrollY < window.innerHeight) {
            hero.style.transform = `translateY(${scrollY * 0.25}px)`;
            hero.style.opacity = `${1 - scrollY / (window.innerHeight * 0.7)}`;
        }
    }, { passive: true });
})();


/* ── 9. STAGGERED CARD ANIMATIONS ────────────────────────── */
(function initStaggeredCards() {
    const grids = [
        '.brands-grid .brand-card',
        '.catalogos-grid .catalogo-card',
        '.media-grid .media-card',
        '.social-grid .social-card',
    ];

    grids.forEach(selector => {
        const cards = document.querySelectorAll(selector);
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e, idx) => {
                if (e.isIntersecting) {
                    const i = Array.from(cards).indexOf(e.target);
                    e.target.style.transitionDelay = `${Math.min(i, 10) * 0.05}s`;
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateY(0)';
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.08 });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.35s, background 0.35s, box-shadow 0.35s';
            io.observe(card);
        });
    });
})();


/* ── 10. NAV LOGO CODE TYPING EFFECT ─────────────────────── */
(function initLogoEffect() {
    const logo = document.querySelector('.nav-logo');
    if (!logo) return;
    logo.addEventListener('mouseenter', () => {
        logo.style.letterSpacing = '0.05em';
    });
    logo.addEventListener('mouseleave', () => {
        logo.style.letterSpacing = '';
    });
})();
