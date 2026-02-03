import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PartnershipCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-[#004fa2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">Ready to Make an Impact?</h2>
        <p className="text-white/90 mb-8">Let's discuss how we can work together to transform Africa's tech landscape.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/partner/apply')}
            className="px-8 py-3 bg-white text-[#004fa2] rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            Start Partnership <ArrowRight className="w-5 h-5" />
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default PartnershipCTA;
