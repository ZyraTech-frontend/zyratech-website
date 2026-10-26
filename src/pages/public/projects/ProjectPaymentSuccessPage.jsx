import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, ArrowRight, GraduationCap, Briefcase, Building2 } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import useSEO from '../../../hooks/useSEO';

const ProjectPaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useSEO({
    title: 'Payment Successful',
    description: 'Your project deposit payment has been confirmed.',
    url: '/projects/payment-success'
  });

  // Get payment details from location state
  const projectTitle = location.state?.projectTitle || 'Your Project';
  const amount = location.state?.amount || '0.00';
  const paymentMethod = location.state?.paymentMethod || 'Card';
  const transactionId = location.state?.transactionId || 'N/A';
  const applicantName = location.state?.applicantName || 'Valued Client';
  const applicantEmail = location.state?.applicantEmail || '';
  const projectType = location.state?.projectType || 'business-projects';

  const getProjectIcon = () => {
    switch (projectType) {
      case 'student-projects':
        return GraduationCap;
      case 'business-projects':
        return Briefcase;
      case 'enterprise':
        return Building2;
      default:
        return Briefcase;
    }
  };

  const ProjectIcon = getProjectIcon();

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you, <span className="font-semibold text-gray-900">{applicantName}</span>! Your deposit of <span className="font-bold text-green-600">GHS {amount}</span> has been confirmed.
            </p>
          </div>

          {/* Payment Details Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 py-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <ProjectIcon size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">{projectTitle}</h2>
                <p className="text-green-100 text-sm capitalize">{projectType.replace(/-/g, ' ')}</p>
              </div>
            </div>

            {/* Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                  <p className="font-mono text-sm font-semibold text-gray-900">{transactionId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                  <p className="font-semibold text-gray-900">{paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Deposit Amount</p>
                  <p className="text-2xl font-bold text-green-600">GHS {amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-semibold text-gray-900">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>

              {/* Receipt Email Notice */}
              {applicantEmail && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Receipt Sent</p>
                    <p className="text-xs text-blue-700 mt-1">
                      A payment receipt has been sent to <span className="font-mono font-semibold">{applicantEmail}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* What's Next Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What Happens Next?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#004fa2] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Project Review (1-2 Business Days)</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Our team will review your project requirements and prepare a detailed proposal.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#004fa2] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Initial Consultation</p>
                  <p className="text-sm text-gray-600 mt-1">
                    We'll schedule a meeting to discuss your vision, timeline, and technical specifications.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#004fa2] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Development Kickoff</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Once approved, we'll begin development with regular progress updates throughout.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Download size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900">Save Your Receipt</p>
                <p className="text-xs text-amber-700 mt-1">
                  Keep your transaction ID <span className="font-mono font-semibold">{transactionId}</span> for your records. You'll need it for any payment inquiries.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/projects')}
              className="flex-1 flex items-center justify-center gap-2 bg-[#004fa2] text-white px-6 py-4 rounded-xl hover:bg-[#003d7a] transition-all font-semibold shadow-lg hover:shadow-xl"
            >
              View Our Projects
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold"
            >
              Return to Home
            </button>
          </div>

          {/* Contact Support */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Questions about your project?{' '}
              <a href="/contact" className="text-[#004fa2] font-semibold hover:underline">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProjectPaymentSuccessPage;
