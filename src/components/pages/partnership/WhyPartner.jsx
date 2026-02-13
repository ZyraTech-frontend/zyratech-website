import React, { useState, useEffect } from 'react';
import { Heart, Users, Rocket, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';
import contentService from '../../../services/contentService';

const WhyPartner = () => {
  const [data, setData] = useState({
    title: 'Why Partner With ZyraTech?',
    content: 'Join a network of forward-thinking organizations committed to driving technological innovation and sustainable development across Africa.'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: resData } = await contentService.getWhyPartner();
        if (resData) setData(resData);
      } catch (error) {
        console.error('Error fetching why partner data:', error);
      }
    };
    fetchData();
  }, []);

  const reasons = [
    {
      icon: <Heart className="w-5 h-5" />,
      title: 'Mission Alignment',
      description: 'Work with an organization dedicated to solving real community challenges through technology and innovation.'
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Community Impact',
      description: 'Directly contribute to empowering thousands of students and entrepreneurs across Africa.'
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: 'Business Growth',
      description: 'Expand your reach, build brand reputation, and create new business opportunities in emerging markets.'
    },
    {
      icon: <Handshake className="w-5 h-5" />,
      title: 'Global Network',
      description: 'Connect with like-minded organizations and leaders transforming Africa\'s tech ecosystem.'
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23004fa2' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
            {data.title}
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto">
            {data.content}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full">
                <span className="block">
                  <span className="text-[#004fa2] mb-6 flex justify-center items-center gap-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="p-4 bg-[#004fa2]/10 rounded-2xl">
                      {reason.icon}
                    </span>
                    <span className="text-xl font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors duration-300">
                      {reason.title}
                    </span>
                  </span>
                </span>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >

        </motion.div>
      </div>
    </section>
  );
};

export default WhyPartner;
