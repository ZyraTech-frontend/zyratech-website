/**
 * ProjectCard Component
 * Professional project showcase card with company branding
 * Used in portfolio grid displays
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, index }) => {
  // Category color mapping
  const categoryColors = {
    'Transportation': 'bg-blue-100 text-blue-700 border-blue-200',
    'Software': 'bg-purple-100 text-purple-700 border-purple-200',
    'Environment': 'bg-green-100 text-green-700 border-green-200',
    'Agriculture': 'bg-amber-100 text-amber-700 border-amber-200',
    'Business Solutions': 'bg-cyan-100 text-cyan-700 border-cyan-200',
    'Education': 'bg-pink-100 text-pink-700 border-pink-200',
    'Healthcare': 'bg-red-100 text-red-700 border-red-200',
    'FinTech': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  };

  const statusColors = {
    'Active': 'text-green-600',
    'In Progress': 'text-amber-600',
    'Completed': 'text-blue-600',
  };

  const categoryColor = categoryColors[project.category] || 'bg-gray-100 text-gray-700 border-gray-200';
  const statusColor = statusColors[project.status] || 'text-gray-600';

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
          <div className="relative w-full h-56 overflow-hidden bg-gray-200">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Overlay with category and featured badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-white" />
                <span className="text-white font-semibold text-sm">View Case Study</span>
              </div>
            </div>

            {/* Top left badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${categoryColor}`}>
                {project.category}
              </span>
              {project.featured && (
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
                  <Star size={12} fill="white" /> Featured
                </span>
              )}
            </div>

            {/* Status badge - bottom right */}
            <div className="absolute bottom-4 right-4">
              <span className={`text-xs font-bold uppercase tracking-wide flex items-center gap-1 ${statusColor}`}>
                <span className={`w-2 h-2 rounded-full ${statusColor.replace('text-', 'bg-')}`}></span>
                {project.status}
              </span>
            </div>
          </div>

          {/* Content Container */}
          <div className="p-6 flex flex-col flex-1">
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#004fa2] transition-colors line-clamp-2">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
              {project.description}
            </p>

            {/* Technology Stack */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies?.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#004fa2]/10 text-[#004fa2] px-2.5 py-1 rounded-lg font-medium border border-[#004fa2]/20"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies?.length > 3 && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg font-medium">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-t border-gray-100 pt-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Team Size</p>
                <div className="flex items-center gap-1 text-gray-900 font-bold">
                  <Users size={16} className="text-[#004fa2]" />
                  {project.team} members
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Progress</p>
                <div className="flex items-center gap-1 text-gray-900 font-bold">
                  <TrendingUp size={16} className="text-[#004fa2]" />
                  {project.progress}%
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 group/btn cursor-pointer">
              <span className="text-sm font-semibold text-[#004fa2] group-hover/btn:text-[#003d7a] transition-colors">
                Explore Project
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
