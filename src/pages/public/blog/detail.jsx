import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { articlesData, getArticleBySlug } from '../../../data/articlesData';
import BlogCard from '../../../components/pages/blog/BlogCard';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import HrContactSection from '../../../components/common/HrContactSection';
import useSEO from '../../../hooks/useSEO';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const shouldReduceMotion = useReducedMotion();
  const article = getArticleBySlug(slug);

  // Dynamic SEO based on article
  useSEO({
    title: article?.title || 'Article',
    description: article?.excerpt || 'Read this article from Zyra Tech Hub',
    url: `/blog/${slug}`,
    image: article?.image,
    type: 'article',
    keywords: `${article?.category}, Ghana tech blog, ${article?.author.name}, student stories Ghana`
  });

  // Get related articles (same category, excluding current)
  const relatedArticles = articlesData
    .filter(a => a.category === article?.category && a.slug !== slug)
    .slice(0, 3);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Tech Training': 'bg-blue-500',
      'Projects': 'bg-green-500',
      'Community': 'bg-purple-500',
      'Industry News': 'bg-orange-500',
      'Success Stories': 'bg-pink-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const shareUrl = window.location.href;
  const shareTitle = article.title;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <div className="max-w-none px-0">
          <div
            className="relative overflow-hidden h-[60vh] min-h-[400px] max-h-[600px] bg-cover bg-center"
            style={{
              backgroundImage: `url(${article.image})`
            }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

            {/* Content */}
            <div className="relative px-4 sm:px-6 md:px-10 lg:px-14 py-8 sm:py-12 h-full flex flex-col justify-between">
              {/* Back Button */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
              >
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm sm:text-base"
                >
                  <ArrowLeft size={20} />
                  Back to Blog
                </Link>
              </motion.div>

              {/* Article Info */}
              <motion.div
                className="max-w-4xl"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: 0.2 }}
              >
                {/* Category Badge */}
                <div className="mb-4">
                  <span className={`${getCategoryColor(article.category)} text-white px-4 py-2 rounded-full text-sm font-medium inline-block`}>
                    {article.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {article.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20"
                    />
                    <span className="font-medium">{article.author.name}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{article.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{article.readingTime}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12"
          >
            {/* Excerpt */}
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8 font-medium border-l-4 border-[#004fa2] pl-6 italic">
              {article.excerpt}
            </p>

            {/* Article Body - Placeholder content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                This is where the full article content would go. You can add detailed paragraphs, images, code snippets, and more formatted content here.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Key Takeaways</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Share the main insights and lessons from this article. This section helps readers understand the core value and key points.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">The Journey</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Tell the story in detail. Whether it's a project showcase, success story, or technical guide, provide depth and context that engages readers.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Impact & Results</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Highlight the outcomes and impact. Share metrics, feedback, or real-world applications that demonstrate the value created.
              </p>
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
              <div className="flex gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    alert('Link copied to clipboard!');
                  }}
                  className="flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
                  aria-label="Copy link"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-start gap-4">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    About {article.author.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {article.author.name} is part of the ZyraTech team, dedicated to empowering Ghana's next generation of tech talent through innovative training and real-world projects.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
              More from {article.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedArticles.map((relatedArticle) => (
                <BlogCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-[#004fa2] hover:text-[#003a7a] font-semibold transition-colors"
              >
                View all articles
                <ArrowLeft size={20} className="rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <HrContactSection/>


      <NewsletterHero/>
    </div>
  );
};

export default BlogDetailPage;
