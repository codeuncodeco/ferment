/**
 * Fermenti UI - FiIcon Component
 * Universal icon component supporting multiple icon libraries
 */

export default {
  name: 'fi-icon',

  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: 'md',
      validator: v => ['sm', 'md', 'lg'].includes(v) || typeof v === 'number'
    },
    library: {
      type: String,
      default: 'builtin',
      validator: v => ['builtin', 'lucide', 'heroicons', 'material', 'fontawesome'].includes(v)
    }
  },

  computed: {
    sizeValue() {
      if (typeof this.size === 'number') return this.size;
      const sizes = { sm: 16, md: 20, lg: 24 };
      return sizes[this.size] || 20;
    },

    sizeClasses() {
      if (typeof this.size === 'number') return '';
      const classes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };
      return classes[this.size] || 'w-5 h-5';
    },

    sizeStyle() {
      if (typeof this.size === 'number') {
        return { width: this.size + 'px', height: this.size + 'px' };
      }
      return {};
    },

    builtinPath() {
      // Common built-in icon paths
      const icons = {
        search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
        close: 'M6 18L18 6M6 6l12 12',
        check: 'M5 13l4 4L19 7',
        plus: 'M12 4v16m8-8H4',
        minus: 'M20 12H4',
        chevronDown: 'M19 9l-7 7-7-7',
        chevronUp: 'M5 15l7-7 7 7',
        chevronLeft: 'M15 19l-7-7 7-7',
        chevronRight: 'M9 5l7 7-7 7',
        menu: 'M4 6h16M4 12h16M4 18h16',
        heart: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
        star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
        settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
        home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        trash: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
        edit: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
        filter: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
        info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z',
        upload: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',
        download: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
        image: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
        clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        tag: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
        arrowLeft: 'M10 19l-7-7m0 0l7-7m-7 7h18',
        arrowRight: 'M14 5l7 7m0 0l-7 7m7-7H3',
        externalLink: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14',
        grip: 'M4 6h16M4 12h16M4 18h16'
      };
      return icons[this.name] || '';
    },

    faName() {
      // Convert camelCase to kebab-case for Font Awesome
      return this.name.replace(/([A-Z])/g, '-$1').toLowerCase();
    }
  },

  template: `
    <template v-if="library === 'builtin'">
      <svg
        v-if="builtinPath"
        :class="sizeClasses"
        :style="sizeStyle"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        :aria-label="name + ' icon'"
        role="img"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="builtinPath" />
      </svg>
    </template>
    <template v-else-if="library === 'lucide'">
      <i :data-lucide="name" :class="sizeClasses" :style="sizeStyle" role="img" :aria-label="name + ' icon'"></i>
    </template>
    <template v-else-if="library === 'material'">
      <span
        class="material-icons"
        :style="{ fontSize: sizeValue + 'px' }"
        role="img"
        :aria-label="name + ' icon'"
      >{{ name }}</span>
    </template>
    <template v-else-if="library === 'fontawesome'">
      <i :class="'fa-solid fa-' + faName" :style="{ fontSize: sizeValue + 'px' }" role="img" :aria-label="name + ' icon'"></i>
    </template>
    <template v-else-if="library === 'heroicons'">
      <svg
        :class="sizeClasses"
        :style="sizeStyle"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        role="img"
        :aria-label="name + ' icon'"
      >
        <slot></slot>
      </svg>
    </template>
  `
};
