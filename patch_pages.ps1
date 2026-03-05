$pages = @('marcas.html','catalogos.html','multimedia.html','redes.html','contacto.html')
$dir   = 'C:\Users\Diseño Partum Design\.gemini\antigravity\scratch\haften-redesign'

$faLinks = @"
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" />
"@

$loader = @"
  <div id="page-loader">
    <div class="loader-logo">Haf<span>ten</span></div>
    <div class="loader-bar-wrap"><div class="loader-bar"></div></div>
    <p class="loader-text">HVAC/R +· BMS +· Instrumentacion</p>
  </div>
  <div id="cursor-dot"></div>
  <div id="cursor-ring"></div>
"@

$switcher = @"
  <div id="accent-switcher">
    <button id="accent-btn" aria-label="Cambiar color"><i class="fa-solid fa-palette"></i></button>
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

foreach ($page in $pages) {
    $path = Join-Path $dir $page
    if (-Not (Test-Path $path)) { Write-Host "SKIP (not found): $page"; continue }
    $c = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

    # 1. data-accent on html tag
    $c = $c -replace '<html lang="es">', '<html lang="es" data-accent="red">'

    # 2. FA + Fonts before haften.css link
    if ($c -notmatch 'font-awesome') {
        $c = $c -replace '(\s*<link rel="stylesheet" href="haften\.css")', "$faLinks`$1"
    }

    # 3. Loader after <body>
    if ($c -notmatch 'page-loader') {
        $c = $c -replace '(<body>)', "`$1`n$loader"
    }

    # 4. Switcher before </body>
    if ($c -notmatch 'accent-switcher') {
        $c = $c -replace '(</body>)', "$switcher`n`$1"
    }

    # 5. CSS variable fixes
    $c = $c -replace 'var\(--brand\)', 'var(--ac)'
    $c = $c -replace 'var\(--brand-dark\)', 'var(--ac-dark)'
    $c = $c -replace 'var\(--brand-light\)', 'var(--ac-light)'
    $c = $c -replace 'btn-brand', 'btn-ac'
    $c = $c -replace 'section-label', 'eyebrow'

    [System.IO.File]::WriteAllText($path, $c, [System.Text.Encoding]::UTF8)
    Write-Host "Updated: $page"
}
Write-Host "Done!"
