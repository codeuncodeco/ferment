/**
 * Fermenti UI - FiStepper Component
 * Multi-step wizard with progress dots and navigation
 */

export default {
  name: 'fi-stepper',

  props: {
    steps: {
      type: Array,
      required: true
      // Each step: { id, title }
    },
    modelValue: {
      type: Number,
      default: 0
    }
  },

  emits: ['update:modelValue', 'complete'],

  computed: {
    currentStep() {
      return Math.min(Math.max(0, this.modelValue), this.steps.length - 1);
    },

    isFirstStep() {
      return this.currentStep === 0;
    },

    isLastStep() {
      return this.currentStep === this.steps.length - 1;
    },

    progress() {
      if (this.steps.length <= 1) return 100;
      return Math.round((this.currentStep / (this.steps.length - 1)) * 100);
    }
  },

  methods: {
    goTo(index) {
      if (index >= 0 && index < this.steps.length) {
        this.$emit('update:modelValue', index);
      }
    },

    back() {
      if (!this.isFirstStep) {
        this.goTo(this.currentStep - 1);
      }
    },

    next() {
      if (this.isLastStep) {
        this.$emit('complete');
      } else {
        this.goTo(this.currentStep + 1);
      }
    }
  },

  template: `
    <div class="space-y-6">
      <!-- Progress dots -->
      <div class="flex items-center justify-center gap-2" role="navigation" aria-label="Step progress">
        <template v-for="(step, index) in steps" :key="step.id">
          <button
            @click="goTo(index)"
            :class="[
              'flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium transition-all duration-300',
              index === currentStep
                ? 'bg-accent-brine text-white shadow-warm scale-110'
                : index < currentStep
                  ? 'bg-accent-culture/20 text-accent-culture'
                  : 'bg-bg-secondary dark:bg-dark-secondary text-text-muted dark:text-dark-text-secondary'
            ]"
            :aria-label="step.title + (index === currentStep ? ' (current)' : '')"
            :aria-current="index === currentStep ? 'step' : undefined"
          >
            <span v-if="index < currentStep">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span v-else>{{ index + 1 }}</span>
          </button>
          <!-- Connector line -->
          <div
            v-if="index < steps.length - 1"
            :class="[
              'h-0.5 w-8 rounded-full transition-colors duration-300',
              index < currentStep ? 'bg-accent-culture' : 'bg-bg-secondary dark:bg-dark-secondary'
            ]"
          ></div>
        </template>
      </div>

      <!-- Step title -->
      <div class="text-center">
        <h3 class="font-serif text-lg text-text-primary dark:text-dark-text">
          {{ steps[currentStep]?.title }}
        </h3>
        <p class="text-xs text-text-muted dark:text-dark-text-secondary mt-1">
          Step {{ currentStep + 1 }} of {{ steps.length }}
        </p>
      </div>

      <!-- Step content via named slots -->
      <div class="min-h-[120px]">
        <template v-for="(step, index) in steps" :key="step.id">
          <div v-show="index === currentStep">
            <slot :name="'step-' + step.id" :step="step" :index="index"></slot>
          </div>
        </template>
      </div>

      <!-- Navigation buttons -->
      <div class="flex items-center justify-between pt-4 border-t border-bg-secondary dark:border-dark-secondary">
        <button
          v-if="!isFirstStep"
          @click="back"
          class="px-4 py-2 text-sm font-medium text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text rounded-xl hover:bg-bg-secondary dark:hover:bg-dark-secondary transition-all duration-200"
        >
          Back
        </button>
        <div v-else></div>
        <button
          @click="next"
          :class="[
            'px-6 py-2.5 text-sm font-medium rounded-xl transition-all duration-200',
            isLastStep
              ? 'bg-accent-culture text-white hover:bg-accent-culture/90 shadow-warm'
              : 'bg-accent-brine text-white hover:bg-accent-brine/90 shadow-warm'
          ]"
        >
          {{ isLastStep ? 'Finish' : 'Next' }}
        </button>
      </div>
    </div>
  `
};
