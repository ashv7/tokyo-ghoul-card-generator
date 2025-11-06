# 🧪 Guide de test - Phase 1

## Checklist des fonctionnalités à tester

### ✅ Thèmes de cartes

- [ ] **CCG Classique** - Couleur rouge, style officiel
- [ ] **Goule** - Couleur rouge foncé, style sombre
- [ ] **Anteiku** - Couleur marron, style chaleureux
- [ ] **Aogiri Tree** - Couleur violette, style mystérieux
- [ ] Vérifier que les couleurs changent sur toute la carte
- [ ] Vérifier que le QR code et code-barres s'adaptent
- [ ] Vérifier que le header change selon le thème

### ✅ Traits de personnalité

- [ ] Générer plusieurs cartes et vérifier la variété des traits
- [ ] Vérifier que le trait est cohérent avec les compétences
- [ ] Vérifier l'affichage avec l'icône ❤️
- [ ] Vérifier que la description inclut le trait

### ✅ Équipement secondaire

- [ ] Vérifier qu'une armure est attribuée
- [ ] Vérifier qu'un gadget est attribué
- [ ] Vérifier qu'un équipement de communication est attribué
- [ ] Vérifier que l'armure est adaptée au type (Terrain/Bureau)
- [ ] Vérifier l'affichage dans la section Équipement

### ✅ Divisions

- [ ] Vérifier qu'une division est attribuée
- [ ] Vérifier l'affichage avec l'icône 📍
- [ ] Vérifier que la division apparaît dans la description

### ✅ Formats d'export

#### Format Carte
- [ ] Sélectionner "Carte complète"
- [ ] Générer une carte
- [ ] Vérifier l'affichage vertical
- [ ] Exporter en PNG
- [ ] Vérifier le nom du fichier : `tokyo-ghoul-card-[nom].png`

#### Format Carte d'Identité
- [ ] Sélectionner "Carte d'identité"
- [ ] Générer une carte
- [ ] Vérifier l'affichage horizontal
- [ ] Vérifier que la photo est à gauche
- [ ] Vérifier que les infos sont à droite
- [ ] Exporter en PNG
- [ ] Vérifier le nom du fichier : `tokyo-ghoul-id-card-[nom].png`

### ✅ Système de partage

#### Sur mobile
- [ ] Cliquer sur "Partager"
- [ ] Vérifier que le menu de partage natif s'ouvre
- [ ] Partager sur une application

#### Sur desktop
- [ ] Cliquer sur "Partager"
- [ ] Vérifier le message "Lien copié dans le presse-papier"
- [ ] Coller le contenu copié
- [ ] Vérifier qu'il contient le nom, grade et rareté

### ✅ Génération de cartes

- [ ] Remplir nom et date de naissance
- [ ] Upload une photo
- [ ] Sélectionner un thème
- [ ] Sélectionner un format
- [ ] Cliquer sur "Générer ma carte"
- [ ] Vérifier l'animation de chargement
- [ ] Vérifier que la carte s'affiche

### ✅ Régénération

- [ ] Générer une carte
- [ ] Cliquer sur "Régénérer"
- [ ] Vérifier que les stats changent
- [ ] Vérifier que le nom et la photo restent identiques
- [ ] Vérifier que le thème reste le même

### ✅ Sauvegarde et collection

- [ ] Générer une carte
- [ ] Cliquer sur "Sauvegarder"
- [ ] Vérifier le message de succès
- [ ] Aller dans "Collection"
- [ ] Vérifier que la carte est présente
- [ ] Vérifier que toutes les nouvelles infos sont sauvegardées

### ✅ Affichage des nouvelles informations

Sur chaque carte, vérifier la présence de :
- [ ] Trait de personnalité (avec icône ❤️)
- [ ] Division (avec icône 📍)
- [ ] Section Équipement (avec icône 📦)
- [ ] Armure
- [ ] Gadget
- [ ] Communication
- [ ] Description enrichie

## 🎯 Scénarios de test complets

### Scénario 1 : Inspecteur de Terrain
1. Créer un personnage avec date de naissance récente
2. Sélectionner thème "CCG Classique"
3. Format "Carte complète"
4. Générer
5. Vérifier :
   - Type : Terrain
   - Armure lourde (Gilet ou Armure tactique)
   - Trait cohérent (Courageux, Impulsif, etc.)
   - Arme de combat

### Scénario 2 : Inspecteur de Bureau
1. Créer un personnage
2. Sélectionner thème "Anteiku"
3. Format "Carte d'identité"
4. Générer plusieurs fois jusqu'à obtenir un type Bureau
5. Vérifier :
   - Type : Bureau
   - Armure légère (Exosquelette ou Combinaison)
   - Trait cohérent (Calculateur, Prudent, etc.)
   - Arme d'analyse

### Scénario 3 : Carte Goule
1. Créer un personnage
2. Sélectionner thème "Goule"
3. Format "Carte complète"
4. Générer
5. Vérifier :
   - Couleurs rouges foncées
   - Header "GOULE"
   - QR code et code-barres rouges foncés

### Scénario 4 : Collection complète
1. Générer 5 cartes avec différents thèmes
2. Sauvegarder chacune
3. Aller dans Collection
4. Vérifier que toutes sont présentes
5. Cliquer sur une carte pour voir les détails
6. Vérifier que toutes les infos sont affichées

## 🐛 Bugs potentiels à surveiller

- [ ] Thème ne s'applique pas correctement
- [ ] Équipement manquant ou null
- [ ] Division non affichée
- [ ] Trait de personnalité incohérent
- [ ] Format d'export ne change pas la vue
- [ ] Partage ne fonctionne pas
- [ ] Export PNG avec mauvaises couleurs
- [ ] Description tronquée ou mal formatée

## 📊 Tests de performance

- [ ] Générer 10 cartes rapidement
- [ ] Changer de thème plusieurs fois
- [ ] Basculer entre les formats
- [ ] Exporter plusieurs cartes
- [ ] Vérifier qu'il n'y a pas de ralentissement

## 🎨 Tests visuels

- [ ] Vérifier l'alignement des éléments
- [ ] Vérifier la lisibilité du texte
- [ ] Vérifier les espacements
- [ ] Vérifier les couleurs de chaque thème
- [ ] Vérifier le responsive (mobile/desktop)
- [ ] Vérifier les icônes

## ✅ Validation finale

Une fois tous les tests passés :
- [ ] Créer une carte avec chaque thème
- [ ] Exporter dans les deux formats
- [ ] Sauvegarder dans la collection
- [ ] Partager une carte
- [ ] Vérifier la cohérence globale

---

**Note** : Signaler tout bug ou comportement inattendu dans les issues GitHub.
