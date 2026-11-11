import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Lock, Shield, CheckCircle, AlertCircle, ChevronRight,
  GraduationCap, Briefcase, Building2, Clock, DollarSign
} from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import useSEO from '../../../hooks/useSEO';
import { validatePhoneNumber, getPhoneInputAttributes } from '../../../utils/phoneValidation';
import paymentService from '../../../services/paymentService';
import LoadingSpinner from '../../../components/admin/shared/LoadingSpinner';

const ProjectPaymentPage = () => {
  const { projectRequestId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const projectData = location.state?.projectData || {};
  const applicantName = location.state?.name || '';
  const applicantEmail = location.state?.email || '';
  const applicantPhone = location.state?.phone || '';
  const projectTitle = location.state?.projectTitle || '';
  const projectType = location.state?.projectType || 'student-projects';
  const budgetRange = location.state?.budget || '';

  console.log('?? PROJECT PAYMENT PAGE LOADED');
  console.log('?? Project Request ID:', projectRequestId);
  console.log('?? Project Data:', { projectTitle, projectType, budgetRange, applicantName, applicantEmail });

  useSEO({
    title: 'Project Payment - Secure Deposit',
    description: 'Complete your project request payment securely at Zyra Tech Hub.',
    url: projectRequestId ? `/projects/payment/${projectRequestId}` : '/projects'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: applicantName,
    email: applicantEmail,
    phone: applicantPhone
  });

  const [errors, setErrors] = useState({});
  const [depositAmount, setDepositAmount] = useState(0);
  const [processingFee, setProcessingFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [balanceDue, setBalanceDue] = useState(0);
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const [paymentAuthUrl, setPaymentAuthUrl] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else {
      const phoneValidation = validatePhoneNumber(formData.phone);
      if (!phoneValidation.isValid) {
        newErrors.phone = phoneValidation.error;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!projectRequestId) {
      alert('Project request ID is missing. Please restart the request process.');
      navigate('/projects/request');
      return;
    }

    setIsProcessing(true);

    try {
      const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
      const callbackUrl = `${appUrl}/payment/verify`;
      
      console.log('?? Payment initialization - App URL:', appUrl);
      console.log('?? Payment initialization - Callback URL:', callbackUrl);
      
      const projectCost = parseFloat(budgetRange) || 0;
      const totalProjectBudget = projectCost;

      const paymentData = {
        projectRequestId: projectRequestId,
        amount: projectCost,
        totalProjectBudget: totalProjectBudget,
        currency: 'GHS',
        paymentPhase: 'deposit',
        studentName: formData.fullName,
        studentEmail: formData.email,
        callbackUrl: callbackUrl,
        projectTitle: projectTitle,
        projectType: projectType
      };

      console.log('?? Sending payment data:', paymentData);

      const response = await paymentService.initializePayment(paymentData);
      const paymentResponse = response.data || response;
      
      if (paymentResponse.authorizationUrl) {
        if (paymentResponse.depositAmount) setDepositAmount(paymentResponse.depositAmount);
        if (paymentResponse.processingFee) setProcessingFee(paymentResponse.processingFee);
        if (paymentResponse.totalAmount) setTotalAmount(paymentResponse.totalAmount);
        if (paymentResponse.balanceDue) setBalanceDue(paymentResponse.balanceDue);
        
        setPaymentAuthUrl(paymentResponse.authorizationUrl);
        
        sessionStorage.setItem('payment_reference', paymentResponse.reference);
        sessionStorage.setItem('payment_project_id', projectRequestId);
        
        setShowPaymentSummary(true);
        setIsProcessing(false);
      } else {
        throw new Error('No payment URL received');
      }
    } catch (error) {
      console.error('Payment initialization failed:', error);
      setIsProcessing(false);
      
      alert(error.response?.data?.message || 'Failed to initialize payment. Please try again.');
    }
  };

  const handleProceedToPaystack = () => {
    if (paymentAuthUrl) {
      window.location.href = paymentAuthUrl;
    }
  };

  const handleEditDetails = () => {
    setShowPaymentSummary(false);
  };

  if (!projectRequestId || !budgetRange) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gray-50">
          <div className="text-center max-w-md">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Payment Not Available</h1>
            <p className="text-gray-600 mb-6">
              Missing project information. Please restart your project request.
            </p>
            <button
              onClick={() => navigate('/projects/request')}
              className="bg-[#004fa2] text-white px-6 py-3 rounded-lg hover:bg-[#003d7a] transition-colors"
            >
              Start New Request
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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
      
      <section className="relative bg-gradient-to-br from-[#004fa2] via-[#003d7a] to-[#002952] py-12 sm:py-16">
        <div className="absolute inset-0 bg-[url('/images/image3.webp')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4 text-white/80 text-sm">
            <a href="/projects" className="hover:text-white transition-colors">Projects</a>
            <ChevronRight size={16} />
            <a href="/projects/request" className="hover:text-white transition-colors">Request</a>
            <ChevronRight size={16} />
            <span className="text-white">Payment</span>
          </div>
          
          <div className="mt-6 flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
              <Lock size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Secure Project Deposit
              </h1>
              <p className="text-white/80 text-sm mt-1">
                60% deposit to start your project
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                
                <div className="mb-8 pb-6 border-b border-gray-100">
                  <div className="hidden sm:flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                        <CheckCircle size={18} />
                      </div>
                      <span className="text-sm font-medium text-gray-900">Request Submitted</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#004fa2] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <span className="text-sm font-semibold text-[#004fa2]">Deposit Payment</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                    <p className="text-sm text-gray-600 mb-4">We'll send your payment receipt and project confirmation to these details.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${
                            errors.fullName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+233 XX XXX XXXX"
                          {...getPhoneInputAttributes()}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Shield size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Secure Payment via Paystack</p>
                        <p className="text-xs text-blue-700 mt-1">
                          After clicking "Proceed to Payment", you'll review your payment summary before being redirected to Paystack's secure checkout where you can choose your preferred payment method (Mobile Money, Card, or Bank Transfer).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-white transition-all ${
                        isProcessing
                            ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-[#004fa2] hover:bg-[#003d7a] shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock size={18} />
                          Proceed to Payment
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      disabled={isProcessing}
                      className="px-6 py-4 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold transition-all"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield size={18} className="text-green-600" />
                      <span>256-bit SSL Secure</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={18} className="text-green-600" />
                      <span>PCI-DSS Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Lock size={18} className="text-green-600" />
                      <span>Powered by Paystack</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showPaymentSummary && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Payment Summary
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Review your payment breakdown before proceeding
            </p>
            
            <div className="space-y-4 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Project Budget:</span>
                <span className="text-sm font-semibold text-gray-900">GHS {parseFloat(budgetRange || 0).toFixed(2)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">60% Deposit Amount:</span>
                <span className="text-sm font-semibold text-gray-900">GHS {depositAmount.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Processing Fee (1.5% + ?0.50):</span>
                <span className="text-sm font-semibold text-gray-900">GHS {processingFee.toFixed(2)}</span>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Total Amount to Pay:</span>
                  <span className="text-lg font-bold text-blue-600">GHS {totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium text-gray-600">Remaining Balance (40%):</span>
                <span className="text-sm font-semibold text-gray-900">GHS {balanceDue.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleEditDetails}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-all"
              >
                Edit Details
              </button>
              <button
                onClick={handleProceedToPaystack}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all"
              >
                <Lock size={16} />
                Proceed to Paystack
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProjectPaymentPage;
