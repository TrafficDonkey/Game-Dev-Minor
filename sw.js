/* =============================================================================
 * Game Dev Academy — service worker (offline-first PWA).
 * No build step: this file is static. Bump CACHE_VERSION when content changes to
 * force a refresh. Strategy: precache the whole app shell + all lesson data on
 * install, then serve cache-first (the site is fully static), runtime-caching any
 * same-origin GET we missed, and falling back to index.html for navigations.
 * Registered from index.html with a RELATIVE scope so it works under a subpath
 * (e.g. username.github.io/repo/). Requires a secure context (https or localhost).
 * ========================================================================== */
var CACHE_VERSION = 'gda-cache-v4';
var PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/styles.css",
  "./js/store.js",
  "./js/ui.js",
  "./js/router.js",
  "./js/curric.js",
  "./js/search.js",
  "./js/milestones.js",
  "./js/app.js",
  "./js/tools/achieve.js",
  "./js/tools/assetcheck.js",
  "./js/tools/blockout.js",
  "./js/tools/coreloop.js",
  "./js/tools/gdd.js",
  "./js/tools/kanban.js",
  "./js/tools/narrative.js",
  "./js/tools/pipeline.js",
  "./js/tools/playground.js",
  "./js/tools/registry.js",
  "./js/tools/scope.js",
  "./js/views/curriculum.js",
  "./js/views/dashboard.js",
  "./js/views/lesson.js",
  "./js/views/reference.js",
  "./js/views/tools.js",
  "./data/pillars.js",
  "./data/glossary.js",
  "./data/projects.js",
  "./data/milestones.js",
  "./data/hotkeys.js",
  "./data/lessons/00a.js",
  "./data/lessons/00b.js",
  "./data/lessons/01a.js",
  "./data/lessons/01b.js",
  "./data/lessons/01c.js",
  "./data/lessons/02a.js",
  "./data/lessons/02b.js",
  "./data/lessons/03a.js",
  "./data/lessons/03b.js",
  "./data/lessons/04a.js",
  "./data/lessons/04b.js",
  "./data/lessons/a0a.js",
  "./data/lessons/a1a.js",
  "./data/lessons/a1b.js",
  "./data/lessons/a2a.js",
  "./data/lessons/a3a.js",
  "./data/lessons/a4a.js",
  "./data/lessons/a5a.js",
  "./data/lessons/b0a.js",
  "./data/lessons/b0b.js",
  "./data/lessons/b1a.js",
  "./data/lessons/b2a.js",
  "./data/lessons/b2b.js",
  "./data/lessons/b3a.js",
  "./data/lessons/b4a.js",
  "./data/lessons/b4b.js",
  "./data/lessons/b5a.js",
  "./data/lessons/c0a.js",
  "./data/lessons/c1a.js",
  "./data/lessons/c1b.js",
  "./data/lessons/c2a.js",
  "./data/lessons/c2b.js",
  "./data/lessons/c3a.js",
  "./data/lessons/c3b.js",
  "./data/lessons/c4a.js",
  "./data/lessons/d0a.js",
  "./data/lessons/d1a.js",
  "./data/lessons/d1b.js",
  "./data/lessons/d2a.js",
  "./data/lessons/d3a.js",
  "./data/lessons/d3b.js",
  "./data/lessons/d4a.js",
  "./data/lessons/d5a.js",
  "./data/lessons/d5b.js",
  "./data/lessons/e0a.js",
  "./data/lessons/e0b.js",
  "./data/lessons/e1a.js",
  "./data/lessons/e1b.js",
  "./data/lessons/e1c.js",
  "./data/lessons/e2a.js",
  "./data/lessons/e2b.js",
  "./data/lessons/e3a.js",
  "./data/lessons/e4a.js",
  "./data/lessons/e4b.js",
  "./data/lessons/e5a.js",
  "./data/lessons/f0a.js",
  "./data/lessons/f1a.js",
  "./data/lessons/f2a.js",
  "./data/lessons/f3a.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
  "./icons/apple-touch-icon-180.png",
  "./icons/favicon-32.png"
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_VERSION).then(function (cache) {
      // cache:'reload' bypasses the HTTP cache so we precache fresh copies
      return Promise.all(PRECACHE.map(function (url) {
        return cache.add(new Request(url, { cache: 'reload' })).catch(function () { /* tolerate a missing optional asset */ });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE_VERSION; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // never touch cross-origin (there are none)

  if (req.mode === 'navigate') {
    // network-first for navigations so a fresh deploy is picked up, cache fallback for offline
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_VERSION).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (r) { return r || caches.match('./index.html') || caches.match('./'); });
      })
    );
    return;
  }

  // static assets: cache-first, then network (and cache the result)
  e.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        if (res && res.ok && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE_VERSION).then(function (c) { c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
