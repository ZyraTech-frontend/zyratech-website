import React from 'react';

const TrainingLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {children}
      </main>
      {/* Training Footer - simpler than main site */}
      <footer className="bg-gray-900 text-white py-12">
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
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
              © 2024 Zyra Tech Hub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TrainingLayout;
