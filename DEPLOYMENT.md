# 🚀 Guide de déploiement sur Netlify

## Prérequis
- Un compte Netlify (gratuit)
- Un repository GitHub (optionnel mais recommandé)

## Méthode 1 : Déploiement via GitHub (Recommandé)

### 1. Créer un repository GitHub
```bash
git init
git add .
git commit -m "Initial commit: Tokyo Ghoul Card Generator"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/tokyo-ghoul-card-generator.git
git push -u origin main
```

### 2. Connecter à Netlify
1. Allez sur [netlify.com](https://netlify.com)
2. Cliquez sur "Add new site" > "Import an existing project"
3. Choisissez GitHub et sélectionnez votre repository
4. Les paramètres de build sont déjà configurés dans `netlify.toml`
5. Cliquez sur "Deploy site"

### 3. Configurer les variables d'environnement
Dans Netlify Dashboard :
1. Allez dans "Site settings" > "Environment variables"
2. Ajoutez :
   - `JWT_SECRET` : Générez une clé secrète forte (ex: utilisez un générateur de mots de passe)

## Méthode 2 : Déploiement direct (sans GitHub)

### Via Netlify CLI
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter à Netlify
netlify login

# Déployer
netlify deploy --prod
```

### Via Drag & Drop
1. Buildez le projet : `npm run build`
2. Allez sur [app.netlify.com/drop](https://app.netlify.com/drop)
3. Glissez-déposez le dossier `dist`

**⚠️ Note** : Cette méthode ne déploiera pas les Netlify Functions. Utilisez la méthode GitHub pour un déploiement complet.

## Configuration post-déploiement

### Variables d'environnement importantes
- `JWT_SECRET` : Clé secrète pour les tokens JWT (OBLIGATOIRE)

### Vérifications
1. ✅ Le site est accessible
2. ✅ L'inscription fonctionne
3. ✅ La connexion fonctionne
4. ✅ La génération de cartes fonctionne
5. ✅ La sauvegarde dans la collection fonctionne
6. ✅ L'export PNG fonctionne

## Fonctionnalités disponibles

### ✅ Implémenté
- Système d'authentification JWT
- Génération de cartes avec algorithme intelligent
- 8 compétences avec scores aléatoires
- Attribution automatique d'armes
- Système de grades CCG (D à SS+)
- Types d'inspecteur (Terrain/Bureau)
- QR codes et codes-barres
- Export PNG des cartes
- Collection personnelle
- Sauvegarde des cartes
- Design immersif Tokyo Ghoul

### 🔮 Fonctionnalités futures (à implémenter)
- Classement communautaire
- Système de votes
- Galerie publique
- Missions et scénarios
- Partage sur réseaux sociaux
- Personnalisation avancée des cartes
- Système de badges et achievements

## Commandes utiles

```bash
# Développement local
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview

# Développement avec Netlify Functions
npm run netlify:dev
```

## Support et dépannage

### Problème : Les Netlify Functions ne fonctionnent pas
- Vérifiez que `JWT_SECRET` est défini dans les variables d'environnement
- Vérifiez les logs dans Netlify Dashboard > Functions

### Problème : Erreur 404 sur les routes
- Le fichier `netlify.toml` contient déjà la redirection nécessaire
- Vérifiez qu'il est bien présent à la racine du projet

### Problème : L'authentification ne fonctionne pas
- Vérifiez que `JWT_SECRET` est bien configuré
- Vérifiez les logs des Functions dans Netlify

## Structure du projet

```
tokyo-ghoul-card-generator/
├── src/
│   ├── components/      # Composants React
│   ├── pages/          # Pages de l'application
│   ├── context/        # Context API (Auth)
│   ├── utils/          # Utilitaires (génération de cartes)
│   ├── App.jsx         # Composant principal
│   ├── main.jsx        # Point d'entrée
│   └── index.css       # Styles globaux
├── netlify/
│   └── functions/      # Netlify Functions (backend)
│       ├── auth.js     # Authentification
│       └── cards.js    # Gestion des cartes
├── data/               # Stockage JSON (créé automatiquement)
├── public/             # Assets statiques
├── index.html          # HTML principal
├── package.json        # Dépendances
├── netlify.toml        # Configuration Netlify
├── vite.config.js      # Configuration Vite
└── tailwind.config.js  # Configuration TailwindCSS
```

## Technologies utilisées

- **Frontend** : React 18, Vite, TailwindCSS
- **Backend** : Netlify Functions (Node.js)
- **Auth** : JWT, bcryptjs
- **Génération** : Algorithmes personnalisés
- **Export** : html2canvas
- **QR/Barcode** : qrcode, jsbarcode
- **Routing** : React Router
- **Icons** : Lucide React

## Licence

MIT
