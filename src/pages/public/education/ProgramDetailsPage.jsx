import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ChevronRight, Calendar, Zap, Users, Wrench, Lightbulb, Award, ChevronDown, Check, Code2, Cpu, Database, Globe, Terminal, Rocket, Palette, Lock, Server, Wifi } from 'lucide-react';
import EducationNavbar from '../../../components/EducationNavbar';
import Breadcrumb from '../../../components/pages/education/Breadcrumb';

// Image imports removed - images have been deleted
// Use placeholder gradient backgrounds instead

// Add smooth scrolling to the entire page
if (typeof document !== 'undefined') {
  document.documentElement.style.scrollBehavior = 'smooth';
}

const membershipData = {
  title: 'Zyra Tech Hub Membership Dues',
  tagline: 'Access Innovation. Build Skills. Shape the Future.',
  price: 15,
  priceType: 'month',
  image: '/images/image1.png',
  description: 'Becoming a member of Zyra Tech Hub gives students, innovators, hobbyists, and young creators access to practical, inclusive, and affordable STEM learning. Your dues help us keep our tools running, support new projects, and make innovation accessible to everyone.',
  
  benefits: [
    'Continuous access to workshop tools and digital resources',
    'Priority use of Open Lab equipment for projects and assignments',
    'Support for your ongoing prototypes (simulation, CAD, hardware, software)',
    'Reduced fees for special trainings and competitions',
    'Maintenance of shared machines and tools, ensuring reliability and safety',
    'Mentorship & Expert Support'
  ],

  whyDuesMatter: [
    {
      title: 'For New Members',
      description: 'Your dues help us onboard you smoothly, maintain the learning environment, and keep our resources affordable and accessible.'
    },
    {
      title: 'For Renewing Members',
      description: 'Renewing your monthly dues helps sustain the ecosystem that benefits you, including continuous access to workshop tools and digital resources, priority use of Open Lab equipment for projects and assignments, support for your ongoing prototypes (simulation, CAD, hardware, software), reduced fees for special trainings and competitions, and maintenance of shared machines and tools, ensuring reliability and safety. Your contribution allows us to keep improving the hub while ensuring every member benefits from high-quality, well-maintained resources.'
    }
  ],

  whatSupported: [
    'Maintain tools, printers, electronics kits, and computers',
    'Buy consumables like solder, components, and workshop materials',
    'Clean and secure the labs',
    'Provide expert instructors and mentors',
    'Expand access to under-resourced learners',
    'Sustain community-led innovation projects'
  ],

  membershipBenefits: [
    'Open Lab Access',
    'Tools & Equipment Usage',
    'Community Projects & Hackathons',
    'Mentorship & Expert Support',
    'Innovation Challenges',
    'Certificate Pathways',
    'Affordable STEM Learning'
  ],

  projects: [
    {
      title: 'Custom Electronics Builds',
      description: 'Design and assemble functional hardware such as power banks, sensors, alarms, smart home systems, and more.'
    },
    {
      title: '3D-Printed & Fabricated Devices',
      description: 'Use 3D printers, laser cutters, and fabrication tools to create enclosures, mechanical parts, and small machines.'
    },
    {
      title: 'E-Waste Transformation Projects',
      description: 'Convert discarded electronics into new working devices, reducing waste while strengthening engineering skills.'
    },
    {
      title: 'Capstone Hardware Project',
      description: 'Build a full working prototype combining electronics, fabrication, and repair skills — fully documented for your portfolio.'
    }
  ],

  testimonials: [
    {
      name: 'Member',
      role: 'Zyra Tech Hub Member',
      text: 'The membership dues are worth every pesewa. Access to tools, mentorship, and a community of innovators has transformed my projects.',
      rating: 5
    }
  ],

  faqs: [
    {
      question: 'Can I cancel my membership anytime?',
      answer: 'Yes, you can cancel your membership at any time with no penalties or hidden fees. Simply notify us before your next billing cycle.'
    },
    {
      question: 'What if I need to pause my membership?',
      answer: 'You can pause your membership for up to 3 months. Contact us to arrange a pause period, and you can resume whenever you\'re ready.'
    },
    {
      question: 'Is there a long-term commitment?',
      answer: 'No, there is no long-term commitment. Your membership is month-to-month, giving you complete flexibility.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards, mobile money, and bank transfers. Choose the method that works best for you during checkout.'
    }
  ],

  comparisonFeatures: [
    { name: 'Lab Access', basic: 'School hours', standard: 'Extended hours', premium: '24/7' },
    { name: 'Tools & Equipment', basic: 'Limited', standard: 'Full Access', premium: 'Priority Access' },
    { name: 'Mentorship', basic: 'Community', standard: 'Expert Support', premium: 'Dedicated' },
    { name: 'Projects', basic: 'Basic', standard: 'Advanced', premium: 'Custom' },
    { name: 'Certifications', basic: 'Basic', standard: 'Professional', premium: 'Advanced' }
  ]
};

