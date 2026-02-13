import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import contentService from '../../../services/contentService';

const PartnershipStories = () => {
  const [stories, setStories] = useState([
    {
      title: 'Tech Innovation Hub',
      category: 'Corporate Partner',
      story: 'By partnering with ZyraTech, we expanded our reach to underserved communities and trained 500+ students in cutting-edge technologies.',
      impact: '500+ students trained, 20+ internships created',
      image: '/images/partnership-tech-hub.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200'
    }
  ]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data } = await contentService.getPartnershipStories();
        if (data && data.length > 0) {
          setStories(data);
        }
      } catch (error) {
        console.error('Error fetching partnership stories:', error);
      }
    };
    fetchStories();
  }, []);

  return (
    <section className="bg-white mb-8 md:mb-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">Partnership Stories</h2>
          <p className="text-gray-600 max-w-4xl mx-auto">See how our partners are creating real impact</p>
        </div>

        <div className="space-y-8 md:space-y-12">
          {stories.map((story, index) => {
            const anim = useScrollAnimation({ type: 'fadeIn', delay: 0 });
            const imageAnim = useScrollAnimation({ type: 'slideLeft', delay: 0.1 });
            const contentAnim = useScrollAnimation({ type: 'slideRight', delay: 0.15 });

            return (
              <motion.div
                key={index}
                ref={anim.ref}
                initial={anim.initial}
                animate={anim.animate}
                variants={anim.variants}
                transition={anim.transition}
                className="w-screen -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden shadow-lg md:flex md:items-stretch"
              >
                {/* Image - alternates left/right */}
                <motion.div
                  ref={imageAnim.ref}
                  initial={imageAnim.initial}
                  animate={imageAnim.animate}
                  variants={imageAnim.variants}
                  transition={imageAnim.transition}
                  className={`md:w-1/2 ${index % 2 === 0 ? 'order-1 md:order-2' : 'order-1 md:order-1'} h-48 md:h-[360px] relative overflow-hidden`}
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover object-center"
                    style={{ objectPosition: 'center 30%' }}
                    onError={(e) => { e.target.src = story.fallbackImage; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-[#004fa2]/10 to-transparent" />
                </motion.div>

                {/* Content */}
                <motion.div
                  ref={contentAnim.ref}
                  initial={contentAnim.initial}
                  animate={contentAnim.animate}
                  variants={contentAnim.variants}
                  transition={contentAnim.transition}
                  className={`md:w-1/2 bg-[#004fa2] text-white px-6 sm:px-8 md:px-12 py-6 md:py-10 flex flex-col justify-center ${index % 2 === 0 ? 'order-2 md:order-1' : 'order-2 md:order-2'}`}
                >
                  <div className="max-w-xl mx-auto">
                    <div className="text-[#004fa2] text-5xl leading-none font-extrabold mb-3">"</div>
                    <h3 className="text-2xl md:text-3xl font-extrabold mb-3">{story.title}</h3>

                    <p className="text-white/90 text-base leading-relaxed mb-5">
                      "{story.story}"
                    </p>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[#004fa2] font-bold">—</span>
                      <div>
                        <div className="font-semibold">{story.title}</div>
                        <div className="text-sm text-white/80">{story.category}</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/20">
                      <p className="text-sm text-white/90"><strong>Impact:</strong> {story.impact}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnershipStories;
