import React from 'react';

const MapSection = () => {
  return (
    <section className="pt-4 pb-12 bg-white from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4">
          Visit Our Location
        </h2>
        <p className="text-base text-gray-600 max-w-2xl">
          Located in the heart of Ghana's innovation district. We welcome visits for tours, meetings, and collaboration discussions.
        </p>
      </div>

      <div className="bg-white border-y border-gray-200 shadow-lg overflow-hidden">
        
        {/* Map Container */}
        <div className="relative h-80 md:h-96 bg-gray-100">
          <iframe
            src="https://www.google.com/maps?q=Zyra%20Tech%20Hub%2C%20Koforidua%2C%20Ghana&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="Zyra Tech Hub Location in Ghana"
          ></iframe>
        </div>

        {/* Location Details Bar */}
        <div className="bg-white p-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Zyra Tech Hub</h3>
                <p className="text-base text-gray-600">Koforidua, Eastern Region, Ghana</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://maps.app.goo.gl/GUM8jHMNA1q3vUDr5?g_st=atm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
                >
                  Get Directions
                </a>
                <button className="bg-[#004fa2] text-white hover:bg-[#003a7a] px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Schedule Visit
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MapSection;


