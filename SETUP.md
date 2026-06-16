# Reading Game Dev Academy on your phone

The site is a single static folder — no build, no server code, no accounts, no backend. Your progress
(lesson completion, notes, GDD drafts, board states) lives only in the browser you use it in, via
`localStorage`. To move progress between your phone and PC, use **Dashboard → Backup & restore →
Export / Import** (a small JSON file). Nothing personal ever leaves your device.

There are two ways to open it on your phone. **Option A (hosted) is recommended** — it's the only one
that installs as an offline app.

---

## Option A — Host it (recommended): a URL you can open anywhere, installable + offline

Hosting the folder on a free static host gives you an **`https://` URL**. That matters: the offline
**service worker** and the **"install / Add to Home Screen"** PWA features only work over `https`
(or `localhost`) — browsers block them on plain `http`. The hosted files are just the course content;
**no personal data is uploaded** — your progress still stays in your phone's browser.

Pick any one host:

### GitHub Pages
1. Create a free GitHub account and a new repository (e.g. `game-academy`).
2. Upload the **contents of this `game-academy/` folder** to the repo (drag-and-drop in the GitHub web
   UI works, or `git push`). Make sure `index.html` is at the repo root (or in `/docs`).
3. Repo **Settings → Pages →** Source: *Deploy from a branch*, Branch: `main`, folder `/ (root)`. Save.
4. After a minute you get a URL like `https://<you>.github.io/game-academy/`. Open it on your phone.
   (The site uses only relative paths, so the subpath works fine.)

### Netlify or Cloudflare Pages (drag-and-drop, no Git needed)
1. Sign up free at app.netlify.com (or Cloudflare Pages).
2. **Drag the `game-academy/` folder onto the "deploy" drop zone.** It gives you an `https://…` URL in
   seconds.
3. Open that URL on your phone.

### Install it as an app (after opening the https URL on your phone)
- **Android / Chrome:** tap the **⋮ menu → "Install app"** (or "Add to Home Screen"). It installs with
  the gizmo icon, opens full-screen, and **works offline** after the first load.
- **iPhone / Safari:** tap **Share → "Add to Home Screen"**. iOS uses the app icon and opens it
  standalone. (iOS offline support for web apps is more limited than Android's, but the app shell and
  lessons you've opened are cached.)

Once installed, the first launch caches the whole course (all lessons + tools) so you can read on the
train, on a plane, anywhere — no signal needed.

---

## Option B — Private / local network (no hosting): read over your own Wi-Fi

Good for a quick read with nothing uploaded anywhere. **Caveat:** because this serves over plain
`http://` from a LAN IP (not `https`), the **offline service worker and "install" won't activate** —
the site still works fully as a normal website, but it won't cache for offline or install to your home
screen. For the installable/offline app, use Option A.

1. On your **PC**, open a terminal in this `game-academy/` folder and run:
   ```
   python -m http.server 8000
   ```
2. Find your PC's **local IP address**. On Windows, open a terminal and run:
   ```
   ipconfig
   ```
   Look for **IPv4 Address** under your active Wi-Fi adapter — something like `192.168.1.23`.
3. On your **phone** (connected to the **same Wi-Fi**), open a browser and go to:
   ```
   http://192.168.1.23:8000
   ```
   (use your actual IP). The site loads and is fully usable for reading.
4. Keep the terminal running while you read; close it when done.

If the phone can't reach it, your PC's firewall is likely blocking the port — allow Python through the
Windows Firewall for **Private networks**, or just use Option A.

---

## Moving progress between phone and PC
Because storage is per-browser and never synced to a server, reconcile manually whenever you want:
**Dashboard → Backup & restore → Export** on one device, send yourself the JSON file, then **Import**
it on the other. Import overwrites with the backup's state, so export from whichever device is most
up to date.
