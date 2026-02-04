/**
 * LoadingSpinner Component
 * Full-page loading indicator
 */

import React from 'react';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">{text}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
