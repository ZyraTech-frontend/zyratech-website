import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import ImpactHeroSection from '../../../components/pages/impact/ImpactHeroSection';
import ImpactCommunitySection from '../../../components/pages/impact/ImpactCommunitySection';
import ImpactValuesSection from '../../../components/pages/impact/ImpactValuesSection';
import ImpactPeopleHighlightsSection from '../../../components/pages/impact/ImpactPeopleHighlightsSection';
import ImpactMetricsSection from '../../../components/pages/impact/ImpactMetricsSection';
import ParallaxDivider from '../../../components/common/ParallaxDivider.jsx';
import contentService from '../../../services/contentService'; // Import content service

const ImpactPage = () => {
  const shouldReduceMotion = useReducedMotion();
  const [metrics, setMetrics] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsRes, storiesRes] = await Promise.all([
          contentService.getImpactMetrics(),
          contentService.getImpactStories()
        ]);
        setMetrics(metricsRes.data || []);
        setStories(storiesRes.data || []);
      } catch (error) {
        console.error("Failed to fetch impact data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const values = [
    {
      title: 'Diversity',
      description:
        "We believe growth and innovation happen when we embrace different backgrounds, experiences, and ideas. We build an environment of respect and open-mindedness where everyone can learn and contribute."
    },
    {
      title: 'Collaboration',
      description:
        "We work hand-in-hand with learners and media partners, like Royal Klast Group, to deliver solutions with real impact."
    },
    {
      title: 'Excellence',
      description:
        'We strive for high quality in our code, cloud deployments, and research frameworks—aiming to exceed expectations through professional discipline.'
    },
    {
      title: 'Integrity',
      description:
        'We act with honesty and consistency. We communicate transparently and take responsibility for our work, our outcomes, and our commitments.'
    },
    {
      title: 'Passion',
      description:
        'We are driven by purpose. Passion fuels our energy to keep learning, to go the extra mile, and to build technology that improves lives.'
    }
  ];

  // Map stories to the format expected by ImpactPeopleHighlightsSection
  const highlights = stories
    .filter(s => s.active && s.featured)
    .map(s => ({
      name: s.name,
      role: s.role,
      organization: s.company,
      location: s.course, // Using course as the badge text
      image: s.image,
      quote: s.quote
    }));

  // If no stories loaded yet (or fetch failed), fall back to hardcoded for checking? No, better to show nothing or loading.
  // Actually let's use the hardcoded ones as initial state if we wanted, but explicit fetch is better.

  const livingOurValues = [
    {
      title: 'Learning by doing',
      description:
        'We create hands-on experiences that help learners build confidence, teamwork, and real-world problem-solving skills.',
      to: '/blog'
    },
    {
      title: 'Building with community',
      description:
        'We collaborate with schools, mentors, and partners to design initiatives that are grounded in local context and real needs.',
      to: '/blog'
    },
    {
      title: 'Quality that lasts',
      description:
        'We focus on craftsmanship and continuous improvement—so what we teach and build can be trusted and scaled.',
      to: '/blog'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004fa2]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ImpactHeroSection />

      {/* New Metrics Section */}
      <ImpactMetricsSection metrics={metrics} />

      <ImpactCommunitySection />

      <ParallaxDivider heightClassName="h-48 sm:h-56 md:h-64" imageUrl="/images/parallax2.png" overlayClassName="bg-black/50" />

      <ImpactValuesSection items={values} />

      <ParallaxDivider heightClassName="h-48 sm:h-56 md:h-64" imageUrl="/images/parallax3.png" overlayClassName="bg-black/50" />

      {/* Dynamic Highlights from Stories */}
      {highlights.length > 0 && <ImpactPeopleHighlightsSection people={highlights} />}

      <ParallaxDivider heightClassName="h-48 sm:h-56 md:h-64" imageUrl="/images/parallax4.png" overlayClassName="bg-black/50" />

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-6">How We Live Our Values</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our values are not just words. They guide how we show up for our learners, how we collaborate with partners, and how we build solutions.
            </p>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {livingOurValues.map((item, idx) => (
              <motion.div
                key={item.title}
                className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#004fa2]/25 cursor-pointer"
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : idx * 0.08 }}
              >
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed flex-1">
                  {item.description}
                </p>
                <div className="mt-4">
                  <Link
                    to={item.to}
                    className="inline-flex items-center font-semibold text-[#004fa2] hover:text-[#003d7a]"
                  >
                    Read more
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ParallaxDivider heightClassName="h-48 sm:h-56 md:h-64" imageUrl="/images/parallax5.png" overlayClassName="bg-black/50" />

      <NewsletterHero />
    </div>
  );
};

export default ImpactPage;
