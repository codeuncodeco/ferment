/**
 * Fermenti - Built-in Icon Set & Library Support
 * Lightweight SVG icon system with optional external library integration
 */

/**
 * Built-in icon definitions
 * Each icon: { viewBox: string, paths: string }
 * The `paths` value is the `d` attribute for an SVG <path> element.
 */
export const builtinIcons = {
  search: {
    viewBox: '0 0 24 24',
    paths: 'M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z',
  },
  close: {
    viewBox: '0 0 24 24',
    paths: 'M18 6L6 18M6 6l12 12',
  },
  'chevron-down': {
    viewBox: '0 0 24 24',
    paths: 'M6 9l6 6 6-6',
  },
  'chevron-right': {
    viewBox: '0 0 24 24',
    paths: 'M9 18l6-6-6-6',
  },
  'chevron-left': {
    viewBox: '0 0 24 24',
    paths: 'M15 18l-6-6 6-6',
  },
  check: {
    viewBox: '0 0 24 24',
    paths: 'M20 6L9 17l-5-5',
  },
  plus: {
    viewBox: '0 0 24 24',
    paths: 'M12 5v14M5 12h14',
  },
  minus: {
    viewBox: '0 0 24 24',
    paths: 'M5 12h14',
  },
  settings: {
    viewBox: '0 0 24 24',
    paths: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
  },
  filter: {
    viewBox: '0 0 24 24',
    paths: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  },
  menu: {
    viewBox: '0 0 24 24',
    paths: 'M3 12h18M3 6h18M3 18h18',
  },
  grid: {
    viewBox: '0 0 24 24',
    paths: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  },
  list: {
    viewBox: '0 0 24 24',
    paths: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  },
  edit: {
    viewBox: '0 0 24 24',
    paths: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
  },
  trash: {
    viewBox: '0 0 24 24',
    paths: 'M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6',
  },
  download: {
    viewBox: '0 0 24 24',
    paths: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
  },
  upload: {
    viewBox: '0 0 24 24',
    paths: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12',
  },
  link: {
    viewBox: '0 0 24 24',
    paths: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  },
  star: {
    viewBox: '0 0 24 24',
    paths: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  },
  info: {
    viewBox: '0 0 24 24',
    paths: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 16v-4M12 8h.01',
  },
  warning: {
    viewBox: '0 0 24 24',
    paths: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01',
  },
  eye: {
    viewBox: '0 0 24 24',
    paths: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  },
  'eye-off': {
    viewBox: '0 0 24 24',
    paths: 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22',
  },
};

/**
 * Retrieve a built-in icon by name.
 * @param {string} name - Icon name (e.g. 'search', 'chevron-down')
 * @returns {{ viewBox: string, paths: string } | undefined}
 */
export function getIcon(name) {
  return builtinIcons[name];
}

/**
 * List all available built-in icon names.
 * @returns {string[]}
 */
export function listIcons() {
  return Object.keys(builtinIcons);
}

/**
 * Render an icon to an SVG string.
 * @param {string} name - Icon name
 * @param {object} [opts] - Options
 * @param {number} [opts.size=24] - Width and height in pixels
 * @param {string} [opts.className=''] - CSS class(es) to apply
 * @param {string} [opts.stroke='currentColor'] - Stroke color
 * @param {number} [opts.strokeWidth=2] - Stroke width
 * @returns {string} SVG markup string, or empty string if icon not found
 */
export function renderIconSVG(name, opts = {}) {
  const icon = builtinIcons[name];
  if (!icon) return '';

  const {
    size = 24,
    className = '',
    stroke = 'currentColor',
    strokeWidth = 2,
  } = opts;

  const classAttr = className ? ` class="${className}"` : '';

  // Split paths on M to handle multi-path icons rendered as single d string
  return `<svg${classAttr} xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${icon.viewBox}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="${icon.paths}"/></svg>`;
}

/**
 * Icon library detection helpers.
 * These allow the framework to detect and interoperate with popular icon libraries.
 */

/**
 * Check if Lucide icons are available in the environment.
 * @returns {boolean}
 */
export function hasLucide() {
  return typeof window !== 'undefined' && typeof window.lucide !== 'undefined';
}

/**
 * Check if Heroicons are available (via a global or common module).
 * @returns {boolean}
 */
export function hasHeroicons() {
  return typeof window !== 'undefined' && typeof window.heroicons !== 'undefined';
}

/**
 * Check if Font Awesome is loaded.
 * @returns {boolean}
 */
export function hasFontAwesome() {
  if (typeof document === 'undefined') return false;
  const faStylesheet = document.querySelector('link[href*="font-awesome"], link[href*="fontawesome"]');
  const faScript = document.querySelector('script[src*="font-awesome"], script[src*="fontawesome"]');
  return !!(faStylesheet || faScript);
}

/**
 * Detect which icon libraries are available.
 * @returns {{ lucide: boolean, heroicons: boolean, fontAwesome: boolean }}
 */
export function detectIconLibraries() {
  return {
    lucide: hasLucide(),
    heroicons: hasHeroicons(),
    fontAwesome: hasFontAwesome(),
  };
}

export default builtinIcons;
