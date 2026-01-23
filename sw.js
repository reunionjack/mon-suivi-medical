const CACHE_NAME = 'med-v3';
const ASSETS = ['index.html', 'manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'SCHEDULE_NOTIF') {
        // Le délai est géré ici pour le rappel du lendemain
        setTimeout(() => {
            self.registration.showNotification(event.data.title, {
                body: event.data.body,
                icon: 'https://cdn-icons-png.flaticon.com/512/822/822143.png',
                vibrate: [200, 100, 200]
            });
        }, event.data.delay);
    }
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});