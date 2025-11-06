# 🚀 Guide de Déploiement Netlify

## 📋 Prérequis

- Compte GitHub
- Compte Netlify (gratuit)
- Code source sur GitHub
- Variables d'environnement configurées

---

## 🔧 Étape 1 : Préparer le Projet

### 1.1 Vérifier le fichier `.gitignore`

Assurez-vous que ces fichiers sont ignorés :
```
node_modules/
dist/
.env
.env.local
```

### 1.2 Vérifier `netlify.toml`

Le fichier est déjà configuré avec :
```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 1.3 Créer un fichier `.env.example`

Créez un fichier `.env.example` avec les variables nécessaires (sans valeurs sensibles) :
```env
VITE_API_URL=
JWT_SECRET=
MONGODB_URI=
```

---

## 📤 Étape 2 : Pousser sur GitHub

### 2.1 Initialiser Git (si pas déjà fait)

```bash
git init
git add .
git commit -m "Initial commit - Tokyo Ghoul Card Generator v3.0"
```

### 2.2 Créer un repository sur GitHub

1. Allez sur https://github.com/new
2. Nom du repository : `tokyo-ghoul-card-generator`
3. Description : "Générateur de cartes Tokyo Ghoul avec système RPG et PvP"
4. Public ou Private (votre choix)
5. Ne pas initialiser avec README (déjà existant)

### 2.3 Lier et pousser

```bash
git remote add origin https://github.com/VOTRE_USERNAME/tokyo-ghoul-card-generator.git
git branch -M main
git push -u origin main
```

---

## 🌐 Étape 3 : Déployer sur Netlify

### Méthode 1 : Via l'Interface Web (Recommandée)

#### 3.1 Se connecter à Netlify
1. Allez sur https://app.netlify.com
2. Connectez-vous avec votre compte GitHub

#### 3.2 Importer le projet
1. Cliquez sur **"Add new site"** → **"Import an existing project"**
2. Choisissez **"Deploy with GitHub"**
3. Autorisez Netlify à accéder à vos repositories
4. Sélectionnez `tokyo-ghoul-card-generator`

#### 3.3 Configuration du build
Netlify détectera automatiquement les paramètres depuis `netlify.toml` :
- **Build command** : `npm run build`
- **Publish directory** : `dist`
- **Functions directory** : `netlify/functions`

#### 3.4 Variables d'environnement
1. Avant de déployer, cliquez sur **"Show advanced"**
2. Cliquez sur **"New variable"**
3. Ajoutez vos variables :

```
VITE_API_URL = https://VOTRE_SITE.netlify.app/.netlify/functions
JWT_SECRET = votre_secret_jwt_tres_securise
MONGODB_URI = mongodb+srv://user:password@cluster.mongodb.net/tokyoghoul
```

⚠️ **Important** : 
- `VITE_API_URL` doit pointer vers vos Netlify Functions
- Utilisez un `JWT_SECRET` fort et unique
- Configurez MongoDB Atlas pour la base de données

#### 3.5 Déployer
1. Cliquez sur **"Deploy site"**
2. Attendez la fin du build (2-5 minutes)
3. Votre site sera disponible sur `https://random-name.netlify.app`

#### 3.6 Personnaliser le domaine
1. Allez dans **Site settings** → **Domain management**
2. Cliquez sur **"Options"** → **"Edit site name"**
3. Changez pour : `tokyo-ghoul-cards` (ou votre choix)
4. URL finale : `https://tokyo-ghoul-cards.netlify.app`

---

### Méthode 2 : Via Netlify CLI

#### 3.1 Installer Netlify CLI
```bash
npm install -g netlify-cli
```

#### 3.2 Se connecter
```bash
netlify login
```

#### 3.3 Initialiser le site
```bash
netlify init
```

Suivez les instructions :
- **Create & configure a new site** → Yes
- **Team** : Votre équipe
- **Site name** : tokyo-ghoul-cards
- **Build command** : npm run build
- **Directory to deploy** : dist
- **Netlify functions folder** : netlify/functions

#### 3.4 Configurer les variables d'environnement
```bash
netlify env:set VITE_API_URL "https://tokyo-ghoul-cards.netlify.app/.netlify/functions"
netlify env:set JWT_SECRET "votre_secret_jwt"
netlify env:set MONGODB_URI "mongodb+srv://..."
```

#### 3.5 Déployer
```bash
# Build local
npm run build

# Déploiement de test
netlify deploy

# Déploiement en production
netlify deploy --prod
```

---

## 🗄️ Étape 4 : Configurer MongoDB Atlas

### 4.1 Créer un compte MongoDB Atlas
1. Allez sur https://www.mongodb.com/cloud/atlas
2. Créez un compte gratuit (M0 Sandbox)

### 4.2 Créer un cluster
1. Choisissez **"Build a Database"**
2. Sélectionnez **"M0 FREE"**
3. Région : Choisissez la plus proche (ex: Europe)
4. Nom du cluster : `TokyoGhoulCluster`

### 4.3 Créer un utilisateur
1. **Database Access** → **Add New Database User**
2. Username : `tokyoghoul_admin`
3. Password : Générez un mot de passe fort
4. **Built-in Role** : Read and write to any database

### 4.4 Autoriser l'accès réseau
1. **Network Access** → **Add IP Address**
2. Cliquez sur **"Allow Access from Anywhere"** (0.0.0.0/0)
3. Confirmez

