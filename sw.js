diff --git a/sw.js b/sw.js
index 248bd7809c5fa5870ea14fe69c3590fcc21ad6c8..b13aaafa9873518fe997167b4de939d0171ec9a6 100644
--- a/sw.js
+++ b/sw.js
@@ -1,26 +1,26 @@
-const CACHE_NAME = 'suivi-medical-v32';
+const CACHE_NAME = 'suivi-medical-v33';
 const ASSETS = [
   '/',
   '/index.html',
   '/manifest.json',
   '/Logo3.png',
   '/icon-192.png',
   '/icon-512.png'
   // Ajoutez ici tous vos fichiers CSS, JS, images additionnels
 ];
 
 // Installation : Mise en cache des fichiers
 self.addEventListener('install', (event) => {
   console.log('✅ Service Worker: Installation...');
   event.waitUntil(
     caches.open(CACHE_NAME)
       .then(cache => {
         console.log('📦 Mise en cache des fichiers');
         return cache.addAll(ASSETS);
       })
       .then(() => {
         console.log('✅ Tous les fichiers mis en cache');
         return self.skipWaiting();
       })
       .catch(err => {
         console.error('❌ Erreur lors de la mise en cache:', err);
