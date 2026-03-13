/**
 * Fermenti UI - FiToast Component
 * Toast notification system with auto-dismiss
 */

export default {
  name: 'fi-toast',

  props: {
    position: {
      type: String,
      default: 'top-right',
      validator: v => ['top-right', 'top-center', 'bottom-right', 'bottom-center'].includes(v)
    }
  },

  data() {
    return {
      toasts: [],
      nextId: 0
    };
  },

  computed: {
    positionClasses() {
      const positions = {
        'top-right': 'top-4 right-4',
        'top-center': 'top-4 left-1/2 -translate-x-1/2',
        'bottom-right': 'bottom-4 right-4',
        'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
      };
      return positions[this.position];
    }
  },

  methods: {
    show({ message, type = 'info', duration = 4000 }) {
      const id = this.nextId++;
      const toast = { id, message, type, visible: true };
      this.toasts.push(toast);

      if (duration > 0) {
        setTimeout(() => {
          this.dismiss(id);
        }, duration);
      }

      return id;
    },

    dismiss(id) {
      const index = this.toasts.findIndex(t => t.id === id);
      if (index !== -1) {
        this.toasts[index].visible = false;
        setTimeout(() => {
          this.toasts = this.toasts.filter(t => t.id !== id);
        }, 300);
      }
    },

    toastClasses(toast) {
      const typeClasses = {
        success: 'bg-accent-culture/10 border-accent-culture/30 text-accent-culture',
        error: 'bg-accent-ferment/10 border-accent-ferment/30 text-accent-ferment',
        warning: 'bg-accent-brine/10 border-accent-brine/30 text-accent-aged dark:text-accent-brine',
        info: 'bg-bg-card dark:bg-dark-card border-bg-secondary dark:border-dark-secondary text-text-primary dark:text-dark-text'
      };
      return typeClasses[toast.type] || typeClasses.info;
    },

    toastIcon(type) {
      const icons = {
        success: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />',
        error: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />',
        warning: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />',
        info: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />'
      };
      return icons[type] || icons.info;
    }
  },

  expose: ['show', 'dismiss'],

  template: `
    <div
      :class="['fixed z-50 flex flex-col gap-2 pointer-events-none', positionClasses]"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-warm-lg min-w-[280px] max-w-md transition-all duration-300',
          toastClasses(toast),
          toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        ]"
        role="alert"
      >
        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="toastIcon(toast.type)"></svg>
        <p class="text-sm flex-1">{{ toast.message }}</p>
        <button
          @click="dismiss(toast.id)"
          class="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex-shrink-0"
          aria-label="Dismiss notification"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  `
};
