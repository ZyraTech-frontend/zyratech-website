import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader, AlertCircle } from 'lucide-react';
import TrainingLayout from '../../../components/TrainingLayout';
import paymentService from '../../../services/paymentService';
import useSEO from '../../../hooks/useSEO';

const PaymentVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, failed, error
  const [message, setMessage] = useState('Verifying your payment...');
  const [paymentDetails, setPaymentDetails] = useState(null);

  useSEO({
    title: 'Verifying Payment',
    description: 'Please wait while we verify your payment.',
    url: '/training/payment/verify'
  });

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      // Get reference from URL params
      const reference = searchParams.get('reference');
      
      if (!reference) {
        // Try to get from sessionStorage (backup)
        const storedReference = sessionStorage.getItem('payment_reference');
        if (!storedReference) {
          setStatus('error');
          setMessage('No payment reference found. Please try again.');
          return;
        }
      }

      const paymentRef = reference || sessionStorage.getItem('payment_reference');
      
      // Verify payment with backend
      const response = await paymentService.verifyPayment(paymentRef);
      
      if (response.status === 'success' || response.status === 'completed') {
        setStatus('success');
        setMessage('Payment successful! Your enrollment has been confirmed.');
        setPaymentDetails(response);
        
        // Clear stored reference
        sessionStorage.removeItem('payment_reference');
        sessionStorage.removeItem('payment_course_id');
        
        // Redirect to success page after 2 seconds
        setTimeout(() => {
          navigate('/training/payment-success', {
            state: {
              courseTitle: response.metadata?.courseName || 'Training Course',
              amount: response.amount,
              paymentMethod: response.channel || 'Card',
              transactionId: response.reference,
              applicantName: response.metadata?.applicantName,
              applicantEmail: response.customer?.email
            }
          });
        }, 2000);
      } else {
        setStatus('failed');
        setMessage('Payment verification failed. Please contact support if amount was deducted.');
        setPaymentDetails(response);
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setStatus('error');
      setMessage(
        error.response?.data?.message || 
        'Failed to verify payment. Please contact support if amount was deducted.'
      );
    }
  };

  return (
    <TrainingLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-gray-50">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            {/* Status Icon */}
            <div className="mb-6">
              {status === 'verifying' && (
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Loader className="animate-spin text-[#004fa2]" size={40} />
                </div>
              )}
              
              {status === 'success' && (
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-scale-in">
                  <CheckCircle className="text-green-600" size={40} />
                </div>
              )}
              
              {status === 'failed' && (
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <XCircle className="text-red-600" size={40} />
                </div>
              )}
              
              {status === 'error' && (
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="text-yellow-600" size={40} />
                </div>
              )}
            </div>

            {/* Status Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {status === 'verifying' && 'Verifying Payment'}
              {status === 'success' && 'Payment Successful!'}
              {status === 'failed' && 'Payment Failed'}
              {status === 'error' && 'Verification Error'}
            </h1>

            {/* Status Message */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              {message}
            </p>

            {/* Payment Details (if available) */}
            {paymentDetails && status === 'success' && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-mono font-semibold text-gray-900">
                      {paymentDetails.reference}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-gray-900">
                      GHS {paymentDetails.amount}
                    </span>
                  </div>
                  {paymentDetails.channel && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Method:</span>
                      <span className="font-semibold text-gray-900">
                        {paymentDetails.channel}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Loading State Text */}
            {status === 'verifying' && (
              <p className="text-sm text-gray-500">
                Please do not close this window or press the back button.
              </p>
            )}

            {/* Action Buttons */}
            {(status === 'failed' || status === 'error') && (
              <div className="flex flex-col gap-3 mt-6">
                <button
                  onClick={() => navigate('/training/programs')}
                  className="w-full px-6 py-3 bg-[#004fa2] text-white rounded-xl hover:bg-[#003d7a] transition-all font-semibold"
                >
                  Back to Programs
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold"
                >
                  Contact Support
                </button>
              </div>
            )}

            {status === 'success' && (
              <p className="text-sm text-gray-500">
                Redirecting to confirmation page...
              </p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </TrainingLayout>
  );
};

export default PaymentVerificationPage;
