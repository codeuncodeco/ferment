/**
 * Fermenti UI - Component Showcase Page
 * Demonstrates every component in the framework
 */

export default {
  name: 'showcase-page',

  data() {
    return {
      // Tabs demos
      tabVariantUnderline: 'tab1',
      tabVariantPills: 'tab1',
      tabVariantSegment: 'tab1',
      demoTabs: [
        { id: 'tab1', label: 'First Tab' },
        { id: 'tab2', label: 'Second Tab' },
        { id: 'tab3', label: 'Third Tab' },
      ],

      // Chip demos
      selectedChips: { sauerkraut: true, kimchi: false, kombucha: true, miso: false, tempeh: false },

      // Toggle demos
      toggleNotifications: true,
      toggleNewsletter: false,
      toggleDarkMode: false,

      // Search demo
      searchQuery: '',

      // Filter demo
      filterValues: { category: [], difficulty: [], time: 60 },
      filterGroups: [
        {
          id: 'category',
          label: 'Category',
          type: 'checkbox',
          expanded: true,
          options: [
            { id: 'vegetables', label: 'Vegetables', emoji: '\uD83E\uDD66' },
            { id: 'dairy', label: 'Dairy', emoji: '\uD83E\uDDC0' },
            { id: 'grains', label: 'Grains', emoji: '\uD83C\uDF3E' },
            { id: 'beverages', label: 'Beverages', emoji: '\uD83C\uDF75' },
          ],
        },
        {
          id: 'difficulty',
          label: 'Difficulty',
          type: 'checkbox',
          expanded: true,
          options: [
            { id: 'beginner', label: 'Beginner' },
            { id: 'intermediate', label: 'Intermediate' },
            { id: 'advanced', label: 'Advanced' },
          ],
        },
        {
          id: 'time',
          label: 'Prep Time',
          type: 'range',
          min: 5,
          max: 120,
          rangeLabel: 'Minutes',
          expanded: true,
        },
      ],

      // Modal demo
      showModal: false,

      // Toast demo
      toasts: [],
      toastId: 0,

      // Collapsible demo
      collapsibleOpen: { faq1: false, faq2: false, faq3: false },

      // Stepper demo
      stepperCurrent: 0,

      // Progress demo
      progressValue: 65,

      // Icon grid
      iconNames: [
        'search', 'close', 'chevron-down', 'chevron-right', 'chevron-left',
        'check', 'plus', 'minus', 'settings', 'filter',
        'menu', 'grid', 'list', 'edit', 'trash',
        'download', 'upload', 'link', 'star', 'info',
        'warning', 'eye', 'eye-off',
      ],
    };
  },

  inject: {
    builtinIcons: { from: 'builtinIcons', default: () => ({}) },
    renderIconSVG: { from: 'renderIconSVG', default: () => () => '' },
  },

  methods: {
    toggleChip(key) {
      this.selectedChips[key] = !this.selectedChips[key];
    },

    showToast(type) {
      const messages = {
        success: 'Fermentation started successfully!',
        warning: 'Temperature is rising above optimal range.',
        danger: 'Culture contamination detected!',
        info: 'New batch ready for review.',
      };
      const id = ++this.toastId;
      this.toasts.push({ id, type, message: messages[type] || messages.info });
      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t.id !== id);
      }, 3000);
    },

    toggleCollapsible(key) {
      this.collapsibleOpen[key] = !this.collapsibleOpen[key];
    },

    getIconSVG(name) {
      return this.renderIconSVG(name, { size: 20, className: '' });
    },

    toastColorClass(type) {
      const map = {
        success: 'bg-accent-culture text-white',
        warning: 'bg-accent-brine text-white',
        danger: 'bg-accent-ferment text-white',
        info: 'bg-accent-aged text-white',
      };
      return map[type] || map.info;
    },
  },

  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <!-- Page Title -->
      <div class="text-center space-y-3">
        <h1 class="font-serif text-4xl sm:text-5xl text-text-primary dark:text-dark-text">Component Showcase</h1>
        <p class="text-text-secondary dark:text-dark-text-secondary text-lg max-w-2xl mx-auto">
          A comprehensive tour of every Fermenti UI component, organized by category.
        </p>
      </div>

      <!-- ==================== BUTTONS ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Buttons</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">FiButton supports primary, secondary, ghost, and danger variants in three sizes.</p>

        <div class="space-y-4">
          <!-- Variants -->
          <div class="flex flex-wrap items-center gap-3">
            <fi-button variant="primary">Primary</fi-button>
            <fi-button variant="secondary">Secondary</fi-button>
            <fi-button variant="ghost">Ghost</fi-button>
            <fi-button variant="danger">Danger</fi-button>
          </div>

          <!-- Sizes -->
          <div class="flex flex-wrap items-center gap-3">
            <fi-button size="sm">Small</fi-button>
            <fi-button size="md">Medium</fi-button>
            <fi-button size="lg">Large</fi-button>
          </div>

          <!-- States -->
          <div class="flex flex-wrap items-center gap-3">
            <fi-button :loading="true">Loading</fi-button>
            <fi-button :disabled="true">Disabled</fi-button>
          </div>
        </div>
      </section>

      <!-- ==================== CARDS ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Cards</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">FiCard provides card, list, and table display modes with optional hover effects.</p>

        <!-- Card mode -->
        <h3 class="font-medium text-sm text-text-muted dark:text-dark-text-secondary uppercase tracking-wide">Card Mode</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <fi-card :hoverable="true">
            <template #media>
              <div class="h-40 bg-gradient-to-br from-accent-brine/30 to-accent-culture/30 flex items-center justify-center">
                <span class="text-4xl">🫙</span>
              </div>
            </template>
            <template #header>
              <h3 class="font-serif text-lg text-text-primary dark:text-dark-text">Sauerkraut</h3>
            </template>
            <p class="text-sm text-text-secondary dark:text-dark-text-secondary">Classic fermented cabbage with caraway seeds and a tangy bite.</p>
            <template #footer>
              <div class="flex items-center justify-between">
                <span class="text-xs text-text-muted">4-6 weeks</span>
                <fi-button size="sm" variant="ghost">View Recipe</fi-button>
              </div>
            </template>
          </fi-card>

          <fi-card :hoverable="true">
            <template #media>
              <div class="h-40 bg-gradient-to-br from-accent-ferment/30 to-accent-brine/30 flex items-center justify-center">
                <span class="text-4xl">🥬</span>
              </div>
            </template>
            <template #header>
              <h3 class="font-serif text-lg text-text-primary dark:text-dark-text">Kimchi</h3>
            </template>
            <p class="text-sm text-text-secondary dark:text-dark-text-secondary">Spicy Korean fermented vegetables with gochugaru and fish sauce.</p>
            <template #footer>
              <div class="flex items-center justify-between">
                <span class="text-xs text-text-muted">1-2 weeks</span>
                <fi-button size="sm" variant="ghost">View Recipe</fi-button>
              </div>
            </template>
          </fi-card>

          <fi-card :hoverable="true">
            <template #media>
              <div class="h-40 bg-gradient-to-br from-accent-culture/30 to-accent-aged/30 flex items-center justify-center">
                <span class="text-4xl">🍶</span>
              </div>
            </template>
            <template #header>
              <h3 class="font-serif text-lg text-text-primary dark:text-dark-text">Kombucha</h3>
            </template>
            <p class="text-sm text-text-secondary dark:text-dark-text-secondary">Effervescent probiotic tea fermented with a SCOBY culture.</p>
            <template #footer>
              <div class="flex items-center justify-between">
                <span class="text-xs text-text-muted">7-14 days</span>
                <fi-button size="sm" variant="ghost">View Recipe</fi-button>
              </div>
            </template>
          </fi-card>
        </div>

        <!-- List mode -->
        <h3 class="font-medium text-sm text-text-muted dark:text-dark-text-secondary uppercase tracking-wide mt-8">List Mode</h3>
        <div class="space-y-2">
          <fi-card mode="list" :hoverable="true">
            <template #header>
              <div class="w-10 h-10 rounded-xl bg-accent-brine/20 flex items-center justify-center text-lg flex-shrink-0">🫙</div>
            </template>
            <div>
              <h4 class="font-medium text-text-primary dark:text-dark-text">Sauerkraut Batch #12</h4>
              <p class="text-sm text-text-muted dark:text-dark-text-secondary">Started 3 days ago</p>
            </div>
          </fi-card>
          <fi-card mode="list" :hoverable="true">
            <template #header>
              <div class="w-10 h-10 rounded-xl bg-accent-ferment/20 flex items-center justify-center text-lg flex-shrink-0">🥬</div>
            </template>
            <div>
              <h4 class="font-medium text-text-primary dark:text-dark-text">Kimchi Batch #8</h4>
              <p class="text-sm text-text-muted dark:text-dark-text-secondary">Ready to eat</p>
            </div>
          </fi-card>
          <fi-card mode="list" :hoverable="true">
            <template #header>
              <div class="w-10 h-10 rounded-xl bg-accent-culture/20 flex items-center justify-center text-lg flex-shrink-0">🍶</div>
            </template>
            <div>
              <h4 class="font-medium text-text-primary dark:text-dark-text">Kombucha - Ginger Lemon</h4>
              <p class="text-sm text-text-muted dark:text-dark-text-secondary">2nd fermentation, day 2</p>
            </div>
          </fi-card>
        </div>

        <!-- Table mode -->
        <h3 class="font-medium text-sm text-text-muted dark:text-dark-text-secondary uppercase tracking-wide mt-8">Table Mode</h3>
        <div class="bg-bg-card dark:bg-dark-card rounded-2xl shadow-warm border border-bg-secondary dark:border-dark-secondary overflow-hidden">
          <div class="grid grid-cols-4 gap-4 px-4 py-2.5 text-xs font-medium text-text-muted dark:text-dark-text-secondary uppercase tracking-wide border-b border-bg-secondary dark:border-dark-secondary">
            <span>Name</span>
            <span>Status</span>
            <span>Duration</span>
            <span>Temp</span>
          </div>
          <fi-card mode="table" :hoverable="true">
            <div class="grid grid-cols-4 gap-4">
              <span class="font-medium">Sauerkraut</span>
              <span class="inline-flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-accent-culture"></span> Active</span>
              <span>Day 12</span>
              <span>68&deg;F</span>
            </div>
          </fi-card>
          <fi-card mode="table" :hoverable="true">
            <div class="grid grid-cols-4 gap-4">
              <span class="font-medium">Kimchi</span>
              <span class="inline-flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-accent-brine"></span> Aging</span>
              <span>Day 28</span>
              <span>55&deg;F</span>
            </div>
          </fi-card>
          <fi-card mode="table" :hoverable="true">
            <div class="grid grid-cols-4 gap-4">
              <span class="font-medium">Kombucha</span>
              <span class="inline-flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-accent-ferment"></span> Bottled</span>
              <span>Day 7</span>
              <span>75&deg;F</span>
            </div>
          </fi-card>
        </div>
      </section>

      <!-- ==================== BADGES ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Badges</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">Inline status indicators using the tier badge CSS classes from fermenti.css.</p>

        <div class="flex flex-wrap gap-3">
          <span class="fi-tier-badge beginner">Beginner</span>
          <span class="fi-tier-badge seasoned">Seasoned</span>
          <span class="fi-tier-badge ambitious">Ambitious</span>
          <span class="fi-tier-badge advanced">Advanced</span>
          <span class="fi-tier-badge master">Master</span>
        </div>

        <div class="flex flex-wrap gap-3">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-accent-culture/15 text-accent-culture">Active</span>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-accent-brine/15 text-accent-brine">Pending</span>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-accent-ferment/15 text-accent-ferment">Danger</span>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-accent-aged/15 text-accent-aged">Aged</span>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Info</span>
        </div>
      </section>

      <!-- ==================== AVATARS ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Avatars</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">Avatar circles with initials or images in multiple sizes.</p>

        <div class="flex items-end gap-4">
          <div class="w-8 h-8 rounded-full bg-accent-brine text-white flex items-center justify-center text-xs font-medium">SM</div>
          <div class="w-10 h-10 rounded-full bg-accent-culture text-white flex items-center justify-center text-sm font-medium">MD</div>
          <div class="w-12 h-12 rounded-full bg-accent-ferment text-white flex items-center justify-center text-base font-medium">LG</div>
          <div class="w-16 h-16 rounded-full bg-accent-aged text-white flex items-center justify-center text-lg font-medium">XL</div>
        </div>

        <!-- Avatar group -->
        <div class="flex -space-x-3">
          <div class="w-10 h-10 rounded-full bg-accent-brine text-white flex items-center justify-center text-sm font-medium ring-2 ring-bg-card dark:ring-dark-card">AB</div>
          <div class="w-10 h-10 rounded-full bg-accent-culture text-white flex items-center justify-center text-sm font-medium ring-2 ring-bg-card dark:ring-dark-card">CD</div>
          <div class="w-10 h-10 rounded-full bg-accent-ferment text-white flex items-center justify-center text-sm font-medium ring-2 ring-bg-card dark:ring-dark-card">EF</div>
          <div class="w-10 h-10 rounded-full bg-accent-aged text-white flex items-center justify-center text-sm font-medium ring-2 ring-bg-card dark:ring-dark-card">GH</div>
          <div class="w-10 h-10 rounded-full bg-bg-secondary dark:bg-dark-secondary text-text-muted flex items-center justify-center text-xs font-medium ring-2 ring-bg-card dark:ring-dark-card">+5</div>
        </div>
      </section>

      <!-- ==================== PROGRESS ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Progress Bars</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">Progress indicators using the fi-progress CSS classes.</p>

        <div class="space-y-4 max-w-lg">
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-text-secondary dark:text-dark-text-secondary">Fermentation Progress</span>
              <span class="font-medium text-accent-brine">{{ progressValue }}%</span>
            </div>
            <div class="fi-progress">
              <div class="fi-progress-bar" :style="{ width: progressValue + '%' }"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-text-secondary dark:text-dark-text-secondary">Goal Reached</span>
              <span class="font-medium text-green-600">100%</span>
            </div>
            <div class="fi-progress">
              <div class="fi-progress-bar fi-success" style="width: 100%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-text-secondary dark:text-dark-text-secondary">Temperature Warning</span>
              <span class="font-medium text-amber-600">82%</span>
            </div>
            <div class="fi-progress">
              <div class="fi-progress-bar fi-warning" style="width: 82%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-text-secondary dark:text-dark-text-secondary">Critical Alert</span>
              <span class="font-medium text-red-600">45%</span>
            </div>
            <div class="fi-progress">
              <div class="fi-progress-bar fi-danger" style="width: 45%"></div>
            </div>
          </div>

          <div class="pt-2">
            <label class="text-sm text-text-muted dark:text-dark-text-secondary">Adjust progress: {{ progressValue }}%</label>
            <input type="range" v-model.number="progressValue" min="0" max="100" class="fi-range w-full mt-1" />
          </div>
        </div>
      </section>

      <!-- ==================== ICONS ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Icons</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">Built-in SVG icon set. {{ iconNames.length }} icons included.</p>

        <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          <div
            v-for="name in iconNames"
            :key="name"
            class="flex flex-col items-center gap-2 p-3 rounded-xl bg-bg-card dark:bg-dark-card border border-bg-secondary dark:border-dark-secondary hover:border-accent-brine/50 transition-colors"
          >
            <span class="text-text-primary dark:text-dark-text" v-html="getIconSVG(name)"></span>
            <span class="text-[10px] text-text-muted dark:text-dark-text-secondary truncate w-full text-center">{{ name }}</span>
          </div>
        </div>
      </section>

      <!-- ==================== TABS ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Tabs</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">FiTabs with underline, pills, and segment variants.</p>

        <div class="space-y-8">
          <!-- Underline -->
          <div class="space-y-3">
            <h3 class="font-medium text-sm text-text-muted dark:text-dark-text-secondary uppercase tracking-wide">Underline</h3>
            <fi-tabs :tabs="demoTabs" v-model="tabVariantUnderline" variant="underline" />
            <div class="p-4 bg-bg-card dark:bg-dark-card rounded-xl border border-bg-secondary dark:border-dark-secondary">
              <p class="text-sm text-text-secondary dark:text-dark-text-secondary">
                Content for <strong>{{ tabVariantUnderline }}</strong>
              </p>
            </div>
          </div>

          <!-- Pills -->
          <div class="space-y-3">
            <h3 class="font-medium text-sm text-text-muted dark:text-dark-text-secondary uppercase tracking-wide">Pills</h3>
            <fi-tabs :tabs="demoTabs" v-model="tabVariantPills" variant="pills" />
            <div class="p-4 bg-bg-card dark:bg-dark-card rounded-xl border border-bg-secondary dark:border-dark-secondary">
              <p class="text-sm text-text-secondary dark:text-dark-text-secondary">
                Content for <strong>{{ tabVariantPills }}</strong>
              </p>
            </div>
          </div>

          <!-- Segment -->
          <div class="space-y-3">
            <h3 class="font-medium text-sm text-text-muted dark:text-dark-text-secondary uppercase tracking-wide">Segment</h3>
            <fi-tabs :tabs="demoTabs" v-model="tabVariantSegment" variant="segment" />
            <div class="p-4 bg-bg-card dark:bg-dark-card rounded-xl border border-bg-secondary dark:border-dark-secondary">
              <p class="text-sm text-text-secondary dark:text-dark-text-secondary">
                Content for <strong>{{ tabVariantSegment }}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ==================== CHIPS ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Chips</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">FiChip for selectable tag-style options with emoji support.</p>

        <div class="flex flex-wrap gap-2">
          <fi-chip label="Sauerkraut" emoji="\uD83E\uDD66" :selected="selectedChips.sauerkraut" @click="toggleChip('sauerkraut')" />
          <fi-chip label="Kimchi" emoji="\uD83E\uDD2C" :selected="selectedChips.kimchi" @click="toggleChip('kimchi')" />
          <fi-chip label="Kombucha" emoji="\uD83C\uDF75" :selected="selectedChips.kombucha" @click="toggleChip('kombucha')" />
          <fi-chip label="Miso" emoji="\uD83C\uDF72" :selected="selectedChips.miso" @click="toggleChip('miso')" />
          <fi-chip label="Tempeh" :selected="selectedChips.tempeh" @click="toggleChip('tempeh')" />
        </div>

        <div class="flex flex-wrap gap-2">
          <fi-chip label="Success" variant="success" :selected="true" />
          <fi-chip label="Warning" variant="warning" :selected="true" />
          <fi-chip label="Danger" variant="danger" :selected="true" />
          <fi-chip label="Disabled" :disabled="true" />
        </div>
      </section>

      <!-- ==================== TOGGLES ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Toggles</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">FiToggle switch with label and description text.</p>

        <div class="max-w-md space-y-4 bg-bg-card dark:bg-dark-card rounded-2xl p-5 border border-bg-secondary dark:border-dark-secondary">
          <fi-toggle v-model="toggleNotifications" label="Push Notifications" description="Receive alerts when your ferment needs attention" />
          <div class="border-t border-bg-secondary dark:border-dark-secondary"></div>
          <fi-toggle v-model="toggleNewsletter" label="Weekly Newsletter" description="Get fermentation tips and recipes every Friday" />
          <div class="border-t border-bg-secondary dark:border-dark-secondary"></div>
          <fi-toggle v-model="toggleDarkMode" label="Dark Mode" description="Use dark theme throughout the application" />
          <div class="border-t border-bg-secondary dark:border-dark-secondary"></div>
          <fi-toggle :model-value="false" label="Disabled Toggle" description="This toggle cannot be changed" :disabled="true" />
        </div>
      </section>

      <!-- ==================== SEARCH BAR ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Search Bar</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">FiSearchBar with debounced input, clear button, and focus styling.</p>

        <div class="max-w-lg">
          <fi-search-bar :query="searchQuery" @update:query="searchQuery = $event" placeholder="Search fermentation recipes..." />
          <p v-if="searchQuery" class="mt-3 text-sm text-text-muted dark:text-dark-text-secondary">
            Searching for: <span class="font-medium text-accent-brine">"{{ searchQuery }}"</span>
          </p>
        </div>
      </section>

      <!-- ==================== FORMS & INPUTS ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Forms &amp; Inputs</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">Standard form inputs using the fi-input CSS class.</p>

        <div class="max-w-lg space-y-5 bg-bg-card dark:bg-dark-card rounded-2xl p-6 border border-bg-secondary dark:border-dark-secondary">
          <!-- Text Input -->
          <div>
            <label class="block text-sm font-medium text-text-primary dark:text-dark-text mb-1.5">Recipe Name</label>
            <input type="text" class="fi-input" placeholder="e.g. Garlic Dill Pickles" />
          </div>

          <!-- Input with error -->
          <div>
            <label class="block text-sm font-medium text-text-primary dark:text-dark-text mb-1.5">Email Address</label>
            <input type="email" class="fi-input" style="border-color: var(--fi-danger);" value="invalid-email" />
            <p class="text-xs mt-1" style="color: var(--fi-danger);">Please enter a valid email address.</p>
          </div>

          <!-- Textarea -->
          <div>
            <label class="block text-sm font-medium text-text-primary dark:text-dark-text mb-1.5">Instructions</label>
            <textarea class="fi-input fi-textarea" placeholder="Describe the fermentation process..." rows="3"></textarea>
          </div>

          <!-- Select -->
          <div>
            <label class="block text-sm font-medium text-text-primary dark:text-dark-text mb-1.5">Difficulty Level</label>
            <select class="fi-input">
              <option value="">Select difficulty...</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="master">Master</option>
            </select>
          </div>

          <fi-button variant="primary">Save Recipe</fi-button>
        </div>
      </section>

      <!-- ==================== FILTER PANEL ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Filter Panel</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">FiFilterPanel with collapsible sections, chip-style checkboxes, toggles, and range sliders.</p>

        <div class="max-w-sm">
          <fi-filter-panel
            title="Recipe Filters"
            :filters="filterGroups"
            v-model="filterValues"
            :result-count="42"
            :total-count="128"
          />
        </div>
      </section>

      <!-- ==================== MODAL ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Modal</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">Overlay dialog with backdrop blur.</p>

        <fi-button variant="primary" @click="showModal = true">Open Modal</fi-button>

        <!-- Modal -->
        <teleport to="body">
          <div v-if="showModal" class="fi-backdrop fi-animate-fade-in" @click.self="showModal = false">
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="showModal = false">
              <div class="bg-bg-card dark:bg-dark-card rounded-2xl shadow-xl max-w-md w-full fi-animate-fade-in-up overflow-hidden">
                <div class="px-6 pt-6 pb-4">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="font-serif text-xl text-text-primary dark:text-dark-text">Confirm Action</h3>
                    <button @click="showModal = false" class="p-1.5 rounded-xl hover:bg-bg-secondary dark:hover:bg-dark-secondary transition-colors">
                      <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p class="text-text-secondary dark:text-dark-text-secondary text-sm">
                    Are you sure you want to start a new fermentation batch? This will use your active starter culture.
                  </p>
                </div>
                <div class="px-6 py-4 bg-bg-secondary/50 dark:bg-dark-secondary/50 flex justify-end gap-3">
                  <fi-button variant="ghost" @click="showModal = false">Cancel</fi-button>
                  <fi-button variant="primary" @click="showModal = false">Start Batch</fi-button>
                </div>
              </div>
            </div>
          </div>
        </teleport>
      </section>

      <!-- ==================== TOASTS ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Toasts</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">Notification toasts that auto-dismiss after 3 seconds.</p>

        <div class="flex flex-wrap gap-3">
          <fi-button variant="primary" @click="showToast('success')">Success Toast</fi-button>
          <fi-button variant="secondary" @click="showToast('warning')">Warning Toast</fi-button>
          <fi-button variant="danger" @click="showToast('danger')">Danger Toast</fi-button>
          <fi-button variant="ghost" @click="showToast('info')">Info Toast</fi-button>
        </div>

        <!-- Toast container -->
        <teleport to="body">
          <div class="fixed top-20 right-4 z-[60] space-y-2 pointer-events-none">
            <div
              v-for="toast in toasts"
              :key="toast.id"
              :class="['pointer-events-auto px-4 py-3 rounded-xl shadow-lg text-sm font-medium fi-animate-slide-in-right max-w-sm', toastColorClass(toast.type)]"
            >
              {{ toast.message }}
            </div>
          </div>
        </teleport>
      </section>

      <!-- ==================== STEPPER ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Stepper</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">Multi-step wizard indicator.</p>

        <div class="max-w-lg">
          <div class="flex items-center gap-0">
            <template v-for="(step, i) in ['Choose Recipe', 'Prep Ingredients', 'Start Ferment']" :key="i">
              <div class="flex items-center gap-2">
                <div
                  :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                    i < stepperCurrent ? 'bg-accent-culture text-white' :
                    i === stepperCurrent ? 'bg-accent-brine text-white' :
                    'bg-bg-secondary dark:bg-dark-secondary text-text-muted dark:text-dark-text-secondary'
                  ]"
                >
                  <svg v-if="i < stepperCurrent" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span v-else>{{ i + 1 }}</span>
                </div>
                <span :class="[
                  'text-sm font-medium hidden sm:inline',
                  i <= stepperCurrent ? 'text-text-primary dark:text-dark-text' : 'text-text-muted dark:text-dark-text-secondary'
                ]">{{ step }}</span>
              </div>
              <div
                v-if="i < 2"
                :class="[
                  'flex-1 h-0.5 mx-3 rounded-full transition-colors',
                  i < stepperCurrent ? 'bg-accent-culture' : 'bg-bg-secondary dark:bg-dark-secondary'
                ]"
              ></div>
            </template>
          </div>

          <div class="flex gap-3 mt-6">
            <fi-button variant="ghost" :disabled="stepperCurrent === 0" @click="stepperCurrent = Math.max(0, stepperCurrent - 1)">Back</fi-button>
            <fi-button variant="primary" @click="stepperCurrent = Math.min(2, stepperCurrent + 1)">
              {{ stepperCurrent === 2 ? 'Finish' : 'Next' }}
            </fi-button>
            <fi-button v-if="stepperCurrent === 2" variant="ghost" @click="stepperCurrent = 0">Reset</fi-button>
          </div>
        </div>
      </section>

      <!-- ==================== COLLAPSIBLE ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Collapsible</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">Expandable/collapsible content sections.</p>

        <div class="max-w-lg space-y-2">
          <div class="bg-bg-card dark:bg-dark-card rounded-xl border border-bg-secondary dark:border-dark-secondary overflow-hidden">
            <button @click="toggleCollapsible('faq1')" class="w-full flex items-center justify-between px-5 py-3.5 hover:bg-bg-secondary/50 dark:hover:bg-dark-secondary/50 transition-colors">
              <span class="font-medium text-text-primary dark:text-dark-text text-sm">What temperature is best for sauerkraut?</span>
              <svg :class="['w-4 h-4 text-text-muted transition-transform duration-200', collapsibleOpen.faq1 ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="collapsibleOpen.faq1" class="px-5 pb-4 text-sm text-text-secondary dark:text-dark-text-secondary">
              Sauerkraut ferments best at 65-75 degrees F (18-24 degrees C). Lower temperatures result in a slower, more complex fermentation. Avoid temperatures above 80 degrees F.
            </div>
          </div>

          <div class="bg-bg-card dark:bg-dark-card rounded-xl border border-bg-secondary dark:border-dark-secondary overflow-hidden">
            <button @click="toggleCollapsible('faq2')" class="w-full flex items-center justify-between px-5 py-3.5 hover:bg-bg-secondary/50 dark:hover:bg-dark-secondary/50 transition-colors">
              <span class="font-medium text-text-primary dark:text-dark-text text-sm">How long does kimchi take?</span>
              <svg :class="['w-4 h-4 text-text-muted transition-transform duration-200', collapsibleOpen.faq2 ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="collapsibleOpen.faq2" class="px-5 pb-4 text-sm text-text-secondary dark:text-dark-text-secondary">
              Kimchi can be eaten after just 1-2 days at room temperature, but many prefer it after 1-2 weeks of fermentation. It continues to develop flavor for months in the refrigerator.
            </div>
          </div>

          <div class="bg-bg-card dark:bg-dark-card rounded-xl border border-bg-secondary dark:border-dark-secondary overflow-hidden">
            <button @click="toggleCollapsible('faq3')" class="w-full flex items-center justify-between px-5 py-3.5 hover:bg-bg-secondary/50 dark:hover:bg-dark-secondary/50 transition-colors">
              <span class="font-medium text-text-primary dark:text-dark-text text-sm">Can I reuse a SCOBY?</span>
              <svg :class="['w-4 h-4 text-text-muted transition-transform duration-200', collapsibleOpen.faq3 ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="collapsibleOpen.faq3" class="px-5 pb-4 text-sm text-text-secondary dark:text-dark-text-secondary">
              Yes! A healthy SCOBY can be reused many times. After each batch of kombucha, you can transfer the SCOBY to fresh sweet tea. It will also grow new layers that can be shared.
            </div>
          </div>
        </div>
      </section>

      <!-- ==================== CHANGELOG ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Changelog</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">Timeline-style changelog for showing updates.</p>

        <div class="max-w-lg">
          <div class="space-y-0 relative">
            <div class="absolute left-[15px] top-2 bottom-2 w-0.5 bg-bg-secondary dark:bg-dark-secondary"></div>

            <div class="relative flex gap-4 pb-6">
              <div class="w-8 h-8 rounded-full bg-accent-culture text-white flex items-center justify-center flex-shrink-0 z-10 text-xs">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <div>
                <p class="text-xs text-text-muted dark:text-dark-text-secondary">March 10, 2026</p>
                <h4 class="font-medium text-text-primary dark:text-dark-text">New: Batch temperature tracking</h4>
                <p class="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">Monitor fermentation temperature over time with our new chart widget.</p>
              </div>
            </div>

            <div class="relative flex gap-4 pb-6">
              <div class="w-8 h-8 rounded-full bg-accent-brine text-white flex items-center justify-center flex-shrink-0 z-10 text-xs">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <p class="text-xs text-text-muted dark:text-dark-text-secondary">March 5, 2026</p>
                <h4 class="font-medium text-text-primary dark:text-dark-text">Improved: Filter panel performance</h4>
                <p class="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">Filters now update results instantly with debounced search.</p>
              </div>
            </div>

            <div class="relative flex gap-4">
              <div class="w-8 h-8 rounded-full bg-accent-ferment text-white flex items-center justify-center flex-shrink-0 z-10 text-xs">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p class="text-xs text-text-muted dark:text-dark-text-secondary">February 28, 2026</p>
                <h4 class="font-medium text-text-primary dark:text-dark-text">Fixed: Dark mode toggle persistence</h4>
                <p class="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">Theme preference now persists correctly across page reloads.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==================== EMPTY STATE ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Empty State</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">Placeholder for when there is no data to display.</p>

        <div class="max-w-md mx-auto">
          <div class="bg-bg-card dark:bg-dark-card rounded-2xl border border-bg-secondary dark:border-dark-secondary p-10 text-center">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-bg-secondary dark:bg-dark-secondary flex items-center justify-center">
              <span class="text-3xl">🫙</span>
            </div>
            <h3 class="font-serif text-lg text-text-primary dark:text-dark-text mb-2">No Batches Yet</h3>
            <p class="text-sm text-text-muted dark:text-dark-text-secondary mb-6">
              Start your fermentation journey by creating your first batch.
            </p>
            <fi-button variant="primary">Create First Batch</fi-button>
          </div>
        </div>
      </section>

      <!-- ==================== GRID LAYOUT ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Grid Layout</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">Responsive grid patterns using Tailwind grid utilities.</p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="n in 8" :key="n" class="bg-bg-card dark:bg-dark-card rounded-xl border border-bg-secondary dark:border-dark-secondary p-6 text-center">
            <div class="w-10 h-10 mx-auto mb-2 rounded-xl bg-accent-brine/15 flex items-center justify-center text-accent-brine font-mono text-sm font-bold">
              {{ n }}
            </div>
            <p class="text-xs text-text-muted dark:text-dark-text-secondary">Grid item</p>
          </div>
        </div>
      </section>

      <!-- ==================== SKELETON / SHIMMER ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Skeleton Loading</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">Shimmer effect for loading placeholders using fi-shimmer class.</p>

        <div class="max-w-sm">
          <div class="bg-bg-card dark:bg-dark-card rounded-2xl border border-bg-secondary dark:border-dark-secondary overflow-hidden">
            <div class="h-40 fi-shimmer"></div>
            <div class="p-4 space-y-3">
              <div class="h-5 fi-shimmer rounded-lg w-3/4"></div>
              <div class="h-4 fi-shimmer rounded-lg w-full"></div>
              <div class="h-4 fi-shimmer rounded-lg w-2/3"></div>
              <div class="flex gap-2 pt-2">
                <div class="h-8 fi-shimmer rounded-xl w-20"></div>
                <div class="h-8 fi-shimmer rounded-xl w-24"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==================== TYPOGRAPHY ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Typography</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">Font families and text styles used throughout Fermenti.</p>

        <div class="space-y-4">
          <div>
            <p class="text-xs text-text-muted uppercase tracking-wide mb-1">Instrument Serif</p>
            <p class="font-serif text-4xl text-text-primary dark:text-dark-text">The Art of Fermentation</p>
          </div>
          <div>
            <p class="text-xs text-text-muted uppercase tracking-wide mb-1">DM Sans</p>
            <p class="font-sans text-lg text-text-primary dark:text-dark-text">The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.</p>
          </div>
          <div>
            <p class="text-xs text-text-muted uppercase tracking-wide mb-1">JetBrains Mono</p>
            <p class="font-mono text-sm text-text-primary dark:text-dark-text">const ferment = (culture, time) =&gt; magic;</p>
          </div>
          <div class="flex flex-wrap gap-4">
            <div>
              <p class="text-xs text-text-muted mb-1">Primary</p>
              <p class="text-text-primary dark:text-dark-text font-medium">Dark Brown</p>
            </div>
            <div>
              <p class="text-xs text-text-muted mb-1">Secondary</p>
              <p class="text-text-secondary dark:text-dark-text-secondary font-medium">Warm Brown</p>
            </div>
            <div>
              <p class="text-xs text-text-muted mb-1">Muted</p>
              <p class="text-text-muted font-medium">Soft Tan</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ==================== COLOR PALETTE ==================== -->
      <section class="space-y-6">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text border-b border-bg-secondary dark:border-dark-secondary pb-2">Color Palette</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">The fermentation-inspired color system.</p>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div class="h-20 bg-accent-brine rounded-xl mb-2"></div>
            <p class="text-sm font-medium text-text-primary dark:text-dark-text">Brine</p>
            <p class="text-xs text-text-muted font-mono">#C4A35A</p>
          </div>
          <div>
            <div class="h-20 bg-accent-ferment rounded-xl mb-2"></div>
            <p class="text-sm font-medium text-text-primary dark:text-dark-text">Ferment</p>
            <p class="text-xs text-text-muted font-mono">#D4553A</p>
          </div>
          <div>
            <div class="h-20 bg-accent-culture rounded-xl mb-2"></div>
            <p class="text-sm font-medium text-text-primary dark:text-dark-text">Culture</p>
            <p class="text-xs text-text-muted font-mono">#7B8F3A</p>
          </div>
          <div>
            <div class="h-20 bg-accent-aged rounded-xl mb-2"></div>
            <p class="text-sm font-medium text-text-primary dark:text-dark-text">Aged</p>
            <p class="text-xs text-text-muted font-mono">#8B6B4A</p>
          </div>
        </div>

        <h3 class="font-medium text-sm text-text-muted dark:text-dark-text-secondary uppercase tracking-wide mt-6">Tier Colors</h3>
        <div class="grid grid-cols-3 sm:grid-cols-5 gap-3">
          <div>
            <div class="h-12 bg-tier-beginner rounded-xl mb-1"></div>
            <p class="text-xs font-medium">Beginner</p>
          </div>
          <div>
            <div class="h-12 bg-tier-seasoned rounded-xl mb-1"></div>
            <p class="text-xs font-medium">Seasoned</p>
          </div>
          <div>
            <div class="h-12 bg-tier-ambitious rounded-xl mb-1"></div>
            <p class="text-xs font-medium">Ambitious</p>
          </div>
          <div>
            <div class="h-12 bg-tier-advanced rounded-xl mb-1"></div>
            <p class="text-xs font-medium">Advanced</p>
          </div>
          <div>
            <div class="h-12 bg-tier-master rounded-xl mb-1"></div>
            <p class="text-xs font-medium">Master</p>
          </div>
        </div>
      </section>

    </div>
  `,
};
