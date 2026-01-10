import React from 'react';
import TrainingNavbar from '../../../../../components/TrainingNavbar';
import IntermediateProgramsPage from '../../../../../components/pages/training/IntermediateProgramsPage';

const IntermediateProgramsRoute = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TrainingNavbar />
      <div className="flex-grow">
        <IntermediateProgramsPage />
      </div>
    </div>
  );
};

export default IntermediateProgramsRoute;
