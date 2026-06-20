# Keimzelle Sachsen – Grashalme & Improvisation

Documentation website for the Creative Music Leipzig GbR project. The trio MOTUSNEU visits 6 venues across Saxony, conducts conversations with local organizers, and publishes them as short audio documentaries. This site makes that documentation publicly accessible.

## Stack

- **React + Vite** — SPA, static build
- **React Router v7** — client-side routing (`import from "react-router"`)
- **react-leaflet** — interactive map (CartoDB Positron tiles, no API key required)
- **CSS Modules** — component-scoped styles, no CSS framework
- **gray-matter** — Markdown frontmatter parsed at build time via custom Vite plugin
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

## Content Management

All site content lives in `src/content/` as Markdown files with YAML frontmatter. No code changes are needed to add or update content.

### Adding a news item

Create a new file in `src/content/news/` following the naming convention `YYYY-MM-DD-slug.md`:

```markdown
---
type: "event"
title: "Konzert in Dresden"
date: "2026-10-22"
location: "Festspielhaus Hellerau, Dresden"
---

Kurze Beschreibung des Konzerts oder der Neuigkeit.
```

`type` is either `"event"` or `"news"`. Events are displayed with the accent color badge.

### Updating a venue

Venue files are in `src/content/venues/`. Each file maps to one map marker:

```markdown
---
id: "dresden"
name: "Festspielhaus Hellerau"
city: "Dresden"
lat: 51.098
lng: 13.767
weblink: ""
podcast: "/audio/dresden.mp3"
date: "2026-10-22"
concert: "22.10.2026 – Festspielhaus Hellerau, Dresden"
---

Beschreibungstext des Spielorts...
```

MP3 files go in `public/audio/` and are referenced via the `podcast` field.

### Updating legal pages

Edit `src/content/impressum.md` or `src/content/datenschutz.md` directly.

## Project Structure

```
src/
├── components/
│   ├── Navigation/       — sticky header with logo + nav links
│   ├── Hero/             — homepage hero with image + intro text
│   ├── NewsEvents/       — news & event cards grid
│   ├── Map/              — react-leaflet map with DivIcon markers
│   ├── SteckbriefPanel/  — map sidebar: venue list + venue detail + audio player
│   ├── AudioPlayer/      — custom HTML5 audio player
│   └── Footer/           — copyright + legal links
├── pages/
│   ├── Home.jsx
│   ├── MapPage.jsx
│   ├── News.jsx
│   ├── Impressum.jsx
│   └── Datenschutz.jsx
├── content/
│   ├── home.md           — hero title, subtitle, intro text
│   ├── karte.md          — map page intro text
│   ├── impressum.md
│   ├── datenschutz.md
│   ├── venues/           — one .md per venue (6 total)
│   └── news/             — one .md per news item or event
└── hooks/
    └── useMarkdown.js    — useVenues() and useNews() hooks
```
