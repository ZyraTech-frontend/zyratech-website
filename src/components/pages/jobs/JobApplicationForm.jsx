import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Upload, Plus, Search } from 'lucide-react';

const JobApplicationForm = ({ job, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    city: '',
    phoneNumber: '',
    // Experience
    experiences: [],
    // Profiles
    linkedin: '',
    facebook: '',
    twitter: '',
    website: '',
    // Resume & Message
    resume: null,
    resumeFileName: '',
    message: '',
    // Preliminary Questions
    title: '',
    legalAuthorization: '',
    workExperience: '',
    residence: '',
    currentSalary: '',
    howDidYouKnowZyra: '',
    uploadDocuments: false,
    additionalAttachments: null,
    additionalFileName: '',
    disability: '',
    references: '',
    howDidYouKnowJob: '',
    backgroundCheck: '',
    criminalCharges: '',
    certifyTruth: false,
    fullName: '',
    agreePrivacy: false
  });

  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Profiles & Resume' },
    { number: 3, title: 'Preliminary Questions' },
    { number: 4, title: 'Final Details' },
    { number: 5, title: 'Preview' }
  ];

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: file,
        [`${fieldName}FileName`]: file.name
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { company: '', position: '', duration: '', description: '' }]
    }));
  };

  const updateExperience = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const validateStep = () => {
    if (step === 1) {
      return formData.firstName.trim() && formData.lastName.trim() && 
             formData.email.trim() && formData.confirmEmail.trim() && 
             formData.city.trim() && formData.phoneNumber.trim();
    }
    if (step === 2) {
      return formData.message.trim();
    }
    if (step === 3) {
      return formData.legalAuthorization && formData.workExperience && 
             formData.residence.trim() && formData.currentSalary.trim() && 
             formData.howDidYouKnowZyra.trim();
    }
    if (step === 4) {
      return formData.certifyTruth && formData.fullName.trim() && formData.agreePrivacy;
    }
    if (step === 5) {
      return true; // Preview step always valid
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
    console.log('Job Application:', formData);
    setSubmitted(true);
    setTimeout(() => onSubmit(), 2000);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
        <p className="text-gray-600 mb-6">Thank you for applying to {job.title}. We will review your application and contact you soon.</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <p><strong>Confirmation Email:</strong> A confirmation has been sent to {formData.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
      {/* Step Indicator */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-center mb-3 sm:mb-4 overflow-x-auto">
          {steps.map((s, idx) => (
            <div key={s.number} className="flex items-center flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setStep(s.number)}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all flex-shrink-0 ${
                  step >= s.number 
                    ? 'bg-[#004fa2] text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {step > s.number ? <Check className="w-3 h-3 sm:w-5 sm:h-5" /> : s.number}
              </button>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-0.5 sm:h-1 mx-1 sm:mx-2 transition-all ${
                  step > s.number ? 'bg-[#004fa2]' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-xs sm:text-sm text-gray-600">Step {step} of 5: {steps[step - 1].title}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Personal Information</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Please provide your basic information. Fields marked with <span className="text-red-500">*</span> are required.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#004fa2] focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#004fa2] focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#004fa2] focus:border-transparent text-sm sm:text-base"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Confirm Email Address *</label>
                  <input
                    type="email"
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#004fa2] focus:border-transparent text-sm sm:text-base"
                    placeholder="Confirm your email"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Work Preference *</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#004fa2] focus:border-transparent text-sm sm:text-base"
                    required
                  >
                    <option value="">Select work preference</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Phone Number *</label>
                  <div className="flex">
                    <select className="border border-gray-300 rounded-l-lg px-2 sm:px-3 py-2 sm:py-3 bg-white border-r-0 text-sm sm:text-base">
                      <option>🇬🇭 +233</option>
                    </select>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="flex-1 border border-gray-300 rounded-r-lg px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#004fa2] focus:border-transparent text-sm sm:text-base"
                      placeholder="XXX XXX XXXX"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Your Profiles & Resume */}
        {step === 2 && (
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Your Profiles</h3>
            <p className="text-gray-600 text-sm sm:text-base">Fields marked with <span className="text-red-500">*</span> are required.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#004fa2] text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">Facebook</label>
                <input
                  type="url"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#004fa2] text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">X (fka Twitter)</label>
                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#004fa2] text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm sm:text-base">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#004fa2] text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Resume Section */}
            <div className="mt-6 sm:mt-8">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Resume <span className="text-red-500">*</span></h4>
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 sm:p-8 text-center bg-gray-50 relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => handleFileChange(e, 'resume')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-blue-500 font-medium text-sm sm:text-base">Choose a file or drop it here</p>
                <p className="text-gray-500 text-xs sm:text-sm">10MB size limit</p>
                {formData.resumeFileName && (
                  <p className="text-green-600 text-xs sm:text-sm mt-2">Selected: {formData.resumeFileName}</p>
                )}
              </div>
            </div>

            {/* Message Section */}
            <div className="mt-6 sm:mt-8">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Message to the Hiring Team</h4>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Let the company know about your interest working there</p>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 h-24 sm:h-32 focus:outline-none focus:border-[#004fa2] text-sm sm:text-base"
                placeholder="Write your message here..."
                required
              />
            </div>
          </div>
        )}

        {/* Step 3: Preliminary Questions */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Preliminary questions</h3>
            <p className="text-gray-600 mb-6">ZyraTech is an Equal Opportunity Enthusiast and does not discriminate on the basis of Gender, Race, Religion or Disability. Females and Persons Living with Disabilities (PWDs) are particularly encouraged to apply.</p>
            
            <div>
              <label className="block text-gray-700 mb-2">Title</label>
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:border-[#004fa2]"
                />
                <Search className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Do you have legal authorisation to live and work in the job location? *</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="legalAuthorization"
                    value="yes"
                    checked={formData.legalAuthorization === 'yes'}
                    onChange={handleChange}
                    className="mr-2"
                    required
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="legalAuthorization"
                    value="no"
                    checked={formData.legalAuthorization === 'no'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Months of related work experience. (e.g. 24) *</label>
              <input
                type="number"
                name="workExperience"
                value={formData.workExperience}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#004fa2]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">City/Town of residence *</label>
              <input
                type="text"
                name="residence"
                value={formData.residence}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#004fa2]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Current or last gross monthly salary earned (if currently unemployed). <em>You may input the exact or approximate figure. (e.g. RWF 450000 , GHC 5000)</em> *</label>
              <input
                type="text"
                name="currentSalary"
                value={formData.currentSalary}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#004fa2]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">How did you know about ZyraTech? *</label>
              <div className="relative">
                <input
                  type="text"
                  name="howDidYouKnowZyra"
                  value={formData.howDidYouKnowZyra}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:border-[#004fa2]"
                  required
                />
                <Search className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Final Details */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="uploadDocuments"
                  checked={formData.uploadDocuments}
                  onChange={handleChange}
                  className="mr-2"
                />
                Upload required documents
              </label>
              
              {formData.uploadDocuments && (
                <div className="space-y-4">
                  <p className="text-gray-600">Name the attached files accordingly. (e.g. John Doe_CV, John Doe_Photo, John Doe_ID Card)</p>
                  <div className="text-sm text-gray-600">
                    <p>(1) Latest copy of CV <em>(required)</em></p>
                    <p>(2) Scanned copy of valid ID Card <em>(required)</em></p>
                    <p>(3) Industry certificates <em>(required, if any)</em></p>
                  </div>
                  <p className="text-gray-600">Click on <strong>ADD ATTACHMENT</strong> below and attach the required documents.</p>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Additional attachments</label>
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center bg-gray-50 relative">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                        onChange={(e) => handleFileChange(e, 'additionalAttachments')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Upload className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <p className="text-blue-500 font-medium">Choose a file or drop it here</p>
                      <p className="text-xs text-gray-500 mt-2">Supported files: DOC, DOT, RMR, RSM, RESUME, OXPS, PDF, P7S, AI, RTF, PAGES, GDOC, GSLIDES, XLS, XLSM, PUB, MSG, PPT, WPS, ODS, ODT, PPTX, PPSX, XLSX, DOCX, DOTX, SXW, WPD, ABW, MP3, M4A, WAV, PSD, EML, ICAL, ICS, IFB, ICALENDAR, ICS_RESPONSE, CSV, TXT, TEXT, VCF, MP4, MOV, BMP, GIF, JFIF, JPEG, JPG, PNG, TIF, TIFF, WEBP (10MB size limit)</p>
                      {formData.additionalFileName && (
                        <p className="text-green-600 text-sm mt-2">Selected: {formData.additionalFileName}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">ZyraTech is committed to fostering an inclusive learning environment that values diversity. We believe in creating equal opportunities for all individuals, including those with disabilities. To ensure we accommodate your needs effectively, please select the disability that applies to you. *</label>
              <div className="relative">
                <input
                  type="text"
                  name="disability"
                  value={formData.disability}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:border-[#004fa2]"
                />
                <Search className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Kindly provide names, job title, company, phone numbers and e-mail addresses of at least two (2) references.</label>
              <div className="text-sm text-gray-600 mb-4">
                <p><strong>For Example:</strong></p>
                <p>Name: John Doe</p>
                <p>Job Title: Accountant</p>
                <p>Company: XYZ Company</p>
                <p>Phone: +233 21 345 6789</p>
                <p>E-mail Address: example@email.com</p>
                <br />
                <p>Name: Jane Doe</p>
                <p>Job Title: Administrator</p>
                <p>Company: ABC Company</p>
              </div>
              <textarea
                name="references"
                value={formData.references}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 h-32 focus:outline-none focus:border-[#004fa2]"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">How did you know about the job? *</label>
              <div className="relative">
                <input
                  type="text"
                  name="howDidYouKnowJob"
                  value={formData.howDidYouKnowJob}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:border-[#004fa2]"
                />
                <Search className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Are you willing to submit to a background check? *</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="backgroundCheck"
                    value="yes"
                    checked={formData.backgroundCheck === 'yes'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="backgroundCheck"
                    value="no"
                    checked={formData.backgroundCheck === 'no'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Have you been convicted, pleaded guilty or no contest to a crime, or are criminal charges pending against you?</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="criminalCharges"
                    value="yes"
                    checked={formData.criminalCharges === 'yes'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="criminalCharges"
                    value="no"
                    checked={formData.criminalCharges === 'no'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="certifyTruth"
                  checked={formData.certifyTruth}
                  onChange={handleChange}
                  className="mr-2 mt-1"
                  required
                />
                <span className="text-gray-700">I certify that the information provided in this application are true to the best of my knowledge, and any false statements made will render my application not being considered or the termination of my employment with ZyraTech. *</span>
              </label>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Full Name (First name (Middle name) Last name) <em>This serves as an endorsement and signature for your application.</em> *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#004fa2]"
                required
              />
            </div>

            <div>
              <p className="text-gray-700 mb-2">Please review the ZyraTech <a href="#" className="text-blue-500 underline">Privacy Policy</a>.</p>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleChange}
                  className="mr-2 mt-1"
                  required
                />
                <span className="text-gray-700">You declare that you read and agree to the privacy policy of ZyraTech. *</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 5: Preview */}
        {step === 5 && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-blue-800">Please review all your information below before submitting. You can go back to edit any details.</p>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Personal Information</h4>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="text-gray-600 font-medium sm:min-w-[120px]">First Name:</span> 
                    <span className="font-medium text-gray-900">{formData.firstName || 'Not provided'}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="text-gray-600 font-medium sm:min-w-[120px]">Last Name:</span> 
                    <span className="font-medium text-gray-900">{formData.lastName || 'Not provided'}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="text-gray-600 font-medium sm:min-w-[120px]">Email:</span> 
                    <span className="font-medium text-gray-900 break-all">{formData.email || 'Not provided'}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="text-gray-600 font-medium sm:min-w-[120px]">Phone:</span> 
                    <span className="font-medium text-gray-900">{formData.phoneNumber || 'Not provided'}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="text-gray-600 font-medium sm:min-w-[120px]">Work Preference:</span> 
                    <span className="font-medium text-gray-900 capitalize">{formData.city || 'Not provided'}</span>
                  </div>
                </div>
              </div>
              
              {/* Profiles & Resume */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Profiles & Resume</h4>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  {formData.linkedin && (
                    <div className="flex flex-col sm:flex-row sm:gap-2">
                      <span className="text-gray-600 font-medium sm:min-w-[120px]">LinkedIn:</span> 
                      <span className="font-medium text-gray-900 break-all">{formData.linkedin}</span>
                    </div>
                  )}
                  {formData.facebook && (
                    <div className="flex flex-col sm:flex-row sm:gap-2">
                      <span className="text-gray-600 font-medium sm:min-w-[120px]">Facebook:</span> 
                      <span className="font-medium text-gray-900 break-all">{formData.facebook}</span>
                    </div>
                  )}
                  {formData.twitter && (
                    <div className="flex flex-col sm:flex-row sm:gap-2">
                      <span className="text-gray-600 font-medium sm:min-w-[120px]">Twitter:</span> 
                      <span className="font-medium text-gray-900 break-all">{formData.twitter}</span>
                    </div>
                  )}
                  {formData.website && (
                    <div className="flex flex-col sm:flex-row sm:gap-2">
                      <span className="text-gray-600 font-medium sm:min-w-[120px]">Website:</span> 
                      <span className="font-medium text-gray-900 break-all">{formData.website}</span>
                    </div>
                  )}
                  {formData.resumeFileName && (
                    <div className="flex flex-col sm:flex-row sm:gap-2">
                      <span className="text-gray-600 font-medium sm:min-w-[120px]">Resume:</span> 
                      <span className="font-medium text-gray-900">{formData.resumeFileName}</span>
                    </div>
                  )}
                  {formData.message && (
                    <div className="flex flex-col sm:gap-2">
                      <span className="text-gray-600 font-medium">Message:</span> 
                      <div className="font-medium text-gray-900 bg-white p-2 sm:p-3 rounded border mt-1 sm:mt-2">
                        {formData.message}
                      </div>
                    </div>
                  )}
                  {!formData.linkedin && !formData.facebook && !formData.twitter && !formData.website && !formData.resumeFileName && !formData.message && (
                    <p className="text-gray-500 italic">No profiles or resume information provided</p>
                  )}
                </div>
              </div>
              
              {/* Application Details */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Application Details</h4>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="text-gray-600 font-medium sm:min-w-[140px]">Legal Authorization:</span> 
                    <span className="font-medium text-gray-900 capitalize">{formData.legalAuthorization || 'Not provided'}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="text-gray-600 font-medium sm:min-w-[140px]">Work Experience:</span> 
                    <span className="font-medium text-gray-900">{formData.workExperience ? `${formData.workExperience} months` : 'Not provided'}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="text-gray-600 font-medium sm:min-w-[140px]">Residence:</span> 
                    <span className="font-medium text-gray-900">{formData.residence || 'Not provided'}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="text-gray-600 font-medium sm:min-w-[140px]">Current Salary:</span> 
                    <span className="font-medium text-gray-900">{formData.currentSalary || 'Not provided'}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="text-gray-600 font-medium sm:min-w-[140px]">Know ZyraTech:</span> 
                    <span className="font-medium text-gray-900">{formData.howDidYouKnowZyra || 'Not provided'}</span>
                  </div>
                  {formData.backgroundCheck && (
                    <div className="flex flex-col sm:flex-row sm:gap-2">
                      <span className="text-gray-600 font-medium sm:min-w-[140px]">Background Check:</span> 
                      <span className="font-medium text-gray-900 capitalize">{formData.backgroundCheck}</span>
                    </div>
                  )}
                  {formData.howDidYouKnowJob && (
                    <div className="flex flex-col sm:flex-row sm:gap-2">
                      <span className="text-gray-600 font-medium sm:min-w-[140px]">Know about Job:</span> 
                      <span className="font-medium text-gray-900">{formData.howDidYouKnowJob}</span>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="text-gray-600 font-medium sm:min-w-[140px]">Full Name:</span> 
                    <span className="font-medium text-gray-900">{formData.fullName || 'Not provided'}</span>
                  </div>
                </div>
              </div>
              
              {/* Additional Information */}
              {(formData.references || formData.additionalFileName || formData.disability) && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Additional Information</h4>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    {formData.references && (
                      <div className="flex flex-col sm:gap-2">
                        <span className="text-gray-600 font-medium">References:</span> 
                        <div className="font-medium text-gray-900 bg-white p-2 sm:p-3 rounded border mt-1 sm:mt-2 whitespace-pre-line">
                          {formData.references}
                        </div>
                      </div>
                    )}
                    {formData.additionalFileName && (
                      <div className="flex flex-col sm:flex-row sm:gap-2">
                        <span className="text-gray-600 font-medium sm:min-w-[140px]">Additional Files:</span> 
                        <span className="font-medium text-gray-900">{formData.additionalFileName}</span>
                      </div>
                    )}
                    {formData.disability && (
                      <div className="flex flex-col sm:flex-row sm:gap-2">
                        <span className="text-gray-600 font-medium sm:min-w-[140px]">Disability Info:</span> 
                        <span className="font-medium text-gray-900">{formData.disability}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Agreements */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Agreements</h4>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Check className={`w-3 h-3 sm:w-4 sm:h-4 ${formData.certifyTruth ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-gray-700">Information certification: {formData.certifyTruth ? 'Agreed' : 'Not agreed'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className={`w-3 h-3 sm:w-4 sm:h-4 ${formData.agreePrivacy ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-gray-700">Privacy policy: {formData.agreePrivacy ? 'Agreed' : 'Not agreed'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t">
          <button 
            type="button" 
            onClick={handlePrev} 
            disabled={step === 1} 
            className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          {step < 5 ? (
            <button 
              type="button" 
              onClick={handleNext} 
              disabled={!validateStep()} 
              className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              type="submit" 
              disabled={!validateStep()}
              className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-sm sm:text-base"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;