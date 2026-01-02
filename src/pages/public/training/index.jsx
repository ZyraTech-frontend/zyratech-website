import React from 'react';
import TrainingNavbar from '../../../components/TrainingNavbar';
import TrainingHero from '../../../components/pages/training/TrainingHero';
import TrainingPrograms from '../../../components/pages/training/TrainingPrograms';
import TrainingBenefits from '../../../components/pages/training/TrainingBenefits';
import TrainingProcess from '../../../components/pages/training/TrainingProcess';
import TrainingSuccess from '../../../components/pages/training/TrainingSuccess';
import TrainingEnrollment from '../../../components/pages/training/TrainingEnrollment';
import TrainingContact from '../../../components/pages/training/TrainingContact';

const TrainingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TrainingNavbar />
      <div className="flex-grow">
        <TrainingHero />
        <TrainingPrograms />
        <TrainingBenefits />
        <TrainingProcess />
        <TrainingSuccess />
        <TrainingEnrollment />
        <TrainingContact />
      </div>
      {/* Simple Training Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/zyratecpng.png" 
                alt="Zyra Tech Hub" 
                className="h-8 w-auto object-contain"
              />
              <span className="ml-3 text-xl font-bold">Training</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional Training Programs for Modern Tech Skills
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="/training#contact" className="hover:text-white transition-colors">Contact</a>
              <a href="/training#enrollment" className="hover:text-white transition-colors">Enrollment</a>
              <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Main Site</a>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
              © 2024 Zyra Tech Hub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrainingPage;
