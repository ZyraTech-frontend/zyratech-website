import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Star, Award, Play, CheckCircle, Calendar, MapPin, Shield, BookOpen, Target } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';
import TrainingNavbar from '../../../components/TrainingNavbar';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

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
      instructor: 'Michael Afedi',
      instructorTitle: 'Senior DevOps Engineer',
      instructorBio: '15+ years of experience in cloud infrastructure and DevOps transformation for Fortune 500 companies.',
      schedule: 'Weekdays 6PM-8PM',
      format: 'Online + Onsite',
      certificate: 'Professional DevOps Certificate',
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
      targetAudience: [
        'Software Developers',
        'System Administrators',
        'IT Operations Staff',
        'Cloud Engineers',
        'Technical Leads'
      ]
    }
    // Add other courses as needed
  };

  const course = courses[courseId] || courses[1];

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
        {/* Course Header */}
        <section className="bg-gradient-to-br from-[#004fa2] to-[#2A2D7C] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={titleAnimation.ref}
            initial={titleAnimation.initial}
            animate={titleAnimation.animate}
            variants={titleAnimation.variants}
            transition={titleAnimation.transition}
          >
            {/* Back Button */}
            <button
              onClick={() => navigate('/training')}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Courses
            </button>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  {course.badge && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
                      {course.badge}
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-white/80">({course.reviews} reviews)</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6">{course.title}</h1>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">{course.description}</p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#FFD700]" />
                    <div>
                      <div className="font-semibold">{course.duration}</div>
                      <div className="text-sm text-white/80">Duration</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#FFD700]" />
                    <div>
                      <div className="font-semibold">{course.participants}</div>
                      <div className="text-sm text-white/80">Class Size</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-[#FFD700]" />
                    <div>
                      <div className="font-semibold">{course.level}</div>
                      <div className="text-sm text-white/80">Level</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-[#FFD700]" />
                    <div>
                      <div className="font-semibold">Certificate</div>
                      <div className="text-sm text-white/80">Included</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrollment Card */}
              <div className="lg:col-span-1">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="text-center mb-6">
                    {course.originalPrice && (
                      <div className="text-lg text-white/80 line-through mb-2">{course.originalPrice}</div>
                    )}
                    <div className="text-4xl font-bold text-[#FFD700] mb-2">{course.price}</div>
                    <div className="text-white/80">One-time payment</div>
                  </div>

                  <button
                    onClick={handleEnroll}
                    className="w-full bg-[#FFD700] text-[#004fa2] hover:bg-yellow-400 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 mb-4"
                  >
                    Enroll Now
                  </button>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      <span>Expert instructor guidance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      <span>Hands-on projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-400" />
                      <span>Lifetime access to materials</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Content Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-12 border-b border-gray-200">
            {['overview', 'curriculum', 'instructor', 'requirements'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium transition-all duration-300 border-b-2 ${
                  activeTab === tab
                    ? 'text-[#004fa2] border-[#004fa2]'
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-4">About This Course</h3>
                    <p className="text-gray-600 leading-relaxed">{course.longDescription}</p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-black mb-4">What You'll Learn</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.outcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-gray-600">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-black mb-4">Course Topics</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.topics.map((topic, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-[#004fa2] rounded-full"></div>
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'curriculum' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-black mb-6">Course Curriculum</h3>
                  {course.modules.map((module, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-black">{module.title}</h4>
                        <span className="text-sm text-gray-500">{module.duration}</span>
                      </div>
                      <div className="space-y-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="flex items-center gap-3 text-gray-600">
                            <Play size={16} className="text-[#004fa2]" />
                            <span>{lesson}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'instructor' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-white rounded-xl p-8 border border-gray-200">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-20 h-20 bg-[#004fa2]/10 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-[#004fa2]">{course.instructor.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-black">{course.instructor}</h3>
                        <p className="text-gray-600">{course.instructorTitle}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{course.instructorBio}</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'requirements' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-4">Prerequisites</h3>
                    <div className="space-y-3">
                      {course.requirements.map((req, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Shield size={20} className="text-[#004fa2] flex-shrink-0 mt-1" />
                          <span className="text-gray-600">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-black mb-4">Target Audience</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.targetAudience.map((audience, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-600">
                          <Users size={16} className="text-[#004fa2]" />
                          {audience}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-bold text-black mb-4">Course Details</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-black">Schedule</div>
                      <div className="text-sm text-gray-600">{course.schedule}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-black">Format</div>
                      <div className="text-sm text-gray-600">{course.format}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-black">Certificate</div>
                      <div className="text-sm text-gray-600">{course.certificate}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#004fa2] text-white rounded-xl p-6">
                <h4 className="font-bold mb-4">Need Help?</h4>
                <p className="text-white/90 mb-4 text-sm">
                  Have questions about this course? Our training coordinators are here to help.
                </p>
                <a 
                  href="#training-contact"
                  className="inline-flex items-center gap-2 bg-white text-[#004fa2] px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      
      {/* Simple Training Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/zyratecpng.png" 
                alt="Zyra Tech Hub" 
                className="h-8 w-auto object-contain"
              />
              <span className="ml-3 text-xl font-bold">Training</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional Training Programs for Modern Tech Skills
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="/training#contact" className="hover:text-white transition-colors">Contact</a>
              <a href="/training#enrollment" className="hover:text-white transition-colors">Enrollment</a>
              <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Main Site</a>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
              © 2024 Zyra Tech Hub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CourseDetailPage;
