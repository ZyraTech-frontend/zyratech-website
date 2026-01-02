import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TrainingLayout from '../components/TrainingLayout';
import TrainingPage from './pages/public/training';
import CourseDetailPage from './pages/public/training/CourseDetailPage';

const TrainingApp = () => {
  return (
    <TrainingLayout>
      <Routes>
        <Route path="/" element={<TrainingPage />} />
        <Route path="/course/:courseId" element={<CourseDetailPage />} />
      </Routes>
    </TrainingLayout>
  );
};

export default TrainingApp;
