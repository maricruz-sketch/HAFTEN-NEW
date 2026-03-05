$pages = @("index.html","nosotros.html","marcas.html","catalogos.html","multimedia.html","redes.html","contacto.html")
$dir = "C:\Users\Diseño Partum Design\.gemini\antigravity\scratch\haften-redesign"

$navSettings = @"
      <div class="nav-settings">
        <!-- Theme Toggle -->
        <button class="theme-toggle-btn magnetic-wrap" aria-label="Cambiar Tema">
          <i class="fa-solid fa-palette"></i>
        </button>
        <!-- Language Pill -->
        <div class="lang-pill magnetic-wrap" title="Cambiar Idioma">
          <div class="lang-highlight"></div>
          <span class="lang-opt opt-es">ES</span>
          <span class="lang-opt opt-en">EN</span>
        </div>
        <!-- Theme Panel -->
        <div id="accent-panel">
          <p class="panel-label">Color de acento</p>
          <div class="accent-options">
            <div class="ac-swatch active" data-accent="red"></div>
            <div class="ac-swatch" data-accent="blue"></div>
            <div class="ac-swatch" data-accent="emerald"></div>
            <div class="ac-swatch" data-accent="violet"></div>
            <div class="ac-swatch" data-accent="orange"></div>
            <div class="ac-swatch" data-accent="rose"></div>
          </div>
        </div>
      </div>
"@

$cookieConsent = @"
  <div class="cookie-consent" id="cookie-consent">
    <div class="cookie-text">
      <strong>Privacidad & Cookies</strong><br>
      Utilizamos cookies para mejorar la experiencia de navegación, ofrecer funciones sociales y analizar nuestro tráfico.
    </div>
    <button class="cookie-btn magnetic-wrap" id="cookie-accept">Aceptar cookies</button>
  </div>
"@

foreach ($p in $pages) {
    $path = Join-Path $dir $p
    if (-Not (Test-Path $path)) { continue }
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

    # 1. Add nav settings inside nav
    if ($content -notmatch 'nav-settings') {
        $content = $content -replace '(?s)</ul>\s*</div>\s*</nav>', "</ul>`n$navSettings`n    </div>`n  </nav>"
    }

    # 2. Add data-i18n to nav links
    $content = $content -replace '>Inicio<', ' data-i18n="nav_home">Inicio<'
    $content = $content -replace '>Nosotros<', ' data-i18n="nav_about">Nosotros<'
    $content = $content -replace '>Marcas<', ' data-i18n="nav_brands">Marcas<'
    $content = $content -replace '>Catálogos<', ' data-i18n="nav_catalogs">Catálogos<'
    $content = $content -replace '>Multimedia<', ' data-i18n="nav_media">Multimedia<'
    $content = $content -replace '>Redes Sociales<', ' data-i18n="nav_social">Redes Sociales<'
    $content = $content -replace 'Contacto <i class="fa-solid fa-arrow-right">', '<span data-i18n="nav_contact">Contacto</span> <i class="fa-solid fa-arrow-right">'

    # Specific index.html translation tags
    if ($p -eq "index.html") {
        $content = $content -replace 'Selección · Especificación', '<span data-i18n="hero_title1">Selección · Especificación</span>'
        $content = $content -replace 'Asesoría · Distribución', '<span data-i18n="hero_title2">Asesoría · Distribución</span>'
        $content = $content -replace 'Expertos en HVAC/R-BMS – Tu socio técnico de confianza', '<span data-i18n="hero_sub">Expertos en HVAC/R-BMS – Tu socio técnico de confianza</span>'
    }

    # 3. Add page-transition-wrap. Replace </nav> with </nav><main class="page-transition-wrap"> and </footer> with </footer></main>
    if ($content -notmatch 'page-transition-wrap') {
        $content = $content -replace '</nav>', "</nav>`n  <main class=`"page-transition-wrap`">"
        $content = $content -replace '</footer>', "</footer>`n  </main>"
    }

    # 4. Remove old accent switcher
    $content = $content -replace '(?s)<!-- COLOR SWITCHER -->.*?</div>\s*</div>\s*</div>', ""

    # 5. Add cookie consent before closing body text
    if ($content -notmatch 'cookie-consent') {
        $content = $content -replace '</body>', "$cookieConsent`n</body>"
    }

    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Patched $p"
}
