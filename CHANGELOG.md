# Changelog

All notable changes to Fermenti will be documented in this file.

## [0.1.0] - 2026-03-13

### Foundation Release

> Fermenti is born! Extracted from [Ferment](https://github.com/codeuncodeco/fermenti/tree/master/ferment) (a fermentation recipe PWA), Fermenti is now a standalone Vue 3 + Tailwind CSS UI framework for building rich PWAs.

#### Features

- **27 reusable components** extracted and generalized from the Ferment app
  - Layout: `FiGrid`, `FiNavBar`, `FiSidebar`
  - Navigation: `FiTabs`, `FiStepper`
  - Data Display: `FiCard`, `FiBadge`, `FiAvatar`, `FiProgress`, `FiIcon`, `FiEmptyState`, `FiChangelog`
  - Forms: `FiButton`, `FiInput`, `FiTextarea`, `FiSelect`, `FiToggle`, `FiChip`, `FiSearchBar`, `FiFilterPanel`
  - Feedback: `FiModal`, `FiToast`, `FiCollapsible`
  - Editors: `FiTextEditor`, `FiListEditor`, `FiTagEditor`, `FiMediaPicker`
- **Fermentation-inspired theme** with warm, earthy design tokens (`accent-brine`, `accent-culture`, `accent-ferment`, `accent-aged`)
- **Dark mode** support via CSS class toggle with CSS custom properties
- **Tailwind preset** (`fermenti/theme`) for easy integration
- **Icon system** with 20+ built-in SVG icons and support for Lucide, Heroicons, Material Icons, and Font Awesome
- **Utility modules**: formatting (unit conversion, dates), fuzzy search, localStorage persistence
- **Dual distribution**: CDN drop-in (`<script>` tag) and pnpm/npm package (ES modules)
- **3 demo pages**: Component Showcase, Dashboard mock, Settings mock
- **PWA-ready** patterns: mobile-first responsive design, safe area support, offline-friendly

#### Improvements

- Generalized all components from domain-specific (fermentation) to universal use
- Added prop-driven configuration to all components (variants, sizes, states)
- Components use Vue 3 Options API with inline templates for zero-build-step usage
- Full accessibility support with ARIA attributes and focus management
- CSS custom properties allow runtime theme customization

---

### Lineage: Ferment v1.0 - v1.4

Fermenti's components were extracted from Ferment's development history:

- **Ferment v1.4.0** (2026-03-10) - Error boundaries and crash-proofing
- **Ferment v1.3.0** (2026-03-10) - Cache busting, tool sandboxing, nav icons
- **Ferment v1.2.0** (2026-03-10) - Changelog redesign, contextual navigation
- **Ferment v1.1.2** (2026-03-10) - Equipment management, shelf life display
- **Ferment v1.1.1** (2026-03-10) - OG meta, URL sharing, UI polish
- **Ferment v1.1.0** (2026-03-09) - Wiki system, inline editing, recipe enrichment
- **Ferment v1.0.0** (2026-03-09) - Foundation: 30 recipes, 8 wiki articles, pantry, journal, tools, PWA
