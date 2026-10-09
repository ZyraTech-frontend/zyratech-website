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
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col group border border-gray-100 hover:border-[#004fa2]">
          
          {/* Image Container */}
          <div className="relative w-full h-48 overflow-hidden bg-gray-200">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Content Container - Minimal */}
          <div className="p-6 flex flex-col flex-1">
            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#004fa2] transition-colors line-clamp-2">
              {project.title}
            </h3>

            {/* Short Description Only */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
              {project.description}
            </p>

            {/* View More Button */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 group/btn cursor-pointer">
              <span className="text-sm font-semibold text-[#004fa2] group-hover/btn:text-[#003d7a] transition-colors">
                View More
              </span>
              <ArrowRight
                size={18}
                className="text-[#004fa2] group-hover/btn:translate-x-1 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
