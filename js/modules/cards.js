// Card creation and animation functionality

import { calculateReadingTime, formatTimeAgo } from './utils.js';

/**
 * Create a card element from article data
 * @param {Object} article - Article data object
 * @param {boolean} showDate - Whether to show the date
 * @param {boolean} isWide - Whether the card should be wide
 * @returns {HTMLElement} The created card element
 */
export function createCard(article, showDate = false, isWide = false) {
    const card = document.createElement('div');
    card.className = isWide ? 'card card-wide' : 'card';
    card.setAttribute('data-reading-time', '');

    const timeAgo = showDate ? formatTimeAgo(article.date) : '';
    const dateDisplay = showDate ? `<span class="article-date">${timeAgo}</span>` : '';

    card.innerHTML = `
        <img src="${article.image}" alt="Article Image">
        <div class="card-content">
            <div class="card-meta">
                <span class="reading-time">${article.readingTime} min read</span>
                <span class="card-category">${article.category}</span>
                ${dateDisplay}
            </div>
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="#" class="read-more">Read More</a>
        </div>
    `;

    // Calculate and update reading time
    const readingTimeElement = card.querySelector('.reading-time');
    if (readingTimeElement) {
        const minutes = calculateReadingTime(card);
        readingTimeElement.textContent = `${minutes} min read`;
    }

    // Add fade-in animation
    addCardAnimation(card);

    return card;
}

/**
 * Add fade-in animation to a card using IntersectionObserver
 * @param {HTMLElement} card - The card element
 */
function addCardAnimation(card) {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(card);
}

/**
 * Initialize card animations for existing cards in the DOM
 */
export function initCardAnimations() {
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
}

/**
 * Update reading time for all cards with data-reading-time attribute
 */
export function updateReadingTimes() {
    const cardsWithReadingTime = document.querySelectorAll('.card[data-reading-time]');
    cardsWithReadingTime.forEach(card => {
        const readingTimeElement = card.querySelector('.reading-time');
        if (readingTimeElement) {
            const minutes = calculateReadingTime(card);
            readingTimeElement.textContent = `${minutes} min read`;
        }
    });
}

