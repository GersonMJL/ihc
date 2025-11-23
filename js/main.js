// Main entry point for the application

import { initNavigation } from './modules/navigation.js';
import { initDarkMode } from './modules/darkMode.js';
import { initBackToTop } from './modules/backToTop.js';
import { initSearch } from './modules/search.js';
import { initCardAnimations, updateReadingTimes } from './modules/cards.js';
import { initTabs } from './modules/tabs.js';
import { initScroll } from './modules/scroll.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initDarkMode();
    initBackToTop();
    initSearch();
    initCardAnimations();
    updateReadingTimes();
    initTabs();
    initScroll();
});

