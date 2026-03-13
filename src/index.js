/**
 * Fermenti - Main Entry Point
 * Exports all components, utilities, and the Vue plugin
 */

// Styles
import './css/fermenti.css';

// Plugin
export { default as default } from './plugin.js';
export { default as FermentiPlugin } from './plugin.js';

// Components
export { default as FiButton } from './components/FiButton.js';
export { default as FiCard } from './components/FiCard.js';
export { default as FiSearchBar } from './components/FiSearchBar.js';
export { default as FiFilterPanel } from './components/FiFilterPanel.js';
export { default as FiTabs } from './components/FiTabs.js';
export { default as FiToggle } from './components/FiToggle.js';
export { default as FiChip } from './components/FiChip.js';
export { default as FiCollapsible } from './components/FiCollapsible.js';
export { default as FiChangelog } from './components/FiChangelog.js';
export { default as FiBadge } from './components/FiBadge.js';
export { default as FiInput } from './components/FiInput.js';
export { default as FiTextarea } from './components/FiTextarea.js';
export { default as FiSelect } from './components/FiSelect.js';
export { default as FiAvatar } from './components/FiAvatar.js';
export { default as FiToast } from './components/FiToast.js';
export { default as FiProgress } from './components/FiProgress.js';
export { default as FiStepper } from './components/FiStepper.js';
export { default as FiNavBar } from './components/FiNavBar.js';
export { default as FiSidebar } from './components/FiSidebar.js';
export { default as FiGrid } from './components/FiGrid.js';
export { default as FiEmptyState } from './components/FiEmptyState.js';
export { default as FiIcon } from './components/FiIcon.js';
export { default as FiModal } from './components/FiModal.js';

// Editor Components
export { default as FiTextEditor } from './components/editors/FiTextEditor.js';
export { default as FiListEditor } from './components/editors/FiListEditor.js';
export { default as FiTagEditor } from './components/editors/FiTagEditor.js';
export { default as FiMediaPicker } from './components/editors/FiMediaPicker.js';

// Utilities
export { default as FermentiFormat } from './utils/formatting.js';
export { default as FermentiSearch } from './utils/search.js';
export { createStore as createStore } from './utils/store.js';

// Theme
export { default as fermentiPreset } from './theme.js';

// Icons
export { builtinIcons } from './icons.js';
