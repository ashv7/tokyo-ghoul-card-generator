# Script de déploiement rapide pour Netlify
# Tokyo Ghoul Card Generator

Write-Host "🎴 Tokyo Ghoul Card Generator - Déploiement Netlify" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Git est installé
Write-Host "🔍 Vérification de Git..." -ForegroundColor Yellow
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git n'est pas installé. Installez-le depuis https://git-scm.com" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Git est installé" -ForegroundColor Green
Write-Host ""

# Vérifier si le projet est un repo Git
Write-Host "🔍 Vérification du repository Git..." -ForegroundColor Yellow
if (!(Test-Path .git)) {
    Write-Host "📦 Initialisation du repository Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Repository Git initialisé" -ForegroundColor Green
} else {
    Write-Host "✅ Repository Git existant" -ForegroundColor Green
}
Write-Host ""

# Vérifier les fichiers sensibles
Write-Host "🔒 Vérification des fichiers sensibles..." -ForegroundColor Yellow
if (Test-Path .env) {
    $gitignoreContent = Get-Content .gitignore -Raw
    if ($gitignoreContent -notmatch "\.env") {
        Write-Host "⚠️  ATTENTION: .env n'est pas dans .gitignore!" -ForegroundColor Red
        Write-Host "Ajout de .env dans .gitignore..." -ForegroundColor Yellow
        Add-Content .gitignore "`n.env"
    }
}
Write-Host "✅ Fichiers sensibles protégés" -ForegroundColor Green
Write-Host ""

# Build du projet
Write-Host "🔨 Build du projet..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du build" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build réussi" -ForegroundColor Green
Write-Host ""

# Vérifier si Netlify CLI est installé
Write-Host "🔍 Vérification de Netlify CLI..." -ForegroundColor Yellow
if (!(Get-Command netlify -ErrorAction SilentlyContinue)) {
    Write-Host "📦 Installation de Netlify CLI..." -ForegroundColor Yellow
    npm install -g netlify-cli
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erreur lors de l'installation de Netlify CLI" -ForegroundColor Red
        exit 1
    }
}
Write-Host "✅ Netlify CLI est installé" -ForegroundColor Green
Write-Host ""

# Demander le type de déploiement
Write-Host "🚀 Type de déploiement:" -ForegroundColor Cyan
Write-Host "1. Déploiement de test (draft)" -ForegroundColor White
Write-Host "2. Déploiement en production" -ForegroundColor White
Write-Host "3. Initialiser un nouveau site Netlify" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Votre choix (1/2/3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🧪 Déploiement de test..." -ForegroundColor Yellow
        netlify deploy
    }
    "2" {
        Write-Host ""
        Write-Host "🚀 Déploiement en production..." -ForegroundColor Yellow
        netlify deploy --prod
    }
    "3" {
        Write-Host ""
        Write-Host "🆕 Initialisation d'un nouveau site..." -ForegroundColor Yellow
        netlify init
    }
    default {
        Write-Host "❌ Choix invalide" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "✅ Déploiement terminé!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Prochaines étapes:" -ForegroundColor Cyan
Write-Host "1. Configurez les variables d'environnement sur Netlify" -ForegroundColor White
Write-Host "2. Configurez MongoDB Atlas" -ForegroundColor White
Write-Host "3. Testez votre site en production" -ForegroundColor White
Write-Host ""
Write-Host "📖 Consultez DEPLOYMENT_NETLIFY.md pour plus de détails" -ForegroundColor Yellow
Write-Host ""
