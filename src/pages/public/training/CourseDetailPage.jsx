import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Star, Award, Check, CheckCircle, Calendar, Briefcase, TrendingUp, UsersRound, Target, BookOpen } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';
import TrainingNavbar from '../../../components/TrainingNavbar';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import HrContactCard from '../../../components/common/HrContactCard';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  // Course data - in a real app, this would come from an API
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

  const courses = {
    1: {
      id: 1,
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
      contactPerson: defaultContactPerson,
    },
    2: {
      id: 2,
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
      contactPerson: defaultContactPerson,
    },
    3: {
      id: 3,
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
      contactPerson: defaultContactPerson,
    },
    4: {
      id: 4,
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
      contactPerson: defaultContactPerson,
    },
    5: {
      id: 5,
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
      contactPerson: defaultContactPerson,
    },
    6: {
      id: 6,
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
      contactPerson: defaultContactPerson,
    },
    7: {
      id: 7,
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
      contactPerson: defaultContactPerson,
    },
    8: {
      id: 8,
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
      contactPerson: defaultContactPerson,
    },
    9: {
      id: 9,
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
      contactPerson: defaultContactPerson,
    },
    10: {
      id: 10,
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
      contactPerson: defaultContactPerson,
    },
    11: {
      id: 11,
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
      contactPerson: defaultContactPerson,
    },
    12: {
      id: 12,
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
      contactPerson: defaultContactPerson,
    },
    13: {
      id: 13,
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
      contactPerson: defaultContactPerson,
    },
  };

  const course = courses[courseId];
  const heroImage = course?.heroImage || '/images/image1.png';
  const parallaxImage = '/images/image3.png';

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <TrainingNavbar />
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Program not found</h1>
            <p className="text-gray-600 mb-8">The program you’re looking for doesn’t exist or may have been moved.</p>
            <button
              onClick={() => navigate('/training/programs')}
              className="bg-[#004fa2] hover:bg-[#2A2D7C] text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              Back to Programs
            </button>
          </div>
        </div>
      </div>
    );
  }

  const programmeObjectives = course.programmeObjectives || [];

  const pillars = [
    {
      title: 'Employment Pathways',
      description: 'Build job-ready skills and a portfolio that positions you for real opportunities.',
      Icon: Briefcase,
    },
    {
      title: 'Skill Enhancement',
      description: 'Gain practical, in-demand skills aligned with modern software development roles.',
      Icon: TrendingUp,
    },
    {
      title: 'Talent Development',
      description: 'Learn with mentorship, peer support, and structured feedback throughout the program.',
      Icon: UsersRound,
    },
    {
      title: 'Bridging the Gap',
      description: 'Bridge theory to practice with hands-on labs, projects, and real-world workflows.',
      Icon: Target,
    },
  ];

  const deliveryModel = [
    {
      title: 'Instructor-led Sessions',
      description: 'Guided lessons, reviews, and practical walkthroughs with direct instructor support.',
    },
    {
      title: 'Hands-on Practice',
      description: 'Labs and projects to apply concepts and build confidence through doing.',
    },
    {
      title: 'Self-paced Learning',
      description: 'Structured exercises and assessments to reinforce learning at your own pace.',
    },
    {
      title: 'Collaborative Learning',
      description: 'Peer learning, group check-ins, and teamwork to strengthen problem-solving skills.',
    },
    {
      title: 'Individual Feedback',
      description: 'Targeted feedback to help you improve faster and stay on track.',
    },
  ];

  const handleEnroll = () => {
    navigate('/training/programs', { 
      state: { 
        course: course.title,
        courseId: course.id 
      } 
    });
  };

  const heroTitle = course.title;
  const heroSubtitle = course.longDescription || course.description;
  const heroInfoText = course.heroInfoText || 'Learn modern technologies and best practices.';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TrainingNavbar />
      <div className="flex-grow">
        {/* Course Header */}
        <section
          className="relative min-h-screen flex items-center bg-center bg-cover"
          style={{ backgroundImage: `url('${heroImage}')` }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <button
            onClick={() => navigate('/training')}
            className="absolute z-20 top-6 left-4 sm:left-6 lg:left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Programs
          </button>
          <div className="absolute z-20 bottom-10 left-4 right-4 sm:left-6 sm:right-6 lg:left-auto lg:right-8">
            <div className="bg-white/10 backdrop-blur-[10px] rounded-2xl px-6 py-4 border border-white/20 shadow-lg whitespace-nowrap w-fit mx-auto lg:mx-0">
              <div className="text-white font-semibold">
                {heroInfoText}
              </div>
            </div>
          </div>
          <div className="relative z-10 w-full py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                ref={titleAnimation.ref}
                initial={titleAnimation.initial}
                animate={titleAnimation.animate}
                variants={titleAnimation.variants}
                transition={titleAnimation.transition}
              >
                <div className="grid lg:grid-cols-3 gap-10 items-start">
                  <div className="lg:col-span-2 text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                      {heroTitle}
                    </h1>
                    <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                      {heroSubtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-white border-b border-gray-200 rounded-b-[40px] overflow-hidden shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[#004fa2]" />
                  <div className="text-sm font-semibold text-gray-900">{course.duration}</div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen size={18} className="text-[#004fa2]" />
                  <div className="text-sm font-semibold text-gray-900">{course.format}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Award size={18} className="text-[#004fa2]" />
                  <div className="text-sm font-semibold text-gray-900">{course.certificate || 'Certificate'}</div>
                </div>
                <div className="flex items-center gap-3">
                  <UsersRound size={18} className="text-[#004fa2]" />
                  <div className="text-sm font-semibold text-gray-900">Expert Support</div>
                </div>
              </div>

              <button
                onClick={handleEnroll}
                className="bg-[#004fa2] hover:bg-[#2A2D7C] text-white px-8 py-4 rounded font-bold transition-colors shadow-md"
              >
                Enroll Now - {course.price}
              </button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Program Overview
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {course.programOverview}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Programme Objectives</h3>

                <div className="space-y-6">
                  {programmeObjectives.map((objective) => (
                    <div key={objective.title} className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <Check className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{objective.title}</div>
                        <p className="text-slate-600 leading-relaxed">{objective.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative p-8 sm:p-10">
                <div className="absolute left-0 top-10 bottom-10 w-3 sm:w-4 bg-orange-600 z-0 rounded-sm" />
                <div className="relative z-10">
                  <img
                    src={heroImage}
                    alt="Trainee working"
                    className="w-full h-[320px] sm:h-[380px] lg:h-[420px] object-cover rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Divider Section */}
        <section
          className="relative h-96 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url('${parallaxImage}')` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </section>

        {/* Application Process Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Steps List */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Application Process</h2>
                <ol className="relative border-l-4 border-[#004fa2] pl-8 space-y-8">
                  {course.applicationProcess
                    .filter(step => step.title !== 'Phone Interview' && step.title !== 'Assessment')
                    .map((step, idx, arr) => (
                      <li key={step.title} className="ml-2">
                        <div className="absolute -left-5 top-1.5 w-6 h-6 rounded-full bg-[#004fa2] flex items-center justify-center text-white font-bold text-base shadow-md">
                          {idx + 1}
                        </div>
                        <div className="ml-4">
                          <div className="font-bold text-lg text-[#004fa2] mb-1">{step.title}</div>
                          <div className="text-gray-700 text-base">{step.description}</div>
                        </div>
                      </li>
                    ))}
                </ol>
              </div>
              {/* Illustration or Accent Image */}
              <div className="flex justify-center items-center">
                <img src="/images/image2.png" alt="Application Process" className="w-full max-w-lg h-[300px] sm:h-[340px] object-cover rounded-2xl shadow-xl border-4 border-[#004fa2]/10" />
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Divider Section */}
        <section
          className="relative h-64 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url('${parallaxImage}')` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </section>

        {/* How the Program Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Illustration or Accent Image */}
              <div className="flex justify-center items-center order-2 md:order-1">
                <img src="/images/image1.png" alt="How the Program Works" className="w-full max-w-lg h-[300px] sm:h-[340px] object-cover rounded-2xl shadow-xl border-4 border-[#004fa2]/10" />
              </div>
              {/* Steps List */}
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">How the Program Works</h2>
                <ul className="space-y-6">
                  {deliveryModel.map((item, idx) => (
                    <li key={item.title} className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-[#004fa2]" />
                      </div>
                      <div>
                        <div className="font-bold text-lg text-[#004fa2]">{item.title}</div>
                        <p className="text-gray-700 leading-relaxed">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pillars.map(({ title, description, Icon }) => (
                <div key={title} className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-[#004fa2]/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[#004fa2]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Available Cohorts Section */}
      <section className="py-16 bg-[#004fa2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Available cohorts for 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['January to April', 'April to July', 'July to October'].map((cohort, idx) => (
              <motion.div
                key={cohort}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15, type: 'spring', stiffness: 80 }}
                className="bg-[#004fa2] rounded-xl border border-white/20 p-6 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
              >
                <div className="font-bold text-lg text-white mb-2">{cohort}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Parallax Divider Section */}
      <section
        className="relative h-96 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url('${parallaxImage}')` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </section>
      {/* Modern CTA Section with Brand Colors and Clean Layout */}
      <section className="bg-[#004fa2] py-20 text-center font-sans text-white">
        <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-lg md:text-xl leading-relaxed mb-8 text-[#e0e0e0]">
            Become part of a community shaping the future of technology. This is more than training—it's your launchpad to a tech career.
          </p>
          <p className="text-lg font-medium mb-10">
            <span className="text-white/80">Deadline:</span> <span className="font-bold">{course.deadline}</span>
          </p>
          <button
            onClick={handleEnroll}
            className="inline-block bg-[#ff5a00] hover:bg-[#e04e00] text-white font-bold py-4 px-12 rounded transition-colors duration-300 text-lg shadow-md"
          >
            Apply Now
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white" id="training-contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-stretch">
            <HrContactCard
              name={course.contactPerson.name}
              title={course.contactPerson.title}
              imageUrl={course.contactPerson.imageUrl || '/images/Dalene.png'}
              heightClassName="h-[380px] md:h-[420px]"
              className="rounded-2xl max-w-none w-full mx-0 md:ml-0"
            />

            <div className="bg-slate-50 rounded-2xl border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Do you have any questions?</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Please feel free to contact {course.contactPerson.name}, {course.contactPerson.title}. We’ll help you understand the program requirements, schedule, and how to apply.
              </p>

              <div className="space-y-4 mb-8">
                <a
                  href={`mailto:${course.contactPerson.email}`}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 hover:border-[#004fa2]/40 transition-colors"
                >
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-semibold text-gray-900">{course.contactPerson.email}</div>
                  </div>
                  <span className="text-[#004fa2] font-bold">→</span>
                </a>
                <a
                  href={`tel:${course.contactPerson.phone}`}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 hover:border-[#004fa2]/40 transition-colors"
                >
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-semibold text-gray-900">{course.contactPerson.phone}</div>
                  </div>
                  <span className="text-[#004fa2] font-bold">→</span>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleEnroll}
                  className="bg-[#004fa2] hover:bg-[#2A2D7C] text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Apply Now
                </button>
                <a
                  href={`mailto:${course.contactPerson.email}`}
                  className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-4 rounded-lg font-bold transition-all duration-300 inline-flex items-center justify-center"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Divider Section */}
      <section
        className="relative h-96 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url('${parallaxImage}')` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </section>

      <NewsletterHero />

      </div>
    </div>
  );
};

export default CourseDetailPage;

