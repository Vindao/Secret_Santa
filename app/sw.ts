const cacheName = "v1";

// call Activate event
self.addEventListener("activate", (e: any) => {
  // remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener("fetch", (e: any) => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Make clone of response
        const resClone = res.clone();
        // Open cache
        caches.open(cacheName).then(cache => {
          // Add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
  );
});
