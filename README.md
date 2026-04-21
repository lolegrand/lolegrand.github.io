# lolegrand.github.io — Personal Portfolio

A minimal, single-page portfolio built with plain HTML, CSS, and JavaScript. No frameworks, no build tools, no dependencies.

Live at **[lolegrand.github.io](https://lolegrand.github.io)**

## Stack

- HTML5 / CSS3 / Vanilla JS
- Inter font via Google Fonts
- Hosted on GitHub Pages

## Features

- Scroll-triggered reveal animations (Intersection Observer)
- Responsive layout with mobile hamburger navigation
- Monochrome design using CSS custom properties
- Respects `prefers-reduced-motion`

## Structure

```
index.html   — single-page markup
styles.css   — all styling, mobile-first
script.js    — reveal animations + nav toggle
```

## Sections

Hero · Experience · Skills · Education · Projects · Certifications

## Development

No build step. Open `index.html` directly in a browser, or serve locally:

```bash
npx serve .
```

Pushing to `main` deploys automatically via GitHub Pages.
