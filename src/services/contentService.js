
// Mock Data for Services
let mockServices = [
    {
        id: 1,
        title: 'SOFTWARE ENGINEERING',
        description: 'Build and scale reliable digital products — from discovery and architecture to delivery and iteration.',
        highlights: ['Web & mobile applications', 'Backend systems & APIs', 'Cloud architecture & DevOps'],
        icon: 'Code2'
    },
    {
        id: 2,
        title: 'INFRASTRUCTURE & CLOUD SERVICES',
        description: 'Robust cloud infrastructure and DevOps solutions for scalable, secure, and reliable operations.',
        highlights: ['Cloud architecture & migration', 'Infrastructure automation', 'Monitoring & optimization'],
        icon: 'ServerCog'
    },
    {
        id: 3,
        title: 'ACADEMIC RESEARCH SUPPORT',
        description: 'Expert guidance and technical support for academic projects, research, and thesis development.',
        highlights: ['Research methodology support', 'Data analysis & visualization', 'Technical writing & documentation'],
        icon: 'BookOpen'
    },
    {
        id: 4,
        title: 'IT EDUCATION & TRAINING',
        description: 'Comprehensive training programs that equip individuals and teams with modern technology skills.',
        highlights: ['Hands-on bootcamps', 'Professional certifications', 'Corporate training programs'],
        icon: 'GraduationCap'
    },
    {
        id: 5,
        title: 'MANAGED SERVICES',
        description: 'Operate and improve critical systems with monitoring, maintenance, and responsive support.',
        highlights: ['24/7 monitoring & support', 'System maintenance & updates', 'Incident response & SLAs'],
        icon: 'Shield'
    }
];

// Mock Data for Benefits
let mockBenefits = [
    {
        id: 1,
        icon: 'ShieldCheck',
        title: 'Low Risk',
        description: 'Commit-as-you-go model, coupled with globally recognized standards'
    },
    {
        id: 2,
        icon: 'Cog',
        title: 'Client-Individual Set Up',
        description: 'Tailored competencies and cooperation models, adapted to your needs'
    },
    {
        id: 3,
        icon: 'TrendingUp',
        title: 'Scalable',
        description: 'Build and grow teams: on-demand and adaptable'
    },
    {
        id: 4,
        icon: 'DollarSign',
        title: 'Cost Efficiency',
        description: 'Commercial models more attractive than traditional off-shore options'
    },
    {
        id: 5,
        icon: 'Users',
        title: 'Seamless Collaboration',
        description: 'Minimal time difference to entire teams with English as their native language'
    },
    {
        id: 6,
        icon: 'Globe',
        title: 'Social Impact',
        description: 'Projects help fund initiatives closing the gender IT gap, coding for kids and our IT training academy'
    }
];

// Mock Data for About Quote
let mockAboutQuote = {
    quote: "Our mission is to lead Ghana’s technological transformation through world-class Software Engineering, robust Infrastructure & Cloud services, and impactful IT Education. We are building an ecosystem where innovation meets academic excellence",
    authorName: "ZyraTech Leadership",
    authorTitle: "Empowering Ghana's Tech Future",
    authorImage: "/images/tex1.png",
    stat1Value: "2024",
    stat1Label: "Founded",
    stat2Value: "50+",
    stat2Label: "Trainees",
    stat3Value: "1",
    stat3Label: "Location"
};

// Mock Data for About Page
let mockAboutHero = {
    title: 'Building the next generation of',
    highlight: 'tech talent',
    description: 'We bridge the gap between education and industry through comprehensive training, professional internships, and real-world projects—empowering individuals and organizations with job-ready digital skills.',
    backgroundImage: '/images/image1.png'
};

let mockMission = {
    title: 'Our Mission',
    content: 'Our mission is to drive technological transformation across Ghana by bridging the gap between education and industry through Software Engineering, Cloud Infrastructure, and Academic Research.'
};

