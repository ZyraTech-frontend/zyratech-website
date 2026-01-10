import React from 'react';
import TrainingNavbar from '../../../../../components/TrainingNavbar';
import BasicProgramsPage from '../../../../../components/pages/training/BasicProgramsPage';

const BasicProgramsRoute = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TrainingNavbar />
      <div className="flex-grow">
        <BasicProgramsPage />
      </div>
    </div>
  );
};

export default BasicProgramsRoute;
