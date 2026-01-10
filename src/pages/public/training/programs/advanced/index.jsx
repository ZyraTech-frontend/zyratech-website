import React from 'react';
import TrainingNavbar from '../../../../../components/TrainingNavbar';
import AdvancedProgramsPage from '../../../../../components/pages/training/AdvancedProgramsPage';

const AdvancedProgramsRoute = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TrainingNavbar />
      <div className="flex-grow">
        <AdvancedProgramsPage />
      </div>
    </div>
  );
};

export default AdvancedProgramsRoute;
