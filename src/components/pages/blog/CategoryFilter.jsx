import React from 'react';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  const getCategoryColor = (category) => {
    const colors = {
      'Tech Training': 'bg-blue-500',
      'Projects': 'bg-green-500',
      'Community': 'bg-purple-500',
      'Industry News': 'bg-orange-500',
      'Success Stories': 'bg-pink-500',
      'all': 'bg-[#004fa2]'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`flex-shrink-0 px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                activeCategory === category
                  ? `${getCategoryColor(category)} text-white shadow-md`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
