# ✅ Phase 3 - Système Compétitif et Social

## 🎯 Vue d'ensemble

La Phase 3 transforme le générateur en une **plateforme compétitive** avec système de combat PvP, classement communautaire, et futures fonctionnalités sociales.

---

## ⚔️ 1. SYSTÈME DE BATAILLE DE CARTES

### Modes de Jeu

#### PvP Classé
- **Description** : Affrontez d'autres joueurs en combat classé
- **Récompenses** : 100 XP + 50 💰 (x2 si victoire)
- **Impact** : +25 points de classement (victoire) / -10 (défaite)
- **Matchmaking** : Basé sur le tier et les points

#### Match Amical
- **Description** : Combat sans impact sur le classement
- **Récompenses** : 50 XP + 25 💰 (x2 si victoire)
- **Impact** : Aucun sur le classement
- **Matchmaking** : Aléatoire ou invitation

#### Entraînement IA
- **Description** : Entraînez-vous contre l'IA
- **Récompenses** : 30 XP + 15 💰 (x2 si victoire)
- **Impact** : Aucun sur le classement
- **Difficulté** : Adaptative selon votre niveau

#### Tournoi (Hebdomadaire)
- **Description** : Participez aux tournois hebdomadaires
- **Récompenses** : 200 XP + 150 💰 + récompenses spéciales
- **Impact** : Points de classement doublés
- **Format** : Élimination simple, 16-32 joueurs

---

## 🎮 2. MÉCANIQUE DE COMBAT

### Statistiques de Combat

#### Points de Vie (HP)
- **Formule** : 100 + (totalScore × 2)
- **Exemple** : Carte avec 30 de totalScore = 160 HP
- **Affichage** : Barre de vie avec pourcentage

#### Attaque (ATK)
- **Base** : totalScore de la carte
- **Bonus arme** : stats.attack × 2 (si quinque/kagune légendaire)
- **Multiplicateur rareté** :
  - D: ×0.8
  - C: ×0.9
  - B: ×1.0
  - A: ×1.1
  - S: ×1.2
  - SS: ×1.4
  - SS+: ×1.6

#### Défense (DEF)
- **Base** : totalScore × 0.5
- **Bonus arme** : stats.defense × 2
- **Réduction** : Réduit les dégâts de 50%

#### Vitesse (SPD)
- **Base** : totalScore
- **Bonus arme** : stats.speed × 3
- **Effet** : Détermine qui attaque en premier

### Actions de Combat

#### Attaque
- **Dégâts** : ATK - (DEF × 0.5)
- **Coût** : Aucun
- **Cooldown** : Aucun
- **Description** : Attaque standard

#### Défense
- **Effet** : Réduit les dégâts du prochain tour de 75%
- **Coût** : Aucun
- **Cooldown** : Aucun
- **Description** : Position défensive

#### Capacité Spéciale
- **Dégâts** : ATK × 1.5 - (DEF × 0.25)
- **Coût** : Une seule utilisation par combat
- **Cooldown** : N/A
- **Description** : Capacité unique de l'arme légendaire
- **Exemples** :
  - IXA : "Forme Lance" - Ignore 75% de la défense
  - Narukami : "Éclair Divin" - Dégâts électriques
  - Centipède : "Régénération" - Soigne 30% HP

#### Retraite
- **Effet** : Abandonne le combat
- **Pénalité** : Défaite automatique
- **Usage** : Éviter une défaite coûteuse en points

### Avantages de Type (Faction)

| Attaquant ↓ / Défenseur → | CCG | Goule | Anteiku | Aogiri |
|---------------------------|-----|-------|---------|--------|
| **CCG** | 1.0 | **1.3** | 0.9 | **1.2** |
| **Goule** | 0.8 | 1.0 | 1.1 | 0.9 |
| **Anteiku** | 1.1 | 0.9 | 1.0 | 0.8 |
| **Aogiri** | 0.9 | **1.2** | **1.3** | 1.0 |

**Légende** :
- **Gras** : Avantage (×1.2-1.3)
- Normal : Neutre (×1.0)
- Italique : Désavantage (×0.8-0.9)

### Déroulement d'un Combat

1. **Sélection des cartes** : Chaque joueur choisit une carte
2. **Détermination de l'ordre** : Basé sur la vitesse
3. **Tours de combat** :
   - Joueur rapide choisit son action
   - Joueur lent choisit son action
   - Résolution dans l'ordre de vitesse
   - Calcul des dégâts
   - Mise à jour des HP
4. **Condition de victoire** :
   - HP adversaire à 0
   - Adversaire bat en retraite
   - Maximum 20 tours (victoire au plus de HP)

### IA de Combat

L'IA prend des décisions basées sur :
- **HP > 70%** : Attaque agressive
- **HP 30-70%** : Attaque ou spécial si disponible
- **HP < 30%** : Défense prioritaire
- **HP < 10%** : Possibilité de retraite (30%)

---

## 🏆 3. SYSTÈME DE CLASSEMENT

### Tiers de Classement

