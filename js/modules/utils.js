// Utility functions

/**
 * Calculate reading time for a card based on its text content
 * @param {HTMLElement} card - The card element
 * @returns {number} Reading time in minutes
 */
export function calculateReadingTime(card) {
    const title = card.querySelector('h3')?.textContent || '';
    const description = card.querySelector('.card-content p')?.textContent || '';
    const fullText = title + ' ' + description;

    // Count words (average reading speed: 200-250 words per minute, using 225)
    const wordCount = fullText.trim().split(/\s+/).filter(word => word.length > 0).length;
    const readingTime = Math.ceil(wordCount / 225);

    // Minimum 1 minute
    return Math.max(1, readingTime);
}

/**
 * Format time ago string from a date
 * @param {Date} date - The date to format
 * @returns {string} Formatted time ago string
 */
export function formatTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
        return `${diffMins} min ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
}

