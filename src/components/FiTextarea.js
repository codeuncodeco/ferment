/**
 * Fermenti UI - FiTextarea Component
 * Auto-resize textarea with character count
 */

export default {
  name: 'fi-textarea',

  props: {
    modelValue: {
      type: String,
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
    rows: {
      type: Number,
      default: 3
    },
    maxLength: {
      type: Number,
      default: 0
    },
    error: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],

  computed: {
    textareaClasses() {
      const base = 'w-full px-4 py-2.5 bg-bg-card dark:bg-dark-card rounded-xl text-text-primary dark:text-dark-text placeholder-text-muted dark:placeholder-dark-text-secondary text-sm transition-all duration-200 border-2 focus:outline-none resize-none';

      if (this.error) {
        return `${base} border-accent-ferment/50 focus:border-accent-ferment focus:ring-2 focus:ring-accent-ferment/20`;
      }

      return `${base} border-bg-secondary dark:border-dark-secondary focus:border-accent-brine focus:ring-2 focus:ring-accent-brine/20`;
    },

    charCount() {
      return (this.modelValue || '').length;
    },

    isOverLimit() {
      return this.maxLength > 0 && this.charCount > this.maxLength;
    }
  },

  methods: {
    onInput(e) {
      this.$emit('update:modelValue', e.target.value);
      this.autoResize(e.target);
    },

    autoResize(el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  },

  mounted() {
    if (this.modelValue && this.$refs.textarea) {
      this.autoResize(this.$refs.textarea);
    }
  },

  template: `
    <div class="space-y-1.5">
      <div v-if="label || maxLength" class="flex items-center justify-between">
        <label v-if="label" class="block text-sm font-medium text-text-primary dark:text-dark-text">
          {{ label }}
        </label>
        <span
          v-if="maxLength > 0"
          :class="['text-xs', isOverLimit ? 'text-accent-ferment font-medium' : 'text-text-muted dark:text-dark-text-secondary']"
        >
          {{ charCount }}/{{ maxLength }}
        </span>
      </div>
      <textarea
        ref="textarea"
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows"
        :maxlength="maxLength > 0 ? maxLength : undefined"
        :class="textareaClasses"
        :aria-label="label || placeholder"
        :aria-invalid="!!error || isOverLimit"
        @input="onInput"
      ></textarea>
      <p v-if="error" class="text-xs text-accent-ferment" role="alert">{{ error }}</p>
      <p v-else-if="hint" class="text-xs text-text-muted dark:text-dark-text-secondary">{{ hint }}</p>
    </div>
  `
};
