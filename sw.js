const CACHE_NAME = 'med-v5'; // On change la version pour forcer la mise à jour
const ASSETS = [
  'index.html', 
  'manifest.json', 
  'Logo3.png', 
  'icon-192.png', 
  'icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'SCHEDULE_NOTIF') {
        self.registration.showNotification(event.data.title, {
            body: event.data.body,
            icon: 'icon-192.png', // Utilise votre nouvelle icône locale
            vibrate: [200, 100, 200]
        });
    }
});