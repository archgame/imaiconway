# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website for Studio Imai Conway, an architecture practice. Hosted on GitHub Pages at www.imaiconway.com. No build tools, frameworks, or package managers — pure HTML/CSS/JS.

## Development

No build step required. Open `index.html` directly in a browser, or use any static file server:

```bash
python -m http.server 8000
# or
npx serve .
```

Deploy by pushing to the `main` branch — GitHub Pages auto-deploys.

## Architecture

**Content is data-driven via CSV files:**
- `drips.csv` — Projects (year, title, URL columns)
- `drops.csv` — Research/publications (same format)

**`script.js`** fetches and parses these CSVs at runtime, groups entries by year (descending), and injects them into `#drips-container` and `#drops-container` in `index.html`. All links open in new tabs.

**To add or update content**, edit the CSV files directly — no JS changes needed.

**Layout** is a two-column flex grid (desktop) that collapses to single column below 1024px. Styling is in `styles.css` with a black background (#000) and light gray text (#F4F4F4).
