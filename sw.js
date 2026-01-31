const CACHE_NAME = 'suivi-medical-v31';
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
      })
  );
});

// Activation : Nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker: Activation...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('🗑️ Suppression ancien cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker activé');
      return self.clients.claim();
    })
  );
});

// Stratégie: Cache First avec fallback réseau
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          console.log('📦 Chargé depuis cache:', event.request.url);
          return cachedResponse;
        }
        
        // Si pas dans le cache, essayer le réseau
        return fetch(event.request)
          .then(response => {
            // Ne pas mettre en cache les requêtes non-GET ou les erreurs
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }
            
            // Cloner la réponse pour la mettre en cache
            const responseClone = response.clone();
            
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
              console.log('✅ Ajouté au cache:', event.request.url);
            });
            
            return response;
          })
          .catch(error => {
            console.error('❌ Erreur réseau:', error);
            // En cas d'échec réseau, retourner une réponse par défaut
            return new Response('Mode hors ligne - contenu non disponible', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain; charset=utf-8'
              })
            });
          });
      })
  );
});

// Gestion des notifications (fonctionne hors ligne)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_NOTIF') {
    console.log('🔔 Notification reçue:', event.data.title);
    
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [200, 100, 200],
      tag: 'medication-reminder',
      requireInteraction: true,
      actions: [
        { action: 'mark-taken', title: 'Pris' },
        { action: 'snooze', title: 'Reporter' }
      ]
    });
  }
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'mark-taken') {
    // Marquer comme pris
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        if (clientList.length > 0) {
          clientList[0].postMessage({ type: 'MARK_TAKEN' });
          clientList[0].focus();
        }
      })
    );
  } else if (event.action === 'snooze') {
    // Reporter de 15 minutes
    setTimeout(() => {
      self.registration.showNotification('Rappel reporté', {
        body: 'N\'oubliez pas votre médicament !',
        icon: '/icon-192.png'
      });
    }, 15 * 60 * 1000);
  } else {
    // Ouvrir l'application
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        for (let client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  }
});

console.log('🚀 Service Worker chargé et prêt !');
