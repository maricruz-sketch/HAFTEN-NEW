const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Diseño Partum Design\\.gemini\\antigravity\\scratch\\haften-redesign';

const replacements = {
    'nosotros.html': [
        ['<span class="eyebrow">Nosotros</span>', '<span class="eyebrow" data-i18n="ab_hero_eyb">Nosotros</span>'],
        ['<p class="hero-subtitle">Expertos en HVAC/R-BMS – Tu socio técnico de confianza</p>', '<p class="hero-subtitle" data-i18n="ab_hero_sub">Expertos en HVAC/R-BMS – Tu socio técnico de confianza</p>'],
        ['<h2>20+</h2>', '<h2 data-i18n="ab_yr">20+</h2>'],
        ['<p>Años de experiencia</p>', '<p data-i18n="ab_yr_sub">Años de experiencia</p>'],
        ['<h2 class="section-title reveal-r">Expertos en <span>HVAC/R-BMS</span><br>a tu servicio</h2>', '<h2 class="section-title reveal-r" data-i18n="ab_exp">Expertos en <span>HVAC/R-BMS</span><br>a tu servicio</h2>'],
        ['<p class="reveal-r" style="transition-delay: 0.1s;">En <strong>Haften</strong>, nos especializamos en la comercialización de productos de <strong>control e instrumentación para sistemas HVAC</strong>, así como en humidificadores, deshumidificadores y calefactores eléctricos. Nuestro objetivo es brindar soluciones técnicas confiables, eficientes y adaptadas a las necesidades de cada proyecto.</p>', '<p class="reveal-r" style="transition-delay: 0.1s;" data-i18n="ab_p1">En <strong>Haften</strong>, nos especializamos en la comercialización de productos de <strong>control e instrumentación para sistemas HVAC</strong>, así como en humidificadores, deshumidificadores y calefactores eléctricos. Nuestro objetivo es brindar soluciones técnicas confiables, eficientes y adaptadas a las necesidades de cada proyecto.</p>'],
        ['<p class="reveal-r" style="transition-delay: 0.2s;">Representamos marcas reconocidas internacionalmente: Air Monitor, Badger Meter, Belimo, Bry-Air, Contemporary Controls, Control Techniques, Cool Automation, Delta Electronics, Dwyer Omega, FlowCon, GPI, Greystone Energy, Johnson Controls, Loytec, ONICON, Meitav-Tec, Neptronic, Senva y Vaisala.</p>', '<p class="reveal-r" style="transition-delay: 0.2s;" data-i18n="ab_p2">Representamos marcas reconocidas internacionalmente: Air Monitor, Badger Meter, Belimo, Bry-Air, Contemporary Controls, Control Techniques, Cool Automation, Delta Electronics, Dwyer Omega, FlowCon, GPI, Greystone Energy, Johnson Controls, Loytec, ONICON, Meitav-Tec, Neptronic, Senva y Vaisala.</p>'],
        ['<p class="reveal-r" style="transition-delay: 0.3s;">Contamos con un <strong>amplio inventario disponible para entrega inmediata</strong> y un equipo de ingenieros especializados que brindan asesoría técnica en HVAC, automatización de edificios, laboratorios, hospitales, centros de datos y procesos industriales.</p>', '<p class="reveal-r" style="transition-delay: 0.3s;" data-i18n="ab_p3">Contamos con un <strong>amplio inventario disponible para entrega inmediata</strong> y un equipo de ingenieros especializados que brindan asesoría técnica en HVAC, automatización de edificios, laboratorios, hospitales, centros de datos y procesos industriales.</p>'],
        ['<span class="eyebrow reveal-l">Portafolio</span>', '<span class="eyebrow reveal-l" data-i18n="pf_eyb">Portafolio</span>'],
        ['<h2 class="section-title reveal-l">Nuestros <span>Productos</span></h2>', '<h2 class="section-title reveal-l" data-i18n="pf_title">Nuestros <span>Productos</span></h2>'],
        ['<p class="section-desc reveal-l">Soluciones técnicas para cada necesidad de tu proyecto HVAC/R</p>', '<p class="section-desc reveal-l" data-i18n="pf_sub">Soluciones técnicas para cada necesidad de tu proyecto HVAC/R</p>'],
        ['<span class="eyebrow reveal">Distribuidores autorizados</span>', '<span class="eyebrow reveal" data-i18n="br_lbl">Distribuidores autorizados</span>'],
        ['<h2 class="section-title reveal">Marcas que <span>Representamos</span></h2>', '<h2 class="section-title reveal" data-i18n="br_title">Marcas que <span>Representamos</span></h2>'],
        ['<h2 class="section-title reveal">Cobertura <span>Nacional</span></h2>', '<h2 class="section-title reveal" data-i18n="loc_title">Cobertura <span>Nacional</span></h2>'],
        ['<p class="section-desc reveal">Oficina matriz en CDMX y presencia en todo México.</p>', '<p class="section-desc reveal" data-i18n="loc_sub">Oficina matriz en CDMX y presencia en todo México.</p>'],
        ['<h3>Ciudad de México</h3>', '<h3 data-i18n="loc_cdmx">Ciudad de México</h3>'],
        ['<h3>Monterrey</h3>', '<h3 data-i18n="loc_mty">Monterrey</h3>'],
        ['<h3>Guadalajara</h3>', '<h3 data-i18n="loc_gdl">Guadalajara</h3>'],
        ['<h3>León</h3>', '<h3 data-i18n="loc_leon">León</h3>'],
        ['<h3>Cancún</h3>', '<h3 data-i18n="loc_cun">Cancún</h3>'],
        ['<p>Oficina Matriz</p>', '<p data-i18n="loc_mat">Oficina Matriz</p>'],
        ['<p>Oficina Regional</p>', '<p data-i18n="loc_reg">Oficina Regional</p>'],
        ['>Contáctanos<', ' data-i18n="btn_contact">Contáctanos<']
    ],
    'marcas.html': [
        ['<h1 class="hero-title reveal">Explora Nuestras Marcas</h1>', '<h1 class="hero-title reveal" data-i18n="br_hero_h1">Explora Nuestras Marcas</h1>'],
        ['<p class="hero-subtitle reveal">Representamos marcas internacionales líderes en innovación, precisión y calidad</p>', '<p class="hero-subtitle reveal" data-i18n="br_hero_p">Representamos marcas internacionales líderes en innovación, precisión y calidad</p>'],
        ['<h2 class="section-title reveal">Más de <span>25 Marcas</span> Internacionales</h2>', '<h2 class="section-title reveal" data-i18n="br_title2">Más de <span>25 Marcas</span> Internacionales</h2>'],
        ['<p class="section-desc reveal">Trabajamos con los mejores fabricantes del mundo para ofrecerte soluciones de alta calidad.</p>', '<p class="section-desc reveal" data-i18n="br_sub2">Trabajamos con los mejores fabricantes del mundo para ofrecerte soluciones de alta calidad.</p>'],
        ['>Ver catálogo<', ' data-i18n="btn_view">Ver catálogo<']
    ],
    'catalogos.html': [
        ['<h1 class="hero-title reveal">Catálogos Digitales</h1>', '<h1 class="hero-title reveal" data-i18n="cat_hero_h1">Catálogos Digitales</h1>'],
        ['<p class="hero-subtitle reveal">Descubre nuestras soluciones – ¡Descarga ahora nuestro catálogo digital!</p>', '<p class="hero-subtitle reveal" data-i18n="cat_hero_p">Descubre nuestras soluciones – ¡Descarga ahora nuestro catálogo digital!</p>'],
        ['<span class="eyebrow reveal">Recursos técnicos</span>', '<span class="eyebrow reveal" data-i18n="cat_lbl">Recursos técnicos</span>'],
        ['<h2 class="section-title reveal">Explora Nuestros <span>Catálogos</span></h2>', '<h2 class="section-title reveal" data-i18n="cat_title">Explora Nuestros <span>Catálogos</span></h2>'],
        ['<p class="section-desc reveal">Documentación técnica completa para facilitar tu selección y especificación de equipos.</p>', '<p class="section-desc reveal" data-i18n="cat_sub">Documentación técnica completa para facilitar tu selección y especificación de equipos.</p>'],
        ['<span class="badge">CATÁLOGO</span>', '<span class="badge" data-i18n="cat_bdg">CATÁLOGO</span>'],
        ['>📄 Ver documento<', ' data-i18n="btn_doc">📄 Ver documento<'],
        ['<h2 class="reveal">¿Necesitas asesoría técnica?</h2>', '<h2 class="reveal" data-i18n="cat_cta_h2">¿Necesitas asesoría técnica?</h2>'],
        ['<p class="reveal">Nuestros ingenieros especializados pueden ayudarte a seleccionar el equipo correcto.</p>', '<p class="reveal" data-i18n="cat_cta_p">Nuestros ingenieros especializados pueden ayudarte a seleccionar el equipo correcto.</p>'],
        ['>Solicitar asesoría →<', ' data-i18n="btn_advise">Solicitar asesoría →<']
    ],
    'multimedia.html': [
        ['<h1 class="hero-title reveal">Centro Multimedia</h1>', '<h1 class="hero-title reveal" data-i18n="mm_hero_h1">Centro Multimedia</h1>'],
        ['<p class="hero-subtitle reveal">Videos técnicos, demos de productos y contenido especializado</p>', '<p class="hero-subtitle reveal" data-i18n="mm_hero_p">Videos técnicos, demos de productos y contenido especializado</p>'],
        ['<span class="eyebrow reveal">Canal Oficial YouTube</span>', '<span class="eyebrow reveal" data-i18n="mm_lbl">Canal Oficial YouTube</span>'],
        ['<h2 class="section-title reveal">Nuestro Contenido <span>Multimedia</span></h2>', '<h2 class="section-title reveal" data-i18n="mm_title">Nuestro Contenido <span>Multimedia</span></h2>'],
        ['<p class="section-desc reveal">Descubre demos, capacitaciones y actualizaciones de todas nuestras marcas.</p>', '<p class="section-desc reveal" data-i18n="mm_sub">Descubre demos, capacitaciones y actualizaciones de todas nuestras marcas.</p>'],
        ['>🎬 Ver todos los videos en YouTube →<', ' data-i18n="mm_btn">🎬 Ver todos los videos en YouTube →<']
    ],
    'redes.html': [
        ['<h1 class="hero-title reveal">Síguenos en Redes Sociales</h1>', '<h1 class="hero-title reveal" data-i18n="rs_hero_h1">Síguenos en Redes Sociales</h1>'],
        ['<p class="hero-subtitle reveal">Mantente al día con nuestras novedades, productos y promociones</p>', '<p class="hero-subtitle reveal" data-i18n="rs_hero_p">Mantente al día con nuestras novedades, productos y promociones</p>'],
        ['<span class="eyebrow reveal">Presencia digital</span>', '<span class="eyebrow reveal" data-i18n="rs_lbl">Presencia digital</span>'],
        ['<h2 class="section-title reveal">Encuéntranos en <span>Todas Partes</span></h2>', '<h2 class="section-title reveal" data-i18n="rs_title">Encuéntranos en <span>Todas Partes</span></h2>'],
        ['<p class="section-desc reveal">Síguenos en nuestras redes sociales oficiales y sé el primero en conocer nuestros productos y novedades.</p>', '<p class="section-desc reveal" data-i18n="rs_sub">Síguenos en nuestras redes sociales oficiales y sé el primero en conocer nuestros productos y novedades.</p>'],
        ['<p>Noticias, productos y novedades del mundo HVAC/R</p>', '<p data-i18n="fb_p">Noticias, productos y novedades del mundo HVAC/R</p>'],
        ['>Seguir en Facebook →<', ' data-i18n="fb_btn">Seguir en Facebook →<'],
        ['<p>Fotos de productos, eventos y contenido visual</p>', '<p data-i18n="ig_p">Fotos de productos, eventos y contenido visual</p>'],
        ['>Seguir en Instagram →<', ' data-i18n="ig_btn">Seguir en Instagram →<'],
        ['<p>Videos técnicos, demos y capacitaciones de nuestras marcas</p>', '<p data-i18n="yt_p">Videos técnicos, demos y capacitaciones de nuestras marcas</p>'],
        ['>Suscribirse →<', ' data-i18n="yt_btn">Suscribirse →<'],
        ['<p>Noticias corporativas y actualizaciones del sector industrial</p>', '<p data-i18n="li_p">Noticias corporativas y actualizaciones del sector industrial</p>'],
        ['>Conectar en LinkedIn →<', ' data-i18n="li_btn">Conectar en LinkedIn →<'],
        ['<p>Actualizaciones rápidas y novedades del sector</p>', '<p data-i18n="tw_p">Actualizaciones rápidas y novedades del sector</p>'],
        ['>Seguir en X →<', ' data-i18n="tw_btn">Seguir en X →<'],
        ['<p>Contenido dinámico de nuestros productos y equipos</p>', '<p data-i18n="tk_p">Contenido dinámico de nuestros productos y equipos</p>'],
        ['>Seguir en TikTok →<', ' data-i18n="tk_btn">Seguir en TikTok →<'],
        ['<h2 class="reveal">¿Quieres recibir más novedades?</h2>', '<h2 class="reveal" data-i18n="nw_h2">¿Quieres recibir más novedades?</h2>'],
        ['<p class="reveal">Síguenos en nuestras redes y visita nuestro canal de YouTube para mantenerte actualizado con las últimas tecnologías HVAC/R.</p>', '<p class="reveal" data-i18n="nw_p">Síguenos en nuestras redes y visita nuestro canal de YouTube para mantenerte actualizado con las últimas tecnologías HVAC/R.</p>']
    ],
    'contacto.html': [
        ['<h1 class="hero-title reveal">Hablemos de tu Proyecto</h1>', '<h1 class="hero-title reveal" data-i18n="ct_hero_h1">Hablemos de tu Proyecto</h1>'],
        ['<p class="hero-subtitle reveal">Nuestros ingenieros están listos para asesorarte</p>', '<p class="hero-subtitle reveal" data-i18n="ct_hero_p">Nuestros ingenieros están listos para asesorarte</p>'],
        ['<h2 class="section-title reveal-l">Escríbenos <span>tus dudas</span></h2>', '<h2 class="section-title reveal-l" data-i18n="ct_info_h2">Escríbenos <span>tus dudas</span></h2>'],
        ['<p class="section-desc reveal-l">Contáctanos por cualquier medio. Nuestro equipo de ingenieros especializados te responderá a la brevedad.</p>', '<p class="section-desc reveal-l" data-i18n="ct_info_p">Contáctanos por cualquier medio. Nuestro equipo de ingenieros especializados te responderá a la brevedad.</p>'],
        ['<h3>Oficina Central</h3>', '<h3 data-i18n="ct_i1">Oficina Central</h3>'],
        ['<h3>Email</h3>', '<h3 data-i18n="ct_i2">Email</h3>'],
        ['<h3>Sitio Web</h3>', '<h3 data-i18n="ct_i3">Sitio Web</h3>'],
        ['<h3>Sucursales</h3>', '<h3 data-i18n="ct_i4">Sucursales</h3>'],
        ['<h3>Horario de Atención</h3>', '<h3 data-i18n="ct_i5">Horario de Atención</h3>'],
        ['<h3>Redes Sociales</h3>', '<h3 data-i18n="ct_i6">Redes Sociales</h3>'],
        ['<h3>Envíanos un Mensaje</h3>', '<h3 data-i18n="ct_form_h3">Envíanos un Mensaje</h3>'],
        ['<p>Cuéntanos sobre tu proyecto y un experto de Haften te contactará.</p>', '<p data-i18n="ct_form_p">Cuéntanos sobre tu proyecto y un experto de Haften te contactará.</p>'],
        ['<span class="req">* Campos requeridos</span>', '<span class="req" data-i18n="ct_req">* Campos requeridos</span>'],
        ['<label for="fname">Nombre *</label>', '<label for="fname"><span data-i18n="lbl_name">Nombre</span> *</label>'],
        ['<label for="lname">Apellido *</label>', '<label for="lname"><span data-i18n="lbl_last">Apellido</span> *</label>'],
        ['<label for="empresa">Empresa *</label>', '<label for="empresa"><span data-i18n="lbl_comp">Empresa</span> *</label>'],
        ['<label for="telefono">Teléfono de Oficina</label>', '<label for="telefono" data-i18n="lbl_phone">Teléfono de Oficina</label>'],
        ['<label for="asunto">Asunto *</label>', '<label for="asunto"><span data-i18n="lbl_subj">Asunto</span> *</label>'],
        ['<label for="mensaje">Comentarios *</label>', '<label for="mensaje"><span data-i18n="lbl_msg">Comentarios</span> *</label>'],
        ['placeholder="Tu nombre"', 'placeholder="Tu nombre" data-i18n-placeholder="pl_name"'],
        ['placeholder="Tu apellido"', 'placeholder="Tu apellido" data-i18n-placeholder="pl_last"'],
        ['placeholder="Nombre de tu empresa"', 'placeholder="Nombre de tu empresa" data-i18n-placeholder="pl_comp"'],
        ['placeholder="Cuéntanos tu proyecto, requerimiento o pregunta..."', 'placeholder="Cuéntanos tu proyecto, requerimiento o pregunta..." data-i18n-placeholder="pl_msg"'],
        ['<option value="" disabled selected>Selecciona un tema</option>', '<option value="" disabled selected data-i18n="sel_opt1">Selecciona un tema</option>'],
        ['<option value="cotizacion">Solicitar cotización</option>', '<option value="cotizacion" data-i18n="sel_opt2">Solicitar cotización</option>'],
        ['<option value="soporte">Soporte técnico</option>', '<option value="soporte" data-i18n="sel_opt3">Soporte técnico</option>'],
        ['<option value="catalogo">Información de catálogo</option>', '<option value="catalogo" data-i18n="sel_opt4">Información de catálogo</option>'],
        ['<option value="marcas">Distribución / Marcas</option>', '<option value="marcas" data-i18n="sel_opt5">Distribución / Marcas</option>'],
        ['<option value="otro">Otro</option>', '<option value="otro" data-i18n="sel_opt6">Otro</option>'],
        ['>Enviar Mensaje<', ' data-i18n="btn_send">Enviar Mensaje<'],
        ['<div class="success-message" id="form-success">✅ ¡Mensaje enviado con éxito! Nos comunicaremos contigo a la brevedad.</div>', '<div class="success-message" id="form-success" data-i18n="msg_succ">✅ ¡Mensaje enviado con éxito! Nos comunicaremos contigo a la brevedad.</div>'],
        ['<span class="eyebrow reveal">Presencia nacional</span>', '<span class="eyebrow reveal" data-i18n="map_lbl">Presencia nacional</span>'],
        ['<h2 class="section-title reveal">Encuéntranos en <span>México</span></h2>', '<h2 class="section-title reveal" data-i18n="map_title">Encuéntranos en <span>México</span></h2>'],
        ['>Ver en Google Maps →<', ' data-i18n="map_btn">Ver en Google Maps →<']
    ]
};

for (const [filename, changes] of Object.entries(replacements)) {
    const filePath = path.join(dir, filename);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');
    for (const [oldStr, newStr] of changes) {
        // Replace all occurrences using split.join
        content = content.split(oldStr).join(newStr);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Patched ${filename}`);
}
