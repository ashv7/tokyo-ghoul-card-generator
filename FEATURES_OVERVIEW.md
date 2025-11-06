# 🎮 Tokyo Ghoul Card Generator - Vue d'ensemble complète

## 📊 Statistiques du Projet

- **Version** : 2.0.0
- **Factions** : 4 (CCG, Goule, Anteiku, Aogiri Tree)
- **Thèmes de cartes** : 4
- **Niveaux de progression** : 50
- **Quinques/Kagune légendaires** : 20+
- **Options de personnalisation** : 30+
- **Missions** : 13 (4 quotidiennes, 3 hebdomadaires, 9 achievements)
- **Badges** : 9
- **Pages** : 7

---

## 🎯 CORE FEATURES (Base)

### 🎴 Génération de Cartes
- **Input** : Nom, date de naissance, photo (optionnel)
- **Output** : Carte personnalisée avec stats, rang, arme, description
- **Algorithme** : Génération aléatoire intelligente basée sur les compétences
- **Rareté** : D, C, B, A, S, SS, SS+ (7 niveaux)
- **QR Code** : Unique pour chaque carte
- **Code-barres** : Identification visuelle

### 🛡️ Système CCG (Original)
- **Grades** : Rang 3 → Classe Spéciale S1 (7 grades)
- **Types** : Terrain (combat) / Bureau (analyse)
- **Compétences** : 8 compétences variées
- **Quinques** : 5 armes différentes
- **Divisions** : 5 divisions de Tokyo

### 🔐 Authentification
- **Inscription** / Connexion
- **JWT** : Tokens sécurisés
- **Sessions** : Persistantes
- **Protection** : Routes protégées

### 💾 Collection
- **Sauvegarde** : Cartes illimitées
- **Organisation** : Par date, rareté, faction
- **Visualisation** : Grille responsive
- **Détails** : Vue complète de chaque carte

---

## 🎨 PHASE 1 - Enrichissement

### 🌈 4 Systèmes de Factions

#### 🛡️ CCG (Commission of Counter Ghoul)
- Grades officiels (Rang 3 → Classe Spéciale S1)
- Quinques (armes anti-goules)
- Divisions de Tokyo
- Style : Officiel, professionnel

#### 🩸 Goule
- Types de Kagune (Ukaku, Koukaku, Rinkaku, Bikaku, Chimera, Kakuja)
- Rangs de menace (C → SS+)
- Territoires (Arrondissements)
- Capacités spéciales
- Style : Sombre, menaçant

#### ☕ Anteiku
- Rôles (Apprenti → Manager)
- Spécialisations (Barista, Collecteur, Protecteur, Médiateur)
- Zones d'opération
- Capacités pacifistes
- Style : Chaleureux, accueillant

#### 🌳 Aogiri Tree
- Rangs hiérarchiques (Recrue → Subordonné direct)
- Rôles de combat (Assaillant, Assassin, Tacticien, Berserker)
- Bases d'opération
- Techniques de combat
- Style : Agressif, mystérieux

### 🎭 Traits de Personnalité
- **12 traits** différents par faction
- **Attribution intelligente** basée sur les compétences
- **Descriptions** cohérentes avec le personnage

### 🎒 Équipement Secondaire
- **3 catégories** : Armure, Gadgets, Communication
- **Attribution adaptée** au type et à la rareté
- **Bonus** affichés sur la carte

### 📍 Territoires/Divisions
- **CCG** : 5 divisions de Tokyo
- **Goule** : 6 arrondissements
- **Anteiku** : 5 zones d'opération
- **Aogiri** : 5 bases

### 🆔 Formats d'Export
- **Carte complète** : Format vertical classique
- **Carte d'identité** : Format horizontal compact
- **PNG haute qualité** : Export avec html2canvas

### 📤 Système de Partage
- **Partage natif** : API Web Share (mobile)
- **Fallback** : Copie dans presse-papier (desktop)
- **Texte personnalisé** : Nom, grade, rareté

---

## ⭐ PHASE 2 - Progression RPG

### 📈 Système d'Expérience
- **50 niveaux** avec titres (Débutant → Divin)
- **XP** de 0 à 25,000+
- **10 sources d'XP** différentes
- **Barre de progression** visuelle
- **Bonus de niveau** :
  - Stats boost (+1 à +15)
  - Déblocages progressifs
  - Mode Dieu (niveau 50)

### 🎯 Missions

#### Quotidiennes (4)
- Premier pas (1 carte)
- Collectionneur du jour (3 cartes)
- Archiviste (2 sauvegardes)
- Ambassadeur (1 partage)
- **Reset** : 24h
- **Récompenses** : 50-100 XP + 10-25 💰

