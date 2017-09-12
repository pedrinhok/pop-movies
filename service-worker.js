const CACHE_VERSION = "pop-movies-v1"
const CACHE_FILES = [
  "/",
  "/index.js",
  "/index.html"
]

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(CACHE_FILES))
  )
})

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => (
        Promise.all(keys
          .filter(key => key != CACHE_VERSION)
          .map(key => caches.delete(key))
        )
      ))
  )
})

self.addEventListener("fetch", event => {
  // return any request other than GET
  if(event.request.method !== "GET")
    return
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        var request = event.request.clone()
        var fetched = fetch(request)
          .then(response => {
            // return bad response
            if(badResponse(response))
              return response
            // cache and return response
            var cacheResponse = response.clone()
            caches.open(CACHE_VERSION)
              .then(cache => cache.put(event.request, cacheResponse))
            return response
          })
          .catch(response => response)
        // return cached or fetched response
        return cached || fetched
      })
  )
})

function badResponse(response){
  return !response || response.status !== 200
}
