/**
 * DetailPageLayout Component
 * Unified wrapper for all detail pages (projects, blog, gallery, jobs, training)
 * 
 * Handles:
 * - SEO meta tags
 * - Loading state display
 * - Error state display
 * - Consistent page structure (Navbar, Footer, content)
 * 
 * Usage:
 * <DetailPageLayout
 *   data={project}
 *   loading={loading}
 *   error={error}
 *   title="Project Title"
 *   description="Project description"
 *   image="project-image-url"
 *   skeletonVariant="project"
 * >
 *   Detail page content here
 * </DetailPageLayout>
 */

import React from 'react';
import { ChevronLeft, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';
import Navbar from '../Navbar';
import Footer from '../Footer';
import DetailSkeleton from './skeletons/DetailSkeleton';

const DetailPageLayout = ({
  data,
  loading,
  error,
  children,
  title,
  description,
  image,
  url,
  backTo = '/', // Where the back button should navigate
  showNavbar = true,
  showFooter = true,
  skeletonVariant = 'default', // project, blog, album, job, course
}) => {
  // Setup SEO meta tags
  useSEO({
    title: title || 'Details',
    description: description || 'View details',
    image: image || null,
    url: url || window.location.pathname,
  });

  const navigate = useNavigate();

  // Loading State
  if (loading && !data) {
    return (
      <div className="min-h-screen bg-white">
        {showNavbar && <Navbar />}
        <div className="flex items-center justify-center py-32">
          <DetailSkeleton variant={skeletonVariant} />
        </div>
        {showFooter && <Footer />}
      </div>
    );
  }

  // Error State
  if (error || !data) {
    return (
      <div className="min-h-screen bg-white">
        {showNavbar && <Navbar />}
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Back Button */}
          <button
            onClick={() => navigate(backTo)}
            className="flex items-center gap-2 text-[#004fa2] hover:text-[#003d7a] font-semibold mb-8 transition-colors"
          >
            <ChevronLeft size={20} />
            Go Back
          </button>

          {/* Error Card */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 flex items-start gap-4">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h2 className="font-bold text-red-900 mb-2">Unable to Load</h2>
              <p className="text-red-700 mb-4">
                {error || 'This item could not be found or loaded.'}
              </p>
              <button
                onClick={() => navigate(backTo)}
                className="text-red-700 hover:text-red-900 font-semibold underline"
              >
                Return to Previous Page
              </button>
            </div>
          </div>
        </div>
        {showFooter && <Footer />}
      </div>
    );
  }

  // Success State - Render content
  return (
    <div className="min-h-screen bg-white">
      {showNavbar && <Navbar />}
      <main>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default DetailPageLayout;
