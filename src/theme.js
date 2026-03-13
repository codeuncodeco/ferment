/**
 * Fermenti - Tailwind CSS Preset
 * Fermentation-inspired design tokens
 */
const fermentiPreset = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--fi-bg-primary, #FAF7F2)',
          secondary: 'var(--fi-bg-secondary, #F2ECE3)',
          card: 'var(--fi-bg-card, #FFFFFF)',
        },
        text: {
          primary: 'var(--fi-text-primary, #2C1810)',
          secondary: 'var(--fi-text-secondary, #6B5344)',
          muted: 'var(--fi-text-muted, #A89485)',
        },
        accent: {
          brine: 'var(--fi-accent-brine, #C4A35A)',
          ferment: 'var(--fi-accent-ferment, #D4553A)',
          culture: 'var(--fi-accent-culture, #7B8F3A)',
          aged: 'var(--fi-accent-aged, #8B6B4A)',
        },
        tier: {
          beginner: 'var(--fi-tier-beginner, #8EAE68)',
          seasoned: 'var(--fi-tier-seasoned, #C4A35A)',
          ambitious: 'var(--fi-tier-ambitious, #D4813A)',
          advanced: 'var(--fi-tier-advanced, #D4553A)',
          master: 'var(--fi-tier-master, #6B3A5C)',
        },
        dark: {
          primary: '#1A1410',
          secondary: '#241E18',
          card: '#2E2620',
          text: '#F2ECE3',
          'text-secondary': '#C4B5A3',
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl': '16px',
        xl: '12px',
      },
      boxShadow: {
        warm: 'none',
        'warm-lg': 'none',
        'warm-xl': 'none',
      },
      transitionTimingFunction: {
        ferment: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
};

export default fermentiPreset;
