# 🧩 Tokyo Ghoul Card Generator

Générateur de cartes de personnages inspiré de l'univers Tokyo Ghoul.

## 🚀 Installation

```bash
npm install
```

## 🛠 Développement

**Méthode recommandée** (lance frontend + backend) :

```bash
npm run dev:full
```

Ou séparément :

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run dev
```

Ou avec Netlify Dev (pour tester les functions):

```bash
npm run netlify:dev
```

📖 Voir `START.md` pour le guide complet de démarrage

## 📦 Build

```bash
npm run build
```

## 🌐 Déploiement sur Netlify

### 🚀 Déploiement Rapide

```bash
# 1. Vérifier que tout est prêt
.\pre-deploy-check.ps1

# 2. Pousser sur GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 3. Déployer sur Netlify (via script)
.\deploy.ps1
```

### 📚 Guides de Déploiement

- **`QUICK_DEPLOY.md`** - Guide rapide (5 minutes)
- **`DEPLOYMENT_NETLIFY.md`** - Guide complet et détaillé
- **`DEPLOY_CHECKLIST.md`** - Checklist complète

### ⚙️ Configuration Requise

Variables d'environnement sur Netlify :
```env
VITE_API_URL=https://votre-site.netlify.app/.netlify/functions
JWT_SECRET=[Générez un secret fort]
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/tokyoghoul
```

📖 Voir les guides pour les instructions détaillées

## 🎯 Fonctionnalités

### Core
- ✅ Génération de cartes personnalisées
- ✅ Système de compétences et grades CCG
- ✅ Attribution d'armes intelligente
- ✅ QR codes et codes-barres
- ✅ Système de rareté (D à SS+)
- ✅ Comptes utilisateurs
- ✅ Collections de cartes
- ✅ Export PNG/JPEG
- ✅ Design immersif Tokyo Ghoul

### Phase 1 (Nouveau !)
- ✅ **4 thèmes de cartes** (CCG, Goule, Anteiku, Aogiri)
- ✅ **12 traits de personnalité** intelligents
- ✅ **Équipement secondaire** (armure, gadgets, communication)
- ✅ **5 divisions du CCG**
- ✅ **2 formats d'export** (carte complète ou carte d'identité)
- ✅ **Système de partage** (réseaux sociaux)
- ✅ **Descriptions enrichies**

📖 Voir `PHASE1_IMPROVEMENTS.md` pour les détails

### Phase 2 (Nouveau ! 🔥)
- ✅ **Système d'expérience** (50 niveaux avec bonus)
- ✅ **Missions quotidiennes/hebdomadaires**
- ✅ **Achievements** avec badges
- ✅ **Quinques légendaires** (IXA, Narukami, Arata...)
- ✅ **Kagune légendaires** (Hibou, Centipède, Faucheur Noir...)
- ✅ **Personnalisation avancée** (arrière-plans, polices, bordures, effets)
- ✅ **Système de monnaie** et boutique
- ✅ **Page Profil** avec stats et progression
- ✅ **Page Missions** avec suivi en temps réel
- ✅ **Page Boutique** avec items légendaires

📖 Voir `PHASE2_COMPLETE.md` pour tous les détails

### Phase 3 (Nouveau ! ⚔️)
- ✅ **Système de bataille PvP** (4 modes de jeu)
- ✅ **Combat stratégique** (Attaque, Défense, Spécial, Retraite)
- ✅ **Avantages de type** entre factions
- ✅ **IA de combat** intelligente
- ✅ **Classement communautaire** (8 tiers : Bronze → Challenger)
- ✅ **Statistiques de bataille** (V/D, taux, séries)
- ✅ **Récompenses compétitives** (XP, monnaie, points de classement)
- ✅ **Page Bataille** avec matchmaking
- ✅ **Page Classement** avec Top 100
- 🔄 **Guildes** (à venir)
- 🔄 **Événements** (à venir)
- 🔄 **Trading** (à venir)

📖 Voir `PHASE3_COMPLETE.md` pour tous les détails

## 🔧 Technologies

- React 18
- Vite
- TailwindCSS
- Netlify Functions
- JWT Authentication
- HTML2Canvas
- QRCode.js
- JsBarcode
