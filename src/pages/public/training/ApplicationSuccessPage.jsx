import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Mail, MessageSquare, Calendar, ChevronRight } from 'lucide-react';
import TrainingNavbar from '../../../components/TrainingNavbar';

const ApplicationSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const applicantName = location.state?.applicantName;
  const courseTitle = location.state?.courseTitle;

  const details = {
    referenceNumber: 'TR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    estimatedResponse: 'Within 24-72 hours'
  };

  const nextSteps = [
    {
      icon: Mail,
      title: 'We received your application',
      description: 'Our admissions team will review your details.',
      color: '#004fa2'
    },
    {
      icon: MessageSquare,
      title: 'We will contact you',
      description: 'Expect an email or WhatsApp message with next steps.',
      color: '#004fa2'
    },
    {
      icon: Calendar,
      title: 'Start date & onboarding',
      description: 'If accepted, you will receive schedule and onboarding information.',
      color: '#000000'
    }
  ];

  return (
    <div className="min-h-screen bg-white from-gray-50 to-white">
      <TrainingNavbar />

      <section className="pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white from-green-50 to-green-100 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle size={56} className="text-green-600" strokeWidth={2.5} />
              </div>
              <div className="absolute inset-0 w-24 h-24 border-4 border-green-200 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>

          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-4">
              Application Received
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            {applicantName ? `Thank You, ${applicantName}!` : 'Thank You for Applying!'}
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {courseTitle
              ? `Your application for ${courseTitle} has been submitted successfully.`
              : 'Your training application has been submitted successfully.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <button
              onClick={() => navigate('/training/programs')}
              className="bg-[#004fa2] hover:bg-[#000000] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 inline-flex items-center justify-center gap-2"
            >
              View Other Programs
              <ChevronRight size={18} />
            </button>

            <button
              onClick={() => navigate('/')}
              className="border-2 border-[#004fa2] text-[#004fa2] hover:bg-[#004fa2] hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 inline-flex items-center justify-center gap-2"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
              <h2 className="text-xl font-bold text-black mb-6">Application Details</h2>

              <div className="space-y-4">
                <div className="flex justify-between items-start pb-4 border-b border-gray-200">
                  <span className="text-sm font-semibold text-gray-700">Reference Number</span>
                  <span className="text-sm text-gray-500 font-mono">{details.referenceNumber}</span>
                </div>

                <div className="flex justify-between items-start pb-4 border-b border-gray-200">
                  <span className="text-sm font-semibold text-gray-700">Expected Response</span>
                  <span className="text-sm text-gray-600">{details.estimatedResponse}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">Tip:</span> If you don’t hear from us within 72 hours, please reach out via the training contact page.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
              <h2 className="text-xl font-bold text-black mb-6">What Happens Next</h2>

              <div className="space-y-6">
                {nextSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${step.color}15`, border: `2px solid ${step.color}30` }}
                        >
                          <IconComponent size={24} style={{ color: step.color }} />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-base font-bold text-black mb-1">{step.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => navigate('/training/contact')}
                  className="w-full bg-[#004fa2] hover:bg-[#000000] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2"
                >
                  Contact Training Team
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplicationSuccessPage;