### 4.5 Obtenir la connection string
1. **Database** → **Connect** → **Connect your application**
2. Copiez la connection string :
```
mongodb+srv://tokyoghoul_admin:<password>@tokyoghoulcluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
3. Remplacez `<password>` par votre mot de passe
4. Ajoutez le nom de la base : `/tokyoghoul` avant le `?`

Résultat final :
```
mongodb+srv://tokyoghoul_admin:VOTRE_PASSWORD@tokyoghoulcluster.xxxxx.mongodb.net/tokyoghoul?retryWrites=true&w=majority
```

### 4.6 Mettre à jour Netlify
1. Retournez sur Netlify
2. **Site settings** → **Environment variables**
3. Modifiez `MONGODB_URI` avec votre connection string

---

## 🔐 Étape 5 : Sécurité

### 5.1 Variables d'environnement sensibles
✅ **À FAIRE** :
- Utiliser des secrets forts pour `JWT_SECRET`
- Ne jamais commiter `.env`
- Utiliser des variables d'environnement Netlify

❌ **À NE PAS FAIRE** :
- Hardcoder des secrets dans le code
- Commiter `.env` sur GitHub
- Utiliser des mots de passe faibles

### 5.2 CORS et Sécurité API
Les Netlify Functions sont automatiquement sécurisées, mais ajoutez des headers CORS si nécessaire.

### 5.3 Rate Limiting
Considérez ajouter un rate limiting pour les API endpoints critiques.

---

## 🔄 Étape 6 : Déploiement Continu

### 6.1 Configuration automatique
Netlify est maintenant configuré pour :
- ✅ Déployer automatiquement à chaque push sur `main`
- ✅ Créer des preview deployments pour les Pull Requests
- ✅ Rollback facile en cas de problème

### 6.2 Workflow de développement
```bash
# Développement local
git checkout -b feature/nouvelle-fonctionnalite
# ... faire vos modifications ...
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push origin feature/nouvelle-fonctionnalite

# Créer une Pull Request sur GitHub
# Netlify créera automatiquement un deploy preview

# Après merge sur main
# Netlify déploiera automatiquement en production
```

---

## 📊 Étape 7 : Monitoring et Analytics

### 7.1 Netlify Analytics (Optionnel - Payant)
1. **Site settings** → **Analytics**
2. Activez Netlify Analytics (9$/mois)
3. Obtenez des stats détaillées

### 7.2 Google Analytics (Gratuit)
1. Créez un compte Google Analytics
2. Obtenez votre ID de tracking
3. Ajoutez-le dans votre code React

### 7.3 Logs et Erreurs
1. **Deploys** → Cliquez sur un deploy
2. **Deploy log** : Voir les logs de build
3. **Function logs** : Voir les logs des fonctions

---

## 🐛 Dépannage

### Erreur : "Build failed"
**Solution** :
1. Vérifiez les logs de build
2. Testez `npm run build` localement
3. Vérifiez que toutes les dépendances sont dans `package.json`

### Erreur : "Function not found"
**Solution** :
1. Vérifiez que le dossier `netlify/functions` existe
2. Vérifiez la configuration dans `netlify.toml`
3. Redéployez

### Erreur : "Environment variable not found"
**Solution** :
1. Vérifiez que les variables sont définies dans Netlify
2. Les variables `VITE_*` doivent être préfixées ainsi
3. Redéployez après avoir ajouté des variables

### Erreur : "MongoDB connection failed"
**Solution** :
1. Vérifiez la connection string
2. Vérifiez que l'IP 0.0.0.0/0 est autorisée
3. Vérifiez le username/password

---

## ✅ Checklist de Déploiement

Avant de déployer, vérifiez :

- [ ] Code poussé sur GitHub
- [ ] `.env` dans `.gitignore`
- [ ] `netlify.toml` configuré
- [ ] MongoDB Atlas configuré
- [ ] Variables d'environnement définies sur Netlify
- [ ] Build local réussi (`npm run build`)
- [ ] Tests passés
- [ ] Documentation à jour

---

## 🚀 Commandes Utiles

```bash
# Déploiement
netlify deploy --prod

# Voir les logs
netlify logs

# Ouvrir le site
netlify open:site

# Ouvrir l'admin Netlify
netlify open:admin

# Lister les variables d'environnement
netlify env:list

# Rollback vers un déploiement précédent
# Via l'interface web : Deploys → Cliquez sur un ancien deploy → Publish deploy
```

---

## 📱 Étape 8 : Optimisations Post-Déploiement

### 8.1 Performance
1. **Asset Optimization** : Activé par défaut sur Netlify
2. **Lazy Loading** : Déjà implémenté dans React
3. **Code Splitting** : Vite le fait automatiquement

### 8.2 SEO
1. Ajoutez un `robots.txt`
2. Ajoutez un `sitemap.xml`
3. Configurez les meta tags Open Graph

### 8.3 PWA (Optionnel)
1. Ajoutez un Service Worker
2. Créez un `manifest.json`
3. Activez le mode offline

---

## 🎉 Félicitations !

Votre application Tokyo Ghoul Card Generator est maintenant en ligne ! 🚀

**URL de production** : `https://tokyo-ghoul-cards.netlify.app`

### Prochaines étapes :
1. Testez toutes les fonctionnalités en production
2. Partagez le lien avec vos utilisateurs
3. Surveillez les logs et les erreurs
4. Continuez à développer et déployer !

---

## 📞 Support

- **Documentation Netlify** : https://docs.netlify.com
- **MongoDB Atlas Docs** : https://docs.atlas.mongodb.com
- **Support Netlify** : https://answers.netlify.com

---

**Projet** : Tokyo Ghoul Card Generator  
**Version** : 3.0.0  
**Plateforme** : Netlify + MongoDB Atlas  
**Statut** : ✅ Prêt pour le déploiement
