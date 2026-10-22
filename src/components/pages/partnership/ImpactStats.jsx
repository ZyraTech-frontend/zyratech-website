import React, { useState, useEffect, useRef } from 'react';
import { fetchMetricsByLocation } from '../../../services/impactService';

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
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // ✅ Fetch real-time metrics from the impact service
        const metrics = await fetchMetricsByLocation('partnership');
        console.log('📊 ImpactStats - Real metrics from backend:', metrics);
        
        // Transform metrics to display format
        if (metrics && metrics.length > 0) {
          const displayStats = metrics.map(metric => ({
            number: metric.value.toString(),
            suffix: metric.suffix || '',
            prefix: metric.prefix || '',
            label: metric.title,
            category: metric.category
          }));
          setStats(displayStats);
        }
      } catch (error) {
        console.error('❌ Error fetching impact stats:', error);
        // Fallback to default stats on error
        setStats([
          { number: '1', suffix: '', label: 'Active Partners' },
          { number: '50', suffix: '+', label: 'Students Trained' },
          { number: '50', suffix: '+', label: 'Projects Completed' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="h-12 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-4 sm:gap-8 lg:gap-10 ${stats.length === 3 ? 'grid-cols-3' : stats.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#004fa2] mb-1 sm:mb-2 lg:mb-3">
                {stat.prefix}
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
