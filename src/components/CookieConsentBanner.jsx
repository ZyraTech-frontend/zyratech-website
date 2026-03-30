import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings } from 'lucide-react';

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookies, setCookies] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false
  });

  // Check if user has already made a choice
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      const parsed = JSON.parse(savedConsent);
      setCookies(parsed);
    }
  }, []);

  // Save consent preferences
  const saveCookiePreferences = (preferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setCookies(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  // Accept All
  const handleAcceptAll = () => {
    saveCookiePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    });
  };

  // Reject All (except necessary)
  const handleRejectAll = () => {
    saveCookiePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    });
  };

  // Save Individual Preferences
  const handleSavePreferences = () => {
    saveCookiePreferences(cookies);
  };

  const handleCookieToggle = (type) => {
    if (type !== 'necessary') {
      setCookies(prev => ({
        ...prev,
        [type]: !prev[type]
      }));
    }
  };

  return (
    <AnimatePresence>
      {/* Main Compact Banner - Bottom Right */}
      {showBanner && !showSettings && (
        <motion.div
          initial={{ opacity: 0, x: 400, y: 100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 400, y: 100 }}
          transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
          className="fixed bottom-4 right-4 z-50 w-64 sm:w-72 md:w-80 max-h-[70vh] overflow-y-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/80 p-3 sm:p-4 space-y-2 sm:space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-gray-900 text-sm">🍪 Cookies</h3>
              <button
                onClick={() => setShowBanner(false)}
                className="p-1 hover:bg-gray-100 rounded transition flex-shrink-0"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 leading-tight hidden sm:block">
              We use cookies to make your experience better. Some are essential for the site to work, while others help us understand how you use ZyraTech and improve what we offer.
            </p>
            <p className="text-xs text-gray-600 leading-tight sm:hidden">
              We use cookies to improve your experience.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-col gap-1.5 sm:gap-2 pt-1 sm:pt-2">
              <button
                onClick={handleAcceptAll}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-1.5 sm:py-2 px-3 rounded-lg text-xs transition transform hover:scale-105 active:scale-95"
                title="We'll use all cookies to give you the best experience"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectAll}
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-1.5 sm:py-2 px-3 rounded-lg text-xs transition active:scale-95"
                title="Only essential cookies—site still works fine"
              >
                Reject All
              </button>
            </div>

            {/* Customize Button */}
            <button
              onClick={() => setShowSettings(true)}
              className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-xs py-1 transition"
              title="Pick exactly which cookies you want to allow"
            >
              <Settings size={14} />
              Customize
            </button>

            {/* Footer Link */}
            <p className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
              <a href="/privacy" className="text-blue-600 hover:underline">Learn more</a>
            </p>
          </div>
        </motion.div>
      )}

      {/* Settings Modal - Compact Right Side */}
      {showSettings && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowSettings(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50 w-64 sm:w-72 md:w-80 max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 sm:p-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 hover:bg-gray-100 rounded transition"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            {/* Cookie Types with Toggle */}
            <div className="space-y-2 mb-3 sm:mb-4 max-h-96 overflow-y-auto">
              {/* Necessary */}
              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="mt-1 w-4 h-4 cursor-not-allowed accent-blue-600 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <label className="font-semibold text-gray-900 text-xs block">Necessary</label>
                  <p className="text-xs text-gray-600 mt-0.5">For the site to work</p>
                  <p className="text-xs text-gray-500 mt-1 hidden sm:block">These help the site function—load pages, remember login sessions, process forms. You can't turn these off.</p>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-blue-50 rounded-lg border border-gray-200 cursor-pointer transition"
                onClick={() => handleCookieToggle('analytics')}
              >
                <input
                  type="checkbox"
                  checked={cookies.analytics}
                  onChange={() => handleCookieToggle('analytics')}
                  className="mt-1 w-4 h-4 cursor-pointer accent-blue-600 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <label className="font-semibold text-gray-900 text-xs block cursor-pointer">Analytics</label>
                  <p className="text-xs text-gray-600 mt-0.5">See how you use us</p>
                  <p className="text-xs text-gray-500 mt-1 hidden sm:block">Helps us track which pages you visit, how long you stay, and what you click on. We use this to see what works and what doesn't, so we can improve the site for you.</p>
                </div>
              </div>

              {/* Marketing */}
              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-blue-50 rounded-lg border border-gray-200 cursor-pointer transition"
                onClick={() => handleCookieToggle('marketing')}
              >
                <input
                  type="checkbox"
                  checked={cookies.marketing}
                  onChange={() => handleCookieToggle('marketing')}
                  className="mt-1 w-4 h-4 cursor-pointer accent-blue-600 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <label className="font-semibold text-gray-900 text-xs block cursor-pointer">Marketing</label>
                  <p className="text-xs text-gray-600 mt-0.5">Relevant stuff for you</p>
                  <p className="text-xs text-gray-500 mt-1 hidden sm:block">Lets us show you ads and content that match your interests. If you decline, you'll still see ads, just random ones. This helps us reach people interested in what we do.</p>
                </div>
              </div>

              {/* Preferences */}
              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-blue-50 rounded-lg border border-gray-200 cursor-pointer transition"
                onClick={() => handleCookieToggle('preferences')}
              >
                <input
                  type="checkbox"
                  checked={cookies.preferences}
                  onChange={() => handleCookieToggle('preferences')}
                  className="mt-1 w-4 h-4 cursor-pointer accent-blue-600 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <label className="font-semibold text-gray-900 text-xs block cursor-pointer">Preferences</label>
                  <p className="text-xs text-gray-600 mt-0.5">Remember your choices</p>
                  <p className="text-xs text-gray-500 mt-1 hidden sm:block">Remembers settings like your language, theme, and other preferences so you don't have to set them again next time you visit.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-1.5 sm:gap-2 pt-2 sm:pt-3 border-t border-gray-200">
              <button
                onClick={handleSavePreferences}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-1.5 sm:py-2 px-3 rounded-lg text-xs transition active:scale-95"
                title="Save only the cookies you selected above"
              >
                Save
              </button>
              <button
                onClick={handleAcceptAll}
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-1.5 sm:py-2 px-3 rounded-lg text-xs transition active:scale-95"
                title="Enable all cookies and close"
              >
                Accept All
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;
