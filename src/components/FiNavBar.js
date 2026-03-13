/**
 * Fermenti UI - FiNavBar Component
 * Top or bottom navigation bar
 */

export default {
  name: 'fi-nav-bar',

  props: {
    items: {
      type: Array,
      default: () => []
      // Each item: { id, label, icon?, badge? }
    },
    modelValue: {
      type: [String, Number],
      default: null
    },
    position: {
      type: String,
      default: 'top',
      validator: v => ['top', 'bottom'].includes(v)
    },
    brand: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],

  methods: {
    selectItem(id) {
      this.$emit('update:modelValue', id);
    }
  },

  template: `
    <nav
      :class="[
        'bg-bg-card dark:bg-dark-card border-bg-secondary dark:border-dark-secondary',
        position === 'top'
          ? 'border-b px-4 py-3'
          : 'fixed bottom-0 left-0 right-0 border-t px-2 py-2 z-40'
      ]"
      role="navigation"
      aria-label="Main navigation"
    >
      <!-- Top bar layout -->
      <div v-if="position === 'top'" class="flex items-center justify-between max-w-7xl mx-auto">
        <div v-if="brand" class="font-serif text-xl text-accent-brine font-medium">
          {{ brand }}
        </div>
        <div class="flex items-center gap-1">
          <button
            v-for="item in items"
            :key="item.id"
            @click="selectItem(item.id)"
            :class="[
              'relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200',
              modelValue === item.id
                ? 'bg-accent-brine/10 text-accent-brine'
                : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text hover:bg-bg-secondary dark:hover:bg-dark-secondary'
            ]"
            :aria-current="modelValue === item.id ? 'page' : undefined"
          >
            <span class="inline-flex items-center gap-2">
              <span v-if="item.icon" v-html="item.icon"></span>
              <span>{{ item.label }}</span>
            </span>
            <span
              v-if="item.badge"
              class="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-accent-ferment rounded-full"
            >
              {{ item.badge }}
            </span>
          </button>
        </div>
      </div>

      <!-- Bottom bar layout (mobile) -->
      <div v-else class="flex items-center justify-around max-w-lg mx-auto">
        <button
          v-for="item in items"
          :key="item.id"
          @click="selectItem(item.id)"
          :class="[
            'relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[60px]',
            modelValue === item.id
              ? 'text-accent-brine'
              : 'text-text-muted dark:text-dark-text-secondary'
          ]"
          :aria-current="modelValue === item.id ? 'page' : undefined"
        >
          <span v-if="item.icon" v-html="item.icon" class="w-6 h-6"></span>
          <span class="text-[10px] font-medium">{{ item.label }}</span>
          <span
            v-if="item.badge"
            class="absolute top-0 right-1 inline-flex items-center justify-center min-w-[16px] h-[16px] px-1 text-[9px] font-bold text-white bg-accent-ferment rounded-full"
          >
            {{ item.badge }}
          </span>
        </button>
      </div>
    </nav>
  `
};