| Tier | Points | Couleur | Icône | Récompenses |
|------|--------|---------|-------|-------------|
| **Bronze** | 0-499 | #cd7f32 | 🥉 | - |
| **Argent** | 500-999 | #c0c0c0 | 🥈 | +5% XP |
| **Or** | 1000-1499 | #ffd700 | 🥇 | +10% XP, Badge |
| **Platine** | 1500-1999 | #e5e4e2 | 💎 | +15% XP, Cadre |
| **Diamant** | 2000-2999 | #b9f2ff | 💠 | +20% XP, Arrière-plan |
| **Maître** | 3000-4999 | #9370db | 👑 | +25% XP, Titre |
| **Grand Maître** | 5000-9999 | #ff1493 | ⭐ | +30% XP, Aura |
| **Challenger** | 10000+ | #ff0000 | ✨ | +50% XP, Tout débloqué |

### Gains/Pertes de Points

#### PvP Classé
- **Victoire** : +25 points (base)
- **Défaite** : -10 points
- **Bonus niveau** : +10% par niveau de différence
- **Série de victoires** :
  - 3 victoires : +5 points bonus
  - 5 victoires : +10 points bonus
  - 10 victoires : +25 points bonus

#### Tournoi
- **Victoire** : +50 points
- **Défaite** : -5 points
- **Champion** : +200 points + récompenses

### Classement Global

#### Top 100
- Affichage public
- Mise à jour en temps réel
- Filtres : Tout le temps / Mois / Semaine

#### Podium (Top 3)
- Affichage spécial avec médailles
- Récompenses exclusives mensuelles :
  - 🥇 1er : 5000 💰 + Badge unique + Titre
  - 🥈 2ème : 3000 💰 + Badge
  - 🥉 3ème : 2000 💰 + Badge

### Statistiques de Bataille

#### Générales
- **Combats totaux** : Nombre total de combats
- **Victoires** : Nombre de victoires
- **Défaites** : Nombre de défaites
- **Taux de victoire** : (Victoires / Total) × 100
- **Points de classement** : Score actuel

#### Séries
- **Série actuelle** : Victoires consécutives en cours
- **Meilleure série** : Record de victoires consécutives
- **Bonus de série** : Récompenses XP/Monnaie augmentées

#### Par Mode
- Stats séparées pour chaque mode
- Cartes les plus utilisées
- Adversaires les plus affrontés
- Taux de victoire par faction

---

## 📊 4. INTERFACE DE BATAILLE

### Page Bataille (`/battle`)

#### Sélection du Mode
- 4 cartes de mode avec descriptions
- Récompenses affichées
- Mode actif mis en évidence

#### Sélection de Carte
- Grille de toutes vos cartes
- Filtres par faction, rareté
- Stats affichées (Puissance, Rareté)
- Carte sélectionnée mise en évidence

#### Matchmaking
- Bouton "Trouver un adversaire"
- Animation de recherche
- Affichage de l'adversaire trouvé

#### Écran de Combat
- **Votre carte** (gauche, bordure bleue)
- **VS** (centre)
- **Carte adverse** (droite, bordure rouge)
- Stats comparées
- Bouton "Commencer le combat"

#### Résultat
- **Bannière** : Victoire (vert) / Défaite (rouge)
- **Stats du combat** :
  - HP restants (%)
  - Nombre de tours
- **Récompenses** :
  - XP gagnée
  - Monnaie gagnée
  - Points de classement
- **Log de combat** : Déroulement détaillé
- **Actions** :
  - Nouveau combat
  - Voir le classement

---

## 🏅 5. INTERFACE DE CLASSEMENT

### Page Classement (`/ranking`)

#### Votre Classement (Header)
- **Tier actuel** : Icône + nom + couleur
- **Progression** : Barre avec points actuels/requis
- **Rang global** : Position dans le classement
- **Stats rapides** : Victoires, Taux de victoire

#### Onglets

##### Classement Global
- **Filtres temporels** : Tout / Mois / Semaine
- **Top 3** : Affichage spécial avec médailles
- **Tableau** : Rang, Joueur, Tier, Points, V/D, Taux
- **Highlight** : Votre ligne en surbrillance
- **Pagination** : Top 100 joueurs

##### Mes Statistiques
- **Stats générales** :
  - Combats totaux
  - Victoires / Défaites
  - Taux de victoire
- **Séries** :
  - Série actuelle (avec flamme 🔥)
  - Meilleure série (avec étoile ⭐)
- **Graphiques** : Évolution des points (future)

##### Tiers
- **Liste de tous les tiers** avec :
  - Icône et couleur
  - Plage de points
  - Récompenses associées
- **Tier actuel** : Mis en évidence
- **Progression** : Vers le prochain tier

---

## 🎁 6. RÉCOMPENSES DE COMBAT

### Récompenses de Base

