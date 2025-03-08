const CACHE_NAME = "almacen-v1";
const urlsToCache = [
    "index.html",
    "ubicaciones.html",
    "styles.css",
    "script.js",
    "ubicaciones.js",
    "icon.png"
];

// Instalación del Service Worker
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Interceptar peticiones y cargar desde caché si no hay conexión
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
