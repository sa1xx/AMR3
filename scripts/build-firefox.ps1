param([switch]$Development)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$toolsRoot = Join-Path $projectRoot '.build-tools'
$nodeVersion = 'v20.20.2'
$nodeFolder = Join-Path $toolsRoot "node-$nodeVersion-win-x64"
$nodeExe = Join-Path $nodeFolder 'node.exe'
$yarnScript = Join-Path $toolsRoot 'yarn/package/bin/yarn.js'

if (-not [Environment]::Is64BitOperatingSystem) { throw 'This build script requires 64-bit Windows.' }
New-Item -ItemType Directory -Force -Path $toolsRoot | Out-Null

if (-not (Test-Path -LiteralPath $nodeExe)) {
    $archiveName = "node-$nodeVersion-win-x64.zip"
    $archive = Join-Path $toolsRoot $archiveName
    Write-Host "Downloading portable Node.js $nodeVersion..."
    Invoke-WebRequest -UseBasicParsing -Uri "https://nodejs.org/dist/$nodeVersion/$archiveName" -OutFile $archive
    $checksums = (Invoke-WebRequest -UseBasicParsing -Uri "https://nodejs.org/dist/$nodeVersion/SHASUMS256.txt").Content
    $expected = [regex]::Match($checksums, "(?m)^([a-f0-9]{64})\s+$([regex]::Escape($archiveName))\r?$").Groups[1].Value
    if (-not $expected -or (Get-FileHash -LiteralPath $archive -Algorithm SHA256).Hash.ToLowerInvariant() -ne $expected) {
        throw 'Node.js download checksum mismatch.'
    }
    Expand-Archive -LiteralPath $archive -DestinationPath $toolsRoot -Force
}

if (-not (Test-Path -LiteralPath $yarnScript)) {
    $archive = Join-Path $toolsRoot 'yarn-1.22.22.tgz'
    $yarnFolder = Join-Path $toolsRoot 'yarn'
    Write-Host 'Downloading Yarn 1.22.22...'
    Invoke-WebRequest -UseBasicParsing -Uri 'https://registry.npmjs.org/yarn/-/yarn-1.22.22.tgz' -OutFile $archive
    $hash = [Convert]::ToBase64String([Security.Cryptography.SHA512]::Create().ComputeHash([IO.File]::ReadAllBytes($archive)))
    if ($hash -ne 'prL3kGtyG7o9Z9Sv8IPfBNrWTDmXB4Qbes8A9rEzt6wkJV8mUvoirjU0Mp3GGAU06Y0XQyA3/2/RQFVuK7MTfg==') {
        throw 'Yarn download checksum mismatch.'
    }
    New-Item -ItemType Directory -Force -Path $yarnFolder | Out-Null
    & tar.exe -xzf $archive -C $yarnFolder
    if ($LASTEXITCODE -ne 0) { throw 'Could not unpack Yarn.' }
}

$previousPath = $env:PATH
$previousHusky = $env:HUSKY
$previousBrowser = $env:AMR_BROWSER
Push-Location $projectRoot
try {
    $env:PATH = "$nodeFolder;$previousPath"
    $env:HUSKY = '0'
    $env:AMR_BROWSER = $null
    $modulesFolder = Join-Path $projectRoot 'node_modules'
    if (Test-Path -LiteralPath (Join-Path $modulesFolder '.pnpm')) {
        $backup = Join-Path $toolsRoot ("previous-node_modules-" + [guid]::NewGuid().ToString('N'))
        if ([IO.Path]::GetFullPath($modulesFolder) -ne [IO.Path]::Combine($projectRoot, 'node_modules') -or
            -not [IO.Path]::GetFullPath($backup).StartsWith($toolsRoot + [IO.Path]::DirectorySeparatorChar)) {
            throw 'Unexpected dependency directory.'
        }
        Write-Host 'Moving the existing pnpm dependencies aside for a clean Yarn installation...'
        Move-Item -LiteralPath $modulesFolder -Destination $backup
    }
    & $nodeExe $yarnScript install --frozen-lockfile --non-interactive --cache-folder (Join-Path $toolsRoot 'yarn-cache')
    if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed.' }
    & $nodeExe $yarnScript test:mirror-migration
    if ($LASTEXITCODE -ne 0) { throw 'Migration tests failed.' }
    $buildCommand = if ($Development) { 'build:dev' } else { 'build' }
    & $nodeExe $yarnScript $buildCommand
    if ($LASTEXITCODE -ne 0) { throw 'Build failed.' }
    & $nodeExe scripts/update-manifest.js -firefox
    if ($LASTEXITCODE -ne 0) { throw 'Firefox manifest preparation failed.' }
    $packagingStarted = (Get-Date).ToUniversalTime()
    & $nodeExe scripts/build-zip.js -xpi
    if ($LASTEXITCODE -ne 0) { throw 'XPI packaging failed.' }
    $version = (Get-Content -LiteralPath package.json -Raw | ConvertFrom-Json).version
    $xpi = Join-Path $projectRoot "dist-zip/all-mangas-reader-$version.xpi"
    if (-not (Test-Path -LiteralPath $xpi) -or (Get-Item -LiteralPath $xpi).LastWriteTimeUtc -lt $packagingStarted.AddSeconds(-1)) {
        throw 'No new Firefox XPI was produced.'
    }
    Write-Host "Firefox add-on: $xpi"
} finally {
    $env:PATH = $previousPath
    $env:HUSKY = $previousHusky
    $env:AMR_BROWSER = $previousBrowser
    Pop-Location
}
