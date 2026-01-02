import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Code, Shield, Database, Globe, Cpu, ChevronRight, Clock, Users, Star } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';

const TrainingPrograms = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  const trainingPrograms = [
    {
      id: 1,
      title: 'DevOps Engineering',
      category: 'technical',
      icon: Cloud,
      duration: '8 weeks',
      level: 'Intermediate',
      participants: '15-20',
      rating: 4.9,
      price: 'GHS 3,500',
      originalPrice: 'GHS 4,500',
      badge: 'Popular',
      description: 'Master CI/CD pipelines, containerization, cloud deployment, and infrastructure automation.',
      topics: ['Docker & Kubernetes', 'AWS/Azure Cloud', 'Jenkins CI/CD', 'Infrastructure as Code', 'Monitoring & Logging'],
      outcomes: ['Deploy applications at scale', 'Automate infrastructure', 'Implement DevOps best practices', 'Cloud certification preparation'],
      instructor: 'Michael Afedi',
      schedule: 'Weekdays 6PM-8PM',
      format: 'Online + Onsite',
      certificate: 'Professional Certificate'
    },
    {
      id: 2,
      title: 'Full Stack Web Development',
      category: 'development',
      icon: Code,
      duration: '12 weeks',
      level: 'Beginner to Advanced',
      participants: '20-25',
      rating: 4.8,
      price: 'GHS 4,200',
      originalPrice: 'GHS 5,200',
      badge: 'Bestseller',
      description: 'Build modern web applications from frontend to backend with industry-standard technologies.',
      topics: ['React & Vue.js', 'Node.js & Express', 'MongoDB & SQL', 'RESTful APIs', 'Authentication & Security'],
      outcomes: ['Build complete web apps', 'Database design', 'API development', 'Modern JavaScript mastery'],
      instructor: 'Senior Dev Team',
      schedule: 'Weekends 9AM-1PM',
      format: 'Hybrid',
      certificate: 'Full Stack Developer Certificate'
    },
    {
      id: 3,
      title: 'Cybersecurity Fundamentals',
      category: 'security',
      icon: Shield,
      duration: '6 weeks',
      level: 'Beginner',
      participants: '15-20',
      rating: 4.7,
      price: 'GHS 2,800',
      originalPrice: 'GHS 3,500',
      description: 'Learn essential cybersecurity concepts, threat detection, and security best practices.',
      topics: ['Network Security', 'Ethical Hacking', 'Security Audits', 'Compliance & Risk', 'Incident Response'],
      outcomes: ['Security assessment', 'Threat mitigation', 'Security policy development', 'Compliance management'],
      instructor: 'Security Experts',
      schedule: 'Weekdays 5PM-7PM',
      format: 'Online',
      certificate: 'Cybersecurity Certificate'
    },
    {
      id: 4,
      title: 'Data Science & Analytics',
      category: 'data',
      icon: Database,
      duration: '10 weeks',
      level: 'Intermediate',
      participants: '12-15',
      rating: 4.9,
      price: 'GHS 4,800',
      originalPrice: 'GHS 5,800',
      badge: 'Advanced',
      description: 'Transform data into insights with machine learning, statistics, and data visualization.',
      topics: ['Python for Data Science', 'Machine Learning', 'Data Visualization', 'Statistical Analysis', 'Big Data Tools'],
      outcomes: ['Build ML models', 'Data-driven decisions', 'Advanced analytics', 'Business intelligence'],
      instructor: 'Data Science Team',
      schedule: 'Saturdays 10AM-2PM',
      format: 'Onsite',
      certificate: 'Data Science Certificate'
    },
    {
      id: 5,
      title: 'Cloud Architecture',
      category: 'technical',
      icon: Globe,
      duration: '8 weeks',
      level: 'Advanced',
      participants: '10-15',
      rating: 4.8,
      price: 'GHS 4,200',
      originalPrice: 'GHS 5,200',
      description: 'Design and implement scalable cloud solutions on AWS, Azure, and Google Cloud.',
      topics: ['Cloud Design Patterns', 'Microservices', 'Serverless Architecture', 'Cloud Migration', 'Cost Optimization'],
      outcomes: ['Cloud solution design', 'Cost management', 'Scalable architecture', 'Multi-cloud strategies'],
      instructor: 'Cloud Architects',
      schedule: 'Weekdays 6PM-8PM',
      format: 'Online',
      certificate: 'Cloud Architect Certificate'
    },
    {
      id: 6,
      title: 'AI & Machine Learning',
      category: 'data',
      icon: Cpu,
      duration: '12 weeks',
      level: 'Advanced',
      participants: '10-12',
      rating: 4.9,
      price: 'GHS 5,500',
      originalPrice: 'GHS 6,500',
      badge: 'Premium',
      description: 'Deep dive into artificial intelligence, neural networks, and cutting-edge ML techniques.',
      topics: ['Deep Learning', 'Neural Networks', 'NLP & Computer Vision', 'ML Operations', 'AI Ethics'],
      outcomes: ['Build AI models', 'ML deployment', 'AI strategy development', 'Ethical AI implementation'],
      instructor: 'AI Research Team',
      schedule: 'Saturdays 9AM-1PM',
      format: 'Hybrid',
      certificate: 'AI Engineer Certificate'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Programs', count: trainingPrograms.length },
    { id: 'technical', name: 'Technical', count: trainingPrograms.filter(p => p.category === 'technical').length },
    { id: 'development', name: 'Development', count: trainingPrograms.filter(p => p.category === 'development').length },
    { id: 'security', name: 'Security', count: trainingPrograms.filter(p => p.category === 'security').length },
    { id: 'data', name: 'Data Science', count: trainingPrograms.filter(p => p.category === 'data').length }
  ];

  const filteredPrograms = activeCategory === 'all' 
    ? trainingPrograms 
    : trainingPrograms.filter(program => program.category === activeCategory);

  return (
    <section id="training-programs" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Professional Training Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Industry-validated training programs designed to upskill your team and drive digital transformation
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-[#004fa2] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Programs Grid - Professional Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program, index) => {
            const IconComponent = program.icon;
            
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Course Header */}
                <div className="p-6 border-b border-gray-100">
                  {/* Badge */}
                  {program.badge && (
                    <div className="inline-block mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        program.badge === 'Popular' ? 'bg-orange-100 text-orange-700' :
                        program.badge === 'Bestseller' ? 'bg-green-100 text-green-700' :
                        program.badge === 'Advanced' ? 'bg-purple-100 text-purple-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {program.badge}
                      </span>
                    </div>
                  )}
                  
                  {/* Course Title and Icon */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#004fa2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{program.title}</h3>
                      <p className="text-sm text-gray-600">{program.instructor}</p>
                    </div>
                  </div>
                  
                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < Math.floor(program.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{program.rating}</span>
                    <span className="text-sm text-gray-500">({program.reviews || 127} reviews)</span>
                  </div>
                  
                  {/* Course Description */}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{program.description}</p>
                  
                  {/* Course Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{program.participants}</span>
                    </div>
                  </div>
                </div>

                {/* Course Footer */}
                <div className="p-6 bg-gray-50">
                  {/* Level and Format */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-1 bg-[#004fa2]/10 text-[#004fa2] rounded text-xs font-medium">
                      {program.level}
                    </span>
                    <span className="text-xs text-gray-500">{program.format}</span>
                  </div>
                  
                  {/* Topics Preview */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {program.topics.slice(0, 3).map((topic, topicIndex) => (
                        <span key={topicIndex} className="text-xs text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">
                          {topic}
                        </span>
                      ))}
                    </div>
                    {program.topics.length > 3 && (
                      <div className="text-xs text-gray-500 mt-1">+{program.topics.length - 3} more topics</div>
                    )}
                  </div>
                  
                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      {program.originalPrice && (
                        <div className="text-xs text-gray-400 line-through">{program.originalPrice}</div>
                      )}
                      <div className="text-lg font-bold text-[#004fa2]">{program.price}</div>
                    </div>
                    <button 
                      onClick={() => window.location.href = `/training/course/${program.id}`}
                      className="bg-[#004fa2] hover:bg-[#2A2D7C] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      View Course
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrainingPrograms;
