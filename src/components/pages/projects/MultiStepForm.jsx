import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, GraduationCap, Briefcase, Building2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const MultiStepForm = ({ onSubmit }) => {
  const [searchParams] = useSearchParams();
  const packageType = searchParams.get('package') || 'student-projects';

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Package-specific configuration
  const packageConfig = {
    'student-projects': {
      title: 'Student Project Request',
      icon: GraduationCap,
      color: 'blue',
      showInstitution: true,
      showCompany: false,
      budgetOptions: [
        { value: '1000-2000', label: 'GHS 1,000 - 2,000' },
        { value: '2000-3000', label: 'GHS 2,000 - 3,000' },
        { value: '3000-4000', label: 'GHS 3,000 - 4,000' },
        { value: 'flexible', label: 'Flexible/Discuss' }
      ],
      projectTypes: [
        { value: 'final-year', label: 'Final Year Project' },
        { value: 'capstone', label: 'Capstone Project' },
        { value: 'thesis', label: 'Thesis/Research Project' },
        { value: 'personal', label: 'Personal Learning Project' }
      ],
      infoBanner: 'Special rates for students! We work with your academic timeline and provide documentation support.'
    },
    'business-projects': {
      title: 'Business Project Request',
      icon: Briefcase,
      color: 'orange',
      showInstitution: false,
      showCompany: true,
      budgetOptions: [
        { value: '10000-15000', label: 'GHS 10,000 - 15,000' },
        { value: '15000-20000', label: 'GHS 15,000 - 20,000' },
        { value: '20000-30000', label: 'GHS 20,000 - 30,000' },
        { value: 'flexible', label: 'Flexible/Discuss' }
      ],
      projectTypes: [
        { value: 'web-app', label: 'Full-Stack Web Application' },
        { value: 'mobile-app', label: 'Mobile Application' },
        { value: 'iot-system', label: 'IoT/Hardware System' },
        { value: 'saas', label: 'SaaS Platform' },
        { value: 'custom', label: 'Custom Solution' }
      ],
      infoBanner: 'End-to-end project delivery with Agile methodology. Includes extended support and deployment assistance.'
    },
    'enterprise': {
      title: 'Enterprise Solution Request',
      icon: Building2,
      color: 'purple',
      showInstitution: false,
      showCompany: true,
      budgetOptions: [
        { value: '30000-50000', label: 'GHS 30,000 - 50,000' },
        { value: '50000-100000', label: 'GHS 50,000 - 100,000' },
        { value: '100000+', label: 'GHS 100,000+' },
        { value: 'custom', label: 'Custom Quote Required' }
      ],
      projectTypes: [
        { value: 'enterprise-app', label: 'Enterprise Application' },
        { value: 'integration', label: 'System Integration' },
        { value: 'automation', label: 'Business Process Automation' },
        { value: 'infrastructure', label: 'IT Infrastructure' },
        { value: 'consulting', label: 'Technical Consulting' }
      ],
      infoBanner: 'Dedicated account manager, scalable architecture, and long-term maintenance packages available.'
    }
  };

  const config = packageConfig[packageType] || packageConfig['student-projects'];
  const Icon = config.icon;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    companyName: '',
    companySize: '',
    jobTitle: '',
    projectType: config.projectTypes[0].value,
    projectTitle: '',
    projectDescription: '',
    requirements: '',
    budget: '',
    deadline: '',
    timeline: ''
  });

  const ghanaianUniversities = [
    'Accra Institute of Technology',
    'Accra Technical University',
    'Ashesi University',
    'Cape Coast Technical University',
    'Central University',
    'Ghana Institute of Management and Public Administration (GIMPA)',
    'Ho Technical University',
    'Koforidua Technical University',
    'Kumasi Technical University',
    'Kwame Nkrumah University of Science and Technology (KNUST)',
    'University of Cape Coast',
    'University of Ghana',
    'University of Professional Studies, Accra (UPSA)',
    'Other'
  ];

  const steps = config.showCompany
    ? [
      { number: 1, title: 'Contact Info' },
      { number: 2, title: 'Company Details' },
      { number: 3, title: 'Project Scope' },
      { number: 4, title: 'Budget & Timeline' },
      { number: 5, title: 'Review' }
    ]
    : [
      { number: 1, title: 'Basic Info' },
      { number: 2, title: 'Project Details' },
      { number: 3, title: 'Requirements' },
      { number: 4, title: 'Review' }
    ];

  const totalSteps = steps.length;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = () => {
    if (config.showCompany) {
      // Business/Enterprise flow
      if (step === 1) return formData.fullName.trim() && formData.email.trim() && formData.phone.trim();
      if (step === 2) return formData.companyName.trim() && formData.jobTitle.trim();
      if (step === 3) return formData.projectTitle.trim() && formData.projectDescription.trim();
      if (step === 4) return formData.budget && formData.timeline;
    } else {
      // Student flow
      if (step === 1) return formData.fullName.trim() && formData.email.trim() && formData.phone.trim() && formData.institution.trim();
      if (step === 2) return formData.projectTitle.trim() && formData.projectDescription.trim();
      if (step === 3) return formData.budget && formData.deadline;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Project Request:', { packageType, ...formData });
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
        <p className="text-gray-600 mb-6">Thank you for your {config.title.replace(' Request', '')} inquiry. Our team will review and contact you within 24 hours.</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <p><strong>Confirmation Email:</strong> Sent to {formData.email}</p>
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

        {/* STUDENT FLOW */}
        {!config.showCompany && (
          <>
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
                  <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent">
                    {config.projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range *</label>
                    <select name="budget" value={formData.budget} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent">
                      <option value="">Select budget range</option>
                      {config.budgetOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
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
                  <div><span className="text-gray-600">Project Type:</span> <span className="font-medium">{formData.projectType}</span></div>
                  <div><span className="text-gray-600">Budget:</span> <span className="font-medium">{formData.budget || 'Not specified'}</span></div>
                  <div className="md:col-span-2"><span className="text-gray-600">Title:</span> <span className="font-medium">{formData.projectTitle}</span></div>
                  <div className="md:col-span-2"><span className="text-gray-600">Description:</span> <span className="font-medium">{formData.projectDescription}</span></div>
                </div>
              </div>
            )}
          </>
        )}

        {/* BUSINESS/ENTERPRISE FLOW */}
        {config.showCompany && (
          <>
            {/* Step 1: Contact Info */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Work Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@company.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+233 XXX XXX XXX" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
                </div>
              </div>
            )}

            {/* Step 2: Company Details */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                    <input type="text" name="companyName" required value={formData.companyName} onChange={handleChange} placeholder="Your company name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Role/Title *</label>
                    <input type="text" name="jobTitle" required value={formData.jobTitle} onChange={handleChange} placeholder="e.g., CTO, Project Manager" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                  <select name="companySize" value={formData.companySize} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent">
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="200+">200+ employees</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Project Scope */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Category *</label>
                  <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent">
                    {config.projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
                  <input type="text" name="projectTitle" required value={formData.projectTitle} onChange={handleChange} placeholder="e.g., Customer Portal, Inventory System" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
                  <textarea name="projectDescription" required value={formData.projectDescription} onChange={handleChange} rows="4" placeholder="Describe the problem you're solving, key objectives, and expected outcomes..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
                </div>
              </div>
            )}

            {/* Step 4: Budget & Timeline */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Technical Requirements</label>
                  <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows="3" placeholder="Specific integrations, technologies, or compliance requirements?" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range *</label>
                    <select name="budget" value={formData.budget} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent">
                      <option value="">Select budget range</option>
                      {config.budgetOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Timeline *</label>
                    <select name="timeline" value={formData.timeline} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent">
                      <option value="">Select timeline</option>
                      <option value="4-8-weeks">4-8 weeks</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-months+">6+ months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {step === 5 && (
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Review Your Request</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-600">Name:</span> <span className="font-medium">{formData.fullName}</span></div>
                  <div><span className="text-gray-600">Email:</span> <span className="font-medium">{formData.email}</span></div>
                  <div><span className="text-gray-600">Company:</span> <span className="font-medium">{formData.companyName}</span></div>
                  <div><span className="text-gray-600">Role:</span> <span className="font-medium">{formData.jobTitle}</span></div>
                  <div><span className="text-gray-600">Budget:</span> <span className="font-medium">{formData.budget}</span></div>
                  <div><span className="text-gray-600">Timeline:</span> <span className="font-medium">{formData.timeline}</span></div>
                  <div className="md:col-span-2"><span className="text-gray-600">Project:</span> <span className="font-medium">{formData.projectTitle}</span></div>
                  <div className="md:col-span-2"><span className="text-gray-600">Description:</span> <span className="font-medium">{formData.projectDescription}</span></div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-6 border-t">
          <button type="button" onClick={handlePrev} disabled={step === 1} className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          {step < totalSteps ? (
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
