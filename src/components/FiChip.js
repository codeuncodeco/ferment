/**
 * Fermenti UI - FiChip Component
 * Selectable chip/tag with variants
 */

export default {
  name: 'fi-chip',

  props: {
    label: {
      type: String,
      default: ''
    },
    emoji: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'default',
      validator: v => ['default', 'success', 'warning', 'danger'].includes(v)
    }
  },

  emits: ['click'],

  computed: {
    chipClasses() {
      const base = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm transition-all duration-200 border-2 select-none';

      if (this.disabled) {
        return `${base} opacity-50 cursor-not-allowed bg-bg-secondary/50 dark:bg-dark-secondary border-transparent text-text-muted`;
      }

      if (this.selected) {
        const selectedVariants = {
          default: 'bg-accent-brine/15 border-accent-brine text-accent-aged dark:text-accent-brine font-medium',
          success: 'bg-accent-culture/15 border-accent-culture text-accent-culture font-medium',
          warning: 'bg-accent-brine/15 border-accent-brine text-accent-aged font-medium',
          danger: 'bg-accent-ferment/15 border-accent-ferment text-accent-ferment font-medium'
        };
        return `${base} cursor-pointer ${selectedVariants[this.variant]}`;
      }

      return `${base} cursor-pointer bg-bg-secondary/50 dark:bg-dark-secondary border-transparent text-text-secondary dark:text-dark-text-secondary hover:border-text-muted/20`;
    }
  },

  methods: {
    onClick(e) {
      if (!this.disabled) {
        this.$emit('click', e);
      }
    }
  },

  template: `
    <button
      :class="chipClasses"
      @click="onClick"
      :disabled="disabled"
      :aria-pressed="selected"
      role="option"
      :aria-selected="selected"
    >
      <span v-if="emoji" class="text-base">{{ emoji }}</span>
      <span>{{ label }}</span>
      <slot></slot>
    </button>
  `
};
