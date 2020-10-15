var cacheName = 'V7';

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    console.log("service worker installeddd")
});

/* Serve cached content when offline */
/*self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});*/


/* Activate event */
self.addEventListener('activate', function(e) {
    console.log("service worker activated")
    e.waitUntil(
       caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache =>{
            if(cache!=cacheName){
               console.log("Service Worker : Clearing old cache")
               return caches.delete(cache)   
            }
          })
        )  
      })
    );
});


// Call fetch event 
self.addEventListener('fetch',e=>{
   console.log("Service Worker :  Fetching");
   e.respondWith(
      fetch(e.request)
        .then(res=>{
          //Make copy/clone of responce 
          const resClone = res.clone();
          // open cache
          caches
            .open(cacheName)
            .then(cache=>{
              cache.put(e.request,resClone);
            });
          return res;  
        }).catch(err => catches.match(e.request).then(res => res))
   )
});