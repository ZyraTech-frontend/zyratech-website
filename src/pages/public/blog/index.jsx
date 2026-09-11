import React, { useState, useMemo, useEffect } from 'react';
import BlogHero from '../../../components/pages/blog/BlogHero';
import FeaturedPost from '../../../components/pages/blog/FeaturedPost';
import CategoryFilter from '../../../components/pages/blog/CategoryFilter';
import BlogCard from '../../../components/pages/blog/BlogCard';
import { articlesData } from '../../../data/articlesData';
import blogService, { normalizeArticle } from '../../../services/blogService';
import { Search, Loader2 } from 'lucide-react';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import HrContactSection from '../../../components/common/HrContactSection';
import useSEO from '../../../hooks/useSEO';

const BlogPage = () => {
  useSEO({
    title: 'Blog',
    description: 'Read success stories, tech insights, and educational articles from Zyra Tech Hub. Discover how we\'re transforming lives through technology in Ghana.',
    url: '/blog',
    keywords: 'tech blog Ghana, student success stories, Ghana technology education, digital skills blog'
  });

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Load published articles from live backend API, falling back to mock data
  useEffect(() => {
    let isMounted = true;

    const loadPublicArticles = async () => {
      setLoading(true);
      try {
        const res = await blogService.getPublicArticles({ limit: 50 });
        if (isMounted) {
          if (res.data && res.data.length > 0) {
            setArticles(res.data);
          } else {
            // Fallback to initial mock articles if database is currently empty
            setArticles(articlesData.map(normalizeArticle));
          }
        }
      } catch (err) {
        console.warn('API unavailable, falling back to mock articles:', err);
        if (isMounted) {
          setArticles(articlesData.map(normalizeArticle));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPublicArticles();
    return () => { isMounted = false; };
  }, []);

  // Compute categories from active articles
  const categories = useMemo(() => {
    const set = new Set();
    articles.forEach(a => {
      if (a.category) set.add(a.category);
    });
    return ['all', ...Array.from(set)];
  }, [articles]);

  // Featured article is either explicitly marked as featured, or the newest article
  const featuredArticle = useMemo(() => {
    if (articles.length === 0) return null;
    return articles.find(a => a.featured) || articles[0];
  }, [articles]);

  // Filter articles (excluding the hero featured article)
  const filteredArticles = useMemo(() => {
    let filtered = articles.filter(article => article.id !== featuredArticle?.id);

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(article => article.category === activeCategory);
    }

    // Search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.category.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [articles, featuredArticle, activeCategory, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <BlogHero />

      {/* Featured Post */}
      {featuredArticle && <FeaturedPost article={featuredArticle} />}

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={(category) => {
          setActiveCategory(category);
          setCurrentPage(1);
        }}
      />

      {/* Blog Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {activeCategory === 'all' ? 'All Articles' : activeCategory}
              </h2>
              <p className="text-gray-600 mt-2">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} found
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-72">
              <Search size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl shadow-xs focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all"
              />
            </div>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="text-center py-20">
              <Loader2 size={36} className="animate-spin text-[#004fa2] mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-700">Loading latest articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 text-sm">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <>
              {/* Articles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {paginatedArticles.map((article) => (
                  <BlogCard key={article.id} article={article} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </button>

                  <div className="flex gap-1 sm:gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-sm transition-colors ${
                            currentPage === pageNum
                              ? 'bg-[#004fa2] text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <HrContactSection />
      <NewsletterHero />
    </div>
  );
};

export default BlogPage;
