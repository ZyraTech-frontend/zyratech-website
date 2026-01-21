import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Page not found</h1>
        <p className="text-gray-600 mb-6">The page you’re looking for doesn’t exist. It may have been moved or the link is outdated.</p>
        <Link to="/" className="cta-btn inline-block px-6 py-3 rounded-lg font-semibold">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
