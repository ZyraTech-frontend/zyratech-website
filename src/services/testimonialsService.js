
import api from './api';

// Initial data mirroring the admin management page (step 299)
let mockTestimonials = [
    {
        id: 1,
        name: 'Ama Mensah',
        role: 'Junior STEM Basics',
        type: 'student',
        quote: "I built my first circuit with recycled parts and it actually worked! The hands-on approach at Zyra Tech Hub made learning fun and practical.",
        rating: 5,
        avatar: '/images/testimonials/ama.jpg',
        featured: true,
        status: 'published',
        program: 'STEM Basics',
        date: '2024-12-15',
        likes: 45,
        verified: true
    },
    {
        id: 2,
        name: 'Kofi Asante',
        role: 'Maker: Hardware & Repair',
        type: 'student',
        quote: "The mentors are patient and the tools are amazing. I'm now repairing devices in my community and earning income from what I learned here.",
        rating: 5,
        avatar: '/images/testimonials/kofi.jpg',
        featured: true,
        status: 'published',
        program: 'Hardware Engineering',
        date: '2024-12-10',
        likes: 67,
        verified: true
    },
    {
        id: 3,
        name: 'Fatima Ibrahim',
        role: 'Coder: Software Foundations',
        type: 'student',
        quote: "I never thought I could code, but now I'm building apps to solve real problems. Zyra Tech Hub gave me the confidence and skills to pursue my tech dreams.",
        rating: 5,
        avatar: '/images/testimonials/fatima.jpg',
        featured: true,
        status: 'published',
        program: 'Software Development',
        date: '2024-12-08',
        likes: 89,
        verified: true
    },
    {
        id: 4,
        name: 'Emmanuel Osei',
        role: 'Web Development Graduate',
        type: 'alumni',
        quote: "After completing the web development program, I landed my first job within two months. The practical training and portfolio projects were exactly what employers wanted to see.",
        rating: 5,
        avatar: '/images/testimonials/emmanuel.jpg',
        featured: false,
        status: 'published',
        program: 'Web Development',
        date: '2024-11-28',
        likes: 56,
        verified: true
    },
    {
        id: 5,
        name: 'Abigail Owusu',
        role: 'Data Science Student',
        type: 'student',
        quote: "The data science curriculum is thorough and the instructors are industry professionals. I'm now analyzing real datasets and creating meaningful visualizations.",
        rating: 4,
        avatar: '/images/testimonials/abigail.jpg',
        featured: false,
        status: 'published',
        program: 'Data Science',
        date: '2024-11-20',
        likes: 34,
        verified: true
    },
    {
        id: 6,
        name: 'TechVision Ghana Ltd',
        role: 'Corporate Partner',
        type: 'partner',
        quote: "Our partnership with Zyra Tech Hub has given us access to talented interns who are well-prepared for the workplace. Their training standards exceed our expectations.",
        rating: 5,
        avatar: '/images/partners/techvision.jpg',
        featured: true,
        status: 'published',
        program: 'Corporate Partnership',
        date: '2024-11-15',
        likes: 28,
        verified: true
    },
    {
        id: 7,
        name: 'Mrs. Grace Adu',
        role: 'Parent',
        type: 'parent',
        quote: "My son's transformation since joining the robotics program has been remarkable. He's more confident, focused, and genuinely excited about learning technology.",
        rating: 5,
        avatar: '/images/testimonials/grace.jpg',
        featured: false,
        status: 'published',
        program: 'Robotics',
        date: '2024-11-10',
        likes: 41,
        verified: true
    },
    {
        id: 8,
        name: 'Daniel Mensah',
        role: 'IoT Intern',
        type: 'student',
        quote: "The IoT program connected me with real industry projects. I worked on an actual environmental monitoring system that's now deployed in schools.",
        rating: 5,
        avatar: null,
        featured: false,
        status: 'draft',
        program: 'IoT Development',
        date: '2024-11-05',
        likes: 12,
        verified: false
    },
    {
        id: 9,
        name: 'Dr. Samuel Boateng',
        role: 'Tech Mentor',
        type: 'mentor',
        quote: "Mentoring at Zyra Tech Hub has been incredibly rewarding. The students are eager to learn and the support system for mentors is excellent.",
        rating: 5,
        avatar: '/images/testimonials/samuel.jpg',
        featured: false,
        status: 'published',
        program: 'Mentorship Program',
        date: '2024-10-28',
        likes: 23,
        verified: true
    },
    {
        id: 10,
        name: 'Innovate Africa Corp',
        role: 'Strategic Partner',
        type: 'corporate',
        quote: "Zyra Tech Hub's commitment to quality education and innovation aligns perfectly with our CSR goals. We're proud to support their mission.",
        rating: 5,
        avatar: '/images/partners/innovate.jpg',
        featured: false,
        status: 'pending',
        program: 'Corporate Sponsorship',
        date: '2024-10-20',
        likes: 8,
        verified: false
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
