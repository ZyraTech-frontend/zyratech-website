import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getTrainingCourseById } from '../../../data/trainingCourses.js';
import TrainingBreadcrumb from './TrainingBreadcrumb';
import useSEO from '../../../hooks/useSEO';
import { Upload, X, FileText, Linkedin, Globe } from 'lucide-react';

const DRAFT_STORAGE_KEY = 'trainingApplicationDraft';

const getInitialFormData = (courseId) => {
  const defaultData = {
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    country: '',
    currentLocation: '',
    educationLevel: '',
    preferredCohort: '',
    learningMode: '',
    message: '',
    cvFile: null,
    cvFileName: '',
    motivationStatement: '',
    linkedinUrl: '',
    websiteUrl: ''
  };

  try {
    const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Only restore if it's for the same course (or no course specified in draft)
      if (!parsed.courseId || parsed.courseId === courseId) {
        return { formData: { ...defaultData, ...parsed.formData }, stepIndex: parsed.stepIndex || 0 };
      }
    }
  } catch {
    // Ignore parse errors
  }
  return { formData: defaultData, stepIndex: 0 };
};

const CourseApplicationForm = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const resolvedCourseTitle = useMemo(() => {
    if (location.state?.courseTitle) return location.state.courseTitle;
    const course = getTrainingCourseById(courseId);
    if (course) return course.title;
    if (!courseId) return '';
    return `Course #${courseId}`;
  }, [courseId, location.state]);

  // Get course category to determine if extra fields are needed
  const courseCategory = useMemo(() => {
    const course = getTrainingCourseById(courseId);
    return course?.category || 'basic';
  }, [courseId]);

  // Check if this is a non-basic program (requires CV, motivation, etc.)
  const requiresExtraFields = useMemo(() => {
    return ['intermediate', 'advanced', 'internship', 'matured'].includes(courseCategory);
  }, [courseCategory]);

  useSEO({
    title: resolvedCourseTitle ? `Apply - ${resolvedCourseTitle}` : 'Course Application',
    description: `Apply for ${resolvedCourseTitle || 'training'} at Zyra Tech Hub. Complete your application to start your tech education journey.`
  });

  const initialState = useMemo(() => getInitialFormData(courseId), [courseId]);

  const [formData, setFormData] = useState(initialState.formData);
  const [stepIndex, setStepIndex] = useState(initialState.stepIndex);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Save draft to localStorage whenever form data or step changes
  const saveDraft = useCallback(() => {
    try {
      localStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify({ courseId, formData, stepIndex })
      );
    } catch {
      // Ignore storage errors (e.g., private browsing)
    }
  }, [courseId, formData, stepIndex]);

  useEffect(() => {
    saveDraft();
  }, [saveDraft]);

  // Clear draft after successful submission
  const clearDraft = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const steps = useMemo(
    () => {
      const baseSteps = [
        { key: 'personal', title: 'Personal Details' },
        { key: 'background', title: 'Background' },
        { key: 'preferences', title: 'Preferences' }
      ];
      
      if (requiresExtraFields) {
        baseSteps.push({ key: 'professional', title: 'Professional Info' });
      }
      
      baseSteps.push({ key: 'review', title: 'Review & Submit' });
      return baseSteps;
    },
    [requiresExtraFields]
  );

  const [errors, setErrors] = useState({});

  const validateStep = (index) => {
    const nextErrors = {};
    const currentStepKey = steps[index]?.key;

    if (currentStepKey === 'personal') {
      if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required.';
      if (!formData.emailAddress.trim()) nextErrors.emailAddress = 'Email is required.';
      if (!formData.phoneNumber.trim()) nextErrors.phoneNumber = 'Phone number is required.';
    }

    if (currentStepKey === 'background') {
      if (!formData.country.trim()) nextErrors.country = 'Country is required.';
      if (!formData.currentLocation.trim()) nextErrors.currentLocation = 'Location is required.';
      if (!formData.educationLevel) nextErrors.educationLevel = 'Select your education level.';
    }

    if (currentStepKey === 'preferences') {
      if (!formData.preferredCohort) nextErrors.preferredCohort = 'Select a preferred cohort.';
      if (!formData.learningMode) nextErrors.learningMode = 'Select a learning mode.';
    }

    if (currentStepKey === 'professional' && requiresExtraFields) {
      if (!formData.cvFile && !formData.cvFileName) nextErrors.cvFile = 'Please upload your CV/Resume.';
      if (!formData.motivationStatement.trim()) nextErrors.motivationStatement = 'Please tell us why you want to join this course.';
    }

    if (currentStepKey === 'review') {
      if (!agreedToTerms) nextErrors.agreedToTerms = 'Please confirm to proceed.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(stepIndex)) return;
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const goBack = () => {
    setErrors({});
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(steps.length - 1)) return;
    clearDraft(); // Clear saved draft on successful submission
    navigate('/training/application-success', {
      state: {
        courseId,
        courseTitle: resolvedCourseTitle,
        applicantName: formData.fullName
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, cvFile: 'Please upload a PDF or Word document.' }));
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, cvFile: 'File size must be less than 5MB.' }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        cvFile: file,
        cvFileName: file.name
      }));
      setErrors(prev => ({ ...prev, cvFile: undefined }));
    }
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      cvFile: null,
      cvFileName: ''
    }));
  };

  const educationLevels = [
    'JHS / SHS',
    'Diploma',
    'Undergraduate',
    'Graduate',
    'Other'
  ];

  const cohorts = [
    'January to April',
    'April to July',
    'July to October'
  ];

  const learningModes = [
    'Online',
    'Onsite',
    'Hybrid'
  ];

  return (
    <section className="py-6 sm:py-8 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrainingBreadcrumb
          className="mb-6"
          items={[
            { label: 'Programs', link: '/training/programs' },
            { label: resolvedCourseTitle, link: `/training/course/${courseId}` },
            { label: 'Apply' }
          ]}
        />
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black">Course Application</h2>
            <div className="text-sm sm:text-base text-gray-600 mt-2">
              Applying for <span className="font-semibold text-black">{resolvedCourseTitle}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/training/course/${courseId}`)}
            className="w-full sm:w-auto border border-gray-200 text-gray-700 hover:border-[#004fa2] hover:text-[#004fa2] px-5 py-2.5 text-base font-medium rounded-lg transition-all duration-200"
          >
            Back to Course
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="mb-6">
            <div className="flex flex-col gap-2 sm:grid sm:grid-cols-4 sm:gap-3 mb-3">
              {steps.map((s, idx) => (
                <div key={s.key} className="w-full">
                  <div
                    className={`flex items-center gap-2 rounded-lg px-2 py-1.5 sm:px-0 sm:py-0 sm:rounded-none ${
                      idx === stepIndex ? 'bg-[#004fa2]/10 border border-[#004fa2]/20 sm:bg-transparent sm:border-transparent' : 'bg-transparent border border-transparent'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                        idx < stepIndex
                          ? 'bg-green-600 text-white'
                          : idx === stepIndex
                            ? 'bg-[#004fa2] text-white'
                            : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className={`text-sm sm:text-base font-semibold ${idx === stepIndex ? 'text-black' : 'text-gray-500'}`}>
                      {s.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#004fa2] rounded-full transition-all duration-300"
                style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {steps[stepIndex]?.key === 'personal' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  />
                  {errors.fullName && <div className="text-sm text-red-600 mt-1">{errors.fullName}</div>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  />
                  {errors.emailAddress && <div className="text-sm text-red-600 mt-1">{errors.emailAddress}</div>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+233..."
                    className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  />
                  {errors.phoneNumber && <div className="text-sm text-red-600 mt-1">{errors.phoneNumber}</div>}
                </div>
              </div>
            )}

            {steps[stepIndex]?.key === 'background' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Ghana"
                    className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  />
                  {errors.country && <div className="text-sm text-red-600 mt-1">{errors.country}</div>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Location (City/Town)</label>
                  <input
                    type="text"
                    name="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleInputChange}
                    placeholder="Koforidua"
                    className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  />
                  {errors.currentLocation && <div className="text-sm text-red-600 mt-1">{errors.currentLocation}</div>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
                  <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  >
                    <option value="">Select education level</option>
                    {educationLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  {errors.educationLevel && <div className="text-sm text-red-600 mt-1">{errors.educationLevel}</div>}
                </div>
              </div>
            )}

            {steps[stepIndex]?.key === 'preferences' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Cohort</label>
                  <select
                    name="preferredCohort"
                    value={formData.preferredCohort}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  >
                    <option value="">Select cohort</option>
                    {cohorts.map((cohort) => (
                      <option key={cohort} value={cohort}>
                        {cohort}
                      </option>
                    ))}
                  </select>
                  {errors.preferredCohort && <div className="text-sm text-red-600 mt-1">{errors.preferredCohort}</div>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Learning Mode</label>
                  <select
                    name="learningMode"
                    value={formData.learningMode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  >
                    <option value="">Select mode</option>
                    {learningModes.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode}
                      </option>
                    ))}
                  </select>
                  {errors.learningMode && <div className="text-sm text-red-600 mt-1">{errors.learningMode}</div>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message (optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Any additional information or questions..."
                    className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  />
                </div>
              </div>
            )}

            {/* Professional Info Step - Only for non-basic programs */}
            {steps[stepIndex]?.key === 'professional' && requiresExtraFields && (
              <div className="space-y-6">
                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CV / Resume <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    {formData.cvFileName ? (
                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText size={24} className="text-green-600" />
                          <div>
                            <p className="font-medium text-gray-900">{formData.cvFileName}</p>
                            <p className="text-sm text-gray-500">File uploaded successfully</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#004fa2] hover:bg-gray-50 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload size={32} className="text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-[#004fa2]">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 mt-1">PDF or Word document (max 5MB)</p>
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  {errors.cvFile && <div className="text-sm text-red-600 mt-1">{errors.cvFile}</div>}
                </div>

                {/* Motivation Statement */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to join this course? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="motivationStatement"
                    value={formData.motivationStatement}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Tell us about your motivation, career goals, and what you hope to achieve from this program..."
                    className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  />
                  {errors.motivationStatement && <div className="text-sm text-red-600 mt-1">{errors.motivationStatement}</div>}
                </div>

                {/* LinkedIn & Website - Optional */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="flex items-center gap-2">
                        <Linkedin size={16} className="text-[#0077B5]" />
                        LinkedIn Profile (optional)
                      </span>
                    </label>
                    <input
                      type="url"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="flex items-center gap-2">
                        <Globe size={16} className="text-gray-500" />
                        Personal Website / Portfolio (optional)
                      </span>
                    </label>
                    <input
                      type="url"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                      className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {steps[stepIndex]?.key === 'review' && (
              <div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 sm:p-8 mb-6">
                  <div className="text-base font-bold text-gray-900 mb-4">Review your application</div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
                    <div>
                      <div className="text-xs text-gray-500">Course</div>
                      <div className="font-semibold text-gray-900 break-words">{resolvedCourseTitle}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Full Name</div>
                      <div className="font-semibold text-gray-900 break-words">{formData.fullName || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="font-semibold text-gray-900 break-words">{formData.emailAddress || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Phone Number</div>
                      <div className="font-semibold text-gray-900 break-words">{formData.phoneNumber || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Location</div>
                      <div className="font-semibold text-gray-900 break-words">{formData.currentLocation || '-'}, {formData.country || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Education Level</div>
                      <div className="font-semibold text-gray-900 break-words">{formData.educationLevel || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Cohort / Mode</div>
                      <div className="font-semibold text-gray-900 break-words">{formData.preferredCohort || '-'} / {formData.learningMode || '-'}</div>
                    </div>
                    
                    {/* Professional Info - Only show for non-basic programs */}
                    {requiresExtraFields && (
                      <>
                        <div className="md:col-span-2 pt-4 border-t border-gray-200 mt-2">
                          <div className="text-xs text-gray-500 font-semibold text-[#004fa2] mb-1">Professional Information</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">CV/Resume</div>
                          <div className="font-semibold text-gray-900 break-words flex items-center gap-2">
                            {formData.cvFileName ? (
                              <>
                                <FileText size={16} className="text-green-600" />
                                {formData.cvFileName}
                              </>
                            ) : '-'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">LinkedIn</div>
                          <div className="font-semibold text-gray-900 break-words">
                            {formData.linkedinUrl ? (
                              <a href={formData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[#0077B5] hover:underline">
                                {formData.linkedinUrl}
                              </a>
                            ) : '-'}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Website/Portfolio</div>
                          <div className="font-semibold text-gray-900 break-words">
                            {formData.websiteUrl ? (
                              <a href={formData.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-[#004fa2] hover:underline">
                                {formData.websiteUrl}
                              </a>
                            ) : '-'}
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <div className="text-xs text-gray-500">Motivation Statement</div>
                          <div className="font-semibold text-gray-900 break-words whitespace-pre-wrap">{formData.motivationStatement?.trim() || '-'}</div>
                        </div>
                      </>
                    )}
                    
                    <div className="md:col-span-2">
                      <div className="text-xs text-gray-500">Additional Message</div>
                      <div className="font-semibold text-gray-900 break-words">{formData.message?.trim() ? formData.message : '-'}</div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-5 h-5 text-[#004fa2] border-gray-300 rounded focus:ring-[#004fa2] mt-0.5"
                    />
                    <span className="text-sm text-gray-700">I confirm the information provided is accurate and I agree to be contacted by Zyra Tech Hub.</span>
                  </label>
                  {errors.agreedToTerms && <div className="text-sm text-red-600 mt-1">{errors.agreedToTerms}</div>}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-between">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-full sm:w-auto border border-gray-200 text-gray-700 hover:border-[#004fa2] hover:text-[#004fa2] px-7 py-3 text-base font-medium rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>

                {stepIndex > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="w-full sm:w-auto border border-gray-200 text-gray-700 hover:border-[#004fa2] hover:text-[#004fa2] px-7 py-3 text-base font-medium rounded-lg transition-all duration-200"
                  >
                    Back
                  </button>
                )}
              </div>

              {stepIndex < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="cta-btn px-7 py-3 text-base font-semibold w-full sm:w-auto rounded-lg"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="cta-btn px-7 py-3 text-base font-semibold w-full sm:w-auto rounded-lg"
                >
                  Submit Application
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CourseApplicationForm;
