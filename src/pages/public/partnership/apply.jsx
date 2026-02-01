import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const PartnershipApplicationPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Partnership Application</h1>
        <p className="text-lg text-gray-600 mb-8">Tell us about your organization and partnership interests.</p>
        {/* Application form will be added here */}
      </div>
      <Footer />
    </div>
  );
};

export default PartnershipApplicationPage;

