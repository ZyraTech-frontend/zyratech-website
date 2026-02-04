import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

const BlogCard = ({ article }) => {
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
    <Link 
      to={`/blog/${article.slug}`}
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className={`absolute top-3 left-3 ${getCategoryColor(article.category)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
          {article.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-[#004fa2] transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="space-y-3 mt-auto">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{article.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{article.readingTime}</span>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-700">{article.author.name}</span>
            </div>
            <ArrowRight size={16} className="text-[#004fa2] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
