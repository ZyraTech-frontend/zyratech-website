// Centralized articles data - single source of truth
// Add your Zyra Tech Hub articles here
export const articlesData = [
  {
    id: 1,
    title: "Transforming Education Through Technology in Ghana",
    category: "Tech Training",
    date: "January 2026",
    readingTime: "5 min read",
    author: {
      name: "ZyraTech Team",
      avatar: "/images/image1.png"
    },
    image: "/images/image1.png",
    excerpt: "Discover how our comprehensive training programs are bridging the gap between education and industry, empowering the next generation of tech professionals in Ghana.",
    slug: "transforming-education-through-technology",
    featured: true
  },
  {
    id: 2,
    title: "SafeDrive IoT: A Student Success Story",
    category: "Projects",
    date: "December 2025",
    readingTime: "4 min read",
    author: {
      name: "Emmanuel Mensah",
      avatar: "/images/image2.png"
    },
    image: "/images/image2.png",
    excerpt: "Meet the team behind SafeDrive, an innovative IoT system that's making roads safer. Learn how our internship program helped bring this project to life.",
    slug: "safedrive-iot-success-story"
  },
  {
    id: 3,
    title: "Building Digital Infrastructure for Rural Schools",
    category: "Community",
    date: "December 2025",
    readingTime: "6 min read",
    author: {
      name: "Grace Owusu",
      avatar: "/images/image3.png"
    },
    image: "/images/image3.png",
    excerpt: "How ZyraTech is partnering with rural schools to install networks and provide digital access, creating opportunities for thousands of students.",
    slug: "digital-infrastructure-rural-schools"
  },
  {
    id: 4,
    title: "The Future of Web Development in Africa",
    category: "Industry News",
    date: "November 2025",
    readingTime: "7 min read",
    author: {
      name: "ZyraTech Team",
      avatar: "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png"
    },
    image: "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
    excerpt: "Exploring emerging trends in African tech and how local developers are shaping the global digital landscape.",
    slug: "future-web-development-africa"
  },
  {
    id: 5,
    title: "From Classroom to Career: Naomi's Journey",
    category: "Success Stories",
    date: "November 2025",
    readingTime: "5 min read",
    author: {
      name: "Naomi Asante",
      avatar: "/images/image1.png"
    },
    image: "/images/image1.png",
    excerpt: "A graduate's perspective on how ZyraTech's internship program launched her career in software development.",
    slug: "naomi-journey-classroom-to-career"
  },
  {
    id: 6,
    title: "Mastering Python: Tips from Our Bootcamp",
    category: "Tech Training",
    date: "October 2025",
    readingTime: "8 min read",
    author: {
      name: "Isaac Osei",
      avatar: "/images/image2.png"
    },
    image: "/images/image2.png",
    excerpt: "Essential Python programming tips and best practices from our intensive coding bootcamp curriculum.",
    slug: "mastering-python-bootcamp-tips"
  },
  {
    id: 7,
    title: "AgriZ Planter: Precision Farming Innovation",
    category: "Projects",
    date: "October 2025",
    readingTime: "6 min read",
    author: {
      name: "ZyraTech Team",
      avatar: "/images/image3.png"
    },
    image: "/images/image3.png",
    excerpt: "How technology is revolutionizing agriculture in Ghana through precision farming solutions developed by our students.",
    slug: "agriz-planter-precision-farming"
  },
  {
    id: 8,
    title: "Cybersecurity Essentials for SMEs",
    category: "Industry News",
    date: "September 2025",
    readingTime: "5 min read",
    author: {
      name: "Emmanuel Mensah",
      avatar: "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png"
    },
    image: "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
    excerpt: "Practical cybersecurity tips every small and medium enterprise in Ghana should implement to protect their digital assets.",
    slug: "cybersecurity-essentials-smes"
  }
];

// Helper functions
export const getFeaturedArticle = () => articlesData.find(article => article.featured);

export const getArticlesByCategory = (category) => {
  if (category === 'all') return articlesData;
  return articlesData.filter(article => article.category === category);
};

export const getArticleBySlug = (slug) => articlesData.find(article => article.slug === slug);

export const getCategories = () => {
  const categories = ['all', ...new Set(articlesData.map(article => article.category))];
  return categories;
};
