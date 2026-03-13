import FiButton from '../src/components/FiButton.js';
import FiCard from '../src/components/FiCard.js';
import FiChip from '../src/components/FiChip.js';
import FiFilterPanel from '../src/components/FiFilterPanel.js';
import FiSearchBar from '../src/components/FiSearchBar.js';
import FiTabs from '../src/components/FiTabs.js';
import FiToggle from '../src/components/FiToggle.js';
import { builtinIcons, renderIconSVG } from '../src/icons.js';

import ShowcasePage from './showcase.js';
import DashboardPage from './dashboard.js';
import SettingsPage from './settings.js';

const DemoApp = {
  name: 'demo-app',

  data() {
    return {
      currentPage: 'showcase',
      darkMode: false,
      navTabs: [
        { id: 'showcase', label: 'Showcase' },
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'settings', label: 'Settings' },
      ],
    };
  },

  watch: {
    darkMode(val) {
      document.documentElement.classList.toggle('dark', val);
    },
  },

  created() {
    const hash = window.location.hash.slice(1);
    if (['showcase', 'dashboard', 'settings'].includes(hash)) {
      this.currentPage = hash;
    }
  },

  methods: {
    navigate(page) {
      this.currentPage = page;
      window.location.hash = page;
    },
  },

  template: `
    <div class="min-h-screen">
      <!-- Top Header -->
      <header class="sticky top-0 z-30 bg-bg-card/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-bg-secondary dark:border-dark-secondary">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <!-- Brand -->
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-accent-brine rounded-xl flex items-center justify-center">
                <span class="text-white font-serif text-lg font-bold">F</span>
              </div>
              <h1 class="font-serif text-xl text-text-primary dark:text-dark-text">Fermenti <span class="text-text-muted dark:text-dark-text-secondary font-sans text-sm font-normal">UI Demo</span></h1>
            </div>

            <!-- Nav Tabs -->
            <nav class="hidden sm:block">
              <fi-tabs :tabs="navTabs" :model-value="currentPage" @update:model-value="navigate" variant="underline" />
            </nav>

            <!-- Dark mode toggle -->
            <div class="flex items-center gap-3">
              <button
                @click="darkMode = !darkMode"
                class="p-2 rounded-xl hover:bg-bg-secondary dark:hover:bg-dark-secondary transition-colors"
                :aria-label="darkMode ? 'Switch to light mode' : 'Switch to dark mode'"
              >
                <svg v-if="!darkMode" class="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <svg v-else class="w-5 h-5 text-dark-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile nav -->
        <div class="sm:hidden px-4 pb-2">
          <fi-tabs :tabs="navTabs" :model-value="currentPage" @update:model-value="navigate" variant="pills" />
        </div>
      </header>

      <!-- Page content -->
      <main>
        <showcase-page v-if="currentPage === 'showcase'" />
        <dashboard-page v-if="currentPage === 'dashboard'" />
        <settings-page v-if="currentPage === 'settings'" />
      </main>

      <!-- Footer -->
      <footer class="border-t border-bg-secondary dark:border-dark-secondary mt-16 py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p class="text-sm text-text-muted dark:text-dark-text-secondary">
            Fermenti UI Framework &middot; Built with Vue 3 + Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  `,
};

const { createApp } = Vue;
const app = createApp(DemoApp);

// Register framework components
app.component('fi-button', FiButton);
app.component('fi-card', FiCard);
app.component('fi-chip', FiChip);
app.component('fi-filter-panel', FiFilterPanel);
app.component('fi-search-bar', FiSearchBar);
app.component('fi-tabs', FiTabs);
app.component('fi-toggle', FiToggle);

// Register demo page components
app.component('showcase-page', ShowcasePage);
app.component('dashboard-page', DashboardPage);
app.component('settings-page', SettingsPage);

// Provide icons globally
app.provide('builtinIcons', builtinIcons);
app.provide('renderIconSVG', renderIconSVG);

app.mount('#app');
