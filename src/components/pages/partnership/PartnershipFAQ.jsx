import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-left">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipFAQ;
