# Creative Music Leipzig - Documentation Website

Documentation website for the Creative Music Leipzig GbR project. The trio MOTUSNEU visits venues across Saxony, holds conversations with the people behind the local improvised-music scene, and publishes them as short audio documentaries (podcast episodes). This site makes that documentation publicly accessible.

## Stack

- **React + Vite** — SPA, static build
- **React Router v7** — client-side routing (import from `"react-router"`, not `"react-router-dom"`)
- **react-leaflet** — interactive map (CartoDB Positron / OSM tiles, no API key); tiles are loaded only after a consent gate
- **CSS Modules** — component-scoped styles, no CSS framework
- **gray-matter** — Markdown frontmatter parsed at build time via a custom Vite plugin
- **react-markdown** — renders Markdown body text in components
- **HTML5 `<audio>`** — native podcast player, no external library
- Self-hosted fonts (Playfair Display + Inter, TTF files in `public/fonts/`)

## Local Development

```bash
npm install
npm run dev
```

## Building

```bash
npm run build    # output in dist/
npm run preview  # preview the production build locally
```

## Deployment (GitHub Pages)

Deployed as a project site at **https://comdyax.github.io/cml_leipzig/** (note the trailing slash — the base path requires it).

- `vite.config.js` sets `base: "/cml_leipzig/"` to match the repo name.
- `BrowserRouter` uses `basename={import.meta.env.BASE_URL}` so routes work under the base path. Public asset paths from Markdown frontmatter (images, audio) must also be prefixed with `import.meta.env.BASE_URL`.

```bash
npm run deploy
```

`deploy` runs `predeploy` first, which builds and copies `dist/index.html` → `dist/404.html` (the SPA fallback so deep links like `/map` work on Pages), then pushes `dist/` to the `gh-pages` branch via the `gh-pages` package.

One-time setup: in the repo **Settings → Pages**, set **Source = Deploy from a branch**, **Branch = `gh-pages` / `(root)`**.

## Routes

| Path           | Page            | In navigation?            |
| -------------- | --------------- | ------------------------- |
| `/`            | Home.jsx        | Yes — "Startseite"        |
| `/map`         | MapPage.jsx     | Yes — "Keimzelle Sachsen" |
| `/impressum`   | Impressum.jsx   | Footer link only          |
| `/datenschutz` | Datenschutz.jsx | Footer link only          |

## Content Management

All site content lives in `src/content/` as Markdown files with YAML frontmatter. No code changes are needed to add or update content.

### Adding a news item / concert

Create a file in `src/content/news/` following the naming convention `YYYY-MM-DD-slug.md`:

```markdown
---
type: "concert"
project: "Keimzelle Sachsen"
title: "Konzert in Dresden"
date: "2026-10-22"
location: "Festspielhaus Hellerau, Dresden"
---

Kurze Beschreibung des Konzerts oder der Neuigkeit.
```

- `type` is either `"concert"` or `"news"`. Concerts get the accent-color badge on the News & Events cards.
- `project` groups entries. The map page's "Kommende Konzerte" list filters to `type: "concert"`, `project: "Keimzelle Sachsen"`, and dates that are not in the past.

### Updating a venue / podcast episode

Venue files are in `src/content/venues/`. Each file maps to one map marker and (when it has an `episode`) one podcast card on the map page:

```markdown
---
id: "pohrsdorf"
name: "Saxstall"
city: "Pohrsdorf"
lat: 50.952
lng: 13.148
weblink: ""
podcast: "/audio/folge-1.mp3"
episode: 1
guest: "Eckhardt Schleiermacher"
date: "2026-10-30"
concert: "30.10.2026 – Saxstall, Pohrsdorf"
---

Beschreibungstext des Spielorts...
```

- `episode` (number) + `guest` mark a venue as a podcast episode. The map page shows the map and the podcast cards for exactly the venues that have an `episode`, sorted by episode number.
- `podcast` is the audio path, served from `public/audio/`. MP3 files go in `public/audio/`; the path is prefixed with the base URL at runtime.

> Audio is not wired up yet — episodes currently point at a placeholder `/audio/test.mp3` and `public/audio/` is empty. Drop the real MP3s in `public/audio/` and update each venue's `podcast` path.

### Updating legal pages

Edit `src/content/impressum.md` or `src/content/datenschutz.md` directly.

## Project Structure

```
src/
├── components/
│   ├── Navigation/       — sticky header with logo + nav links
│   ├── Hero/             — homepage hero with image + intro text
│   ├── NewsEvents/       — news & event cards grid
│   ├── ConcertList/      — upcoming-concerts list (date · location)
│   ├── Map/              — react-leaflet map with DivIcon markers + tile-consent gate
│   ├── SteckbriefPanel/  — map sidebar: venue list + venue detail + audio player
│   ├── PodcastList/      — podcast episode cards with inline audio player
│   ├── AudioPlayer/      — custom HTML5 audio player
│   └── Footer/           — copyright + legal links
├── pages/
│   ├── Home.jsx          — Hero + News & Events
│   ├── MapPage.jsx       — intro, concert list, map, podcast list
│   ├── News.jsx          — News & Events (not linked in nav)
│   ├── Impressum.jsx
│   └── Datenschutz.jsx
├── content/
│   ├── home.md           — hero title, subtitle, intro text
│   ├── karte.md          — map page text, map/podcast headings, tile-consent text
│   ├── impressum.md
│   ├── datenschutz.md
│   ├── venues/           — one .md per venue / podcast spielstätte
│   └── news/             — one .md per news item or concert
├── hooks/
│   └── useMarkdown.js    — useVenues() and useNews({ type, project, upcoming })
└── utils/
    └── date.js           — shared German date formatting
```
