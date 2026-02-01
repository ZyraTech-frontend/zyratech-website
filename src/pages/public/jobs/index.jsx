import React from 'react';
import JobsHero from '../../../components/pages/jobs/JobsHero';
import JobsList from '../../../components/pages/jobs/JobsList';

const JobsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <JobsHero />
      <JobsList />
    </div>
  );
};

export default JobsPage;
