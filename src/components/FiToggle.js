/**
 * Fermenti UI - FiToggle Component
 * Toggle switch with label and description
 */

export default {
  name: 'fi-toggle',

  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue'],

  methods: {
    toggle() {
      if (!this.disabled) {
        this.$emit('update:modelValue', !this.modelValue);
      }
    }
  },

  template: `
    <div
      :class="['flex items-center justify-between gap-4', disabled ? 'opacity-50' : '']"
    >
      <div v-if="label || description" class="flex-1 min-w-0">
        <label
          v-if="label"
          class="block text-sm font-medium text-text-primary dark:text-dark-text cursor-pointer select-none"
          @click="toggle"
        >
          {{ label }}
        </label>
        <p v-if="description" class="text-xs text-text-muted dark:text-dark-text-secondary mt-0.5">
          {{ description }}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        :aria-checked="modelValue"
        :aria-label="label || 'Toggle'"
        :disabled="disabled"
        @click="toggle"
        :class="[
          'relative inline-flex flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-300 ease-ferment focus:outline-none focus:ring-2 focus:ring-accent-brine/50 focus:ring-offset-2 focus:ring-offset-bg-primary dark:focus:ring-offset-dark-primary',
          modelValue ? 'bg-accent-culture' : 'bg-text-muted/30 dark:bg-dark-text-secondary/30',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        ]"
      >
        <span
          :class="[
            'absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ease-ferment',
            modelValue ? 'left-6' : 'left-1'
          ]"
        ></span>
      </button>
    </div>
  `
};
