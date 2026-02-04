import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

const FeaturedPost = ({ article }) => {
  if (!article) return null;

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

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Article</h2>
        </div>

        <Link 
          to={`/blog/${article.slug}`}
          className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-64 md:h-auto overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className={`absolute top-4 left-4 ${getCategoryColor(article.category)} text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium`}>
                {article.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-[#004fa2] transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-600 text-base sm:text-lg mb-6 line-clamp-3">
                {article.excerpt}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-700">{article.author.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{article.readingTime}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-[#004fa2] font-semibold group-hover:gap-4 transition-all">
                Read Full Article
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedPost;
