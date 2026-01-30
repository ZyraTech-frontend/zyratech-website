import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: 'How can you ensure that your employees are qualified to handle projects?',
    answer: 'It is a minimum requirement for our employees to have a bachelor\'s degree in selected IT/tech-related fields. Prior to joining us, our Software Developers, Software Testers, and Data Scientists successfully completed IT/digital training at ZyraTech\'s Training Academy, including an 8-week capstone project to showcase their technical capabilities.'
  },
  {
    question: 'How do you handle project management?',
    answer: 'We follow agile methodologies and use industry-standard project management tools. Our experienced project managers ensure clear communication, regular updates, and timely delivery while maintaining flexibility to adapt to changing requirements.'
  },
  {
    question: 'What happens if I am not happy with the services?',
    answer: 'Client satisfaction is our priority. We have a structured feedback process and will work closely with you to address any concerns. We offer revisions and adjustments to ensure the final deliverable meets your expectations and requirements.'
  },
  {
    question: 'Are your business processes secure?',
    answer: 'Yes, we follow the highest international security standards including ISO 27001:2013 and TISAX certifications. We implement robust security measures, regular audits, and strict data protection protocols to ensure your information is safe.'
  },
  {
    question: 'How can I ensure that my intellectual property is in safe hands?',
    answer: 'We sign comprehensive NDAs and IP agreements before project commencement. All intellectual property rights are clearly defined and transferred to you upon project completion. Our legal framework ensures complete protection of your proprietary information.'
  }
];

const QAFaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:border-[#39366F]/30 hover:shadow-md"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors duration-300 hover:bg-gray-50"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`flex-shrink-0 w-6 h-6 text-[#39366F] transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QAFaqSection;
