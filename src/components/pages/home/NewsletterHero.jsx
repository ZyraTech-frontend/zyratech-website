import React, { useState } from 'react';

const NewsletterHero = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="w-full bg-gradient-to-b from-[#1560b8] to-[#233a85] py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Subscribe to Our Newsletter</h2>
        <p className="text-xl text-white mb-10 leading-relaxed">
          Stay updated with our latest training programs, industry insights, and exclusive offers. Join our<br className="hidden md:inline" />
          community of tech professionals in Ghana.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center items-center mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full md:w-96 px-6 py-4 rounded-lg text-lg border-none focus:ring-2 focus:ring-[#1560b8] focus:outline-none text-gray-700"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-10 py-4 bg-white text-[#1560b8] font-bold rounded-lg text-lg transition-all duration-300 hover:bg-[#e6e6e6] focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-60"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        <p className="text-white/80 text-base mt-2">
          By subscribing, you agree to our privacy policy. You can unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsletterHero;
