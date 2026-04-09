import React from 'react';
import { useParams } from 'react-router-dom';
import JobDetail from '../../../components/pages/jobs/JobDetail';
import useSEO from '../../../hooks/useSEO';

const JobDetailPage = () => {
  const { id } = useParams();

  useSEO({
    title: 'Job Details',
    description: 'View job details and requirements at Zyra Tech Hub. Explore exciting career opportunities in technology, training, and digital innovation in Ghana.',
    url: `/jobs/${id}`,
    keywords: 'job details, tech jobs Ghana, career opportunity, Zyra Tech Hub jobs, IT careers'
  });

  return (
    <div className="min-h-screen bg-white">
      <JobDetail />
    </div>
  );
};

export default JobDetailPage;
