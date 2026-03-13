/**
 * Fermenti UI - FiProgress Component
 * Progress bar with variants and animation
 */

export default {
  name: 'fi-progress',

  props: {
    value: {
      type: Number,
      default: 0,
      validator: v => v >= 0 && v <= 100
    },
    label: {
      type: String,
      default: ''
    },
    showValue: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'brine',
      validator: v => ['brine', 'culture', 'ferment'].includes(v)
    },
    animated: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    barColor() {
      const colors = {
        brine: 'bg-accent-brine',
        culture: 'bg-accent-culture',
        ferment: 'bg-accent-ferment'
      };
      return colors[this.variant];
    },

    barStyle() {
      return {
        width: `${Math.min(100, Math.max(0, this.value))}%`
      };
    }
  },

  template: `
    <div class="space-y-1.5" role="progressbar" :aria-valuenow="value" aria-valuemin="0" aria-valuemax="100" :aria-label="label || 'Progress'">
      <div v-if="label || showValue" class="flex items-center justify-between">
        <span v-if="label" class="text-sm font-medium text-text-primary dark:text-dark-text">{{ label }}</span>
        <span v-if="showValue" class="text-xs font-mono text-text-muted dark:text-dark-text-secondary">{{ Math.round(value) }}%</span>
      </div>
      <div class="w-full h-2 bg-bg-secondary dark:bg-dark-secondary rounded-full overflow-hidden">
        <div
          :class="[
            'h-full rounded-full transition-all duration-500 ease-ferment',
            barColor,
            animated ? 'animate-pulse' : ''
          ]"
          :style="barStyle"
        ></div>
      </div>
    </div>
  `
};
