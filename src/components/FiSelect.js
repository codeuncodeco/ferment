/**
 * Fermenti UI - FiSelect Component
 * Styled select dropdown
 */

export default {
  name: 'fi-select',

  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
      // Each option: { value, label }
    },
    placeholder: {
      type: String,
      default: 'Select an option...'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue'],

  computed: {
    selectClasses() {
      const base = 'w-full px-4 py-2.5 bg-bg-card dark:bg-dark-card rounded-xl text-sm transition-all duration-200 border-2 focus:outline-none appearance-none cursor-pointer pr-10';

      if (this.disabled) {
        return `${base} border-bg-secondary dark:border-dark-secondary opacity-50 cursor-not-allowed text-text-muted`;
      }

      return `${base} border-bg-secondary dark:border-dark-secondary focus:border-accent-brine focus:ring-2 focus:ring-accent-brine/20 text-text-primary dark:text-dark-text`;
    }
  },

  methods: {
    onChange(e) {
      this.$emit('update:modelValue', e.target.value);
    }
  },

  template: `
    <div class="space-y-1.5">
      <label v-if="label" class="block text-sm font-medium text-text-primary dark:text-dark-text">
        {{ label }}
      </label>
      <div class="relative">
        <select
          :value="modelValue"
          :disabled="disabled"
          :class="selectClasses"
          :aria-label="label || 'Select'"
          @change="onChange"
        >
          <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
          <option
            v-for="opt in options"
            :key="opt.value"
            :value="opt.value"
          >
            {{ opt.label }}
          </option>
        </select>
        <!-- Chevron icon -->
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg class="w-4 h-4 text-text-muted dark:text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  `
};
