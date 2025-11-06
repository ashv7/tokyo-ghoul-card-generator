# Script de vérification pré-déploiement
# Tokyo Ghoul Card Generator

Write-Host ""
Write-Host "🔍 VÉRIFICATION PRÉ-DÉPLOIEMENT" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

$errors = 0
$warnings = 0

# Vérifier Node.js
Write-Host "📦 Vérification de Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "   ✅ Node.js installé: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "   ❌ Node.js n'est pas installé!" -ForegroundColor Red
    $errors++
}

# Vérifier npm
Write-Host "📦 Vérification de npm..." -ForegroundColor Yellow
if (Get-Command npm -ErrorAction SilentlyContinue) {
    $npmVersion = npm --version
    Write-Host "   ✅ npm installé: v$npmVersion" -ForegroundColor Green
} else {
    Write-Host "   ❌ npm n'est pas installé!" -ForegroundColor Red
    $errors++
}

# Vérifier Git
Write-Host "📦 Vérification de Git..." -ForegroundColor Yellow
if (Get-Command git -ErrorAction SilentlyContinue) {
    $gitVersion = git --version
    Write-Host "   ✅ Git installé: $gitVersion" -ForegroundColor Green
} else {
    Write-Host "   ❌ Git n'est pas installé!" -ForegroundColor Red
    $errors++
}

# Vérifier node_modules
Write-Host ""
Write-Host "📚 Vérification des dépendances..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   ✅ node_modules existe" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  node_modules manquant. Exécutez: npm install" -ForegroundColor Yellow
    $warnings++
}

# Vérifier package.json
Write-Host "📄 Vérification de package.json..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "   ✅ package.json existe" -ForegroundColor Green
    
    # Vérifier le script build
    $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
    if ($packageJson.scripts.build) {
        Write-Host "   ✅ Script 'build' configuré" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Script 'build' manquant!" -ForegroundColor Red
        $errors++
    }
} else {
    Write-Host "   ❌ package.json manquant!" -ForegroundColor Red
    $errors++
}

# Vérifier netlify.toml
Write-Host "📄 Vérification de netlify.toml..." -ForegroundColor Yellow
if (Test-Path "netlify.toml") {
    Write-Host "   ✅ netlify.toml existe" -ForegroundColor Green
} else {
    Write-Host "   ❌ netlify.toml manquant!" -ForegroundColor Red
    $errors++
}

# Vérifier .gitignore
Write-Host "📄 Vérification de .gitignore..." -ForegroundColor Yellow
if (Test-Path ".gitignore") {
    Write-Host "   ✅ .gitignore existe" -ForegroundColor Green
    
    $gitignoreContent = Get-Content ".gitignore" -Raw
    if ($gitignoreContent -match "\.env") {
        Write-Host "   ✅ .env est ignoré" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  .env n'est pas dans .gitignore!" -ForegroundColor Yellow
        $warnings++
    }
    
    if ($gitignoreContent -match "node_modules") {
        Write-Host "   ✅ node_modules est ignoré" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  node_modules n'est pas dans .gitignore!" -ForegroundColor Yellow
        $warnings++
    }
} else {
    Write-Host "   ❌ .gitignore manquant!" -ForegroundColor Red
    $errors++
}

# Vérifier .env.example
Write-Host "📄 Vérification de .env.example..." -ForegroundColor Yellow
if (Test-Path ".env.example") {
    Write-Host "   ✅ .env.example existe" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  .env.example manquant" -ForegroundColor Yellow
    $warnings++
}

# Vérifier si .env existe (ne doit pas être commité)
Write-Host "🔒 Vérification de la sécurité..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "   ✅ .env existe (local)" -ForegroundColor Green
    
    # Vérifier si .env est tracké par Git
    $gitStatus = git status --porcelain .env 2>$null
    if ($gitStatus) {
        Write-Host "   ⚠️  ATTENTION: .env est tracké par Git!" -ForegroundColor Red
        Write-Host "      Exécutez: git rm --cached .env" -ForegroundColor Yellow
        $warnings++
    } else {
        Write-Host "   ✅ .env n'est pas tracké par Git" -ForegroundColor Green
    }
} else {
    Write-Host "   ⚠️  .env manquant (créez-le depuis .env.example)" -ForegroundColor Yellow
    $warnings++
}

