import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown, ChevronUp, HelpCircle, MessageCircle, Phone, Mail,
  Users, Settings, Sparkles
} from 'lucide-react';
import faqService, { FAQ_CATEGORIES } from '../../../services/faqService';

const FaqCategories = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openFAQ, setOpenFAQ] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Icon mapping
  const iconMap = {
    'Users': Users,
    'Settings': Settings,
    'MessageCircle': MessageCircle,
    'Mail': Mail,
    'Sparkles': Sparkles,
    'HelpCircle': HelpCircle,
    'Phone': Phone
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await faqService.getPublishedFaqs();
        const faqs = response.data;

        // Group FAQs by category
        const grouped = faqs.reduce((acc, faq) => {
          if (!acc[faq.category]) {
            acc[faq.category] = [];
          }
          acc[faq.category].push(faq);
          return acc;
        }, {});

        // Transform into array based on config keys to maintain order or based on available data
        // utilizing FAQ_CATEGORIES for metadata
        const transformedCategories = Object.keys(grouped).map(catKey => {
          const config = FAQ_CATEGORIES[catKey] || FAQ_CATEGORIES['General'];
          return {
            title: catKey,
            icon: iconMap[config.iconName] || HelpCircle,
            color: config.color.split(' ')[1].replace('text-', ''), // Extracting color roughly or just use hardcoded hex matches
            // Ideally we should use the classes from config, but the original code used inline styles for color
            // Let's use the first hex code found or a default blue
            hexColor: "#004fa2", // Default
            faqs: grouped[catKey]
          };
        });

        // Optional: Sort categories if needed, or rely on Object.keys order (unreliable)
        // For now, we trust the order they appear or perhaps sort by a priority list if we had one.

        setCategories(transformedCategories);
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
    setOpenFAQ({}); // Reset FAQ states when category changes
  };

  const toggleFAQ = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenFAQ(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (loading) {
    return <div className="py-20 text-center text-gray-500">Loading FAQs...</div>;
  }

  if (categories.length === 0) {
    return <div className="py-20 text-center text-gray-500">No FAQs available at the moment.</div>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* FAQ Categories */}
        <div className="space-y-6">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >

              {/* Category Header */}
              <button
                type="button"
                onClick={() => toggleCategory(categoryIndex)}
                aria-expanded={openCategory === categoryIndex}
                aria-controls={`faq-category-panel-${categoryIndex}`}
                className="w-full px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004fa2] focus-visible:ring-offset-2"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200 text-[#004fa2]"
                  >
                    <category.icon size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-black">{category.title}</h3>
                    <p className="text-sm text-gray-500">
                      {category.faqs.length} {category.faqs.length === 1 ? 'question' : 'questions'}
                    </p>
                  </div>
                </div>
                <div className="text-gray-400">
                  {openCategory === categoryIndex ? (
                    <ChevronUp size={20} className="sm:w-6 sm:h-6" />
                  ) : (
                    <ChevronDown size={20} className="sm:w-6 sm:h-6" />
                  )}
                </div>
              </button>

              {/* Category FAQs */}
              {openCategory === categoryIndex && (
                <div id={`faq-category-panel-${categoryIndex}`} className="border-t border-gray-200">
                  {category.faqs.map((faq, faqIndex) => {
                    const key = `${categoryIndex}-${faqIndex}`;
                    const isOpen = openFAQ[key];
                    // Remove "Q1: ", "Q2: " prefix if present in the data, or just show question
                    const questionText = faq.question.replace(/^Q\d+:\s*/i, '');

                    return (
                      <div key={faq.id || faqIndex} className="border-b border-gray-100 last:border-b-0">
                        <button
                          type="button"
                          onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                          aria-expanded={!!isOpen}
                          aria-controls={`faq-answer-${categoryIndex}-${faqIndex}`}
                          className="w-full px-6 sm:px-8 py-4 text-left hover:bg-gray-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004fa2] focus-visible:ring-offset-2"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <h4 className="text-base sm:text-lg font-semibold text-black pr-4">
                              {questionText}
                            </h4>
                            <div className="text-gray-400 flex-shrink-0 mt-1">
                              {isOpen ? (
                                <ChevronUp size={18} />
                              ) : (
                                <ChevronDown size={18} />
                              )}
                            </div>
                          </div>
                        </button>

                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            id={`faq-answer-${categoryIndex}-${faqIndex}`}
                            className="px-6 sm:px-8 pb-4"
                          >
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FaqCategories;

