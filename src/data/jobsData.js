export const jobCategories = [
  {
    id: 'technical',
    title: 'Technical & Development Roles',
    description: 'Since we handle Business and Enterprise projects, we need a core team to maintain high standards across our custom solutions.',
    icon: 'Code'
  },
  {
    id: 'education',
    title: 'Education & Training Roles',
    description: 'To support our IT Education Foundation and goal of training 100+ interns annually, these roles are essential.',
    icon: 'GraduationCap'
  },
  {
    id: 'internship',
    title: 'Internship Program',
    description: 'Bridging the gap between education and industry — our internship program is always open for passionate learners.',
    icon: 'Users'
  },
  {
    id: 'operations',
    title: 'Operational Leadership',
    description: 'Strategic roles that drive partnerships, business growth, and operational excellence across the Hub.',
    icon: 'Briefcase'
  }
];

export const jobsData = [
  // ── Technical & Development Roles ──────────────────────────────────
  {
    id: 1,
    title: 'Full-Stack Developer (Junior/Intermediate)',
    type: 'Full-time',
    category: 'technical',
    locations: ['Koforidua', 'Remote'],
    description: 'Join ZyraTech\'s core development team to build custom web and mobile applications for startups and enterprise clients. You will work directly on real-world projects that power businesses across Ghana and beyond.',
    companyDescription: 'ZyraTech Hub is a technology and innovation hub based in Koforidua, Ghana, focused on IT education, enterprise software development, cloud infrastructure, and academic research support. We partner with organizations like Royal Klast Group to deliver impactful solutions.',
    jobDescription: 'As a Full-Stack Developer, you will assist with the design, development, and deployment of custom web and mobile applications built for our startup and SME clients. You\'ll work across the entire stack — from responsive front-end interfaces to scalable back-end APIs — collaborating closely with the project lead and other developers to deliver production-ready solutions.',
    responsibilities: [
      'Build and maintain responsive web applications using React, Next.js, or Vue.js',
      'Develop RESTful and GraphQL APIs using Node.js, Python (Django/Flask), or similar frameworks',
      'Collaborate with UI/UX designers to translate mockups into pixel-perfect, accessible interfaces',
      'Write clean, testable, and well-documented code following best practices',
      'Participate in code reviews and contribute to improving development processes',
      'Integrate third-party services (payment gateways, messaging APIs, cloud services)',
      'Troubleshoot, debug, and optimize application performance'
    ],
    qualifications: [
      'HND or Bachelor\'s degree in Computer Science, Software Engineering, or related field',
      '1–3 years of hands-on experience in full-stack web or mobile development',
      'Proficiency in JavaScript/TypeScript, React or Vue.js, and at least one back-end framework',
      'Familiarity with relational and NoSQL databases (PostgreSQL, MongoDB, Firebase)',
      'Understanding of version control with Git and CI/CD workflows',
      'Strong problem-solving skills and attention to detail',
      'Ability to work independently and within a collaborative team'
    ],
    perks: [
      'Work on real client projects with measurable impact',
      'Mentorship from senior developers and industry experts',
      'Professional development and certification support',
      'Flexible work arrangement (Hybrid/Remote options)',
      'Opportunity to grow into a senior or lead role',
      'Collaborative and innovation-driven work culture'
    ]
  },
  {
    id: 2,
    title: 'Infrastructure & Cloud Specialist',
    type: 'Full-time',
    category: 'technical',
    locations: ['Koforidua', 'Remote'],
    description: 'Lead the planning, deployment, and management of cloud infrastructure and networking solutions for ZyraTech and our enterprise clients. This role directly supports our IT infrastructure and cloud consulting services.',
    companyDescription: 'ZyraTech Hub is a technology and innovation hub based in Koforidua, Ghana, focused on IT education, enterprise software development, cloud infrastructure, and academic research support. We partner with organizations like Royal Klast Group to deliver impactful solutions.',
    jobDescription: 'As an Infrastructure & Cloud Specialist, you will be responsible for designing, implementing, and managing cloud-based infrastructure on AWS, Azure, or Google Cloud Platform. You\'ll support both internal systems and client-facing deployments, ensuring high availability, security, and cost-efficiency across all environments.',
    responsibilities: [
      'Design and deploy scalable cloud architectures on AWS, Azure, or GCP',
      'Manage and monitor virtual machines, containers, networking, and storage',
      'Implement security best practices including IAM, firewalls, and encryption',
      'Set up CI/CD pipelines and automate infrastructure provisioning using Terraform or CloudFormation',
      'Provide technical support and consulting to enterprise clients on cloud migration and optimization',
      'Monitor system performance and implement proactive alerting and disaster recovery plans',
      'Document infrastructure configurations and maintain operational runbooks'
    ],
    qualifications: [
      'Bachelor\'s degree in Computer Science, IT, Networking, or related field',
      '2+ years of experience in cloud infrastructure or systems administration',
      'Hands-on experience with at least one major cloud platform (AWS preferred)',
      'Knowledge of networking fundamentals (TCP/IP, DNS, VPNs, load balancers)',
      'Experience with containerization (Docker, Kubernetes) is a plus',
      'AWS Certified Solutions Architect or equivalent certification preferred',
      'Strong analytical and troubleshooting skills'
    ],
    perks: [
      'Access to cloud labs and enterprise-grade tools',
      'Certification sponsorship (AWS, Azure, GCP)',
      'Work with diverse enterprise clients across industries',
      'Flexible hybrid work model',
      'Competitive salary commensurate with experience',
      'Career growth into DevOps or Solutions Architect roles'
    ]
  },
  {
    id: 3,
    title: 'Research Assistant (Academic Support)',
    type: 'Contract',
    category: 'technical',
    locations: ['Koforidua', 'Remote'],
    description: 'Support students and professionals working on Degree, Master\'s, and PhD research projects by providing technical implementation, data analysis, and validation services.',
    companyDescription: 'ZyraTech Hub is a technology and innovation hub based in Koforidua, Ghana, focused on IT education, enterprise software development, cloud infrastructure, and academic research support. We partner with organizations like Royal Klast Group to deliver impactful solutions.',
    jobDescription: 'As a Research Assistant, you will work closely with students and academic clients to support their research projects across various disciplines. This includes helping with technical implementation (coding, simulations, data processing), data validation, literature review assistance, and ensuring research outputs meet academic standards. You\'ll play a key role in our academic support services pillar.',
    responsibilities: [
      'Assist clients with technical implementation of research methodologies and prototypes',
      'Perform data collection, cleaning, analysis, and visualization using appropriate tools',
      'Support statistical analysis using SPSS, R, Python (Pandas, NumPy, Matplotlib), or similar',
      'Help with literature review, referencing, and formatting (APA, IEEE, Harvard)',
      'Validate research data integrity and ensure reproducibility of results',
      'Provide guidance on research tools, platforms, and best practices',
      'Collaborate with the academic services team to deliver projects on schedule'
    ],
    qualifications: [
      'Bachelor\'s or Master\'s degree in a STEM field, Social Sciences, or related discipline',
      'Strong proficiency in data analysis tools (Excel, SPSS, R, or Python)',
      'Experience with academic research methods and technical writing',
      'Familiarity with research ethics and data integrity standards',
      'Excellent written and verbal communication skills',
      'Ability to manage multiple projects with different timelines',
      'Prior experience supporting academic research is highly preferred'
    ],
    perks: [
      'Flexible contract-based engagement',
      'Exposure to diverse research fields and disciplines',
      'Professional development in academic research methodologies',
      'Remote-friendly work arrangement',
      'Opportunity to co-author or be acknowledged in published research',
      'Access to ZyraTech\'s tools and learning resources'
    ]
  },

  // ── Education & Training Roles ─────────────────────────────────────
  {
    id: 4,
    title: 'IT Technical Trainer (Part-Time / Contract)',
    type: 'Part-time',
    category: 'education',
    locations: ['Koforidua'],
    description: 'Deliver hands-on technical training sessions in in-demand skills like Python, JavaScript, Cybersecurity, and more. Help shape the next generation of tech talent through ZyraTech\'s education programs and community seminars.',
    companyDescription: 'ZyraTech Hub is a technology and innovation hub based in Koforidua, Ghana, focused on IT education, enterprise software development, cloud infrastructure, and academic research support. We partner with organizations like Royal Klast Group to deliver impactful solutions.',
    jobDescription: 'As an IT Technical Trainer, you will design and deliver practical, industry-relevant training sessions for students, interns, and community members. You\'ll teach in-person seminars covering topics such as Python programming, JavaScript/web development, cybersecurity fundamentals, and digital literacy. This role is critical to our mission of bridging the skills gap in Ghana\'s tech ecosystem.',
    responsibilities: [
      'Develop and deliver engaging, hands-on training curricula in Python, JavaScript, and Cybersecurity',
      'Conduct in-person seminars, workshops, and bootcamps at ZyraTech Hub',
      'Create learning materials including slides, exercises, lab guides, and assessments',
      'Assess student progress and provide constructive feedback and mentorship',
      'Stay current with industry trends and update training content accordingly',
      'Collaborate with the Education Coordinator to schedule and organize training sessions',
      'Support "Tech Talk" community sessions and outreach programs'
    ],
    qualifications: [
      'Bachelor\'s degree in Computer Science, IT, Education, or related field',
      'Demonstrable expertise in at least two of: Python, JavaScript, Cybersecurity, Networking',
      '1+ years of teaching, training, or mentoring experience (formal or informal)',
      'Excellent communication and presentation skills',
      'Patience and passion for helping others learn',
      'Industry certifications (CompTIA, Cisco, AWS, etc.) are a strong advantage',
      'Experience creating educational content or curricula'
    ],
    perks: [
      'Flexible part-time or contract schedule',
      'Competitive hourly/session compensation',
      'Opportunity to shape tech education in your community',
      'Access to ZyraTech\'s facilities and learning resources',
      'Professional recognition and networking opportunities',
      'Support for getting additional certifications'
    ]
  },
  {
    id: 5,
    title: 'Education Coordinator',
    type: 'Full-time',
    category: 'education',
    locations: ['Koforidua'],
    description: 'Manage the scheduling and coordination of ZyraTech\'s education programs, including "Tech Talk" sessions, secondary school cyber awareness campaigns, and the intern training pipeline.',
    companyDescription: 'ZyraTech Hub is a technology and innovation hub based in Koforidua, Ghana, focused on IT education, enterprise software development, cloud infrastructure, and academic research support. We partner with organizations like Royal Klast Group to deliver impactful solutions.',
    jobDescription: 'As Education Coordinator, you will be the operational backbone of ZyraTech\'s education and training programs. You\'ll manage the scheduling of "Tech Talk" community sessions, coordinate outreach with secondary schools for cyber awareness programs, and ensure the intern training pipeline runs smoothly. This role requires strong organizational skills, a passion for education, and the ability to manage relationships with schools, trainers, and community partners.',
    responsibilities: [
      'Plan, schedule, and manage all education programs, workshops, and "Tech Talk" sessions',
      'Coordinate with secondary schools to deliver cyber awareness and digital literacy programs',
      'Manage the internship training calendar and ensure all interns receive structured onboarding',
      'Liaise with IT Technical Trainers to align curricula with industry needs',
      'Track enrollment, attendance, and program outcomes with detailed reporting',
      'Maintain relationships with academic institutions, community partners, and guest speakers',
      'Support marketing efforts for education programs (social media, flyers, outreach)'
    ],
    qualifications: [
      'Bachelor\'s degree in Education, Business Administration, Project Management, or related field',
      'Excellent organizational and time-management skills',
      'Strong written and verbal communication skills',
      'Experience in event coordination, program management, or education administration',
      'Proficiency in office tools (Google Workspace, Microsoft Office) and project management software',
      'Ability to work with diverse stakeholders including students, educators, and partners',
      'Passion for tech education and community development'
    ],
    perks: [
      'Play a central role in shaping tech education in Koforidua',
      'Competitive salary with growth potential',
      'Professional development and training opportunities',
      'Collaborative and mission-driven work environment',
      'Health and wellness support',
      'Opportunity to expand into a senior leadership role'
    ]
  },

  // ── Internship Program (Always Open) ───────────────────────────────
  {
    id: 6,
    title: 'Graduate Trainee / Intern',
    type: 'Internship',
    category: 'internship',
    locations: ['Koforidua'],
    isAlwaysOpen: true,
    description: 'Join ZyraTech\'s comprehensive internship program designed specifically for students and recent graduates from Koforidua Technical University and other institutions. Gain real-world experience and work towards industry certification.',
    companyDescription: 'ZyraTech Hub is a technology and innovation hub based in Koforidua, Ghana, focused on IT education, enterprise software development, cloud infrastructure, and academic research support. We partner with organizations like Royal Klast Group to deliver impactful solutions.',
    jobDescription: 'Our Graduate Trainee / Internship program is designed to bridge the gap between academic education and industry readiness. As an intern, you\'ll receive structured training, hands-on project experience, and professional mentorship. You will work on real ZyraTech projects across web development, cloud computing, cybersecurity, and academic research support — gaining skills that make you employable from day one. This position is always open, and we aim to certify 100+ interns annually.',
    responsibilities: [
      'Participate in structured technical training covering web development, cloud, and cybersecurity',
      'Contribute to real client projects under the supervision of senior team members',
      'Complete assigned tasks, coding challenges, and project milestones on schedule',
      'Attend "Tech Talk" sessions, workshops, and professional development seminars',
      'Collaborate with fellow interns and team members in a professional environment',
      'Document learning progress and maintain a portfolio of completed projects',
      'Participate in code reviews, stand-ups, and team retrospectives'
    ],
    qualifications: [
      'Currently enrolled or recently graduated from a tertiary institution (HND, Bachelor\'s, or equivalent)',
      'Interest in at least one of: software development, cloud computing, cybersecurity, data analysis',
      'Basic understanding of programming concepts (any language)',
      'Willingness to learn, take initiative, and work in a team environment',
      'Good communication skills and a professional attitude',
      'Access to a personal laptop is preferred but not required',
      'Students from Koforidua Technical University and surrounding institutions are strongly encouraged to apply'
    ],
    perks: [
      'Structured training program with mentorship from industry professionals',
      'Hands-on experience on real projects (not simulated exercises)',
      'Certificate of completion recognized by ZyraTech and partner organizations',
      'Networking opportunities with tech professionals and entrepreneurs',
      'Potential for full-time employment based on performance',
      'Affordable internship fee of 350 GHS',
      'Letter of recommendation for outstanding performers'
    ]
  },

  // ── Operational Leadership ─────────────────────────────────────────
  {
    id: 7,
    title: 'Sales & Partnership Officer',
    type: 'Full-time',
    category: 'operations',
    locations: ['Koforidua'],
    description: 'Drive business growth by managing existing partnerships (including Royal Klast Group) and building new ones. You\'ll be responsible for bringing in new clients, nurturing relationships, and growing revenue for the Hub.',
    companyDescription: 'ZyraTech Hub is a technology and innovation hub based in Koforidua, Ghana, focused on IT education, enterprise software development, cloud infrastructure, and academic research support. We partner with organizations like Royal Klast Group to deliver impactful solutions.',
    jobDescription: 'As Sales & Partnership Officer, you will be the face of ZyraTech in the business community. Your primary role is to manage and grow our partnership network, secure new business opportunities, and ensure our existing partners (such as Royal Klast Group) receive excellent service. You\'ll develop proposals, negotiate contracts, represent ZyraTech at industry events, and work closely with the technical team to align client needs with our capabilities.',
    responsibilities: [
      'Manage and nurture existing partnerships to drive retention and satisfaction',
      'Identify, prospect, and close new business opportunities across IT services, education, and consulting',
      'Develop professional proposals, presentations, and pitch decks for prospective clients',
      'Represent ZyraTech at industry events, conferences, and networking meetups',
      'Collaborate with the technical team to scope projects and deliver accurate client quotations',
      'Track sales pipeline, forecast revenue, and report on business development KPIs',
      'Build and maintain a CRM database of leads, contacts, and partnership opportunities'
    ],
    qualifications: [
      'Bachelor\'s degree in Business Administration, Marketing, Communications, or related field',
      '2+ years of experience in sales, business development, or partnership management',
      'Proven track record of meeting or exceeding sales targets',
      'Excellent interpersonal, negotiation, and presentation skills',
      'Understanding of the technology industry and IT services landscape in Ghana',
      'Proficiency in CRM tools, Microsoft Office, and Google Workspace',
      'Self-motivated, results-oriented, and able to work independently'
    ],
    perks: [
      'Competitive base salary plus commission on closed deals',
      'Opportunity to build and lead the sales function at a growing tech hub',
      'Professional development and industry conference attendance',
      'Flexible working arrangements',
      'Direct impact on company growth and strategy',
      'Collaborative team culture with leadership exposure'
    ]
  }
];
