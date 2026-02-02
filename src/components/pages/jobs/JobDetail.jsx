import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Linkedin, Facebook, Twitter, Mail, Copy } from 'lucide-react';
import { jobsData } from '../../../data/jobsData';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobsData.find(j => j.id === parseInt(id));
  const [showCopied, setShowCopied] = useState(false);

  if (!job) return <div className="text-center py-12">Job not found</div>;

  const otherJobs = jobsData.filter(j => j.id !== job.id);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-[#004fa2] text-white py-3 sm:py-4 px-4 sm:px-6 z-40">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
          <div>
            <h2 className="text-lg sm:text-xl font-bold">{job.title}</h2>
            <p className="text-gray-300 text-xs sm:text-sm">Remote / Hybrid / On-site • {job.type}</p>
          </div>
          <button 
            onClick={() => navigate(`/jobs/${id}/apply`)}
            className="bg-white text-[#004fa2] px-4 sm:px-8 py-2 rounded hover:bg-gray-100 font-medium text-sm border border-white self-start sm:self-auto"
          >
            I'm interested
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Main Content - Full width on mobile, 3 columns on desktop */}
          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            <section>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-3 sm:mb-4">Company Description</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{job.companyDescription}</p>
            </section>

            <section>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-3 sm:mb-4">Job Description</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{job.jobDescription}</p>
            </section>

            <section>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-3 sm:mb-4">Key Responsibilities</h3>
              <ul className="space-y-2 sm:space-y-3">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="text-sm sm:text-base text-gray-700 flex gap-2 sm:gap-3">
                    <span className="text-[#004fa2] font-bold mt-1 text-xs sm:text-sm">•</span>
                    <span className="leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-3 sm:mb-4">Qualifications</h3>
              <ul className="space-y-2 sm:space-y-3">
                {job.qualifications.map((qual, i) => (
                  <li key={i} className="text-sm sm:text-base text-gray-700 flex gap-2 sm:gap-3">
                    <span className="text-[#004fa2] font-bold mt-1 text-xs sm:text-sm">•</span>
                    <span className="leading-relaxed">{qual}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-3 sm:mb-4">Perks</h3>
              <ul className="space-y-2 sm:space-y-3">
                {job.perks.map((perk, i) => (
                  <li key={i} className="text-sm sm:text-base text-gray-700 flex gap-2 sm:gap-3">
                    <span className="text-[#004fa2] font-bold mt-1 text-xs sm:text-sm">•</span>
                    <span className="leading-relaxed">{perk}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t pt-6 sm:pt-8">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-4 sm:mb-6">Additional Information</h3>
              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base">
                <div>
                  <h4 className="font-bold text-black mb-2 sm:mb-3 text-base sm:text-lg">How To Apply</h4>
                  <p className="text-gray-700 leading-relaxed">Interested and qualified applicants should click the "I'm interested" to complete the application process.</p>
                </div>
                <div>
                  <p className="text-gray-700 mb-2 sm:mb-3 leading-relaxed">Ensure you have these documents before applying:</p>
                  <ul className="space-y-1 sm:space-y-2 ml-3 sm:ml-4">
                    <li className="text-gray-700 leading-relaxed">• Latest copy of CV (PDF format)</li>
                    <li className="text-gray-700 leading-relaxed">• Other related certificates (optional)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-black mb-2 sm:mb-3 text-base sm:text-lg">Recruitment Process:</h4>
                  <ol className="space-y-1 sm:space-y-2 ml-3 sm:ml-4">
                    <li className="text-gray-700 leading-relaxed">1. Click "I'm interested" to apply</li>
                    <li className="text-gray-700 leading-relaxed">2. Invitation to Interview(s)</li>
                    <li className="text-gray-700 leading-relaxed">3. Job Offer</li>
                  </ol>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar - Full width on mobile, 1 column on desktop */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Quick Info Card */}
            <div className="border-l-4 border-[#004fa2] bg-[#004fa2]/5 p-3 sm:p-4 rounded">
              <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm">QUICK INFO</h4>
              <div className="space-y-1.5 sm:space-y-2 text-xs">
                <div>
                  <span className="text-gray-600">Employment Type:</span>
                  <p className="font-medium text-gray-900">{job.type}</p>
                </div>
                <div>
                  <span className="text-gray-600">Work Arrangement:</span>
                  <p className="font-medium text-gray-900">Remote / Hybrid / On-site</p>
                </div>
              </div>
            </div>

            {/* Refer a Friend */}
            <div className="bg-[#004fa2]/10 p-3 sm:p-4 rounded border border-[#004fa2]/20">
              <h4 className="font-bold text-gray-900 mb-1.5 sm:mb-2 text-xs sm:text-sm">KNOW SOMEONE?</h4>
              <p className="text-xs text-gray-700 mb-2 sm:mb-3">Help innovators join ZyraTech and transform communities</p>
              <button className="w-full bg-[#004fa2] text-white py-1.5 sm:py-2 rounded text-xs font-medium hover:bg-[#003d7a] transition-colors">
                Refer a Friend
              </button>
            </div>

            {/* Share Section */}
            <div className="p-3 sm:p-4 rounded border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm">SHARE WITH YOUR NETWORK</h4>
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded border border-gray-200 transition-colors"><Linkedin className="w-3 h-3 sm:w-4 sm:h-4" /></button>
                <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded border border-gray-200 transition-colors"><Facebook className="w-3 h-3 sm:w-4 sm:h-4" /></button>
                <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded border border-gray-200 transition-colors"><Twitter className="w-3 h-3 sm:w-4 sm:h-4" /></button>
                <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded border border-gray-200 transition-colors"><Mail className="w-3 h-3 sm:w-4 sm:h-4" /></button>
                <button onClick={handleCopyLink} className="p-1.5 sm:p-2 hover:bg-gray-100 rounded border border-gray-200 relative transition-colors">
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                  {showCopied && <span className="text-xs absolute -top-6 sm:-top-8 left-0 bg-gray-900 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded whitespace-nowrap">Copied!</span>}
                </button>
              </div>
            </div>

            {/* Similar Roles */}
            <div className="p-3 sm:p-4 rounded bg-gray-50">
              <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm">SIMILAR ROLES</h4>
              <div className="space-y-1.5 sm:space-y-2">
                {otherJobs.slice(0, 2).map(otherJob => (
                  <button
                    key={otherJob.id}
                    onClick={() => navigate(`/jobs/${otherJob.id}`)}
                    className="text-left hover:text-[#004fa2] transition-colors w-full p-1.5 sm:p-2 hover:bg-white rounded"
                  >
                    <p className="font-medium text-gray-900 text-xs">{otherJob.title}</p>
                    <p className="text-xs text-gray-600">{otherJob.locations?.[0] || 'Remote'}</p>
                  </button>
                ))}
              </div>
              <button onClick={() => navigate('/jobs')} className="text-[#004fa2] font-medium text-xs mt-2 sm:mt-3 w-full text-center py-1.5 sm:py-2 hover:bg-white rounded transition-colors">
                View All Positions →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