# Vérifier les dossiers nécessaires
Write-Host ""
Write-Host "📁 Vérification de la structure..." -ForegroundColor Yellow
$requiredDirs = @("src", "src/components", "src/pages", "src/utils", "public")
foreach ($dir in $requiredDirs) {
    if (Test-Path $dir) {
        Write-Host "   ✅ $dir existe" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $dir manquant!" -ForegroundColor Red
        $errors++
    }
}

# Vérifier les fichiers critiques
Write-Host "📄 Vérification des fichiers critiques..." -ForegroundColor Yellow
$requiredFiles = @(
    "src/App.jsx",
    "src/main.jsx",
    "index.html",
    "vite.config.js",
    "tailwind.config.js"
)
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file existe" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $file manquant!" -ForegroundColor Red
        $errors++
    }
}

# Test de build
Write-Host ""
Write-Host "🔨 Test de build..." -ForegroundColor Yellow
Write-Host "   (Cela peut prendre quelques secondes...)" -ForegroundColor Gray

$buildOutput = npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Build réussi!" -ForegroundColor Green
    
    # Vérifier que dist existe
    if (Test-Path "dist") {
        Write-Host "   ✅ Dossier dist créé" -ForegroundColor Green
        
        # Vérifier index.html dans dist
        if (Test-Path "dist/index.html") {
            Write-Host "   ✅ dist/index.html existe" -ForegroundColor Green
        } else {
            Write-Host "   ❌ dist/index.html manquant!" -ForegroundColor Red
            $errors++
        }
    } else {
        Write-Host "   ❌ Dossier dist non créé!" -ForegroundColor Red
        $errors++
    }
} else {
    Write-Host "   ❌ Build échoué!" -ForegroundColor Red
    Write-Host "   Erreur: $buildOutput" -ForegroundColor Red
    $errors++
}

# Vérifier Git
Write-Host ""
Write-Host "🔧 Vérification de Git..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "   ✅ Repository Git initialisé" -ForegroundColor Green
    
    # Vérifier s'il y a des commits
    $commitCount = git rev-list --count HEAD 2>$null
    if ($commitCount -gt 0) {
        Write-Host "   ✅ $commitCount commit(s) existant(s)" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Aucun commit. Exécutez: git commit -m 'Initial commit'" -ForegroundColor Yellow
        $warnings++
    }
    
    # Vérifier s'il y a un remote
    $remoteUrl = git remote get-url origin 2>$null
    if ($remoteUrl) {
        Write-Host "   ✅ Remote configuré: $remoteUrl" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Aucun remote configuré" -ForegroundColor Yellow
        Write-Host "      Ajoutez-en un: git remote add origin URL" -ForegroundColor Yellow
        $warnings++
    }
} else {
    Write-Host "   ⚠️  Repository Git non initialisé" -ForegroundColor Yellow
    Write-Host "      Exécutez: git init" -ForegroundColor Yellow
    $warnings++
}

# Résumé
Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "📊 RÉSUMÉ" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

if ($errors -eq 0 -and $warnings -eq 0) {
    Write-Host "✅ TOUT EST PRÊT POUR LE DÉPLOIEMENT!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Prochaines étapes:" -ForegroundColor Cyan
    Write-Host "   1. Poussez votre code sur GitHub" -ForegroundColor White
    Write-Host "   2. Déployez sur Netlify" -ForegroundColor White
    Write-Host "   3. Configurez les variables d'environnement" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 Consultez QUICK_DEPLOY.md pour les instructions" -ForegroundColor Yellow
} elseif ($errors -eq 0) {
    Write-Host "⚠️  PRÊT AVEC AVERTISSEMENTS" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   $warnings avertissement(s) détecté(s)" -ForegroundColor Yellow
    Write-Host "   Le déploiement devrait fonctionner, mais vérifiez les avertissements ci-dessus" -ForegroundColor Yellow
} else {
    Write-Host "❌ PAS PRÊT POUR LE DÉPLOIEMENT" -ForegroundColor Red
    Write-Host ""
    Write-Host "   $errors erreur(s) critique(s)" -ForegroundColor Red
    Write-Host "   $warnings avertissement(s)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Corrigez les erreurs ci-dessus avant de déployer" -ForegroundColor Red
}

Write-Host ""
