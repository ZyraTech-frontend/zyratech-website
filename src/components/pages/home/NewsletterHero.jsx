import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../store/slices/uiSlice';
import newsletterService from '../../../services/newsletterService';

// List of blocked temporary email providers (frontend warning only)
const BLOCKED_PROVIDERS = [
  'tempmail.com', 'temp-mail.org', 'throwaway.email', '10minutemail.com',
  '10minutemail.de', 'yopmail.com', 'mailinator.com', 'maildrop.cc',
  'mailnesia.com', 'sharklasers.com', 'trash-mail.com', 'trashmail.com',
  'temp-mail.io', 'temporary-email.com', 'guerrillamail.com', 'guerrillamailblock.com',
  'tempmail.us', 'temp-mail.us', 'throwaway.me', 'fakeinbox.com',
  'spam4.me', 'tempmail.de', 'mailinator.net', 'mytrashmail.com'
];

const PROTONMAIL_DOMAINS = ['proton.me', 'pm.me', 'protonmail.com'];

const NewsletterHero = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [emailWarning, setEmailWarning] = useState('');

  // Check for blocked email providers (client-side warning)
  const checkEmailProvider = (emailAddress) => {
    if (!emailAddress) {
      setEmailWarning('');
      return;
    }

    const domain = emailAddress.split('@')[1]?.toLowerCase() || '';

    // Check for ProtonMail
    if (PROTONMAIL_DOMAINS.includes(domain)) {
      setEmailWarning('⚠️ ProtonMail is not supported for newsletter subscriptions');
      return;
    }

    // Check for temporary email providers
    if (BLOCKED_PROVIDERS.includes(domain)) {
      setEmailWarning('⚠️ Temporary email addresses are not allowed');
      return;
    }

    setEmailWarning('');
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    checkEmailProvider(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      dispatch(addNotification({
        message: 'Please enter a valid email address',
        type: 'warning'
      }));
      return;
    }

    // Check for blocked providers (final check before submit)
    const domain = email.split('@')[1]?.toLowerCase() || '';
    if (PROTONMAIL_DOMAINS.includes(domain)) {
      dispatch(addNotification({
        message: 'ProtonMail is not supported for newsletter subscriptions',
        type: 'warning'
      }));
      return;
    }

    if (BLOCKED_PROVIDERS.includes(domain)) {
      dispatch(addNotification({
        message: 'Temporary email addresses are not allowed',
        type: 'warning'
      }));
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('[Newsletter] Attempting to subscribe:', email);
      const response = await newsletterService.subscribe(email);
      console.log('[Newsletter] Subscription response:', response);
      
      dispatch(addNotification({
        message: 'Successfully subscribed! Check your email for confirmation.',
        type: 'success'
      }));
      
      setIsSubscribed(true);
      setEmail('');
      setEmailWarning('');
      
      // Reset after 5 seconds to allow another subscription
      setTimeout(() => setIsSubscribed(false), 5000);
    } catch (error) {
      console.error('[Newsletter] Subscription error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        code: error.response?.data?.code
      });

      // Handle specific error codes from backend
      const errorCode = error.response?.data?.code;
      let errorMessage = error.response?.data?.message || 'Failed to subscribe. Please try again.';

      if (errorCode === 'ALREADY_SUBSCRIBED') {
        errorMessage = "You're already subscribed!";
        dispatch(addNotification({
          message: errorMessage,
          type: 'warning'
        }));
      } else if (errorCode === 'BLOCKED_PROVIDER') {
        errorMessage = 'Please use a different email provider';
        dispatch(addNotification({
          message: errorMessage,
          type: 'warning'
        }));
      } else if (errorCode === 'INVALID_DOMAIN') {
        errorMessage = 'Please check your email address';
        dispatch(addNotification({
          message: errorMessage,
          type: 'warning'
        }));
      } else if (errorCode === 'VALIDATION_ERROR') {
        dispatch(addNotification({
          message: errorMessage,
          type: 'warning'
        }));
      } else {
        dispatch(addNotification({
          message: errorMessage,
          type: 'error'
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-[#004fa2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
            Stay updated with our latest training programs, industry insights, and exclusive offers. Join our community of tech professionals in Ghana.
          </p>
          <div className="max-w-md mx-auto">
            {isSubscribed ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 animate-fade-in">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
                <p className="text-white/90">
                  You've been successfully subscribed to our newsletter.
                </p>
              </div>
            ) : (
              <div>
                <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-grow px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-gray-900 bg-white"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    className="bg-white hover:bg-white/90 text-[#004fa2] px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#004fa2]"
                    disabled={isSubmitting || !!emailWarning}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>

                {/* Email provider warning */}
                {emailWarning && (
                  <div className="mt-3 flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/50 rounded-lg p-3">
                    <AlertCircle className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                    <p className="text-sm text-yellow-200">{emailWarning}</p>
                  </div>
                )}

                <p className="text-sm text-white/80 mt-4">
                  By subscribing, you agree to our privacy policy. You can unsubscribe at any time.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterHero;
