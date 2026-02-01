import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import MultiStepForm from '../../../components/pages/projects/MultiStepForm';
import Footer from '../../../components/Footer';

const ProjectRequestPage = () => {
  const navigate = useNavigate();

  const handleFormSubmit = () => {
    // Keep the thank you message visible
    setTimeout(() => {
      navigate('/projects');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Submit Your Project Idea</h1>
          <p className="text-lg text-gray-600">Tell us about your project and let's build something amazing together.</p>
        </div>
        <MultiStepForm onSubmit={handleFormSubmit} />
      </div>
      <Footer />
    </div>
  );
};

export default ProjectRequestPage;
