import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, GraduationCap } from 'lucide-react';

/**
 * TrainingBreadcrumb - Breadcrumb navigation for training pages
 * 
 * @param {Array} items - Array of { label, link? } objects
 * @param {string} variant - 'light' (for dark backgrounds) or 'dark' (for light backgrounds)
 * @param {string} className - Additional CSS classes
 */
const TrainingBreadcrumb = ({ items = [], variant = 'dark', className = '' }) => {
  const isLight = variant === 'light';
  
  const baseTextClass = isLight ? 'text-white/80' : 'text-gray-600';
  const hoverClass = isLight ? 'hover:text-white' : 'hover:text-[#004fa2]';
  const activeClass = isLight ? 'text-white font-medium' : 'text-gray-900 font-medium';
  const separatorClass = isLight ? 'text-white/50' : 'text-gray-400';

  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`}>
      <Link 
        to="/training" 
        className={`flex items-center gap-1.5 ${baseTextClass} ${hoverClass} transition-colors`}
      >
        <GraduationCap className="w-4 h-4" />
        <span>Training</span>
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className={`w-4 h-4 ${separatorClass}`} />
          {item.link ? (
            <Link 
              to={item.link}
              className={`${baseTextClass} ${hoverClass} transition-colors`}
            >
              {item.label}
            </Link>
          ) : (
            <span className={activeClass}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default TrainingBreadcrumb;
