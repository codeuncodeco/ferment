/**
 * Fermenti UI - FiAvatar Component
 * Avatar circle with image or initials fallback
 */

export default {
  name: 'fi-avatar',

  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    initials: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'md',
      validator: v => ['sm', 'md', 'lg'].includes(v)
    },
    variant: {
      type: String,
      default: 'brine',
      validator: v => ['brine', 'ferment', 'culture', 'aged'].includes(v)
    }
  },

  data() {
    return {
      imgError: false
    };
  },

  computed: {
    sizeClasses() {
      const sizes = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-14 h-14 text-lg'
      };
      return sizes[this.size];
    },

    bgClasses() {
      const variants = {
        brine: 'bg-accent-brine/20 text-accent-aged dark:text-accent-brine',
        ferment: 'bg-accent-ferment/20 text-accent-ferment',
        culture: 'bg-accent-culture/20 text-accent-culture',
        aged: 'bg-accent-aged/20 text-accent-aged'
      };
      return variants[this.variant];
    },

    showImage() {
      return this.src && !this.imgError;
    },

    displayInitials() {
      if (this.initials) return this.initials.slice(0, 2).toUpperCase();
      if (this.alt) {
        return this.alt.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
      }
      return '?';
    }
  },

  methods: {
    onImgError() {
      this.imgError = true;
    }
  },

  template: `
    <div
      :class="[
        'inline-flex items-center justify-center rounded-full font-medium overflow-hidden flex-shrink-0',
        sizeClasses,
        showImage ? '' : bgClasses
      ]"
      role="img"
      :aria-label="alt || 'Avatar'"
    >
      <img
        v-if="showImage"
        :src="src"
        :alt="alt"
        class="w-full h-full object-cover"
        @error="onImgError"
      />
      <span v-else>{{ displayInitials }}</span>
    </div>
  `
};
