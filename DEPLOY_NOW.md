# 🚀 DÉPLOYER MAINTENANT - Guide Ultra-Rapide

## ⚡ 3 Étapes Simples

### 1️⃣ Vérifier (2 min)

```powershell
# Lancer le script de vérification
.\pre-deploy-check.ps1
```

✅ Si tout est vert, passez à l'étape 2  
❌ Si des erreurs, corrigez-les d'abord

---

### 2️⃣ GitHub (3 min)

#### A. Créer le repository sur GitHub
1. Allez sur https://github.com/new
2. Nom : `tokyo-ghoul-card-generator`
3. Public ou Private
4. **Ne cochez rien** (pas de README, .gitignore, etc.)
5. Cliquez "Create repository"

#### B. Pousser le code
```powershell
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Tokyo Ghoul Card Generator v3.0"

# Lier au repository GitHub (REMPLACEZ VOTRE_USERNAME)
git remote add origin https://github.com/VOTRE_USERNAME/tokyo-ghoul-card-generator.git

# Pousser
git branch -M main
git push -u origin main
```

---

### 3️⃣ Netlify (5 min)

#### A. Créer le site
1. Allez sur https://app.netlify.com
2. Cliquez **"Add new site"** → **"Import an existing project"**
3. Choisissez **"Deploy with GitHub"**
4. Sélectionnez `tokyo-ghoul-card-generator`

#### B. Configurer (IMPORTANT !)
Avant de déployer, cliquez **"Show advanced"** et ajoutez :

| Variable | Valeur |
|----------|--------|
| `VITE_API_URL` | `https://VOTRE_SITE.netlify.app/.netlify/functions` |
| `JWT_SECRET` | Voir ci-dessous ⬇️ |
| `MONGODB_URI` | Voir ci-dessous ⬇️ |

**Générer JWT_SECRET** :
```powershell
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Copiez le résultat dans `JWT_SECRET`

**MongoDB** : Voir étape 4 ci-dessous

#### C. Déployer
1. Cliquez **"Deploy site"**
2. Attendez 2-5 minutes
3. Votre site sera sur `https://random-name.netlify.app`

#### D. Personnaliser le nom (optionnel)
1. Site settings → Domain management
2. Options → Edit site name
3. Changez pour : `tokyo-ghoul-cards`
4. URL finale : `https://tokyo-ghoul-cards.netlify.app`

---

### 4️⃣ MongoDB Atlas (5 min)

#### A. Créer un compte
1. Allez sur https://www.mongodb.com/cloud/atlas
2. Inscrivez-vous (gratuit)

#### B. Créer un cluster
1. **"Build a Database"**
2. Choisissez **"M0 FREE"**
3. Région : **Europe** (ou proche de vous)
4. Nom : `TokyoGhoulCluster`
5. Cliquez **"Create"**

#### C. Créer un utilisateur
1. **Database Access** → **"Add New Database User"**
2. Username : `tokyoghoul_admin`
3. Password : Cliquez **"Autogenerate Secure Password"** et **COPIEZ-LE**
4. Database User Privileges : **"Read and write to any database"**
5. Cliquez **"Add User"**

#### D. Autoriser l'accès
1. **Network Access** → **"Add IP Address"**
2. Cliquez **"Allow Access from Anywhere"**
3. Confirmez (0.0.0.0/0)

#### E. Obtenir la connection string
1. **Database** → **"Connect"**
2. **"Connect your application"**
3. Copiez la connection string :
   ```
   mongodb+srv://tokyoghoul_admin:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   ```
4. Remplacez `<password>` par votre mot de passe copié
5. Ajoutez `/tokyoghoul` avant le `?` :
   ```
   mongodb+srv://tokyoghoul_admin:VOTRE_PASSWORD@cluster.mongodb.net/tokyoghoul?retryWrites=true&w=majority
   ```

#### F. Ajouter sur Netlify
1. Retournez sur Netlify
2. **Site settings** → **Environment variables**
3. Cliquez **"Add a variable"**
4. Key : `MONGODB_URI`
5. Value : Votre connection string complète
6. Cliquez **"Save"**

#### G. Redéployer
1. **Deploys** → **"Trigger deploy"** → **"Deploy site"**
2. Attendez 2 minutes

---

## ✅ C'est Fini !

Votre site est maintenant en ligne ! 🎉

### 🧪 Tester

1. Ouvrez `https://VOTRE_SITE.netlify.app`
2. Créez un compte
3. Générez une carte
4. Testez toutes les fonctionnalités

### 🐛 Problèmes ?

#### Build échoué
```powershell
# Testez localement
npm run build
```
Si ça marche localement, vérifiez les logs Netlify

#### "Function not found"
- Vérifiez que `netlify/functions` existe
- Redéployez

#### "Cannot connect to MongoDB"
- Vérifiez la connection string
- Vérifiez que 0.0.0.0/0 est autorisé
- Vérifiez le username/password

#### Variables d'environnement
- Elles doivent être préfixées `VITE_*` pour le frontend
- Redéployez après avoir ajouté des variables

---

## 📊 Récapitulatif

| Étape | Temps | Statut |
|-------|-------|--------|
| Vérification | 2 min | ⬜ |
| GitHub | 3 min | ⬜ |
| Netlify | 5 min | ⬜ |
| MongoDB | 5 min | ⬜ |
| **TOTAL** | **15 min** | |

---

## 🎯 Commandes Utiles

```powershell
# Vérifier avant déploiement
.\pre-deploy-check.ps1

# Déployer via CLI
.\deploy.ps1

# Build local
npm run build

# Test local complet
npm run dev:full

# Voir les logs Netlify
netlify logs

# Ouvrir le site
netlify open:site
```

---

## 📚 Documentation Complète

Pour plus de détails :
- **`QUICK_DEPLOY.md`** - Guide rapide complet
- **`DEPLOYMENT_NETLIFY.md`** - Guide détaillé avec explications
- **`DEPLOY_CHECKLIST.md`** - Checklist exhaustive

---

## 🎉 Félicitations !

Vous avez déployé avec succès le **Tokyo Ghoul Card Generator** ! 🚀

**URL de production** : `https://VOTRE_SITE.netlify.app`

### Prochaines étapes :
1. ✅ Testez toutes les fonctionnalités
2. 📱 Partagez avec vos amis
3. 🐛 Surveillez les logs
4. 🚀 Continuez à développer !

---

**Besoin d'aide ?**
- Documentation Netlify : https://docs.netlify.com
- MongoDB Docs : https://docs.atlas.mongodb.com
- Consultez les autres guides MD dans le projet

**Bon déploiement ! 🎴**
