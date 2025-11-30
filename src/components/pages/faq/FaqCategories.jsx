import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqCategories = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openFAQ, setOpenFAQ] = useState({});

  const faqCategories = [
    {
      title: "Internship Program",
      count: 5,
      faqs: [
        {
          question: "Who can apply for Zyra Tech Hub's internship program?",
          answer: "University students, graduates, and anyone eager to gain real-world tech experience in coding, robotics, AI, and IT systems."
        },
        {
          question: "How much does the internship cost?",
          answer: "GHS 350, covering mentorship, training, and professional certification."
        },
        {
          question: "How long is the internship program?",
          answer: "The program runs for 3–6 months with hands-on training and real-world project experience."
        },
        {
          question: "What will I learn?",
          answer: "Web Development (HTML, CSS, React, Tailwind CSS), Basic AI & Robotics, Networking and IT Setup, Cloud Fundamentals, and Entrepreneurship and Tech Innovation."
        },
        {
          question: "Do I get a certificate?",
          answer: "Yes, each participant receives a professional certificate upon completion of the internship program."
        }
      ]
    },
    {
      title: "Services",
      count: 4,
      faqs: [
        {
          question: "What IT and digital services do you offer?",
          answer: "We provide Education Technology (EdTech), IT & Networking, Web & Software Development, and Consulting & Support services."
        },
        {
          question: "Can institutions request IT or web services?",
          answer: "Yes, we provide professional IT, web, and networking services for schools and organizations at affordable rates."
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
      count: 4,
      faqs: [
        {
          question: "Do you partner with schools outside Koforidua?",
          answer: "Currently we focus on Koforidua but will expand regionally and internationally in the future."
        },
        {
          question: "What types of partnerships do you offer?",
          answer: "Educational partnerships, Corporate sponsorships, NGO & Government collaborations, and Technology co-development."
        },
        {
          question: "How can individuals or companies support your programs?",
          answer: "Through sponsorships, partnerships, donations of funds, or equipment donations."
        },
        {
          question: "Can my company sponsor a student?",
          answer: "Yes, we welcome corporate sponsorships to help students access our tech programs."
        }
      ]
    },
    {
      title: "Donations & Support",
      count: 3,
      faqs: [
        {
          question: "How can I support Zyra Tech Hub?",
          answer: "You can fund students to access programs, donate equipment (laptops, kits, accessories), or sponsor school-based technology programs."
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
  };

  const toggleFAQ = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenFAQ(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <section className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* FAQ Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-black mb-4">FAQ Categories</h2>
          
          <div className="space-y-4">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(categoryIndex)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-black">{category.title}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                      {category.count}
                    </span>
                  </div>
                  {openCategory === categoryIndex ? (
                    <ChevronUp className="text-gray-400" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400" size={20} />
                  )}
                </button>

                {/* Category FAQs */}
                {openCategory === categoryIndex && (
                  <div className="border-t border-gray-200">
                    {category.faqs.map((faq, faqIndex) => {
                      const faqKey = `${categoryIndex}-${faqIndex}`;
                      const isOpen = openFAQ[faqKey];
                      
                      return (
                        <div key={faqIndex} className="border-b border-gray-100 last:border-b-0">
                          <button
                            onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-base font-medium text-gray-900 pr-4">
                              {faq.question}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="text-[#004fa2]" size={16} />
                            ) : (
                              <ChevronDown className="text-gray-400" size={16} />
                            )}
                          </button>
                          
                          {isOpen && (
                            <div className="px-6 pb-4 bg-gray-50">
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FaqCategories;

