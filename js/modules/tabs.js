// Tabs functionality and content loading

import { createCard } from './cards.js';
import { timelineData } from '../../data/timelineData.js';
import { favoriteTags, allNewsData } from '../../data/favoriteTagsData.js';

// State tracking for each tab
const tabState = {
    'top-stories': {
        currentIndex: 0,
        data: null,
        loaded: true
    },
    'timeline': {
        currentIndex: 0,
        data: null,
        loaded: false
    },
    'favorite-tags': {
        currentIndex: 0,
        data: null,
        loaded: false
    }
};

// Prepare timeline data (sorted by date)
const sortedTimeline = [...timelineData].sort((a, b) => b.date - a.date);
sortedTimeline.forEach((article, index) => {
    article.isWide = index === 0 || index === 3;
});
tabState['timeline'].data = sortedTimeline;

// Prepare favorite tags data
const favoriteTagsData = allNewsData.filter(article =>
    article.tags.some(tag => favoriteTags.includes(tag))
);
favoriteTagsData.forEach((article, index) => {
    article.isWide = index === 0 || index === 3 || index === 7;
});
tabState['favorite-tags'].data = favoriteTagsData;

/**
 * Update Load More button state
 * @param {string} tabName - Name of the tab
 */
export function updateLoadMoreButton(tabName) {
    const buttonId = `${tabName}-load-more`;
    const button = document.getElementById(buttonId);
    if (!button) return;

    const state = tabState[tabName];
    const hasMoreData = state && state.data && state.currentIndex < state.data.length;

    if (hasMoreData) {
        button.disabled = true;
        button.classList.add('hidden');
    } else {
        button.disabled = false;
        button.classList.remove('hidden');
    }
}

/**
 * Load one row at a time (3 columns)
 * @param {string} tabName - Name of the tab
 * @returns {boolean} Whether more data is available
 */
export function loadNextRow(tabName) {
    const state = tabState[tabName];
    if (!state.data || state.currentIndex >= state.data.length) {
        updateLoadMoreButton(tabName);
        return false;
    }

    const gridId = `${tabName}-grid`;
    const grid = document.getElementById(gridId);
    if (!grid) return false;

    const showDate = tabName === 'timeline';
    let columnsUsed = 0;
    const maxColumns = 3;

    // Load cards until we fill a row (3 columns)
    while (columnsUsed < maxColumns && state.currentIndex < state.data.length) {
        const article = state.data[state.currentIndex];
        const isWide = article.isWide || false;
        const columnsNeeded = isWide ? 2 : 1;

        // Check if this card fits in the current row
        if (columnsUsed + columnsNeeded > maxColumns) {
            break;
        }

        const card = createCard(article, showDate, isWide);
        grid.appendChild(card);
        columnsUsed += columnsNeeded;
        state.currentIndex++;
    }

    updateLoadMoreButton(tabName);
    return state.currentIndex < state.data.length;
}

/**
 * Load initial rows (2 rows to start)
 * @param {string} tabName - Name of the tab
 */
function loadInitialRows(tabName) {
    const state = tabState[tabName];
    if (!state.data) return;

    let rowsLoaded = 0;
    const initialRows = 2;

    while (rowsLoaded < initialRows && state.currentIndex < state.data.length) {
        const hadMoreData = loadNextRow(tabName);
        rowsLoaded++;
        if (!hadMoreData) break;
    }

    state.loaded = true;
    updateLoadMoreButton(tabName);
}

/**
 * Initialize tabs functionality
 */
export function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');

            // Load initial content if needed
            if (targetTab === 'timeline' && !tabState['timeline'].loaded) {
                loadInitialRows('timeline');
            } else if (targetTab === 'favorite-tags' && !tabState['favorite-tags'].loaded) {
                loadInitialRows('favorite-tags');
            } else {
                if (targetTab === 'timeline' || targetTab === 'favorite-tags') {
                    updateLoadMoreButton(targetTab);
                }
            }
        });
    });

    // Load More Button Event Listeners
    const timelineLoadMoreBtn = document.getElementById('timeline-load-more');
    const favoriteTagsLoadMoreBtn = document.getElementById('favorite-tags-load-more');

    if (timelineLoadMoreBtn) {
        timelineLoadMoreBtn.classList.add('hidden');
        timelineLoadMoreBtn.addEventListener('click', () => {
            loadNextRow('timeline');
        });
    }

    if (favoriteTagsLoadMoreBtn) {
        favoriteTagsLoadMoreBtn.classList.add('hidden');
        favoriteTagsLoadMoreBtn.addEventListener('click', () => {
            loadNextRow('favorite-tags');
        });
    }
}

/**
 * Get tab state (for scroll handler)
 * @returns {Object} Tab state object
 */
export function getTabState() {
    return tabState;
}

