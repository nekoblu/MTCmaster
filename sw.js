// sw.js - El guardián del Linaje Maidi
self.addEventListener('install', (e) => {
    // Instalación silenciosa del Service Worker
});

// ESCUCHA DE NOTIFICACIONES (Incluso con App cerrada)
self.addEventListener('push', (event) => {
    let data = { title: 'Tu Qi se debilita', body: '¡Vuelve al Dojo! El linaje te necesita.' };
    if (event.data) {
        data = event.data.json();
    }

    const options = {
        body: data.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/1041/1041844.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/1041/1041844.png',
        vibrate: [500, 110, 500, 110, 450, 110],
        tag: 'engagement',
        renotify: true,
        data: { url: '/' }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});
