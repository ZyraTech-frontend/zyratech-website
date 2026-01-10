import React from 'react';
import TrainingNavbar from '../../../../../components/TrainingNavbar';
import InternshipProgramsPage from '../../../../../components/pages/training/InternshipProgramsPage';

const InternshipProgramsRoute = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TrainingNavbar />
      <div className="flex-grow">
        <InternshipProgramsPage />
      </div>
    </div>
  );
};

export default InternshipProgramsRoute;
