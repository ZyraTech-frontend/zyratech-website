import React from 'react';
import { FileText, MessageSquare, CheckCircle } from 'lucide-react';

const hiringSteps = [
  {
    icon: FileText,
    title: 'Apply',
    description: 'Submit CV and a short note about your fit.'
  },
  {
    icon: MessageSquare,
    title: 'Interview',
    description: 'Short technical and cultural conversations.'
  },
  {
    icon: CheckCircle,
    title: 'Onboard',
    description: 'Fast, clear onboarding and initial goals.'
  }
];

const HowWeHireSection = () => {
  return (
    <section className="bg-[#004fa2] py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">How we hire</h3>
        <p className="text-white/90 mb-8 text-base sm:text-lg">A concise, respectful process that focuses on skills and potential.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hiringSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.title}
                className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/90 group-hover:bg-white flex items-center justify-center transition-colors duration-300">
                    <IconComponent className="text-[#004fa2]" size={20} />
                  </div>
                  <span className="text-sm font-semibold text-white/60 group-hover:text-white/80 transition-colors">{index + 1}</span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-white/80 text-sm leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowWeHireSection;
