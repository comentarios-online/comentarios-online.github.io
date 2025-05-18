'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "0851b77cbae163f1fc202fbb13c9f3fe",
"assets/AssetManifest.bin.json": "81718616c6b8be37af6234b7463ec50d",
"assets/AssetManifest.json": "c389e846dadf26f110e6cdffc4be0a6e",
"assets/assets/images/google.png": "4c55b8d3625b8dfadd7eeb618a7137e0",
"assets/assets/images/internet.png": "d8352cafff2bd3e3e283464435122b47",
"assets/assets/images/loading4.gif": "7ebf67489c962e07c00d3f712cfff50e",
"assets/assets/images/login.png": "0eaee4b74013ee3f5baa33e980afa81c",
"assets/assets/images/logo.png": "0241da0e269ebef337d941e94affeeff",
"assets/assets/images/logo_full.png": "7c0f4d41fd53c43f01872e19c5a44647",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "e407ed306f22c92754a8d88ea71e5141",
"assets/NOTICES": "805c55018784251bf4518de7b9109cc7",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "42e26327cb934cd8a86a11bb2e6ce30f",
"assets/packages/serverpod_auth_google_flutter/assets/google-icon.png": "ed3d85e924ac22e46489e367ee067f59",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "86e461cf471c1640fd2b461ece4589df",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/chromium/canvaskit.js": "34beda9f39eb7d992d46125ca868dc61",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"favicon.png": "bad453db6315d81071bef456631d42ac",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"flutter_bootstrap.js": "24cf7c106004a0da94dc60297593decf",
"icons/Icon-192.png": "f089a989aca8283323eba2f7afbfddd6",
"icons/Icon-512.png": "d5c7c4cb641f76d282872e91a6fb9397",
"icons/Icon-maskable-192.png": "f089a989aca8283323eba2f7afbfddd6",
"icons/Icon-maskable-512.png": "d5c7c4cb641f76d282872e91a6fb9397",
"index.html": "95c2a1b4a93dc36d8f5059467644f2bc",
"/": "95c2a1b4a93dc36d8f5059467644f2bc",
"main.dart.js": "83ae7a0067d06fc3ff185171af7c9882",
"manifest.json": "3238b89baba45aeeb439f888cfc09784",
"splash/img/dark-1x.gif": "47ac6265002d413c311c47c5b76cbc45",
"splash/img/dark-1x.png": "e270159a2e8053f81c89defee40da9f4",
"splash/img/dark-2x.gif": "04644b94a24432c8c1b44e7b84d65398",
"splash/img/dark-2x.png": "29ce1c3aa494a61caf5b2347d904cf72",
"splash/img/dark-3x.gif": "274947ccef4ba09fecff4e24cf393946",
"splash/img/dark-3x.png": "e91ad69e38507ebaeaa675a4b06cb181",
"splash/img/dark-4x.gif": "7b8d837ca708ff7ff11ddf774ead4838",
"splash/img/dark-4x.png": "4e46c656b99fd75d00f01e420220242c",
"splash/img/light-1x.gif": "47ac6265002d413c311c47c5b76cbc45",
"splash/img/light-1x.png": "e270159a2e8053f81c89defee40da9f4",
"splash/img/light-2x.gif": "04644b94a24432c8c1b44e7b84d65398",
"splash/img/light-2x.png": "29ce1c3aa494a61caf5b2347d904cf72",
"splash/img/light-3x.gif": "274947ccef4ba09fecff4e24cf393946",
"splash/img/light-3x.png": "e91ad69e38507ebaeaa675a4b06cb181",
"splash/img/light-4x.gif": "7b8d837ca708ff7ff11ddf774ead4838",
"splash/img/light-4x.png": "4e46c656b99fd75d00f01e420220242c",
"version.json": "c482cda11a49fe4a48283ffebe1aee00"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
