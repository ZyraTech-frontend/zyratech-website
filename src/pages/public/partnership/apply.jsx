import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Phone, User, Globe, MessageSquare, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

const PartnershipApplicationPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    // Organization Info
    organizationName: '',
    organizationType: '',
    website: '',
    country: '',
    
    // Contact Person
    contactName: '',
    position: '',
    email: '',
    phone: '',
    
    // Partnership Details
    partnershipType: '',
    interests: [],
    timeline: '',
    message: '',
    
    // Agreement
    agreedToTerms: false
  });

  const steps = [
    { title: 'Organization Info', icon: Building2 },
    { title: 'Contact Details', icon: User },
    { title: 'Partnership Goals', icon: MessageSquare },
    { title: 'Review & Submit', icon: CheckCircle2 }
  ];

  const partnershipTypes = [
    'Corporate Partner',
    'Sponsor Partner',
    'Educational Partner',
    'Technology Partner',
    'Community Partner',
    'NGO Partner'
  ];

  const interestOptions = [
    'Student Training & Development',
    'Internship Programs',
    'Equipment Donations',
    'Funding & Sponsorship',
    'Technology Collaboration',
    'Research & Development',
    'Community Impact Projects',
    'CSR Initiatives'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
    if (errors.interests) {
      setErrors(prev => ({ ...prev, interests: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.organizationName.trim()) newErrors.organizationName = 'Organization name is required';
      if (!formData.organizationType) newErrors.organizationType = 'Please select organization type';
      if (!formData.country.trim()) newErrors.country = 'Country is required';
    }

    if (step === 1) {
      if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.position.trim()) newErrors.position = 'Position is required';
    }

    if (step === 2) {
      if (!formData.partnershipType) newErrors.partnershipType = 'Please select partnership type';
      if (formData.interests.length === 0) newErrors.interests = 'Select at least one area of interest';
      if (!formData.message.trim()) newErrors.message = 'Please tell us about your partnership goals';
    }

    if (step === 3) {
      if (!formData.agreedToTerms) newErrors.agreedToTerms = 'You must agree to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      // Handle form submission here
      console.log('Form submitted:', formData);
      navigate('/partner', { state: { applicationSubmitted: true } });
    }
  };

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent transition-all duration-200";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";
  const errorClasses = "text-sm text-red-600 mt-1";

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 px-2">Partnership Application</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 px-2">Let's create meaningful impact together</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center justify-between max-w-3xl mx-auto px-2">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-1.5 sm:mb-2 transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-[#004fa2] text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    <step.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <span className={`text-[9px] sm:text-xs md:text-sm font-medium text-center leading-tight px-0.5 ${
                    index <= currentStep ? 'text-[#004fa2]' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 sm:h-1 flex-1 mx-1 sm:mx-2 mb-6 sm:mb-8 transition-all duration-300 ${
                    index < currentStep ? 'bg-[#004fa2]' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
          
          {/* Step 0: Organization Info */}
          {currentStep === 0 && (
            <div className="space-y-4 sm:space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-5">Organization Information</h2>
              
              <div>
                <label className={labelClasses}>
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  placeholder="Enter your organization name"
                  className={inputClasses}
                />
                {errors.organizationName && <p className={errorClasses}>{errors.organizationName}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className={labelClasses}>
                    Organization Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleInputChange}
                    className={inputClasses}
                  >
                    <option value="">Select type</option>
                    <option value="corporate">Corporate/Business</option>
                    <option value="ngo">NGO/Non-Profit</option>
                    <option value="educational">Educational Institution</option>
                    <option value="government">Government Agency</option>
                    <option value="startup">Startup/SME</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.organizationType && <p className={errorClasses}>{errors.organizationType}</p>}
                </div>

                <div>
                  <label className={labelClasses}>Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://www.example.com"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter country"
                  className={inputClasses}
                />
                {errors.country && <p className={errorClasses}>{errors.country}</p>}
              </div>
            </div>
          )}

          {/* Step 1: Contact Details */}
          {currentStep === 1 && (
            <div className="space-y-4 sm:space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-5">Contact Person Details</h2>
              
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className={labelClasses}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className={inputClasses}
                  />
                  {errors.contactName && <p className={errorClasses}>{errors.contactName}</p>}
                </div>

                <div>
                  <label className={labelClasses}>
                    Position/Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="e.g., Partnership Manager"
                    className={inputClasses}
                  />
                  {errors.position && <p className={errorClasses}>{errors.position}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className={labelClasses}>
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    className={inputClasses}
                  />
                  {errors.email && <p className={errorClasses}>{errors.email}</p>}
                </div>

                <div>
                  <label className={labelClasses}>
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+233 XX XXX XXXX"
                    className={inputClasses}
                  />
                  {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Partnership Goals */}
          {currentStep === 2 && (
            <div className="space-y-4 sm:space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-5">Partnership Goals</h2>
              
              <div>
                <label className={labelClasses}>
                  Partnership Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="partnershipType"
                  value={formData.partnershipType}
                  onChange={handleInputChange}
                  className={inputClasses}
                >
                  <option value="">Select partnership type</option>
                  {partnershipTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.partnershipType && <p className={errorClasses}>{errors.partnershipType}</p>}
              </div>

              <div>
                <label className={labelClasses}>
                  Areas of Interest <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500 mb-3">Select all that apply</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {interestOptions.map(interest => (
                    <label
                      key={interest}
                      className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestToggle(interest)}
                        className="mt-0.5 w-4 h-4 text-[#004fa2] border-gray-300 rounded focus:ring-[#004fa2] flex-shrink-0"
                      />
                      <span className="text-sm text-gray-700 leading-snug">{interest}</span>
                    </label>
                  ))}
                </div>
                {errors.interests && <p className={errorClasses}>{errors.interests}</p>}
              </div>

              <div>
                <label className={labelClasses}>Preferred Timeline</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className={inputClasses}
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (1-3 months)</option>
                  <option value="short">Short-term (3-6 months)</option>
                  <option value="medium">Medium-term (6-12 months)</option>
                  <option value="long">Long-term (1+ years)</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label className={labelClasses}>
                  Tell Us About Your Partnership Goals <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe what you hope to achieve through this partnership, your organization's goals, and how you envision collaborating with ZyraTech..."
                  rows="6"
                  className={inputClasses}
                />
                {errors.message && <p className={errorClasses}>{errors.message}</p>}
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <div className="space-y-4 sm:space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-5">Review Your Application</h2>
              
              <div className="space-y-3 sm:space-y-5 bg-gray-50 rounded-lg p-3 sm:p-5">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg">Organization Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
                    <div className="break-words"><span className="text-gray-600">Name:</span> <span className="font-medium">{formData.organizationName}</span></div>
                    <div><span className="text-gray-600">Type:</span> <span className="font-medium">{formData.organizationType}</span></div>
                    <div className="break-all"><span className="text-gray-600">Website:</span> <span className="font-medium">{formData.website || 'N/A'}</span></div>
                    <div><span className="text-gray-600">Country:</span> <span className="font-medium">{formData.country}</span></div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg">Contact Person</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
                    <div className="break-words"><span className="text-gray-600">Name:</span> <span className="font-medium">{formData.contactName}</span></div>
                    <div><span className="text-gray-600">Position:</span> <span className="font-medium">{formData.position}</span></div>
                    <div className="break-all"><span className="text-gray-600">Email:</span> <span className="font-medium">{formData.email}</span></div>
                    <div className="break-all"><span className="text-gray-600">Phone:</span> <span className="font-medium">{formData.phone}</span></div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-base sm:text-lg">Partnership Details</h3>
                  <div className="space-y-3 text-sm">
                    <div><span className="text-gray-600">Type:</span> <span className="font-medium">{formData.partnershipType}</span></div>
                    <div>
                      <span className="text-gray-600">Interests:</span> 
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.interests.map(interest => (
                          <span key={interest} className="px-2 sm:px-3 py-1 bg-[#004fa2] text-white text-xs rounded-full">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                    {formData.timeline && (
                      <div><span className="text-gray-600">Timeline:</span> <span className="font-medium capitalize">{formData.timeline}</span></div>
                    )}
                    {formData.message && (
                      <div>
                        <span className="text-gray-600">Partnership Goals:</span>
                        <p className="mt-2 text-gray-800 bg-white p-3 rounded border border-gray-200 whitespace-pre-wrap break-words leading-relaxed">{formData.message}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-[#004fa2] border-gray-300 rounded focus:ring-[#004fa2]"
                  />
                  <span className="text-sm text-gray-700">
                    I confirm that the information provided is accurate and I agree to ZyraTech's partnership terms and conditions. 
                    I understand that this application will be reviewed and ZyraTech will contact us to discuss next steps.
                  </span>
                </label>
                {errors.agreedToTerms && <p className={errorClasses}>{errors.agreedToTerms}</p>}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-semibold transition-all duration-200 ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-[#004fa2] text-white rounded-lg font-semibold hover:bg-[#003a7a] transition-colors duration-200"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base bg-[#004fa2] text-white rounded-lg font-semibold hover:bg-[#003a7a] transition-colors duration-200"
              >
                <span>Submit Application</span>
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnershipApplicationPage;

