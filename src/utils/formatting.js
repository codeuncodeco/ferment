/**
 * Fermenti - Generalized Formatting Utilities
 * Unit conversions, date formatting, and helper functions
 */

const FermentiFormat = {
  /**
   * Unit conversion tables
   */
  conversions: {
    weight: {
      g: { oz: 0.035274, lb: 0.00220462, kg: 0.001 },
      oz: { g: 28.3495, lb: 0.0625, kg: 0.0283495 },
      lb: { g: 453.592, oz: 16, kg: 0.453592 },
      kg: { g: 1000, oz: 35.274, lb: 2.20462 },
    },
    volume: {
      ml: { 'fl oz': 0.033814, cup: 0.00422675, tbsp: 0.067628, tsp: 0.202884, l: 0.001 },
      l: { ml: 1000, 'fl oz': 33.814, cup: 4.22675, tbsp: 67.628, tsp: 202.884 },
      'fl oz': { ml: 29.5735, cup: 0.125, tbsp: 2, tsp: 6, l: 0.0295735 },
      cup: { ml: 236.588, 'fl oz': 8, tbsp: 16, tsp: 48, l: 0.236588 },
      tbsp: { ml: 14.7868, 'fl oz': 0.5, cup: 0.0625, tsp: 3, l: 0.0147868 },
      tsp: { ml: 4.92892, 'fl oz': 0.166667, cup: 0.0208333, tbsp: 0.333333, l: 0.00492892 },
    },
  },

  /**
   * Convert a value from one unit to another.
   * @param {number} value - The numeric value to convert
   * @param {string} fromUnit - Source unit (e.g. 'g', 'ml', 'cup')
   * @param {string} toUnit - Target unit
   * @returns {number|null} Converted value, or null if conversion not found
   */
  convertUnit(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;

    // Search weight conversions
    if (this.conversions.weight[fromUnit] && this.conversions.weight[fromUnit][toUnit] !== undefined) {
      return value * this.conversions.weight[fromUnit][toUnit];
    }

    // Search volume conversions
    if (this.conversions.volume[fromUnit] && this.conversions.volume[fromUnit][toUnit] !== undefined) {
      return value * this.conversions.volume[fromUnit][toUnit];
    }

    return null;
  },

  /**
   * Format a weight in grams to a human-friendly string.
   * Automatically selects appropriate unit (g or kg).
   * @param {number} grams
   * @returns {string}
   */
  formatWeight(grams) {
    if (grams == null || isNaN(grams)) return '';
    if (grams >= 1000) {
      const kg = grams / 1000;
      return `${kg % 1 === 0 ? kg : kg.toFixed(1)} kg`;
    }
    return `${grams % 1 === 0 ? grams : grams.toFixed(1)} g`;
  },

  /**
   * Format a volume in milliliters to a human-friendly string.
   * Automatically selects appropriate unit (ml or L).
   * @param {number} ml
   * @returns {string}
   */
  formatVolume(ml) {
    if (ml == null || isNaN(ml)) return '';
    if (ml >= 1000) {
      const l = ml / 1000;
      return `${l % 1 === 0 ? l : l.toFixed(1)} L`;
    }
    return `${ml % 1 === 0 ? ml : ml.toFixed(1)} ml`;
  },

  /**
   * Format a date string to a localized long-form date.
   * @param {string} dateStr - ISO date string or parseable date
   * @returns {string} e.g. "January 15, 2025"
   */
  formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  },

  /**
   * Format a date string to a short date.
   * @param {string} dateStr - ISO date string or parseable date
   * @returns {string} e.g. "Jan 15"
   */
  formatDateShort(dateStr) {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  },

  /**
   * Format a date as a relative time string.
   * @param {string} dateStr - ISO date string or parseable date
   * @returns {string} e.g. "2 days ago", "in 3 hours", "just now"
   */
  formatRelativeDate(dateStr) {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now - date;
      const diffSec = Math.floor(Math.abs(diffMs) / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHr = Math.floor(diffMin / 60);
      const diffDay = Math.floor(diffHr / 24);
      const diffWeek = Math.floor(diffDay / 7);
      const diffMonth = Math.floor(diffDay / 30);
      const diffYear = Math.floor(diffDay / 365);

      const isFuture = diffMs < 0;
      const prefix = isFuture ? 'in ' : '';
      const suffix = isFuture ? '' : ' ago';

      if (diffSec < 60) return 'just now';
      if (diffMin < 60) return `${prefix}${diffMin} min${diffMin > 1 ? 's' : ''}${suffix}`;
      if (diffHr < 24) return `${prefix}${diffHr} hour${diffHr > 1 ? 's' : ''}${suffix}`;
      if (diffDay < 7) return `${prefix}${diffDay} day${diffDay > 1 ? 's' : ''}${suffix}`;
      if (diffWeek < 5) return `${prefix}${diffWeek} week${diffWeek > 1 ? 's' : ''}${suffix}`;
      if (diffMonth < 12) return `${prefix}${diffMonth} month${diffMonth > 1 ? 's' : ''}${suffix}`;
      return `${prefix}${diffYear} year${diffYear > 1 ? 's' : ''}${suffix}`;
    } catch {
      return dateStr;
    }
  },

  /**
   * Calculate the number of days between two dates.
   * @param {string} start - Start date string
   * @param {string} end - End date string (defaults to now)
   * @returns {number} Number of days (can be negative if end < start)
   */
  daysBetween(start, end) {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const diffMs = endDate - startDate;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  },

  /**
   * Scale a numeric amount by a multiplier, rounding to reasonable precision.
   * @param {number|string} amount - The original amount
   * @param {number} multiplier - The scale factor
   * @returns {number} Scaled amount
   */
  scaleAmount(amount, multiplier) {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(num)) return 0;
    const scaled = num * multiplier;
    // Round to 2 decimal places, but trim trailing zeros
    return parseFloat(scaled.toFixed(2));
  },

  /**
   * Generate a short unique identifier.
   * @returns {string} A unique ID string (e.g. "k7x3m9p2")
   */
  uid() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  },
};

export default FermentiFormat;
