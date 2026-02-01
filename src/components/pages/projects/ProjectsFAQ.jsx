import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ProjectsFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'Can you help with my final year project?',
      answer: 'Absolutely! We specialize in helping students with final year projects, capstone projects, and thesis work. We work within student budgets and timelines, providing guidance and technical support throughout the process.'
    },
    {
      question: 'How long does it take to complete a project?',
      answer: 'Project timelines vary based on complexity. Simple projects take 2-4 weeks, medium projects 4-6 weeks, and complex projects 6-8 weeks or more. We provide a detailed timeline after reviewing your requirements.'
    },
    {
      question: 'Do I get the source code?',
      answer: 'Yes! You receive full source code, documentation, and deployment instructions. For student projects, we also provide guidance on how to present and defend your project.'
    },
    {
      question: 'What if I need changes after completion?',
      answer: 'All projects include a revision period for minor adjustments. We also offer maintenance packages for ongoing support and feature additions after project delivery.'
    },
    {
      question: 'Can you work with my budget?',
      answer: 'We offer flexible pricing, especially for students. Share your budget during the request process, and we\'ll work with you to find a solution that fits your needs and financial constraints.'
    },
    {
      question: 'Do you provide project documentation?',
      answer: 'Yes! Every project includes comprehensive documentation, user guides, and technical specifications. For academic projects, we provide additional documentation suitable for thesis submission.'
    },
    {
      question: 'What technologies do you use?',
      answer: 'We work with modern technologies including React, Node.js, Python, Arduino, Raspberry Pi, mobile frameworks, and more. We choose the best tech stack based on your project requirements.'
    },
    {
      question: 'Can I be involved in the development process?',
      answer: 'Definitely! We encourage collaboration. You\'ll receive regular updates, can review progress, provide feedback, and learn throughout the development process.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about custom projects
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-[#004fa2] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <a 
            href="/contact" 
            className="text-[#004fa2] hover:text-[#003d7a] font-semibold"
          >
            Contact us directly →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsFAQ;
