import React, { useState, useEffect } from 'react';
import { Heart, Users, Rocket, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';
import contentService from '../../../services/contentService';

const WhyPartner = () => {
  const [reasons, setReasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    title: 'Why Partner With ZyraTech?',
    content: 'Join a network of forward-thinking organizations committed to driving technological innovation and sustainable development across Africa.'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // ✅ Use PUBLIC endpoint (no authentication required)
        const reasonsData = await contentService.getPublicWhyPartner();
        console.log('📊 WhyPartner - API response:', reasonsData); // DEBUG
        
        if (Array.isArray(reasonsData) && reasonsData.length > 0) {
          console.log('✅ Setting why partner reasons:', reasonsData); // DEBUG
          setReasons(reasonsData);
        }
      } catch (error) {
        console.error('❌ Error fetching why partner data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  
  // Map icons based on title or order
  const getIcon = (title) => {
    const iconMap = {
      'mission': <Heart className="w-5 h-5" />,
      'community': <Users className="w-5 h-5" />,
      'business': <Rocket className="w-5 h-5" />,
      'network': <Handshake className="w-5 h-5" />,
    };
    
    const titleLower = title?.toLowerCase() || '';
    for (const [key, icon] of Object.entries(iconMap)) {
      if (titleLower.includes(key)) return icon;
    }
    return <Heart className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </section>
    );
  }

  // Use fetched reasons from backend
  const displayReasons = reasons.length > 0 ? reasons : [];

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
          {displayReasons.map((reason, index) => (
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
                      {getIcon(reason.title)}
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
