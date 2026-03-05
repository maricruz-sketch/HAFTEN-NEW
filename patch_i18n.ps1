$files = @('index.html', 'nosotros.html', 'marcas.html', 'catalogos.html', 'multimedia.html', 'redes.html', 'contacto.html')
$dir = 'c:\Users\Diseño Partum Design\.gemini\antigravity\scratch\haften-redesign'

foreach ($file in $files) {
    $path = Join-Path $dir $file
    if (-Not (Test-Path $path)) { continue }
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

    # Navbar
    $content = $content -replace '<a href="index.html" class="nav-link(.*?)>Inicio</a>', '<a href="index.html" class="nav-link$1 data-i18n="nav_home">Inicio</a>'
    $content = $content -replace '<a href="nosotros.html" class="nav-link(.*?)>Nosotros</a>', '<a href="nosotros.html" class="nav-link$1 data-i18n="nav_about">Nosotros</a>'
    $content = $content -replace '<a href="marcas.html" class="nav-link(.*?)>Marcas</a>', '<a href="marcas.html" class="nav-link$1 data-i18n="nav_brands">Marcas</a>'
    $content = $content -replace '<a href="catalogos.html" class="nav-link(.*?)>Catálogos</a>', '<a href="catalogos.html" class="nav-link$1 data-i18n="nav_catalogs">Catálogos</a>'
    $content = $content -replace '<a href="multimedia.html" class="nav-link(.*?)>Multimedia</a>', '<a href="multimedia.html" class="nav-link$1 data-i18n="nav_media">Multimedia</a>'
    $content = $content -replace '<a href="redes.html" class="nav-link(.*?)>Redes Sociales</a>', '<a href="redes.html" class="nav-link$1 data-i18n="nav_social">Redes Sociales</a>'
    $content = $content -replace 'Contacto <i class="fa-solid fa-arrow-right"></i>', '<span data-i18n="nav_contact">Contacto</span> <i class="fa-solid fa-arrow-right"></i>'
    $content = $content -replace 'style="margin-left:8px;padding:9px 20px;">Contacto</a>', 'style="margin-left:8px;padding:9px 20px;" data-i18n="nav_contact">Contacto</a>'
    
    # Footer
    $content = $content -replace '<h4>Navegación</h4>', '<h4 data-i18n="ft_nav">Navegación</h4>'
    $content = $content -replace '<h4>Contacto</h4>', '<h4 data-i18n="ft_contact">Contacto</h4>'
    $content = $content -replace '<h4>Síguenos</h4>', '<h4 data-i18n="ft_follow">Síguenos</h4>'
    $content = $content -replace '<h4>Redes Oficiales</h4>', '<h4 data-i18n="ft_social">Redes Oficiales</h4>'
    $content = $content -replace '<p class="footer-tagline">"Una solución completa en el mismo lugar."</p>', '<p class="footer-tagline" data-i18n="ft_tagline">"Una solución completa en el mismo lugar."</p>'
    $content = $content -replace '<p class="footer-desc">"Una solución completa en el mismo lugar."</p>', '<p class="footer-desc" data-i18n="ft_tagline">"Una solución completa en el mismo lugar."</p>'
    $content = $content -replace '© 2025 Haften. Todos los derechos reservados.', '<span data-i18n="ft_copy">© 2025 Haften. Todos los derechos reservados.</span>'

    $content = $content -replace '<li><a href="index.html">Inicio</a></li>', '<li><a href="index.html" data-i18n="nav_home">Inicio</a></li>'
    $content = $content -replace '<li><a href="index.html"><i class="fa-solid fa-house"></i>Inicio</a></li>', '<li><a href="index.html"><i class="fa-solid fa-house"></i><span data-i18n="nav_home">Inicio</span></a></li>'
    $content = $content -replace '<li><a href="nosotros.html">Nosotros</a></li>', '<li><a href="nosotros.html" data-i18n="nav_about">Nosotros</a></li>'
    $content = $content -replace '<li><a href="nosotros.html"><i class="fa-solid fa-building"></i>Nosotros</a></li>', '<li><a href="nosotros.html"><i class="fa-solid fa-building"></i><span data-i18n="nav_about">Nosotros</span></a></li>'
    $content = $content -replace '<li><a href="marcas.html">Marcas</a></li>', '<li><a href="marcas.html" data-i18n="nav_brands">Marcas</a></li>'
    $content = $content -replace '<li><a href="marcas.html"><i class="fa-solid fa-tag"></i>Marcas</a></li>', '<li><a href="marcas.html"><i class="fa-solid fa-tag"></i><span data-i18n="nav_brands">Marcas</span></a></li>'
    $content = $content -replace '<li><a href="catalogos.html">Catálogos</a></li>', '<li><a href="catalogos.html" data-i18n="nav_catalogs">Catálogos</a></li>'
    $content = $content -replace '<li><a href="catalogos.html"><i class="fa-solid fa-file-pdf"></i>Catálogos</a></li>', '<li><a href="catalogos.html"><i class="fa-solid fa-file-pdf"></i><span data-i18n="nav_catalogs">Catálogos</span></a></li>'
    $content = $content -replace '<li><a href="multimedia.html">Multimedia</a></li>', '<li><a href="multimedia.html" data-i18n="nav_media">Multimedia</a></li>'
    $content = $content -replace '<li><a href="multimedia.html"><i class="fa-solid fa-play-circle"></i>Multimedia</a></li>', '<li><a href="multimedia.html"><i class="fa-solid fa-play-circle"></i><span data-i18n="nav_media">Multimedia</span></a></li>'
    $content = $content -replace '<li><a href="redes.html">Redes Sociales</a></li>', '<li><a href="redes.html" data-i18n="nav_social">Redes Sociales</a></li>'
    $content = $content -replace '<li><a href="redes.html"><i class="fa-solid fa-share-nodes"></i>Redes Sociales</a></li>', '<li><a href="redes.html"><i class="fa-solid fa-share-nodes"></i><span data-i18n="nav_social">Redes Sociales</span></a></li>'
    $content = $content -replace '<li><a href="contacto.html">Contacto</a></li>', '<li><a href="contacto.html" data-i18n="nav_contact">Contacto</a></li>'
    $content = $content -replace '<li><a href="contacto.html"><i class="fa-solid fa-envelope"></i>Contacto</a></li>', '<li><a href="contacto.html"><i class="fa-solid fa-envelope"></i><span data-i18n="nav_contact">Contacto</span></a></li>'

    # Global
    $content = $content -replace '<p class="panel-label">Color de acento</p>', '<p class="panel-label" data-i18n="thm_lbl">Color de acento</p>'
    $content = $content -replace 'btn-marcas">Ver catálogo</a>', 'btn-marcas" data-i18n="btn_view">Ver catálogo</a>'
    
    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Patched language config in $file"
}
