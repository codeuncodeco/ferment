/**
 * Fermenti UI - FiFilterPanel Component
 * Generic filter panel with collapsible sections, chip-style checkboxes, and clear all
 */

export default {
  name: 'fi-filter-panel',

  props: {
    title: {
      type: String,
      default: 'Filters'
    },
    filters: {
      type: Array,
      default: () => []
      // Each filter group: { id, label, type: 'checkbox'|'toggle'|'range', options: [{id, label, emoji?}], expanded, min, max, rangeLabel }
    },
    modelValue: {
      type: Object,
      default: () => ({})
    },
    resultCount: {
      type: Number,
      default: 0
    },
    totalCount: {
      type: Number,
      default: 0
    }
  },

  emits: ['update:modelValue', 'close'],

  data() {
    return {
      localFilters: JSON.parse(JSON.stringify(this.modelValue || {})),
      expandedSections: {}
    };
  },

  created() {
    // Initialize expanded state from filter config
    this.filters.forEach(f => {
      this.expandedSections[f.id] = f.expanded !== undefined ? f.expanded : true;
      // Ensure local filters have default values for each group
      if (f.type === 'checkbox' && !this.localFilters[f.id]) {
        this.localFilters[f.id] = [];
      }
      if (f.type === 'toggle' && this.localFilters[f.id] === undefined) {
        this.localFilters[f.id] = false;
      }
      if (f.type === 'range' && this.localFilters[f.id] === undefined) {
        this.localFilters[f.id] = f.max || 100;
      }
    });
  },

  watch: {
    modelValue: {
      handler(newVal) {
        this.localFilters = JSON.parse(JSON.stringify(newVal || {}));
      },
      deep: true
    }
  },

  computed: {
    activeFilterCount() {
      let count = 0;
      this.filters.forEach(f => {
        if (f.type === 'checkbox' && this.localFilters[f.id] && this.localFilters[f.id].length > 0) count++;
        if (f.type === 'toggle' && this.localFilters[f.id]) count++;
        if (f.type === 'range' && this.localFilters[f.id] < (f.max || 100)) count++;
      });
      return count;
    }
  },

  methods: {
    toggleSection(sectionId) {
      this.expandedSections[sectionId] = !this.expandedSections[sectionId];
    },

    toggleArrayFilter(filterId, value) {
      if (!this.localFilters[filterId]) {
        this.localFilters[filterId] = [];
      }
      const idx = this.localFilters[filterId].indexOf(value);
      if (idx === -1) {
        this.localFilters[filterId].push(value);
      } else {
        this.localFilters[filterId].splice(idx, 1);
      }
      this.emitFilters();
    },

    toggleBooleanFilter(filterId) {
      this.localFilters[filterId] = !this.localFilters[filterId];
      this.emitFilters();
    },

    onRangeChange(filterId, e) {
      this.localFilters[filterId] = parseInt(e.target.value);
      this.emitFilters();
    },

    clearAll() {
      this.filters.forEach(f => {
        if (f.type === 'checkbox') this.localFilters[f.id] = [];
        if (f.type === 'toggle') this.localFilters[f.id] = false;
        if (f.type === 'range') this.localFilters[f.id] = f.max || 100;
      });
      this.emitFilters();
    },

    emitFilters() {
      this.$emit('update:modelValue', { ...this.localFilters });
    },

    isChecked(filterId, optionId) {
      return this.localFilters[filterId] && this.localFilters[filterId].includes(optionId);
    }
  },

  template: `
    <div class="bg-bg-card dark:bg-dark-card rounded-2xl shadow-warm border border-bg-secondary/50 dark:border-dark-secondary overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-bg-secondary dark:border-dark-secondary">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-accent-brine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h3 class="font-serif text-lg text-text-primary dark:text-dark-text">{{ title }}</h3>
          <span v-if="activeFilterCount > 0" class="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-accent-ferment rounded-full">
            {{ activeFilterCount }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <button
            v-if="activeFilterCount > 0"
            @click="clearAll"
            class="text-xs font-medium text-accent-ferment hover:text-accent-ferment/80 transition-colors"
            aria-label="Clear all filters"
          >
            Clear All
          </button>
          <button
            @click="$emit('close')"
            class="p-1 rounded-lg hover:bg-bg-secondary dark:hover:bg-dark-secondary transition-colors lg:hidden"
            aria-label="Close filters"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Filter Sections -->
      <div class="divide-y divide-bg-secondary/50 dark:divide-dark-secondary max-h-[70vh] overflow-y-auto">
        <div v-for="filter in filters" :key="filter.id" class="px-5 py-3">

          <!-- Toggle type -->
          <template v-if="filter.type === 'toggle'">
            <button
              @click="toggleBooleanFilter(filter.id)"
              :class="[
                'w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300',
                localFilters[filter.id]
                  ? 'bg-accent-culture/15 border-2 border-accent-culture text-accent-culture'
                  : 'bg-bg-secondary/50 dark:bg-dark-secondary border-2 border-transparent text-text-secondary dark:text-dark-text-secondary hover:border-accent-culture/30'
              ]"
              :aria-pressed="!!localFilters[filter.id]"
            >
              <span class="flex items-center gap-2 font-medium">
                <span v-if="filter.options && filter.options[0] && filter.options[0].emoji" class="text-lg">{{ filter.options[0].emoji }}</span>
                {{ filter.label }}
              </span>
              <div
                :class="[
                  'w-10 h-6 rounded-full transition-all duration-300 relative',
                  localFilters[filter.id] ? 'bg-accent-culture' : 'bg-text-muted/30'
                ]"
              >
                <div
                  :class="[
                    'absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300',
                    localFilters[filter.id] ? 'left-5' : 'left-1'
                  ]"
                ></div>
              </div>
            </button>
          </template>

          <!-- Checkbox / Range types with collapsible header -->
          <template v-else>
            <button @click="toggleSection(filter.id)" class="w-full flex items-center justify-between py-2 group">
              <span class="font-medium text-sm text-text-primary dark:text-dark-text">{{ filter.label }}</span>
              <svg
                :class="['w-4 h-4 text-text-muted transition-transform duration-200', expandedSections[filter.id] ? 'rotate-180' : '']"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Checkbox options -->
            <div v-if="filter.type === 'checkbox'" v-show="expandedSections[filter.id]" class="flex flex-wrap gap-2 pt-2 pb-1">
              <label
                v-for="opt in (filter.options || [])"
                :key="opt.id"
                :class="[
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm cursor-pointer transition-all duration-200 border-2 select-none',
                  isChecked(filter.id, opt.id)
                    ? 'bg-accent-brine/15 border-accent-brine text-accent-aged dark:text-accent-brine font-medium'
                    : 'bg-bg-secondary/50 dark:bg-dark-secondary border-transparent text-text-secondary dark:text-dark-text-secondary hover:border-text-muted/20'
                ]"
              >
                <input
                  type="checkbox"
                  :checked="isChecked(filter.id, opt.id)"
                  @change="toggleArrayFilter(filter.id, opt.id)"
                  class="sr-only"
                />
                <span v-if="opt.emoji">{{ opt.emoji }}</span>
                <span>{{ opt.label }}</span>
              </label>
            </div>

            <!-- Range slider -->
            <div v-if="filter.type === 'range'" v-show="expandedSections[filter.id]" class="pt-2 pb-1 space-y-3">
              <div class="flex items-center justify-between text-sm">
                <span class="text-text-muted dark:text-dark-text-secondary">{{ filter.rangeLabel || 'Value' }}:</span>
                <span class="font-medium text-accent-brine">{{ localFilters[filter.id] }}</span>
              </div>
              <input
                type="range"
                :min="filter.min || 0"
                :max="filter.max || 100"
                :value="localFilters[filter.id]"
                @input="onRangeChange(filter.id, $event)"
                class="w-full"
                :aria-label="filter.label"
              />
            </div>
          </template>
        </div>
      </div>

      <!-- Footer with result count -->
      <div class="px-5 py-3 border-t border-bg-secondary dark:border-dark-secondary bg-bg-secondary/30 dark:bg-dark-secondary/30">
        <p class="text-sm text-text-muted dark:text-dark-text-secondary text-center">
          <span class="font-medium text-text-primary dark:text-dark-text">{{ resultCount }}</span>
          <span v-if="resultCount !== totalCount"> of {{ totalCount }}</span>
          result{{ resultCount === 1 ? '' : 's' }}
        </p>
      </div>
    </div>
  `
};
