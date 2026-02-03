import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PartnershipFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What types of partnerships does ZyraTech offer?',
      answer: 'We offer flexible partnerships including corporate sponsorships, technology collaborations, community partnerships, and educational collaborations. Each can be customized to your organization\'s goals.'
    },
    {
      question: 'How do I get started?',
      answer: 'Contact us at info@zyratechhub.com or click "Start Partnership" to fill out an application. We\'ll discuss your goals and create a customized partnership plan.'
    },
    {
      question: 'What are the partnership benefits?',
      answer: 'Benefits include brand visibility, community impact, networking opportunities, and access to our ecosystem of innovators and entrepreneurs.'
    },
    {
      question: 'Can we customize a partnership?',
      answer: 'Absolutely! We work with each partner to create a unique arrangement that aligns with both organizations\' missions and goals.'
    },
    {
      question: 'How do you measure partnership success?',
      answer: 'We track metrics like students trained, projects completed, jobs created, and community impact. We provide regular reports to all partners.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-[#004fa2]" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-gray-600">
            Find answers to common questions about our partnership programs and how we can work together.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="px-6 py-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 text-left group-hover:text-[#004fa2] transition-colors duration-200">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-[#004fa2] transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#004fa2] transition-colors duration-200" />
                    )}
                  </div>
                </div>
              </button>

              {/* Answer Section with Animation */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={openIndex === index ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-100 px-6 py-6">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default PartnershipFAQ;