#### Hebdomadaires (3)
- Producteur hebdomadaire (20 cartes)
- Chasseur de rares (5 cartes S+)
- Diplomate (1 de chaque faction)
- **Reset** : 7 jours
- **Récompenses** : 500-750 XP + 100-150 💰

#### Achievements (9)
- Première carte → Collectionneur légendaire
- Coup de chance (SS+)
- Maître des factions
- Paliers de niveau (10, 25, 50)
- **Permanents** : Une seule fois
- **Récompenses** : 100-2500 XP + 50-1000 💰 + Badges

### 🏆 Badges
- **9 badges** débloquables
- **Affichage** : Page profil
- **Raretés** : Common, Rare, Legendary, Mythic
- **Icônes** : Émojis uniques

### ⚔️ Quinques Légendaires

#### Mythiques (SS+) - 4
- **IXA** (Arima) : ATK 10, DEF 10, SPD 8
- **Narukami** (Arima) : ATK 10, DEF 6, SPD 10
- **Arata** (Armure) : ATK 6, DEF 10, SPD 5
- **13's Jason** (Juuzou) : ATK 10, DEF 7, SPD 9
- **Déblocage** : Niv. 20-30 + 3500-5000 💰

#### Légendaires (SS) - 4
- Yukimura 1/3, Doujima 1/2, Ginkui, Higher Mind
- **Déblocage** : Niv. 12-15 + 2000-2500 💰

#### Rares (S) - 3
- Scorpion 1/56, Tsunagi, T-Human
- **Déblocage** : Niv. 8-10 + 1000-1500 💰

### 🩸 Kagune Légendaires

#### Mythiques (SS+) - 3
- **Hibou Borgne** (Eto) : ATK 10, DEF 9, SPD 10
- **Centipède** (Kaneki) : ATK 10, DEF 8, SPD 9
- **Faucheur Noir** (Kaneki) : ATK 10, DEF 7, SPD 10
- **Déblocage** : Niv. 25-30 + 4000-5000 💰

#### Légendaires (SS) - 3
- Lapin Noir (Ayato), Jason (Yamori), Noro
- **Déblocage** : Niv. 12-15 + 2000-2500 💰

### 🎨 Personnalisation Avancée

#### Arrière-plans (7)
- Défaut (gratuit)
- Tokyo de Nuit, Lune de Sang
- Laboratoire CCG, Chaleur d'Anteiku, Ténèbres Aogiri
- Aura Légendaire (animé)
- **Prix** : 0-5000 💰

#### Polices (5)
- Défaut, Gothic, Cyberpunk, Japonais, Horreur
- **Prix** : 0-1000 💰

#### Bordures (5)
- Standard, Lueur, Double, Animée, Légendaire
- **Prix** : 0-3000 💰

#### Effets de Rareté (5)
- Standard, Étincelles, Holographique, Flammes, Divin
- **Prix** : 0-3500 💰

#### Cadres (6)
- Aucun, Bronze, Argent, Or, Platine, Diamant (animé)
- **Prix** : 0-3000 💰

### 💰 Système de Monnaie
- **Gains** : Missions, achievements, connexion
- **Dépenses** : Quinques, kagune, personnalisation
- **Affichage** : Toutes les pages
- **Économie** : Équilibrée pour progression

---

## 📱 PAGES DE L'APPLICATION

### 🏠 Accueil (`/`)
- Présentation du projet
- Appel à l'action
- Connexion/Inscription

### 🎴 Générateur (`/generator`)
- Formulaire de saisie
- Sélection de thème (4 choix)
- Sélection de format (2 choix)
- Prévisualisation en temps réel
- Actions : Générer, Régénérer, Partager, Exporter, Sauvegarder

### 📚 Collection (`/collection`)
- Grille de cartes
- Filtres par faction, rareté
- Tri par date, nom
- Vue détaillée
- Suppression

### 👤 Profil (`/profile`)
- Niveau et XP avec barre
- Titre actuel
- Statistiques :
  - Cartes générées
  - Cartes sauvegardées
  - Cartes partagées
  - Monnaie
- Badges débloqués
- Bonus actifs
- Missions rapides

### 🎯 Missions (`/missions`)
- 3 onglets : Quotidiennes, Hebdomadaires, Achievements
- Progression visuelle
- Récompenses détaillées
- Bouton "Réclamer"
- Compteurs de reset
- Statistiques de complétion

### 🛒 Boutique (`/shop`)
- 4 onglets : Quinques, Kagune, Arrière-plans, Cadres
- Filtres par rareté
- Prévisualisation
- Stats détaillées (armes)
- Système d'achat
- Indicateurs : Possédé / Verrouillé / Disponible
- Affichage niveau/monnaie

### 🔐 Login/Register
- Formulaires sécurisés
- Validation
- Messages d'erreur
- Redirection automatique

