const CACHE_NAME = 'med-v30'; // Version augmentée pour forcer la mise à jour
const ASSETS = [
  './',
  'index.html',
  'manifest-v2.json',
  'Logo3.png',
  'icon-192.png',
  'icon-512.png'
];

// Installation : Mise en cache des nouveaux fichiers
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Force le nouveau SW à prendre le contrôle immédiatement
});

// Activation : NETTOYAGE DES ANCIENS CACHES (Important pour supprimer "Ma Pharmacie")
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Suppression de l ancien cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Récupération des fichiers
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

// Gestion des notifications
self.addEventListener('message', (event) => {
    if (event.data.type === 'SCHEDULE_NOTIF') {
        self.registration.showNotification(event.data.title, {\
            body: event.data.body,\
            icon: 'icon-192.png',\
            vibrate: [200, 100, 200]\
        });
    }
});