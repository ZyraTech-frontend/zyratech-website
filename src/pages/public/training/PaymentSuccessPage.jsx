import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle, Mail, Calendar, Download, ChevronRight, 
  GraduationCap, Clock, User, CreditCard, ArrowRight,
  MessageSquare, Phone
} from 'lucide-react';
import TrainingLayout from '../../../components/TrainingLayout';
import useSEO from '../../../hooks/useSEO';

const TrainingPaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useSEO({
    title: 'Payment Successful',
    description: 'Your training program payment has been processed successfully. Welcome to Zyra Tech Hub!'
  });

  const {
    courseTitle = 'Training Program',
    amount = 'GHS 0',
    paymentMethod = 'Card',
    transactionId = 'TXN-XXXXXX',
    applicantName = 'Learner',
    applicantEmail = ''
  } = location.state || {};

  const nextSteps = [
    {
      icon: Mail,
      title: 'Check Your Email',
      description: 'We\'ve sent a confirmation email with your receipt and enrollment details.',
      color: '#004fa2'
    },
    {
      icon: Calendar,
      title: 'Mark Your Calendar',
      description: 'You\'ll receive your cohort schedule and start date within 24 hours.',
      color: '#059669'
    },
    {
      icon: MessageSquare,
      title: 'Join Our Community',
      description: 'Get added to your cohort\'s WhatsApp group for updates and networking.',
      color: '#7c3aed'
    }
  ];

  return (
    <TrainingLayout>
      {/* Success Hero */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[url('/images/image3.png')] bg-cover bg-center opacity-10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle size={56} className="text-green-600" strokeWidth={2.5} />
              </div>
              <div className="absolute inset-0 w-24 h-24 border-4 border-white/30 rounded-full animate-ping"></div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Congratulations, <span className="font-semibold">{applicantName}</span>! Your enrollment in{' '}
            <span className="font-semibold">{courseTitle}</span> is now complete.
          </p>
        </div>
      </section>

      {/* Transaction Details */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Transaction Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden mb-10">
            <div className="bg-gradient-to-r from-[#004fa2] to-[#003d7a] px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GraduationCap size={24} className="text-white" />
                  <span className="text-white font-semibold">Enrollment Confirmed</span>
                </div>
                <span className="text-white/80 text-sm">{new Date().toLocaleDateString('en-GB', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}</span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                  <p className="font-mono font-semibold text-gray-900 bg-gray-100 px-3 py-2 rounded-lg inline-block">
                    {transactionId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    <CreditCard size={18} className="text-[#004fa2]" />
                    {paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Program</p>
                  <p className="font-semibold text-gray-900">{courseTitle}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Amount Paid</p>
                  <p className="font-bold text-2xl text-green-600">{amount}</p>
                </div>
              </div>

              {/* Enrolled As */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-12 h-12 bg-[#004fa2]/10 rounded-full flex items-center justify-center">
                  <User size={24} className="text-[#004fa2]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Enrolled as</p>
                  <p className="font-semibold text-gray-900">{applicantName}</p>
                  {applicantEmail && (
                    <p className="text-sm text-gray-600">{applicantEmail}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">What Happens Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nextSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${step.color}15` }}
                    >
                      <Icon size={24} style={{ color: step.color }} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/training/programs"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-[#004fa2] hover:bg-black text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <GraduationCap size={20} />
              Explore More Programs
            </Link>
            <Link
              to="/training/contact"
              className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 hover:border-[#004fa2] hover:text-[#004fa2] font-semibold rounded-xl transition-all"
            >
              <Phone size={20} />
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* Support Banner */}
      <section className="bg-[#004fa2] py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Need Help?</h3>
              <p className="text-white/80">
                Our training team is here to assist you with any questions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a 
                href="mailto:training@zyratech.com"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#004fa2] font-semibold rounded-lg hover:bg-gray-100 transition-colors w-full sm:w-auto"
              >
                <Mail size={18} />
                Email Us
              </a>
              <a 
                href="https://wa.me/233241234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors w-full sm:w-auto"
              >
                <MessageSquare size={18} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </TrainingLayout>
  );
};

export default TrainingPaymentSuccessPage;
