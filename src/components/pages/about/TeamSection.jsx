import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const TeamSection = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  return (
    <section id="team" className="py-16 bg-white from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-12 text-center"
        >
          The People Behind Zyra Tech Hub
        </motion.h2>
        
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16">
          A passionate, diverse team driven by innovation and education.
        </p>

        {/* Leadership */}
        <motion.div 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-black mb-8 text-center">Leadership</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 group text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                <img 
                  src="/images/team/michael.jpg" 
                  alt="Michael Afedi"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h4 className="text-xl font-bold text-black group-hover:text-[#004fa2] mb-2 transition-colors duration-300">Michael Afedi</h4>
              <p className="text-[#004fa2] font-semibold mb-3">CEO & Founder</p>
              <p className="text-sm text-gray-600 mb-4">Computer Science background | AWS Certified Cloud Practitioner</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Passionate about technology and community development, contributing to projects that empower youth and schools in Ghana.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Team Units */}
        <div className="space-y-16">
          {/* Education & Training Unit */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold text-black mb-8 text-center">Education & Training Unit</h3>
            <div className="bg-[#004fa2]/5 rounded-2xl p-8 border border-[#004fa2]/20">
              <p className="text-center text-gray-700 font-medium mb-6">
                Oversees school programs and practical student learning.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-200"></div>
                    <p className="font-semibold text-black">Education Specialist {i}</p>
                    <p className="text-sm text-gray-600">Program Coordinator</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Technical Team */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-black mb-8 text-center">Technical Team</h3>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <p className="text-center text-gray-700 font-medium mb-6">
                Responsible for IT, networking, and web development services.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-200"></div>
                    <p className="font-semibold text-black">Technical Expert {i}</p>
                    <p className="text-sm text-gray-600">Developer/Engineer</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Internship Coordinators */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-black mb-8 text-center">Internship Coordinators</h3>
            <div className="bg-[#004fa2]/5 rounded-2xl p-8 border border-[#004fa2]/20">
              <p className="text-center text-gray-700 font-medium mb-6">
                Manage student placements, mentorship, and certification.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-200"></div>
                    <p className="font-semibold text-black">Coordinator {i}</p>
                    <p className="text-sm text-gray-600">Internship Manager</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Advisory Partners */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-black mb-8 text-center">Advisory Partners</h3>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <p className="text-center text-gray-700 font-medium mb-6">
                A network of technology and education professionals guiding strategy and growth.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-200"></div>
                    <p className="font-semibold text-black text-sm">Advisor {i}</p>
                    <p className="text-xs text-gray-600">Industry Expert</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;


