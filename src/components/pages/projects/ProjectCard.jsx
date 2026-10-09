/**
 * ProjectCard Component
 * Minimal project showcase card - displays only project name + short description
 * Full details shown on detail page when user clicks "View More"
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
      className="h-full"
    >
      <Link to={`/projects/${project.id}`}>
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100 hover:border-[#004fa2] h-full">
          
          {/* Image Container - Compact */}
          <div className="relative w-full h-40 overflow-hidden bg-gray-200">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          {/* Content Container - Optimized spacing */}
          <div className="p-4 flex flex-col flex-1">
            {/* Title */}
            <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#004fa2] transition-colors line-clamp-2">
              {project.title}
            </h3>

            {/* Short Description - Better line-clamp */}
            <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-1">
              {project.description}
            </p>

            {/* View More Button - Compact */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 group/btn cursor-pointer">
              <span className="text-xs font-semibold text-[#004fa2] group-hover/btn:text-[#003d7a] transition-colors">
                View More
              </span>
              <ArrowRight
                size={16}
                className="text-[#004fa2] group-hover/btn:translate-x-0.5 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
