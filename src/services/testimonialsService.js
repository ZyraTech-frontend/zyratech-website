
import api from './api';

// Testimonials data - real testimonials added
let mockTestimonials = [
    {
        id: 1,
        name: 'AGYARE BOAS TIEKU',
        role: 'Software Engineering Graduate',
        quote: 'ZyraTech provided me with the bridge I needed between my academic foundation and real-world software engineering. The internship program was intensive, practical, and highly rewarding. I am now confident in building scalable web applications thanks to their mentorship.',
        avatar: '/images/tes1.png',
        status: 'published',
        featured: true,
        date: '2025-01-20',
        program: 'Web Development Bootcamp'
    },
    {
        id: 2,
        name: 'CHEMOGOH RHYDAL MAAOU',
        role: 'Digital Marketing Specialist',
        quote: 'ZyraTech’s approach to digital strategy changed everything for me. Combining technical data analytics with creative marketing gave me a unique edge. I now lead impactful digital campaigns that truly reach and engage the target audience.',
        avatar: '/images/tes2.png',
        status: 'published',
        featured: true,
        date: '2025-01-25',
        program: 'Digital Marketing & Strategy'
    },
    {
        id: 3,
        name: 'FRANSISCA',
        role: 'HR Professional',
        quote: "Partnering with ZyraTech for our talent needs has been a game-changer. Their graduates are not only technically proficient but also possess the industry-ready mindset that is rare to find. They have bridged the talent gap for our organization perfectly.",
        avatar: '/images/test3.png',
        status: 'published',
        featured: true,
        date: '2025-02-10',
        program: 'Corporate Partnership'
    }
];

const testimonialsService = {
    // Get all testimonials
    getAllTestimonials: async () => {
        // return api.get('/testimonials');
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: [...mockTestimonials] });
            }, 500);
        });
    },

    // Get single testimonial
    getTestimonialById: async (id) => {
        // return api.get(`/testimonials/${id}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const testimonial = mockTestimonials.find(t => t.id === parseInt(id));
                if (testimonial) resolve({ data: testimonial });
                else reject(new Error('Testimonial not found'));
            }, 300);
        });
    },

    // Create new testimonial
    createTestimonial: async (data) => {
        // return api.post('/testimonials', data);
        return new Promise((resolve) => {
            setTimeout(() => {
                const newTestimonial = {
                    id: Date.now(),
                    ...data,
                    date: new Date().toISOString().split('T')[0],
                    likes: 0,
                    verified: false
                };
                mockTestimonials.unshift(newTestimonial);
                resolve({ data: newTestimonial });
            }, 600);
        });
    },

    // Update existing testimonial
    updateTestimonial: async (id, data) => {
        // return api.put(`/testimonials/${id}`, data);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockTestimonials.findIndex(t => t.id === parseInt(id));
                if (index !== -1) {
                    mockTestimonials[index] = { ...mockTestimonials[index], ...data };
                    resolve({ data: mockTestimonials[index] });
                } else {
                    reject(new Error('Testimonial not found'));
                }
            }, 600);
        });
    },

    // Delete testimonial
    deleteTestimonial: async (id) => {
        // return api.delete(`/testimonials/${id}`);
        return new Promise((resolve) => {
            setTimeout(() => {
                mockTestimonials = mockTestimonials.filter(t => t.id !== parseInt(id));
                resolve({ success: true });
            }, 500);
        });
    },

    // Toggle Featured Status
    toggleFeatured: async (id) => {
        // return api.patch(`/testimonials/${id}/toggle-featured`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockTestimonials.findIndex(t => t.id === parseInt(id));
                if (index !== -1) {
                    mockTestimonials[index].featured = !mockTestimonials[index].featured;
                    resolve({ data: mockTestimonials[index] });
                } else {
                    reject(new Error('Testimonial not found'));
                }
            }, 300);
        });
    }
};

export default testimonialsService;
