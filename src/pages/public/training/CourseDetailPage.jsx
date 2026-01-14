import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Star, Award, CheckCircle, Check, Calendar, Briefcase, TrendingUp, UsersRound, Target, BookOpen } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';
import TrainingNavbar from '../../../components/TrainingNavbar';
import NewsletterCTA from '../../../components/pages/gallery/NewsletterCTA';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  // Course data - in a real app, this would come from an API
  const courses = {
    1: {
      id: 1,
      title: 'DevOps Engineering',
      category: 'technical',
      icon: 'Cloud',
      duration: '8 weeks',
      level: 'Intermediate',
      participants: '15-20',
      rating: 4.9,
      reviews: 127,
      price: 'GHS 3,500',
      originalPrice: 'GHS 4,500',
      badge: 'Popular',
      description: 'Master CI/CD pipelines, containerization, cloud deployment, and infrastructure automation with hands-on projects and real-world scenarios.',
      longDescription: 'Our comprehensive DevOps Engineering program is designed to transform you into a skilled DevOps professional. You\'ll learn industry-standard tools and practices, work on real projects, and gain the confidence to implement DevOps solutions in any organization.',
      programOverview: 'DevOps Engineering is a comprehensive 8-week program that prepares unemployed or underemployed individuals for entry-level careers in cloud computing and DevOps. ZyraTech will support learners throughout the DevOps Engineering program and help them launch careers in technology.',
      instructor: 'Michael Afedi',
      instructorTitle: 'Senior DevOps Engineer',
      instructorBio: '15+ years of experience in cloud infrastructure and DevOps transformation for Fortune 500 companies.',
      schedule: 'Weekdays 6PM-8PM',
      format: 'Online + Onsite',
      certificate: 'Professional DevOps Certificate',
      deadline: '31st January, 2026',
      targetAudience: [
        'Software Developers',
        'System Administrators',
        'IT Operations Staff',
        'Cloud Engineers',
        'Technical Leads'
      ],
      careerOutcomes: [
        'DevOps Engineer',
        'Cloud Engineer',
        'Site Reliability Engineer',
        'Infrastructure Engineer',
        'Automation Engineer'
      ],
      partnership: 'In collaboration with industry leaders, ZyraTech offers cutting-edge technology training and fosters digital skills development in Africa.',
      topics: [
        'Docker & Containerization',
        'Kubernetes Orchestration',
        'AWS/Azure Cloud Services',
        'Jenkins CI/CD Pipelines',
        'Infrastructure as Code (Terraform)',
        'Monitoring & Logging (ELK Stack)',
        'GitOps & ArgoCD',
        'Security Best Practices',
        'Performance Optimization',
        'Cost Management'
      ],
      outcomes: [
        'Deploy applications at scale using container orchestration',
        'Automate infrastructure provisioning and management',
        'Implement robust CI/CD pipelines for continuous delivery',
        'Monitor and optimize application performance',
        'Design secure and scalable cloud architectures',
        'Prepare for AWS/Azure DevOps certifications'
      ],
      modules: [
        {
          title: 'Module 1: DevOps Fundamentals',
          duration: '1 week',
          lessons: ['Introduction to DevOps', 'Culture & Practices', 'Toolchain Overview', 'Case Studies']
        },
        {
          title: 'Module 2: Containerization with Docker',
          duration: '2 weeks',
          lessons: ['Docker Basics', 'Dockerfile Writing', 'Docker Compose', 'Container Security']
        },
        {
          title: 'Module 3: Kubernetes Orchestration',
          duration: '2 weeks',
          lessons: ['K8s Architecture', 'Pods & Services', 'Deployments', 'Ingress & Networking']
        },
        {
          title: 'Module 4: CI/CD Pipelines',
          duration: '2 weeks',
          lessons: ['Jenkins Setup', 'Pipeline Creation', 'Testing Integration', 'Deployment Strategies']
        },
        {
          title: 'Module 5: Infrastructure as Code',
          duration: '1 week',
          lessons: ['Terraform Basics', 'Resource Management', 'State Management', 'Best Practices']
        }
      ],
      requirements: [
        'Basic understanding of Linux command line',
        'Familiarity with programming concepts',
        'Experience with Git version control',
        'Dedication to complete hands-on projects'
      ],
      applicationProcess: [
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
      ],
      contactPerson: {
        name: 'Magdalene',
        title: 'Human Resources Team Lead',
        email: 'hr@zyratech.com',
        phone: '+233 24 123 4567'
      }
    },
    2: {
      id: 2,
      title: 'Web Development Fundamentals',
      category: 'basic',
      icon: 'Code',
      duration: '12 weeks',
      level: 'Beginner',
      participants: '20-25',
      rating: 4.8,
      reviews: 95,
      price: 'GHS 2,500',
      originalPrice: 'GHS 3,000',
      badge: 'Bestseller',
      description: 'Learn modern web development from scratch. Build responsive websites and web applications using HTML, CSS, JavaScript, and popular frameworks.',
      longDescription: 'Our Web Development Fundamentals program is perfect for beginners who want to start a career in web development. You\'ll learn from industry experts, work on real projects, and build a portfolio that showcases your skills to potential employers.',
      programOverview: 'Web Development Fundamentals is a comprehensive 12-week program that prepares unemployed or underemployed individuals for entry-level careers in web development. ZyraTech will support learners throughout the program and help them launch careers in technology.',
      instructor: 'Sarah Johnson',
      instructorTitle: 'Senior Web Developer',
      instructorBio: '10+ years of experience in full-stack web development and digital product design.',
      schedule: 'Weekdays 5PM-7PM',
      format: 'Online + Onsite',
      certificate: 'Professional Web Development Certificate',
      deadline: '15th February, 2026',
      targetAudience: [
        'Complete Beginners',
        'Career Changers',
        'Students',
        'Entrepreneurs',
        'Designers'
      ],
      careerOutcomes: [
        'Frontend Developer',
        'Backend Developer',
        'Full Stack Developer',
        'Web Designer',
        'UI/UX Developer'
      ],
      partnership: 'In collaboration with industry leaders, ZyraTech offers cutting-edge technology training and fosters digital skills development in Africa.',
      topics: [
        'HTML5 & Semantic Markup',
        'CSS3 & Responsive Design',
        'JavaScript ES6+',
        'React.js Framework',
        'Node.js & Express',
        'MongoDB Database',
        'RESTful APIs',
        'Git & Version Control',
        'Deployment & Hosting',
        'Performance Optimization'
      ],
      outcomes: [
        'Build responsive and accessible websites',
        'Create interactive web applications',
        'Develop RESTful APIs and backend services',
        'Work with modern JavaScript frameworks',
        'Deploy applications to production',
        'Build a professional portfolio'
      ],
      modules: [
        {
          title: 'Module 1: HTML & CSS Fundamentals',
          duration: '3 weeks',
          lessons: ['HTML5 Structure', 'CSS3 Styling', 'Responsive Design', 'CSS Frameworks']
        },
        {
          title: 'Module 2: JavaScript Programming',
          duration: '3 weeks',
          lessons: ['JS Basics', 'DOM Manipulation', 'ES6+ Features', 'Async Programming']
        },
        {
          title: 'Module 3: Frontend Frameworks',
          duration: '3 weeks',
          lessons: ['React Basics', 'Components', 'State Management', 'Routing']
        },
        {
          title: 'Module 4: Backend Development',
          duration: '2 weeks',
          lessons: ['Node.js', 'Express.js', 'REST APIs', 'Authentication']
        },
        {
          title: 'Module 5: Database & Deployment',
          duration: '1 week',
          lessons: ['MongoDB', 'Deployment', 'Hosting', 'CI/CD']
        }
      ],
      requirements: [
        'Basic computer literacy',
        'No prior programming experience required',
        'Access to a computer with internet',
        'Commitment to complete the program'
      ],
      applicationProcess: [
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
      ],
      contactPerson: {
        name: 'Magdalene',
        title: 'Human Resources Team Lead',
        email: 'hr@zyratech.com',
        phone: '+233 24 123 4567'
      }
    }
    // Add other courses as needed
  };

  const course = courses[courseId] || courses[1];
  const heroImage = course?.id === 2 ? '/images/image2.png' : '/images/image1.png';
  const parallaxImage = '/images/image3.png';

  const programmeObjectives = course?.id === 2
    ? [
        {
          title: 'Build responsive, modern websites',
          description: 'Create clean layouts that look great on mobile, tablet, and desktop using modern HTML and CSS.'
        },
        {
          title: 'Write real JavaScript for the web',
          description: 'Work with the DOM, events, APIs, and modern ES6+ patterns to build interactive user experiences.'
        },
        {
          title: 'Learn React fundamentals',
          description: 'Understand components, state, props, routing, and how to structure a real-world frontend project.'
        },
        {
          title: 'Ship a portfolio-ready project',
          description: 'Build and deploy a complete project you can show employers or clients with confidence.'
        }
      ]
    : [
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
          description: 'Apply cloud best practices to improve performance, reliability, cost control, and security.'
        }
      ];

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
    navigate('/training#training-enrollment', { 
      state: { 
        course: course.title,
        courseId: course.id 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TrainingNavbar />
      <div className="flex-grow">
        {/* HERO SECTION: JOMACS Full Stack Web Development Style */}
        <section
          className="hero-section relative min-h-[800px] flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="w-full max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-center items-start text-left">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight font-sans">
                Full Stack Web Development
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl leading-relaxed">
                Master both frontend and backend development. Build real-world web applications, learn modern frameworks, and launch your tech career with hands-on projects and expert mentorship.
              </p>
              {/* Status Box */}
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8">
                <Calendar size={18} className="text-blue-400" />
                <span className="text-white/90 font-medium text-base">Next Cohort: Date to be Decided</span>
              </div>
              {/* Icon Grid */}
              <div className="grid grid-cols-2 gap-6 mb-10 w-full max-w-md">
                <div className="flex items-center gap-3">
                  <Clock size={22} className="text-white" />
                  <div>
                    <div className="text-white font-semibold text-base">6 Months</div>
                    <div className="text-white/60 text-xs">Duration</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen size={22} className="text-white" />
                  <div>
                    <div className="text-white font-semibold text-base">Live Online</div>
                    <div className="text-white/60 text-xs">Format</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award size={22} className="text-white" />
                  <div>
                    <div className="text-white font-semibold text-base">Certificate</div>
                    <div className="text-white/60 text-xs">Credential</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={22} className="text-white" />
                  <div>
                    <div className="text-white font-semibold text-base">Expert Support</div>
                    <div className="text-white/60 text-xs">Support</div>
                  </div>
                </div>
              </div>
              {/* CTA Button */}
              <div className="flex items-center">
                <button
                  onClick={handleEnroll}
                  className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg text-lg shadow-lg transition-colors duration-300"
                >
                  Enroll Now - $500
                </button>
              </div>
            </div>

            {/* Right Media Card */}
            <div className="flex-1 flex justify-center items-center w-full max-w-md mt-12 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full">
                <img
                  src={heroImage}
                  alt="Laptop with code"
                  className="w-full h-[380px] object-cover rounded-2xl"
                />
                {/* Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-black/60 py-4 px-6 text-center">
                  <p className="text-white text-sm font-medium leading-relaxed">
                    Learn modern web development technologies and best practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Overview Section */}
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
            <span className="text-white/80">Deadline:</span> <span className="font-bold">31st December, 2025</span>
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
            <div
              className="relative rounded-2xl overflow-hidden min-h-[380px] bg-center bg-cover"
              style={{ backgroundImage: `url('/images/image1.png')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-white font-bold text-xl">{course.contactPerson.name}</div>
                <div className="text-white/80">{course.contactPerson.title}</div>
              </div>
            </div>

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

      {/* Newsletter Subscription Section */}
      <NewsletterHero />

    </div>
    </div>
  );
};

export default CourseDetailPage;

