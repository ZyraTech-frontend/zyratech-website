import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import JobApplicationForm from '../../../components/pages/jobs/JobApplicationForm';
import jobsService from '../../../services/jobsService';
import useSEO from '../../../hooks/useSEO';

const JobApplicationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadJob = async () => {
      try {
        setError(null);
        // Fetch job from backend API
        const jobData = await jobsService.getJob(id);
        if (isMounted) {
          setJob(jobData);
        }
      } catch (err) {
        console.error('Failed to fetch job:', err);
        if (isMounted) {
          setError('Job not found or could not be loaded.');
          setJob(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadJob();
    return () => { isMounted = false; };
  }, [id]);

  useSEO({
    title: job ? `Apply - ${job.title}` : 'Apply for Job',
    description: 'Apply for a position at Zyra Tech Hub. Submit your application and join our team of innovators building Ghana\'s digital future.',
    url: id ? `/jobs/${id}/apply` : '/jobs',
    keywords: 'job application, apply for job, Zyra Tech Hub careers, tech jobs Ghana'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {loading ? (
        <section className="py-12">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-[#004fa2]/20 border-t-[#004fa2] rounded-full animate-spin"></div>
          </div>
        </section>
      ) : error || !job ? (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-800 font-medium mb-4">{error || 'Job not found'}</p>
              <button onClick={() => navigate('/jobs')} className="text-[#004fa2] font-medium hover:underline">
                ← Back to all jobs
              </button>
            </div>
          </div>
        </section>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default JobApplicationPage;
