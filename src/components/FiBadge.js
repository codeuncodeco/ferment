/**
 * Fermenti UI - FiBadge Component
 * Status badge with color variants
 */

export default {
  name: 'fi-badge',

  props: {
    label: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: v => ['default', 'success', 'warning', 'danger', 'info', 'brine', 'culture', 'aged'].includes(v)
    },
    size: {
      type: String,
      default: 'md',
      validator: v => ['sm', 'md'].includes(v)
    },
    dot: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    badgeClasses() {
      const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-xs'
      };

      const variantClasses = {
        default: 'bg-bg-secondary dark:bg-dark-secondary text-text-secondary dark:text-dark-text-secondary',
        success: 'bg-accent-culture/15 text-accent-culture',
        warning: 'bg-accent-brine/15 text-accent-aged dark:text-accent-brine',
        danger: 'bg-accent-ferment/15 text-accent-ferment',
        info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
        brine: 'bg-accent-brine/15 text-accent-brine',
        culture: 'bg-accent-culture/15 text-accent-culture',
        aged: 'bg-accent-aged/15 text-accent-aged'
      };

      return [
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        sizeClasses[this.size],
        variantClasses[this.variant]
      ].join(' ');
    },

    dotClasses() {
      const dotColors = {
        default: 'bg-text-muted',
        success: 'bg-accent-culture',
        warning: 'bg-accent-brine',
        danger: 'bg-accent-ferment',
        info: 'bg-blue-500',
        brine: 'bg-accent-brine',
        culture: 'bg-accent-culture',
        aged: 'bg-accent-aged'
      };
      return `w-1.5 h-1.5 rounded-full ${dotColors[this.variant]}`;
    }
  },

  template: `
    <span :class="badgeClasses" role="status">
      <span v-if="dot" :class="dotClasses"></span>
      {{ label }}
      <slot></slot>
    </span>
  `
};
