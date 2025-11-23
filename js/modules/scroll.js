// Scroll handling and infinite loading

import { loadNextRow, updateLoadMoreButton, getTabState } from './tabs.js';

let isLoading = false;
const scrollThreshold = 300; // Load more when 300px from bottom

/**
 * Handle scroll events for infinite loading
 */
export function handleScroll() {
    const activeTab = document.querySelector('.tab-content.active');
    if (!activeTab) return;

    const activeTabId = activeTab.id.replace('-tab', '');
    const tabState = getTabState();
    const state = tabState[activeTabId];

    // Skip scroll loading for top-stories (static content)
    if (activeTabId === 'top-stories' || !state || !state.data) return;

    const grid = activeTab.querySelector('.card-grid');
    if (!grid) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const distanceFromBottom = documentHeight - (scrollTop + windowHeight);

    // Always update button visibility when scrolling
    updateLoadMoreButton(activeTabId);

    // Auto-load when near bottom (but leave some space at the very bottom for button visibility)
    if (!isLoading && distanceFromBottom <= scrollThreshold && distanceFromBottom > 50) {
        isLoading = true;

        loadNextRow(activeTabId);

        // Small delay to prevent rapid firing
        setTimeout(() => {
            isLoading = false;
            updateLoadMoreButton(activeTabId);
        }, 300);
    }
}

/**
 * Initialize scroll handlers
 */
export function initScroll() {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
}

