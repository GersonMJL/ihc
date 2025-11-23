document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const hamburger = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');

    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });

    // --- Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const html = document.documentElement;

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        darkModeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    darkModeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        if (currentTheme === 'light') {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            darkModeToggle.textContent = '☀️';
        } else {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            darkModeToggle.textContent = '🌙';
        }
    });

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Initial Card Fade-in Animation ---
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

    // --- Header Search Handler ---
    const headerSearch = document.getElementById('header-search');
    const searchInput = document.getElementById('search-input');

    if (headerSearch) {
        headerSearch.addEventListener('submit', (e) => {
            e.preventDefault();
            const q = searchInput.value.trim();
            if (!q) return;
            // For now, log the query and show a lightweight feedback.
            console.log('Search query:', q);
            // In a real app this would route to a search results page or call an API.
            alert(`Searching for: ${q}`);
            searchInput.blur();
        });
    }

    // --- Reading Time Calculator ---
    function calculateReadingTime(card) {
        // Get all text content from the card (title + description)
        const title = card.querySelector('h3')?.textContent || '';
        const description = card.querySelector('.card-content p')?.textContent || '';
        const fullText = title + ' ' + description;

        // Count words (average reading speed: 200-250 words per minute, using 225)
        const wordCount = fullText.trim().split(/\s+/).filter(word => word.length > 0).length;
        const readingTime = Math.ceil(wordCount / 225);

        // Minimum 1 minute
        return Math.max(1, readingTime);
    }

    // Update reading time for all cards
    const cardsWithReadingTime = document.querySelectorAll('.card[data-reading-time]');
    cardsWithReadingTime.forEach(card => {
        const readingTimeElement = card.querySelector('.reading-time');
        if (readingTimeElement) {
            const minutes = calculateReadingTime(card);
            readingTimeElement.textContent = `${minutes} min read`;
        }
    });

    // --- Tabs Functionality ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // State tracking for each tab
    const tabState = {
        'top-stories': {
            currentIndex: 0,
            data: null, // Will use static HTML content
            loaded: true
        },
        'timeline': {
            currentIndex: 0,
            data: null, // Will be set after data is defined
            loaded: false
        },
        'favorite-tags': {
            currentIndex: 0,
            data: null, // Will be set after data is defined
            loaded: false
        }
    };

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
                // Tab already loaded, just update button state
                if (targetTab === 'timeline' || targetTab === 'favorite-tags') {
                    updateLoadMoreButton(targetTab);
                }
            }
        });
    });

    // --- Load More Button Event Listeners ---
    const timelineLoadMoreBtn = document.getElementById('timeline-load-more');
    const favoriteTagsLoadMoreBtn = document.getElementById('favorite-tags-load-more');

    // Initially hide buttons (they'll be shown when tabs are loaded)
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

    // --- Mock Data for Timeline (most recent news) ---
    const timelineData = [
        {
            title: "Breaking: Major Tech Company Announces Revolutionary Product",
            description: "A leading technology firm has just unveiled a groundbreaking device that could change the industry forever.",
            category: "Technology",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Breaking",
            readingTime: 3,
            date: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
        },
        {
            title: "Latest Economic Report Shows Positive Trends",
            description: "New data reveals encouraging signs for global economic recovery in the coming quarters.",
            category: "Finance",
            image: "https://placehold.co/400x225/6B7280/FFFFFF?text=Economy",
            readingTime: 4,
            date: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
        },
        {
            title: "Sports Update: Championship Game Results",
            description: "The highly anticipated match concluded with surprising results that will reshape the league standings.",
            category: "Sports",
            image: "https://placehold.co/400x225/5F7A5F/FFFFFF?text=Sports",
            readingTime: 2,
            date: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
        },
        {
            title: "Health Breakthrough: New Treatment Approved",
            description: "Medical authorities have approved a promising new treatment that could help millions of patients worldwide.",
            category: "Health",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Health",
            readingTime: 5,
            date: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
        },
        {
            title: "International Summit Concludes with New Agreements",
            description: "World leaders have reached consensus on several key issues affecting global cooperation and trade.",
            category: "World",
            image: "https://placehold.co/400x225/5F7A5F/FFFFFF?text=World",
            readingTime: 6,
            date: new Date(Date.now() - 8 * 60 * 60 * 1000) // 8 hours ago
        },
        {
            title: "Entertainment Industry Announces Major Awards",
            description: "The annual awards ceremony recognized outstanding achievements across multiple categories and genres.",
            category: "Entertainment",
            image: "https://placehold.co/400x225/6B7280/FFFFFF?text=Entertainment",
            readingTime: 4,
            date: new Date(Date.now() - 12 * 60 * 60 * 1000) // 12 hours ago
        },
        {
            title: "Science Discovery: New Planet Found in Habitable Zone",
            description: "Astronomers have discovered a potentially habitable exoplanet that could support life as we know it.",
            category: "Science",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Science",
            readingTime: 7,
            date: new Date(Date.now() - 18 * 60 * 60 * 1000) // 18 hours ago
        },
        {
            title: "Business News: Startup Reaches Billion Dollar Valuation",
            description: "A tech startup has achieved unicorn status after a successful funding round led by major investors.",
            category: "Business",
            image: "https://placehold.co/400x225/6B7280/FFFFFF?text=Business",
            readingTime: 3,
            date: new Date(Date.now() - 24 * 60 * 60 * 1000) // 24 hours ago
        },
        {
            title: "Climate Summit: Nations Commit to Ambitious Carbon Reduction Goals",
            description: "World leaders have pledged to accelerate efforts to combat climate change with new binding agreements.",
            category: "World",
            image: "https://placehold.co/400x225/5F7A5F/FFFFFF?text=Climate",
            readingTime: 6,
            date: new Date(Date.now() - 30 * 60 * 60 * 1000) // 30 hours ago
        },
        {
            title: "Cybersecurity Alert: New Threat Detected in Global Networks",
            description: "Security experts warn of a sophisticated cyber attack targeting critical infrastructure systems worldwide.",
            category: "Technology",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Security",
            readingTime: 5,
            date: new Date(Date.now() - 36 * 60 * 60 * 1000) // 36 hours ago
        },
        {
            title: "Olympic Games: Record-Breaking Performance Sets New World Standard",
            description: "An athlete has shattered a decades-old world record, inspiring a new generation of competitors.",
            category: "Sports",
            image: "https://placehold.co/400x225/5F7A5F/FFFFFF?text=Olympics",
            readingTime: 4,
            date: new Date(Date.now() - 42 * 60 * 60 * 1000) // 42 hours ago
        },
        {
            title: "Medical Breakthrough: Gene Therapy Shows Promise for Rare Diseases",
            description: "Clinical trials demonstrate remarkable success in treating previously incurable genetic conditions.",
            category: "Health",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Gene",
            readingTime: 7,
            date: new Date(Date.now() - 48 * 60 * 60 * 1000) // 2 days ago
        },
        {
            title: "Stock Market: Tech Sector Sees Unprecedented Growth",
            description: "Technology stocks surge to all-time highs as investors show confidence in digital transformation trends.",
            category: "Finance",
            image: "https://placehold.co/400x225/6B7280/FFFFFF?text=Stocks",
            readingTime: 4,
            date: new Date(Date.now() - 54 * 60 * 60 * 1000) // 54 hours ago
        },
        {
            title: "Space Mission: Successful Landing on Distant Moon",
            description: "A spacecraft has successfully landed on a moon of Jupiter, marking a historic achievement in space exploration.",
            category: "Science",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Space",
            readingTime: 8,
            date: new Date(Date.now() - 60 * 60 * 60 * 1000) // 60 hours ago
        },
        {
            title: "Film Festival: Independent Movies Take Center Stage",
            description: "This year's festival showcases groundbreaking independent films that challenge traditional storytelling.",
            category: "Entertainment",
            image: "https://placehold.co/400x225/6B7280/FFFFFF?text=Film",
            readingTime: 3,
            date: new Date(Date.now() - 66 * 60 * 60 * 1000) // 66 hours ago
        },
        {
            title: "Renewable Energy: Solar Power Reaches Cost Parity",
            description: "Solar energy has become as affordable as fossil fuels, accelerating the transition to clean energy.",
            category: "Technology",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Solar",
            readingTime: 5,
            date: new Date(Date.now() - 72 * 60 * 60 * 1000) // 3 days ago
        },
        {
            title: "Archaeological Discovery: Ancient City Unearthed",
            description: "Archaeologists have discovered a lost city that provides new insights into ancient civilizations.",
            category: "Culture",
            image: "https://placehold.co/400x225/6B7280/FFFFFF?text=Ancient",
            readingTime: 6,
            date: new Date(Date.now() - 78 * 60 * 60 * 1000) // 78 hours ago
        },
        {
            title: "Mental Health: New Therapy Approach Shows 80% Success Rate",
            description: "A revolutionary approach to mental health treatment is showing remarkable results in clinical studies.",
            category: "Health",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Therapy",
            readingTime: 5,
            date: new Date(Date.now() - 84 * 60 * 60 * 1000) // 84 hours ago
        },
        {
            title: "Cryptocurrency: Major Bank Adopts Digital Currency",
            description: "A leading financial institution announces plans to integrate cryptocurrency into its services.",
            category: "Finance",
            image: "https://placehold.co/400x225/6B7280/FFFFFF?text=Crypto",
            readingTime: 4,
            date: new Date(Date.now() - 90 * 60 * 60 * 1000) // 90 hours ago
        },
        {
            title: "Robotics: Humanoid Robot Performs Complex Surgery",
            description: "A surgical robot has successfully performed a delicate operation, demonstrating advanced AI capabilities.",
            category: "Technology",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Robot",
            readingTime: 6,
            date: new Date(Date.now() - 96 * 60 * 60 * 1000) // 4 days ago
        },
        {
            title: "Tennis Championship: Underdog Wins Grand Slam Title",
            description: "In a stunning upset, a relatively unknown player has claimed victory at a major tennis tournament.",
            category: "Sports",
            image: "https://placehold.co/400x225/5F7A5F/FFFFFF?text=Tennis",
            readingTime: 3,
            date: new Date(Date.now() - 102 * 60 * 60 * 1000) // 102 hours ago
        },
        {
            title: "Ocean Research: Deep Sea Expedition Discovers New Species",
            description: "Marine biologists have identified dozens of previously unknown species in the ocean's depths.",
            category: "Science",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Ocean",
            readingTime: 7,
            date: new Date(Date.now() - 108 * 60 * 60 * 1000) // 108 hours ago
        },
        {
            title: "Music Industry: Virtual Reality Concerts Gain Popularity",
            description: "Artists are embracing VR technology to create immersive concert experiences for global audiences.",
            category: "Entertainment",
            image: "https://placehold.co/400x225/6B7280/FFFFFF?text=VR",
            readingTime: 4,
            date: new Date(Date.now() - 114 * 60 * 60 * 1000) // 114 hours ago
        },
        {
            title: "Trade Agreement: New Partnership Strengthens Economic Ties",
            description: "Two major economies have signed a comprehensive trade agreement expected to boost growth.",
            category: "Business",
            image: "https://placehold.co/400x225/6B7280/FFFFFF?text=Trade",
            readingTime: 5,
            date: new Date(Date.now() - 120 * 60 * 60 * 1000) // 5 days ago
        },
        {
            title: "Pandemic Response: Global Health Organization Reports Progress",
            description: "International health officials announce significant improvements in managing global health crises.",
            category: "Health",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Health",
            readingTime: 6,
            date: new Date(Date.now() - 126 * 60 * 60 * 1000) // 126 hours ago
        },
        {
            title: "Artificial Intelligence: New Model Surpasses Human Performance",
            description: "Researchers have developed an AI system that outperforms humans in complex problem-solving tasks.",
            category: "Technology",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=AI",
            readingTime: 8,
            date: new Date(Date.now() - 132 * 60 * 60 * 1000) // 132 hours ago
        },
        {
            title: "Literature: Nobel Prize Winner Announces New Novel",
            description: "A celebrated author has released their latest work, already receiving critical acclaim worldwide.",
            category: "Culture",
            image: "https://placehold.co/400x225/6B7280/FFFFFF?text=Book",
            readingTime: 3,
            date: new Date(Date.now() - 138 * 60 * 60 * 1000) // 138 hours ago
        },
        {
            title: "Basketball: Rookie Player Breaks Scoring Record",
            description: "A first-year player has set a new record for points scored in a single game, surprising fans and analysts.",
            category: "Sports",
            image: "https://placehold.co/400x225/5F7A5F/FFFFFF?text=Basketball",
            readingTime: 3,
            date: new Date(Date.now() - 144 * 60 * 60 * 1000) // 6 days ago
        }
    ];

    // --- Mock Data for Favorite Tags (only favorited tags) ---
    const favoriteTags = ['Technology', 'Science', 'Health']; // User's favorite tags
    const allNewsData = [
        {
            title: "AI Breakthrough: Machine Learning Model Achieves Human-Level Performance",
            description: "Researchers have developed an AI system that matches human capabilities in complex reasoning tasks.",
            category: "Technology",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=AI",
            readingTime: 8,
            tags: ['Technology', 'Science']
        },
        {
            title: "Medical Research: New Vaccine Shows 95% Effectiveness",
            description: "Clinical trials demonstrate exceptional results for a new vaccine targeting a common infectious disease.",
            category: "Health",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Vaccine",
            readingTime: 5,
            tags: ['Health', 'Science']
        },
        {
            title: "Quantum Computing: Major Milestone Reached",
            description: "Scientists have achieved quantum supremacy in solving a problem that would take classical computers millennia.",
            category: "Science",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Quantum",
            readingTime: 6,
            tags: ['Science', 'Technology']
        },
        {
            title: "Tech Innovation: Revolutionary Battery Technology Unveiled",
            description: "A new battery design promises to charge in minutes and last for days, revolutionizing mobile devices.",
            category: "Technology",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Battery",
            readingTime: 4,
            tags: ['Technology']
        },
        {
            title: "Health Study: Exercise Linked to Longevity",
            description: "Comprehensive research shows that regular physical activity can extend life expectancy by several years.",
            category: "Health",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Exercise",
            readingTime: 5,
            tags: ['Health', 'Science']
        },
        {
            title: "Space Exploration: Mars Mission Discovers Water Evidence",
            description: "Latest data from the Mars rover provides compelling evidence of ancient water sources on the red planet.",
            category: "Science",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Mars",
            readingTime: 7,
            tags: ['Science']
        },
        {
            title: "Neural Interface Technology: Brain-Computer Connection Achieves Breakthrough",
            description: "Scientists have successfully developed a neural interface that allows direct communication between the human brain and computers, opening new possibilities for medical treatment and human enhancement.",
            category: "Technology",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Neural",
            readingTime: 9,
            tags: ['Technology', 'Science', 'Health']
        },
        {
            title: "Cancer Treatment: New Immunotherapy Shows 90% Remission Rate",
            description: "A groundbreaking immunotherapy treatment has demonstrated remarkable success in clinical trials, offering hope to patients with previously untreatable forms of cancer.",
            category: "Health",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Cancer",
            readingTime: 6,
            tags: ['Health', 'Science']
        },
        {
            title: "Climate Science: Carbon Capture Technology Reaches Commercial Viability",
            description: "Engineers have developed a cost-effective carbon capture system that can remove CO2 from the atmosphere at scale, marking a significant step forward in climate change mitigation.",
            category: "Science",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Climate",
            readingTime: 7,
            tags: ['Science', 'Technology']
        },
        {
            title: "Telemedicine Revolution: AI-Powered Diagnostics Transform Healthcare Access",
            description: "Advanced AI systems are enabling accurate remote medical diagnoses, bringing quality healthcare to underserved communities worldwide and revolutionizing the medical field.",
            category: "Health",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Telemed",
            readingTime: 5,
            tags: ['Health', 'Technology']
        },
        {
            title: "AI Breakthrough: Machine Learning Model Achieves Human-Level Performance",
            description: "Researchers have developed an AI system that matches human capabilities in complex reasoning tasks.",
            category: "Technology",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=AI",
            readingTime: 8,
            tags: ['Technology', 'Science']
        },
        {
            title: "Medical Research: New Vaccine Shows 95% Effectiveness",
            description: "Clinical trials demonstrate exceptional results for a new vaccine targeting a common infectious disease.",
            category: "Health",
            image: "https://placehold.co/400x225/1e3a5f/FFFFFF?text=Vaccine",
            readingTime: 5,
            tags: ['Health', 'Science']
        },
    ];

    // Prepare timeline data (sorted by date)
    const sortedTimeline = [...timelineData].sort((a, b) => b.date - a.date);
    // Mark which cards should be wide
    sortedTimeline.forEach((article, index) => {
        article.isWide = index === 0 || index === 3;
    });
    tabState['timeline'].data = sortedTimeline;

    // Prepare favorite tags data
    const favoriteTagsData = allNewsData.filter(article =>
        article.tags.some(tag => favoriteTags.includes(tag))
    );
    favoriteTagsData.forEach((article, index) => {
        // Mark first item and one of the new items (index 4) as wide
        article.isWide = index === 0 || index === 3 || index === 7;
    });
    tabState['favorite-tags'].data = favoriteTagsData;

    // --- Function to format time ago ---
    function formatTimeAgo(date) {
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

    // --- Function to create a card element ---
    function createCard(article, showDate = false, isWide = false) {
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

        return card;
    }

    // --- Function to update Load More button state ---
    function updateLoadMoreButton(tabName) {
        const buttonId = `${tabName}-load-more`;
        const button = document.getElementById(buttonId);
        if (!button) return;

        const state = tabState[tabName];
        const hasMoreData = state && state.data && state.currentIndex < state.data.length;

        if (hasMoreData) {
            console.log("aaaaaaaaaa");
            button.disabled = false;
            button.classList.add('hidden');
        } else {
            console.log("bbbbbbbbbb");
            button.disabled = true;
            button.classList.remove('hidden');
        }
    }

    // --- Function to load one row at a time ---
    function loadNextRow(tabName) {
        const state = tabState[tabName];
        if (!state.data || state.currentIndex >= state.data.length) {
            updateLoadMoreButton(tabName);
            return false; // No more data to load
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
                break; // This card doesn't fit, wait for next row
            }

            const card = createCard(article, showDate, isWide);
            grid.appendChild(card);
            columnsUsed += columnsNeeded;
            state.currentIndex++;
        }

        // Update button state after loading
        updateLoadMoreButton(tabName);

        return state.currentIndex < state.data.length; // Return true if more data available
    }

    // --- Function to load initial rows (2 rows to start) ---
    function loadInitialRows(tabName) {
        const state = tabState[tabName];
        if (!state.data) return;

        // Load 2 rows initially (approximately 6 cards, accounting for wide cards)
        let rowsLoaded = 0;
        const initialRows = 2;

        while (rowsLoaded < initialRows && state.currentIndex < state.data.length) {
            const hadMoreData = loadNextRow(tabName);
            rowsLoaded++;
            if (!hadMoreData) break;
        }

        state.loaded = true;
        // Update button state after initial load
        updateLoadMoreButton(tabName);
    }

    // --- Scroll detection for infinite loading ---
    let isLoading = false;
    const scrollThreshold = 300; // Load more when 300px from bottom

    function handleScroll() {
        const activeTab = document.querySelector('.tab-content.active');
        if (!activeTab) return;

        const activeTabId = activeTab.id.replace('-tab', '');
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
        // This ensures the button shows when user reaches bottom and there's more data
        updateLoadMoreButton(activeTabId);

        // Auto-load when near bottom (but leave some space at the very bottom for button visibility)
        if (!isLoading && distanceFromBottom <= scrollThreshold && distanceFromBottom > 50) {
            isLoading = true;

            // Load next row (button state is updated inside loadNextRow)
            loadNextRow(activeTabId);

            // Small delay to prevent rapid firing
            setTimeout(() => {
                isLoading = false;
                // Update button again after loading in case scroll position changed
                updateLoadMoreButton(activeTabId);
            }, 300);
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Also handle resize in case content height changes
    window.addEventListener('resize', handleScroll);
});