| Mode | XP (Victoire) | XP (Défaite) | 💰 (Victoire) | 💰 (Défaite) |
|------|---------------|--------------|---------------|--------------|
| **PvP Classé** | 200 | 50 | 100 | 25 |
| **Match Amical** | 100 | 25 | 50 | 12 |
| **Entraînement IA** | 60 | 15 | 30 | 7 |
| **Tournoi** | 400 | 100 | 300 | 75 |

### Bonus

#### Bonus de Niveau
- **Adversaire +1 niveau** : +10% récompenses
- **Adversaire +5 niveaux** : +50% récompenses
- **Adversaire +10 niveaux** : +100% récompenses

#### Bonus de Série
- **3 victoires** : +10% récompenses
- **5 victoires** : +25% récompenses
- **10 victoires** : +50% récompenses
- **20 victoires** : +100% récompenses

#### Bonus de Tier
- Chaque tier au-dessus de Bronze donne un bonus XP permanent

---

## 📈 7. PROGRESSION COMPÉTITIVE

### Parcours Typique

#### Débutant (Bronze)
- Apprendre les mécaniques
- Tester différentes cartes
- Comprendre les avantages de type
- Objectif : Atteindre Argent (500 pts)

#### Intermédiaire (Argent-Or)
- Optimiser sa collection
- Acheter quinques légendaires
- Développer des stratégies
- Objectif : Atteindre Platine (1500 pts)

#### Avancé (Platine-Diamant)
- Maîtriser toutes les factions
- Cartes SS+ optimisées
- Participation aux tournois
- Objectif : Atteindre Maître (3000 pts)

#### Expert (Maître+)
- Top 100 du classement
- Collection complète
- Toutes les armes mythiques
- Objectif : Challenger (10000 pts)

### Temps Estimé

| Tier | Casual (1h/j) | Régulier (2-3h/j) | Hardcore (5h+/j) |
|------|---------------|-------------------|------------------|
| **Argent** | 1 semaine | 3 jours | 1 jour |
| **Or** | 2 semaines | 1 semaine | 3 jours |
| **Platine** | 1 mois | 2 semaines | 1 semaine |
| **Diamant** | 2 mois | 1 mois | 2 semaines |
| **Maître** | 4 mois | 2 mois | 1 mois |
| **Grand Maître** | 8 mois | 4 mois | 2 mois |
| **Challenger** | 12+ mois | 6+ mois | 3+ mois |

---

## 🔮 8. FONCTIONNALITÉS FUTURES (Phase 3 Extended)

### Guildes (À venir)
- Création et gestion de guildes
- Guerres de guildes
- Coffre de guilde
- Chat de guilde
- Classement de guildes

### Événements (À venir)
- Événements hebdomadaires thématiques
- Boss raids coopératifs
- Défis limités dans le temps
- Récompenses exclusives
- Classements d'événements

### Trading (À venir)
- Système d'échange de cartes
- Marché communautaire
- Enchères
- Historique des transactions
- Système anti-fraude

### Autres
- Spectateur de combats
- Replays de combats
- Système d'amis
- Messages privés
- Profils publics

---

## 🛠️ 9. INTÉGRATION TECHNIQUE

### Fichiers Créés
- `src/utils/battleSystem.js` - Système de combat complet
- `src/pages/Battle.jsx` - Interface de bataille
- `src/pages/Ranking.jsx` - Interface de classement

### API Endpoints Requis

#### Bataille
- `POST /api/battle/find-opponent` - Trouver un adversaire
- `POST /api/battle/save-result` - Sauvegarder résultat
- `GET /api/battle/history` - Historique des combats
- `GET /api/battle/stats` - Statistiques de bataille

#### Classement
- `GET /api/ranking` - Classement global
- `GET /api/ranking/my-stats` - Mes statistiques
- `POST /api/ranking/update` - Mise à jour des points

### Base de Données

#### Nouvelle table : `battles`
```javascript
{
  _id: ObjectId,
  player1Id: ObjectId,
  player2Id: ObjectId,
  player1CardId: ObjectId,
  player2CardId: ObjectId,
  winnerId: ObjectId,
  mode: String, // 'pvp', 'casual', 'ai', 'tournament'
  turns: Number,
  log: Array,
  rewards: Object,
  date: Date
}
```

#### Mise à jour table : `users`
```javascript
{
  // ... champs existants
  rankingPoints: Number,
  tier: String,
  battleStats: {
    totalBattles: Number,
    wins: Number,
    losses: Number,
    currentStreak: Number,
    bestStreak: Number
  }
}
```

---

## 📊 10. MÉTRIQUES ET ÉQUILIBRAGE

### Équilibrage des Cartes
- Surveillance du taux de victoire par carte
- Ajustements des multiplicateurs si nécessaire
- Rotation des cartes "meta"

### Métriques à Suivre
- Taux de victoire par faction
- Distribution des tiers
- Temps moyen de combat
- Taux d'abandon
- Utilisation des capacités spéciales

---

**Version** : 3.0.0  
**Date** : Novembre 2024  
**Statut** : ✅ Système de bataille et classement implémentés  
**Prochaine étape** : Guildes, Événements, Trading
