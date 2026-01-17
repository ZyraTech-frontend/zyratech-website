import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Lock, Shield, CheckCircle, CreditCard, Smartphone, 
  GraduationCap, Clock, Users, Award, ChevronRight,
  AlertCircle
} from 'lucide-react';
import TrainingLayout from '../../../components/TrainingLayout';
import TrainingBreadcrumb from '../../../components/pages/training/TrainingBreadcrumb';
import { getTrainingCourseById } from '../../../data/trainingCourses';
import useSEO from '../../../hooks/useSEO';

const TrainingPaymentPage = () => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const applicantName = searchParams.get('name') || '';
  const applicantEmail = searchParams.get('email') || '';

  const course = getTrainingCourseById(courseId);

  useSEO({
    title: course ? `Payment - ${course.title}` : 'Complete Payment',
    description: 'Complete your training program payment securely at Zyra Tech Hub.'
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: applicantName,
    email: applicantEmail,
    phone: '',
    // Card fields
    cardNumber: '',
    expiry: '',
    cvv: '',
    // Mobile money fields
    mobileProvider: '',
    mobileNumber: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    if (paymentMethod === 'card') {
      if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Valid card number is required';
      }
      if (!formData.expiry.trim()) newErrors.expiry = 'Expiry date is required';
      if (!formData.cvv.trim() || formData.cvv.length < 3) newErrors.cvv = 'Valid CVV is required';
    } else {
      if (!formData.mobileProvider) newErrors.mobileProvider = 'Select a provider';
      if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile money number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate payment processing (will be replaced with Paystack/Stripe)
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/training/payment-success', {
        state: {
          courseTitle: course?.title,
          amount: course?.price,
          paymentMethod: paymentMethod === 'card' ? 'Credit/Debit Card' : 'Mobile Money',
          transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          applicantName: formData.fullName,
          applicantEmail: formData.email
        }
      });
    }, 2000);
  };

  if (!course) {
    return (
      <TrainingLayout>
        <div className="flex items-center justify-center px-4 py-16 min-h-[60vh]">
          <div className="text-center max-w-md">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Payment Not Available</h1>
            <p className="text-gray-600 mb-6">
              The course you're trying to pay for doesn't exist or the payment link may have expired.
            </p>
            <button
              onClick={() => navigate('/training/programs')}
              className="bg-[#004fa2] hover:bg-black text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Programs
            </button>
          </div>
        </div>
      </TrainingLayout>
    );
  }

  const breadcrumbItems = [
    { label: 'Programs', link: '/training/programs' },
    { label: course.title, link: `/training/course/${courseId}` },
    { label: 'Payment' }
  ];

  return (
    <TrainingLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#004fa2] via-[#003d7a] to-[#002952] py-12 sm:py-16">
        <div className="absolute inset-0 bg-[url('/images/image3.png')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrainingBreadcrumb items={breadcrumbItems} variant="light" />
          
          <div className="mt-6 flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
              <Lock size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Secure Payment
              </h1>
              <p className="text-white/80 text-sm mt-1">
                Complete your enrollment in {course.title}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 sm:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                
                {/* Progress Indicator */}
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                      <CheckCircle size={18} />
                    </div>
                    <span className="text-sm font-medium text-gray-900">Application</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                      <CheckCircle size={18} />
                    </div>
                    <span className="text-sm font-medium text-gray-900">Accepted</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#004fa2] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <span className="text-sm font-semibold text-[#004fa2]">Payment</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Contact Information */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
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
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'card'
                            ? 'border-[#004fa2] bg-[#004fa2]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          paymentMethod === 'card' ? 'bg-[#004fa2] text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <CreditCard size={20} />
                        </div>
                        <div className="text-left">
                          <p className={`font-semibold ${paymentMethod === 'card' ? 'text-[#004fa2]' : 'text-gray-900'}`}>
                            Card Payment
                          </p>
                          <p className="text-xs text-gray-500">Visa, Mastercard</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('mobile')}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'mobile'
                            ? 'border-[#004fa2] bg-[#004fa2]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          paymentMethod === 'mobile' ? 'bg-[#004fa2] text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Smartphone size={20} />
                        </div>
                        <div className="text-left">
                          <p className={`font-semibold ${paymentMethod === 'mobile' ? 'text-[#004fa2]' : 'text-gray-900'}`}>
                            Mobile Money
                          </p>
                          <p className="text-xs text-gray-500">MTN, Vodafone, AirtelTigo</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Card Payment Fields */}
                  {paymentMethod === 'card' && (
                    <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${
                              errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          <CreditCard size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        {errors.cardNumber && <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            maxLength="5"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${
                              errors.expiry ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.expiry && <p className="text-sm text-red-500 mt-1">{errors.expiry}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="•••"
                            maxLength="4"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${
                              errors.cvv ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.cvv && <p className="text-sm text-red-500 mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile Money Fields */}
                  {paymentMethod === 'mobile' && (
                    <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile Money Provider <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="mobileProvider"
                          value={formData.mobileProvider}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all bg-white ${
                            errors.mobileProvider ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select your provider</option>
                          <option value="mtn">MTN Mobile Money</option>
                          <option value="vodafone">Vodafone Cash</option>
                          <option value="airteltigo">AirtelTigo Money</option>
                        </select>
                        {errors.mobileProvider && <p className="text-sm text-red-500 mt-1">{errors.mobileProvider}</p>}
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile Money Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          placeholder="024 XXX XXXX"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${
                            errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.mobileNumber && <p className="text-sm text-red-500 mt-1">{errors.mobileNumber}</p>}
                      </div>

                      {/* Mobile Money Instructions */}
                      <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                        <p className="text-sm text-blue-900">
                          <span className="font-semibold">📱 How it works:</span>
                        </p>
                        <ol className="text-sm text-blue-800 mt-2 space-y-1 list-decimal list-inside">
                          <li>Click "Complete Payment" below</li>
                          <li>You'll receive a prompt on your phone</li>
                          <li>Enter your Mobile Money PIN to authorize</li>
                          <li>You'll receive confirmation via SMS</li>
                        </ol>
                      </div>
                    </div>
                  )}

                  {/* Submit Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-white transition-all ${
                        isProcessing
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#004fa2] hover:bg-black shadow-lg hover:shadow-xl hover:-translate-y-0.5'
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
                          Pay {course.price}
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

                  {/* Security Badges */}
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
                      <span>Trusted Provider</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>

                {/* Course Info */}
                <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="w-14 h-14 bg-[#004fa2]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={24} className="text-[#004fa2]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 leading-snug">{course.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{course.level} Program</p>
                  </div>
                </div>

                {/* Course Details */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Clock size={16} />
                      Duration
                    </span>
                    <span className="font-medium text-gray-900">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Users size={16} />
                      Cohort Size
                    </span>
                    <span className="font-medium text-gray-900">{course.participants}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Award size={16} />
                      Certificate
                    </span>
                    <span className="font-medium text-gray-900">Included</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Program Fee</span>
                    <span className="text-gray-900">{course.price}</span>
                  </div>
                  {course.originalPrice && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600 font-medium">
                        - {course.originalPrice.replace(/[^\d]/g, '') - course.price.replace(/[^\d]/g, '')} GHS
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-[#004fa2]">{course.price}</span>
                  </div>
                </div>

                {/* Trust Message */}
                <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-900">Secure Payment</p>
                      <p className="text-xs text-green-700 mt-1">
                        Your payment is protected by industry-standard encryption.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </TrainingLayout>
  );
};

export default TrainingPaymentPage;