let mockWhyGhana = {
    title: 'Why We Chose Ghana',
    content1: "Ghana's accelerating urbanization is converging populations with enhanced infrastructure, expanding digital connectivity, and improved educational access—creating an ideal environment for skills development and technology-driven economic transformation.",
    linkText: 'Learn More About Our Impact',
    linkUrl: '/impact',
    content2: "We develop programs tailored to local market demands, partner with businesses to co-design training curricula, and empower startups through strategic mentorship, drawing on our founder's experience as a Tech Educator and former Teaching Assistant at Koforidua Technical University."
};

let mockMilestones = [
    { id: 1, title: 'Expansions to New Regions', description: 'Expanding across Ghana represents a pivotal milestone in our mission to democratize digital opportunities for local talent. Through state-of-the-art facilities in Koforidua and beyond, we are cultivating the next generation of tech professionals and driving innovation across the region.', icon: 'CheckCircle' },
    { id: 2, title: 'Successful Projects', description: 'We deliver transformative, cutting-edge solutions for clients across the globe. Our comprehensive service portfolio showcases deep technical expertise spanning multiple industries and emerging technology domains.', icon: 'CheckCircle' },
    { id: 3, title: 'Strategic Partnerships', description: 'Strategic alliances with leading global organizations amplify our ability to deliver world-class services while creating valuable career pathways and industry networks for our trainees.', icon: 'CheckCircle' },
    { id: 4, title: 'Awards and Recognition', description: "Our commitment to excellence has garnered prestigious awards and international recognition, underscoring our transformative impact on Africa's tech ecosystem and our leadership in driving sustainable development across the continent.", icon: 'CheckCircle' }
];

let mockTimeline = [
    { id: 1, year: '2024', title: 'Established', desc: 'Formally established in Koforidua, Ghana.', icon: 'Users' },
    { id: 2, year: '2025', title: 'Foundation Launch', desc: 'Launched Tech Talk 2025 and established the IT Education Foundation to provide digital skills training.', icon: 'MapPin' },
    { id: 3, year: '2026', title: 'The Vision', desc: 'Executing our 4-quarter strategic plan, including new seminars, a technology competition, and expanding Academic Research Support.', icon: 'TrendingUp' }
];

// Mock Data for Partnership Page
let mockPartnershipHero = {
    title: 'Partner with ZyraTech',
    subtitle: 'Together, we can bridge the digital divide.',
    backgroundImage: '/images/partnership-hero.jpg'
};

let mockImpactStats = [
    { id: 1, number: '1', suffix: '', label: 'Active Partners' },
    { id: 2, number: '50', suffix: '+', label: 'Students Trained' },
    { id: 3, number: '50', suffix: '+', label: 'Projects Completed' }
];

let mockWhyPartner = {
    title: 'Why Partner With Us?',
    content: 'Partnering with ZyraTech means investing in the future of technology in Ghana. We provide tailored training, access to top talent, and opportunities for collaborative innovation.'
};

let mockPartnershipStories = [
    {
        id: 1,
        title: 'Tech Innovation Hub',
        category: 'Corporate Partner',
        story: 'By partnering with ZyraTech, we expanded our reach to underserved communities and trained 500+ students in cutting-edge technologies.',
        impact: '500+ students trained, 20+ internships created',
        image: '/images/partnership-tech-hub.jpg',
        fallbackImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200'
    }
];

let mockRecognition = [
    { id: 1, name: 'Partner 1', logo: '/images/partner1.png' },
    { id: 2, name: 'Partner 2', logo: '/images/partner2.png' }
];

