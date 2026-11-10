import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, GraduationCap, Briefcase, Building2, AlertCircle } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../store/slices/uiSlice';
import { validatePhoneNumber, getPhoneInputAttributes } from '../../../utils/phoneValidation';
import projectRequestService from '../../../services/projectRequestService';

const MultiStepForm = ({ onSubmit }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const packageType = searchParams.get('package') || 'student-projects';

  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const packageConfig = {
    'student-projects': {
      title: 'Student Project Request',
      icon: GraduationCap,
      description: 'Final year project? Capstone? We will build it with you.',
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
    budgetCustom: '',
    exactBudgetAmount: '',
    timeline: '',
    timelineCustom: '',
    technologies: '',
    additionalNotes: ''
  });

  const budgetOptions = [
    { value: 'GHS 1,000 - GHS 5,000', label: 'GHS 1,000 - GHS 5,000' },
    { value: 'GHS 5,000 - GHS 10,000', label: 'GHS 5,000 - GHS 10,000' },
    { value: 'GHS 10,000 - GHS 25,000', label: 'GHS 10,000 - GHS 25,000' },
    { value: 'GHS 25,000 - GHS 50,000', label: 'GHS 25,000 - GHS 50,000' },
    { value: 'GHS 50,000+', label: 'GHS 50,000+' },
    { value: 'custom', label: 'Custom Amount' }
  ];

  const timelineOptions = [
    { value: '1-2 weeks', label: '1-2 weeks' },
    { value: '2-4 weeks', label: '2-4 weeks' },
    { value: '1-3 months', label: '1-3 months' },
    { value: '3-6 months', label: '3-6 months' },
    { value: '6-12 months', label: '6-12 months' },
    { value: 'custom', label: 'Custom Timeline' }
  ];

  // Generate exact budget amounts based on selected range
  const getExactBudgetAmounts = (budgetRange) => {
    const rangeMap = {
      'GHS 1,000 - GHS 5,000': [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
      'GHS 5,000 - GHS 10,000': [5000, 6000, 7000, 8000, 9000, 10000],
      'GHS 10,000 - GHS 25,000': [10000, 13000, 15000, 18000, 20000, 25000],
      'GHS 25,000 - GHS 50,000': [25000, 30000, 35000, 40000, 45000, 50000],
      'GHS 50,000+': [50000, 75000, 100000, 150000, 200000]
    };
    return rangeMap[budgetRange] || [];
  };

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
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.company.trim()) {
        return false;
      }
      const phoneValidation = validatePhoneNumber(formData.phone);
      return phoneValidation.isValid;
    }
    if (step === 2) {
      if (!formData.projectTitle.trim() || !formData.description.trim() || !formData.projectType) {
        return false;
      }
      const finalBudget = formData.budget === 'custom' ? formData.budgetCustom : formData.exactBudgetAmount;
      if (!finalBudget || !finalBudget.toString().trim()) {
        return false;
      }
      const finalTimeline = formData.timeline === 'custom' ? formData.timelineCustom : formData.timeline;
      if (!finalTimeline || !finalTimeline.trim()) {
        return false;
      }
      const technologiesArray = formData.technologies
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);
      if (technologiesArray.length === 0) {
        return false;
      }
      if (!formData.additionalNotes.trim()) {
        return false;
      }
      return true;
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
      const technologiesArray = formData.technologies
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const finalBudget = formData.budget === 'custom' ? formData.budgetCustom : formData.exactBudgetAmount;
      const finalTimeline = formData.timeline === 'custom' ? formData.timelineCustom : formData.timeline;

      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        projectTitle: formData.projectTitle.trim(),
        description: formData.description.trim(),
        projectType: formData.projectType,
        packageType: packageType,
        budget: finalBudget.toString().trim(),
        timeline: finalTimeline.trim(),
        technologies: technologiesArray,
        additionalNotes: formData.additionalNotes.trim()
      };

      const result = await projectRequestService.submitProjectRequest(payload);
      
      console.log('ProjectRequest submitted:', result);
      
      const projectRequestId = result?.id || result?.projectRequestId || result?.data?.id;
      
      if (!projectRequestId) {
        throw new Error('No project request ID received from server');
      }
      
      navigate(`/projects/payment/${projectRequestId}`, {
        state: {
          projectData: result,
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          projectTitle: formData.projectTitle,
          projectType: packageType,
          budget: finalBudget
        }
      });
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((s, idx) => (
            <div key={s.number} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= s.number ? 'bg-[#004fa2] text-white' : 'bg-gray-200 text-gray-600'}`}>
                {step > s.number ? <Check className="w-5 h-5" /> : s.number}
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 transition-all ${step > s.number ? 'bg-[#004fa2]' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-600">Step {step} of {totalSteps}: {steps[step - 1].title}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Your full name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} {...getPhoneInputAttributes()} placeholder="+233 XXX XXX XXX" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Your company or organization name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Type *</label>
              <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent">
                {config.projectTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
              <input type="text" name="projectTitle" required value={formData.projectTitle} onChange={handleChange} placeholder="e.g., E-commerce Platform, AI Chatbot" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
              <textarea name="description" required value={formData.description} onChange={handleChange} rows="4" placeholder="Describe your project, goals, and key features..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget *</label>
                <select name="budget" value={formData.budget} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent">
                  <option value="">Select a budget range...</option>
                  {budgetOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {formData.budget === 'custom' && (
                  <input type="text" name="budgetCustom" value={formData.budgetCustom} onChange={handleChange} placeholder="Enter your custom budget (e.g., GHS 15,000 - GHS 20,000)" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent mt-2" />
                )}
                {formData.budget && formData.budget !== 'custom' && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Select Exact Amount *</label>
                    <select name="exactBudgetAmount" value={formData.exactBudgetAmount} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent">
                      <option value="">Choose exact budget amount...</option>
                      {getExactBudgetAmounts(formData.budget).map((amount) => (
                        <option key={amount} value={amount}>GHS {amount.toLocaleString()}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timeline *</label>
                <select name="timeline" value={formData.timeline} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent">
                  <option value="">Select a timeline...</option>
                  {timelineOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {formData.timeline === 'custom' && (
                  <input type="text" name="timelineCustom" value={formData.timelineCustom} onChange={handleChange} placeholder="Enter your custom timeline (e.g., 4 months)" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent mt-2" />
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Technologies *</label>
              <input type="text" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="e.g. React, Node.js, MongoDB (comma-separated, required)" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
              <p className="text-xs text-gray-500 mt-1">At least one technology is required</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes *</label>
              <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} rows="2" placeholder="Tell us more about your project requirements, goals, or any special requests..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Review Your Request</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-600">Name:</span> <span className="font-medium">{formData.fullName}</span></div>
              <div><span className="text-gray-600">Email:</span> <span className="font-medium">{formData.email}</span></div>
              <div><span className="text-gray-600">Phone:</span> <span className="font-medium">{formData.phone}</span></div>
              <div><span className="text-gray-600">Company:</span> <span className="font-medium">{formData.company}</span></div>
              <div><span className="text-gray-600">Project Type:</span> <span className="font-medium">{formData.projectType}</span></div>
              <div><span className="text-gray-600">Budget:</span> <span className="font-medium">{formData.budget === 'custom' ? formData.budgetCustom : `GHS ${parseInt(formData.exactBudgetAmount).toLocaleString()}`}</span></div>
              <div><span className="text-gray-600">Timeline:</span> <span className="font-medium">{formData.timeline === 'custom' ? formData.timelineCustom : formData.timeline}</span></div>
              <div className="md:col-span-2"><span className="text-gray-600">Title:</span> <span className="font-medium">{formData.projectTitle}</span></div>
              <div className="md:col-span-2"><span className="text-gray-600">Description:</span> <span className="font-medium">{formData.description}</span></div>
              {formData.technologies && <div className="md:col-span-2"><span className="text-gray-600">Technologies:</span> <span className="font-medium">{formData.technologies}</span></div>}
              {formData.additionalNotes && <div className="md:col-span-2"><span className="text-gray-600">Additional Notes:</span> <span className="font-medium">{formData.additionalNotes}</span></div>}
            </div>
          </div>
        )}

        <div className="flex gap-4 pt-6 border-t">
          <button type="button" onClick={handlePrev} disabled={step === 1 || isSubmitting} className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          {step < totalSteps ? (
            <button type="button" onClick={handleNext} disabled={!validateStep() || isSubmitting} className="flex-1 px-6 py-3 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button type="submit" disabled={isSubmitting} className="flex-1 px-6 py-3 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2">
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
