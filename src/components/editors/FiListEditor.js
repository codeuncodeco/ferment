/**
 * Fermenti - FiListEditor Component
 * Reorderable list editor with drag-to-reorder, add, remove, and inline editing
 */

export default {
  name: 'fi-list-editor',

  props: {
    modelValue: { type: Array, default: () => [] },
    placeholder: { type: String, default: 'Add item...' },
    itemLabel: { type: String, default: 'item' },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      items: JSON.parse(JSON.stringify(this.modelValue || [])),
      editingIndex: null,
      dragIndex: null,
    };
  },

  watch: {
    modelValue: {
      handler(v) { this.items = JSON.parse(JSON.stringify(v || [])); },
      deep: true,
    },
  },

  methods: {
    save() {
      this.$emit('update:modelValue', JSON.parse(JSON.stringify(this.items)));
    },
    addItem() {
      this.items.push({ text: '' });
      this.editingIndex = this.items.length - 1;
      this.save();
    },
    removeItem(index) {
      this.items.splice(index, 1);
      this.save();
    },
    moveItem(from, to) {
      if (to < 0 || to >= this.items.length) return;
      const item = this.items.splice(from, 1)[0];
      this.items.splice(to, 0, item);
      this.save();
    },
    onDragStart(index) { this.dragIndex = index; },
    onDragOver(e, index) {
      e.preventDefault();
      if (this.dragIndex !== null && this.dragIndex !== index) {
        this.moveItem(this.dragIndex, index);
        this.dragIndex = index;
      }
    },
    onDragEnd() { this.dragIndex = null; },
    displayName(item) {
      if (typeof item === 'string') return item;
      return item.text || item.name || JSON.stringify(item);
    },
  },

  template: `
    <div class="space-y-1">
      <div v-for="(item, index) in items" :key="index"
        :draggable="true"
        @dragstart="onDragStart(index)"
        @dragover="onDragOver($event, index)"
        @dragend="onDragEnd"
        :class="['flex items-start gap-2 group rounded-lg p-2 -mx-2 transition-colors',
          dragIndex === index ? 'bg-accent-brine/10' : 'hover:bg-bg-secondary/50 dark:hover:bg-dark-secondary/50']">
        <div class="cursor-grab active:cursor-grabbing text-text-muted hover:text-text-secondary mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/>
            <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
            <circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/>
          </svg>
        </div>
        <div class="flex-1 min-w-0" v-if="editingIndex === index">
          <input v-model="item.text" :placeholder="'Item text'" @blur="save; editingIndex = null" @keydown.enter="editingIndex = null"
            class="w-full px-2 py-1.5 bg-bg-card dark:bg-dark-card border border-bg-secondary dark:border-dark-secondary rounded text-sm focus:border-accent-brine focus:outline-none">
        </div>
        <div v-else class="flex-1 min-w-0 cursor-pointer" @click="editingIndex = index">
          <span class="text-sm text-text-secondary dark:text-dark-text-secondary">{{ displayName(item) || 'Click to edit' }}</span>
        </div>
        <button @click="removeItem(index)"
          class="text-text-muted hover:text-accent-ferment transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0 mt-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <button @click="addItem"
        class="flex items-center gap-2 text-sm text-accent-brine hover:text-accent-aged transition-colors mt-2 px-2 py-1.5 rounded-lg hover:bg-accent-brine/5">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Add {{ itemLabel }}
      </button>
    </div>
  `,
};
