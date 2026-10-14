import React, { useState, useEffect } from 'react';
import { ChevronRight, MapPin, Mail, Phone, Send, User, MessageSquare, Globe, ChevronDown } from 'lucide-react';
import { FaLinkedinIn, FaXTwitter, FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../../../store/slices/uiSlice';
import { fetchSettings } from '../../../store/slices/settingsSlice';
import contactInquiryService from '../../../services/contactInquiryService';
import emailNotificationService from '../../../services/emailNotificationService';
import { validatePhoneNumber, getPhoneInputAttributes, COUNTRY_CODES, formatCompletePhoneNumber } from '../../../utils/phoneValidation';

const ContactHero = () => {
  const dispatch = useDispatch();
  const { values: settings } = useSelector((state) => state.settings);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: 'GH',
    phone: '',
    inquiryType: '',
    message: ''
  });

  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    dispatch(fetchSettings());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation - Required fields
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      dispatch(addNotification({
        message: 'Please fill in all required fields',
        type: 'warning'
      }));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      dispatch(addNotification({
        message: 'Please enter a valid email address',
        type: 'warning'
      }));
      return;
    }

    // Full Name validation - only letters, spaces, hyphens, apostrophes
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    if (!nameRegex.test(formData.fullName.trim())) {
      dispatch(addNotification({
        message: 'Full name can only contain letters, spaces, hyphens, and apostrophes',
        type: 'warning'
      }));
      return;
    }

    // Phone validation - REQUIRED
    if (!formData.phone.trim()) {
      dispatch(addNotification({
        message: 'Phone number is required',
        type: 'warning'
      }));
      return;
    }

    const phoneValidation = validatePhoneNumber(formData.phone);
    if (!phoneValidation.isValid) {
      dispatch(addNotification({
        message: phoneValidation.error,
        type: 'warning'
      }));
      return;
    }

    // Message validation - min 10 characters
    if (formData.message.trim().length < 10) {
      dispatch(addNotification({
        message: 'Message must be at least 10 characters long',
        type: 'warning'
      }));
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit inquiry to backend
      const inquiry = await contactInquiryService.submitInquiry({
        name: formData.fullName,
        email: formData.email,
        phone: formatCompletePhoneNumber(formData.countryCode, formData.phone),
        subject: formData.inquiryType || 'General Inquiry',
        message: formData.message
      });

      // Send confirmation email to user
      try {
        await emailNotificationService.sendContactConfirmation({
          email: formData.email,
          name: formData.fullName,
          subject: formData.inquiryType || 'General Inquiry',
          inquiryId: inquiry.id
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the submission if email fails
      }

      dispatch(addNotification({
        message: 'Your inquiry has been submitted successfully! We will contact you soon. A confirmation email has been sent to your inbox.',
        type: 'success'
      }));

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        countryCode: 'GH',
        phone: '',
        inquiryType: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
      dispatch(addNotification({
        message: error.response?.data?.message || 'Failed to submit inquiry. Please try again.',
        type: 'error'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <section className="pt-16 sm:pt-20 lg:pt-24 pb-12 bg-white from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Content - Contact Form */}
          <div className={`lg:col-span-2 p-6 sm:bg-white sm:rounded-2xl sm:border sm:border-gray-200 sm:shadow-lg hover:shadow-2xl sm:p-8 transition-all duration-700 hover:scale-[1.02] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight mb-4">
                Contact Zyra Tech Hub
              </h1>
              <p className="text-base text-gray-600 leading-relaxed">
                Let's build something great together. Reach out to us for partnerships, internships, services, or any inquiries.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  pattern="[a-zA-Z\s\-']+"
                  maxLength="100"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-300 text-sm hover:border-gray-400"
                  placeholder="Full Name"
                  title="Full name can only contain letters, spaces, hyphens, and apostrophes"
                />

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-300 text-sm hover:border-gray-400"
                  placeholder="Email Address"
                />
              </div>

              {/* Professional Phone Input with Country Code Selector (Like MoMo) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                
                {/* Helper Text - NO PHONE NUMBERS */}
                <p className="text-xs text-gray-500 -mt-1">
                  💡 Tip: Enter your phone number without the leading 0
                </p>

                <div className="flex gap-2 items-stretch">
                  {/* Country Code Selector - Simple Dropdown */}
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="h-12 px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-300 hover:border-gray-400 bg-white appearance-none min-w-[140px] cursor-pointer text-sm font-medium"
                  >
                    {COUNTRY_CODES.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.name} ({country.dial})
                      </option>
                    ))}
                  </select>

                  {/* Phone Number Input */}
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    {...getPhoneInputAttributes()}
                    required
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-300 text-sm hover:border-gray-400"
                    placeholder={COUNTRY_CODES.find(c => c.code === formData.countryCode)?.placeholder || 'Enter phone number'}
                  />
                </div>
              </div>

              {/* Inquiry Type */}

              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-300 text-sm hover:border-gray-400 appearance-none bg-white"
              >
                <option value="">Select inquiry type</option>
                <option value="partnership">Partnership</option>
                <option value="collaboration">Collaboration</option>
                <option value="general">General Inquiry</option>
                <option value="support">Support</option>
                <option value="media">Media & Press</option>
              </select>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all duration-300 resize-vertical text-sm hover:border-gray-400"
                placeholder="Tell us about your project or inquiry..."
              ></textarea>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#004fa2] hover:bg-[#003a7a] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin">
                        <Send size={18} />
                      </div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-gray-500">
                  We respond within 24 business hours
                </p>
              </div>
            </form>
          </div>

          {/* Right Content - Contact Information */}
          <div className="space-y-6">
            
            {/* Contact Details */}
            <div className="space-y-4">
              
              <div className="group bg-white border border-gray-200 hover:border-[#004fa2]/30 px-5 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#004fa2]/10 group-hover:bg-[#004fa2]/20 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <MapPin className="text-[#004fa2]" size={18} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Our Location</div>
                    <span className="text-base text-gray-900 font-semibold">{settings?.contactAddress || 'Zyra Tech Hub, Koforidua, Eastern Region, Ghana'}</span>
                  </div>
                </div>
              </div>

              <div className="group bg-white border border-gray-200 hover:border-[#004fa2]/30 px-5 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#004fa2]/10 group-hover:bg-[#004fa2]/20 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <Mail className="text-[#004fa2]" size={18} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Email Address</div>
                    <span className="text-base text-gray-900 font-semibold">{settings?.contactEmail || 'info@zyratechhub.com'}</span>
                  </div>
                </div>
              </div>

              <div className="group bg-white border border-gray-200 hover:border-[#004fa2]/30 px-5 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#004fa2]/10 group-hover:bg-[#004fa2]/20 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <Phone className="text-[#004fa2]" size={18} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Phone Number</div>
                    <span className="text-base text-gray-900 font-semibold">{settings?.contactPhone || '+233 55 955 4261'}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Social Media */}
            <div className="bg-white border border-gray-200 px-5 py-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>
              <div className="flex items-center space-x-3 mb-0 flex-wrap gap-y-3">
                {settings?.socialFacebook && (
                  <a href={settings.socialFacebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-[#003a7a] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="Facebook">
                    <FaFacebookF className="text-lg text-white" />
                  </a>
                )}
                {settings?.socialTwitter && (
                  <a href={settings.socialTwitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-[#003a7a] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="X (Twitter)">
                    <FaXTwitter className="text-lg text-white" />
                  </a>
                )}
                {settings?.socialLinkedIn && (
                  <a href={settings.socialLinkedIn} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-[#003a7a] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="LinkedIn">
                    <FaLinkedinIn className="text-lg text-white" />
                  </a>
                )}
                {settings?.socialInstagram && (
                  <a href={settings.socialInstagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-[#003a7a] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="Instagram">
                    <FaInstagram className="text-lg text-white" />
                  </a>
                )}
                {settings?.socialYouTube && (
                  <a href={settings.socialYouTube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-[#003a7a] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="YouTube">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                )}
                {settings?.socialTikTok && (
                  <a href={settings.socialTikTok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-[#003a7a] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="TikTok">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                  </a>
                )}
                {settings?.socialWhatsApp && (
                  <a href={`https://wa.me/${settings.socialWhatsApp}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-[#003a7a] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="WhatsApp">
                    <FaWhatsapp className="text-lg text-white" />
                  </a>
                )}
                {settings?.socialGitHub && (
                  <a href={settings.socialGitHub} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-[#003a7a] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="GitHub">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </a>
                )}
                {/* Fallback if no social links set */}
                {!settings?.socialFacebook && !settings?.socialTwitter && !settings?.socialLinkedIn && !settings?.socialInstagram && !settings?.socialYouTube && !settings?.socialTikTok && !settings?.socialWhatsApp && !settings?.socialGitHub && (
                  <>
                    <a href="https://www.facebook.com/zyratechhub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-[#003a7a] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="Facebook">
                      <FaFacebookF className="text-lg text-white" />
                    </a>
                    <a href="https://x.com/zyratechhub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-[#003a7a] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="X (Twitter)">
                      <FaXTwitter className="text-lg text-white" />
                    </a>
                    <a href="https://www.linkedin.com/company/zyratechhub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-[#003a7a] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="LinkedIn">
                      <FaLinkedinIn className="text-lg text-white" />
                    </a>
                    <a href="https://www.instagram.com/zyratechhub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-[#003a7a] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="Instagram">
                      <FaInstagram className="text-lg text-white" />
                    </a>
                    <a href={`https://wa.me/${'233559554261'}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center hover:bg-[#003a7a] transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg" aria-label="WhatsApp">
                      <FaWhatsapp className="text-lg text-white" />
                    </a>
                  </>
                )}
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactHero;


