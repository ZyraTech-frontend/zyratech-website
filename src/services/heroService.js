
import api from './api';

// Initial data mirroring the current hardcoded Hero.jsx
let mockSlides = [
    {
        id: 1,
        title: "EDUCATION & INTERNSHIP",
        description: "Practical training in coding, robotics, AI, and IT systems. Bridge the gap between classroom learning and real-world experience with our 3-6 month internship program. Join 500+ students transforming their futures.",
        pillar: "Education & Internship",
        backgroundImage: "/images/hero2.jpeg",
        cta1Text: "Apply for Internship",
        cta1Link: "/training/programs/internship",
        cta2Text: "Read Success Stories",
        cta2Link: "/#impact-stories",
        isVisible: true,
        order: 1
    },
    {
        id: 2,
        title: "SOFTWARE & CLOUD ENGINEERING",
        description: "Building scalable digital solutions and robust cloud infrastructure. From custom web applications to enterprise cloud migration, we deliver technology that drives business growth.",
        pillar: "Software & Cloud",
        backgroundImage: "/images/hero1.jpeg",
        cta1Text: "View Our Services",
        cta1Link: "/our-services",
        cta2Text: "Start a Project",
        cta2Link: "/contact",
        isVisible: true,
        order: 2
    },
    {
        id: 3,
        title: "HARDWARE & IOT INNOVATION",
        description: "Pioneering smart hardware solutions and IoT systems for local challenges. Our makerspace empowers innovators to design, prototype, and manufacture next-gen devices.",
        pillar: "Hardware & Innovation",
        backgroundImage: "/images/hero3.jpeg",
        cta1Text: "Explore Innovation",
        cta1Link: "/projects",
        cta2Text: "Join Makerspace",
        cta2Link: "/contact",
        isVisible: true,
        order: 3
    },
    {
        id: 4,
        title: "IT & NETWORKING",
        description: "Providing comprehensive IT support, network installation, and system administration. We ensure your digital infrastructure is secure, reliable, and optimized for performance.",
        pillar: "IT Services",
        backgroundImage: "/images/hero4.png",
        cta1Text: "Get IT Support",
        cta1Link: "/contact",
        cta2Text: "Our Capabilities",
        cta2Link: "/our-services",
        isVisible: true,
        order: 4
    },
    {
        id: 5,
        title: "CONSULTANCY & IMPACT",
        description: "Strategic technology consulting that aligns with social impact. We partner with organizations to leverage technology for sustainable development and community empowerment.",
        pillar: "Consultancy",
        backgroundImage: "/images/hero5.jpeg",
        cta1Text: "Partner With Us",
        cta1Link: "/contact",
        cta2Text: "See Our Impact",
        cta2Link: "/impact",
        isVisible: true,
        order: 5
    }
];

// In a real application, these would be API calls to your backend
// For now, we simulate the backend response with a delay

const heroService = {
    // Get all slides
    getAllSlides: async () => {
        // return api.get('/hero-slides');
        return Promise.resolve({ data: [...mockSlides].sort((a, b) => a.order - b.order) });
    },

    // Get single slide
    getSlideById: async (id) => {
        // return api.get(`/hero-slides/${id}`);
        const slide = mockSlides.find(s => s.id === parseInt(id));
        if (slide) return Promise.resolve({ data: slide });
        else return Promise.reject(new Error('Slide not found'));
    },

    // Create new slide
    createSlide: async (slideData) => {
        // return api.post('/hero-slides', slideData);
        return new Promise((resolve) => {
            setTimeout(() => {
                const newSlide = {
                    id: Date.now(),
                    ...slideData,
                    order: mockSlides.length + 1,
                    isVisible: true
                };
                mockSlides.push(newSlide);
                resolve({ data: newSlide });
            }, 600);
        });
    },

    // Update existing slide
    updateSlide: async (id, slideData) => {
        // return api.put(`/hero-slides/${id}`, slideData);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockSlides.findIndex(s => s.id === parseInt(id));
                if (index !== -1) {
                    mockSlides[index] = { ...mockSlides[index], ...slideData };
                    resolve({ data: mockSlides[index] });
                } else {
                    reject(new Error('Slide not found'));
                }
            }, 600);
        });
    },

    // Delete slide
    deleteSlide: async (id) => {
        // return api.delete(`/hero-slides/${id}`);
        return new Promise((resolve) => {
            setTimeout(() => {
                mockSlides = mockSlides.filter(s => s.id !== parseInt(id));
                resolve({ success: true });
            }, 500);
        });
    },

    // Reorder slides
    reorderSlides: async (reorderedSlides) => {
        // return api.post('/hero-slides/reorder', { slides: reorderedSlides });
        return new Promise((resolve) => {
            setTimeout(() => {
                mockSlides = reorderedSlides;
                resolve({ data: mockSlides });
            }, 500);
        });
    }
};

export default heroService;
