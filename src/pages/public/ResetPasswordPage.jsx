/**
 * Password Reset Page
 * Users click the reset link from their email and land here to set a new password
 * 
 * URL: /reset-password?token=ABC123...
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/slices/uiSlice';
import authService from '../../services/authService';
import useSEO from '../../hooks/useSEO';

const ResetPasswordPage = () => {
  useSEO({
    title: 'Reset Your Password',
    description: 'Set a new password for your ZyraTech Hub account.',
    url: '/reset-password',
    keywords: 'reset password, forgot password, account recovery'
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Password validation
  const validatePassword = (pwd) => {
    const newErrors = {};

    if (!pwd) {
      newErrors.password = 'Password is required';
    } else if (pwd.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(pwd)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(pwd)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(pwd)) {
      newErrors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*]/.test(pwd)) {
      newErrors.password = 'Password must contain at least one special character (!@#$%^&*)';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validate inputs
    const newErrors = validatePassword(password);

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!token) {
      dispatch(addNotification({
        message: 'Invalid or expired reset link. Please request a new password reset.',
        type: 'error'
      }));
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(token, password);

      setSuccess(true);
      dispatch(addNotification({
        message: 'Your password has been reset successfully! Redirecting to login...',
        type: 'success'
      }));

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
    } catch (error) {
      console.error('Password reset error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to reset password. Please try again.';
      
      dispatch(addNotification({
        message: errorMessage,
        type: 'error'
      }));

      // If token is invalid/expired, show error and link to request new reset
      if (error.response?.status === 400 || error.response?.status === 401) {
        setErrors({
          general: 'This reset link is invalid or has expired. Please request a new password reset.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // If no token, show error
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">Invalid Reset Link</h1>
          <p className="text-gray-600 text-center mb-6">
            The password reset link is missing or invalid. Please request a new password reset from the login page.
          </p>

          <Link
            to="/admin/login"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">Password Reset Successful!</h1>
          <p className="text-gray-600 text-center mb-2">
            Your password has been reset successfully.
          </p>
          <p className="text-gray-600 text-center mb-6">
            Redirecting to login page...
          </p>

          <Link
            to="/admin/login"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors"
          >
            Go to Login Now
          </Link>
        </div>
      </div>
    );
  }

  // Reset form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          Enter a new password for your account. Make sure it's strong and unique.
        </p>

        {/* General Error */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    const newErrors = { ...errors };
                    delete newErrors.password;
                    setErrors(newErrors);
                  }
                }}
                placeholder="Enter new password"
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    const newErrors = { ...errors };
                    delete newErrors.confirmPassword;
                    setErrors(newErrors);
                  }
                }}
                placeholder="Confirm new password"
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Password Requirements */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-xs font-medium text-gray-700 mb-2">Password must contain:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li className={password.length >= 8 ? 'text-green-600' : ''}>
                ✓ At least 8 characters
              </li>
              <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>
                ✓ At least one uppercase letter (A-Z)
              </li>
              <li className={/[a-z]/.test(password) ? 'text-green-600' : ''}>
                ✓ At least one lowercase letter (a-z)
              </li>
              <li className={/[0-9]/.test(password) ? 'text-green-600' : ''}>
                ✓ At least one number (0-9)
              </li>
              <li className={/[!@#$%^&*]/.test(password) ? 'text-green-600' : ''}>
                ✓ At least one special character (!@#$%^&*)
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mt-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Resetting Password...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Reset Password
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Remember your password?{' '}
          <Link to="/admin/login" className="text-blue-600 hover:text-blue-700 font-semibold">
            Go to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
