/**
 * Fermenti UI - FiInput Component
 * Text input with label, error, and hint
 */

export default {
  name: 'fi-input',

  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: v => ['text', 'email', 'password', 'number'].includes(v)
    },
    error: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      isFocused: false
    };
  },

  computed: {
    inputClasses() {
      const base = 'w-full px-4 py-2.5 bg-bg-card dark:bg-dark-card rounded-xl text-text-primary dark:text-dark-text placeholder-text-muted dark:placeholder-dark-text-secondary text-sm transition-all duration-200 border-2 focus:outline-none';

      if (this.error) {
        return `${base} border-accent-ferment/50 focus:border-accent-ferment focus:ring-2 focus:ring-accent-ferment/20`;
      }

      if (this.disabled) {
        return `${base} border-bg-secondary dark:border-dark-secondary opacity-50 cursor-not-allowed`;
      }

      return `${base} border-bg-secondary dark:border-dark-secondary focus:border-accent-brine focus:ring-2 focus:ring-accent-brine/20`;
    }
  },

  methods: {
    onInput(e) {
      this.$emit('update:modelValue', e.target.value);
    }
  },

  template: `
    <div class="space-y-1.5">
      <label v-if="label" class="block text-sm font-medium text-text-primary dark:text-dark-text">
        {{ label }}
      </label>
      <div class="relative">
        <div v-if="$slots.icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted dark:text-dark-text-secondary">
          <slot name="icon"></slot>
        </div>
        <input
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :class="[inputClasses, $slots.icon ? 'pl-10' : '']"
          :aria-label="label || placeholder"
          :aria-invalid="!!error"
          :aria-describedby="error ? 'input-error' : hint ? 'input-hint' : undefined"
          @input="onInput"
          @focus="isFocused = true"
          @blur="isFocused = false"
        />
      </div>
      <p v-if="error" id="input-error" class="text-xs text-accent-ferment" role="alert">{{ error }}</p>
      <p v-else-if="hint" id="input-hint" class="text-xs text-text-muted dark:text-dark-text-secondary">{{ hint }}</p>
    </div>
  `
};
