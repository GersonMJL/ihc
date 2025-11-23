# NaviNest - News Hub

A modern, responsive news hub application with a clean, modular architecture.

## Project Structure

```
ihc/
├── index.html              # Main HTML file
├── style.css               # Main stylesheet (imports component styles)
├── js/
│   ├── main.js            # Application entry point
│   └── modules/
│       ├── navigation.js  # Mobile navigation functionality
│       ├── darkMode.js    # Dark mode toggle
│       ├── backToTop.js   # Back to top button
│       ├── search.js      # Search functionality
│       ├── cards.js       # Card creation and animations
│       ├── tabs.js        # Tabs and content loading
│       ├── scroll.js      # Scroll handling and infinite loading
│       └── utils.js        # Utility functions
├── css/
│   └── components/
│       ├── variables.css   # CSS variables and theme definitions
│       ├── base.css        # Base styles
│       ├── header.css      # Header and navigation styles
│       ├── layout.css      # Layout and sidebar styles
│       ├── tabs.css        # Tabs and load more button styles
│       ├── cards.css       # Card and article styles
│       └── footer.css      # Footer and back to top button styles
└── data/
    ├── timelineData.js     # Timeline news articles data
    └── favoriteTagsData.js # Favorite tags articles data
```

## Features

- **Modular Architecture**: Code is organized into logical modules for better maintainability
- **Component-Based CSS**: Styles are split into component files for easier management
- **Dark Mode**: Toggle between light and dark themes with persistent storage
- **Responsive Design**: Mobile-first approach with hamburger menu for small screens
- **Infinite Scroll**: Automatic loading of content as user scrolls
- **Tab Navigation**: Three tabs (Top Stories, Timeline, Favorite Tags)
- **Card Animations**: Smooth fade-in animations for article cards
- **Reading Time Calculator**: Automatically calculates reading time for articles

## Getting Started

Simply open `index.html` in a modern web browser. The application uses ES6 modules, so it requires a local server for development (due to CORS restrictions with file:// protocol).

### Using a Local Server

You can use any of these methods:

```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server)
npx http-server

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Module Overview

### JavaScript Modules

- **main.js**: Initializes all modules when DOM is ready
- **navigation.js**: Handles mobile hamburger menu toggle
- **darkMode.js**: Manages theme switching and localStorage persistence
- **backToTop.js**: Shows/hides and handles back to top button
- **search.js**: Handles search form submission
- **cards.js**: Creates card elements, handles animations, and reading time calculation
- **tabs.js**: Manages tab switching, content loading, and "Load More" functionality
- **scroll.js**: Handles infinite scroll loading
- **utils.js**: Shared utility functions (reading time, time formatting)

### CSS Components

- **variables.css**: CSS custom properties for theming (light/dark mode)
- **base.css**: Base styles for body and container
- **header.css**: Header, navigation, search bar, and mobile menu styles
- **layout.css**: Main layout, sidebars, and widgets
- **tabs.css**: Tab navigation and load more button styles
- **cards.css**: Card grid, article cards, and related articles
- **footer.css**: Footer and back to top button styles

## Browser Support

Requires modern browsers with ES6 module support:
- Chrome 61+
- Firefox 60+
- Safari 10.1+
- Edge 16+
