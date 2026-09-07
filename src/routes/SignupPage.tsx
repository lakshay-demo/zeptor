import { useMemo, useState } from 'react';
import { ArrowRight, CheckCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
  const { signUp, sendVerificationEmail } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [verificationEmail, setVerificationEmail] = useState('');
  const [showVerificationScreen, setShowVerificationScreen] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const passwordStrength = useMemo(() => {
    if (!password) {
      return { label: 'No password', color: 'text-silver/70', strength: 0 };
    }

    const hasLength = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const score = Number(hasLength) + Number(hasLetter) + Number(hasNumber);

    if (score <= 1) return { label: 'Weak', color: 'text-red-400', strength: 1 };
    if (score === 2) return { label: 'Good', color: 'text-amber-300', strength: 2 };
    return { label: 'Strong', color: 'text-emerald-300', strength: 3 };
  }, [password]);

  const handleResendVerification = async () => {
    if (resendCooldown > 0 || !verificationEmail) {
      return;
    }

    setResendCooldown(30);
    const { success, error: resendError } = await sendVerificationEmail(verificationEmail);

    if (!success) {
      setError(resendError ?? 'Unable to resend verification email.');
      setResendCooldown(0);
      return;
    }

    setError('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    const trimmedEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      setError('Password must include letters and numbers.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    const { success, needsVerification, error: signUpError, email: returnedEmail } = await signUp({
      fullName,
      email: trimmedEmail,
      password,
    });

    if (!success) {
      setError(signUpError ?? 'Unable to create your account right now.');
      setIsSubmitting(false);
      return;
    }

    if (needsVerification) {
      setVerificationEmail(returnedEmail ?? trimmedEmail);
      setShowVerificationScreen(true);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
  };

  if (showVerificationScreen) {
    return (
      <div className="auth-shell compact-shell">
        <div className="auth-card verification-card auth-card-sm">
          <div className="verification-icon"><CheckCheck size={32} /></div>
          <p className="auth-kicker">VERIFY EMAIL</p>
          <h2>Check your email</h2>
          <p className="auth-subtitle">We sent a verification link to {verificationEmail}.</p>
          {error && <div className="auth-message error">{error}</div>}
          <button
            type="button"
            className="btn-primary auth-submit"
            onClick={handleResendVerification}
            disabled={resendCooldown > 0}
          >
            {resendCooldown > 0 ? `RESEND (${resendCooldown}s)` : 'RESEND VERIFICATION'}
          </button>
          <div className="auth-links centered-links">
            <Link to="/login">Back to login</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-shell compact-shell">
      <div className="auth-card auth-card-sm">
        <p className="auth-kicker">SIGN UP</p>
        <h2>Create account</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Full Name</span>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
            />
          </label>

          <label className="auth-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              autoComplete="new-password"
            />
            <small className={`${passwordStrength.color} mt-2 block`}>
              Password strength: {passwordStrength.label}
            </small>
          </label>

          <label className="auth-field">
            <span>Confirm Password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm password"
              autoComplete="new-password"
            />
          </label>

          {error && <div className="auth-message error">{error}</div>}

          <button type="submit" className="btn-primary auth-submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner-ring sm" />
                CREATING...
              </>
            ) : (
              <>
                SIGN UP
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="auth-links">
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
