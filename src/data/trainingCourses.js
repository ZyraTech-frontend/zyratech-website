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
    iconKey: 'code',
    category: 'intermediate',
    title: 'Python Programming & Data Analysis',
    duration: '8 weeks',
    level: 'Intermediate',
    participants: '15-20',
    rating: 4.8,
    reviews: 112,
    price: 'GHS 2,800',
    originalPrice: 'GHS 3,500',
    badge: 'Popular',
    instructor: 'Data Science Team',
    schedule: 'Weekdays 6PM-8PM',
    format: 'Online + Onsite',
    certificate: 'Python Data Analysis Certificate',
    deadline: 'Rolling Admission',
    description: 'Core logic, data visualization, and statistical insights for research. Master Python for real-world data problems.',
    longDescription: 'This course bridges the gap between basic programming and data science. You will master Python syntax, work with powerful libraries like Pandas, NumPy, and Matplotlib, and learn how to extract meaningful insights from complex datasets.',
    programOverview: 'An 8-week program designed to turn beginners into confident Python programmers capable of handling data analysis tasks.',
    heroInfoText: 'Master Python and unlock the power of data.',
    topics: ['Python Fundamentals', 'Data Structures', 'Pandas & NumPy', 'Data Visualization', 'Statistical Analysis', 'Project Work'],
    programmeObjectives: [
      {
        title: 'Master Python syntax',
        description: 'Write clean, efficient, and Pythonic code for various applications.'
      },
      {
        title: 'Analyze large datasets',
        description: 'Use Pandas to clean, manipulate, and explore real-world data.'
      },
      {
        title: 'Visualize data effectively',
        description: 'Create compelling charts and graphs to communicate findings clearly.'
      },
      {
        title: 'Apply statistical methods',
        description: 'Understand the math behind the data to validate your insights.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 2,
    iconKey: 'target',
    category: 'basic',
    title: 'Digital Literacy & Office Mastery',
    duration: '4 weeks',
    level: 'Beginner',
    participants: '20-30',
    rating: 4.8,
    reviews: 98,
    price: 'GHS 800',
    badge: 'Bestseller',
    instructor: 'ZyraTech Training Team',
    schedule: 'Weekdays 9AM-12PM',
    format: 'Onsite',
    certificate: 'Digital Literacy Certificate',
    deadline: 'Rolling Admission',
    description: 'Perfect for absolute beginners needing essential workplace skills. Master the Microsoft Office Suite and core computer skills in just 1 month.',
    longDescription: 'This foundational course is designed for absolute beginners who want to become confident with computers and essential workplace tools. You will learn to navigate operating systems, manage files, and master the Microsoft Office Suite — including Word for professional documents, Excel for data and calculations, and PowerPoint for impactful presentations.',
    programOverview: 'A 4-week intensive program that equips absolute beginners with the digital skills needed to thrive in any modern workplace.',
    heroInfoText: 'Master essential computer and office skills in 4 weeks.',
    topics: ['Computer Basics', 'Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'File Management', 'Internet & Email'],
    programmeObjectives: [
      {
        title: 'Navigate computers confidently',
        description: 'Understand operating systems, file management, and basic troubleshooting for everyday use.'
      },
      {
        title: 'Create professional documents in Word',
        description: 'Format letters, reports, and professional documents with proper styling and layout.'
      },
      {
        title: 'Work with data in Excel',
        description: 'Build spreadsheets, use formulas, and create charts for data analysis and reporting.'
      },
      {
        title: 'Design effective presentations in PowerPoint',
        description: 'Create clear, visually engaging presentations for academic and professional settings.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 3,
    iconKey: 'code',
    category: 'basic',
    title: 'Intro to Logic & Problem Solving',
    duration: '4 weeks',
    level: 'Beginner',
    participants: '15-25',
    rating: 4.7,
    reviews: 156,
    price: 'GHS 1,200',
    instructor: 'ZyraTech Training Team',
    schedule: 'Weekdays 2PM-5PM',
    format: 'Hybrid',
    certificate: 'Computational Thinking Certificate',
    deadline: 'Rolling Admission',
    heroImage: '/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png',
    description: 'Ideal for students preparing for coding who need to understand computational logic. Build strong problem-solving foundations before diving into programming.',
    longDescription: 'This course is designed for students who want to build a strong foundation in computational thinking before learning a programming language. You will learn how to break down problems, think algorithmically, use flowcharts and pseudocode, and develop the logical reasoning skills that underpin all software development.',
    programOverview: 'A 4-week preparatory course that builds the logical thinking and problem-solving skills essential for success in any programming language.',
    heroInfoText: 'Build the logical foundations you need before learning to code.',
    topics: ['Computational Thinking', 'Flowcharts & Pseudocode', 'Algorithms', 'Pattern Recognition', 'Logical Reasoning', 'Problem Decomposition'],
    programmeObjectives: [
      {
        title: 'Think like a programmer',
        description: 'Develop computational thinking skills — breaking down problems into logical, solvable steps.'
      },
      {
        title: 'Design solutions with flowcharts',
        description: 'Use flowcharts and pseudocode to plan and visualize solutions before writing any code.'
      },
      {
        title: 'Understand algorithms and patterns',
        description: 'Learn common algorithmic approaches and recognize patterns in problems.'
      },
      {
        title: 'Solve problems systematically',
        description: 'Practice structured problem-solving with real-world exercises and logic puzzles.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 4,
    iconKey: 'target',
    category: 'basic',
    title: 'Cyber Awareness & Digital Research',
    duration: '4 weeks',
    level: 'Beginner',
    participants: '20-30',
    rating: 5.0,
    reviews: 45,
    price: 'GHS 600',
    instructor: 'ZyraTech Training Team',
    schedule: 'Weekdays 10AM-1PM',
    format: 'Onsite',
    certificate: 'Cyber Awareness Certificate',
    deadline: 'Rolling Admission',
    description: 'Perfect for anyone looking to browse safely and conduct professional academic research. Learn essential online safety and digital research skills.',
    longDescription: 'This course teaches you how to stay safe online and conduct effective digital research. You will learn to identify phishing attempts, protect your personal data, use strong passwords, browse securely, and apply professional research techniques for academic and workplace purposes.',
    programOverview: 'A 4-week program that equips learners with essential cyber awareness skills and professional digital research techniques.',
    heroInfoText: 'Stay safe online and master digital research skills.',
    topics: ['Online Safety', 'Phishing & Scam Awareness', 'Password Security', 'Safe Browsing', 'Academic Research Methods', 'Digital Research Tools'],
    programmeObjectives: [
      {
        title: 'Recognize online threats',
        description: 'Identify phishing emails, fake websites, social engineering attacks, and common online scams.'
      },
      {
        title: 'Protect your digital identity',
        description: 'Use strong passwords, two-factor authentication, and privacy settings to safeguard personal information.'
      },
      {
        title: 'Browse and communicate safely',
        description: 'Understand secure browsing practices, safe downloads, and responsible social media use.'
      },
      {
        title: 'Conduct professional digital research',
        description: 'Use search engines, academic databases, and citation tools effectively for school and work.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 5,
    iconKey: 'code',
    category: 'intermediate',
    title: 'Frontend Web Development',
    duration: '8 weeks',
    level: 'Intermediate',
    participants: '15-20',
    rating: 4.8,
    reviews: 145,
    price: 'GHS 2,500',
    originalPrice: 'GHS 3,200',
    badge: 'Highly Rated',
    instructor: 'Web Development Team',
    schedule: 'Weekdays 6PM-8PM',
    format: 'Onsite + Online',
    certificate: 'Frontend Developer Certificate',
    deadline: 'Rolling Admission',
    description: 'Responsive design, HTML5, CSS3, and JavaScript frameworks. Build stunning, interactive user interfaces.',
    longDescription: 'Master the art of building beautiful, responsive websites. This course covers everything from the building blocks of the web (HTML5, CSS3) to modern JavaScript frameworks like React, enabling you to create professional-grade user interfaces.',
    programOverview: 'An 8-week hands-on deep dive into modern frontend development technologies and best practices.',
    heroInfoText: 'Build modern, responsive, and interactive websites.',
    topics: ['HTML5 & Semantic Web', 'CSS3 & Flexbox/Grid', 'JavaScript (ES6+)', 'React.js Basics', 'Responsive Design', 'Git & Version Control'],
    programmeObjectives: [
      {
        title: 'Build semantic HTML structures',
        description: 'Create accessible and well-structured web pages using modern HTML5 standards.'
      },
      {
        title: 'Master modern CSS layout',
        description: 'Use Flexbox, Grid, and media queries to build responsive layouts that look great on any device.'
      },
      {
        title: 'Write interactive JavaScript',
        description: 'Add dynamic behavior to your sites using modern JavaScript and DOM manipulation.'
      },
      {
        title: 'Work with frameworks',
        description: 'Get introduced to component-based development with libraries like React.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 6,
    iconKey: 'code',
    category: 'advanced',
    title: 'Full-Stack Web Development',
    duration: '16 Weeks',
    level: 'Advanced',
    participants: '15-20',
    rating: 4.9,
    reviews: 156,
    price: 'GHS 3,800',
    originalPrice: 'GHS 4,500',
    badge: 'Best Value',
    instructor: 'Senior Engineering Team',
    schedule: 'Weekdays 6PM-8PM',
    format: 'Onsite + Online',
    certificate: 'Full Stack Engineer Certificate',
    deadline: 'Rolling Admission',
    description: 'End-to-end engineering using modern frameworks. Build scalable, production-ready applications from scratch.',
    longDescription: 'Become a complete software engineer. This intensive course covers the entire development lifecycle—from designing databases and building robust APIs on the backend to creating dynamic, responsive user interfaces on the frontend using the MERN stack (MongoDB, Express, React, Node.js).',
    programOverview: 'A 16-week comprehensive bootcamp that transforms you into a job-ready full-stack developer.',
    heroInfoText: 'Master the full stack and build complete web applications.',
    topics: ['React.js & Redux', 'Node.js & Express', 'MongoDB & SQL', 'Authentication (JWT)', 'DevOps Basics', 'System Design'],
    programmeObjectives: [
      {
        title: 'Build complete applications',
        description: 'Design and develop full-stack applications with separated frontend and backend services.'
      },
      {
        title: 'Master state management',
        description: 'Handle complex application state using tools like Redux or Context API.'
      },
      {
        title: 'Secure your applications',
        description: 'Implement industry-standard security practices for data protection and user access.'
      },
      {
        title: 'Deploy to production',
        description: 'Learn CI/CD pipelines and deployment strategies for cloud platforms.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 7,
    iconKey: 'cpu',
    category: 'advanced',
    title: 'Mobile App Development',
    duration: '12 Weeks',
    level: 'Advanced',
    participants: '10-15',
    rating: 4.8,
    reviews: 142,
    price: 'GHS 4,000',
    originalPrice: 'GHS 4,800',
    badge: 'Premium',
    instructor: 'Mobile Development Team',
    schedule: 'Saturdays 9AM-2PM',
    format: 'Onsite + Online',
    certificate: 'Mobile App Developer Certificate',
    deadline: 'Rolling Admission',
    description: 'Cross-platform development for iOS and Android using Flutter or React Native. Build native-quality apps efficiently.',
    longDescription: 'Learn how to build beautiful, performant mobile applications for both iOS and Android from a single codebase. This course focuses on modern cross-platform frameworks like Flutter (or React Native), covering UI design implementation, native device features (camera, location), and publishing to app stores.',
    programOverview: 'A 12-week specialized track for building production-ready mobile apps that run on billions of devices.',
    heroInfoText: 'Build apps for iOS and Android with a single codebase.',
    topics: ['Flutter/Dart or React Native', 'Cross-Platform Architecture', 'State Management', 'Native APIs (Camera, GPS)', 'App Store Deployment', 'UI/UX for Mobile'],
    programmeObjectives: [
      {
        title: 'Master cross-platform framework',
        description: 'Build apps that feel native on both iOS and Android using a single language and codebase.'
      },
      {
        title: 'Access native device features',
        description: 'Integrate camera, location, sensors, and local storage into your applications.'
      },
      {
        title: 'Manage complex app state',
        description: 'Handle data flow and user interactions efficiently in mobile environments.'
      },
      {
        title: 'Publish to App Stores',
        description: 'Understand the submission process, guidelines, and optimization for Google Play and Apple App Store.'
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
  },
  {
    id: 14,
    iconKey: 'database',
    category: 'intermediate',
    title: 'Backend Web Development',
    duration: '8 weeks',
    level: 'Intermediate',
    participants: '15-20',
    rating: 4.8,
    reviews: 132,
    price: 'GHS 2,500',
    originalPrice: 'GHS 3,200',
    badge: 'Highly Rated',
    instructor: 'Web Development Team',
    schedule: 'Weekdays 6PM-8PM',
    format: 'Onsite + Online',
    certificate: 'Backend Developer Certificate',
    deadline: 'Rolling Admission',
    description: 'Server-side logic, API development, and Database Management. Power robust and scalable web applications.',
    longDescription: 'Learn how to build the "brain" of web applications. This course covers server-side programming with Node.js/Express (or Python/Django), database management with SQL/NoSQL, and how to build secure, scalable APIs that power modern apps.',
    programOverview: 'An 8-week intensive program focused on building robust backends, APIs, and managing data at scale.',
    heroInfoText: 'Build and secure the logic behind web applications.',
    topics: ['Node.js & Express', 'Databases (SQL vs NoSQL)', 'RESTful APIs', 'Authentication & Authorization', 'Server Deployment', 'Data Modeling'],
    programmeObjectives: [
      {
        title: 'Build RESTful APIs',
        description: 'Design and implement APIs that follow industry standards for communication.'
      },
      {
        title: 'Manage databases',
        description: 'Design schemas, write queries, and integrate databases like MongoDB or PostgreSQL.'
      },
      {
        title: 'Implement authentication',
        description: 'Secure your applications using JWT, OAuth, and proper password hashing techniques.'
      },
      {
        title: 'Deploy to the cloud',
        description: 'Learn how to host your backend services on platforms like Heroku, render, or AWS.'
      }
    ],
    applicationProcess: defaultApplicationProcess,
    contactPerson: defaultContactPerson
  },
  {
    id: 15,
    iconKey: 'target',
    category: 'advanced',
    title: 'UI/UX Design & Strategy',
    duration: '12 Weeks',
    level: 'Advanced',
    participants: '15-20',
    rating: 4.8,
    reviews: 124,
    price: 'GHS 3,500',
    originalPrice: 'GHS 4,200',
    badge: 'Trending',
    instructor: 'Design Team',
    schedule: 'Weekdays 5PM-7PM',
    format: 'Onsite',
    certificate: 'UI/UX Design Certificate',
    deadline: 'Rolling Admission',
    description: 'Advanced user research, high-fidelity prototyping, and design systems. Create products users love.',
    longDescription: 'Go beyond basic design principles. Master the entire product design process from user research and information architecture to high-fidelity prototyping and design systems using industry-standard tools like Figma.',
    programOverview: 'A 12-week immersive program for designers who want to build strategic, user-centered digital products.',
    heroInfoText: 'Design intuitive, beautiful, and strategic user experiences.',
    topics: ['User Research', 'Information Architecture', 'Wireframing & Prototyping', 'Figma Mastery', 'Design Systems', 'Usability Testing'],
    programmeObjectives: [
      {
        title: 'Conduct user research',
        description: 'Understand user needs through interviews, surveys, and persona development.'
      },
      {
        title: 'Build high-fidelity prototypes',
        description: 'Create interactive prototypes in Figma that look and feel like the final product.'
      },
      {
        title: 'Create scalable design systems',
        description: 'Develop reusable components and style guides for consistent product design.'
      },
      {
        title: 'Validate designs with testing',
        description: 'Run usability tests to gather feedback and iterate on your solutions.'
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
