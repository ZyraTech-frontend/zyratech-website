import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Loader2 } from 'lucide-react';
import { articlesData, getArticleBySlug } from '../../../data/articlesData';
import blogService, { normalizeArticle } from '../../../services/blogService';
import BlogCard from '../../../components/pages/blog/BlogCard';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import HrContactSection from '../../../components/common/HrContactSection';
import useSEO from '../../../hooks/useSEO';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const shouldReduceMotion = useReducedMotion();

  // Initial attempt from local mock data for instant display if available
  const mockFallback = getArticleBySlug(slug);
  const [article, setArticle] = useState(mockFallback ? normalizeArticle(mockFallback) : null);
  const [loading, setLoading] = useState(!mockFallback);
  const [notFound, setNotFound] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Fetch published article from live backend API
  useEffect(() => {
    let isMounted = true;

    const fetchArticle = async () => {
      try {
        const liveArticle = await blogService.getPublicArticleBySlug(slug);
        if (isMounted && liveArticle) {
          setArticle(liveArticle);
          setNotFound(false);
        }
      } catch (err) {
        console.warn('Live article fetch failed, using fallback if available:', err);
        if (isMounted) {
          if (!mockFallback) {
            setNotFound(true);
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchArticle();
    return () => { isMounted = false; };
  }, [slug, mockFallback]);

  // Load related articles
  useEffect(() => {
    let isMounted = true;
    const loadRelated = async () => {
      try {
        const res = await blogService.getPublicArticles({ limit: 4 });
        if (isMounted && res.data && res.data.length > 0) {
          const filtered = res.data.filter(a => a.slug !== slug).slice(0, 3);
          setRelatedArticles(filtered);
          return;
        }
      } catch {
        // Ignore, fallback below
      }

      // Fallback related from mock
      if (isMounted) {
        const mockRelated = articlesData
          .filter(a => a.slug !== slug)
          .slice(0, 3)
          .map(normalizeArticle);
        setRelatedArticles(mockRelated);
      }
    };

    loadRelated();
    return () => { isMounted = false; };
  }, [slug]);

  // Dynamic SEO
  useSEO({
    title: article?.title || 'Article',
    description: article?.excerpt || 'Read this article from Zyra Tech Hub',
    url: `/blog/${slug}`,
    image: article?.image,
    type: 'article',
    keywords: `${article?.category || 'tech'}, Ghana tech blog, ${article?.authorName || 'ZyraTech'}, student stories Ghana`
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={36} className="animate-spin text-[#004fa2] mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-700">Loading article...</p>
        </div>
      </div>
    );
  }

  if (notFound || !article) {
    return <Navigate to="/blog" replace />;
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Tech Training': 'bg-blue-600',
      'Projects': 'bg-emerald-600',
      'Community': 'bg-purple-600',
      'Industry News': 'bg-amber-600',
      'Success Stories': 'bg-rose-600'
    };
    return colors[category] || 'bg-[#004fa2]';
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://zyratechhub.com/blog/${slug}`;
  const shareTitle = article.title;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        {/* Background Image with Overlays */}
        <div className="absolute inset-0">
          <img
            decoding="async"
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover object-center brightness-105"
            onError={(e) => { e.currentTarget.src = '/images/image1.webp'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-black/25"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16 sm:py-20 md:py-24 h-[70vh] min-h-[480px] max-h-[680px] flex flex-col justify-between items-start">
          {/* Back Button */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm sm:text-base font-medium bg-black/30 backdrop-blur-xs px-3.5 py-1.5 rounded-full"
            >
              <ArrowLeft size={18} />
              Back to Blog
            </Link>
          </motion.div>

          {/* Article Info */}
          <motion.div
            className="max-w-5xl w-full"
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.2 }}
          >
            {/* Category Badge */}
            <div className="mb-4">
              <span className={`${getCategoryColor(article.category)} text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-md inline-block`}>
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              {article.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-gray-200 text-xs sm:text-sm md:text-base font-medium" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}>
              <div className="flex items-center gap-2.5">
                <img
                  decoding="async"
                  src={article.authorAvatar || '/images/image1.webp'}
                  alt={article.authorName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white/40 shadow-md"
                  onError={(e) => { e.currentTarget.src = '/images/image1.webp'; }}
                />
                <span className="font-semibold">{article.authorName}</span>
              </div>
              <span className="opacity-60">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <span>{article.date || 'Published'}</span>
              </div>
              <span className="opacity-60">•</span>
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>{article.readingTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-12"
          >
            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-medium border-l-4 border-[#004fa2] pl-5 italic bg-blue-50/30 py-3 rounded-r-lg">
                {article.excerpt}
              </p>
            )}

            {/* Article Body */}
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-sans whitespace-pre-wrap">
              {article.content ? (
                article.content
              ) : (
                <div className="space-y-6 text-gray-700">
                  <p>
                    ZyraTech Hub is committed to empowering youth, students, and businesses through practical technology education, professional mentorship, and cutting-edge software solutions in Ghana and across Africa.
                  </p>
                  <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Key Highlights</h2>
                  <p>
                    Through hands-on projects, industry partnerships, and certified training programs, our learners gain real-world experience that transforms their careers and impacts their communities.
                  </p>
                </div>
              )}
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Share this article</h3>
                <p className="text-xs text-gray-500 mt-0.5">Spread the word to your colleagues and network</p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors shadow-xs"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 bg-[#004fa2] text-white rounded-lg hover:bg-blue-800 transition-colors shadow-xs"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(shareUrl);
                    alert('Article link copied to clipboard!');
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 h-9 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  <Share2 size={16} />
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map(rel => (
                  <BlogCard key={rel.id} article={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <HrContactSection />
      <NewsletterHero />
    </div>
  );
};

export default BlogDetailPage;
