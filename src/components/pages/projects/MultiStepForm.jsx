import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const MultiStepForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    studentType: 'final-year',
    projectTitle: '',
    projectDescription: '',
    requirements: '',
    budget: '',
    deadline: ''
  });

  const ghanaianUniversities = [
    'Accra Institute of Technology',
    'Accra Technical University',
    'Ashesi University',
    'Cape Coast Technical University',
    'Central University',
    'Christian Service University College',
    'Fidelity University',
    'Ghana Institute of Management and Public Administration (GIMPA)',
    'Ho Technical University',
    'Koforidua Technical University',
    'Kumasi Technical University',
    'Kwame Nkrumah University of Science and Technology (KNUST)',
    'Other',
    'Pentecost University College',
    'Regent University College',
    'Sunyani Technical University',
    'Takoradi Technical University',
    'University of Cape Coast',
    'University of Ghana',
    'University of Professional Studies, Accra (UPSA)',
    'Valley View University',
    'Zenith University'
  ];

  const steps = [
    { number: 1, title: 'Basic Info' },
    { number: 2, title: 'Project Details' },
    { number: 3, title: 'Requirements' },
    { number: 4, title: 'Review' },
    { number: 5, title: 'Preview' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = () => {
    if (step === 1) {
      return formData.fullName.trim() && formData.email.trim() && formData.phone.trim() && formData.institution.trim();
    }
    if (step === 2) {
      return formData.projectTitle.trim() && formData.projectDescription.trim();
    }
    if (step === 3) {
      return formData.budget && formData.deadline;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Project Request:', formData);
    setSubmitted(true);
    onSubmit();
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Request Submitted!</h2>
        <p className="text-gray-600 mb-6">Thank you for submitting your project idea. We will review your request and contact you within 24 hours.</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <p><strong>Confirmation Email:</strong> A confirmation has been sent to {formData.email}</p>
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
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                step >= s.number 
                  ? 'bg-[#004fa2] text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step > s.number ? <Check className="w-5 h-5" /> : s.number}
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 transition-all ${
                  step > s.number ? 'bg-[#004fa2]' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-600">Step {step} of 5: {steps[step - 1].title}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="your.email@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+233 XXX XXX XXX" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institution/University *</label>
                <select name="institution" required value={formData.institution} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent">
                  <option value="">Select your institution</option>
                  {ghanaianUniversities.map((uni) => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Project Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Type *</label>
              <select name="studentType" value={formData.studentType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent">
                <option value="final-year">Final Year Project</option>
                <option value="capstone">Capstone Project</option>
                <option value="thesis">Thesis/Research Project</option>
                <option value="personal">Personal Project</option>
                <option value="startup">Startup/Business</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
              <input type="text" name="projectTitle" required value={formData.projectTitle} onChange={handleChange} placeholder="e.g., Smart Irrigation System with IoT" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
              <textarea name="projectDescription" required value={formData.projectDescription} onChange={handleChange} rows="4" placeholder="Describe what you want to build, key features, and objectives..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
            </div>
          </div>
        )}

        {/* Step 3: Requirements & Budget */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Technical Requirements</label>
              <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows="3" placeholder="Any specific technologies, platforms, or requirements?" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range (GHS) *</label>
                <select name="budget" value={formData.budget} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent">
                  <option value="">Select budget range</option>
                  <option value="500-1000">GHS 500 - 1,000</option>
                  <option value="1000-2000">GHS 1,000 - 2,000</option>
                  <option value="2000-5000">GHS 2,000 - 5,000</option>
                  <option value="5000+">GHS 5,000+</option>
                  <option value="flexible">Flexible/Discuss</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline *</label>
                <input type="date" name="deadline" required value={formData.deadline} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Review Your Information</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-600">Name:</span> <span className="font-medium">{formData.fullName}</span></div>
              <div><span className="text-gray-600">Email:</span> <span className="font-medium">{formData.email}</span></div>
              <div><span className="text-gray-600">Phone:</span> <span className="font-medium">{formData.phone}</span></div>
              <div><span className="text-gray-600">Institution:</span> <span className="font-medium">{formData.institution}</span></div>
              <div><span className="text-gray-600">Project Type:</span> <span className="font-medium">{formData.studentType}</span></div>
              <div><span className="text-gray-600">Budget:</span> <span className="font-medium">{formData.budget || 'Not specified'}</span></div>
              <div className="md:col-span-2"><span className="text-gray-600">Title:</span> <span className="font-medium">{formData.projectTitle}</span></div>
              <div className="md:col-span-2"><span className="text-gray-600">Description:</span> <span className="font-medium">{formData.projectDescription}</span></div>
            </div>
          </div>
        )}

        {/* Step 5: Preview */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">Please review all your information below before submitting. You can go back to edit any details.</p>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <div><span className="text-gray-600">Full Name:</span> <span className="font-medium">{formData.fullName}</span></div>
                  <div><span className="text-gray-600">Email:</span> <span className="font-medium">{formData.email}</span></div>
                  <div><span className="text-gray-600">Phone:</span> <span className="font-medium">{formData.phone}</span></div>
                  <div><span className="text-gray-600">Institution:</span> <span className="font-medium">{formData.institution}</span></div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Project Details</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <div><span className="text-gray-600">Project Type:</span> <span className="font-medium">{formData.studentType}</span></div>
                  <div><span className="text-gray-600">Title:</span> <span className="font-medium">{formData.projectTitle}</span></div>
                  <div><span className="text-gray-600">Description:</span> <span className="font-medium block mt-1">{formData.projectDescription}</span></div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Requirements & Budget</h4>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <div><span className="text-gray-600">Technical Requirements:</span> <span className="font-medium block mt-1">{formData.requirements || 'Not specified'}</span></div>
                  <div><span className="text-gray-600">Budget Range:</span> <span className="font-medium">{formData.budget}</span></div>
                  <div><span className="text-gray-600">Deadline:</span> <span className="font-medium">{formData.deadline}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-6 border-t">
          <button type="button" onClick={handlePrev} disabled={step === 1} className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          {step < 5 ? (
            <button type="button" onClick={handleNext} disabled={!validateStep()} className="flex-1 px-6 py-3 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button type="submit" className="flex-1 px-6 py-3 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-semibold">
              Submit Request
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
