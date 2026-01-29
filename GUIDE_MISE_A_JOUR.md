# Guide de Mise à Jour - Suivi Ordonnance

## Problème résolu
Votre mobile installe l'ancienne version car :
- Le cache PWA persiste
- L'ID de l'application n'a pas changé
- PWA Builder peut utiliser des fichiers en cache

## Solutions appliquées

### 1. Changement de l'ID de l'application
```json
"id": "com.reunionjack.suiviordonnance.v2"
```
Cela force Android à considérer ceci comme une NOUVELLE application.

### 2. Nouvelle version du cache
```js
const CACHE_NAME = 'med-v30';
```

## Instructions pour PWA Builder

### AVANT d'empaqueter avec PWA Builder :

1. **Désinstaller l'ancienne application de votre mobile**
   - Allez dans Paramètres > Applications
   - Désinstallez "Suivi de mon ordonnance" (ancienne version)

2. **Nettoyer le cache de votre navigateur**
   - Ouvrez Chrome sur votre ordinateur
   - Allez sur votre site web
   - F12 > Application > Storage > Clear site data
   - OU supprimez tout dans : chrome://settings/clearBrowserData

3. **Vider le cache PWA Builder**
   - Avant de générer le nouveau package, dans PWA Builder :
   - Allez dans les DevTools (F12)
   - Application > Service Workers > Unregister
   - Application > Clear storage > Clear site data

### Empaqueter avec PWA Builder :

1. Allez sur [PWABuilder.com](https://www.pwabuilder.com/)
2. Entrez l'URL de votre site web
3. Cliquez sur "Package For Stores"
4. Sélectionnez "Android (APK)"
5. **IMPORTANT** : Vérifiez que le "Package ID" est bien `com.reunionjack.suiviordonnance.v2`
6. Téléchargez le nouveau APK

### Installation sur mobile :

1. **Méthode recommandée** :
   - Désinstallez l'ancienne version si pas déjà fait
   - Activez "Sources inconnues" dans les paramètres Android
   - Transférez le nouveau APK sur votre mobile
   - Installez le nouveau APK

2. **Alternative - Upload sur Play Store** :
   - Si vous publiez sur Play Store, utilisez un nouveau "versionCode"
   - Le Play Store gérera automatiquement la mise à jour

## Si le problème persiste

### Option A : Changer complètement le nom
Dans `manifest.json` :
```json
"name": "Suivi Ordonnance v2",
"short_name": "Suivi Ordo v2",
"id": "com.reunionjack.suiviordo2"
```

### Option B : Forcer la réinstallation
```bash
# Via ADB si vous avez accès :
adb uninstall com.reunionjack.suiviordonnance
adb install nouveau.apk
```

### Option C : Publier sur Play Store
- Créez un nouveau bundle avec un versionCode plus élevé
- Play Store forcera la mise à jour automatiquement

## Vérification après installation

1. Ouvrez l'application
2. Vérifiez le titre (doit être "Suivi de mon ordonnance")
3. Vérifiez le logo (DOSEO)
4. Dans Chrome DevTools (si vous ouvrez l'URL) :
   ```
   Application > Service Workers
   ```
   Devrait afficher "med-v30"

## Fichiers mis à jour
- ✅ manifest.json (nouvel ID)
- ✅ sw.js (nouvelle version cache)
- ✅ index.html (déjà à jour)
- ✅ Logo3.png (nouveau logo DOSEO)

## Notes importantes
- **TOUJOURS** désinstaller l'ancienne version avant d'installer la nouvelle
- **TOUJOURS** vider les caches avant de générer un nouveau package
- Si vous republiez, incrémentez toujours le versionCode
