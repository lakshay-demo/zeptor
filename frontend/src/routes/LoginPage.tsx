import { useState } from 'react';
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, isLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (isLoggedIn) {
    const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/account';
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);

    const { success, error: authError } = await signIn({ email: email.trim(), password });

    if (!success) {
      setError(authError ?? 'Email or password is incorrect.');
      setIsSubmitting(false);
      return;
    }

    const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/account';
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="auth-shell">
      <div className="auth-brand-panel">
        <div className="auth-brand-card">
          <p className="auth-kicker">ZEPTOR ESPORTS</p>
          <h1>LEVEL UP YOUR GAME.</h1>
          <p>
            Log in to manage your profile, track your competitive progress, and stay connected to the Zeptor BGMI community.
          </p>
          <div className="auth-highlights">
            <div>
              <ShieldCheck size={18} />
              Secure account access
            </div>
            <div>
              <Mail size={18} />
              Verified email access
            </div>
            <div>
              <LockKeyhole size={18} />
              Protected by Supabase Auth
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-card">
          <p className="auth-kicker">WELCOME BACK</p>
          <h2>WELCOME BACK</h2>
          <p className="auth-subtitle">Sign in to your Zeptor Esports account.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@zeptor.gg"
                autoComplete="email"
              />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </label>

            {error && <div className="auth-message error">{error}</div>}

            <button type="submit" className="btn-primary auth-submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner-ring sm" />
                  LOGGING IN...
                </>
              ) : (
                <>
                  LOGIN
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="auth-links">
            <Link to="/forgot-password">Forgot Password?</Link>
            <span>
              Don&apos;t have an account? <Link to="/signup">Create Account</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
