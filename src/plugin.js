/**
 * Fermenti - Vue Plugin
 * Registers all Fermenti components globally via app.use(Fermenti)
 */

import FiButton from './components/FiButton.js';
import FiCard from './components/FiCard.js';
import FiSearchBar from './components/FiSearchBar.js';
import FiFilterPanel from './components/FiFilterPanel.js';
import FiTabs from './components/FiTabs.js';
import FiToggle from './components/FiToggle.js';
import FiChip from './components/FiChip.js';
import FiCollapsible from './components/FiCollapsible.js';
import FiChangelog from './components/FiChangelog.js';
import FiBadge from './components/FiBadge.js';
import FiInput from './components/FiInput.js';
import FiTextarea from './components/FiTextarea.js';
import FiSelect from './components/FiSelect.js';
import FiAvatar from './components/FiAvatar.js';
import FiToast from './components/FiToast.js';
import FiProgress from './components/FiProgress.js';
import FiStepper from './components/FiStepper.js';
import FiNavBar from './components/FiNavBar.js';
import FiSidebar from './components/FiSidebar.js';
import FiGrid from './components/FiGrid.js';
import FiEmptyState from './components/FiEmptyState.js';
import FiIcon from './components/FiIcon.js';
import FiModal from './components/FiModal.js';
import FiTextEditor from './components/editors/FiTextEditor.js';
import FiListEditor from './components/editors/FiListEditor.js';
import FiTagEditor from './components/editors/FiTagEditor.js';
import FiMediaPicker from './components/editors/FiMediaPicker.js';

const components = {
  'fi-button': FiButton,
  'fi-card': FiCard,
  'fi-search-bar': FiSearchBar,
  'fi-filter-panel': FiFilterPanel,
  'fi-tabs': FiTabs,
  'fi-toggle': FiToggle,
  'fi-chip': FiChip,
  'fi-collapsible': FiCollapsible,
  'fi-changelog': FiChangelog,
  'fi-badge': FiBadge,
  'fi-input': FiInput,
  'fi-textarea': FiTextarea,
  'fi-select': FiSelect,
  'fi-avatar': FiAvatar,
  'fi-toast': FiToast,
  'fi-progress': FiProgress,
  'fi-stepper': FiStepper,
  'fi-nav-bar': FiNavBar,
  'fi-sidebar': FiSidebar,
  'fi-grid': FiGrid,
  'fi-empty-state': FiEmptyState,
  'fi-icon': FiIcon,
  'fi-modal': FiModal,
  'fi-text-editor': FiTextEditor,
  'fi-list-editor': FiListEditor,
  'fi-tag-editor': FiTagEditor,
  'fi-media-picker': FiMediaPicker,
};

export default {
  install(app) {
    for (const [name, component] of Object.entries(components)) {
      app.component(name, component);
    }
  },
};
