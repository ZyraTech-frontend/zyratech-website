import React from 'react';
import TrainingNavbar from '../../../../components/TrainingNavbar';
import ProgramsPage from '../../../../components/pages/training/ProgramsPage';

const ProgramsRoute = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TrainingNavbar />
      <div className="flex-grow">
        <ProgramsPage />
      </div>
    </div>
  );
};

export default ProgramsRoute;
