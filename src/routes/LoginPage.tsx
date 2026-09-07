import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
    <div className="auth-shell compact-shell">
      <div className="auth-card auth-card-sm">
        <p className="auth-kicker">LOGIN</p>
        <h2>Login</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
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
          <Link to="/forgot-password">Forgot password?</Link>
          <span>
            New here? <Link to="/signup">Create account</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
