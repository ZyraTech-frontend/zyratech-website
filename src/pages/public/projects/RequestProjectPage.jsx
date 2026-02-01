import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import MultiStepForm from '../../../components/pages/projects/MultiStepForm';

const RequestProjectPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#004fa2] to-[#003d7a] text-white py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">Request Custom Project</h1>
          <p className="text-base sm:text-lg md:text-xl font-semibold text-blue-100 leading-relaxed">
            Final year project? Capstone? We'll build it with you.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Info Banner */}
          <div className="bg-blue-50 border-l-4 border-[#004fa2] p-4 mb-8 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Students:</strong> Special rates available for final year and capstone projects. We'll work with your budget and timeline.
            </p>
          </div>

          <MultiStepForm onSubmit={() => navigate('/projects')} />

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Questions? Contact us at <a href="mailto:info@zyratechhub.com" className="text-[#004fa2] hover:underline">info@zyratechhub.com</a></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RequestProjectPage;
