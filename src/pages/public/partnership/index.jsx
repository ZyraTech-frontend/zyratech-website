import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PartnershipHero from '../../../components/pages/partnership/PartnershipHero';
import ImpactStats from '../../../components/pages/partnership/ImpactStats';
import PartnershipStories from '../../../components/pages/partnership/PartnershipStories';
import WhyPartner from '../../../components/pages/partnership/WhyPartner';
import PartnershipCTA from '../../../components/pages/partnership/PartnershipCTA';
import PartnershipFAQ from '../../../components/pages/partnership/PartnershipFAQ';
import PartnersRecognition from '../../../components/pages/partnership/PartnersRecognition';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import HrContactSection from '../../../components/common/HrContactSection';
import { CheckCircle, X } from 'lucide-react';
import useSEO from '../../../hooks/useSEO';

const PartnershipPage = () => {
  useSEO({
    title: 'Partner With Us',
    description: 'Partner with Zyra Tech Hub to empower Ghana\'s future through technology. Explore partnership opportunities for schools, businesses, and organizations.',
    url: '/partner',
    keywords: 'partnership, partner with Zyra Tech Hub, corporate partnership Ghana, NGO partnership, education partnership'
  });

  const location = useLocation();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (location.state?.applicationSubmitted) {
      setShowSuccessMessage(true);
      // Clear the state
      window.history.replaceState({}, document.title);
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Success Message Banner */}
      {showSuccessMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4 sm:px-6 animate-slideDown">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-xl border border-green-200 p-5 sm:p-7 backdrop-blur-sm">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5">Application Received! ✓</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium mb-2">
                  Thank you for your interest in partnering with ZyraTech Hub.
                </p>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  We have received your application and our team will review it carefully. We'll contact you within 2-5 working days to discuss the next steps.
                </p>
              </div>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg p-1.5 transition-all duration-200"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-4 h-1 bg-green-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse" style={{
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }} />
            </div>
          </div>
        </div>
      )}

      <PartnershipHero />
      <ImpactStats />

      <WhyPartner />
      <PartnershipStories />
      <PartnersRecognition />


      <PartnershipCTA />
      <PartnershipFAQ />

      <HrContactSection />
      <NewsletterHero />
    </div>
  );
};

export default PartnershipPage;
