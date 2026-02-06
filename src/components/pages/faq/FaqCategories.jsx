import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';

const FaqCategories = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openFAQ, setOpenFAQ] = useState({});

  const faqCategories = [
    {
      title: "Internship Program",
      icon: HelpCircle,
      color: "#004fa2",
      faqs: [
        {
          question: "Q1: Who can apply for Zyra Tech Hub's internship program?",
          answer: "University students, graduates, and anyone eager to gain real-world tech experience."
        },
        {
          question: "Q2: How much does the internship cost?",
          answer: "GHS 350, covering mentorship, training, and certification."
        },
        {
          question: "Q3: Do you partner with schools outside Koforidua?",
          answer: "Currently we focus on Koforidua but will expand regionally and internationally."
        },
        {
          question: "Q4: Can institutions request IT or web services?",
          answer: "Yes, we provide professional IT, web, and networking services for schools and organizations."
        },
        {
          question: "Q5: How can individuals or companies support your programs?",
          answer: "Through sponsorships, partnerships, or donations of funds and equipment."
        }
      ]
    },
    {
      title: "Services & Support",
      icon: Phone,
      color: "#004fa2",
      faqs: [
        {
          question: "What specific IT training do you offer?",
          answer: "We provide hands-on training in web/mobile development, networking, and cybersecurity, often featured in our ZyraTech Training programs."
        },
        {
          question: "Does ZyraTech Hub support academic projects?",
          answer: "Yes, we provide Academic Research Support, including frameworks for cutting-edge topics like Generative AI bias mitigation."
        },
        {
          question: "What IT and digital services do you offer?",
          answer: "We provide Education Technology (EdTech), IT & Networking, Web & Software Development, and Consulting & Support services for schools and businesses."
        },
        {
          question: "What specific IT services are available?",
          answer: "LAN/WAN installation, WiFi setup, server deployment, school websites, management systems, and IT consulting."
        },
        {
          question: "Do you offer long-term support contracts?",
          answer: "Yes, we provide long-term maintenance contracts and ongoing system support for schools and businesses."
        },
        {
          question: "How can I request a quote for services?",
          answer: "Contact us directly through our website or email info@zyratechhub.com with your project details."
        }
      ]
    },
    {
      title: "Partnerships",
      icon: MessageCircle,
      color: "#004fa2",
      faqs: [
        {
          question: "What types of partnerships do you offer?",
          answer: "Educational partnerships (introduce digital learning programs), Corporate partnerships (sponsor or host interns), NGO & Government partnerships (support youth capacity-building), and Technology partnerships (co-develop tools and solutions)."
        },
        {
          question: "How can our organization partner with Zyra Tech Hub?",
          answer: "Contact us through our partnership page or email info@zyratechhub.com to discuss collaboration opportunities."
        },
        {
          question: "Can my company sponsor a student?",
          answer: "Yes, we welcome corporate sponsorships to help students access our tech programs and create meaningful impact."
        },
        {
          question: "What are the benefits of partnership?",
          answer: "Partners gain access to skilled interns, enhanced CSR impact, technology solutions, and opportunities to shape the next generation of tech talent."
        }
      ]
    },
    {
      title: "Donations & Support",
      icon: Mail,
      color: "#004fa2",
      faqs: [
        {
          question: "How can I support Zyra Tech Hub?",
          answer: "You can fund students to access tech programs, donate equipment (laptops, kits, accessories), or sponsor school-based technology programs."
        },
        {
          question: "What equipment donations do you accept?",
          answer: "We accept laptops, robotics kits, networking equipment, and other technology resources for training programs."
        },
        {
          question: "Do you provide donation receipts?",
          answer: "Yes, we provide official receipts for all donations for tax and record-keeping purposes."
        }
      ]
    }
  ];

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

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* FAQ Categories */}
        <div className="space-y-6">
          {faqCategories.map((category, categoryIndex) => (
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
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200"
                    style={{ color: category.color }}
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
                    const questionText = faq.question.replace(/^Q\d+:\s*/i, '');

                    return (
                      <div key={faqIndex} className="border-b border-gray-100 last:border-b-0">
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

