import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import QAFaqSection from '../../../components/pages/quality-assurance/QAFaqSection';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import HrContactSection from '../../../components/common/HrContactSection';
import ToolsOrbit from '../../../components/pages/quality-assurance/ToolsOrbit';
import contentService from '../../../services/contentService';
import Loader from '../../../components/admin/shared/Loader';

const QualityAssurance = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await contentService.getQA();
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch QA data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-white">
      {/* Hero section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={data.hero?.image || "/images/quality-assurance-hero.jpg"}
            alt="Quality Assurance"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003d7a]/35 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 min-h-[450px] sm:min-h-[520px] flex items-center">
          <div className="max-w-3xl w-full">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
            >
              {data.hero?.title || "Quality Assurance"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed"
            >
              {data.hero?.description || "Release with confidence. ZyraTech helps you build robust, secure and high-performing products through modern QA practices and automation."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <Link
                to="/contact"
                state={{ from: 'quality-assurance' }}
                className="cta-btn rounded-xl px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base md:text-lg transform hover:-translate-y-0.5"
              >
                Start a QA review
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/training/programs"
                className="cta-ghost rounded-xl px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base md:text-lg transform hover:-translate-y-0.5"
              >
                QA Training
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Do We Work? */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4 sm:mb-6">{data.intro?.howItWorks?.title || "How Do We Work?"}</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{data.intro?.howItWorks?.description}</p>
          </div>
        </div>
      </section>

      {/* Our Quality Standards */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4 sm:mb-6">{data.intro?.standards?.title || "Our Quality Standards"}</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-10">{data.intro?.standards?.description}</p>
          </div>
          <div className="space-y-4 sm:space-y-8">
            {data.intro?.standards?.items?.map((item, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{item.text}</p>
                <p className="text-xs sm:text-sm text-green-600 font-semibold">{item.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools We Work With */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4 sm:mb-6">Tools We Work With</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">Our comprehensive toolkit spans the entire software development lifecycle, from cloud infrastructure to quality assurance.</p>
          </div>
        </div>
        <ToolsOrbit tools={data.tools} />
      </section>

      {/* Dynamic Features Sections (Clean Coding, Peer Reviews, etc.) */}
      {data.features?.map((feature, index) => (
        <section key={feature.id || index} className={`${index % 2 !== 0 ? 'bg-gray-50' : 'bg-white'} py-10 sm:py-16`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center">
            <motion.div
              className={feature.imagePosition === 'left' ? 'lg:order-2' : ''}
              initial={{ opacity: 0, x: feature.imagePosition === 'left' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{feature.title}</h3>
              <ul className="space-y-3 sm:space-y-5 text-sm sm:text-base text-gray-600">
                {feature.content?.map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-[#004fa2] mt-1">
                      <CheckCircle size={18} />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 sm:mt-10">
                <Link to="/our-services" className="inline-block bg-[#004fa2] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-sm">
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div
              className={feature.imagePosition === 'left' ? 'lg:order-1' : ''}
              initial={{ opacity: 0, x: feature.imagePosition === 'left' ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-[420px] object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800'; }}
                />
                <div className="absolute top-0 right-0 h-full w-3 bg-[#004fa2]" />
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      <QAFaqSection items={data.faq} />

      {/* Let's Have A Conversation */}
      <HrContactSection />

      {/* Newsletter Hero */}
      <NewsletterHero />
    </div>
  );
};

export default QualityAssurance;