// Mock Data for Impact Metrics
let mockImpactMetrics = [
    {
        id: 'MET-001',
        title: 'Total Students Trained',
        value: 2500,
        previousValue: 2100,
        type: 'number',
        category: 'students',
        description: 'Total number of students who have completed training programs',
        suffix: '+',
        featured: true,
        active: true,
        displayOrder: 1,
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-002',
        title: 'Employment Rate',
        value: 87,
        previousValue: 82,
        type: 'percentage',
        category: 'employment',
        description: 'Percentage of graduates employed within 6 months of completion',
        suffix: '%',
        featured: true,
        active: true,
        displayOrder: 2,
        lastUpdated: '2024-12-18T14:30:00Z',
        trend: 'up'
    },
    {
        id: 'MET-003',
        title: 'Partner Companies',
        value: 45,
        previousValue: 38,
        type: 'number',
        category: 'partnerships',
        description: 'Number of corporate and institutional partners',
        suffix: '+',
        featured: true,
        active: true,
        displayOrder: 3,
        lastUpdated: '2024-12-17T09:15:00Z',
        trend: 'up'
    },
    {
        id: 'MET-008',
        title: 'Scholarships Awarded',
        value: 350000,
        previousValue: 280000,
        type: 'currency',
        category: 'financial',
        description: 'Total value of scholarships awarded to students (GHS)',
        suffix: '',
        prefix: 'GHS ',
        featured: true,
        active: true,
        displayOrder: 8,
        lastUpdated: '2024-12-18T10:30:00Z',
        trend: 'up'
    }
];

// Mock Data for Success Stories
let mockSuccessStories = [
    {
        id: 'STORY-001',
        name: 'Kwame Asante',
        title: 'From Unemployed to Lead Developer',
        role: 'Senior Software Developer',
        company: 'TechVision Ltd',
        course: 'Full Stack Web Development',
        image: null,
        quote: 'Zyra Tech Hub transformed my career completely. Within 6 months of completing the program, I landed my dream job.',
        featured: true,
        active: true,
        datePublished: '2024-11-15',
        graduationYear: 2024
    },
    {
        id: 'STORY-002',
        name: 'Ama Mensah',
        title: 'Becoming Ghana\'s First Female Cloud Architect',
        role: 'Cloud Solutions Architect',
        company: 'AWS Ghana',
        course: 'Cloud Computing & DevOps',
        image: null,
        quote: 'The AWS certification training prepared me for a role I never thought possible. I am now leading cloud migrations for major companies.',
        featured: true,
        active: true,
        datePublished: '2024-10-20',
        graduationYear: 2023
    }
];

// Mock Data for Work With Us
let mockWorkWithUs = {
    hero: {
        title: 'Join Our Team',
        subtitle: 'Build the future with us',
        description: 'We are looking for passionate individuals who want to make a difference through technology.',
        image: '/images/work-with-us-hero.jpg'
    },
    setup: [
        { id: 1, title: 'Strategic Location & Partnership', description: 'ZyraTech Hub, headquartered in Koforidua, Ghana, serves as the primary contracting partner for local and international clients.', icon: 'Building2' },
        { id: 2, title: 'Operational Excellence', description: 'Our Ghana-based operations provide the infrastructure and expertise to rapidly deploy specialized tech teams.', icon: 'Globe2' },
        { id: 3, title: 'Social Impact Mission', description: 'As a social enterprise, we reinvest surplus revenue into expanding our training programs.', icon: 'TrendingUp' }
    ],
    projectSteps: [
        { id: 1, title: 'Requirements & Planning', description: 'Agree on project-specific requirements, including tech stacks, team roles, and seniority levels.' },
        { id: 2, title: 'Team Introduction', description: 'Introduction and collaboration set-up with clients.' },
        { id: 3, title: 'Continuous Feedback', description: 'Team Leads provide regular feedback on individual performance.' }
    ],
    collaboration: {
        title: 'Successful Intercultural Collaboration Is Important To Us',
        description: 'Prior to the project beginning, we set up workshops covering technical expectations & intercultural collaboration.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
        points: [
            { id: 1, number: '1', title: 'Cultural Awareness', description: 'Together with our clients, we identify cultural differences and reflect on how they may affect collaboration.', icon: 'Users' },
            { id: 2, number: '2', title: 'Team Norms', description: 'Jointly, we discuss and define how we want to work as a team, taking into account intercultural learnings.', icon: 'Target' },
            { id: 3, number: '3', title: 'Team Building', description: 'We get to know each other outside the formal work context and start building trusting relationships.', icon: 'Handshake' }
        ]
    },
    hiring: [
        { id: 1, title: 'Apply', description: 'Submit CV and a short note about your fit.' },
        { id: 2, title: 'Interview', description: 'Short technical and cultural conversations.' },
        { id: 3, title: 'Onboard', description: 'Fast, clear onboarding and initial goals.' }
    ]
};

