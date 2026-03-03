import React from 'react';
import TrainingLayout from '../../../components/TrainingLayout';
import CourseApplicationForm from '../../../components/pages/training/CourseApplicationForm';
import useSEO from '../../../hooks/useSEO';

const CourseApplicationPage = () => {
  useSEO({
    title: 'Course Application',
    description: 'Apply for a training course at Zyra Tech Hub. Enroll in hands-on digital skills programs and kickstart your tech career in Ghana.',
    url: '/training',
    keywords: 'course application, enroll training, apply for course, Zyra Tech Hub enrollment'
  });

  return (
    <TrainingLayout>
      <CourseApplicationForm />
    </TrainingLayout>
  );
};

export default CourseApplicationPage;
