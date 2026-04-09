# Manajith — Game Designer Portfolio

A stunning, single-page portfolio website built to showcase game design projects and land interviews.

## Getting Started

This is a static website — no build tools or dependencies required. Just open it in a browser:

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a local server (recommended for best experience)
npx serve .
# or
python3 -m http.server 8000
```

## Customization

- **Projects**: Edit the `.project-card` sections in `index.html` to add your real projects. Replace the SVG placeholders with actual screenshots.
- **About**: Update the bio text, stats, and avatar in the About section.
- **Contact**: Replace `manajith@example.com` and social links with your real contact info.
- **Colors**: All colors are CSS variables in `:root` — easy to re-theme.
- **Fonts**: Uses Google Fonts (Orbitron, Rajdhani, Space Mono) — swap in `<head>`.

## Deployment

Upload the three files (`index.html`, `styles.css`, `script.js`) to any static host:

- **GitHub Pages**: Push to a repo and enable Pages in settings
- **Netlify / Vercel**: Drag-and-drop the folder
- **Custom domain**: Point DNS to your host

## Structure

```
├── index.html    # Page structure and content
├── styles.css    # All styling, animations, responsive design
├── script.js     # Particles, scroll animations, interactivity
└── README.md     # This file
```
