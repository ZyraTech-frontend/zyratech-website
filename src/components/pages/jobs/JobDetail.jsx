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
      <div className="sticky top-0 bg-gray-800 text-white py-4 px-4 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p className="text-gray-300 text-sm">{job.locations.join(' / ')} • {job.type}</p>
          </div>
          <button className="bg-[#004fa2] text-white px-8 py-2 rounded hover:bg-[#003d7a] font-medium">
            I'm interested
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-4 gap-8">
          {/* Main Content - 3 columns */}
          <div className="col-span-3 space-y-8">
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Company Description</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{job.companyDescription}</p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Job Description</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{job.jobDescription}</p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Key Responsibilities</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="text-gray-700 text-sm flex gap-2">
                    <span className="text-[#004fa2] font-bold">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Qualifications</h3>
              <ul className="space-y-2">
                {job.qualifications.map((qual, i) => (
                  <li key={i} className="text-gray-700 text-sm flex gap-2">
                    <span className="text-[#004fa2] font-bold">•</span>
                    <span>{qual}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Perks</h3>
              <ul className="space-y-2">
                {job.perks.map((perk, i) => (
                  <li key={i} className="text-gray-700 text-sm flex gap-2">
                    <span className="text-[#004fa2] font-bold">•</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t pt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Information</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 underline">How To Apply</h4>
                  <p className="text-gray-700">Interested and qualified applicants should click the "I'm interested" to complete the application process.</p>
                </div>
                <div>
                  <p className="text-gray-700 mb-2">Ensure you have these documents before applying:</p>
                  <ul className="space-y-1 ml-4">
                    <li className="text-gray-700">• Latest copy of CV (PDF format)</li>
                    <li className="text-gray-700">• Other related certificates (optional)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 underline">Recruitment Process:</h4>
                  <ol className="space-y-1 ml-4">
                    <li className="text-gray-700">1. Click "I'm interested" to apply</li>
                    <li className="text-gray-700">2. Invitation to Interview(s)</li>
                    <li className="text-gray-700">3. Job Offer</li>
                  </ol>
                </div>
              </div>
            </section>

            <button className="w-full bg-[#004fa2] text-white py-3 rounded font-bold hover:bg-[#003d7a] text-sm">
              I'm interested
            </button>
          </div>

          {/* Sidebar - 1 column */}
          <div className="col-span-1 space-y-6">
            {/* Quick Info Card */}
            <div className="border-l-4 border-[#004fa2] bg-[#004fa2]/5 p-4 rounded">
              <h4 className="font-bold text-gray-900 mb-3 text-sm">QUICK INFO</h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-gray-600">Employment Type:</span>
                  <p className="font-medium text-gray-900">{job.type}</p>
                </div>
                <div>
                  <span className="text-gray-600">Locations:</span>
                  <p className="font-medium text-gray-900">{job.locations.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Refer a Friend */}
            <div className="bg-[#004fa2]/10 p-4 rounded border border-[#004fa2]/20">
              <h4 className="font-bold text-gray-900 mb-2 text-sm">KNOW SOMEONE?</h4>
              <p className="text-xs text-gray-700 mb-3">Help innovators join ZyraTech and transform communities</p>
              <button className="w-full bg-[#004fa2] text-white py-2 rounded text-xs font-medium hover:bg-[#003d7a]">
                Refer a Friend
              </button>
            </div>

            {/* Share Section */}
            <div className="p-4 rounded border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3 text-sm">SHARE WITH YOUR NETWORK</h4>
              <div className="flex gap-2 flex-wrap">
                <button className="p-2 hover:bg-gray-100 rounded border border-gray-200"><Linkedin className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-gray-100 rounded border border-gray-200"><Facebook className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-gray-100 rounded border border-gray-200"><Twitter className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-gray-100 rounded border border-gray-200"><Mail className="w-4 h-4" /></button>
                <button onClick={handleCopyLink} className="p-2 hover:bg-gray-100 rounded border border-gray-200 relative">
                  <Copy className="w-4 h-4" />
                  {showCopied && <span className="text-xs absolute -top-8 left-0 bg-gray-900 text-white px-2 py-1 rounded whitespace-nowrap">Copied!</span>}
                </button>
              </div>
            </div>

            {/* Similar Roles */}
            <div className="p-4 rounded bg-gray-50">
              <h4 className="font-bold text-gray-900 mb-3 text-sm">SIMILAR ROLES</h4>
              <div className="space-y-2">
                {otherJobs.slice(0, 2).map(otherJob => (
                  <button
                    key={otherJob.id}
                    onClick={() => navigate(`/jobs/${otherJob.id}`)}
                    className="text-left hover:text-[#004fa2] transition-colors w-full p-2 hover:bg-white rounded"
                  >
                    <p className="font-medium text-gray-900 text-xs">{otherJob.title}</p>
                    <p className="text-xs text-gray-600">{otherJob.locations[0]}</p>
                  </button>
                ))}
              </div>
              <button onClick={() => navigate('/jobs')} className="text-[#004fa2] font-medium text-xs mt-3 w-full text-center py-2 hover:bg-white rounded">
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
