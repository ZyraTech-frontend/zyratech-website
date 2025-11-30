import React from 'react';
import { Lightbulb, Building2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const OurStory = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const contentAnimation = useScrollAnimation({ type: 'slideUp', delay: 0.1 });
  const sidebarAnimation = useScrollAnimation({ type: 'slideLeft', delay: 0.2 });

  return (
    <section id="story" className="pt-4 pb-16 bg-white from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Content */}
          <div className="lg:col-span-8">
            <motion.h2 
              ref={titleAnimation.ref}
              initial={titleAnimation.initial}
              animate={titleAnimation.animate}
              variants={titleAnimation.variants}
              transition={titleAnimation.transition}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6"
            >
              Our Story
            </motion.h2>
            
            {/* Brief Intro */}
            <motion.p 
              ref={contentAnimation.ref}
              initial={contentAnimation.initial}
              animate={contentAnimation.animate}
              variants={contentAnimation.variants}
              transition={contentAnimation.transition}
              className="text-xl text-[#004fa2] font-medium mb-8 leading-relaxed"
            >
              From vision to reality - how Zyra Tech Hub is empowering Ghana's future through technology and innovation.
            </motion.p>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                <span className="font-semibold text-black">Founded in Koforidua, Ghana</span>, Zyra Tech Hub was created to bridge the gap between classroom learning and real-world skills. We equip learners with hands-on experience in programming, robotics, and IT while supporting institutions and businesses with 
                <span className="font-semibold text-[#004fa2]"> professional digital services</span>.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Our <span className="font-semibold text-black">dual model empowers both students and organizations</span>, creating a win-win ecosystem of learning and innovation. We combine education, innovation, and impact — transforming classrooms into creative labs and learners into 
                <span className="font-semibold text-[#004fa2]"> problem-solvers</span>.
              </p>
            </motion.div>

            {/* Call to Action */}
            <div className="mt-8">
              <a 
                href="/impact" 
                className="inline-flex items-center gap-2 text-lg text-[#004fa2] hover:text-[#000000] font-semibold transition-colors group"
              >
                See our impact in action
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Sidebar - Timeline & Stats */}
          <motion.div 
            ref={sidebarAnimation.ref}
            initial={sidebarAnimation.initial}
            animate={sidebarAnimation.animate}
            variants={sidebarAnimation.variants}
            transition={sidebarAnimation.transition}
            className="lg:col-span-4"
          >
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <h3 className="font-bold text-black mb-6">Our Journey</h3>
              
              {/* Timeline */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-[#004fa2]/5 transition-all duration-200 cursor-pointer">
                  <div className="w-3 h-3 bg-[#004fa2] rounded-full shadow-sm"></div>
                  <div>
                    <div className="font-semibold text-black">2020</div>
                    <div className="text-sm text-gray-600">Founded</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-[#004fa2]/5 transition-all duration-200 cursor-pointer">
                  <div className="w-3 h-3 bg-[#004fa2] rounded-full shadow-sm"></div>
                  <div>
                    <div className="font-semibold text-black">2024</div>
                    <div className="text-sm text-gray-600">Incorporated</div>
                  </div>
                </div>
              </div>

              {/* Key Stats */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-black mb-3 group-hover:text-[#004fa2] transition-colors">Key Focus Areas</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-[#004fa2]/5 transition-all duration-200 cursor-pointer">
                    <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    <span className="text-sm text-gray-700 hover:text-[#004fa2] transition-colors">Internship Programs</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-[#004fa2]/5 transition-all duration-200 cursor-pointer">
                    <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    <span className="text-sm text-gray-700 hover:text-[#004fa2] transition-colors">IT & Networking</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-[#000000]/5 transition-all duration-200 cursor-pointer">
                    <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    <span className="text-sm text-gray-700 hover:text-[#000000] transition-colors">Web & Software</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-[#004fa2]/5 transition-all duration-200 cursor-pointer">
                    <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    <span className="text-sm text-gray-700 hover:text-[#004fa2] transition-colors">Consulting & Support</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default OurStory;


