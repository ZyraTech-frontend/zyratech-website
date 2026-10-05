import React, { useState, useEffect, useRef } from 'react';
import contentService from '../../../services/contentService';
import partnersService from '../../../services/partnersService';

const CountUp = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const endValue = parseInt(end.replace(/[^0-9]/g, ''));

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(endValue * progress);

      setCount(current);

      if (progress === 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const ImpactStats = () => {
  const [stats, setStats] = useState([
    { number: '1', suffix: '', label: 'Active Partners' },
    { number: '50', suffix: '+', label: 'Students Trained' },
    { number: '50', suffix: '+', label: 'Projects Completed' }
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch active partnerships count from backend
        const { data: partnerships } = await partnersService.getAllPartnerships({ limit: 1000 });
        const activePartnerCount = partnerships ? partnerships.length : 1;

        // Fetch other stats from content service
        const { data: contentStats } = await contentService.getImpactStats();
        
        // Merge: use active partners count from backend, keep other stats or use defaults
        const mergedStats = [
          { number: activePartnerCount.toString(), suffix: '', label: 'Active Partners' },
          { number: contentStats?.[1]?.number || '50', suffix: contentStats?.[1]?.suffix || '+', label: 'Students Trained' },
          { number: contentStats?.[2]?.number || '50', suffix: contentStats?.[2]?.suffix || '+', label: 'Projects Completed' }
        ];
        
        setStats(mergedStats);
      } catch (error) {
        console.error('Error fetching impact stats:', error);
        // Keep default stats on error
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#004fa2] mb-1 sm:mb-2 lg:mb-3">
                <CountUp
                  end={stat.number}
                  suffix={stat.suffix}
                  duration={2000 + index * 200}
                />
              </div>
              <p className="text-gray-600 text-[10px] sm:text-sm md:text-base lg:text-lg font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
