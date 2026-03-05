import os
import re

html_files = [
    'index.html', 'nosotros.html', 'marcas.html', 
    'catalogos.html', 'multimedia.html', 'redes.html', 'contacto.html'
]

replacements = [
    # NAVBAR & FOOTER
    (r'<a href="index.html" class="nav-link(.*?)>Inicio</a>', 
     r'<a href="index.html" class="nav-link\1 data-i18n="nav_home">Inicio</a>'),
    (r'<a href="nosotros.html" class="nav-link(.*?)>Nosotros</a>', 
     r'<a href="nosotros.html" class="nav-link\1 data-i18n="nav_about">Nosotros</a>'),
    (r'<a href="marcas.html" class="nav-link(.*?)>Marcas</a>', 
     r'<a href="marcas.html" class="nav-link\1 data-i18n="nav_brands">Marcas</a>'),
    (r'<a href="catalogos.html" class="nav-link(.*?)>Catálogos</a>', 
     r'<a href="catalogos.html" class="nav-link\1 data-i18n="nav_catalogs">Catálogos</a>'),
    (r'<a href="multimedia.html" class="nav-link(.*?)>Multimedia</a>', 
     r'<a href="multimedia.html" class="nav-link\1 data-i18n="nav_media">Multimedia</a>'),
    (r'<a href="redes.html" class="nav-link(.*?)>Redes Sociales</a>', 
     r'<a href="redes.html" class="nav-link\1 data-i18n="nav_social">Redes Sociales</a>'),
    (r'Contacto <i class="fa-solid fa-arrow-right"></i>', 
     r'<span data-i18n="nav_contact">Contacto</span> <i class="fa-solid fa-arrow-right"></i>'),
    (r'style="margin-left:8px;padding:9px 20px;">Contacto</a>', 
     r'style="margin-left:8px;padding:9px 20px;" data-i18n="nav_contact">Contacto</a>'),
    (r'<h4>Navegación</h4>', 
     r'<h4 data-i18n="ft_nav">Navegación</h4>'),
    (r'<h4>Contacto</h4>', 
     r'<h4 data-i18n="ft_contact">Contacto</h4>'),
    (r'<h4>Síguenos</h4>', 
     r'<h4 data-i18n="ft_follow">Síguenos</h4>'),
    (r'<h4>Redes Oficiales</h4>', 
     r'<h4 data-i18n="ft_social">Redes Oficiales</h4>'),
    (r'<p class="footer-tagline">"Una solución completa en el mismo lugar."</p>', 
     r'<p class="footer-tagline" data-i18n="ft_tagline">"Una solución completa en el mismo lugar."</p>'),
    (r'<p class="footer-desc">"Una solución completa en el mismo lugar."</p>', 
     r'<p class="footer-desc" data-i18n="ft_tagline">"Una solución completa en el mismo lugar."</p>'),
    (r'© 2025 Haften. Todos los derechos reservados.', 
     r'<span data-i18n="ft_copy">© 2025 Haften. Todos los derechos reservados.</span>'),
    (r'<li><a href="index.html">Inicio</a></li>', 
     r'<li><a href="index.html" data-i18n="nav_home">Inicio</a></li>'),
    (r'<li><a href="index.html"><i class="fa-solid fa-house"></i>Inicio</a></li>', 
     r'<li><a href="index.html"><i class="fa-solid fa-house"></i><span data-i18n="nav_home">Inicio</span></a></li>'),
    (r'<li><a href="nosotros.html">Nosotros</a></li>', 
     r'<li><a href="nosotros.html" data-i18n="nav_about">Nosotros</a></li>'),
    (r'<li><a href="nosotros.html"><i class="fa-solid fa-building"></i>Nosotros</a></li>', 
     r'<li><a href="nosotros.html"><i class="fa-solid fa-building"></i><span data-i18n="nav_about">Nosotros</span></a></li>'),
    (r'<li><a href="marcas.html">Marcas</a></li>', 
     r'<li><a href="marcas.html" data-i18n="nav_brands">Marcas</a></li>'),
    (r'<li><a href="marcas.html"><i class="fa-solid fa-tag"></i>Marcas</a></li>', 
     r'<li><a href="marcas.html"><i class="fa-solid fa-tag"></i><span data-i18n="nav_brands">Marcas</span></a></li>'),
    (r'<li><a href="catalogos.html">Catálogos</a></li>', 
     r'<li><a href="catalogos.html" data-i18n="nav_catalogs">Catálogos</a></li>'),
    (r'<li><a href="catalogos.html"><i class="fa-solid fa-file-pdf"></i>Catálogos</a></li>', 
     r'<li><a href="catalogos.html"><i class="fa-solid fa-file-pdf"></i><span data-i18n="nav_catalogs">Catálogos</span></a></li>'),
    (r'<li><a href="multimedia.html">Multimedia</a></li>', 
     r'<li><a href="multimedia.html" data-i18n="nav_media">Multimedia</a></li>'),
    (r'<li><a href="multimedia.html"><i class="fa-solid fa-play-circle"></i>Multimedia</a></li>', 
     r'<li><a href="multimedia.html"><i class="fa-solid fa-play-circle"></i><span data-i18n="nav_media">Multimedia</span></a></li>'),
    (r'<li><a href="redes.html">Redes Sociales</a></li>', 
     r'<li><a href="redes.html" data-i18n="nav_social">Redes Sociales</a></li>'),
    (r'<li><a href="redes.html"><i class="fa-solid fa-share-nodes"></i>Redes Sociales</a></li>', 
     r'<li><a href="redes.html"><i class="fa-solid fa-share-nodes"></i><span data-i18n="nav_social">Redes Sociales</span></a></li>'),
    (r'<li><a href="contacto.html">Contacto</a></li>', 
     r'<li><a href="contacto.html" data-i18n="nav_contact">Contacto</a></li>'),
    (r'<li><a href="contacto.html"><i class="fa-solid fa-envelope"></i>Contacto</a></li>', 
     r'<li><a href="contacto.html"><i class="fa-solid fa-envelope"></i><span data-i18n="nav_contact">Contacto</span></a></li>'),
    
    # HERO text
    (r'<h1(.*?)>Selección · Especificación<br>Asesoría · Distribución</h1>',
     r'<h1\1><span data-i18n="hero_title1">Selección · Especificación</span><br><span data-i18n="hero_title2">Asesoría · Distribución</span></h1>'),
    (r'<p(.*?)>Expertos en HVAC/R-BMS – Tu socio técnico de confianza</p>',
     r'<p\1 data-i18n="hero_sub">Expertos en HVAC/R-BMS – Tu socio técnico de confianza</p>'),
    (r'<p class="panel-label">Color de acento</p>',
     r'<p class="panel-label" data-i18n="thm_lbl">Color de acento</p>'),
     
    # Cookie text
    (r'<p class="cookie-text">Este sitio web utiliza cookies para mejorar tu experiencia\. Al continuar navegando, aceptas nuestra <strong>política de privacidad</strong>\.</p>',
     r'<p class="cookie-text" data-i18n="cookie_txt">Este sitio web utiliza cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra <strong>política de privacidad</strong>.</p>'),
    (r'<button class="cookie-btn" id="cookie-accept">Aceptar cookies</button>',
     r'<button class="cookie-btn" id="cookie-accept" data-i18n="cookie_btn">Aceptar cookies</button>')
]

for filename in html_files:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            
        for old, new in replacements:
            content = re.sub(old, new, content)
            
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Patched {filename}")
    else:
        print(f"File {filename} not found.")
