import React from 'react';
import TrainingNavbar from '../../../components/TrainingNavbar';
import TrainingAbout from '../../../components/pages/training/TrainingAbout';
import TrainingHero from '../../../components/pages/training/TrainingHero';
import TrainingBenefits from '../../../components/pages/training/TrainingBenefits';
import TrainingProcess from '../../../components/pages/training/TrainingProcess';
import TrainingSuccess from '../../../components/pages/training/TrainingSuccess';
import TrainingEnrollment from '../../../components/pages/training/TrainingEnrollment';
import TrainingContact from '../../../components/pages/training/TrainingContact';

const TrainingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TrainingNavbar />
      <div className="flex-grow">
        <TrainingHero />
        <TrainingAbout />
        <TrainingBenefits />
        <TrainingProcess />
        <TrainingSuccess />
        <TrainingEnrollment />
        <TrainingContact />
      </div>
    </div>
  );
};

export default TrainingPage;
