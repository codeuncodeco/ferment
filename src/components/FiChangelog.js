/**
 * Fermenti UI - FiChangelog Component
 * Changelog viewer with expandable entries and type badges
 */

export default {
  name: 'fi-changelog',

  props: {
    entries: {
      type: Array,
      default: () => []
      // Each entry: { version, date, title, summary, items: [{ type: 'feature'|'enhancement'|'fix', text }] }
    },
    standalone: {
      type: Boolean,
      default: false
    }
  },

  emits: ['close'],

  data() {
    return {
      expandedEntries: {}
    };
  },

  created() {
    // Auto-expand the first entry
    if (this.entries.length > 0) {
      this.expandedEntries[0] = true;
    }
  },

  methods: {
    toggleEntry(index) {
      this.expandedEntries[index] = !this.expandedEntries[index];
    },

    typeBadgeClass(type) {
      const classes = {
        feature: 'bg-accent-culture/20 text-accent-culture',
        enhancement: 'bg-accent-brine/20 text-accent-aged dark:text-accent-brine',
        fix: 'bg-accent-ferment/20 text-accent-ferment'
      };
      return classes[type] || classes.enhancement;
    },

    typeLabel(type) {
      const labels = { feature: 'New', enhancement: 'Enhanced', fix: 'Fixed' };
      return labels[type] || type;
    },

    typeEmoji(type) {
      const emojis = { feature: '\u2728', enhancement: '\u26A1', fix: '\uD83D\uDD27' };
      return emojis[type] || '\u2022';
    }
  },

  template: `
    <div :class="standalone ? 'max-w-2xl mx-auto py-8 px-4' : ''">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6" v-if="standalone">
        <h2 class="font-serif text-2xl text-text-primary dark:text-dark-text">Changelog</h2>
        <button
          @click="$emit('close')"
          class="p-2 rounded-xl hover:bg-bg-secondary dark:hover:bg-dark-secondary transition-colors"
          aria-label="Close changelog"
        >
          <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Timeline -->
      <div class="space-y-4">
        <div
          v-for="(entry, index) in entries"
          :key="entry.version || index"
          class="bg-bg-card dark:bg-dark-card rounded-2xl border border-bg-secondary/50 dark:border-dark-secondary overflow-hidden transition-all duration-200"
        >
          <!-- Entry Header -->
          <button
            @click="toggleEntry(index)"
            class="w-full flex items-center justify-between px-5 py-4 hover:bg-bg-secondary/20 dark:hover:bg-dark-secondary/30 transition-colors"
          >
            <div class="flex items-center gap-3 text-left">
              <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent-brine/15 text-accent-brine text-sm font-mono font-medium">
                {{ entry.version || 'v?' }}
              </span>
              <div>
                <h3 class="font-medium text-text-primary dark:text-dark-text text-sm">{{ entry.title }}</h3>
                <p v-if="entry.date" class="text-xs text-text-muted dark:text-dark-text-secondary mt-0.5">{{ entry.date }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span v-if="entry.items" class="text-xs text-text-muted dark:text-dark-text-secondary">
                {{ entry.items.length }} change{{ entry.items.length === 1 ? '' : 's' }}
              </span>
              <svg
                :class="['w-4 h-4 text-text-muted transition-transform duration-200', expandedEntries[index] ? 'rotate-180' : '']"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          <!-- Entry Content -->
          <div v-show="expandedEntries[index]" class="px-5 pb-4 border-t border-bg-secondary/50 dark:border-dark-secondary">
            <p v-if="entry.summary" class="text-sm text-text-secondary dark:text-dark-text-secondary mt-3 mb-3">
              {{ entry.summary }}
            </p>
            <ul v-if="entry.items && entry.items.length" class="space-y-2 mt-3">
              <li
                v-for="(item, i) in entry.items"
                :key="i"
                class="flex items-start gap-2 text-sm"
              >
                <span :class="['inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium flex-shrink-0 mt-0.5', typeBadgeClass(item.type)]">
                  {{ typeLabel(item.type) }}
                </span>
                <span class="text-text-primary dark:text-dark-text">{{ item.text }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `
};
