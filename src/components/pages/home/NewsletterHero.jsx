import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const NewsletterHero = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const location = useLocation();

  // Determine source page for tracking
  const getSourcePage = () => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 'Homepage';
    if (path.includes('/blog')) return 'Blog';
    if (path.includes('/training')) return 'Training Page';
    if (path.includes('/about')) return 'About Page';
    if (path.includes('/partner')) return 'Partnership Page';
    if (path.includes('/jobs')) return 'Jobs Page';
    if (path.includes('/projects')) return 'Projects Page';
    if (path.includes('/services')) return 'Our Services';
    if (path.includes('/quality')) return 'Quality Assurance';
    if (path.includes('/work-with-us')) return 'Work With Us';
    return 'Other';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock subscription - in production this would call an API
    setTimeout(() => {
      // Log subscription for demo purposes
      console.log('Newsletter subscription:', {
        email,
        source: getSourcePage(),
        subscribedAt: new Date().toISOString()
      });
      
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset after 5 seconds to allow another subscription
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1000);
  };

  return (
    <section className="py-16 bg-[#004fa2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
            Stay updated with our latest training programs, industry insights, and exclusive offers. Join our community of tech professionals in Ghana.
          </p>
          <div className="max-w-md mx-auto">
            {isSubscribed ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 animate-fade-in">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
                <p className="text-white/90">
                  You've been successfully subscribed to our newsletter.
                </p>
              </div>
            ) : (
              <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-grow px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-gray-900 bg-white"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-white/90 text-[#004fa2] px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#004fa2]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
            <p className="text-sm text-white/80 mt-4">
              By subscribing, you agree to our privacy policy. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterHero;
