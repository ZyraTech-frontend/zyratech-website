import React from 'react';
import { Users, Target, Handshake } from 'lucide-react';

const collaborationPoints = [
  {
    number: '1',
    icon: Users,
    title: 'Cultural Awareness',
    description: 'Together with our clients, we identify cultural differences and reflect on how they may affect collaboration.'
  },
  {
    number: '2',
    icon: Target,
    title: 'Team Norms',
    description: 'Jointly, we discuss and define how we want to work as a team, taking into account intercultural learnings.'
  },
  {
    number: '3',
    icon: Handshake,
    title: 'Team Building',
    description: 'We get to know each other outside the formal work context and start building trusting relationships.'
  }
];

const InterculturalCollaborationSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-6">Successful Intercultural Collaboration Is Important To Us</h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mb-10">
          Prior to the project beginning, we set up workshops covering technical expectations & intercultural collaboration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
              alt="Team collaboration"
              className="w-full h-64 md:h-[400px] object-cover rounded-2xl shadow-lg"
            />
          </div>

          <div className="order-1 md:order-2 space-y-6">
            {collaborationPoints.map((point) => {
              const IconComponent = point.icon;
              return (
                <div
                  key={point.number}
                  className="group bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-[#004fa2]/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#004fa2] text-white flex items-center justify-center font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                      {point.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className="text-[#004fa2] group-hover:scale-110 transition-transform" size={18} />
                        <h3 className="font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors">{point.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{point.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterculturalCollaborationSection;
