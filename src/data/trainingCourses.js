// Centralized training course catalog.
// Frontend uses this as a single source of truth for course lists, details, and application flows.
// When a backend is ready, swap the implementation here (or behind exported helpers) to fetch from API.

const defaultApplicationProcess = [
  {
    step: 1,
    title: 'Apply Now',
    description: 'Click on the "Apply Now" button below to complete the enrollment form'
  },
  {
    step: 2,
    title: 'Application Screening',
    description: 'Application screening and validation by our admissions team'
  },
  {
    step: 3,
    title: 'Decision',
    description: 'Email notification of application decision'
  },
  {
    step: 4,
    title: 'Join Program',
    description: 'Join us and become part of a community dedicated to shaping the future of technology'
  }
];

const defaultContactPerson = {
  name: 'Magdalene',
  title: 'Human Resources Team Lead',
  imageUrl: '/images/Dalene.png',
  email: 'hr@zyratech.com',
  phone: '+233 24 123 4567'
};

export const trainingCourses = [
  {
    id: 1,
    iconKey: 'cloud',
    category: 'intermediate',
    title: 'DevOps Engineering',
    duration: '8 weeks',
    level: 'Intermediate',
    participants: '15-20',
    rating: 4.9,
    reviews: 127,
    price: 'GHS 3,500',
    originalPrice: 'GHS 4,500',
    badge: 'Popular',
    instructor: 'Michael Afedi',
    schedule: 'Weekdays 6PM-8PM',
    format: 'Online + Onsite',
    certificate: 'Professional DevOps Certificate',
    deadline: '31st January, 2026',
    description: 'Master CI/CD pipelines, containerization, cloud deployment, and infrastructure automation.',
    longDescription: 'Build modern delivery pipelines and infrastructure automation skills through practical labs and real-world workflows.',
    programOverview: 'An 8-week intensive program that prepares learners for DevOps and cloud delivery roles with hands-on projects and mentorship.',
    heroInfoText: 'Learn modern DevOps technologies and best practices.',
    topics: ['Docker', 'Kubernetes', 'AWS/Azure', 'Jenkins', 'Terraform', 'Monitoring'],
    programmeObjectives: [
      {
        title: 'Understand modern DevOps workflows',
        description: 'Learn how teams deliver software reliably through collaboration, automation, and measurable practices.'
      },
      {
        title: 'Automate delivery with CI/CD',
        description: 'Build pipelines that test, package, and deploy applications consistently and safely.'
      },
      {
        title: 'Work with containers and orchestration',
        description: 'Use Docker and Kubernetes concepts to package and run applications at scale.'
      },
      {
        title: 'Deploy and monitor cloud infrastructure',
        description: 'Apply cloud best practices to improve reliability, performance, and security.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 2,
    iconKey: 'cloud',
    category: 'basic',
    title: 'Cloud Computing (AWS/Azure)',
    duration: '12 weeks',
    level: 'Beginner to Advanced',
    participants: '20-25',
    rating: 4.8,
    reviews: 98,
    price: 'GHS 4,200',
    badge: 'Bestseller',
    instructor: 'Sarah Johnson',
    schedule: 'Weekends 9AM-1PM',
    format: 'Online',
    certificate: 'Cloud Computing Certificate',
    deadline: '15th February, 2026',
    description: 'Comprehensive cloud training with AWS/Azure certification preparation.',
    longDescription: 'Learn cloud fundamentals and hands-on services across AWS and Azure, including compute, storage, networking, security, and certification readiness.',
    programOverview: 'A 12-week cloud computing program designed to build practical cloud skills and prepare learners for entry-level cloud roles and certifications.',
    heroInfoText: 'Build cloud fundamentals and prepare for certification.',
    topics: ['Cloud Foundations', 'Compute Services', 'Storage', 'Networking', 'Security', 'Certification Prep'],
    programmeObjectives: [
      {
        title: 'Understand cloud foundations',
        description: 'Learn core concepts such as regions, availability, shared responsibility, and cloud economics.'
      },
      {
        title: 'Work with essential services',
        description: 'Practice compute, storage, networking, and identity services across AWS and Azure.'
      },
      {
        title: 'Build secure cloud solutions',
        description: 'Apply security best practices including IAM, encryption, and network security controls.'
      },
      {
        title: 'Prepare for certification',
        description: 'Use guided preparation, mock questions, and labs aligned with common cloud certification tracks.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 3,
    iconKey: 'code',
    category: 'basic',
    title: 'Full Stack Web Development',
    duration: '16 weeks',
    level: 'Beginner',
    participants: '18-22',
    rating: 4.7,
    reviews: 156,
    price: 'GHS 3,800',
    instructor: 'David Mensah',
    schedule: 'Weekdays 5PM-7PM',
    format: 'Hybrid',
    certificate: 'Full Stack Developer Certificate',
    deadline: '31st January, 2026',
    heroImage: '/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png',
    description: 'Learn modern web development from frontend to backend with real projects.',
    longDescription: 'Start from the basics and progress to building full stack applications with modern frontend, backend APIs, databases, and deployment practices.',
    programOverview: 'A 16-week beginner-friendly program focused on building real web apps and a portfolio to help learners transition into junior developer roles.',
    heroInfoText: 'Learn modern web development technologies and best practices.',
    topics: ['HTML/CSS/JS', 'React', 'Node.js', 'Databases', 'APIs', 'Deployment'],
    programmeObjectives: [
      {
        title: 'Build responsive, modern websites',
        description: 'Create clean layouts that look great on mobile, tablet, and desktop using modern HTML and CSS.'
      },
      {
        title: 'Write real JavaScript for the web',
        description: 'Work with the DOM, events, APIs, and modern ES6+ patterns to build interactive user experiences.'
      },
      {
        title: 'Develop full stack applications',
        description: 'Build backend APIs, integrate databases, and connect everything into complete products.'
      },
      {
        title: 'Ship portfolio-ready projects',
        description: 'Build and deploy complete projects you can show employers or clients with confidence.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 4,
    iconKey: 'target',
    category: 'basic',
    title: 'Corporate Digital Transformation',
    duration: 'Custom',
    level: 'All Levels',
    participants: 'Custom',
    rating: 5.0,
    reviews: 45,
    price: 'Custom Quote',
    badge: 'Premium',
    instructor: 'Team of Experts',
    schedule: 'Flexible',
    format: 'Onsite/Online',
    certificate: 'Certificate of Participation',
    deadline: 'Flexible',
    description: 'Tailored training programs for corporate digital transformation initiatives.',
    longDescription: 'A customized engagement for organizations to align strategy, processes, and teams for digital transformation—delivered through workshops and practical implementation support.',
    programOverview: 'A flexible corporate program designed to upskill teams, improve digital workflows, and accelerate transformation outcomes across departments.',
    heroInfoText: 'Upskill teams and accelerate transformation outcomes.',
    topics: ['Digital Strategy', 'Process Automation', 'Team Training', 'Change Management'],
    programmeObjectives: [
      {
        title: 'Build a transformation roadmap',
        description: 'Identify opportunities, define priorities, and establish measurable milestones.'
      },
      {
        title: 'Improve processes with technology',
        description: 'Learn how to evaluate and apply tools for automation and productivity improvements.'
      },
      {
        title: 'Strengthen digital culture',
        description: 'Develop change management approaches to support adoption and long-term success.'
      },
      {
        title: 'Align teams and stakeholders',
        description: 'Create shared understanding of goals, responsibilities, and delivery expectations.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 5,
    iconKey: 'barChart',
    category: 'intermediate',
    title: 'Data Science & Analytics',
    duration: '10 weeks',
    level: 'Intermediate',
    participants: '12-15',
    rating: 4.6,
    reviews: 73,
    price: 'GHS 4,000',
    originalPrice: 'GHS 5,800',
    badge: 'Advanced',
    instructor: 'Data Science Team',
    schedule: 'Saturdays 10AM-2PM',
    format: 'Onsite',
    certificate: 'Data Science Certificate',
    deadline: '15th February, 2026',
    description: 'Transform data into insights with machine learning, statistics, and data visualization.',
    longDescription: 'Learn how to clean, analyze, and model data—then communicate insights through strong visual storytelling and applied machine learning workflows.',
    programOverview: 'A 10-week program for professionals looking to build analytics confidence and apply data science tools to real business problems.',
    heroInfoText: 'Turn data into decisions with modern analytics.',
    topics: ['Python for Data Science', 'Machine Learning', 'Data Visualization', 'Statistical Analysis', 'Big Data Tools'],
    programmeObjectives: [
      {
        title: 'Analyze and visualize data',
        description: 'Work with real datasets and create clear visual insights that drive decisions.'
      },
      {
        title: 'Build machine learning models',
        description: 'Train, evaluate, and iterate on models for common predictive tasks.'
      },
      {
        title: 'Apply statistics confidently',
        description: 'Use statistical thinking to validate assumptions and interpret results correctly.'
      },
      {
        title: 'Communicate findings',
        description: 'Tell a compelling story with data and present results for technical and non-technical audiences.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 6,
    iconKey: 'globe',
    category: 'advanced',
    title: 'Cloud Architecture',
    duration: '8 weeks',
    level: 'Advanced',
    participants: '10-15',
    rating: 4.8,
    reviews: 95,
    price: 'GHS 4,200',
    originalPrice: 'GHS 5,200',
    badge: 'Premium',
    instructor: 'Cloud Architects',
    schedule: 'Weekdays 6PM-8PM',
    format: 'Online',
    certificate: 'Cloud Architect Certificate',
    deadline: '31st January, 2026',
    description: 'Design and implement scalable cloud solutions on AWS, Azure, and Google Cloud.',
    longDescription: 'Learn modern architecture patterns, reliability practices, cloud migration strategy, and cost optimization for scalable systems.',
    programOverview: 'An advanced 8-week program for experienced practitioners to design cloud-native architectures and lead solution delivery.',
    heroInfoText: 'Architect scalable, secure, and cost-effective cloud systems.',
    topics: ['Cloud Design Patterns', 'Microservices', 'Serverless Architecture', 'Cloud Migration', 'Cost Optimization'],
    programmeObjectives: [
      {
        title: 'Design cloud-native architectures',
        description: 'Apply design patterns for scalability, resilience, and maintainability.'
      },
      {
        title: 'Plan migrations and modernization',
        description: 'Evaluate workloads and choose strategies for moving systems to the cloud.'
      },
      {
        title: 'Improve reliability and security',
        description: 'Build architectures that prioritize observability, threat modeling, and safe operations.'
      },
      {
        title: 'Optimize costs',
        description: 'Use practical frameworks to estimate, track, and reduce cloud spend.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 7,
    iconKey: 'cpu',
    category: 'advanced',
    title: 'AI & Machine Learning',
    duration: '12 weeks',
    level: 'Advanced',
    participants: '10-12',
    rating: 4.9,
    reviews: 142,
    price: 'GHS 5,500',
    originalPrice: 'GHS 6,500',
    badge: 'Premium',
    instructor: 'AI Research Team',
    schedule: 'Saturdays 9AM-1PM',
    format: 'Hybrid',
    certificate: 'AI Engineer Certificate',
    deadline: '15th February, 2026',
    description: 'Deep dive into artificial intelligence, neural networks, and cutting-edge ML techniques.',
    longDescription: 'Explore practical model development workflows, deep learning fundamentals, and how to ship ML models responsibly into real products.',
    programOverview: 'A 12-week advanced program covering modern machine learning, model evaluation, deployment foundations, and ethical AI practices.',
    heroInfoText: 'Build and deploy modern machine learning solutions.',
    topics: ['Deep Learning', 'Neural Networks', 'NLP & Computer Vision', 'ML Operations', 'AI Ethics'],
    programmeObjectives: [
      {
        title: 'Understand ML foundations',
        description: 'Learn core concepts in supervised/unsupervised learning and model evaluation.'
      },
      {
        title: 'Work with neural networks',
        description: 'Build deep learning models and understand training workflows and pitfalls.'
      },
      {
        title: 'Apply ML to real domains',
        description: 'Use techniques for NLP, computer vision, and structured data problems.'
      },
      {
        title: 'Practice responsible AI',
        description: 'Consider bias, fairness, privacy, and ethical deployment concerns.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 8,
    iconKey: 'bookOpen',
    category: 'matured',
    title: 'IT Fundamentals for Professionals',
    duration: '6 weeks',
    level: 'Beginner Friendly',
    participants: '15-20',
    rating: 4.7,
    reviews: 89,
    price: 'GHS 2,800',
    badge: 'Popular',
    instructor: 'Senior IT Team',
    schedule: 'Weekends 2PM-5PM',
    format: 'Flexible',
    certificate: 'IT Fundamentals Certificate',
    deadline: '31st January, 2026',
    description: 'Designed for mature professionals transitioning into IT careers with foundational training.',
    longDescription: 'Build confidence with essential computer skills, digital security awareness, and an overview of common IT roles and pathways.',
    programOverview: 'A 6-week foundation program for career changers and professionals seeking practical IT readiness for the workplace.',
    heroInfoText: 'Build foundational IT skills at a comfortable pace.',
    topics: ['Computer Basics', 'Internet & Email', 'Office Software', 'Digital Security', 'IT Career Paths', 'Professional Skills'],
    programmeObjectives: [
      {
        title: 'Build core computer skills',
        description: 'Understand file management, operating systems basics, and everyday troubleshooting.'
      },
      {
        title: 'Improve digital communication',
        description: 'Work confidently with email, online collaboration tools, and common productivity workflows.'
      },
      {
        title: 'Practice digital security',
        description: 'Learn safe habits around passwords, phishing, privacy, and device security.'
      },
      {
        title: 'Explore IT career pathways',
        description: 'Understand entry-level roles, required skills, and a plan to progress into tech.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 9,
    iconKey: 'target',
    category: 'matured',
    title: 'Digital Literacy & Office Automation',
    duration: '4 weeks',
    level: 'All Levels',
    participants: '20-25',
    rating: 4.6,
    reviews: 67,
    price: 'GHS 1,800',
    instructor: 'Office Skills Team',
    schedule: 'Weekdays 5PM-7PM',
    format: 'Hybrid',
    certificate: 'Digital Literacy Certificate',
    deadline: '15th February, 2026',
    description: 'Enhance digital skills and improve workplace productivity through technology.',
    longDescription: 'Learn practical office productivity skills with modern tools for documents, spreadsheets, presentations, and collaboration.',
    programOverview: 'A 4-week programme to help professionals become more efficient and confident with digital tools in the workplace.',
    heroInfoText: 'Improve productivity with modern office tools.',
    topics: ['Microsoft Office', 'Google Workspace', 'Digital Communication', 'Data Management', 'Presentation Skills', 'Time Management Tools'],
    programmeObjectives: [
      {
        title: 'Master office productivity tools',
        description: 'Work effectively with documents, spreadsheets, and presentations.'
      },
      {
        title: 'Improve workplace collaboration',
        description: 'Use cloud collaboration tools to share, review, and manage work efficiently.'
      },
      {
        title: 'Organize information professionally',
        description: 'Apply file management, naming conventions, and data hygiene practices.'
      },
      {
        title: 'Communicate clearly with technology',
        description: 'Use email, calendars, and communication tools responsibly and effectively.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 10,
    iconKey: 'briefcase',
    category: 'matured',
    title: 'Career Transition to Tech Program',
    duration: '12 weeks',
    level: 'Career Changers',
    participants: '12-15',
    rating: 4.8,
    reviews: 102,
    price: 'GHS 4,500',
    badge: 'Premium',
    instructor: 'Career Development Team',
    schedule: 'Flexible Schedule',
    format: 'Online + Mentorship',
    certificate: 'Career Transition Certificate',
    deadline: '31st January, 2026',
    description: 'A program for professionals from other fields to transition into technology careers.',
    longDescription: 'Get structured guidance to assess strengths, build a learning plan, develop a portfolio, and prepare for interviews and networking in tech.',
    programOverview: 'A 12-week guided programme for career changers that combines mentorship, practical projects, and job-readiness support.',
    heroInfoText: 'Plan your transition and build a tech-ready portfolio.',
    topics: ['Tech Industry Overview', 'Skill Assessment', 'Career Planning', 'Portfolio Building', 'Interview Preparation', 'Networking Skills'],
    programmeObjectives: [
      {
        title: 'Assess skills and choose a pathway',
        description: 'Identify roles that fit your strengths and build a realistic transition plan.'
      },
      {
        title: 'Build job-ready competencies',
        description: 'Develop practical skills aligned with modern tech roles and real workplace expectations.'
      },
      {
        title: 'Create a professional portfolio',
        description: 'Showcase your progress through projects that demonstrate capability and growth.'
      },
      {
        title: 'Prepare for interviews and networking',
        description: 'Improve your resume, interview readiness, and professional presence to land opportunities.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 11,
    iconKey: 'bookOpen',
    category: 'internship',
    title: 'Software Development Internship',
    duration: '3 months',
    level: 'Hands-on Training',
    participants: '8-10',
    rating: 4.9,
    reviews: 145,
    price: 'GHS 3,200',
    badge: 'Popular',
    instructor: 'Development Team',
    schedule: 'Full-time (Mon-Fri)',
    format: 'Onsite',
    certificate: 'Internship Completion Certificate',
    deadline: '31st January, 2026',
    description: 'Hands-on experience in real software development projects with mentorship.',
    longDescription: 'Join a professional team environment, work on real deliverables, and build a portfolio of practical development work with structured mentorship.',
    programOverview: 'A 3-month immersive internship designed to build real-world development experience and workplace readiness.',
    heroInfoText: 'Work on real projects and build your portfolio.',
    topics: ['Web Development', 'Mobile Apps', 'Database Design', 'API Development', 'Testing & Debugging', 'Version Control'],
    programmeObjectives: [
      {
        title: 'Work in a real dev environment',
        description: 'Learn workflows, teamwork, and tooling used in professional software development.'
      },
      {
        title: 'Build practical development skills',
        description: 'Deliver features, fix bugs, and learn testing and debugging best practices.'
      },
      {
        title: 'Collaborate effectively',
        description: 'Practice communication, task planning, and teamwork using modern project tools.'
      },
      {
        title: 'Grow career readiness',
        description: 'Improve CV, portfolio, and interview readiness with mentor feedback.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 12,
    iconKey: 'building',
    category: 'internship',
    title: 'IT Infrastructure Internship',
    duration: '3 months',
    level: 'Practical Experience',
    participants: '6-8',
    rating: 4.7,
    reviews: 89,
    price: 'GHS 2,800',
    instructor: 'Infrastructure Team',
    schedule: 'Full-time (Mon-Fri)',
    format: 'Onsite',
    certificate: 'Internship Completion Certificate',
    deadline: '31st January, 2026',
    description: 'Real-world experience in network administration, system maintenance, and IT support.',
    longDescription: 'Gain hands-on exposure to enterprise IT environments—covering support operations, networking basics, security practices, and systems maintenance.',
    programOverview: 'A 3-month internship designed to develop practical IT support and infrastructure skills in a professional environment.',
    heroInfoText: 'Build practical IT support and infrastructure experience.',
    topics: ['Network Setup', 'Server Management', 'IT Support', 'Security Implementation', 'Cloud Services', 'Hardware Maintenance'],
    programmeObjectives: [
      {
        title: 'Understand enterprise IT operations',
        description: 'Learn how IT teams manage users, devices, systems, and incidents.'
      },
      {
        title: 'Practice networking fundamentals',
        description: 'Work with LAN/WAN basics, configurations, and troubleshooting approaches.'
      },
      {
        title: 'Apply security best practices',
        description: 'Learn safe operational habits, access control concepts, and basic hardening steps.'
      },
      {
        title: 'Improve troubleshooting skills',
        description: 'Develop structured thinking for diagnosing and resolving common IT issues.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 13,
    iconKey: 'rocket',
    category: 'internship',
    title: 'Digital Marketing Internship',
    duration: '2 months',
    level: 'Creative Training',
    participants: '10-12',
    rating: 4.6,
    reviews: 76,
    price: 'GHS 2,200',
    badge: 'Creative',
    instructor: 'Marketing Team',
    schedule: 'Part-time Flexible',
    format: 'Hybrid',
    certificate: 'Internship Completion Certificate',
    deadline: '15th February, 2026',
    description: 'Learn digital marketing strategies through real campaigns and hands-on tools.',
    longDescription: 'Work on real marketing campaigns and learn practical skills in content creation, SEO, email marketing, analytics, and brand communication.',
    programOverview: 'A 2-month internship focused on practical digital marketing execution and measurable campaign outcomes.',
    heroInfoText: 'Work on real campaigns and learn modern marketing tools.',
    topics: ['Social Media Marketing', 'Content Creation', 'SEO/SEM', 'Email Marketing', 'Analytics', 'Brand Management'],
    programmeObjectives: [
      {
        title: 'Plan and execute campaigns',
        description: 'Learn how to design and launch marketing campaigns with clear goals and KPIs.'
      },
      {
        title: 'Create content consistently',
        description: 'Develop content for social media, email, and web with a strong brand voice.'
      },
      {
        title: 'Understand SEO and analytics',
        description: 'Use basic SEO practices and interpret analytics to improve performance.'
      },
      {
        title: 'Build practical portfolio work',
        description: 'Document your work and results to showcase skills for future opportunities.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  }
];

export const trainingCourseById = trainingCourses.reduce((acc, course) => {
  acc[course.id] = course;
  return acc;
}, {});

export const trainingCourseOptions = trainingCourses.map(({ id, title }) => ({ id, title }));

export function getTrainingCourseById(id) {
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) return null;
  return trainingCourseById[numericId] || null;
}

export function getTrainingCourseTitle(id) {
  return getTrainingCourseById(id)?.title || '';
}

export function getTrainingCoursesByCategory(category) {
  return trainingCourses.filter((course) => course.category === category);
}
