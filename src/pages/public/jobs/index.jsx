import React from 'react';
import JobsHero from '../../../components/pages/jobs/JobsHero';
import JobsList from '../../../components/pages/jobs/JobsList';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import HrContactSection from '../../../components/common/HrContactSection';
import useSEO from '../../../hooks/useSEO';

const JobsPage = () => {
  useSEO({
    title: 'Career Opportunities',
    description: 'Join the Zyra Tech Hub team in Koforidua, Ghana. Explore career opportunities in tech education, IT services, and community development.',
    url: '/jobs',
    keywords: 'tech jobs Ghana, Koforidua jobs, IT careers Ghana, tech education jobs'
  });

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
