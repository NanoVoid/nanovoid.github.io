self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).then((response) => {
      const newHeaders = new Headers(response.headers);

      // Add the Content-Security-Policy header
      newHeaders.set('Content-Security-Policy', "frame-ancestors 'self' https://drive.google.com");

      // Create a new response with the added CSP header
      const moddedResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });

      return moddedResponse;
    }).catch((error) => {
      console.error('Fetch error:', error);
      return new Response('Service Worker fetch error', {
        status: 500,
        statusText: 'Internal Server Error'
      });
    })
  );
});

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activate the service worker immediately after installation
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim()); // Take control of all pages immediately
});