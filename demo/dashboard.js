/**
 * Fermenti UI - Dashboard Demo Page
 * Mock analytics/admin dashboard showcasing components in context
 */

export default {
  name: 'dashboard-page',

  data() {
    return {
      searchQuery: '',
      activeNavItem: 'overview',
      contentTab: 'recent',

      navItems: [
        { id: 'overview', label: 'Overview' },
        { id: 'analytics', label: 'Analytics' },
        { id: 'users', label: 'Users' },
        { id: 'settings', label: 'Settings' },
      ],

      contentTabs: [
        { id: 'recent', label: 'Recent' },
        { id: 'popular', label: 'Popular' },
        { id: 'trending', label: 'Trending' },
      ],

      stats: [
        { label: 'Active Batches', value: '12,450', change: '+12%', changeType: 'positive', icon: '\uD83E\uDDEA', color: 'accent-brine' },
        { label: 'Revenue', value: '$48,200', change: '+8.3%', changeType: 'positive', icon: '\uD83D\uDCB0', color: 'accent-culture' },
        { label: 'Orders', value: '1,280', change: '-2.1%', changeType: 'negative', icon: '\uD83D\uDCE6', color: 'accent-aged' },
        { label: 'Growth', value: '+24%', change: '+4.5%', changeType: 'positive', icon: '\uD83D\uDCC8', color: 'accent-ferment' },
      ],

      recentItems: [
        { name: 'Garlic Dill Pickles', user: 'Maria K.', status: 'active', time: '2 hours ago', avatar: 'MK' },
        { name: 'Classic Sauerkraut', user: 'James L.', status: 'completed', time: '5 hours ago', avatar: 'JL' },
        { name: 'Ginger Kombucha', user: 'Sarah P.', status: 'pending', time: '1 day ago', avatar: 'SP' },
        { name: 'Miso Paste', user: 'Yuki T.', status: 'active', time: '2 days ago', avatar: 'YT' },
        { name: 'Sourdough Starter', user: 'Alex R.', status: 'completed', time: '3 days ago', avatar: 'AR' },
      ],

      goals: [
        { label: 'Monthly Batches', current: 84, target: 100 },
        { label: 'User Satisfaction', current: 92, target: 100 },
        { label: 'Recipe Submissions', current: 45, target: 75 },
      ],
    };
  },

  computed: {
    filteredItems() {
      if (!this.searchQuery) return this.recentItems;
      const q = this.searchQuery.toLowerCase();
      return this.recentItems.filter(
        item => item.name.toLowerCase().includes(q) || item.user.toLowerCase().includes(q)
      );
    },
  },

  methods: {
    statusBadgeClass(status) {
      const map = {
        active: 'bg-accent-culture/15 text-accent-culture',
        completed: 'bg-accent-brine/15 text-accent-brine',
        pending: 'bg-accent-aged/15 text-accent-aged',
      };
      return map[status] || map.pending;
    },

    avatarColor(initials) {
      const colors = ['bg-accent-brine', 'bg-accent-culture', 'bg-accent-ferment', 'bg-accent-aged'];
      const idx = initials.charCodeAt(0) % colors.length;
      return colors[idx];
    },
  },

  template: `
    <div class="min-h-screen">
      <!-- Dashboard Nav Bar -->
      <div class="bg-bg-card dark:bg-dark-card border-b border-bg-secondary dark:border-dark-secondary">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-14">
            <div class="flex items-center gap-6">
              <h2 class="font-serif text-lg text-text-primary dark:text-dark-text">
                <span class="text-accent-brine">Fermenti</span> Dashboard
              </h2>
              <nav class="hidden md:block">
                <fi-tabs :tabs="navItems" v-model="activeNavItem" variant="underline" />
              </nav>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-accent-brine text-white flex items-center justify-center text-xs font-medium">AD</div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <!-- Stats Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <fi-card v-for="stat in stats" :key="stat.label" :hoverable="true">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-sm text-text-muted dark:text-dark-text-secondary">{{ stat.label }}</p>
                <p class="text-2xl font-bold text-text-primary dark:text-dark-text mt-1">{{ stat.value }}</p>
                <p :class="[
                  'text-xs font-medium mt-1',
                  stat.changeType === 'positive' ? 'text-accent-culture' : 'text-accent-ferment'
                ]">
                  {{ stat.change }} from last month
                </p>
              </div>
              <div class="text-2xl">{{ stat.icon }}</div>
            </div>
          </fi-card>
        </div>

        <!-- Goals Section -->
        <fi-card>
          <template #header>
            <h3 class="font-serif text-lg text-text-primary dark:text-dark-text">Monthly Goals</h3>
          </template>
          <div class="space-y-4">
            <div v-for="goal in goals" :key="goal.label">
              <div class="flex justify-between text-sm mb-1.5">
                <span class="text-text-secondary dark:text-dark-text-secondary">{{ goal.label }}</span>
                <span class="font-medium text-text-primary dark:text-dark-text">{{ goal.current }}/{{ goal.target }}</span>
              </div>
              <div class="fi-progress">
                <div
                  class="fi-progress-bar"
                  :class="goal.current >= goal.target ? 'fi-success' : ''"
                  :style="{ width: Math.min(100, (goal.current / goal.target) * 100) + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </fi-card>

        <!-- Content Section -->
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <fi-tabs :tabs="contentTabs" v-model="contentTab" variant="pills" />
            <div class="w-full sm:w-72">
              <fi-search-bar :query="searchQuery" @update:query="searchQuery = $event" placeholder="Search batches..." />
            </div>
          </div>

          <!-- Recent tab content -->
          <div v-if="contentTab === 'recent'">
            <div v-if="filteredItems.length > 0" class="space-y-2">
              <fi-card v-for="item in filteredItems" :key="item.name" mode="list" :hoverable="true">
                <template #header>
                  <div :class="['w-10 h-10 rounded-full text-white flex items-center justify-center text-xs font-medium flex-shrink-0', avatarColor(item.avatar)]">
                    {{ item.avatar }}
                  </div>
                </template>
                <div class="flex items-center justify-between w-full gap-4">
                  <div class="min-w-0">
                    <h4 class="font-medium text-text-primary dark:text-dark-text truncate">{{ item.name }}</h4>
                    <p class="text-sm text-text-muted dark:text-dark-text-secondary">{{ item.user }} &middot; {{ item.time }}</p>
                  </div>
                  <span :class="['inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0', statusBadgeClass(item.status)]">
                    {{ item.status.charAt(0).toUpperCase() + item.status.slice(1) }}
                  </span>
                </div>
              </fi-card>
            </div>

            <!-- Empty search results -->
            <div v-else class="bg-bg-card dark:bg-dark-card rounded-2xl border border-bg-secondary dark:border-dark-secondary p-10 text-center">
              <div class="w-14 h-14 mx-auto mb-3 rounded-full bg-bg-secondary dark:bg-dark-secondary flex items-center justify-center">
                <svg class="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 class="font-serif text-lg text-text-primary dark:text-dark-text mb-1">No Results</h3>
              <p class="text-sm text-text-muted dark:text-dark-text-secondary">
                No batches match "<span class="font-medium">{{ searchQuery }}</span>"
              </p>
            </div>
          </div>

          <!-- Popular tab - empty state -->
          <div v-if="contentTab === 'popular'" class="bg-bg-card dark:bg-dark-card rounded-2xl border border-bg-secondary dark:border-dark-secondary p-10 text-center">
            <div class="w-14 h-14 mx-auto mb-3 rounded-full bg-bg-secondary dark:bg-dark-secondary flex items-center justify-center">
              <span class="text-2xl">\u2B50</span>
            </div>
            <h3 class="font-serif text-lg text-text-primary dark:text-dark-text mb-1">Popular Recipes Coming Soon</h3>
            <p class="text-sm text-text-muted dark:text-dark-text-secondary mb-4">
              We are analyzing community favorites. Check back soon!
            </p>
            <fi-button variant="secondary" size="sm">Notify Me</fi-button>
          </div>

          <!-- Trending tab -->
          <div v-if="contentTab === 'trending'">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <fi-card :hoverable="true" v-for="(item, i) in [
                { name: 'Hot Honey Ferment', emoji: '\uD83C\uDF36\uFE0F', count: '2.4k saves', badge: 'beginner' },
                { name: 'Garlic Confit', emoji: '\uD83E\uDDC4', count: '1.8k saves', badge: 'seasoned' },
                { name: 'Tepache', emoji: '\uD83C\uDF4D', count: '1.2k saves', badge: 'ambitious' },
              ]" :key="i">
                <template #media>
                  <div class="h-28 bg-gradient-to-br from-accent-brine/20 to-accent-culture/20 flex items-center justify-center text-4xl">
                    {{ item.emoji }}
                  </div>
                </template>
                <template #header>
                  <div class="flex items-center justify-between">
                    <h4 class="font-serif text-base text-text-primary dark:text-dark-text">{{ item.name }}</h4>
                    <span class="fi-tier-badge" :class="item.badge">{{ item.badge }}</span>
                  </div>
                </template>
                <p class="text-sm text-text-muted dark:text-dark-text-secondary">{{ item.count }}</p>
              </fi-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};
