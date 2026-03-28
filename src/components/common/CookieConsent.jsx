import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-6 max-w-xs z-50 border border-gray-200">
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="text-sm text-gray-700">
            We use cookies to understand how you use our site and to improve your experience.
          </p>
        </div>
        <button
          onClick={handleDecline}
          className="text-gray-400 hover:text-gray-600 transition"
          aria-label="Close cookie banner"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleDecline}
          className="flex-1 px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="flex-1 px-4 py-2 text-sm bg-[#004fa2] text-white rounded-md hover:bg-[#003d7a] transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
