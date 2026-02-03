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

const PartnershipPage = () => {
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
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 sm:px-6 animate-slideDown">
          <div className="bg-white rounded-lg shadow-2xl border-2 border-green-500 p-4 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Application Received!</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Thank you for your interest in partnering with ZyraTech. We have received your application and will get back to you within 2-5 working days.
                </p>
              </div>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <PartnershipHero />
      <ImpactStats />
    
      <WhyPartner />
      <PartnersRecognition />
        <PartnershipStories />
        

      <PartnershipCTA />
      <PartnershipFAQ />
      
      <HrContactSection/>
      <NewsletterHero/>
    </div>
  );
};

export default PartnershipPage;
