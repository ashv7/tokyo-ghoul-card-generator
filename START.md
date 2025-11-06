# 🚀 Guide de démarrage rapide

## Développement local

### Option 1 : Avec le serveur de développement intégré (Recommandé)

Cette option lance automatiquement le frontend ET le backend :

```bash
npm run dev:full
```

Cela démarre :
- **Frontend** sur http://localhost:5173
- **Backend** sur http://localhost:8888

### Option 2 : Serveurs séparés

Si vous préférez lancer les serveurs séparément :

**Terminal 1 - Backend :**
```bash
npm run server
```

**Terminal 2 - Frontend :**
```bash
npm run dev
```

### Option 3 : Avec Netlify CLI (Production-like)

Si vous avez installé Netlify CLI :

```bash
npm run netlify:dev
```

## Vérification

Une fois les serveurs lancés, ouvrez http://localhost:5173 dans votre navigateur.

Vous devriez voir :
- ✅ La page d'accueil Tokyo Ghoul
- ✅ Les boutons "Commencer" et "Se connecter"
- ✅ Pas d'erreurs dans la console

## Tester l'application

1. **Créer un compte**
   - Cliquez sur "Commencer" ou "Inscription"
   - Remplissez le formulaire
   - Vous serez redirigé vers le générateur

2. **Générer une carte**
   - Entrez votre nom
   - Sélectionnez votre date de naissance
   - (Optionnel) Uploadez une photo
   - Cliquez sur "Générer ma carte"

3. **Sauvegarder**
   - Cliquez sur "Sauvegarder" pour ajouter la carte à votre collection
   - Allez dans "Collection" pour voir toutes vos cartes

4. **Exporter**
   - Cliquez sur "Exporter" pour télécharger la carte en PNG

## Résolution des problèmes

### Erreur : "Failed to load resource: 500"
- Vérifiez que le backend est bien lancé sur le port 8888
- Utilisez `npm run dev:full` pour lancer les deux serveurs

### Erreur : "EADDRINUSE"
- Un serveur utilise déjà le port
- Arrêtez les autres processus Node.js ou changez le port dans `server.js`

### Les cartes ne se sauvegardent pas
- Vérifiez que le dossier `data/` existe
- Vérifiez les permissions d'écriture

### L'authentification ne fonctionne pas
- Vérifiez que le fichier `.env` existe avec `JWT_SECRET`
- Redémarrez les serveurs après avoir modifié `.env`

## Commandes utiles

```bash
# Installer les dépendances
npm install

# Lancer en développement (frontend + backend)
npm run dev:full

# Lancer seulement le frontend
npm run dev

# Lancer seulement le backend
npm run server

# Build pour production
npm run build

# Preview du build
npm run preview

# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

## Structure des données

Les données utilisateurs sont stockées dans `data/users.json` :

```json
[
  {
    "id": "1730918400000",
    "email": "user@example.com",
    "username": "user",
    "password": "$2a$10$...",
    "cards": [
      {
        "id": "1730918500000",
        "name": "John Doe",
        "birthdate": "1990-01-01",
        "rank": "Inspecteur de 1ʳᵉ classe",
        "rarity": "B",
        "weapon": "Rinkaku Quinque",
        "totalScore": 28,
        ...
      }
    ],
    "createdAt": "2024-11-06T17:00:00.000Z"
  }
]
```

## Prochaines étapes

Une fois que tout fonctionne localement :
1. Testez toutes les fonctionnalités
2. Créez plusieurs cartes avec différents profils
3. Consultez `DEPLOYMENT.md` pour déployer sur Netlify

Bon développement ! 🎉
