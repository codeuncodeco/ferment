/**
 * Fermenti UI - FiSidebar Component
 * Collapsible sidebar navigation with nested items
 */

export default {
  name: 'fi-sidebar',

  props: {
    items: {
      type: Array,
      default: () => []
      // Each item: { id, label, icon?, children?: [] }
    },
    modelValue: {
      type: [String, Number],
      default: null
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue', 'update:collapsed'],

  data() {
    return {
      expandedGroups: {}
    };
  },

  methods: {
    selectItem(id) {
      this.$emit('update:modelValue', id);
    },

    toggleCollapse() {
      this.$emit('update:collapsed', !this.collapsed);
    },

    toggleGroup(id) {
      this.expandedGroups[id] = !this.expandedGroups[id];
    },

    isGroupExpanded(id) {
      return !!this.expandedGroups[id];
    },

    isActive(id) {
      return this.modelValue === id;
    },

    isParentActive(item) {
      if (!item.children) return false;
      return item.children.some(child => child.id === this.modelValue);
    }
  },

  template: `
    <aside
      :class="[
        'bg-bg-card dark:bg-dark-card border-r border-bg-secondary dark:border-dark-secondary flex flex-col h-full transition-all duration-300 ease-ferment',
        collapsed ? 'w-16' : 'w-60'
      ]"
      role="navigation"
      aria-label="Sidebar navigation"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-3 py-4 border-b border-bg-secondary dark:border-dark-secondary">
        <span v-if="!collapsed && title" class="font-serif text-lg text-text-primary dark:text-dark-text truncate">
          {{ title }}
        </span>
        <button
          @click="toggleCollapse"
          class="p-2 rounded-xl hover:bg-bg-secondary dark:hover:bg-dark-secondary transition-colors text-text-muted dark:text-dark-text-secondary"
          :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <svg
            :class="['w-4 h-4 transition-transform duration-200', collapsed ? 'rotate-180' : '']"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <!-- Nav items -->
      <nav class="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        <div v-for="item in items" :key="item.id">
          <!-- Item with children -->
          <template v-if="item.children && item.children.length">
            <button
              @click="toggleGroup(item.id)"
              :class="[
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200',
                isParentActive(item)
                  ? 'text-accent-brine font-medium'
                  : 'text-text-secondary dark:text-dark-text-secondary hover:bg-bg-secondary dark:hover:bg-dark-secondary hover:text-text-primary dark:hover:text-dark-text'
              ]"
            >
              <span v-if="item.icon" v-html="item.icon" class="w-5 h-5 flex-shrink-0"></span>
              <span v-if="!collapsed" class="flex-1 text-left truncate">{{ item.label }}</span>
              <svg
                v-if="!collapsed"
                :class="['w-3.5 h-3.5 transition-transform duration-200', isGroupExpanded(item.id) ? 'rotate-180' : '']"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <!-- Children -->
            <div v-if="!collapsed && isGroupExpanded(item.id)" class="ml-4 mt-0.5 space-y-0.5">
              <button
                v-for="child in item.children"
                :key="child.id"
                @click="selectItem(child.id)"
                :class="[
                  'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200',
                  isActive(child.id)
                    ? 'bg-accent-brine/10 text-accent-brine font-medium'
                    : 'text-text-muted dark:text-dark-text-secondary hover:bg-bg-secondary dark:hover:bg-dark-secondary hover:text-text-primary dark:hover:text-dark-text'
                ]"
                :aria-current="isActive(child.id) ? 'page' : undefined"
              >
                <span v-if="child.icon" v-html="child.icon" class="w-4 h-4 flex-shrink-0"></span>
                <span class="truncate">{{ child.label }}</span>
              </button>
            </div>
          </template>

          <!-- Simple item -->
          <template v-else>
            <button
              @click="selectItem(item.id)"
              :class="[
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200',
                isActive(item.id)
                  ? 'bg-accent-brine/10 text-accent-brine font-medium'
                  : 'text-text-secondary dark:text-dark-text-secondary hover:bg-bg-secondary dark:hover:bg-dark-secondary hover:text-text-primary dark:hover:text-dark-text'
              ]"
              :aria-current="isActive(item.id) ? 'page' : undefined"
              :title="collapsed ? item.label : undefined"
            >
              <span v-if="item.icon" v-html="item.icon" class="w-5 h-5 flex-shrink-0"></span>
              <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
            </button>
          </template>
        </div>
      </nav>
    </aside>
  `
};
