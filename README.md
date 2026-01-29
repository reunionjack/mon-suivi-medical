# 🚀 Suivi Ordonnance v2 - Fichiers de Déploiement

## ✅ Problème résolu

Votre application installait toujours l'ancienne version "Ma Pharmacie" au lieu de "Suivi de mes ordonnances" à cause de :
- Caches PWA persistants
- Ancien Service Worker actif
- Même ID d'application dans le manifest

## 📦 Fichiers mis à jour

### Fichiers critiques modifiés :
- ✅ **manifest.json** : ID changé vers `com.reunionjack.suiviordonnance.v2`
- ✅ **sw.js** : Version cache mise à jour vers `med-v30`
- ✅ **index.html** : Script de nettoyage automatique des anciens caches
- ✅ **.htaccess** : Désactivation du cache navigateur pour les fichiers PWA
- ✅ **test-version.html** : Page de diagnostic pour vérifier la version installée

### Fichiers non modifiés :
- Logo3.png (logo DOSEO)
- icon-192.png 
- icon-512.png

## 🎯 Étapes de déploiement

### 1️⃣ AVANT de générer le package :

1. **Sur votre ordinateur** :
   - Ouvrez Chrome/Edge
   - Allez sur votre site hébergé
   - F12 > Application > Storage > "Clear site data"
   - Fermez et rouvrez le navigateur

2. **Uploadez TOUS les fichiers mis à jour** sur votre hébergement :
   ```
   manifest.json
   sw.js
   index.html
   .htaccess
   test-version.html
   Logo3.png
   icon-192.png
   icon-512.png
   ```

3. **Testez dans le navigateur** :
   - Allez sur `https://votre-site.com/test-version.html`
   - Vérifiez que :
     - ID App = `com.reunionjack.suiviordonnance.v2`
     - Cache = `med-v30`
     - Pas d'anciens caches listés

### 2️⃣ Sur votre mobile :

1. **Désinstallez l'ancienne application** :
   - Paramètres > Applications
   - Cherchez "Ma Pharmacie" ou "Suivi"
   - Désinstaller

2. **Videz le cache Chrome** :
   - Paramètres Chrome > Confidentialité > Effacer données
   - Sélectionnez "Images et fichiers en cache"

### 3️⃣ Générez le package avec PWA Builder :

1. Allez sur https://www.pwabuilder.com/
2. Entrez l'URL de votre site
3. **AVANT de cliquer "Package"** :
   - F12 > Application > Clear storage
   - Rechargez la page PWA Builder
4. Package For Stores > Android APK
5. **Vérifiez** que Package ID = `com.reunionjack.suiviordonnance.v2`
6. Téléchargez le nouveau APK

### 4️⃣ Installation :

1. Transférez le nouveau APK sur votre mobile
2. Installez-le (activez "Sources inconnues" si nécessaire)
3. Ouvrez l'application
4. Vérifiez que le titre est "Suivi de mes ordonnances" avec le logo DOSEO

## 🔧 Vérification post-installation

Une fois installée, vous pouvez vérifier la version en ouvrant dans un navigateur :
```
https://votre-site.com/test-version.html
```

Cela affichera :
- ✅ Version v2.0
- ✅ ID App correct
- ✅ Cache med-v30
- ✅ Statut des notifications
- ✅ Statut PWA

## ⚠️ Si le problème persiste

### Solution rapide :
1. Dans l'app installée, cliquez sur le bouton RESET (en haut à droite)
2. Fermez complètement l'app (pas juste retour à l'accueil)
3. Rouvrez-la

### Solution radicale :
1. Désinstallez COMPLÈTEMENT l'app
2. Redémarrez le téléphone
3. Réinstallez depuis le nouvel APK

## 📞 Support

Si après toutes ces étapes l'application affiche toujours "Ma Pharmacie" :
- Vérifiez que vous avez bien uploadé TOUS les fichiers
- Vérifiez que le test-version.html affiche la v2.0
- Essayez de générer le package depuis un autre ordinateur
- Assurez-vous que PWA Builder n'utilise pas un cache de votre ancien package

## 🎉 Nouvelles fonctionnalités v2

- ✅ Nouveau logo DOSEO professionnel
- ✅ Titre "Suivi de mes ordonnances" 
- ✅ Nettoyage automatique des anciens caches
- ✅ Meilleure gestion des mises à jour
- ✅ Page de diagnostic intégrée
