import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Award, 
  ChevronRight, 
  Lightbulb, 
  CheckCircle,
  Wrench 
} from 'lucide-react';
import EducationNavbar from '../../../components/EducationNavbar';
import Breadcrumb from '../../../components/pages/education/Breadcrumb';


const courseData = {
  'tech-internship': {
    title: 'Tech Internship Program',
    tagline: 'Learn. Build. Grow.',
    description: 'We turn students into innovators through practical, hands-on digital training. Our Education & Internship Program bridges the gap between the classroom and the workplace by providing students with real-world training in coding, robotics, AI, and IT systems.',
    image: '/images/education/internship-hero.jpg',
    duration: '3-6 months',
    price: 350,
    priceType: 'GHS',
    benefits: [
      'Hands-on practical training',
      'Professional mentorship',
      'Industry certification',
      'Real work experience',
      'Career guidance',
      'Portfolio development'
    ],
    whatYouLearn: [
      'Web Development (HTML, CSS, React, Tailwind CSS)',
      'Basic AI & Robotics',
      'Networking and IT Setup',
      'Cloud Fundamentals',
      'Entrepreneurship and Tech Innovation'
    ],
    realWorldProjects: [
      {
        title: 'Educational Web App',
        description: 'Build your first educational web application during internship',
        technologies: ['HTML', 'CSS', 'React', 'Tailwind CSS']
      },
      {
        title: 'School Network Setup',
        description: 'Help install a school\'s first IT network infrastructure',
        technologies: ['Networking', 'Hardware Setup', 'Configuration']
      },
      {
        title: 'SME Digital Solution',
        description: 'Design solutions for local small and medium enterprises',
        technologies: ['Web Development', 'Database Design', 'UI/UX']
      }
    ],
    technologies: [
      {
        title: 'Web Development',
        description: 'Master modern web technologies and build responsive applications',
        icon: Wrench
      },
      {
        title: 'AI & Robotics',
        description: 'Learn fundamentals of artificial intelligence and robotics',
        icon: Wrench
      },
      {
        title: 'IT & Networking',
        description: 'Set up and maintain computer networks and IT infrastructure',
        icon: Wrench
      },
      {
        title: 'Cloud Computing',
        description: 'Understand cloud services and deployment fundamentals',
        icon: Wrench
      }
    ],
    targetAudience: [
      'JHS and SHS students',
      'University and Polytechnic students', 
      'Graduates and tech enthusiasts'
    ]
  },
  'mobile-app': {
    title: 'Mobile App Development',
    tagline: 'Create apps for iOS and Android',
    description: 'Learn cross-platform mobile development using React Native and build real mobile applications.',
    image: '/images/education/mobile-app-hero.jpg',
    duration: '8 weeks',
    price: 1200,
    priceType: 'course',
    benefits: [
      'Cross-platform development',
      'React Native framework',
      'Mobile UI/UX design',
      'App deployment to stores',
      'Performance optimization',
      'Mobile development certificate'
    ],
    whatYouLearn: [
      'React Native Basics',
      'Mobile UI Components',
      'Navigation & Routing',
      'State Management',
      'API Integration',
      'Push Notifications',
      'App Store Deployment',
      'Performance Tuning'
    ],
    realWorldProjects: [
      {
        title: 'Weather App',
        description: 'Cross-platform weather application with real-time data',
        technologies: ['React Native', 'Weather API', 'Navigation', 'State Management']
      },
      {
        title: 'Task Tracker',
        description: 'Mobile productivity app with offline capabilities',
        technologies: ['React Native', 'Local Storage', 'Notifications', 'UI Components']
      }
    ],
    technologies: [
      {
        title: 'React Native',
        description: 'Build native mobile apps using React',
        icon: Wrench
      },
      {
        title: 'Mobile UI/UX',
        description: 'Design intuitive mobile user interfaces',
        icon: Wrench
      }
    ],
    projects: [
      {
        title: 'Fitness Tracker',
        description: 'Build a mobile app for tracking workouts and health metrics'
      },
      {
        title: 'Social Media App',
        description: 'Create a simple social networking application'
      }
    ]
  }
};

const ProgramDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const projectsSectionRef = useRef(null);
  
  const programIdParam = searchParams.get('program');
  const programId = (programIdParam && courseData[programIdParam]) ? programIdParam : 'tech-internship';
  const currentData = courseData[programId];

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

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
                onClick={() => navigate(`/services/education/in-person-enrollment?program=${programId}`)}
                className="bg-white hover:bg-gray-100 text-[#004fa2] px-6 sm:px-8 py-3 rounded font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg"
              >
                <span className="whitespace-nowrap">Enroll Now</span>
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
            What You Get
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

      {/* What You'll Learn */}
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

      {/* Real-World Projects */}
      {currentData.realWorldProjects && (
        <section 
          ref={projectsSectionRef}
          className="relative py-20 bg-gray-100 min-h-screen flex items-center bg-cover bg-center bg-scroll md:bg-fixed"
          style={{
            backgroundImage: `url(${currentData.image})`
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

      {/* Technologies You'll Master */}
      {currentData.technologies && (
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

      {/* Projects You Can Do */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12">
            Course Projects
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
              onClick={() => navigate(`/services/education/in-person-enrollment?program=${programId}`)}
              className="bg-white hover:bg-gray-100 text-[#004fa2] px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 text-base sm:text-lg shadow-lg"
            >
              <span>Enroll Now</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetailsPage;
