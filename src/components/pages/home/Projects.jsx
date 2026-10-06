import React, { useState, useEffect } from 'react';
import { ChevronRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import projectsService from '../../../services/projectsService';

const Projects = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await projectsService.getFeaturedProjects({ limit: 3 });
        setProjects(response.projects || []);
      } catch (err) {
        console.error('Failed to fetch featured projects:', err);
        setError(err.message || 'Failed to load featured projects');
        // Fallback to empty array to prevent errors
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-9 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Only */}
        <motion.div 
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="mb-8"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight">Featured Projects</h2>
        </motion.div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading featured projects...</p>
          </div>
        )}

        {/* Project Cards */}
        {!loading && projects.length > 0 && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {projects.map((project, index) => (
              <motion.div 
                key={project.id || index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6 }}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden max-w-sm mx-auto w-full"
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img decoding="async" 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/images/placeholder.webp";
                    }}
                  />
                  <div className="absolute inset-0 bg-white from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  {/* Project Name */}
                  <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#004fa2] transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-800 leading-relaxed mb-5 text-base font-medium line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Learn More Link */}
                  <a 
                    href={project.link || '#'}
                    target={project.link ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-base text-[#004fa2] hover:text-[#000000] transition-all duration-300 group/btn hover:gap-2"
                  >
                    Learn More
                    <ChevronRight 
                      size={14} 
                      className="group-hover/btn:translate-x-0.5 transition-transform duration-300"
                    />
                  </a>
                </div>
                
                {/* Consistent bottom accent */}
                <div className="h-1 bg-[#004fa2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600">No featured projects available at the moment.</p>
          </div>
        )}
        
        {/* See All Projects Button - At Bottom */}
        <div className="flex justify-end">
          <a 
            href="/projects"
            className="bg-[#004fa2] hover:bg-[#000000] text-white px-5 py-2 rounded-md font-semibold inline-flex items-center gap-1 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm"
          >
            See All Projects
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;


