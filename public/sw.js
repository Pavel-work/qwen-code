const CACHE_NAME = 'garage-os-v1'
const urlsToCache = [
  '/',
  '/manifest.json',
]

// Установка Service Worker
self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache)
      })
  )
})

// Активация Service Worker
self.addEventListener('activate', (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Перехват запросов
self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Возвращаем кэш или делаем запрос
        if (response) {
          return response
        }
        return fetch(event.request)
      })
  )
})
