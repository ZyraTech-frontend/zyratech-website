import React from 'react';
import { ArrowRight } from 'lucide-react';

const projectSteps = [
  {
    title: 'Requirements & Planning',
    description: 'Agree on project-specific requirements, including tech stacks, team roles, and seniority levels.'
  },
  {
    title: 'Team Introduction',
    description: 'Introduction and collaboration set-up with clients.'
  },
  {
    title: 'Continuous Feedback',
    description: 'Team Leads provide regular feedback on individual performance.'
  }
];

const ProjectSetupSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-6">Our Project Set-up Ensures Smooth Delivery</h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mb-10">
          Pilot projects offer an opportunity to evaluate the collaboration before committing to a long-term partnership. Our track record indicates that clients often expand their teams with us after the successful completion of initial projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectSteps.map((step, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-[#004fa2]/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#004fa2] text-white flex items-center justify-center font-bold text-lg shrink-0">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors">{step.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm mb-4">{step.description}</p>
              <ArrowRight className="text-[#004fa2] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" size={20} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default ProjectSetupSection;