// Mock Data for Quality Assurance
let mockQA = {
    hero: {
        title: 'Quality Assurance',
        description: 'Release with confidence. ZyraTech helps you build robust, secure and high-performing products through modern QA practices and automation.',
        image: '/images/quality-assurance-hero.jpg'
    },
    intro: {
        howItWorks: {
            title: 'How Do We Work?',
            description: 'We continuously work towards delivering high-quality digital products and services to our global and local client base. Our development environment allows us to efficiently and effectively achieve these goals: we work in teams following agile principles while combining them with carefully selected tools and the V-model to ensure quality.'
        },
        standards: {
            title: 'Our Quality Standards',
            description: 'We follow the highest international operating and security standards. Our industry certificates validate our commitment to excellence in service delivery, information security, and technological expertise, propelling us to drive global digital transformation with continuous learning and advancement.',
            items: [
                { id: 1, text: 'This certification affirms that we adhere to the stringent requirements outlined by the German Association of the Automotive Industry (VDA) and is a trusted partner within the automotive supply chain.', result: 'Result: Achieved compliance status with no non-conformities and highest possible score, in accordance with ENX ISA Catalogue.' },
                { id: 2, text: 'The ISO 27001:2013 certification ensures our capability in risk management, security control implementation, and safeguarding the confidentiality, integrity, and availability of information.', result: 'Result: Achieved compliance status with no non-conformities in December 2021.' },
                { id: 3, text: 'This globally acknowledged standard guarantees that we consistently meets customer demands. Through effective quality control and continuous improvement.', result: 'Result: Achieved compliance status on the quality of process and procedures regarding how operations are carried out in the most efficient way' }
            ]
        }
    },
    tools: [
        { id: 1, name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: 'border-orange-400' },
        { id: 2, name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: 'border-purple-500' },
        { id: 3, name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: 'border-blue-400' },
        { id: 4, name: 'Jenkins', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', color: 'border-red-500' },
        { id: 5, name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: 'border-gray-300' },
        { id: 6, name: 'Jira', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg', color: 'border-blue-600' },
        { id: 7, name: 'Postman', logo: 'https://cdn.worldvectorlogo.com/logos/postman.svg', color: 'border-orange-600' },
        { id: 8, name: 'Cypress', logo: 'https://asset.brandfetch.io/idIq_kF0rb/idv3zwmSiY.jpeg', color: 'border-green-400' },
        { id: 9, name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', color: 'border-blue-500' },
        { id: 10, name: 'Selenium', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg', color: 'border-green-500' }
    ],
    features: [
        {
            id: 1,
            title: 'Clean Coding Standards',
            content: [
                'We have adopted and internalized clean coding standards. Common principles are core to our quality standards.',
                'We expect most of our clients to have their own norms and standards and ensure to adopt them as part of project onboarding.'
            ],
            image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
            imagePosition: 'right'
        },
        {
            id: 2,
            title: 'Peer Reviews',
            content: [
                'We use pair programming to improve quality, reduce error rate, and enable peer learning.',
                'Our development process standard integrates code reviews before the code is committed.',
                'We use code walkthroughs as an additional quality mechanism and to ensure broad knowledge of the code base across the team.'
            ],
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
            imagePosition: 'left'
        },
        {
            id: 3,
            title: 'Testing',
            content: [
                'TDD and BDD are core principles of our development process. Our developers are trained to write unit tests for everything they do.',
                'Our dedicated QA specialists automate much of the testing process with a modern toolset.',
                'To ensure full coverage, we conduct extensive manual testing in addition to automated processes.'
            ],
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
            imagePosition: 'right'
        },
        {
            id: 4,
            title: 'In-house Seminars and Workshops',
            content: [
                'Workshops focus on soft skills such as communication, teamwork, cooperation, productivity tools, protection, and working with people with disabilities, etc.'
            ],
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
            imagePosition: 'left'
        },
        {
            id: 5,
            title: 'Skill-Based And Technical Training',
            content: [
                'Programmes mainly focused on honing professional skills that will aid employees in carrying out their daily work duties – Programming, DevOps, Mentoring, etc.'
            ],
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
            imagePosition: 'right'
        },
        {
            id: 6,
            title: 'Industry Certifications',
            content: [
                'Employees are provided with personalized learning experiences. Certification programmes on niche topics relevant to an employee\'s role or client project requirements.'
            ],
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
            imagePosition: 'left'
        },
        {
            id: 7,
            title: 'Learning Community',
            content: [
                'Employees can connect within the company, but also create networks outside the company.',
                'Internal platforms and events allow employees to receive and share best practices, knowledge, and experiences.'
            ],
            image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
            imagePosition: 'right'
        }
    ],
    faq: [
        { id: 1, question: 'What testing frameworks do you use?', answer: 'We use a variety of frameworks depending on project needs, including Selenium, Cypress, and Jest.' },
        { id: 2, question: 'Do you offer manual testing services?', answer: 'Yes, we provide both manual exploratory testing and automated testing solutions.' }
    ]
};

const contentService = {
    // --- Services ---
    getAllServices: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: [...mockServices] });
            }, 500);
        });
    },

    createService: async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newService = {
                    id: Date.now(),
                    ...data
                };
                mockServices.push(newService);
                resolve({ data: newService });
            }, 500);
        });
    },

    updateService: async (id, data) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockServices.findIndex(s => s.id === parseInt(id));
                if (index !== -1) {
                    mockServices[index] = { ...mockServices[index], ...data };
                    resolve({ data: mockServices[index] });
                } else {
                    reject(new Error('Service not found'));
                }
            }, 500);
        });
    },

    deleteService: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                mockServices = mockServices.filter(s => s.id !== parseInt(id));
                resolve({ success: true });
            }, 500);
        });
    },

    // --- Benefits ---
    getAllBenefits: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: [...mockBenefits] });
            }, 500);
        });
    },

    createBenefit: async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newBenefit = {
                    id: Date.now(),
                    ...data
                };
                mockBenefits.push(newBenefit);
                resolve({ data: newBenefit });
            }, 500);
        });
    },

    updateBenefit: async (id, data) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockBenefits.findIndex(b => b.id === parseInt(id));
                if (index !== -1) {
                    mockBenefits[index] = { ...mockBenefits[index], ...data };
                    resolve({ data: mockBenefits[index] });
                } else {
                    reject(new Error('Benefit not found'));
                }
            }, 500);
        });
    },

    deleteBenefit: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                mockBenefits = mockBenefits.filter(b => b.id !== parseInt(id));
                resolve({ success: true });
            }, 500);
        });
    },

    // --- About Quote ---
    getAboutQuote: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: { ...mockAboutQuote } });
            }, 500);
        });
    },

    updateAboutQuote: async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                mockAboutQuote = { ...mockAboutQuote, ...data };
                resolve({ data: mockAboutQuote });
            }, 500);
        });
    },

    // --- About Page Sections ---
    getAboutHero: async () => new Promise(resolve => setTimeout(() => resolve({ data: { ...mockAboutHero } }), 500)),
    updateAboutHero: async (data) => new Promise(resolve => setTimeout(() => { mockAboutHero = { ...mockAboutHero, ...data }; resolve({ data: mockAboutHero }); }, 500)),

    getMission: async () => new Promise(resolve => setTimeout(() => resolve({ data: { ...mockMission } }), 500)),
    updateMission: async (data) => new Promise(resolve => setTimeout(() => { mockMission = { ...mockMission, ...data }; resolve({ data: mockMission }); }, 500)),

    getWhyGhana: async () => new Promise(resolve => setTimeout(() => resolve({ data: { ...mockWhyGhana } }), 500)),
    updateWhyGhana: async (data) => new Promise(resolve => setTimeout(() => { mockWhyGhana = { ...mockWhyGhana, ...data }; resolve({ data: mockWhyGhana }); }, 500)),

    getMilestones: async () => new Promise(resolve => setTimeout(() => resolve({ data: [...mockMilestones] }), 500)),
    createMilestone: async (data) => new Promise(resolve => setTimeout(() => { const newItem = { id: Date.now(), ...data }; mockMilestones.push(newItem); resolve({ data: newItem }); }, 500)),
    updateMilestone: async (id, data) => new Promise(resolve => setTimeout(() => { mockMilestones = mockMilestones.map(m => m.id === id ? { ...m, ...data } : m); resolve({ data: mockMilestones.find(m => m.id === id) }); }, 500)),
    deleteMilestone: async (id) => new Promise(resolve => setTimeout(() => { mockMilestones = mockMilestones.filter(m => m.id !== id); resolve({ success: true }); }, 500)),

    getTimeline: async () => new Promise(resolve => setTimeout(() => resolve({ data: [...mockTimeline] }), 500)),
    createTimelineItem: async (data) => new Promise(resolve => setTimeout(() => { const newItem = { id: Date.now(), ...data }; mockTimeline.push(newItem); resolve({ data: newItem }); }, 500)),
    updateTimelineItem: async (id, data) => new Promise(resolve => setTimeout(() => { mockTimeline = mockTimeline.map(t => t.id === id ? { ...t, ...data } : t); resolve({ data: mockTimeline.find(t => t.id === id) }); }, 500)),
    deleteTimelineItem: async (id) => new Promise(resolve => setTimeout(() => { mockTimeline = mockTimeline.filter(t => t.id !== id); resolve({ success: true }); }, 500)),

    // --- Partnership Page Sections ---
    getPartnershipHero: async () => new Promise(resolve => setTimeout(() => resolve({ data: { ...mockPartnershipHero } }), 500)),
    updatePartnershipHero: async (data) => new Promise(resolve => setTimeout(() => { mockPartnershipHero = { ...mockPartnershipHero, ...data }; resolve({ data: mockPartnershipHero }); }, 500)),

    getImpactStats: async () => new Promise(resolve => setTimeout(() => resolve({ data: [...mockImpactStats] }), 500)),
    updateImpactStat: async (id, data) => new Promise(resolve => setTimeout(() => { mockImpactStats = mockImpactStats.map(s => s.id === id ? { ...s, ...data } : s); resolve({ data: mockImpactStats.find(s => s.id === id) }); }, 500)),

    getWhyPartner: async () => new Promise(resolve => setTimeout(() => resolve({ data: { ...mockWhyPartner } }), 500)),
    updateWhyPartner: async (data) => new Promise(resolve => setTimeout(() => { mockWhyPartner = { ...mockWhyPartner, ...data }; resolve({ data: mockWhyPartner }); }, 500)),

    getPartnershipStories: async () => new Promise(resolve => setTimeout(() => resolve({ data: [...mockPartnershipStories] }), 500)),
    createPartnershipStory: async (data) => new Promise(resolve => setTimeout(() => { const newItem = { id: Date.now(), ...data }; mockPartnershipStories.push(newItem); resolve({ data: newItem }); }, 500)),
    updatePartnershipStory: async (id, data) => new Promise(resolve => setTimeout(() => { mockPartnershipStories = mockPartnershipStories.map(s => s.id === id ? { ...s, ...data } : s); resolve({ data: mockPartnershipStories.find(s => s.id === id) }); }, 500)),
    deletePartnershipStory: async (id) => new Promise(resolve => setTimeout(() => { mockPartnershipStories = mockPartnershipStories.filter(s => s.id !== id); resolve({ success: true }); }, 500)),

    // --- Impact Page Metrics ---
    getImpactMetrics: async () => new Promise(resolve => setTimeout(() => resolve({ data: [...mockImpactMetrics] }), 500)),
    updateImpactMetric: async (id, data) => new Promise(resolve => setTimeout(() => {
        mockImpactMetrics = mockImpactMetrics.map(m => m.id === id ? { ...m, ...data } : m);
        resolve({ data: mockImpactMetrics.find(m => m.id === id) });
    }, 500)),
    createImpactMetric: async (data) => new Promise(resolve => setTimeout(() => {
        const newItem = { id: `MET-${Date.now()}`, ...data };
        mockImpactMetrics.push(newItem);
        resolve({ data: newItem });
    }, 500)),
    deleteImpactMetric: async (id) => new Promise(resolve => setTimeout(() => {
        mockImpactMetrics = mockImpactMetrics.filter(m => m.id !== id);
        resolve({ success: true });
    }, 500)),

    // --- Impact Page Stories ---
    getImpactStories: async () => new Promise(resolve => setTimeout(() => resolve({ data: [...mockSuccessStories] }), 500)),
    createImpactStory: async (data) => new Promise(resolve => setTimeout(() => {
        const newItem = { id: `STORY-${Date.now()}`, ...data };
        mockSuccessStories.push(newItem);
        resolve({ data: newItem });
    }, 500)),
    updateImpactStory: async (id, data) => new Promise(resolve => setTimeout(() => {
        mockSuccessStories = mockSuccessStories.map(s => s.id === id ? { ...s, ...data } : s);
        resolve({ data: mockSuccessStories.find(s => s.id === id) });
    }, 500)),
    deleteImpactStory: async (id) => new Promise(resolve => setTimeout(() => {
        mockSuccessStories = mockSuccessStories.filter(s => s.id !== id);
        resolve({ success: true });
    }, 500)),

    getRecognition: async () => new Promise(resolve => setTimeout(() => resolve({ data: [...mockRecognition] }), 500)),
    createRecognition: async (data) => new Promise(resolve => setTimeout(() => { const newItem = { id: Date.now(), ...data }; mockRecognition.push(newItem); resolve({ data: newItem }); }, 500)),
    deleteRecognition: async (id) => new Promise(resolve => setTimeout(() => { mockRecognition = mockRecognition.filter(r => r.id !== id); resolve({ success: true }); }, 500)),

    // --- Work With Us ---
    getWorkWithUs: async () => new Promise(resolve => setTimeout(() => resolve({ data: JSON.parse(JSON.stringify(mockWorkWithUs)) }), 500)),
    updateWorkWithUs: async (section, data) => new Promise(resolve => setTimeout(() => {
        if (section) mockWorkWithUs[section] = data;
        else mockWorkWithUs = { ...mockWorkWithUs, ...data };
        resolve({ data: mockWorkWithUs });
    }, 500)),

    // --- Quality Assurance ---
    getQA: async () => new Promise(resolve => setTimeout(() => resolve({ data: JSON.parse(JSON.stringify(mockQA)) }), 500)),
    updateQA: async (section, data) => new Promise(resolve => setTimeout(() => {
        if (section) mockQA[section] = data;
        else mockQA = { ...mockQA, ...data };
        resolve({ data: mockQA });
    }, 500))
};




export default contentService;
