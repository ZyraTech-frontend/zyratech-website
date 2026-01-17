import React from 'react';
import TrainingNavbar from './TrainingNavbar';

const TrainingLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TrainingNavbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default TrainingLayout;
