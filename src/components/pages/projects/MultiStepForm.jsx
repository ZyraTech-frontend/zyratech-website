import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, GraduationCap, Briefcase, Building2, AlertCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../store/slices/uiSlice';
import { validatePhoneNumber, getPhoneInputAttributes } from '../../../utils/phoneValidation';
import projectRequestService from '../../../services/projectRequestService';

const MultiStepForm = ({ onSubmit }) => {
  const [searchParams] = useSearchParams();
  // Get packageType from URL or default to student-projects
  const packageType = searchParams.get('package') || 'student-projects';

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  // Package-specific configuration
  const packageConfig = {
    'student-projects': {
      title: 'Student Project Request',
      icon: GraduationCap,
      description: 'Final year project? Capstone? We\'ll build it with you.',
      infoBanner: 'Special rates for students! We work with your academic timeline and provide documentation support.',
      projectTypes: [
        { value: 'web', label: 'Web Application' },
        { value: 'mobile', label: 'Mobile Application' },
        { value: 'desktop', label: 'Desktop Application' },
        { value: 'ai', label: 'AI/Machine Learning' },
        { value: 'other', label: 'Other' }
      ]
    },
    'business-projects': {
      title: 'Business Project Request',
      icon: Briefcase,
      description: 'Full-stack applications, IoT systems, and custom solutions for your business.',
      infoBanner: 'End-to-end project delivery with Agile methodology. Includes extended support and deployment assistance.',
      projectTypes: [
        { value: 'web', label: 'Web Application' },
        { value: 'mobile', label: 'Mobile Application' },
        { value: 'desktop', label: 'Desktop Application' },
        { value: 'ai', label: 'AI/Machine Learning' },
        { value: 'other', label: 'Other' }
      ]
    },
    'enterprise': {
      title: 'Enterprise Solution Request',
      icon: Building2,
      description: 'Large-scale systems with dedicated support and scalable architecture.',
      infoBanner: 'Dedicated account manager, custom timelines, and long-term maintenance packages available.',
      projectTypes: [
        { value: 'web', label: 'Web Application' },
        { value: 'mobile', label: 'Mobile Application' },
        { value: 'desktop', label: 'Desktop Application' },
        { value: 'ai', label: 'AI/Machine Learning' },
        { value: 'other', label: 'Other' }
      ]
    }
  };

  const config = packageConfig[packageType] || packageConfig['student-projects'];
  const Icon = config.icon;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectTitle: '',
    description: '',
    projectType: config.projectTypes[0].value,
    budget: '',
    timeline: '',
    technologies: '',
    additionalNotes: ''
  });

  const steps = [
    { number: 1, title: 'Contact Info' },
    { number: 2, title: 'Project Details' },
    { number: 3, title: 'Review' }
  ];

  const totalSteps = steps.length;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
        return false;
      }
      const phoneValidation = validatePhoneNumber(formData.phone);
      return phoneValidation.isValid;
    }
    if (step === 2) {
      return formData.projectTitle.trim() && formData.description.trim() && formData.projectType;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Convert technologies string to array
      const technologiesArray = formData.technologies
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company?.trim() || null,
        projectTitle: formData.projectTitle.trim(),
        description: formData.description.trim(),
        projectType: formData.projectType,
        budget: formData.budget || null,
        timeline: formData.timeline || null,
        technologies: technologiesArray,
        additionalNotes: formData.additionalNotes?.trim() || null
      };

      await projectRequestService.submitProjectRequest(payload);
      
      // Show success notification
      dispatch(addNotification({
        type: 'success',
        message: 'Project request submitted successfully! Our team will contact you soon.'
      }));

      setSubmitted(true);
      if (onSubmit) {
        setTimeout(() => onSubmit(), 1500);
      }
    } catch (err) {
      console.error('Error submitting project request:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit project request. Please try again.';
      setError(errorMessage);
      
      dispatch(addNotification({
        type: 'error',
        message: errorMessage
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
        <p className="text-gray-600 mb-6">Thank you for your project inquiry. Our team will review and contact you within 24 hours.</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <p><strong>Confirmation Email:</strong> Sent to {formData.email}</p>
          <p className="mt-2 text-xs text-blue-600">Check your email for next steps</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((s, idx) => (
            <div key={s.number} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= s.number
                ? 'bg-[#004fa2] text-white'
                : 'bg-gray-200 text-gray-600'
                }`}>
                {step > s.number ? <Check className="w-5 h-5" /> : s.number}
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 transition-all ${step > s.number ? 'bg-[#004fa2]' : 'bg-gray-200'
                  }`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-600">Step {step} of {totalSteps}: {steps[step - 1].title}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Step 1: Contact Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input 
                  type="text" 
                  name="fullName" 
                  required 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  placeholder="Your full name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="your@email.com" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" 
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  value={formData.phone} 
                  onChange={handleChange} 
                  {...getPhoneInputAttributes()} 
                  placeholder="+233 XXX XXX XXX" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company (Optional)</label>
                <input 
                  type="text" 
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange} 
                  placeholder="Your company name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" 
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Project Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Type *</label>
              <select 
                name="projectType" 
                value={formData.projectType} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
              >
                {config.projectTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
              <input 
                type="text" 
                name="projectTitle" 
                required 
                value={formData.projectTitle} 
                onChange={handleChange} 
                placeholder="e.g., E-commerce Platform, AI Chatbot" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
              <textarea 
                name="description" 
                required 
                value={formData.description} 
                onChange={handleChange} 
                rows="4" 
                placeholder="Describe your project, goals, and key features..." 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" 
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget (Optional)</label>
                <input 
                  type="text" 
                  name="budget" 
                  value={formData.budget} 
                  onChange={handleChange} 
                  placeholder="e.g. $5,000 - $10,000" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timeline (Optional)</label>
                <input 
                  type="text" 
                  name="timeline" 
                  value={formData.timeline} 
                  onChange={handleChange} 
                  placeholder="e.g. 3-6 months" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (Optional)</label>
              <input 
                type="text" 
                name="technologies" 
                value={formData.technologies} 
                onChange={handleChange} 
                placeholder="e.g. React, Node.js, MongoDB (comma-separated)" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
              <textarea 
                name="additionalNotes" 
                value={formData.additionalNotes} 
                onChange={handleChange} 
                rows="2" 
                placeholder="Any other details we should know..." 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" 
              />
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Review Your Request</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-600">Name:</span> <span className="font-medium">{formData.fullName}</span></div>
              <div><span className="text-gray-600">Email:</span> <span className="font-medium">{formData.email}</span></div>
              <div><span className="text-gray-600">Phone:</span> <span className="font-medium">{formData.phone}</span></div>
              <div><span className="text-gray-600">Company:</span> <span className="font-medium">{formData.company || 'Not provided'}</span></div>
              <div><span className="text-gray-600">Project Type:</span> <span className="font-medium">{formData.projectType}</span></div>
              <div><span className="text-gray-600">Budget:</span> <span className="font-medium">{formData.budget || 'Not specified'}</span></div>
              <div className="md:col-span-2"><span className="text-gray-600">Title:</span> <span className="font-medium">{formData.projectTitle}</span></div>
              <div className="md:col-span-2"><span className="text-gray-600">Description:</span> <span className="font-medium">{formData.description}</span></div>
              {formData.technologies && <div className="md:col-span-2"><span className="text-gray-600">Technologies:</span> <span className="font-medium">{formData.technologies}</span></div>}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-6 border-t">
          <button 
            type="button" 
            onClick={handlePrev} 
            disabled={step === 1 || isSubmitting} 
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          {step < totalSteps ? (
            <button 
              type="button" 
              onClick={handleNext} 
              disabled={!validateStep() || isSubmitting} 
              className="flex-1 px-6 py-3 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="flex-1 px-6 py-3 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
