import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { Quote, Star, ChevronRight } from 'lucide-react';

const ImpactStories = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  const successStories = [
    {
      name: "Naomi",
      story: "Built her first educational web app during our internship",
      description: "Naomi came to Zyra Tech Hub with basic computer skills and left as a confident web developer. During her internship, she created an educational platform that helps local students access learning resources. Her project is now being used by 3 schools in Koforidua.",
      image: "/images/stories/naomi.jpg",
      achievement: "Educational Web App Developer",
      rating: 5,
      program: "Tech Internship Program"
    },
    {
      name: "Isaac", 
      story: "Helped install a school's first IT network infrastructure",
      description: "Isaac transformed his passion for technology into practical skills through our IT & Networking training. He successfully led the installation of a complete computer lab network at a local senior high school, connecting over 40 computers and providing internet access to 500+ students.",
      image: "/images/stories/isaac.jpg",
      achievement: "IT Network Specialist",
      rating: 5,
      program: "Tech Internship Program"
    },
    {
      name: "Student Innovation Teams",
      story: "Designed solutions for local SMEs",
      description: "Teams of our interns worked together to solve real business challenges. They developed digital solutions including inventory management systems, customer service platforms, and marketing websites for 5 local small and medium enterprises, helping them streamline operations and reach more customers.",
      image: "/images/stories/team.jpg",
      achievement: "Business Solution Developers",
      rating: 5,
      program: "Tech Internship Program"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 sm:mb-6">
            Success Stories
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We measure success not by numbers, but by transformation. Meet the innovators who started their journey at Zyra Tech Hub.
          </p>
        </motion.div>

        {/* Stories Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {successStories.map((story, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                {/* Image Section */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#004fa2]/20 to-[#004fa2]/5 z-10"></div>
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-[#004fa2]">{story.program}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-black mb-1">{story.name}</h3>
                      <p className="text-sm font-medium text-[#004fa2]">{story.achievement}</p>
                    </div>
                    {/* Rating */}
                    <div className="flex gap-1">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative mb-4">
                    <Quote className="absolute -top-2 -left-2 text-[#004fa2]/10 size-8" />
                    <p className="text-lg font-semibold text-gray-900 italic pl-6">
                      {story.story}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {story.description}
                  </p>

                  {/* CTA */}
                  <button className="inline-flex items-center gap-2 text-[#004fa2] hover:text-black font-semibold transition-colors duration-300 group">
                    <span>Read Full Story</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-[#004fa2] rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#004fa2] to-[#2A2D7C]"></div>
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Start Your Success Story
              </h3>
              <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                Join 500+ students and interns who have transformed their futures through technology education at Zyra Tech Hub.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-[#004fa2] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                  Apply for Internship
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-[#004fa2] px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                  Read More Stories
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStories;