---

## 🎮 GAMEPLAY LOOP

### Boucle Principale
1. **Connexion** → +50 XP (quotidien)
2. **Génération de cartes** → +10 XP par carte
3. **Sauvegarde** → +25 XP par sauvegarde
4. **Missions** → Complétion automatique
5. **Réclamer récompenses** → XP + Monnaie
6. **Monter de niveau** → Déblocages
7. **Acheter items** → Personnalisation
8. **Répéter** → Progression continue

### Objectifs Court Terme
- Compléter missions quotidiennes
- Atteindre niveau 5
- Acheter première personnalisation
- Débloquer premier badge

### Objectifs Moyen Terme
- Collection de 50 cartes
- Niveau 15
- Premier quinque légendaire
- Toutes les factions représentées

### Objectifs Long Terme
- Niveau 50 (Divin)
- Tous les quinques mythiques
- Tous les achievements
- Collection complète (100+ cartes)
- Personnalisation maximale

---

## 🔧 ARCHITECTURE TECHNIQUE

### Frontend
- **React 18** : Composants modernes
- **Vite** : Build ultra-rapide
- **TailwindCSS** : Styling utility-first
- **React Router** : Navigation
- **Lucide React** : Icônes
- **html2canvas** : Export PNG
- **QRCode.js** : Génération QR
- **JsBarcode** : Génération code-barres

### Backend
- **Netlify Functions** : Serverless
- **Node.js** : Runtime
- **JWT** : Authentication
- **bcryptjs** : Hash passwords
- **Express** (dev) : Serveur local

### Base de Données (à implémenter)
- **MongoDB** / **PostgreSQL**
- Collections :
  - users
  - cards
  - missions
  - achievements
  - shop_items

### Fichiers Clés
```
src/
├── utils/
│   ├── cardGenerator.js          # Génération CCG
│   ├── cardGeneratorUnified.js   # Dispatch factions
│   ├── factionSystems.js         # Données factions
│   ├── factionGenerators.js      # Générateurs factions
│   ├── experienceSystem.js       # XP, missions, badges
│   └── legendarySystem.js        # Quinques, personnalisation
├── components/
│   ├── Card.jsx                  # Carte CCG
│   ├── CardGhoul.jsx            # Carte Goule
│   ├── CardAnteiku.jsx          # Carte Anteiku
│   ├── CardAogiri.jsx           # Carte Aogiri
│   ├── CardID.jsx               # Format ID
│   └── Navbar.jsx               # Navigation
├── pages/
│   ├── Home.jsx
│   ├── Generator.jsx
│   ├── Collection.jsx
│   ├── Profile.jsx
│   ├── Missions.jsx
│   ├── Shop.jsx
│   ├── Login.jsx
│   └── Register.jsx
└── context/
    └── AuthContext.jsx
```

---

## 📊 MÉTRIQUES DE PROGRESSION

### Temps de Jeu Estimé

#### Casual (1h/jour)
- **Niveau 10** : 2 semaines
- **Niveau 25** : 2 mois
- **Niveau 50** : 6 mois

#### Régulier (2-3h/jour)
- **Niveau 10** : 1 semaine
- **Niveau 25** : 1 mois
- **Niveau 50** : 3 mois

#### Hardcore (5h+/jour)
- **Niveau 10** : 3 jours
- **Niveau 25** : 2 semaines
- **Niveau 50** : 1 mois

### Monnaie Nécessaire
- **Personnalisation complète** : ~30,000 💰
- **Tous les quinques/kagune** : ~50,000 💰
- **Total** : ~80,000 💰
- **Temps estimé** : 2-4 mois (régulier)

---

## 🚀 ROADMAP FUTURE

### Phase 3 - Social & Compétitif
- PvP : Combats de cartes
- Guildes : Organisations
- Classements : Leaderboards
- Trading : Échange de cartes
- Événements : Temporaires

### Phase 4 - Contenu Avancé
- Story Mode : Campagne
- Boss Raids : Coopératif
- Crafting : Quinques custom
- Skins : Apparences alternatives
- Animations : Effets avancés

### Phase 5 - Mobile
- Application native
- Notifications push
- Géolocalisation
- AR : Réalité augmentée

---

## 📈 STATISTIQUES PROJET

- **Lignes de code** : ~10,000+
- **Composants React** : 15+
- **Fonctions utilitaires** : 50+
- **Systèmes de jeu** : 8
- **Temps de développement** : Phase 1-2 complètes
- **Fichiers de documentation** : 5

---

**Projet** : Tokyo Ghoul Card Generator  
**Version** : 2.0.0  
**Statut** : ✅ Phase 1 & 2 complètes  
**Prochaine étape** : Intégration backend + Phase 3
