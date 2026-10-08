/**
 * PortfolioShowcase Component
 * Professional portfolio grid display with filtering and search
 * Displays all projects with category and search functionality
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, AlertCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import projectsService from '../../../services/projectsService';
import ProjectCard from './ProjectCard';

const PortfolioShowcase = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await projectsService.getAllProjects({ limit: 100 });
        // Filter to only featured/active projects
        const filteredProjects = response.projects?.filter(p => p.featured || p.status === 'Active') || [];
        setProjects(filteredProjects);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects. Please try again later.');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(projects.map(p => p.category))];
    return cats.sort();
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies?.some(t => t.toLowerCase().includes(query))
      );
    }

    return result;
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Project <span className="text-[#004fa2]">Portfolio</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of successful projects across various industries. From web applications to AI solutions, we bring ideas to life.
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects by name, technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            <Filter size={20} className="text-gray-600" />
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#004fa2] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Projects
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#004fa2] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#004fa2]/10 rounded-full mb-4">
                <Clock className="text-[#004fa2] animate-spin" size={24} />
              </div>
              <p className="text-gray-600 font-medium">Loading portfolio projects...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 flex items-start gap-4 mb-8">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Unable to Load Projects</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Filter className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Found</h3>
            <p className="text-gray-600">
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'No projects available at this time'}
            </p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && filteredProjects.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        )}

        {/* Results Count */}
        {!loading && filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600">
              Showing <span className="font-bold text-[#004fa2]">{filteredProjects.length}</span> of{' '}
              <span className="font-bold text-[#004fa2]">{projects.length}</span> projects
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PortfolioShowcase;
