/* haften-shared.js — Awwwards-Level Interactive System */
'use strict';

/* ══════════════════════════════════════
   1. PAGE LOADER
   ══════════════════════════════════════ */
(function () {
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    document.body.classList.add('loading');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
        }, 1600);
    });
})();

/* ══════════════════════════════════════
   2. CUSTOM CURSOR & MAGNETIC EFFECT
   ══════════════════════════════════════ */
(function () {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafActive = false;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; if (!rafActive) { rafActive = true; raf(); } });
    function raf() {
        dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
        rx += (mx - rx) * .12;
        ry += (my - ry) * .12;
        ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
        rafActive = true;
        requestAnimationFrame(raf);
    }

    // Cursor hover states
    document.querySelectorAll('a,button,.card,.ac-swatch,.brand-card,.lang-pill,.cookie-btn').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Magnetic Elements
    document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
        const el = wrap.firstElementChild;
        if (!el) return;
        wrap.addEventListener('mousemove', e => {
            const rect = wrap.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${relX * 0.3}px, ${relY * 0.3}px)`;
        });
        wrap.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0px, 0px)`;
        });
    });
})();

/* ══════════════════════════════════════
   3. NAVBAR SCROLL
   ══════════════════════════════════════ */
(function () {
    const nav = document.getElementById('navbar');
    const toggle = document.getElementById('menu-toggle');
    const links = document.getElementById('nav-links');
    if (!nav) return;

    let lastScroll = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Glassmorphism state
        nav.classList.toggle('scrolled', currentScroll > 20);

        // Hide/Show logic
        if (currentScroll > lastScroll && currentScroll > 100 && !nav.classList.contains('menu-open')) {
            nav.classList.add('hidden-scroll');
        } else {
            nav.classList.remove('hidden-scroll');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    toggle && toggle.addEventListener('click', () => {
        links.classList.toggle('open');
        nav.classList.toggle('menu-open');
        // animated hamburger
        const spans = toggle.querySelectorAll('span');
        const open = links.classList.contains('open');
        if (open) {
            spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
        } else {
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    });

    links && links.querySelectorAll('.nav-link,.nav-cta').forEach(a => {
        a.addEventListener('click', () => {
            links.classList.remove('open');
            nav.classList.remove('menu-open');
            toggle && toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        });
    });

    // Mark active page
    const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
    links && links.querySelectorAll('[data-page]').forEach(a => {
        if (a.dataset.page === page) a.classList.add('active');
    });
})();

/* ══════════════════════════════════════
   4. SCROLL REVEAL (Intersection Observer)
   ══════════════════════════════════════ */
(function () {
    const els = document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.reveal-s');
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('vis');
                io.unobserve(e.target);
            }
        });
    }, { threshold: .10, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
})();

/* ══════════════════════════════════════
   5. COUNTER ANIMATION
   ══════════════════════════════════════ */
(function () {
    const nums = document.querySelectorAll('[data-count]');
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const end = +el.dataset.count;
            const dur = 1800;
            const t0 = performance.now();
            (function step(now) {
                const p = Math.min((now - t0) / dur, 1);
                const val = Math.round(easeOut(p) * end);
                el.textContent = val.toLocaleString('es-MX');
                if (p < 1) requestAnimationFrame(step);
            })(performance.now());
            io.unobserve(el);
        });
    }, { threshold: .5 });
    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
    nums.forEach(n => io.observe(n));
})();

/* ══════════════════════════════════════
   6. PARALLAX
   ══════════════════════════════════════ */
