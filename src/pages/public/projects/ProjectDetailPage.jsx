/**
 * ProjectDetailPage Component
 * Individual project case study page with full details
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, Target, TrendingUp, ArrowRight, Github, ExternalLink, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import DetailSkeleton from '../../../components/common/skeletons/DetailSkeleton';
import useDetailPageData from '../../../hooks/useDetailPageData';
import projectsService from '../../../services/projectsService';
import useSEO from '../../../hooks/useSEO';

const ProjectDetailPage = () => {
  const { id } = useParams();

  // Fetch project data
  const { data: project, loading, error } = useDetailPageData(
    projectsService.getProjectById,
    id
  );

  // Normalize backend field names
  const normalizedProject = project ? {
    ...project,
    image: project.coverImageUrl || project.image,
    team: project.teamSize !== undefined ? project.teamSize : (project.team || 0),
    link: project.projectLink || project.link,
  } : null;

  // Safe date formatter
  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return null;
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (err) {
      return null;
    }
  };

  // Setup SEO
  useSEO({
    title: normalizedProject?.title || 'Project Details',
    description: normalizedProject?.description || 'Explore this project case study',
    url: `/projects/${id}`,
  });

  // Loading State
  if (loading && !normalizedProject) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <DetailSkeleton variant="project" />
        </div>
        <Footer />
      </div>
    );
  }

  // Error State
  if (error || !normalizedProject) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Link to="/projects" className="flex items-center gap-2 text-[#004fa2] hover:text-[#003d7a] mb-8 font-semibold">
            <ArrowRight size={20} className="rotate-180" />
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

  // Success State - Render full content
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link to="/projects" className="flex items-center gap-2 text-[#004fa2] hover:text-[#003d7a] font-semibold transition-colors">
          <ArrowRight size={20} className="rotate-180" />
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
              src={normalizedProject.image}
              alt={normalizedProject.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

            {/* Category and Featured Badge - Overlaid */}
            <div className="absolute top-6 left-6 flex flex-col gap-3">
              <span className="bg-[#004fa2] text-white px-4 py-2 rounded-lg font-bold text-sm inline-w-fit">
                {normalizedProject.category}
              </span>
              {normalizedProject.featured && (
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-lg font-bold text-sm inline-w-fit">
                  ⭐ Featured Project
                </span>
              )}
            </div>
          </div>

          {/* Title and Meta */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{normalizedProject.title}</h1>
            <div className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-[#004fa2]" />
                <span className="font-semibold">Status: <span className="text-[#004fa2]">{normalizedProject.status}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-[#004fa2]" />
                <span className="font-semibold">Team: <span className="text-[#004fa2]">{normalizedProject.team} members</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Target size={20} className="text-[#004fa2]" />
                <span className="font-semibold">Progress: <span className="text-[#004fa2]">{normalizedProject.progress}%</span></span>
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
                <p className="text-gray-700 leading-relaxed text-lg">{normalizedProject.description}</p>
              </div>

              {/* Technologies */}
              {normalizedProject.technologies && normalizedProject.technologies.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {normalizedProject.technologies.map((tech, idx) => (
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
                {normalizedProject.link && (
                  <a
                    href={normalizedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#004fa2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#003d7a] transition-colors"
                  >
                    <ExternalLink size={18} />
                    View Live Project
                  </a>
                )}
                {normalizedProject.github && (
                  <a
                    href={normalizedProject.github}
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
                        style={{ width: `${normalizedProject.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm font-bold text-[#004fa2] mt-2">{normalizedProject.progress}% Complete</p>
                  </div>
                  <div className="border-t border-[#004fa2]/20 pt-4 mt-4">
                    <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-2">Team Size</p>
                    <p className="text-3xl font-bold text-[#004fa2]">{normalizedProject.team}</p>
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
                    <p className="text-gray-900 font-semibold">{normalizedProject.category}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-lg font-bold text-sm ${
                      normalizedProject.status === 'Active' ? 'bg-green-100 text-green-700' :
                      normalizedProject.status === 'In Progress' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {normalizedProject.status}
                    </span>
                  </div>
                  {normalizedProject.startDate && formatDate(normalizedProject.startDate) && (
                    <div>
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Started</p>
                      <p className="text-gray-900 font-semibold">{formatDate(normalizedProject.startDate)}</p>
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
