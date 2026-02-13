import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import contentService from '../../../services/contentService';

const AboutQuote = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const quoteAnimation = useScrollAnimation({ type: 'fadeIn', delay: 0.2 });
  const statsAnimation = useScrollAnimation({ type: 'slideUp', delay: 0.4 });

  const [content, setContent] = useState({
    quote: "Our mission is to lead Ghana’s technological transformation through world-class Software Engineering, robust Infrastructure & Cloud services, and impactful IT Education. We are building an ecosystem where innovation meets academic excellence",
    authorName: "ZyraTech Leadership",
    authorTitle: "Empowering Ghana's Tech Future",
    authorImage: "/images/tex1.png",
    stat1Value: "2024",
    stat1Label: "Founded",
    stat2Value: "50+",
    stat2Label: "Trainees",
    stat3Value: "1",
    stat3Label: "Location"
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await contentService.getAboutQuote();
        if (data) {
          setContent(data);
        }
      } catch (error) {
        console.error('Error fetching about content:', error);
      }
    };
    fetchContent();
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            ref={titleAnimation.ref}
            initial={titleAnimation.initial}
            animate={titleAnimation.animate}
            variants={titleAnimation.variants}
            transition={titleAnimation.transition}
            className="text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 sm:mb-8 text-gray-600"
          >
            ABOUT ZYRATECH
          </motion.h2>

          <motion.div
            ref={quoteAnimation.ref}
            initial={quoteAnimation.initial}
            animate={quoteAnimation.animate}
            variants={quoteAnimation.variants}
            transition={quoteAnimation.transition}
            className="relative max-w-4xl mx-auto"
          >
            <Quote className="hidden sm:block absolute -top-4 -left-4 w-8 sm:w-12 h-8 sm:h-12 text-[#004fa2] opacity-50" />
            <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6 sm:mb-8 px-2 sm:px-0">
              {content.quote}
            </blockquote>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8 mb-8 sm:mb-12">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-gray-100 shrink-0">
              <img
                src={content.authorImage || 'https://via.placeholder.com/150'}
                alt={content.authorName}
                className="w-full h-full object-cover object-top scale-[3.0] origin-top -translate-y-4"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face';
                }}
              />
            </div>
            <div className="text-center md:text-left">
              <div className="text-base sm:text-lg font-semibold text-gray-900">{content.authorName}</div>
              <div className="text-sm sm:text-base text-gray-600">{content.authorTitle}</div>
            </div>
          </div>

          <motion.div
            ref={statsAnimation.ref}
            initial={statsAnimation.initial}
            animate={statsAnimation.animate}
            variants={statsAnimation.variants}
            transition={statsAnimation.transition}
            className="grid grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#004fa2] mb-1 sm:mb-2">{content.stat1Value}</div>
              <div className="text-xs sm:text-base text-gray-600">{content.stat1Label}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#004fa2] mb-1 sm:mb-2">{content.stat2Value}</div>
              <div className="text-xs sm:text-base text-gray-600">{content.stat2Label}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#004fa2] mb-1 sm:mb-2">{content.stat3Value}</div>
              <div className="text-xs sm:text-base text-gray-600">{content.stat3Label}</div>
            </div>
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
