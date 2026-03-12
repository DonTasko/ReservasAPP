// ── SERVICE WORKER — Despesas PWA ──
// Versão: incrementa este número sempre que fizeres upload de uma nova versão do FAT.html
const VERSION = 'v2.0.0';
const CACHE   = 'despesas-' + VERSION;

// Ficheiros a guardar em cache na instalação
const PRECACHE = [
  '/FAT.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// ── INSTALL: guarda tudo em cache ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      // Tenta fazer cache de cada ficheiro individualmente
      // para não falhar tudo se um ícone não existir ainda
      return Promise.allSettled(
        PRECACHE.map(url =>
          cache.add(url).catch(err => console.warn('Cache miss:', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: limpa caches antigas ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE)
          .map(key => {
            console.log('SW: a apagar cache antiga:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: Cache-first com fallback para rede ──
self.addEventListener('fetch', event => {
  // Ignora pedidos que não sejam GET
  if (event.request.method !== 'GET') return;

  // Ignora pedidos externos (analytics, fonts, etc.)
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Serve da cache imediatamente
        // Em background, tenta actualizar a cache para a próxima vez
        fetch(event.request)
          .then(response => {
            if (response && response.status === 200) {
              const clone = response.clone();
              caches.open(CACHE).then(cache => cache.put(event.request, clone));
            }
          })
          .catch(() => {}); // falha silenciosa se offline
        return cached;
      }

      // Não está em cache — tenta a rede
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) return response;
        const clone = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        // Rede falhou e não há cache — devolve o FAT.html como fallback
        if (event.request.destination === 'document') {
          return caches.match('/FAT.html');
        }
      });
    })
  );
});

// ── MENSAGENS do cliente (ex: forçar update) ──
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});