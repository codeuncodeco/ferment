/**
 * Fermenti UI - FiEmptyState Component
 * Empty state placeholder with icon, title, description, and action
 */

export default {
  name: 'fi-empty-state',

  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'Nothing here yet'
    },
    description: {
      type: String,
      default: ''
    },
    actionLabel: {
      type: String,
      default: ''
    }
  },

  emits: ['action'],

  template: `
    <div class="flex flex-col items-center justify-center py-12 px-6 text-center" role="status">
      <!-- Icon area -->
      <div class="mb-4">
        <slot name="icon">
          <span v-if="icon" class="text-4xl">{{ icon }}</span>
          <div v-else class="w-16 h-16 rounded-full bg-bg-secondary dark:bg-dark-secondary flex items-center justify-center">
            <svg class="w-8 h-8 text-text-muted dark:text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
        </slot>
      </div>

      <!-- Title -->
      <h3 class="font-serif text-lg text-text-primary dark:text-dark-text mb-1">
        {{ title }}
      </h3>

      <!-- Description -->
      <p v-if="description" class="text-sm text-text-muted dark:text-dark-text-secondary max-w-sm mb-6">
        {{ description }}
      </p>

      <!-- Action button -->
      <button
        v-if="actionLabel"
        @click="$emit('action')"
        class="px-5 py-2.5 text-sm font-medium bg-accent-brine text-white rounded-xl hover:bg-accent-brine/90 shadow-warm hover:shadow-warm-lg transition-all duration-200"
      >
        {{ actionLabel }}
      </button>

      <!-- Additional content slot -->
      <slot></slot>
    </div>
  `
};
