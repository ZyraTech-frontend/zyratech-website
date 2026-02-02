import React from 'react';
import JobsHero from '../../../components/pages/jobs/JobsHero';
import JobsList from '../../../components/pages/jobs/JobsList';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import HrContactSection from '../../../components/common/HrContactSection';

const JobsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <JobsHero />
      <JobsList />
      <HrContactSection />
      <NewsletterHero />

    </div>
  );
};

export default JobsPage;
