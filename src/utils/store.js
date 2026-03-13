/**
 * Fermenti - Generic localStorage Store
 * Configurable persistent storage wrapper with import/export support
 */

/**
 * Create a FermentiStore instance.
 * @param {string} storageKey - The localStorage key to use
 * @param {Function} defaultStateFn - A function that returns the default state object
 * @returns {object} Store instance with load/save/export/import/clear methods
 */
function createStore(storageKey, defaultStateFn) {
  if (!storageKey || typeof storageKey !== 'string') {
    throw new Error('FermentiStore: storageKey must be a non-empty string');
  }
  if (typeof defaultStateFn !== 'function') {
    throw new Error('FermentiStore: defaultStateFn must be a function');
  }

  const store = {
    /** The localStorage key for this store */
    key: storageKey,

    /** Returns a fresh copy of the default state */
    getDefaults() {
      return defaultStateFn();
    },

    /**
     * Load state from localStorage, merging with defaults.
     * @returns {object} The loaded and merged state
     */
    load() {
      const defaults = defaultStateFn();
      try {
        const raw = localStorage.getItem(storageKey);
        if (!raw) return defaults;
        const parsed = JSON.parse(raw);
        return store.mergeDefaults(parsed, defaults);
      } catch (e) {
        console.warn(`FermentiStore: Failed to load "${storageKey}":`, e);
        return defaults;
      }
    },

    /**
     * Save state to localStorage.
     * @param {object} state - The state object to persist
     */
    save(state) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
      } catch (e) {
        console.warn(`FermentiStore: Failed to save "${storageKey}":`, e);
      }
    },

    /**
     * Deep merge loaded data with defaults, ensuring all default keys exist.
     * Existing values in `data` take precedence over defaults.
     * @param {object} data - The loaded data
     * @param {object} defaults - The default state
     * @returns {object} Merged result
     */
    mergeDefaults(data, defaults) {
      if (!data || typeof data !== 'object' || Array.isArray(data)) return defaults;
      if (!defaults || typeof defaults !== 'object' || Array.isArray(defaults)) return data;

      const result = { ...defaults };
      for (const key of Object.keys(data)) {
        if (
          key in defaults &&
          typeof defaults[key] === 'object' &&
          defaults[key] !== null &&
          !Array.isArray(defaults[key]) &&
          typeof data[key] === 'object' &&
          data[key] !== null &&
          !Array.isArray(data[key])
        ) {
          result[key] = store.mergeDefaults(data[key], defaults[key]);
        } else {
          result[key] = data[key];
        }
      }
      return result;
    },

    /**
     * Export the current stored state as a JSON string.
     * @returns {string} JSON string of the stored state
     */
    exportJSON() {
      const state = store.load();
      return JSON.stringify(state, null, 2);
    },

    /**
     * Import state from a JSON string, merging with defaults.
     * @param {string} jsonStr - JSON string to import
     * @returns {{ success: boolean, error?: string }} Result of the import
     */
    importJSON(jsonStr) {
      try {
        const data = JSON.parse(jsonStr);
        const defaults = defaultStateFn();
        const merged = store.mergeDefaults(data, defaults);
        store.save(merged);
        return { success: true };
      } catch (e) {
        return { success: false, error: e.message };
      }
    },

    /**
     * Clear the stored state from localStorage.
     */
    clear() {
      try {
        localStorage.removeItem(storageKey);
      } catch (e) {
        console.warn(`FermentiStore: Failed to clear "${storageKey}":`, e);
      }
    },

    /**
     * Get the approximate size of the stored data in bytes.
     * @returns {number} Size in bytes (0 if nothing stored)
     */
    getStorageSize() {
      try {
        const raw = localStorage.getItem(storageKey);
        if (!raw) return 0;
        // Approximate byte size (UTF-16 chars * 2 bytes)
        return raw.length * 2;
      } catch {
        return 0;
      }
    },

    /**
     * Get the storage size as a human-readable string.
     * @returns {string} e.g. "1.5 KB", "2.3 MB"
     */
    getStorageSizeFormatted() {
      const bytes = store.getStorageSize();
      if (bytes === 0) return '0 B';
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    },
  };

  return store;
}

const FermentiStore = { createStore };

export default FermentiStore;
export { createStore };
