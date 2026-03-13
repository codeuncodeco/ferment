/**
 * Fermenti - Generalized Search Utility
 * Fuzzy text search with indexing and debounce support
 */

const FermentiSearch = {
  /**
   * Build a search index from an array of items.
   * @param {Array<object>} items - The items to index
   * @param {string[]} fields - Array of field paths to index (supports dot notation, e.g. 'meta.title')
   * @returns {{ items: Array<object>, fields: string[], tokens: Map<object, string> }}
   */
  buildIndex(items, fields) {
    const tokens = new Map();

    for (const item of items) {
      const parts = [];
      for (const field of fields) {
        const value = FermentiSearch._getNestedValue(item, field);
        if (value != null) {
          if (Array.isArray(value)) {
            parts.push(value.join(' ').toLowerCase());
          } else {
            parts.push(String(value).toLowerCase());
          }
        }
      }
      tokens.set(item, parts.join(' '));
    }

    return { items, fields, tokens };
  },

  /**
   * Search an index with a query string. Supports fuzzy matching.
   * @param {{ items: Array<object>, fields: string[], tokens: Map<object, string> }} index - Built index
   * @param {string} query - Search query
   * @param {object} [opts] - Search options
   * @param {number} [opts.limit=50] - Maximum number of results
   * @param {number} [opts.threshold=0.3] - Fuzzy match threshold (0 = exact, 1 = loose)
   * @returns {Array<{ item: object, score: number }>} Sorted results with scores
   */
  search(index, query, opts = {}) {
    const { limit = 50, threshold = 0.3 } = opts;

    if (!query || !query.trim()) {
      return index.items.map((item) => ({ item, score: 1 }));
    }

    const queryLower = query.toLowerCase().trim();
    const queryTerms = queryLower.split(/\s+/);
    const results = [];

    for (const item of index.items) {
      const tokenStr = index.tokens.get(item);
      if (!tokenStr) continue;

      let score = 0;
      let allTermsMatch = true;

      for (const term of queryTerms) {
        // Exact substring match
        if (tokenStr.includes(term)) {
          // Bonus for exact match
          const idx = tokenStr.indexOf(term);
          score += 1;
          // Bonus if match is at the start of a word
          if (idx === 0 || tokenStr[idx - 1] === ' ') {
            score += 0.5;
          }
        } else {
          // Fuzzy match
          const fuzzyScore = FermentiSearch._fuzzyMatch(term, tokenStr);
          if (fuzzyScore >= (1 - threshold)) {
            score += fuzzyScore * 0.7;
          } else {
            allTermsMatch = false;
          }
        }
      }

      if (allTermsMatch && score > 0) {
        results.push({ item, score });
      }
    }

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);

    return results.slice(0, limit);
  },

  /**
   * Compute a fuzzy match score between a search term and a target string.
   * @param {string} term - The search term
   * @param {string} target - The target string to match against
   * @returns {number} Score between 0 (no match) and 1 (perfect match)
   * @private
   */
  _fuzzyMatch(term, target) {
    if (!term || !target) return 0;

    let termIdx = 0;
    let score = 0;
    let consecutive = 0;
    let lastMatchIdx = -1;

    for (let i = 0; i < target.length && termIdx < term.length; i++) {
      if (target[i] === term[termIdx]) {
        score += 1;
        // Bonus for consecutive matches
        if (lastMatchIdx === i - 1) {
          consecutive++;
          score += consecutive * 0.5;
        } else {
          consecutive = 0;
        }
        // Bonus for matching at word boundaries
        if (i === 0 || target[i - 1] === ' ' || target[i - 1] === '-' || target[i - 1] === '_') {
          score += 0.5;
        }
        lastMatchIdx = i;
        termIdx++;
      }
    }

    // All characters in the term must match
    if (termIdx < term.length) return 0;

    // Normalize score
    const maxScore = term.length + (term.length - 1) * 0.5 + term.length * 0.5;
    return score / maxScore;
  },

  /**
   * Get a nested value from an object using dot-notation path.
   * @param {object} obj - The object
   * @param {string} path - Dot-separated path (e.g. 'meta.tags')
   * @returns {*} The value at the path, or undefined
   * @private
   */
  _getNestedValue(obj, path) {
    const keys = path.split('.');
    let current = obj;
    for (const key of keys) {
      if (current == null || typeof current !== 'object') return undefined;
      current = current[key];
    }
    return current;
  },

  /**
   * Create a debounced version of a function.
   * @param {Function} fn - The function to debounce
   * @param {number} [delay=250] - Delay in milliseconds
   * @returns {Function} Debounced function with a .cancel() method
   */
  debounce(fn, delay = 250) {
    let timer = null;

    const debounced = function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
      }, delay);
    };

    debounced.cancel = function () {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };

    return debounced;
  },
};

export default FermentiSearch;
