import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import contentService from '../../../services/contentService';

const AboutQuote = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // ✅ Use PUBLIC endpoint (no authentication required)
        const { data } = await contentService.getPublicAboutQuote();
        console.log('📊 AboutQuote - API response:', data); // DEBUG
        
        // API returns array, extract first item
        if (data && Array.isArray(data) && data.length > 0) {
          console.log('✅ AboutQuote - Setting content from array:', data[0]); // DEBUG
          setContent(data[0]);
        } else if (data && !Array.isArray(data)) {
          // Fallback: if data is already an object
          console.log('✅ AboutQuote - Setting content from object:', data); // DEBUG
          setContent(data);
        }
      } catch (error) {
        console.error('❌ AboutQuote - Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  // Don't render until content is loaded
  if (loading || !content) {
    console.log('⏳ AboutQuote - Loading or no content:', { loading, hasContent: !!content }); // DEBUG
    return null;
  }

  // Guard against missing required fields
  const hasRequiredContent = content.quote || content.authorName || content.stat1Value;
  
  if (!hasRequiredContent) {
    console.log('⚠️ AboutQuote - Missing required content'); // DEBUG
    return null;
  }

  console.log('🎨 AboutQuote - Rendering with content:', content); // DEBUG

  return (
    <section className="py-12 sm:py-16 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 sm:mb-8 text-gray-600"
          >
            ABOUT ZYRATECH
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-4xl mx-auto"
          >
            <Quote className="hidden sm:block absolute -top-4 -left-4 w-8 sm:w-12 h-8 sm:h-12 text-[#004fa2] opacity-50" />
            <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6 sm:mb-8 px-2 sm:px-0">
              {content.quote || 'Our mission is to empower through technology and innovation.'}
            </blockquote>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8 mb-8 sm:mb-12">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#004fa2] shrink-0 shadow-lg">
              <img decoding="async"
                src={content.authorImage || 'https://via.placeholder.com/300'}
                alt={content.authorName}
                width="300"
                height="300"
                loading="lazy"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face';
                }}
              />
            </div>
            <div className="text-center md:text-left">
              <div className="text-base sm:text-lg font-semibold text-gray-900">{content.authorName}</div>
              <div className="text-sm sm:text-base text-gray-600">{content.authorTitle}</div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12"
          >
            {content.stat1Value && (
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#004fa2] mb-1 sm:mb-2">{content.stat1Value}</div>
                <div className="text-xs sm:text-base text-gray-600">{content.stat1Label || 'Statistic'}</div>
              </div>
            )}
            {content.stat2Value && (
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#004fa2] mb-1 sm:mb-2">{content.stat2Value}</div>
                <div className="text-xs sm:text-base text-gray-600">{content.stat2Label || 'Statistic'}</div>
              </div>
            )}
            {content.stat3Value && (
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#004fa2] mb-1 sm:mb-2">{content.stat3Value}</div>
                <div className="text-xs sm:text-base text-gray-600">{content.stat3Label || 'Statistic'}</div>
              </div>
            )}
          </motion.div>

          <Link
            to="/about"
            className="inline-block bg-[#004fa2] hover:bg-[#003d7a] text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-colors duration-300 text-sm sm:text-base"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutQuote;
