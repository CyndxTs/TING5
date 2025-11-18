# Script para iniciar el servidor de desarrollo
# Ejecutar con: .\start-dev.ps1

# Cambiar al directorio del proyecto
Set-Location -Path "C:\Users\Cesar\Downloads\TING5"

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Host "Error: No se encontró package.json. Verifica la ruta del proyecto." -ForegroundColor Red
    exit 1
}

Write-Host "Iniciando servidor de desarrollo..." -ForegroundColor Green
Write-Host "El servidor estará disponible en: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""

# Ejecutar el servidor de desarrollo
npm run dev


