/**
 * ProjectDetailPage Component
 * Clean, professional project showcase
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
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
        <div className="max-w-5xl mx-auto px-4 py-16">
          <Link to="/projects" className="inline-flex items-center gap-2 text-[#004fa2] hover:text-[#003d7a] mb-8 font-semibold">
            <ArrowLeft size={18} />
            Back to Projects
          </Link>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="font-bold text-red-900 mb-2 text-lg">Project Not Found</h2>
            <p className="text-red-700 mb-4">{error || 'This project could not be loaded.'}</p>
            <Link to="/projects" className="text-red-700 hover:text-red-900 font-semibold">
              Return to Projects
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Success State
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link to="/projects" className="inline-flex items-center gap-2 text-[#004fa2] hover:text-[#003d7a] font-semibold text-sm">
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg overflow-hidden shadow-md h-64 md:h-80"
          >
            <img
              src={normalizedProject.image}
              alt={normalizedProject.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{normalizedProject.title}</h1>
            
            {/* Meta Info - Horizontal */}
            <div className="flex flex-wrap gap-6 mb-12 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-600 uppercase">Category</span>
                <span className="text-sm font-bold text-[#004fa2] bg-blue-50 px-3 py-1 rounded">{normalizedProject.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-600 uppercase">Status</span>
                <span className="text-sm font-bold text-green-700 bg-green-50 px-3 py-1 rounded capitalize">{normalizedProject.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-600 uppercase">Team</span>
                <span className="text-sm font-bold text-gray-900">{normalizedProject.team} members</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-600 uppercase">Progress</span>
                <span className="text-sm font-bold text-gray-900">{normalizedProject.progress}%</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed text-base">{normalizedProject.description}</p>
            </div>

            {/* Technologies */}
            {normalizedProject.technologies && normalizedProject.technologies.length > 0 && (
              <div className="mb-12">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {normalizedProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded font-medium hover:bg-gray-200 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}



            {/* Action Links */}
            <div className="flex flex-wrap gap-4">
              {normalizedProject.link && (
                <a
                  href={normalizedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#004fa2] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#003d7a] transition-colors text-sm"
                >
                  <ExternalLink size={16} />
                  View Live Project
                </a>
              )}
              {normalizedProject.github && (
                <a
                  href={normalizedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-[#004fa2] text-[#004fa2] px-6 py-2.5 rounded-lg font-semibold hover:bg-[#004fa2] hover:text-white transition-colors text-sm"
                >
                  <Github size={16} />
                  View on GitHub
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
        className="py-16 md:py-20 bg-gradient-to-r from-[#004fa2] to-[#003d7a] text-white"
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg text-white/90 mb-8">
            Let's transform your vision into reality. Get in touch with our team today.
          </p>
          <Link
            to="/projects/request"
            className="inline-flex items-center gap-2 bg-white text-[#004fa2] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Request a Project
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
