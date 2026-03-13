# Fermenti

**A fermentation-inspired Vue 3 + Tailwind CSS UI framework for building rich PWAs.**

> Warm, earthy, and full of culture. Fermenti gives your apps the patience of a slow ferment and the punch of a well-aged hot sauce.

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883.svg)](https://vuejs.org/)

---

## Quick Start

### CDN (Zero Build Step)

Drop these into any HTML file and start building:

```html
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300..700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          bg: { primary: '#FAF7F2', secondary: '#F2ECE3', card: '#FFFFFF' },
          text: { primary: '#2C1810', secondary: '#6B5344', muted: '#A89485' },
          accent: { brine: '#C4A35A', ferment: '#D4553A', culture: '#7B8F3A', aged: '#8B6B4A' },
          tier: { beginner: '#8EAE68', seasoned: '#C4A35A', ambitious: '#D4813A', advanced: '#D4553A', master: '#6B3A5C' },
          dark: { primary: '#1A1410', secondary: '#241E18', card: '#2E2620', text: '#F2ECE3', 'text-secondary': '#C4B5A3' }
        },
        fontFamily: {
          serif: ['"Instrument Serif"', 'Georgia', 'serif'],
          sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
          mono: ['"JetBrains Mono"', 'monospace'],
        },
        transitionTimingFunction: { ferment: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      }
    }
  }
</script>

<!-- Vue 3 -->
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>

<!-- Fermenti CSS -->
<link rel="stylesheet" href="path/to/fermenti.css">

<!-- Fermenti Components (load as modules) -->
<script type="module">
  import FiButton from './fermenti/src/components/FiButton.js';
  import FiCard from './fermenti/src/components/FiCard.js';
  // ... import what you need

  const app = Vue.createApp({ /* your app */ });
  app.component('fi-button', FiButton);
  app.component('fi-card', FiCard);
  app.mount('#app');
</script>
```

### pnpm / npm

```bash
pnpm add fermenti
# or
npm install fermenti
```

```js
import { createApp } from 'vue';
import Fermenti from 'fermenti';
import 'fermenti/css';

const app = createApp(App);
app.use(Fermenti);  // Registers all Fi* components globally
app.mount('#app');
```

Add the Fermenti Tailwind preset to your `tailwind.config.js`:

```js
module.exports = {
  presets: [require('fermenti/theme')],
  // your config...
}
```

---

## Components

Fermenti ships **27 components**, all prefixed with `Fi`:

### Layout & Navigation

| Component | Description |
|-----------|-------------|
| `<fi-grid>` | Responsive grid with configurable columns and gap |
| `<fi-nav-bar>` | Top or bottom navigation bar with brand and items |
| `<fi-sidebar>` | Collapsible sidebar with nested navigation items |
| `<fi-tabs>` | Tab navigation with underline, pills, or segment variants |
| `<fi-stepper>` | Multi-step wizard with progress dots and back/next |

### Data Display

| Component | Description |
|-----------|-------------|
| `<fi-card>` | Versatile card with card/list view modes and slots |
| `<fi-badge>` | Status badge with color variants (success, warning, danger, etc.) |
| `<fi-avatar>` | Circle avatar with image or initials fallback |
| `<fi-progress>` | Animated progress bar with label and value display |
| `<fi-icon>` | Universal icon wrapper (built-in + Lucide/Heroicons/Material/FA) |
| `<fi-empty-state>` | Placeholder for empty content areas |
| `<fi-changelog>` | Release notes viewer with expandable sections |

### Forms & Inputs

| Component | Description |
|-----------|-------------|
| `<fi-button>` | Button with primary/secondary/ghost/danger variants and sizes |
| `<fi-input>` | Text input with label, validation, and icon support |
| `<fi-textarea>` | Auto-resizing textarea with character count |
| `<fi-select>` | Styled select dropdown |
| `<fi-toggle>` | Toggle switch with label and description |
| `<fi-chip>` | Selectable chip/tag pill |
| `<fi-search-bar>` | Debounced search input with clear button |
| `<fi-filter-panel>` | Multi-faceted filter panel with collapsible groups |

### Feedback & Overlays

| Component | Description |
|-----------|-------------|
| `<fi-modal>` | Modal dialog with backdrop blur and size variants |
| `<fi-toast>` | Toast notification system with auto-dismiss |
| `<fi-collapsible>` | Expandable/collapsible content section |

### Editors

| Component | Description |
|-----------|-------------|
| `<fi-text-editor>` | Inline text editing with save/cancel and auto-grow |
| `<fi-list-editor>` | Drag-to-reorder list editor with add/remove |
| `<fi-tag-editor>` | Tag input with typeahead suggestions |
| `<fi-media-picker>` | File upload with drag-and-drop, camera, and URL input |

---

## Theme

Fermenti's design language is inspired by the fermentation process: warm, earthy, and natural.

### Color Palette

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `bg-primary` | `#FAF7F2` (cream) | `#1A1410` | Page background |
| `bg-secondary` | `#F2ECE3` | `#241E18` | Secondary surfaces |
| `bg-card` | `#FFFFFF` | `#2E2620` | Card backgrounds |
| `accent-brine` | `#C4A35A` (golden) | same | Primary accent |
| `accent-ferment` | `#D4553A` (red) | same | Danger / emphasis |
| `accent-culture` | `#7B8F3A` (green) | same | Success / growth |
| `accent-aged` | `#8B6B4A` (brown) | same | Neutral / aged |

### Typography

- **Serif**: Instrument Serif (headings, display text)
- **Sans**: DM Sans (body text, UI elements)
- **Mono**: JetBrains Mono (code, data)

### Customizing Colors

Override CSS custom properties at runtime:

```css
:root {
  --fi-accent-brine: #your-primary-color;
  --fi-accent-culture: #your-success-color;
  --fi-bg-primary: #your-background;
}
```

---

## Icons & Fonts

### Built-in Icons

Fermenti includes 20+ essential SVG icons (search, close, chevron, check, plus, minus, settings, filter, menu, grid, list, edit, trash, download, upload, link, star, info, warning, eye).

```html
<fi-icon name="search" size="md"></fi-icon>
<fi-icon name="settings" size="lg"></fi-icon>
```

### Adding Icon Libraries

Fermenti's `<fi-icon>` supports external icon libraries. Just load the library's CSS/JS and specify the library prop:

**Lucide Icons:**
```html
<script src="https://unpkg.com/lucide@latest"></script>
<fi-icon name="heart" library="lucide"></fi-icon>
```

**Heroicons:**
```html
<fi-icon name="heart" library="heroicons"></fi-icon>
```

**Material Icons:**
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<fi-icon name="favorite" library="material"></fi-icon>
```

**Font Awesome:**
```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
<fi-icon name="heart" library="fontawesome"></fi-icon>
```

### Changing Fonts

Override in your Tailwind config:

```js
theme: {
  extend: {
    fontFamily: {
      serif: ['"Your Serif Font"', 'Georgia', 'serif'],
      sans: ['"Your Sans Font"', 'system-ui', 'sans-serif'],
    }
  }
}
```

---

## Utilities

### FermentiFormat

Unit conversion, date formatting, and display helpers:

```js
import FermentiFormat from 'fermenti/src/utils/formatting.js';

FermentiFormat.convertUnit(100, 'g', 'oz');     // 3.5274
FermentiFormat.formatDate('2026-03-13');          // "Mar 13, 2026"
FermentiFormat.formatRelativeDate('2026-03-12'); // "Yesterday"
FermentiFormat.uid();                             // "m1abc2def3"
```

### FermentiSearch

Fuzzy full-text search:

```js
import FermentiSearch from 'fermenti/src/utils/search.js';

const index = FermentiSearch.buildIndex(items, ['name', 'description', 'tags']);
const results = FermentiSearch.search('query', index);
```

### FermentiStore

localStorage persistence with migrations and export/import:

```js
import { createStore } from 'fermenti/src/utils/store.js';

const store = createStore('myapp_v1', () => ({
  settings: { theme: 'light' },
  data: [],
}));

const state = store.load();
store.save(state);
store.exportJSON(state);  // Downloads backup
```

---

## Dark Mode

Toggle dark mode by adding/removing the `dark` class on `<html>`:

```js
document.documentElement.classList.toggle('dark');
```

All Fermenti components automatically adapt to dark mode.

---

## Demos

Run the demos locally:

```bash
# Clone the repo
git clone https://github.com/codeuncodeco/fermenti.git
cd fermenti

# Option 1: Simple HTTP server
python3 -m http.server 8000
# Open http://localhost:8000/demo/

# Option 2: Vite dev server
pnpm install
pnpm run dev
```

### Demo Pages

- **Component Showcase** - Every component with prop variations
- **Dashboard Demo** - Mock analytics dashboard
- **Settings Demo** - Mock app settings page

---

## Project Structure

```
fermenti/
├── src/                          # Framework source
│   ├── index.js                  # Main entry - exports all components
│   ├── plugin.js                 # Vue plugin for app.use()
│   ├── theme.js                  # Tailwind preset
│   ├── icons.js                  # Built-in icon set
│   ├── css/fermenti.css          # Framework styles
│   ├── components/               # 23 UI components
│   │   ├── FiButton.js
│   │   ├── FiCard.js
│   │   ├── FiSearchBar.js
│   │   ├── ... (20 more)
│   │   └── editors/              # 4 editor components
│   │       ├── FiTextEditor.js
│   │       ├── FiListEditor.js
│   │       ├── FiTagEditor.js
│   │       └── FiMediaPicker.js
│   └── utils/
│       ├── formatting.js         # Unit/date formatting
│       ├── search.js             # Fuzzy search engine
│       └── store.js              # localStorage wrapper
├── demo/                         # Demo pages
│   ├── index.html
│   ├── app.js
│   ├── showcase.js
│   ├── dashboard.js
│   └── settings.js
├── ferment/                      # Original Ferment app (preserved)
├── dist/                         # Built output
├── package.json
├── vite.config.js
├── CHANGELOG.md
└── LICENSE
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-component`)
3. Commit your changes (`git commit -m 'Add amazing component'`)
4. Push to the branch (`git push origin feature/amazing-component`)
5. Open a Pull Request

### For AI Agents

- Components use Vue 3 Options API with inline `template` strings
- No build step needed for development - load files directly
- Follow the `Fi` prefix naming convention
- Use Tailwind classes from the Fermenti theme
- Always include dark mode variants (`dark:`)
- Add proper ARIA attributes for accessibility

---

## Credits

Fermenti was extracted from [Ferment](https://github.com/codeuncodeco/fermenti/tree/master/ferment), a cultural guide to lactic acid fermentation. The warm, earthy design language and component patterns were born from building a real-world PWA and then generalized into a reusable framework.

Made with salt, patience, and good bacteria.

---

## License

[GNU General Public License v3.0](LICENSE)