const courseData = {
  'web-development': {
    title: 'Web Development',
    tagline: 'Learn HTML, CSS, React & Tailwind CSS',
    price: 350,
    priceType: 'one-time',
    duration: '3-6 months',
    image: '/images/image1.png',
    description: 'Learn HTML, CSS, React, and Tailwind CSS to build responsive websites and web applications. This comprehensive internship covers web development fundamentals, modern frameworks, and real-world project development.',
    benefits: [
      'Learn HTML5, CSS3, and modern JavaScript',
      'Master React and component-based architecture',
      'Build responsive designs with Tailwind CSS',
      'Work on real-world web projects',
      'Professional mentorship and guidance',
      'Industry-recognized certification'
    ],
    whatYouLearn: [
      'HTML5 & Semantic Markup',
      'CSS3 & Responsive Design',
      'JavaScript Fundamentals',
      'React Framework & Components',
      'Tailwind CSS Styling',
      'Web Development Best Practices'
    ],
    technologies: [
      { icon: Code2, title: 'Frontend Development', description: 'Master HTML5, CSS3, JavaScript, and React framework' },
      { icon: Palette, title: 'UI/UX Design', description: 'Learn responsive design and Tailwind CSS styling' },
      { icon: Wrench, title: 'Development Tools', description: 'Use Git, VS Code, and modern development workflows' },
      { icon: Globe, title: 'Web APIs', description: 'Integrate APIs and work with external services' },
      { icon: Zap, title: 'Performance', description: 'Optimize web applications for speed and efficiency' },
      { icon: Rocket, title: 'Deployment', description: 'Deploy applications to production environments' }
    ],
    realWorldProjects: [
      {
        title: 'Responsive Website',
        description: 'Build a fully responsive website using HTML, CSS, and JavaScript.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design']
      },
      {
        title: 'React Web Application',
        description: 'Create a dynamic web app using React with component-based architecture.',
        technologies: ['React', 'JavaScript', 'API Integration', 'State Management']
      },
      {
        title: 'E-Commerce Frontend',
        description: 'Build a professional e-commerce interface with product catalog and cart functionality.',
        technologies: ['React', 'Tailwind CSS', 'JavaScript', 'API Integration']
      }
    ],
    projects: [
      { title: 'Personal Portfolio Website', description: 'Build your own portfolio website to showcase your work' },
      { title: 'React Component Library', description: 'Create reusable components for web applications' },
      { title: 'Responsive Landing Page', description: 'Design and develop a modern, responsive landing page' },
      { title: 'Capstone Project', description: 'Build a complete web application from concept to deployment' }
    ]
  },
  'ai-robotics': {
    title: 'AI & Robotics',
    tagline: 'Master Artificial Intelligence & Robotics',
    price: 350,
    priceType: 'one-time',
    duration: '3-6 months',
    image: '/images/image2.png',
    description: 'Master artificial intelligence and robotics fundamentals through hands-on projects and real-world applications. Learn to build intelligent systems and robotic solutions.',
    benefits: [
      'Learn AI and machine learning fundamentals',
      'Master robotics programming and control',
      'Work with real robotic hardware',
      'Develop intelligent automation solutions',
      'Expert mentorship in AI/Robotics',
      'Professional certification upon completion'
    ],
    whatYouLearn: [
      'AI & Machine Learning Basics',
      'Python Programming for AI',
      'Robotics Fundamentals',
      'Sensor Integration & Control',
      'Computer Vision Basics',
      'Real-World AI Applications'
    ],
    technologies: [
      { icon: Cpu, title: 'Machine Learning', description: 'Learn ML algorithms, neural networks, and TensorFlow' },
      { icon: Code2, title: 'Python Programming', description: 'Master Python for AI and data science applications' },
      { icon: Zap, title: 'Robotics Control', description: 'Program robots and control systems with Arduino/ROS' },
      { icon: Lightbulb, title: 'Computer Vision', description: 'Implement image recognition and visual processing' },
      { icon: Wrench, title: 'Hardware Integration', description: 'Work with sensors, motors, and embedded systems' },
      { icon: Rocket, title: 'Project Deployment', description: 'Deploy AI models and robotic solutions' }
    ],
    realWorldProjects: [
      {
        title: 'Autonomous Robot',
        description: 'Build a robot that can navigate and make decisions using AI algorithms.',
        technologies: ['Arduino', 'Python', 'Sensors', 'Machine Learning']
      },
      {
        title: 'Image Recognition System',
        description: 'Create an AI system that recognizes objects and patterns in images.',
        technologies: ['Python', 'TensorFlow', 'OpenCV', 'Neural Networks']
      },
      {
        title: 'Smart Automation System',
        description: 'Develop an intelligent system that automates tasks based on AI predictions.',
        technologies: ['Python', 'Machine Learning', 'IoT', 'Robotics']
      }
    ],
    projects: [
      { title: 'AI Chatbot', description: 'Build an intelligent chatbot using natural language processing' },
      { title: 'Robotic Arm Control', description: 'Program and control a robotic arm with precision' },
      { title: 'Computer Vision Project', description: 'Create an image recognition system for real-world use' },
      { title: 'Capstone Project', description: 'Develop a complete AI/Robotics solution' }
    ]
  },
  'networking-it': {
    title: 'Networking & IT Setup',
    tagline: 'Master LAN/WAN, WiFi & Cloud Infrastructure',
    price: 350,
    priceType: 'one-time',
    duration: '3-6 months',
    image: '/images/image3.png',
    description: 'Learn LAN/WAN installation, WiFi setup, server deployment, and cloud fundamentals for IT infrastructure. Build professional IT solutions for schools and businesses.',
    benefits: [
      'Learn network design and implementation',
      'Master WiFi and LAN/WAN setup',
      'Understand server and cloud deployment',
      'Hands-on experience with professional tools',
      'Industry-standard certifications',
      'Real-world IT infrastructure projects'
    ],
    whatYouLearn: [
      'Network Fundamentals & Protocols',
      'LAN/WAN Installation & Configuration',
      'WiFi Setup & Security',
      'Server Deployment & Management',
      'Cloud Infrastructure Basics',
      'Network Security & Troubleshooting'
    ],
    technologies: [
      { icon: Globe, title: 'Network Design', description: 'Design and implement LAN/WAN networks' },
      { icon: Wifi, title: 'WiFi Infrastructure', description: 'Setup, configure, and secure WiFi networks' },
      { icon: Server, title: 'Server Management', description: 'Deploy and manage servers and cloud infrastructure' },
      { icon: Lock, title: 'Network Security', description: 'Implement security protocols and firewall management' },
      { icon: Wrench, title: 'System Administration', description: 'Manage IT systems and infrastructure' },
      { icon: Rocket, title: 'Cloud Solutions', description: 'Deploy applications on cloud platforms' }
    ],
    realWorldProjects: [
      {
        title: 'School Network Setup',
        description: 'Design and implement a complete network infrastructure for a school.',
        technologies: ['LAN/WAN', 'WiFi', 'Servers', 'Network Security']
      },
      {
        title: 'Business IT Infrastructure',
        description: 'Build a professional IT infrastructure for a business with multiple locations.',
        technologies: ['Network Design', 'Cloud Services', 'Security', 'Monitoring']
      },
      {
        title: 'Cloud Migration Project',
        description: 'Migrate on-premise systems to cloud infrastructure.',
        technologies: ['Cloud Platforms', 'Server Setup', 'Data Migration', 'Security']
      }
    ],
    projects: [
      { title: 'WiFi Network Setup', description: 'Install and configure a secure WiFi network' },
      { title: 'Server Deployment', description: 'Deploy and configure a web server' },
      { title: 'Network Monitoring', description: 'Setup monitoring and management tools' },
      { title: 'Capstone Project', description: 'Design a complete IT infrastructure solution' }
    ]
  }
};

const ProgramDetailsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [openFaq, setOpenFaq] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const projectsSectionRef = useRef(null);
  
  const programId = searchParams.get('program') || 'web-development';
  const isMembership = programId === 'junior-stem';
  const currentData = isMembership ? membershipData : courseData[programId];

  // Enhanced parallax scroll effect with requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!currentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Program Not Found</h1>
          <button
            onClick={() => navigate('/services/education')}
            className="bg-[#004fa2] hover:bg-[#000000] text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Programs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EducationNavbar />
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-14 md:py-16 lg:py-20 bg-[#004fa2] text-white overflow-hidden">
        {/* Background Image - Right Side */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-3/5 lg:w-1/2 opacity-100">
          <img 
            src={currentData.image} 
            alt={currentData.title}
            className="w-full h-full object-cover"
          />
          {/* Ultra light overlay for mobile visibility, minimal gradient for desktop */}
          <div className="absolute inset-0 bg-black/10 sm:bg-white sm:from-transparent sm:via-white/5 sm:to-white/10"></div>
        </div>

        {/* Ultra minimal dark overlay on mobile for better text visibility */}
        <div className="absolute inset-0 bg-white from-black/10 via-black/5 to-black/10 sm:bg-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-full sm:max-w-[55%] md:max-w-lg lg:max-w-xl sm:pr-6 md:pr-12 bg-[#004fa2]/90 sm:bg-transparent md:bg-transparent backdrop-blur-md sm:backdrop-blur-none md:backdrop-blur-none p-5 pb-6 sm:p-0 md:p-0 rounded-xl sm:rounded-none md:rounded-none">
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight drop-shadow-lg">
              {currentData.title}
            </h1>
            <p className="text-lg sm:text-lg md:text-xl font-semibold text-white mb-3 drop-shadow-md">
              {currentData.tagline}
            </p>
            <p className="text-sm sm:text-sm md:text-base text-white mb-4 sm:mb-4 md:mb-6 leading-relaxed drop-shadow-md">
              {currentData.description}
            </p>
            
            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="flex-shrink-0" />
                <span className="text-xs sm:text-sm whitespace-nowrap">{currentData.duration}</span>
              </div>
              {isMembership && (
                <>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="flex-shrink-0" />
                    <span className="text-xs sm:text-sm whitespace-nowrap">500+ Active Members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={16} className="flex-shrink-0" />
                    <span className="text-xs sm:text-sm whitespace-nowrap">Expert Support</span>
                  </div>
                </>
              )}
            </div>

            {/* CTA Row with Badge and Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              {/* Price Badge */}
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 sm:px-4 py-2 sm:py-2.5 rounded shadow-lg">
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  <strong>GHS {currentData.price}</strong> / {currentData.priceType}
                </span>
              </span>
              
              <button
                onClick={() => navigate(isMembership ? '/services/education/online-enrollment' : `/services/education/in-person-enrollment?program=${programId}`)}
                className="bg-white text-[#004fa2] hover:bg-gray-100 px-6 sm:px-8 py-3 rounded font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg"
              >
                <span className="whitespace-nowrap">{isMembership ? 'Join Now' : 'Enroll Now'}</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            {isMembership ? 'Membership Benefits' : 'What You Get'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {currentData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#004fa2] transition-all">
                <CheckCircle size={18} className="text-[#004fa2] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-xs sm:text-sm">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Membership Dues Matter - Only for Membership */}
      {isMembership && (
        <section className="py-8 sm:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12">Why Membership Dues Matter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {membershipData.whyDuesMatter.map((item, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 hover:shadow-lg transition-all">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What Your GHS 15 Supports - Only for Membership */}
      {isMembership && (
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">What Your GHS {membershipData.price} Supports</h2>
            <p className="text-gray-700 text-sm sm:text-base mb-6 sm:mb-8 max-w-3xl">
              Your dues directly power the Zyra Tech Hub mission by helping us:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {membershipData.whatSupported.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 sm:p-5 bg-white rounded-lg border border-[#004fa2]/20">
                  <Wrench size={18} className="text-[#004fa2] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm sm:text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What You'll Learn - Only for Courses */}
      {!isMembership && (
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">What You'll Learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {currentData.whatYouLearn.map((skill, index) => (
                <div key={index} className="bg-white from-gray-50 to-gray-100 rounded-lg p-5 sm:p-6 border border-gray-200 hover:border-[#004fa2] hover:shadow-md transition-all text-center">
                  <Lightbulb size={24} className="text-[#004fa2] mx-auto mb-3" />
                  <p className="text-gray-900 font-semibold text-sm sm:text-base">{skill}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Real-World Projects - Only for Courses */}
      {!isMembership && currentData.realWorldProjects && (
        <section 
          ref={projectsSectionRef}
          className="relative py-20 bg-gray-100"
          style={{
            backgroundImage: `url(${currentData.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Content */}
          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Real-World Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {currentData.realWorldProjects.map((project, index) => (
                  <div 
                    key={index} 
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 
                              shadow-2xl hover:border-[#004fa2] hover:shadow-lg hover:shadow-[#004fa2]/20 
                              transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/20
                              cursor-pointer"
                  >
                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-white/90 text-base mb-5 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies && project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="inline-block px-3 py-1 bg-[#004fa2]/30 border border-[#004fa2]/60 text-[#92c5fd] text-xs font-semibold rounded-full hover:bg-[#004fa2]/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technologies You'll Master - Only for Courses */}
      {!isMembership && currentData.technologies && (
        <section className="py-16 sm:py-20 bg-[#F8F9FF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-[#2A2D7C] mb-12">
              Technologies You'll Master
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentData.technologies.map((tech, index) => {
                const IconComponent = tech.icon;
                return (
                  <div 
                    key={index}
                    className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-[#2A2D7C]/20 overflow-hidden relative"
                  >
                    {/* Gradient background on hover */}
                    <div className="absolute inset-0 bg-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="flex-shrink-0 bg-white p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-8 h-8 text-[#2A2D7C]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#2A2D7C] group-hover:text-[#1a1d4d] transition-colors duration-300 pt-1">
                          {tech.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Membership Benefits at a Glance - Only for Membership */}
      {isMembership && (
        <section className="py-8 sm:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12">Membership Benefits at a Glance</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {membershipData.membershipBenefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-lg p-5 sm:p-6 border border-gray-200 hover:border-[#004fa2] hover:shadow-md transition-all text-center">
                  <Lightbulb size={24} className="text-[#004fa2] mx-auto mb-3" />
                  <p className="text-gray-900 font-semibold text-sm sm:text-base">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Compare Features - Only for Membership */}
      {isMembership && (
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12">Compare Membership Tiers</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-bold text-black">Feature</th>
                    <th className="text-center py-4 px-4 font-bold text-black">Basic</th>
                    <th className="text-center py-4 px-4 font-bold text-black">Standard</th>
                    <th className="text-center py-4 px-4 font-bold text-black">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {membershipData.comparisonFeatures.map((feature, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{feature.name}</td>
                      <td className="py-4 px-4 text-center text-gray-600">{feature.basic}</td>
                      <td className="py-4 px-4 text-center text-gray-600">{feature.standard}</td>
                      <td className="py-4 px-4 text-center text-gray-600">{feature.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Projects You Can Do */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12">
            {isMembership ? 'Projects You Can Do as a Member' : 'Course Projects'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {currentData.projects.map((project, index) => (
              <div key={index} className="bg-white from-gray-50 to-gray-100 rounded-lg border border-gray-200 p-6 sm:p-8 hover:shadow-lg transition-all">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[#004fa2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">Ready to Join Zyra Tech Hub?</h2>
            <p className="text-white/90 text-sm sm:text-base mb-8 max-w-2xl mx-auto">
              Start your innovation journey today with unlimited access to tools, mentorship, and a community of creators.
            </p>
            <button
              onClick={() => navigate('/services/education/online-enrollment')}
              className="bg-white hover:bg-gray-100 text-[#004fa2] px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 text-base sm:text-lg shadow-lg"
            >
              <span>Join Now - GHS {membershipData.price}/Month</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetailsPage;



