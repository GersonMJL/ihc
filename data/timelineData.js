// Timeline data - most recent news articles
export const timelineData = [
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

