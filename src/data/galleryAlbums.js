// Gallery albums data - single source of truth
export const galleryAlbums = [
    {
        id: 1,
        title: "SafeDrive IoT System Development",
        category: "projects",
        description: "A comprehensive documentation of the SafeDrive IoT system development process, showcasing innovative safety features and smart transportation solutions.",
        thumbnail: "/images/image1.png",
        images: [
            "/images/image1.png",
            "/images/image2.png",
            "/images/image3.png",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png"
        ],
        keywords: ["iot", "safety", "smart", "development", "transportation"],
        status: "published",
        createdAt: "2024-12-15"
    },
    {
        id: 2,
        title: "EcoWatch Environmental Monitoring Platform",
        category: "projects",
        description: "Documenting the EcoWatch platform for environmental monitoring with advanced sensor integration and real-time data analytics.",
        thumbnail: "/images/image2.png",
        images: [
            "/images/image2.png",
            "/images/image3.png",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
            "/images/image1.png"
        ],
        keywords: ["environment", "monitoring", "platform", "sensors", "data"],
        status: "published",
        createdAt: "2024-12-14"
    },
    {
        id: 3,
        title: "AgriZ Planter Precision Farming Solution",
        category: "projects",
        description: "Precision farming innovation documentation showcasing agricultural technology solutions developed by our students.",
        thumbnail: "/images/image3.png",
        images: [
            "/images/image3.png",
            "/images/image1.png",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
            "/images/image2.png"
        ],
        keywords: ["agriculture", "precision", "farming", "technology", "innovation"],
        status: "published",
        createdAt: "2024-12-13"
    },
    {
        id: 4,
        title: "Software Development Training Workshop",
        category: "training",
        description: "Comprehensive training workshop featuring hands-on software development sessions and collaborative learning experiences.",
        thumbnail: "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
        images: [
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
            "/images/image1.png",
            "/images/image2.png",
            "/images/image3.png"
        ],
        keywords: ["training", "software", "development", "workshop", "skills"],
        status: "published",
        createdAt: "2024-12-12"
    },
    {
        id: 5,
        title: "Mobile App Development Bootcamp",
        category: "training",
        description: "Intensive bootcamp experience for mobile app development with focus on modern frameworks and best practices.",
        thumbnail: "/images/image1.png",
        images: [
            "/images/image1.png",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
            "/images/image2.png",
            "/images/image3.png"
        ],
        keywords: ["mobile", "app", "development", "bootcamp", "programming"],
        status: "draft",
        createdAt: "2024-12-11"
    },
    {
        id: 6,
        title: "Web Development Certification Program",
        category: "training",
        description: "Professional certification program covering full-stack web development with modern technologies.",
        thumbnail: "/images/image2.png",
        images: [
            "/images/image2.png",
            "/images/image3.png",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
            "/images/image1.png"
        ],
        keywords: ["web", "development", "certification", "fullstack", "javascript"],
        status: "published",
        createdAt: "2024-12-10"
    },
    {
        id: 7,
        title: "Team Building and Collaboration Session",
        category: "community",
        description: "Community engagement event showcasing team building activities and collaborative sessions.",
        thumbnail: "/images/Dalene.png",
        images: [
            "/images/Dalene.png",
            "/images/image1.png",
            "/images/image2.png",
            "/images/image3.png"
        ],
        keywords: ["team", "building", "collaboration", "community", "engagement"],
        status: "published",
        createdAt: "2024-12-09"
    },
    {
        id: 8,
        title: "Innovation Showcase 2024",
        category: "events",
        description: "Annual innovation showcase featuring cutting-edge technology projects and student innovations.",
        thumbnail: "/images/image1.png",
        images: [
            "/images/image1.png",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
            "/images/image2.png",
            "/images/image3.png"
        ],
        keywords: ["innovation", "showcase", "2024", "technology", "exhibition"],
        status: "published",
        createdAt: "2024-12-08"
    }
];

// Helper functions
export const getAlbumsByCategory = (category) => {
    if (category === 'all') return galleryAlbums;
    return galleryAlbums.filter(album => album.category === category);
};

export const getAlbumById = (id) => galleryAlbums.find(album => album.id === id);

export const getCategories = () => ['projects', 'training', 'events', 'community'];

export const getCategoryLabel = (category) => {
    const labels = {
        projects: 'Projects',
        training: 'Training',
        events: 'Events',
        community: 'Community'
    };
    return labels[category] || category;
};
