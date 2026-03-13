/**
 * Fermenti UI - FiGrid Component
 * Responsive grid layout with configurable columns
 */

export default {
  name: 'fi-grid',

  props: {
    cols: {
      type: Object,
      default: () => ({ default: 1, sm: 2, md: 3, lg: 4 })
      // { default: 1, sm: 2, md: 3, lg: 4 }
    },
    gap: {
      type: String,
      default: 'md',
      validator: v => ['sm', 'md', 'lg'].includes(v)
    }
  },

  computed: {
    gridClasses() {
      const gapClasses = {
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6'
      };

      const colMap = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6'
      };

      const smColMap = {
        1: 'sm:grid-cols-1',
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-3',
        4: 'sm:grid-cols-4',
        5: 'sm:grid-cols-5',
        6: 'sm:grid-cols-6'
      };

      const mdColMap = {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
        5: 'md:grid-cols-5',
        6: 'md:grid-cols-6'
      };

      const lgColMap = {
        1: 'lg:grid-cols-1',
        2: 'lg:grid-cols-2',
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4',
        5: 'lg:grid-cols-5',
        6: 'lg:grid-cols-6'
      };

      const classes = ['grid', gapClasses[this.gap]];

      if (this.cols.default) classes.push(colMap[this.cols.default] || 'grid-cols-1');
      if (this.cols.sm) classes.push(smColMap[this.cols.sm]);
      if (this.cols.md) classes.push(mdColMap[this.cols.md]);
      if (this.cols.lg) classes.push(lgColMap[this.cols.lg]);

      return classes.filter(Boolean).join(' ');
    }
  },

  template: `
    <div :class="gridClasses" role="list">
      <slot></slot>
    </div>
  `
};
