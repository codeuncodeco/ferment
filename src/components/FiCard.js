/**
 * Fermenti UI - FiCard Component
 * Card container with card, list, and table view modes
 */

export default {
  name: 'fi-card',

  props: {
    mode: {
      type: String,
      default: 'card',
      validator: v => ['card', 'list', 'table'].includes(v)
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    cardClasses() {
      const base = 'bg-bg-card dark:bg-dark-card transition-all duration-200';
      const border = this.bordered ? 'border border-bg-secondary dark:border-dark-secondary' : '';
      const hover = this.hoverable ? 'hover:-translate-y-0.5 hover:shadow-warm-lg cursor-pointer' : '';

      if (this.mode === 'card') {
        return [base, 'rounded-2xl shadow-warm overflow-hidden flex flex-col', border, hover].join(' ');
      }
      if (this.mode === 'list') {
        return [base, 'rounded-xl px-4 py-3 flex items-center gap-4', border, hover].join(' ');
      }
      // table mode - minimal styling, row-like
      return [base, 'px-4 py-3 border-b border-bg-secondary/50 dark:border-dark-secondary/50', hover].join(' ');
    }
  },

  template: `
    <div :class="cardClasses" role="article">
      <!-- Media slot (card mode only) -->
      <div v-if="mode === 'card' && $slots.media" class="relative overflow-hidden">
        <slot name="media"></slot>
      </div>

      <!-- Header slot -->
      <div v-if="$slots.header" :class="mode === 'card' ? 'px-4 pt-4' : ''">
        <slot name="header"></slot>
      </div>

      <!-- Default content -->
      <div :class="[
        mode === 'card' ? 'px-4 py-3 flex-1' : '',
        mode === 'list' ? 'flex-1 min-w-0' : ''
      ]">
        <slot></slot>
      </div>

      <!-- Footer slot (card mode primarily) -->
      <div v-if="$slots.footer" :class="mode === 'card' ? 'px-4 pb-4 pt-2 border-t border-bg-secondary/70 dark:border-dark-secondary mt-auto' : ''">
        <slot name="footer"></slot>
      </div>
    </div>
  `
};
