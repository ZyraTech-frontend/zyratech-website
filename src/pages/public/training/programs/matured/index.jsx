import React from 'react';
import TrainingNavbar from '../../../../../components/TrainingNavbar';
import MaturedProgramsPage from '../../../../../components/pages/training/MaturedProgramsPage';

const MaturedProgramsRoute = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TrainingNavbar />
      <div className="flex-grow">
        <MaturedProgramsPage />
      </div>
    </div>
  );
};

export default MaturedProgramsRoute;
