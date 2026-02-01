import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const articles = {
  1: {
    title: 'ZyraTech Selected as NEF 2025 Finalist',
    content: `
      <p>We are thrilled to announce that ZyraTech has been selected as a finalist for the National Entrepreneurship Festival (NEF) 2025. This prestigious recognition highlights our innovative approach to technology education and sustainable solutions in Ghana.</p>
      
      <p>The National Entrepreneurship Festival is Ghana's premier platform for celebrating and supporting entrepreneurial excellence. Being selected as a finalist among hundreds of applicants is a testament to our team's dedication and the impact we're making in the technology education sector.</p>
      
      <p>Our selection was based on our comprehensive approach to addressing the digital skills gap in Ghana through:</p>
      <ul>
        <li>Hands-on technology training programs</li>
        <li>Sustainable e-waste transformation initiatives</li>
        <li>Community-driven innovation labs</li>
        <li>Strategic partnerships with local and international organizations</li>
      </ul>
      
      <p>This recognition comes at a pivotal time as we continue to expand our programs and reach more communities across Ghana. We look forward to the final competition and the opportunity to showcase how ZyraTech is transforming lives through technology education.</p>
    `,
    date: '2024-12-15',
    author: 'ZyraTech Team',
    image: '/images/nef-2025.jpg',
    category: 'Awards'
  },
  2: {
    title: 'YECO 2025 Program Selection',
    content: `
      <p>ZyraTech has been selected to participate in the Young Entrepreneurs Capacity Organization (YECO) 2025 program, a significant milestone in our journey to empower the next generation of technology leaders in Ghana.</p>
      
      <p>The YECO program is designed to build the capacity of young entrepreneurs through mentorship, training, and networking opportunities. Our selection validates our commitment to creating sustainable impact in the technology education sector.</p>
      
      <p>Through this program, we will:</p>
      <ul>
        <li>Access advanced business development resources</li>
        <li>Connect with industry mentors and experts</li>
        <li>Expand our network of partners and collaborators</li>
        <li>Enhance our program delivery methodologies</li>
      </ul>
      
      <p>This opportunity will enable us to scale our impact and reach even more communities with our technology education and sustainable innovation programs.</p>
    `,
    date: '2024-12-10',
    author: 'ZyraTech Team',
    image: '/images/yeco-2025.jpg',
    category: 'Programs'
  },
  3: {
    title: 'BagaBoard Nexora 2025 Innovation',
    content: `
      <p>We are excited to introduce the BagaBoard Nexora 2025, our latest innovation in sustainable technology solutions. This groundbreaking project represents our commitment to transforming electronic waste into valuable, functional resources.</p>
      
      <p>The BagaBoard Nexora 2025 is more than just a product – it's a symbol of our circular manufacturing approach that addresses both environmental challenges and technology access issues in Ghana.</p>
      
      <p>Key features of the BagaBoard Nexora 2025:</p>
      <ul>
        <li>Built from 80% recycled electronic components</li>
        <li>Designed for educational and professional use</li>
        <li>Locally manufactured using sustainable processes</li>
        <li>Affordable pricing for educational institutions</li>
      </ul>
      
      <p>This innovation showcases how we're turning the challenge of e-waste into an opportunity for technological advancement and environmental sustainability. The BagaBoard Nexora 2025 will be available for educational institutions and training programs starting in early 2025.</p>
    `,
    date: '2024-12-05',
    author: 'ZyraTech Team',
    image: '/images/bagaboard-nexora.jpg',
    category: 'Innovation'
  }
};

const ArticlePage = () => {
  const { id } = useParams();
  const article = articles[id];

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link to="/newsletter" className="text-[#004fa2] hover:text-[#003d7a]">
            Back to Newsletter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-16 bg-[#004fa2] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/newsletter"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Newsletter
          </Link>
          
          <div className="mb-6">
            <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {article.title}
          </h1>
          
          <div className="flex items-center space-x-6 text-white/80">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(article.date).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {article.author}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop';
            }}
          />
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-[#004fa2] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Subscribe to our newsletter for more updates and insights.
          </p>
          
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-white hover:bg-gray-100 text-[#004fa2] px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;