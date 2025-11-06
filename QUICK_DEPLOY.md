# 🚀 Déploiement Rapide sur Netlify

## ⚡ En 5 Minutes

### 1️⃣ Préparer GitHub

```bash
# Initialiser Git (si pas déjà fait)
git init
git add .
git commit -m "Initial commit - Tokyo Ghoul Card Generator v3.0"

# Créer un repo sur GitHub et pousser
git remote add origin https://github.com/VOTRE_USERNAME/tokyo-ghoul-card-generator.git
git branch -M main
git push -u origin main
```

### 2️⃣ Déployer sur Netlify

#### Option A : Interface Web (Plus Simple)

1. **Allez sur** : https://app.netlify.com
2. **Cliquez sur** : "Add new site" → "Import an existing project"
3. **Choisissez** : "Deploy with GitHub"
4. **Sélectionnez** : Votre repository `tokyo-ghoul-card-generator`
5. **Configurez** :
   - Build command : `npm run build` (auto-détecté)
   - Publish directory : `dist` (auto-détecté)
6. **Ajoutez les variables d'environnement** (Show advanced) :
   ```
   VITE_API_URL = https://VOTRE_SITE.netlify.app/.netlify/functions
   JWT_SECRET = [Générez un secret fort]
   MONGODB_URI = [Votre connection string MongoDB]
   ```
7. **Cliquez sur** : "Deploy site"

#### Option B : CLI (Plus Rapide)

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Initialiser et déployer
netlify init

# Ou utiliser le script PowerShell
.\deploy.ps1
```

### 3️⃣ Configurer MongoDB Atlas

1. **Créez un compte** : https://www.mongodb.com/cloud/atlas
2. **Créez un cluster gratuit** (M0)
3. **Créez un utilisateur** :
   - Username : `tokyoghoul_admin`
   - Password : [Générez un mot de passe fort]
4. **Autorisez l'accès** : Network Access → Allow from Anywhere (0.0.0.0/0)
5. **Obtenez la connection string** :
   ```
   mongodb+srv://tokyoghoul_admin:PASSWORD@cluster.mongodb.net/tokyoghoul?retryWrites=true&w=majority
   ```
6. **Ajoutez-la sur Netlify** : Site settings → Environment variables → MONGODB_URI

### 4️⃣ Tester

1. Attendez la fin du déploiement (2-5 min)
2. Ouvrez votre site : `https://VOTRE_SITE.netlify.app`
3. Testez l'inscription et la connexion
4. Générez une carte
5. Testez les autres fonctionnalités

---

## 🔑 Variables d'Environnement Requises

### Sur Netlify (Site settings → Environment variables)

| Variable | Exemple | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `https://tokyo-ghoul-cards.netlify.app/.netlify/functions` | URL des Netlify Functions |
| `JWT_SECRET` | `[64 caractères aléatoires]` | Secret pour les tokens JWT |
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/tokyoghoul` | Connection string MongoDB |

### Générer un JWT_SECRET fort

```bash
# Dans le terminal
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## ✅ Checklist

Avant de déployer :

- [ ] Code poussé sur GitHub
- [ ] `.env` dans `.gitignore`
- [ ] MongoDB Atlas configuré
- [ ] Variables d'environnement définies sur Netlify
- [ ] Build local réussi : `npm run build`

Après le déploiement :

- [ ] Site accessible
- [ ] Inscription fonctionne
- [ ] Connexion fonctionne
- [ ] Génération de cartes fonctionne
- [ ] Sauvegarde fonctionne
- [ ] Toutes les pages sont accessibles

---

## 🐛 Problèmes Courants

### "Build failed"
```bash
# Testez le build localement
npm run build

# Si ça marche localement, vérifiez les logs Netlify
```

### "Function not found"
- Vérifiez que `netlify/functions` existe
- Vérifiez `netlify.toml`
- Redéployez

### "MongoDB connection failed"
- Vérifiez la connection string
- Vérifiez que 0.0.0.0/0 est autorisé
- Vérifiez username/password

### "Environment variable not found"
- Les variables `VITE_*` doivent être préfixées ainsi
- Redéployez après avoir ajouté des variables

---

## 🎉 C'est Fait !

Votre site est maintenant en ligne ! 🚀

**URL** : `https://VOTRE_SITE.netlify.app`

### Personnaliser le nom

1. Site settings → Domain management
2. Options → Edit site name
3. Changez pour : `tokyo-ghoul-cards`

---

## 📚 Documentation Complète

Pour plus de détails, consultez :
- `DEPLOYMENT_NETLIFY.md` - Guide complet
- `README.md` - Documentation du projet
- `START.md` - Guide de démarrage

---

**Besoin d'aide ?** Consultez la documentation Netlify : https://docs.netlify.com
