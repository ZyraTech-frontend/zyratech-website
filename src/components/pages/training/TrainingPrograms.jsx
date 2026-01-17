import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cloud, Code, Shield, Database, Globe, Cpu, ChevronRight, Clock, Users, Star, BookOpen, Award, Target, BarChart, Smartphone, Brain } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';

const TrainingPrograms = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();
  
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  const categories = [
    { id: 'all', name: 'All Programs', icon: BookOpen },
    { id: 'basic', name: 'Basic Programs', icon: Target },
    { id: 'intermediate', name: 'Intermediate Programs', icon: Award },
    { id: 'advanced', name: 'Advanced Programs', icon: Brain }
  ];

  const programs = [
    {
      id: 1,
      title: 'DevOps Engineering',
      category: 'intermediate',
      icon: Cloud,
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
      description: 'Master CI/CD pipelines, containerization, cloud deployment, and infrastructure automation.',
      topics: ['Docker', 'Kubernetes', 'AWS/Azure', 'Jenkins', 'Terraform', 'Monitoring']
    },
    {
      id: 2,
      title: 'Cloud Computing (AWS/Azure)',
      category: 'basic',
      icon: Cloud,
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
      description: 'Comprehensive cloud training with AWS/Azure certification preparation.',
      topics: ['Cloud Foundations', 'Compute Services', 'Storage', 'Networking', 'Security', 'Certification Prep']
    },
    {
      id: 3,
      title: 'Full Stack Web Development',
      category: 'basic',
      icon: Code,
      duration: '16 weeks',
      level: 'Beginner',
      participants: '18-22',
      rating: 4.7,
      reviews: 156,
      price: 'GHS 3,800',
      instructor: 'David Mensah',
      schedule: 'Weekdays 5PM-7PM',
      format: 'Hybrid',
      description: 'Learn modern web development from frontend to backend with real projects.',
      topics: ['HTML/CSS/JS', 'React', 'Node.js', 'Databases', 'APIs', 'Deployment']
    },
    {
      id: 4,
      title: 'Corporate Digital Transformation',
      category: 'basic',
      icon: Target,
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
      description: 'Tailored training programs for corporate digital transformation initiatives.',
      topics: ['Digital Strategy', 'Process Automation', 'Team Training', 'Change Management']
    },
    {
      id: 5,
      title: 'Data Science & Analytics',
      category: 'intermediate',
      icon: BarChart,
      duration: '10 weeks',
      level: 'Intermediate',
      participants: '12-15',
      rating: 4.6,
      reviews: 73,
      price: 'GHS 4,000',
      instructor: 'Dr. Emma Wilson',
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
      id: 6,
      title: 'Cloud Architecture',
      category: 'advanced',
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
      id: 7,
      title: 'AI & Machine Learning',
      category: 'advanced',
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

  const filteredPrograms = activeCategory === 'all' 
    ? programs 
    : programs.filter(program => program.category === activeCategory);

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
              {category.name}
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
                          size={16}
                          className={i < Math.floor(program.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{program.rating}</span>
                    <span className="text-sm text-gray-500">({program.reviews || 127} reviews)</span>
                  </div>
                  
                  {/* Program Description */}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{program.description}</p>
                  
                  {/* Program Meta Info */}
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
                      onClick={() => navigate(`/training/course/${program.id}`)}
                      className="bg-[#004fa2] hover:bg-[#2A2D7C] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      View Program
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