(function () {
    const els = document.querySelectorAll('[data-parallax]');
    if (!els.length) return;
    function onScroll() {
        const sy = window.scrollY;
        els.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.3;
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const vy = window.innerHeight / 2 - center;
            el.style.transform = `translateY(${-(vy * speed)}px)`;
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

/* ══════════════════════════════════════
   7. SETTINGS PANEL (THEME & LANGUAGE)
   ══════════════════════════════════════ */
(function () {
    // A) Theme Switcher
    const themeBtn = document.querySelector('.theme-toggle-btn');
    const panel = document.getElementById('accent-panel');
    const wrap = document.querySelector('.nav-settings');

    if (themeBtn && panel && wrap) {
        const savedAccent = localStorage.getItem('haften-accent') || 'red';
        applyAccent(savedAccent);

        themeBtn.addEventListener('click', e => {
            e.stopPropagation();
            wrap.classList.toggle('panel-open');
        });
        document.addEventListener('click', () => wrap.classList.remove('panel-open'));
        panel.addEventListener('click', e => e.stopPropagation());

        document.querySelectorAll('.ac-swatch').forEach(sw => {
            sw.addEventListener('click', () => {
                const ac = sw.dataset.accent;
                applyAccent(ac);
                localStorage.setItem('haften-accent', ac);
                wrap.classList.remove('panel-open');
            });
        });

        function applyAccent(ac) {
            document.documentElement.setAttribute('data-accent', ac);
            document.querySelectorAll('.ac-swatch').forEach(s => {
                s.classList.toggle('active', s.dataset.accent === ac);
            });
        }
    }

    // B) Language Switcher & Page Transition
    const langDoc = {
        es: {
            nav_home: "Inicio", nav_about: "Nosotros", nav_brands: "Marcas",
            nav_catalogs: "Catálogos", nav_media: "Multimedia", nav_social: "Redes Sociales",
            nav_contact: "Contacto",

            hero_title1: "Selección · Especificación",
            hero_title2: "Asesoría · Distribución",
            hero_sub: "Expertos en HVAC/R-BMS – Tu socio técnico de confianza",

            idx_eyebrow: "<i class=\"fa-solid fa-circle-check\"></i> Periféricos HVAC · BMS · Medición de Energía",
            idx_num: "<i class=\"fa-solid fa-chart-line\" style=\"color:rgba(255,255,255,.5);margin-right:6px\"></i>Haften en números",
            idx_n1: "Años de experiencia", idx_n2: "Marcas internacionales", idx_n3: "Oficinas en México", idx_n4: "Clientes atendidos",
            idx_btn1: "<i class=\"fa-solid fa-building\"></i>Conócenos", idx_btn2: "<i class=\"fa-solid fa-file-pdf\"></i>Catálogos",

            idx_cat_eyb: "<i class=\"fa-solid fa-grid-2\"></i> Portafolio",
            idx_cat_title: "Explora Nuestras <span>Categorías</span>",
            idx_cat_sub: "Soluciones integrales para cada necesidad de tu sistema HVAC/R",
            idx_c1: "Humidificadores", idx_c2: "Deshumidificadores", idx_c3: "Calefactores",

            idx_br_eyb: "<i class=\"fa-solid fa-star\"></i> Distribuidores autorizados",
            idx_br_title: "Marcas de <span>Clase Mundial</span>",

            idx_pf_bdg: "<i class=\"fa-solid fa-boxes-stacked\" style=\"margin-right:6px\"></i>Nuestro portafolio completo",
            idx_pf_title: "Todo lo que necesitas<br>para tu sistema <span>HVAC/R</span>",
            idx_pf_sub: "Instrumentación · Control · Automatización · Climatización",
            idx_p1: "Medidores de flujo de aire, agua y gas",
            idx_p2: "Válvulas de control, balanceo y energy valves",
            idx_p3: "Actuadores para damper y válvulas",
            idx_p4: "Sensores de humedad, temperatura, CO/CO2, presión, VOC",
            idx_p5: "Manómetros y termómetros industriales",
            idx_p6: "Variadores de frecuencia (VFDs)",
            idx_p7: "Gateways, routers y controladores BMS",
            idx_p8: "HMIs, supervisores y power meters",

            idx_dw_cat: "<i class=\"fa-solid fa-file-pdf\"></i>Descargar catálogos",
            idx_vm: "<i class=\"fa-solid fa-arrow-right\"></i>Ver más",

            idx_wh_eyb: "<i class=\"fa-solid fa-shield-halved\"></i> ¿Por qué elegirnos?",
            idx_wh_title: "La diferencia <span>Haften</span>",
            idx_wh_sub: "Más que distribución: somos tu socio técnico de confianza",
            idx_w1_t: "Inventario Inmediato", idx_w1_p: "Amplio stock disponible para entrega inmediata. Minimizamos tiempos de paro en tus proyectos industriales y de construcción.",
            idx_w2_t: "Ingenieros Especializados", idx_w2_p: "Personal técnico capacitado en selección, integración y operación de equipos HVAC/R-BMS. Asesoría personalizada sin costo.",
            idx_w3_t: "Cobertura Nacional", idx_w3_p: "CDMX · Monterrey · Guadalajara · León · Cancún. Atención personalizada en todo México con logística optimizada.",

            idx_ab_chip: "Marcas<br>representadas",
            idx_ab_eyb: "<i class=\"fa-solid fa-building-columns\"></i> Nosotros",
            idx_ab_title: "Expertos en <span>HVAC/R‑BMS</span><br>a tu servicio",
            idx_ab_p: "En Haften nos especializamos en la comercialización de productos de <strong>control e instrumentación para sistemas HVAC</strong>, humidificadores, deshumidificadores y calefactores eléctricos. Nuestro objetivo es brindar soluciones técnicas confiables, eficientes y adaptadas a las necesidades de cada proyecto.",
            idx_ab_btn: "<i class=\"fa-solid fa-arrow-right\"></i> Conoce más",
            idx_ab_p1: "<i class=\"fa-solid fa-wind\"></i>Humidificadores",
            idx_ab_p2: "<i class=\"fa-solid fa-temperature-half\"></i>Deshumidificadores",
            idx_ab_p3: "<i class=\"fa-solid fa-fire-flame-curved\"></i>Calefactores",
            idx_ab_p4: "<i class=\"fa-solid fa-gauge-high\"></i>Instrumentación",
            idx_ab_p5: "<i class=\"fa-solid fa-microchip\"></i>BMS",
            idx_ab_p6: "<i class=\"fa-solid fa-bolt\"></i>Variadores VFD",

            idx_cta_t: "¿Tienes un proyecto en mente?",
            idx_cta_p: "Nuestros ingenieros especializados están listos para asesorarte en la selección y distribución del equipo correcto.",
            idx_cta_b1: "<i class=\"fa-solid fa-envelope\"></i>Contáctanos",
            idx_cta_b2: "<i class=\"fa-solid fa-file-pdf\"></i>Ver catálogos",

            ft_nav: "Navegación", ft_contact: "Contacto", ft_follow: "Síguenos", ft_social: "Redes Oficiales",
            ft_tagline: '"Una solución completa en el mismo lugar."',
            ft_tagline2: '"Una solución completa en el mismo lugar."<br>Periféricos HVAC · BMS · Medición de Energía',
            ft_copy: "© 2025 Haften. Todos los derechos reservados.",

            thm_lbl: "Color de acento",
            cookie_txt: 'Este sitio web utiliza cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra <strong>política de privacidad</strong>.',
            cookie_btn: "Aceptar cookies",

            // Global buttons
            btn_contact: "Contáctanos",
            btn_view: "Ver catálogo",
            btn_advise: "Solicitar asesoría →",

            // nosotros
            ab_hero_eyb: "Nosotros",
            ab_hero_sub: "Expertos en HVAC/R-BMS – Tu socio técnico de confianza",
            ab_yr: "20+", ab_yr_sub: "Años de experiencia",
            ab_exp: "Expertos en <span style=\"color:var(--ac);\">HVAC/R-BMS</span><br>a tu servicio",
            ab_p1: "En <strong>Haften</strong>, nos especializamos en la comercialización de productos de <strong>control e instrumentación para sistemas HVAC</strong>, así como en humidificadores, deshumidificadores y calefactores eléctricos. Nuestro objetivo es brindar soluciones técnicas confiables, eficientes y adaptadas a las necesidades de cada proyecto.",
            ab_p2: "Representamos marcas reconocidas internacionalmente: Air Monitor, Badger Meter, Belimo, Bry-Air, Contemporary Controls, Control Techniques, Cool Automation, Delta Electronics, Dwyer Omega, FlowCon, GPI, Greystone Energy, Johnson Controls, Loytec, ONICON, Meitav-Tec, Neptronic, Senva y Vaisala.",
            ab_p3: "Contamos con un <strong>amplio inventario disponible para entrega inmediata</strong> y un equipo de ingenieros especializados que brindan asesoría técnica en HVAC, automatización de edificios, laboratorios, hospitales, centros de datos y procesos industriales.",

            pf_eyb: "Portafolio", pf_title: "Nuestros <span style=\"color:var(--ac);\">Productos</span>", pf_sub: "Soluciones técnicas para cada necesidad de tu proyecto HVAC/R",
            br_lbl: "Distribuidores autorizados", br_title: "Marcas que <span style=\"color:var(--ac);\">Representamos</span>",

            loc_title: "Cobertura <span style=\"color:var(--ac);\">Nacional</span>", loc_sub: "Oficina matriz en CDMX y presencia en todo México.",
            loc_cdmx: "Ciudad de México", loc_mty: "Monterrey", loc_gdl: "Guadalajara", loc_leon: "León", loc_cun: "Cancún",
            loc_mat: "Oficina Matriz", loc_reg: "Oficina Regional",

            // Marcas
            br_hero_h1: "Explora Nuestras Marcas", br_hero_p: "Representamos marcas internacionales líderes en innovación, precisión y calidad",
            br_title2: "Más de <span style=\"color:var(--ac);\">25 Marcas</span> Internacionales", br_sub2: "Trabajamos con los mejores fabricantes del mundo para ofrecerte soluciones de alta calidad.",

            // Catalogos
            cat_hero_h1: "Catálogos Digitales", cat_hero_p: "Descubre nuestras soluciones – ¡Descarga ahora nuestro catálogo digital!",
            cat_lbl: "Recursos técnicos", cat_title: "Explora Nuestros <span style=\"color:var(--ac);\">Catálogos</span>", cat_sub: "Documentación técnica completa para facilitar tu selección y especificación de equipos.",
            cat_bdg: "CATÁLOGO", btn_doc: "📄 Ver documento",
            cat_cta_h2: "¿Necesitas asesoría técnica?", cat_cta_p: "Nuestros ingenieros especializados pueden ayudarte a seleccionar el equipo correcto.",

            // Multimedia
            mm_hero_h1: "Centro Multimedia", mm_hero_p: "Videos técnicos, demos de productos y contenido especializado",
            mm_lbl: "Canal Oficial YouTube", mm_title: "Nuestro Contenido <span style=\"color:var(--ac);\">Multimedia</span>", mm_sub: "Descubre demos, capacitaciones y actualizaciones de todas nuestras marcas.",
            mm_btn: "🎬 Ver todos los videos en YouTube →",

            // Redes
            rs_hero_h1: "Síguenos en Redes Sociales", rs_hero_p: "Mantente al día con nuestras novedades, productos y promociones",
            rs_lbl: "Presencia digital", rs_title: "Encuéntranos en <span style=\"color:var(--ac);\">Todas Partes</span>", rs_sub: "Síguenos en nuestras redes sociales oficiales y sé el primero en conocer nuestros productos y novedades.",
            fb_p: "Noticias, productos y novedades del mundo HVAC/R", fb_btn: "Seguir en Facebook →",
            ig_p: "Fotos de productos, eventos y contenido visual", ig_btn: "Seguir en Instagram →",
            yt_p: "Videos técnicos, demos y capacitaciones de nuestras marcas", yt_btn: "Suscribirse →",
            li_p: "Noticias corporativas y actualizaciones del sector industrial", li_btn: "Conectar en LinkedIn →",
            tw_p: "Actualizaciones rápidas y novedades del sector", tw_btn: "Seguir en X →",
            tk_p: "Contenido dinámico de nuestros productos y equipos", tk_btn: "Seguir en TikTok →",
            nw_h2: "¿Quieres recibir más novedades?", nw_p: "Síguenos en nuestras redes y visita nuestro canal de YouTube para mantenerte actualizado con las últimas tecnologías HVAC/R.",

            // Contacto
            ct_hero_h1: "Hablemos de tu Proyecto", ct_hero_p: "Nuestros ingenieros están listos para asesorarte",
            ct_info_h2: "Escríbenos <span style=\"color:var(--ac);\">tus dudas</span>", ct_info_p: "Contáctanos por cualquier medio. Nuestro equipo de ingenieros especializados te responderá a la brevedad.",
            ct_i1: "Oficina Central", ct_i2: "Email", ct_i3: "Sitio Web", ct_i4: "Sucursales", ct_i5: "Horario de Atención", ct_i6: "Redes Sociales",
            ct_form_h3: "Envíanos un Mensaje", ct_form_p: "Cuéntanos sobre tu proyecto y un experto de Haften te contactará.", ct_req: "* Campos requeridos",
            lbl_name: "Nombre", lbl_last: "Apellido", lbl_comp: "Empresa", lbl_phone: "Teléfono de Oficina", lbl_subj: "Asunto", lbl_msg: "Comentarios",
            pl_name: "Tu nombre", pl_last: "Tu apellido", pl_comp: "Nombre de tu empresa", pl_msg: "Cuéntanos tu proyecto, requerimiento o pregunta...",
            sel_opt1: "Selecciona un tema", sel_opt2: "Solicitar cotización", sel_opt3: "Soporte técnico", sel_opt4: "Información de catálogo", sel_opt5: "Distribución / Marcas", sel_opt6: "Otro",
            btn_send: "Enviar Mensaje", msg_succ: "✅ ¡Mensaje enviado con éxito! Nos comunicaremos contigo a la brevedad.",
            map_lbl: "Presencia nacional", map_title: "Encuéntranos en <span style=\"color:var(--ac);\">México</span>", map_btn: "Ver en Google Maps →",
        },
        en: {
            nav_home: "Home", nav_about: "About Us", nav_brands: "Brands",
            nav_catalogs: "Catalogs", nav_media: "Media", nav_social: "Social Networks",
            nav_contact: "Contact Us",

            hero_title1: "Selection · Specification",
            hero_title2: "Advising · Distribution",
            hero_sub: "HVAC/R-BMS Experts – Your trusted technical partner",

            idx_eyebrow: "<i class=\"fa-solid fa-circle-check\"></i> HVAC Peripherals · BMS · Energy Measurement",
            idx_num: "<i class=\"fa-solid fa-chart-line\" style=\"color:rgba(255,255,255,.5);margin-right:6px\"></i>Haften in numbers",
            idx_n1: "Years of experience", idx_n2: "International brands", idx_n3: "Offices in Mexico", idx_n4: "Clients served",
            idx_btn1: "<i class=\"fa-solid fa-building\"></i>About Us", idx_btn2: "<i class=\"fa-solid fa-file-pdf\"></i>Catalogs",

            idx_cat_eyb: "<i class=\"fa-solid fa-grid-2\"></i> Portfolio",
            idx_cat_title: "Explore Our <span>Categories</span>",
            idx_cat_sub: "Integral solutions for every need of your HVAC/R system",
            idx_c1: "Humidifiers", idx_c2: "Dehumidifiers", idx_c3: "Heaters",

            idx_br_eyb: "<i class=\"fa-solid fa-star\"></i> Authorized distributors",
            idx_br_title: "<span>World-Class</span> Brands",

            idx_pf_bdg: "<i class=\"fa-solid fa-boxes-stacked\" style=\"margin-right:6px\"></i>Our complete portfolio",
            idx_pf_title: "Everything you need<br>for your <span>HVAC/R</span> system",
            idx_pf_sub: "Instrumentation · Control · Automation · Air Conditioning",
            idx_p1: "Air, water and gas flow meters",
            idx_p2: "Control, balancing and energy valves",
            idx_p3: "Damper and valve actuators",
            idx_p4: "Humidity, temperature, CO/CO2, pressure, VOC sensors",
            idx_p5: "Industrial pressure gauges and thermometers",
            idx_p6: "Variable frequency drives (VFDs)",
            idx_p7: "BMS Gateways, routers and controllers",
            idx_p8: "HMIs, supervisors and power meters",

            idx_dw_cat: "<i class=\"fa-solid fa-file-pdf\"></i>Download catalogs",
            idx_vm: "<i class=\"fa-solid fa-arrow-right\"></i>See more",

            idx_wh_eyb: "<i class=\"fa-solid fa-shield-halved\"></i> Why choose us?",
            idx_wh_title: "The <span>Haften</span> Difference",
            idx_wh_sub: "More than distribution: we are your trusted technical partner",
            idx_w1_t: "Immediate Inventory", idx_w1_p: "Large stock available for immediate delivery. We minimize downtime in your industrial and construction projects.",
            idx_w2_t: "Specialized Engineers", idx_w2_p: "Technical personnel trained in selection, integration and operation of HVAC/R-BMS equipment. Free personalized advice.",
            idx_w3_t: "National Coverage", idx_w3_p: "CDMX · Monterrey · Guadalajara · Leon · Cancun. Personalized attention throughout Mexico with optimized logistics.",

            idx_ab_chip: "Represented<br>brands",
            idx_ab_eyb: "<i class=\"fa-solid fa-building-columns\"></i> About us",
            idx_ab_title: "<span>HVAC/R‑BMS</span> experts<br>at your service",
            idx_ab_p: "At Haften we specialize in the commercialization of <strong>control and instrumentation products for HVAC systems</strong>, humidifiers, dehumidifiers and electric heaters. Our goal is to provide reliable, efficient technical solutions adapted to the needs of each project.",
            idx_ab_btn: "<i class=\"fa-solid fa-arrow-right\"></i> Learn more",
            idx_ab_p1: "<i class=\"fa-solid fa-wind\"></i>Humidifiers",
            idx_ab_p2: "<i class=\"fa-solid fa-temperature-half\"></i>Dehumidifiers",
            idx_ab_p3: "<i class=\"fa-solid fa-fire-flame-curved\"></i>Heaters",
            idx_ab_p4: "<i class=\"fa-solid fa-gauge-high\"></i>Instrumentation",
            idx_ab_p5: "<i class=\"fa-solid fa-microchip\"></i>BMS",
            idx_ab_p6: "<i class=\"fa-solid fa-bolt\"></i>VFD Drives",

            idx_cta_t: "Have a project in mind?",
            idx_cta_p: "Our specialized engineers are ready to advise you on the selection and distribution of the right equipment.",
            idx_cta_b1: "<i class=\"fa-solid fa-envelope\"></i>Contact us",
            idx_cta_b2: "<i class=\"fa-solid fa-file-pdf\"></i>View catalogs",

            ft_nav: "Navigation", ft_contact: "Contact", ft_follow: "Follow Us", ft_social: "Official Channels",
            ft_tagline: '"A complete solution in one place."',
            ft_tagline2: '"A complete solution in one place."<br>HVAC Peripherals · BMS · Energy Measurement',
            ft_copy: "© 2025 Haften. All rights reserved.",

            thm_lbl: "Accent Color",
            cookie_txt: 'This website uses cookies to improve your experience. By continuing to browse, you accept our <strong>privacy policy</strong>.',
            cookie_btn: "Accept cookies",

            // Global buttons
            btn_contact: "Contact Us",
            btn_view: "View Catalog",
            btn_advise: "Request Advice →",

            // about
            ab_hero_eyb: "About Us",
            ab_hero_sub: "HVAC/R-BMS Experts – Your trusted technical partner",
            ab_yr: "20+", ab_yr_sub: "Years of Experience",
            ab_exp: "<span style=\"color:var(--ac);\">HVAC/R-BMS</span> Experts<br>at your service",
            ab_p1: "At <strong>Haften</strong>, we specialize in the marketing of <strong>control and instrumentation products for HVAC systems</strong>, as well as humidifiers, dehumidifiers, and electric heaters. Our goal is to provide reliable, efficient technical solutions adapted to the needs of each project.",
            ab_p2: "We represent internationally recognized brands: Air Monitor, Badger Meter, Belimo, Bry-Air, Contemporary Controls, Control Techniques, Cool Automation, Delta Electronics, Dwyer Omega, FlowCon, GPI, Greystone Energy, Johnson Controls, Loytec, ONICON, Meitav-Tec, Neptronic, Senva, and Vaisala.",
            ab_p3: "We have a <strong>large inventory available for immediate delivery</strong> and a team of specialized engineers who provide technical advice in HVAC, building automation, laboratories, hospitals, data centers, and industrial processes.",

            pf_eyb: "Portfolio", pf_title: "Our <span style=\"color:var(--ac);\">Products</span>", pf_sub: "Technical solutions for every need of your HVAC/R project",
            br_lbl: "Authorized Distributors", br_title: "Brands We <span style=\"color:var(--ac);\">Represent</span>",

            loc_title: "National <span style=\"color:var(--ac);\">Coverage</span>", loc_sub: "Headquarters in CDMX and presence throughout Mexico.",
            loc_cdmx: "Mexico City", loc_mty: "Monterrey", loc_gdl: "Guadalajara", loc_leon: "Leon", loc_cun: "Cancun",
            loc_mat: "Headquarters", loc_reg: "Regional Office",

            // Brands
            br_hero_h1: "Explore Our Brands", br_hero_p: "We represent leading international brands in innovation, precision, and quality",
            br_title2: "More than <span style=\"color:var(--ac);\">25 International</span> Brands", br_sub2: "We work with the best manufacturers in the world to offer you high quality solutions.",

            // Catalogs
            cat_hero_h1: "Digital Catalogs", cat_hero_p: "Discover our solutions – Download our digital catalog now!",
            cat_lbl: "Technical Resources", cat_title: "Explore Our <span style=\"color:var(--ac);\">Catalogs</span>", cat_sub: "Complete technical documentation to facilitate your equipment selection and specification.",
            cat_bdg: "CATALOG", btn_doc: "📄 View document",
            cat_cta_h2: "Need technical advice?", cat_cta_p: "Our specialized engineers can help you select the right equipment.",

            // Multimedia
            mm_hero_h1: "Multimedia Center", mm_hero_p: "Technical videos, product demos, and specialized content",
            mm_lbl: "Official YouTube Channel", mm_title: "Our <span style=\"color:var(--ac);\">Multimedia</span> Content", mm_sub: "Discover demos, training, and updates from all our brands.",
            mm_btn: "🎬 Watch all videos on YouTube →",

            // Social
            rs_hero_h1: "Follow Us on Social Media", rs_hero_p: "Stay up to date with our news, products, and promotions",
            rs_lbl: "Digital Presence", rs_title: "Find Us <span style=\"color:var(--ac);\">Everywhere</span>", rs_sub: "Follow our official social networks and be the first to know about our products and news.",
            fb_p: "News, products, and trends in the HVAC/R world", fb_btn: "Follow on Facebook →",
            ig_p: "Product photos, events, and visual content", ig_btn: "Follow on Instagram →",
            yt_p: "Technical videos, demos, and brand training", yt_btn: "Subscribe →",
            li_p: "Corporate news and industrial sector updates", li_btn: "Connect on LinkedIn →",
            tw_p: "Quick updates and industry news", tw_btn: "Follow on X →",
            tk_p: "Dynamic content of our products and equipment", tk_btn: "Follow on TikTok →",
            nw_h2: "Want to receive more news?", nw_p: "Follow us on our networks and visit our YouTube channel to stay updated on the latest HVAC/R technologies.",

            // Contact
            ct_hero_h1: "Let's Talk About Your Project", ct_hero_p: "Our engineers are ready to advise you",
            ct_info_h2: "Write us <span style=\"color:var(--ac);\">your questions</span>", ct_info_p: "Contact us by any means. Our team of specialized engineers will respond to you shortly.",
            ct_i1: "Headquarters", ct_i2: "Email", ct_i3: "Website", ct_i4: "Branches", ct_i5: "Business Hours", ct_i6: "Social Networks",
            ct_form_h3: "Send Us a Message", ct_form_p: "Tell us about your project and a Haften expert will contact you.", ct_req: "* Required fields",
            lbl_name: "First Name", lbl_last: "Last Name", lbl_comp: "Company", lbl_phone: "Office Phone", lbl_subj: "Subject", lbl_msg: "Comments",
            pl_name: "Your name", pl_last: "Your last name", pl_comp: "Your company name", pl_msg: "Tell us about your project, requirement or question...",
            sel_opt1: "Select a topic", sel_opt2: "Request a quote", sel_opt3: "Technical support", sel_opt4: "Catalog information", sel_opt5: "Distribution / Brands", sel_opt6: "Other",
            btn_send: "Send Message", msg_succ: "✅ Message sent successfully! We will contact you shortly.",
            map_lbl: "National Presence", map_title: "Find Us in <span style=\"color:var(--ac);\">Mexico</span>", map_btn: "View on Google Maps →",
        }
    };

    const langPill = document.querySelector('.lang-pill');
    if (!langPill) return;

    let currentLang = localStorage.getItem('haften-lang') || 'es';
    if (currentLang === 'en') langPill.classList.add('lang-switched');
    applyLanguage(currentLang, false);

    langPill.addEventListener('click', () => {
        const isSwitched = langPill.classList.contains('lang-switched');
        const targetLang = isSwitched ? 'es' : 'en';

        // Page transition wrapper (wrap all sections if needed, or specific containers)
        const wrapper = document.querySelector('.page-transition-wrap');
        if (wrapper) wrapper.classList.add('page-transitioning');

        langPill.classList.toggle('lang-switched');
        localStorage.setItem('haften-lang', targetLang);
        currentLang = targetLang;

        setTimeout(() => {
            applyLanguage(targetLang, true);
            if (wrapper) {
                setTimeout(() => wrapper.classList.remove('page-transitioning'), 100);
            }
        }, 500); // Wait for fade out
    });

    function applyLanguage(lang, animate) {
        const dict = langDoc[lang];
        if (!dict) return;
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (langDoc[lang][key]) {
                el.innerHTML = langDoc[lang][key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (langDoc[lang][key]) {
                el.setAttribute('placeholder', langDoc[lang][key]);
            }
        });
    }
})();

/* ══════════════════════════════════════
   8. PAGE HERO LOADED CLASS
   ══════════════════════════════════════ */
(function () {
    const hero = document.querySelector('.page-hero');
    if (!hero) return;
    const img = hero.querySelector('.page-hero-img');
    if (!img) return;
    if (img.complete) hero.classList.add('loaded');
    else img.addEventListener('load', () => hero.classList.add('loaded'));
})();

/* ══════════════════════════════════════
   9. SMOOTH ACTIVE LINK INDICATOR
   ══════════════════════════════════════ */
(function () {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                document.querySelectorAll('.nav-link').forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
                });
            }
        });
    }, { threshold: .5 });
    sections.forEach(s => io.observe(s));
})();

/* ══════════════════════════════════════
   10. COOKIE CONSENT POP-UP
   ══════════════════════════════════════ */
(function () {
    const consent = document.getElementById('cookie-consent');
    const btn = document.getElementById('cookie-accept');
    if (!consent || !btn) return;

    if (!localStorage.getItem('haften-cookies')) {
        setTimeout(() => consent.classList.add('show'), 2000);
    }

    btn.addEventListener('click', () => {
        consent.classList.remove('show');
        localStorage.setItem('haften-cookies', 'true');
    });
})();
