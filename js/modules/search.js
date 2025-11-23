// Search functionality

export function initSearch() {
    const headerSearch = document.getElementById('header-search');
    const searchInput = document.getElementById('search-input');

    if (!headerSearch || !searchInput) return;

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

