import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const CourseApplicationForm = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const courseOptions = useMemo(
    () => [
      { id: 1, title: 'DevOps Engineering' },
      { id: 2, title: 'Cloud Computing (AWS/Azure)' },
      { id: 3, title: 'Full Stack Web Development' },
      { id: 4, title: 'Corporate Digital Transformation' },
      { id: 5, title: 'Data Science & Analytics' },
      { id: 6, title: 'Cloud Architecture' },
      { id: 7, title: 'AI & Machine Learning' },
      { id: 8, title: 'IT Fundamentals for Professionals' },
      { id: 9, title: 'Digital Literacy & Office Automation' },
      { id: 10, title: 'Career Transition to Tech Program' },
      { id: 11, title: 'Software Development Internship' }
    ],
    []
  );

  const resolvedCourseTitle = useMemo(() => {
    if (location.state?.courseTitle) return location.state.courseTitle;
    const id = Number(courseId);
    const match = courseOptions.find((c) => c.id === id);
    if (match) return match.title;
    if (!courseId) return '';
    return `Course #${courseId}`;
  }, [courseId, courseOptions, location.state]);

  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    country: '',
    currentLocation: '',
    educationLevel: '',
    experienceLevel: '',
    preferredCohort: '',
    learningMode: '',
    message: ''
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const steps = useMemo(
    () => [
      { key: 'personal', title: 'Personal Details' },
      { key: 'background', title: 'Background' },
      { key: 'preferences', title: 'Preferences' },
      { key: 'review', title: 'Review & Submit' }
    ],
    []
  );

  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState({});

  const validateStep = (index) => {
    const nextErrors = {};

    if (index === 0) {
      if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required.';
      if (!formData.emailAddress.trim()) nextErrors.emailAddress = 'Email is required.';
      if (!formData.phoneNumber.trim()) nextErrors.phoneNumber = 'Phone/WhatsApp is required.';
    }

    if (index === 1) {
      if (!formData.country.trim()) nextErrors.country = 'Country is required.';
      if (!formData.currentLocation.trim()) nextErrors.currentLocation = 'Location is required.';
      if (!formData.educationLevel) nextErrors.educationLevel = 'Select your education level.';
      if (!formData.experienceLevel) nextErrors.experienceLevel = 'Select your experience level.';
    }

    if (index === 2) {
      if (!formData.preferredCohort) nextErrors.preferredCohort = 'Select a preferred cohort.';
      if (!formData.learningMode) nextErrors.learningMode = 'Select a learning mode.';
    }

    if (index === 3) {
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
    if (!validateStep(3)) return;
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

  const educationLevels = [
    'JHS / SHS',
    'Diploma',
    'Undergraduate',
    'Graduate',
    'Other'
  ];

  const experienceLevels = [
    'Beginner',
    'Intermediate',
    'Advanced'
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
    <section className="py-8 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-black">Course Application</h2>
            <div className="text-sm text-gray-600 mt-1">
              Applying for <span className="font-semibold text-black">{resolvedCourseTitle}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/training/course/${courseId}`)}
            className="border border-gray-200 text-gray-700 hover:border-[#004fa2] hover:text-[#004fa2] px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
          >
            Back to Course
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              {steps.map((s, idx) => (
                <div key={s.key} className="flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        idx < stepIndex
                          ? 'bg-green-600 text-white'
                          : idx === stepIndex
                            ? 'bg-[#004fa2] text-white'
                            : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className={`text-xs sm:text-sm font-semibold ${idx === stepIndex ? 'text-black' : 'text-gray-500'}`}>
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
            {stepIndex === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  />
                  {errors.fullName && <div className="text-xs text-red-600 mt-1">{errors.fullName}</div>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  />
                  {errors.emailAddress && <div className="text-xs text-red-600 mt-1">{errors.emailAddress}</div>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+233..."
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  />
                  {errors.phoneNumber && <div className="text-xs text-red-600 mt-1">{errors.phoneNumber}</div>}
                </div>
              </div>
            )}

            {stepIndex === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Ghana"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  />
                  {errors.country && <div className="text-xs text-red-600 mt-1">{errors.country}</div>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Current Location (City/Town)</label>
                  <input
                    type="text"
                    name="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleInputChange}
                    placeholder="Koforidua"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  />
                  {errors.currentLocation && <div className="text-xs text-red-600 mt-1">{errors.currentLocation}</div>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Education Level</label>
                  <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  >
                    <option value="">Select education level</option>
                    {educationLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  {errors.educationLevel && <div className="text-xs text-red-600 mt-1">{errors.educationLevel}</div>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Experience Level</label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  >
                    <option value="">Select level</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  {errors.experienceLevel && <div className="text-xs text-red-600 mt-1">{errors.experienceLevel}</div>}
                </div>
              </div>
            )}

            {stepIndex === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Preferred Cohort</label>
                  <select
                    name="preferredCohort"
                    value={formData.preferredCohort}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  >
                    <option value="">Select cohort</option>
                    {cohorts.map((cohort) => (
                      <option key={cohort} value={cohort}>
                        {cohort}
                      </option>
                    ))}
                  </select>
                  {errors.preferredCohort && <div className="text-xs text-red-600 mt-1">{errors.preferredCohort}</div>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Learning Mode</label>
                  <select
                    name="learningMode"
                    value={formData.learningMode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  >
                    <option value="">Select mode</option>
                    {learningModes.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode}
                      </option>
                    ))}
                  </select>
                  {errors.learningMode && <div className="text-xs text-red-600 mt-1">{errors.learningMode}</div>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Message (optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us why you want to join this course, your background, or any questions..."
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-200"
                  />
                </div>
              </div>
            )}

            {stepIndex === 3 && (
              <div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
                  <div className="text-sm font-bold text-gray-900 mb-4">Review your application</div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-gray-500">Course</div>
                      <div className="font-semibold text-gray-900">{resolvedCourseTitle}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Full Name</div>
                      <div className="font-semibold text-gray-900">{formData.fullName || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="font-semibold text-gray-900">{formData.emailAddress || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Phone/WhatsApp</div>
                      <div className="font-semibold text-gray-900">{formData.phoneNumber || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Location</div>
                      <div className="font-semibold text-gray-900">{formData.currentLocation || '-'}, {formData.country || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Education / Experience</div>
                      <div className="font-semibold text-gray-900">{formData.educationLevel || '-'} / {formData.experienceLevel || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Cohort / Mode</div>
                      <div className="font-semibold text-gray-900">{formData.preferredCohort || '-'} / {formData.learningMode || '-'}</div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-xs text-gray-500">Message</div>
                      <div className="font-semibold text-gray-900">{formData.message?.trim() ? formData.message : '-'}</div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-4 h-4 text-[#004fa2] border-gray-300 rounded focus:ring-[#004fa2] mt-0.5"
                    />
                    <span className="text-xs text-gray-700">I confirm the information provided is accurate and I agree to be contacted by Zyra Tech Hub.</span>
                  </label>
                  {errors.agreedToTerms && <div className="text-xs text-red-600 mt-1">{errors.agreedToTerms}</div>}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-between">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="border border-gray-200 text-gray-700 hover:border-[#004fa2] hover:text-[#004fa2] px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>

                {stepIndex > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="border border-gray-200 text-gray-700 hover:border-[#004fa2] hover:text-[#004fa2] px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200"
                  >
                    Back
                  </button>
                )}
              </div>

              {stepIndex < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="bg-[#004fa2] hover:bg-[#000000] text-white px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#004fa2] hover:bg-[#000000] text-white px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
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
