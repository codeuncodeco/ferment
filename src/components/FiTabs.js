/**
 * Fermenti UI - FiTabs Component
 * Tab navigation with underline, pills, and segment variants
 */

export default {
  name: 'fi-tabs',

  props: {
    tabs: {
      type: Array,
      required: true
      // Each tab: { id, label, icon? }
    },
    modelValue: {
      type: [String, Number],
      default: null
    },
    variant: {
      type: String,
      default: 'underline',
      validator: v => ['underline', 'pills', 'segment'].includes(v)
    }
  },

  emits: ['update:modelValue'],

  computed: {
    containerClasses() {
      const variants = {
        underline: 'flex gap-1 border-b border-bg-secondary dark:border-dark-secondary',
        pills: 'flex gap-2 flex-wrap',
        segment: 'inline-flex bg-bg-secondary dark:bg-dark-secondary rounded-xl p-1 gap-0.5'
      };
      return variants[this.variant];
    }
  },

  methods: {
    selectTab(tabId) {
      this.$emit('update:modelValue', tabId);
    },

    tabClasses(tab) {
      const isActive = this.modelValue === tab.id;

      if (this.variant === 'underline') {
        return [
          'relative px-4 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 -mb-px',
          isActive
            ? 'border-accent-brine text-accent-brine dark:text-accent-brine'
            : 'border-transparent text-text-muted dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text hover:border-text-muted/30'
        ].join(' ');
      }

      if (this.variant === 'pills') {
        return [
          'px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200',
          isActive
            ? 'bg-accent-brine text-white shadow-warm'
            : 'text-text-secondary dark:text-dark-text-secondary hover:bg-bg-secondary dark:hover:bg-dark-secondary hover:text-text-primary dark:hover:text-dark-text'
        ].join(' ');
      }

      // segment
      return [
        'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
        isActive
          ? 'bg-bg-card dark:bg-dark-card text-text-primary dark:text-dark-text shadow-warm'
          : 'text-text-muted dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text'
      ].join(' ');
    }
  },

  template: `
    <div :class="containerClasses" role="tablist" aria-label="Tab navigation">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="tabClasses(tab)"
        @click="selectTab(tab.id)"
        role="tab"
        :aria-selected="modelValue === tab.id"
        :aria-controls="'tabpanel-' + tab.id"
      >
        <span class="inline-flex items-center gap-2">
          <span v-if="tab.icon" v-html="tab.icon"></span>
          <span>{{ tab.label }}</span>
        </span>
      </button>
    </div>
  `
};
