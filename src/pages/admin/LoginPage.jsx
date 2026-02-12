/**
 * Admin Login Page - Complete Authentication Flow
 * 
 * This login page follows the Super Admin's user management logic:
 * 1. Super Admin creates admin → gives temp password
 * 2. Admin logs in with temp password
 * 3. If mustChangePassword → Force Change Password screen
 * 4. After password change → Check KYC status
 * 5. If KYC not submitted → KYC Submission screen
 * 6. If KYC pending → info screen (can proceed)
 * 7. If KYC rejected → re-submit screen
 * 8. Only fully verified → dashboard
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, changePassword, submitKyc, clearError } from '../../store/slices/authSlice';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  KeyRound,
  Fingerprint,
  ChevronRight,
  IdCard,
  Upload,
  FileCheck,
  Clock,
  XCircle,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

// ─── Animated Particles Background ───────────────────────────────────
const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    class Particle {
      constructor() {
        this.reset();
        this.pulseSpeed = 0.01 + Math.random() * 0.02;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.baseOpacity = 0.3 + Math.random() * 0.5;
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = 1 + Math.random() * 2.5;
        this.size = this.baseSize;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = 0.3 + Math.random() * 0.5;
      }
      update(time) {
        // Float movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges with padding
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Gentle pulse
        const pulse = Math.sin(time * this.pulseSpeed + this.pulseOffset);
        this.size = this.baseSize + pulse * 0.5;
        this.opacity = this.baseOpacity + pulse * 0.1;

        // Mouse attraction (subtle)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.015;
          this.x += dx * force;
          this.y += dy * force;
        }
      }
      draw() {
        // Glow layer
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120, 180, 255, ${this.opacity * 0.08})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 225, 255, ${this.opacity})`;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.9})`;
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      const count = Math.min(90, Math.floor((canvas.width * canvas.height) / 12000));
      particles = Array.from({ length: count }, () => new Particle());
    };

    const connectParticles = () => {
      const maxDist = 200;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = 0.2 * (1 - dist / maxDist);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(150, 200, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Mouse connections
      for (let i = 0; i < particles.length; i++) {
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          const alpha = 0.25 * (1 - dist / 250);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(180, 220, 255, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    };

    let time = 0;
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(time);
        p.draw();
      });
      connectParticles();
      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

// ─── Floating Label Input ────────────────────────────────────────────
const FloatingInput = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  icon: Icon,
  endIcon,
  error,
  autoComplete,
  required = true,
  disabled = false
}) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative group">
      <div
        className={`
        relative flex items-center rounded-2xl border-2 transition-all duration-300
        ${error
            ? 'border-red-400 bg-red-50/50'
            : focused
              ? 'border-[#004fa2] bg-white shadow-lg shadow-blue-500/10'
              : 'border-gray-200 bg-gray-50/80 hover:border-gray-300'
          }
      `}
      >
        <div
          className={`pl-4 transition-colors duration-300 ${error ? 'text-red-400' : focused ? 'text-[#004fa2]' : 'text-gray-400'
            }`}
        >
          <Icon size={22} />
        </div>
        <div className="relative flex-1">
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoComplete={autoComplete}
            required={required}
            disabled={disabled}
            className="w-full px-3 py-5 bg-transparent text-gray-900 text-base font-medium outline-none peer placeholder-transparent"
            placeholder={label}
          />
          <label
            htmlFor={id}
            className={`
              absolute left-3 transition-all duration-300 pointer-events-none font-medium
              ${focused || hasValue
                ? '-top-2.5 text-xs px-1 bg-white rounded'
                : 'top-5 text-sm'
              }
              ${error
                ? 'text-red-400'
                : focused
                  ? 'text-[#004fa2]'
                  : 'text-gray-400'
              }
            `}
          >
            {label}
          </label>
        </div>
        {endIcon && <div className="pr-3">{endIcon}</div>}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1 pl-1 animate-[slideDown_0.2s_ease-out]">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
};

// ─── Error Alert Component ───────────────────────────────────────────
const ErrorAlert = ({ title, message }) => (
  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl animate-[slideDown_0.3s_ease-out]">
    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
      <AlertCircle size={18} className="text-red-600" />
    </div>
    <div>
      <p className="text-sm font-semibold text-red-800">{title || 'Error'}</p>
      <p className="text-sm text-red-600 mt-0.5">{message}</p>
    </div>
  </div>
);

// ─── Primary Button Component ────────────────────────────────────────
const PrimaryButton = ({ onClick, disabled, loading, loadingText, icon: Icon, children, type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    className={`
      group w-full relative overflow-hidden py-4.5 rounded-2xl font-bold text-base tracking-wide
      transition-all duration-300 flex items-center justify-center gap-2
      ${disabled || loading
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
        : 'bg-[#004fa2] text-white hover:bg-[#003d7a] hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98]'
      }
    `}
  >
    {loading ? (
      <>
        <Loader2 size={20} className="animate-spin" />
        <span>{loadingText || 'Processing...'}</span>
      </>
    ) : (
      <>
        {Icon && <Icon size={18} />}
        <span>{children}</span>
        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
      </>
    )}
    {!loading && !disabled && (
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    )}
  </button>
);

// ─── STEP 1: Login Form ──────────────────────────────────────────────
// ─── STEP 1: Login Form (Journey Style) ──────────────────────────────
const LoginView = ({
  onSubmit, email, setEmail, password, setPassword,
  showPassword, setShowPassword, rememberMe, setRememberMe,
  loading, error, onForgotPassword,
  onShowCredentials, showCredentials
}) => {
  const [step, setStep] = useState('identity'); // 'identity' or 'challenge'
  const [slideDirection, setSlideDirection] = useState('right');

  const handleContinue = (e) => {
    e.preventDefault();
    if (email) {
      setSlideDirection('right');
      setStep('challenge');
    }
  };

  const handleBack = () => {
    setSlideDirection('left');
    setStep('identity');
    setPassword(''); // Clear password on back
  };

  const handleDemoSelect = (cred) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setSlideDirection('right');
    setStep('challenge');
  };

  return (
    <div className="overflow-hidden">
      <form onSubmit={step === 'identity' ? handleContinue : onSubmit} className="space-y-5 relative min-h-[300px]">

        {/* Step 1: Identity (Email) */}
        <div
          className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${step === 'identity' ? 'translate-x-0 opacity-100 z-10' : '-translate-x-full opacity-0 z-0'
            }`}
        >
          <div className="space-y-5">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Hello there!</h3>
              <p className="text-gray-500 text-sm">Enter your email to continue</p>
            </div>

            <FloatingInput
              id="login-email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              autoComplete="email"
              disabled={loading}
            />

            <PrimaryButton
              type="submit"
              disabled={!email}
              icon={ArrowRight}
            >
              Continue
            </PrimaryButton>
          </div>
        </div>

        {/* Step 2: Challenge (Password) */}
        <div
          className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${step === 'challenge' ? 'translate-x-0 opacity-100 z-10' : 'translate-x-full opacity-0 z-0'
            }`}
        >
          <div className="space-y-5">
            {/* User Profile Preview */}
            <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#004fa2] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                {email ? email[0].toUpperCase() : 'U'}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Logging in as</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{email}</p>
              </div>
              <button
                type="button"
                onClick={handleBack}
                className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-100/50 rounded-lg transition-colors"
                title="Change account"
              >
                <ArrowLeft size={16} />
              </button>
            </div>

            <FloatingInput
              id="login-password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              autoComplete="current-password"
              disabled={loading}
              endIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-[#004fa2] peer-checked:bg-[#004fa2] transition-all duration-200 flex items-center justify-center group-hover:border-gray-400">
                    {rememberMe && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-600 font-medium group-hover:text-gray-800 transition-colors">Remember me</span>
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-[#004fa2] font-semibold hover:text-[#003d7a] transition-colors hover:underline underline-offset-2"
              >
                Forgot?
              </button>
            </div>

            {error && <ErrorAlert title="Error" message={error} />}

            <PrimaryButton
              type="submit"
              disabled={!email || !password}
              loading={loading}
              loadingText="Signing In..."
              icon={Lock}
            >
              Sign In
            </PrimaryButton>
          </div>
        </div>
      </form>

      {/* Demo Credentials Footer */}
      <div className="border-t border-gray-100 pt-4 mt-2">
        <button
          type="button"
          onClick={onShowCredentials}
          className="w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-600 transition-colors py-2 px-2 hover:bg-gray-50 rounded-lg group"
        >
          <div className="flex items-center gap-2">
            <Fingerprint size={16} />
            <span className="font-medium">Demo Access</span>
          </div>
          <ChevronRight size={14} className={`transition-transform duration-300 ${showCredentials ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
        </button>

        {showCredentials && (
          <div className="mt-3 space-y-2 animate-[slideDown_0.3s_ease-out]">
            {[
              { role: 'Super Admin', email: 'superadmin@zyratech.com', password: 'Super@123', color: 'from-purple-500/10 to-purple-600/10', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700', desc: 'Full access' },
              { role: 'Admin', email: 'admin@zyratech.com', password: 'Admin@123', color: 'from-blue-500/10 to-blue-600/10', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700', desc: 'Standard' },
              { role: 'New User', email: 'kwame.asante@zyratech.com', password: 'TempPass@2025', color: 'from-amber-500/10 to-amber-600/10', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700', desc: 'Validates change password' },
              { role: 'Deactivated', email: 'john.mensah@zyratech.com', password: 'John@123', color: 'from-red-500/10 to-red-600/10', border: 'border-red-200', badge: 'bg-red-100 text-red-700', desc: 'Shows error' }
            ].map((cred) => (
              <button
                key={cred.role}
                type="button"
                onClick={() => handleDemoSelect(cred)}
                className={`w-full text-left p-2.5 rounded-lg bg-gradient-to-r ${cred.color} border ${cred.border} hover:shadow-md transition-all duration-200 group/cred flex items-center gap-3`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${cred.badge} font-bold text-xs`}>
                  {cred.role[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-800 truncate">{cred.role}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 truncate">{cred.desc}</p>
                </div>
                <ArrowRight size={12} className="text-gray-400 group-hover/cred:text-gray-600 transition-colors" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── STEP 2: Force Password Change ───────────────────────────────────
const ChangePasswordView = ({ user, onSubmit, loading, error }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (newPassword.length < 8) {
      setValidationError('Password must be at least 8 characters.');
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setValidationError('Password must contain at least one uppercase letter.');
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      setValidationError('Password must contain at least one number.');
      return;
    }
    if (!/[!@#$%^&*]/.test(newPassword)) {
      setValidationError('Password must contain at least one special character (!@#$%^&*).');
      return;
    }
    if (newPassword !== confirmPassword) {
      setValidationError('Passwords do not match.');
      return;
    }
    if (newPassword === currentPassword) {
      setValidationError('New password must be different from the current password.');
      return;
    }

    onSubmit({ currentPassword, newPassword });
  };

  // Password strength indicator
  const getStrength = () => {
    let score = 0;
    if (newPassword.length >= 8) score++;
    if (newPassword.length >= 12) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[!@#$%^&*]/.test(newPassword)) score++;
    return score;
  };

  const strength = getStrength();
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'][strength];
  const strengthColor = ['', 'bg-red-500', 'bg-amber-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500'][strength];

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      {/* Combined Compact Info Banner */}
      <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-3 mb-5 flex gap-3 items-start">
        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
          <KeyRound size={16} className="text-amber-600" />
        </div>
        <div className="text-xs text-amber-800/80">
          <p className="font-bold text-amber-900 mb-0.5">Change Temporary Password</p>
          <p className="leading-relaxed">
            Welcome, <span className="font-semibold">{user?.name}</span>. Please set a new secure password to activate your account.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <FloatingInput
          id="current-password"
          label="Current (Temporary) Password"
          type={showCurrent ? 'text' : 'password'}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          icon={Lock}
          disabled={loading}
          endIcon={
            <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all" tabIndex={-1}>
              {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FloatingInput
            id="new-password"
            label="New Password"
            type={showNew ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
            icon={KeyRound}
            endIcon={
              <button type="button" onClick={() => setShowNew(!showNew)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all" tabIndex={-1}>
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          <FloatingInput
            id="confirm-password"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            icon={ShieldCheck}
          />
        </div>

        {/* Compact Password Requirements Grid */}
        <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Password Strength</span>
            <span className={`text-[10px] font-bold ${strengthColor.replace('bg-', 'text-')}`}>{strengthLabel || 'Too Weak'}</span>
          </div>

          {/* Strength Meter Line */}
          <div className="flex gap-1 h-1 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : 'bg-gray-200'}`} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { met: newPassword.length >= 8, text: '8+ chars' },
              { met: /[A-Z]/.test(newPassword), text: 'Uppercase' },
              { met: /[0-9]/.test(newPassword), text: 'Number' },
              { met: /[!@#$%^&*]/.test(newPassword), text: 'Symbol' },
              { met: newPassword && confirmPassword && newPassword === confirmPassword, text: 'Match' }
            ].map((req, i) => (
              <div key={i} className={`flex items-center gap-1.5 text-[10px] font-medium transition-colors ${req.met ? 'text-emerald-600' : 'text-gray-400'}`}>
                {req.met ? <CheckCircle size={12} className="shrink-0" /> : <div className="w-3 h-3 rounded-full border border-gray-300 shrink-0" />}
                <span>{req.text}</span>
              </div>
            ))}
          </div>
        </div>

        {(validationError || error) && (
          <ErrorAlert title="Error" message={validationError || error} />
        )}

        <PrimaryButton
          type="submit"
          disabled={!currentPassword || !newPassword || !confirmPassword}
          loading={loading}
          loadingText="Updating..."
        >
          Set New Password
        </PrimaryButton>
      </form>
    </div>
  );
};

// ─── STEP 3: KYC Verification ────────────────────────────────────────
const KycView = ({ user, kycStatus, onSubmit, onSkip, loading, error }) => {
  const [governmentId, setGovernmentId] = useState(null);
  const [proofOfAddress, setProofOfAddress] = useState(null);

  // KYC already pending — compact status
  if (kycStatus === 'pending') {
    return (
      <div className="animate-[fadeIn_0.4s_ease-out] space-y-5">
        <div className="flex items-center gap-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
            <Clock size={24} className="text-amber-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">KYC Under Review</p>
            <p className="text-sm text-gray-500 mt-0.5">Your documents are being reviewed by the Super Admin. You can still access the dashboard.</p>
          </div>
        </div>
        <PrimaryButton onClick={onSkip} icon={ArrowRight}>
          Continue to Dashboard
        </PrimaryButton>
      </div>
    );
  }

  // KYC rejected — compact alert + upload form
  const isRejected = kycStatus === 'rejected';

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ governmentId: governmentId?.name, proofOfAddress: proofOfAddress?.name });
  };

  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      {/* Rejected warning */}
      {isRejected && (
        <div className="flex items-center gap-3 p-3.5 bg-red-50 border border-red-200 rounded-2xl mb-5">
          <XCircle size={20} className="text-red-500 shrink-0" />
          <p className="text-sm text-red-700">Your documents were rejected. Please resubmit valid documents below.</p>
        </div>
      )}

      {/* Subtitle */}
      {!isRejected && (
        <p className="text-sm text-gray-500 mb-5">
          Upload your identity documents for account verification. The Super Admin will review and approve them.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Two upload areas */}
        <div className="grid grid-cols-2 gap-3">
          {/* Government ID */}
          <label className={`flex flex-col items-center gap-2 p-4 border-2 border-dashed rounded-2xl cursor-pointer transition-all text-center ${governmentId ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-[#004fa2] hover:bg-blue-50/50'
            }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${governmentId ? 'bg-green-100' : 'bg-gray-100'
              }`}>
              {governmentId ? <FileCheck size={20} className="text-green-600" /> : <Upload size={20} className="text-gray-400" />}
            </div>
            {governmentId ? (
              <div>
                <p className="text-xs font-semibold text-green-800 truncate max-w-[140px]">{governmentId.name}</p>
                <p className="text-[10px] text-green-600">Click to change</p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-gray-700">Government ID</p>
                <p className="text-[10px] text-gray-400">Ghana Card, Passport, etc.</p>
              </div>
            )}
            <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setGovernmentId(e.target.files?.[0] || null)} />
          </label>

          {/* Proof of Address */}
          <label className={`flex flex-col items-center gap-2 p-4 border-2 border-dashed rounded-2xl cursor-pointer transition-all text-center ${proofOfAddress ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-[#004fa2] hover:bg-blue-50/50'
            }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${proofOfAddress ? 'bg-green-100' : 'bg-gray-100'
              }`}>
              {proofOfAddress ? <FileCheck size={20} className="text-green-600" /> : <Upload size={20} className="text-gray-400" />}
            </div>
            {proofOfAddress ? (
              <div>
                <p className="text-xs font-semibold text-green-800 truncate max-w-[140px]">{proofOfAddress.name}</p>
                <p className="text-[10px] text-green-600">Click to change</p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-gray-700">Proof of Address</p>
                <p className="text-[10px] text-gray-400">Utility bill, bank statement</p>
              </div>
            )}
            <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setProofOfAddress(e.target.files?.[0] || null)} />
          </label>
        </div>

        {error && <ErrorAlert title="Submission Failed" message={error} />}

        <PrimaryButton
          type="submit"
          disabled={!governmentId || !proofOfAddress}
          loading={loading}
          loadingText="Submitting..."
          icon={Upload}
        >
          Submit Documents
        </PrimaryButton>

        <button
          type="button"
          onClick={onSkip}
          className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors py-1"
        >
          Skip for now
        </button>
      </form>
    </div>
  );
};

// ─── Forgot Password View ────────────────────────────────────────────
const ForgotPasswordView = ({ onBack, onSubmit, email, setEmail, loading, sent }) => {
  if (sent) {
    return (
      <div className="text-center space-y-6 py-4 animate-[fadeIn_0.4s_ease-out]">
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Check Your Email</h3>
          <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
            We've sent password reset instructions to{' '}
            <span className="font-semibold text-gray-700">{email}</span>
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-xs text-blue-700">
            <strong>Tip:</strong> Check your spam folder if you don't see the email within a few minutes. The reset link expires in 1 hour.
          </p>
        </div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-[#004fa2] font-semibold hover:text-[#003d7a] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
          <KeyRound size={28} className="text-amber-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Reset Password</h3>
        <p className="text-gray-500 text-sm mt-1.5">
          Enter your email and we'll send you instructions to reset your password.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <FloatingInput
          id="forgot-email"
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
          autoComplete="email"
          disabled={loading}
        />

        <PrimaryButton type="submit" disabled={!email} loading={loading} loadingText="Sending..." icon={Mail}>
          Send Reset Instructions
        </PrimaryButton>
      </form>

      <div className="text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-gray-500 font-medium hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════
// ─── MAIN LOGIN PAGE COMPONENT ──────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════
const LoginPage = () => {
  // ─── All state declarations (hooks MUST come first, before any returns) ───
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [view, setView] = useState('login'); // 'login' | 'forgot' | 'change_password' | 'kyc'
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user, loading, error, isAuthenticated,
    passwordChangeLoading, passwordChangeError,
    kycLoading, kycError
  } = useSelector((state) => state.auth);

  // ─── Load remembered email (hook MUST be before any conditional returns) ───
  useEffect(() => {
    const remembered = localStorage.getItem('zyra_remember_email');
    if (remembered) {
      setEmail(remembered);
      setRememberMe(true);
    }
  }, []);

  // ─── After login, check if we need password change or KYC ───
  useEffect(() => {
    if (isAuthenticated && user && view === 'login') {
      if (user.mustChangePassword) {
        setView('change_password');
      } else if (user.kycStatus === 'not_submitted' || user.kycStatus === 'rejected') {
        setView('kyc');
      } else if (user.kycStatus === 'pending') {
        setView('kyc');
      }
      // If fully verified (active + KYC verified) and no view change, we'll navigate below
    }
  }, [isAuthenticated, user, view]);

  // ─── Navigate to dashboard when everything is ready ───
  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => {
        navigate('/admin/dashboard');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess, navigate]);

  // ─── Handlers ─────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();

    if (rememberMe) {
      localStorage.setItem('zyra_remember_email', email);
    } else {
      localStorage.removeItem('zyra_remember_email');
    }

    const result = await dispatch(loginUser({ email, password }));
    if (result.payload && !result.error) {
      const loggedUser = result.payload.user;

      // Determine next step based on user status
      if (loggedUser.mustChangePassword) {
        setView('change_password');
      } else if (loggedUser.kycStatus === 'not_submitted' || loggedUser.kycStatus === 'rejected' || loggedUser.kycStatus === 'pending') {
        setView('kyc');
      } else {
        // Fully verified — go to dashboard
        setLoginSuccess(true);
      }
    }
  };

  const handlePasswordChange = async ({ currentPassword, newPassword }) => {
    const result = await dispatch(changePassword({ currentPassword, newPassword }));
    if (result.payload && !result.error) {
      // Password changed — now check KYC
      const updatedUser = result.payload.user;
      if (updatedUser.kycStatus === 'not_submitted' || updatedUser.kycStatus === 'rejected') {
        setView('kyc');
      } else if (updatedUser.kycStatus === 'pending') {
        setView('kyc');
      } else {
        setLoginSuccess(true);
      }
    }
  };

  const handleKycSubmit = async (documents) => {
    const result = await dispatch(submitKyc({ documents }));
    if (result.payload && !result.error) {
      // KYC submitted — it's now pending. Allow user to proceed.
      setLoginSuccess(true);
    }
  };

  const handleKycSkip = () => {
    setLoginSuccess(true);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setForgotLoading(false);
    setForgotSent(true);
  };

  const switchToForgot = () => {
    dispatch(clearError());
    setView('forgot');
    setForgotEmail(email);
    setForgotSent(false);
  };

  const switchToLogin = () => {
    dispatch(clearError());
    setView('login');
  };

  // ─── Determine card title and icon based on current view ───
  const getCardHeader = () => {
    switch (view) {
      case 'change_password':
        return { title: 'Password Required', subtitle: 'Set a new secure password to continue', icon: <KeyRound size={24} className="text-amber-600" />, iconBg: 'bg-amber-50' };
      case 'kyc':
        return { title: 'Identity Verification', subtitle: 'Complete KYC to verify your account', icon: <IdCard size={24} className="text-blue-600" />, iconBg: 'bg-blue-50' };
      case 'forgot':
        return { title: 'Reset Password', subtitle: 'Enter your email to receive reset instructions', icon: <KeyRound size={24} className="text-amber-600" />, iconBg: 'bg-amber-50' };
      default:
        return { title: 'Welcome Back', subtitle: 'Sign in to access your admin dashboard', icon: <Lock size={24} className="text-[#004fa2]" />, iconBg: 'bg-blue-50' };
    }
  };

  // ─── Success Overlay ───────────────────────────────────────
  if (loginSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#004fa2]">
        <div className="text-center animate-[fadeIn_0.4s_ease-out]">
          <div className="mx-auto w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 animate-[pulse_1s_ease-in-out_infinite]">
            <CheckCircle size={48} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
          <p className="text-blue-200">Redirecting to your dashboard...</p>
          <div className="mt-6 flex justify-center">
            <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full animate-[progressBar_0.8s_ease-in-out_forwards]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cardHeader = getCardHeader();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col lg:flex-row items-center justify-center p-4">
      {/* ─── Background ─── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#001a3d] via-[#003068] to-[#004fa2]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(0,79,162,0.4),transparent_60%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.15),transparent_60%)]" />
      <ParticlesBackground />

      {/* ─── Logo: Stacked on Mobile, Absolute on Desktop ─── */}

      {/* Mobile Logo (Stacked) */}
      <div className="lg:hidden w-full flex justify-center mb-8 relative z-20">
        <img
          src="/zyratecpng.png"
          alt="ZyraTech Hub"
          className="h-20 w-auto object-contain drop-shadow-lg brightness-0 invert"
        />
      </div>

      {/* Desktop Logo (Absolute Top-Left) */}
      <div className="hidden lg:flex absolute top-8 left-8 z-20 items-center gap-3 transition-all duration-500">
        <img
          src="/zyratecpng.png"
          alt="ZyraTech Hub"
          className="h-44 w-auto object-contain drop-shadow-lg brightness-0 invert transition-all duration-500"
        />
      </div>

      {/* ─── Centered Login Card ─── */}
      <div className="w-full max-w-lg relative z-10">
        {/* Card */}
        <div
          className="bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl shadow-black/20 overflow-hidden"
          style={{ animation: 'cardEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          {/* Card Header */}
          <div className="px-6 py-8 md:px-10 md:pt-10 md:pb-3">
            <div className="flex items-center justify-between mb-1.5">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 transition-all">{cardHeader.title}</h2>
              <div className={`w-10 h-10 md:w-12 md:h-12 ${cardHeader.iconBg} rounded-xl flex items-center justify-center transition-all`}>
                {cardHeader.icon}
              </div>
            </div>
            <p className="text-gray-500 text-sm md:text-base transition-all">{cardHeader.subtitle}</p>
          </div>

          {/* Card Body */}
          <div className="px-6 pb-8 md:px-10 md:py-8">
            {view === 'login' && (
              <LoginView
                onSubmit={handleLogin}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                rememberMe={rememberMe}
                setRememberMe={setRememberMe}
                loading={loading}
                error={error}
                onForgotPassword={switchToForgot}
                onShowCredentials={() => setShowCredentials(!showCredentials)}
                showCredentials={showCredentials}
              />
            )}

            {view === 'forgot' && (
              <ForgotPasswordView
                onBack={switchToLogin}
                onSubmit={handleForgotPassword}
                email={forgotEmail}
                setEmail={setForgotEmail}
                loading={forgotLoading}
                sent={forgotSent}
              />
            )}

            {view === 'change_password' && (
              <ChangePasswordView
                user={user}
                onSubmit={handlePasswordChange}
                loading={passwordChangeLoading}
                error={passwordChangeError}
              />
            )}

            {view === 'kyc' && (
              <KycView
                user={user}
                kycStatus={user?.kycStatus}
                onSubmit={handleKycSubmit}
                onSkip={handleKycSkip}
                loading={kycLoading}
                error={kycError}
              />
            )}
          </div>

          {/* Card Footer */}
          <div className="px-6 py-4 md:px-10 md:py-5 bg-gray-50/80 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-400">
              <Lock size={14} />
              <span>Protected by 256-bit SSL encryption</span>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-6 text-center text-sm text-blue-300/60">
          <p>© 2026 ZyraTech</p>
        </div>
      </div>

      {/* ─── Custom Animations ─── */}
      <style>{`
        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
