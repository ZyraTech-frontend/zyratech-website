import React from 'react';
import TrainingNavbar from '../../../components/TrainingNavbar';
import CourseApplicationForm from '../../../components/pages/training/CourseApplicationForm';

const CourseApplicationPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TrainingNavbar />
      <div className="flex-grow">
        <CourseApplicationForm />
      </div>
    </div>
  );
};

export default CourseApplicationPage;
