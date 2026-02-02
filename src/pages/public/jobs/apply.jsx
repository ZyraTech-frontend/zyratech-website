import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import JobApplicationForm from '../../../components/pages/jobs/JobApplicationForm';
import { jobsData } from '../../../data/jobsData';

const JobApplicationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobsData.find(j => j.id === parseInt(id));

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-12">Job not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Form Section */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Easy Apply</h1>
            <p className="text-gray-600 text-sm sm:text-base">Apply for {job.title} - Remote / Hybrid / On-site</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">Choose an option to autocomplete your application. You can still fill your profile manually.</p>
          </div>

          <JobApplicationForm 
            job={job} 
            onSubmit={() => navigate(`/jobs/${id}`)} 
          />

          {/* Additional Info */}
          <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600">
            <p>Questions? Contact us at <a href="mailto:info@zyratechhub.com" className="text-[#004fa2] hover:underline">info@zyratechhub.com</a></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobApplicationPage;