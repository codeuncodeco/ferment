/**
 * Fermenti UI - FiCollapsible Component
 * Collapsible section with rotating chevron
 */

export default {
  name: 'fi-collapsible',

  props: {
    title: {
      type: String,
      default: ''
    },
    expanded: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    }
  },

  emits: ['update:expanded'],

  data() {
    return {
      localExpanded: this.expanded
    };
  },

  watch: {
    expanded(newVal) {
      this.localExpanded = newVal;
    }
  },

  methods: {
    toggle() {
      this.localExpanded = !this.localExpanded;
      this.$emit('update:expanded', this.localExpanded);
    }
  },

  template: `
    <div class="border border-bg-secondary/50 dark:border-dark-secondary rounded-xl overflow-hidden">
      <button
        @click="toggle"
        class="w-full flex items-center justify-between px-4 py-3 bg-bg-card dark:bg-dark-card hover:bg-bg-secondary/30 dark:hover:bg-dark-secondary/50 transition-colors duration-200 group"
        :aria-expanded="localExpanded"
      >
        <span class="flex items-center gap-2 text-sm font-medium text-text-primary dark:text-dark-text">
          <span v-if="icon" v-html="icon"></span>
          {{ title }}
        </span>
        <svg
          :class="[
            'w-4 h-4 text-text-muted dark:text-dark-text-secondary transition-transform duration-200 ease-ferment',
            localExpanded ? 'rotate-180' : ''
          ]"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div v-show="localExpanded" class="px-4 py-3 border-t border-bg-secondary/50 dark:border-dark-secondary bg-bg-card dark:bg-dark-card">
        <slot></slot>
      </div>
    </div>
  `
};
