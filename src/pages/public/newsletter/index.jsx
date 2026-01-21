import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, Clock, User, Share2, ArrowUp } from 'lucide-react';

// Sample insights data - Add your Zyra Tech Hub articles here
const insights = [
  // Article template:
  // {
  //   id: 1,
  //   title: "Article Title",
  //   category: "Category",
  //   date: "Month Year",
  //   readingTime: "X min read",
  //   author: "Author Name",
  //   image: "/images/path-to-image.png",
  //   summary: "Article summary",
  //   content: "Full article content would go here..."
  // }
];

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll for back to top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white from-gray-50 to-gray-100">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%2339366F" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <section className="pt-16 pb-12 bg-white text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                News & Insights
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Curated intelligence, emerging trends, and exclusive reports on Africa's transforming landscape.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section with Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {insights.map((insight) => (
                <article
                  key={insight.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Article Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={insight.image}
                      alt={insight.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-white from-black/40 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-[#004fa2] rounded-full text-sm font-semibold">
                        {insight.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-8">
                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{insight.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{insight.readingTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        <span>{insight.author}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4 group-hover:text-[#004fa2] transition-colors leading-tight">
                      {insight.title}
                    </h2>

                    {/* Summary */}
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      {insight.summary}
                    </p>

                    {/* CTA Button */}
                    <div className="flex items-center justify-between">
                      <Link 
                        to={`/newsletter/article/${insight.id}`}
                        className="inline-flex items-center gap-2 bg-white hover:from-[#000000] hover:to-[#000000] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                      >
                        Read Full Insight
                        <ChevronRight size={20} />
                      </Link>
                      
                      {/* Share Buttons */}
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:text-[#004fa2] hover:bg-gray-100 rounded-lg transition-all">
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Persistent Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Newsletter Subscription Form */}
                <NewsletterHero />

                {/* Quick Links */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h4 className="text-lg font-bold text-black mb-4">Quick Links</h4>
                  <div className="space-y-3">
                    <a href="/about" className="block text-gray-700 hover:text-[#004fa2] transition-colors">
                      About Zyra Tech Hub
                    </a>
                    <a href="/training" className="block text-gray-700 hover:text-[#004fa2] transition-colors">
                      Training Programs
                    </a>
                    <a href="/projects" className="block text-gray-700 hover:text-[#004fa2] transition-colors">
                      Projects
                    </a>
                    <a href="/contact" className="block text-gray-700 hover:text-[#004fa2] transition-colors">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-white text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-50"
          >
            <ArrowUp size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default NewsletterPage;

