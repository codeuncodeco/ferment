/**
 * Fermenti - FiModal Component
 * Modal dialog with backdrop blur, click-outside-to-close, and body scroll lock
 */

export default {
  name: 'fi-modal',

  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: '' },
    size: {
      type: String,
      default: 'md',
      validator: (v) => ['sm', 'md', 'lg', 'full'].includes(v),
    },
    closable: { type: Boolean, default: true },
  },

  emits: ['update:modelValue'],

  computed: {
    sizeClass() {
      const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        full: 'max-w-full mx-4',
      };
      return sizes[this.size] || sizes.md;
    },
  },

  watch: {
    modelValue(val) {
      document.body.style.overflow = val ? 'hidden' : '';
    },
  },

  methods: {
    close() {
      if (this.closable) {
        this.$emit('update:modelValue', false);
      }
    },
    handleBackdropClick(e) {
      if (e.target === e.currentTarget) {
        this.close();
      }
    },
  },

  mounted() {
    if (this.modelValue) {
      document.body.style.overflow = 'hidden';
    }
  },

  beforeUnmount() {
    document.body.style.overflow = '';
  },

  template: `
    <teleport to="body">
      <div v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        @click="handleBackdropClick"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
      >
        <div
          :class="['bg-bg-card dark:bg-dark-card rounded-2xl shadow-warm-xl w-full max-h-[85vh] overflow-y-auto custom-scrollbar', sizeClass]"
          @click.stop
        >
          <!-- Header -->
          <div v-if="title || closable" class="flex items-center justify-between px-6 py-4 border-b border-bg-secondary dark:border-dark-secondary">
            <div class="flex items-center gap-2">
              <slot name="header-icon"></slot>
              <h2 v-if="title" class="font-serif text-xl text-text-primary dark:text-dark-text">{{ title }}</h2>
            </div>
            <button v-if="closable" @click="close"
              class="p-2 rounded-xl hover:bg-bg-secondary dark:hover:bg-dark-secondary transition-all"
              aria-label="Close"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="px-6 py-5">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="px-6 py-4 border-t border-bg-secondary dark:border-dark-secondary">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </teleport>
  `,
};
