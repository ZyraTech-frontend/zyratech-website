import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../../../data/projectsData';

const ProjectsGrid = () => {
  // Map projectsData to match display format
  const projects = projectsData.map(project => ({
    title: project.title,
    category: project.category,
    description: project.description,
    status: project.status,
    image: project.image,
    link: project.link
  }));

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
            Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-[#004fa2]/20"
            >
              {/* Project Image */}
              <div className="h-48 bg-gray-100">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#004fa2] bg-[#004fa2]/10 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    project.status === 'Completed' 
                      ? 'bg-green-100 text-green-700' 
                      : project.status === 'Active'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-base font-semibold text-black mb-2">
                  {project.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <Link 
                  to={project.link}
                  className="text-sm text-[#004fa2] hover:text-[#000000] font-medium transition-colors duration-200"
                >
                  View Project →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;

