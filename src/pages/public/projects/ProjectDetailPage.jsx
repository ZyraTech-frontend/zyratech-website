/**
 * ProjectDetailPage Component
 * Individual project case study page with full details
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, AlertCircle, Clock, Users, Target, TrendingUp, ArrowRight, Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import projectsService from '../../../services/projectsService';
import useSEO from '../../../hooks/useSEO';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useSEO({
    title: project?.title || 'Project Details',
    description: project?.description || 'Explore this project case study',
    url: `/projects/${id}`,
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await projectsService.getProjectById(id);
        
        // Normalize backend field names to frontend expectations
        // Backend returns: coverImageUrl, teamSize, projectLink
        // Frontend expects: image, team, link
        const normalizedProject = {
          ...response,
          // Map backend field names to frontend field names (prioritize backend fields)
          image: response.coverImageUrl || response.image,
          team: response.teamSize !== undefined ? response.teamSize : (response.team || 0),
          link: response.projectLink || response.link,
        };
        
        console.log('Raw project data:', response);
        console.log('Normalized project:', normalizedProject);
        setProject(normalizedProject);
      } catch (err) {
        console.error('Failed to fetch project:', err);
        setError('Failed to load project details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#004fa2]/10 rounded-full mb-4">
              <Clock className="text-[#004fa2] animate-spin" size={24} />
            </div>
            <p className="text-gray-600 font-medium">Loading project details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Link to="/projects" className="flex items-center gap-2 text-[#004fa2] hover:text-[#003d7a] mb-8 font-semibold">
            <ChevronLeft size={20} />
            Back to Projects
          </Link>
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 flex items-start gap-4">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h2 className="font-bold text-red-900 mb-2">Project Not Found</h2>
              <p className="text-red-700 mb-4">{error || 'This project could not be loaded.'}</p>
              <Link to="/projects" className="text-red-700 hover:text-red-900 font-semibold underline">
                Return to Projects
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link to="/projects" className="flex items-center gap-2 text-[#004fa2] hover:text-[#003d7a] font-semibold transition-colors">
          <ChevronLeft size={20} />
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-12 md:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          <div className="relative rounded-2xl overflow-hidden mb-8 h-96 md:h-[500px] shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

            {/* Category and Featured Badge - Overlaid */}
            <div className="absolute top-6 left-6 flex flex-col gap-3">
              <span className="bg-[#004fa2] text-white px-4 py-2 rounded-lg font-bold text-sm inline-w-fit">
                {project.category}
              </span>
              {project.featured && (
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-lg font-bold text-sm inline-w-fit">
                  ⭐ Featured Project
                </span>
              )}
            </div>
          </div>

          {/* Title and Meta */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-[#004fa2]" />
                <span className="font-semibold">Status: <span className="text-[#004fa2]">{project.status}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-[#004fa2]" />
                <span className="font-semibold">Team: <span className="text-[#004fa2]">{project.team} members</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Target size={20} className="text-[#004fa2]" />
                <span className="font-semibold">Progress: <span className="text-[#004fa2]">{project.progress}%</span></span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Content Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-12 md:py-16 border-t border-gray-100"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
                <p className="text-gray-700 leading-relaxed text-lg">{project.description}</p>
              </div>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, idx) => (
                      <div
                        key={idx}
                        className="bg-[#004fa2]/10 text-[#004fa2] px-4 py-2.5 rounded-lg font-medium border border-[#004fa2]/20 hover:border-[#004fa2] transition-colors"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#004fa2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#003d7a] transition-colors"
                  >
                    <ExternalLink size={18} />
                    View Live Project
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border-2 border-[#004fa2] text-[#004fa2] px-6 py-3 rounded-lg font-semibold hover:bg-[#004fa2] hover:text-white transition-colors"
                  >
                    <Github size={18} />
                    View on GitHub
                  </a>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Key Metrics */}
              <div className="bg-gradient-to-br from-[#004fa2]/5 to-[#004fa2]/10 rounded-2xl p-8 border border-[#004fa2]/20 mb-8">
                <h3 className="font-bold text-gray-900 mb-6 text-lg">Key Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-1">Progress</p>
                    <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#004fa2] to-[#003d7a] transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm font-bold text-[#004fa2] mt-2">{project.progress}% Complete</p>
                  </div>
                  <div className="border-t border-[#004fa2]/20 pt-4 mt-4">
                    <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-2">Team Size</p>
                    <p className="text-3xl font-bold text-[#004fa2]">{project.team}</p>
                    <p className="text-xs text-gray-600">dedicated members</p>
                  </div>
                </div>
              </div>

              {/* Project Info Card */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-6">Project Info</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Category</p>
                    <p className="text-gray-900 font-semibold">{project.category}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-lg font-bold text-sm ${
                      project.status === 'Active' ? 'bg-green-100 text-green-700' :
                      project.status === 'In Progress' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  {project.startDate && (
                    <div>
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Started</p>
                      <p className="text-gray-900 font-semibold">{new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
        className="py-12 md:py-16 bg-gradient-to-r from-[#004fa2] to-[#003d7a] text-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Project?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Let's create something amazing together. Share your vision and we'll bring it to life.
          </p>
          <Link
            to="/projects?package=student-projects"
            className="inline-flex items-center gap-2 bg-white text-[#004fa2] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            Request a Project
            <ArrowRight size={20} />
          </Link>
        </div>
      </motion.section>

      {/* Newsletter */}
      <NewsletterHero />
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
