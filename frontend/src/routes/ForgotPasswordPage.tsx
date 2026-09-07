import { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ForgotPasswordPage = () => {
  const { resetPasswordForEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);
    const { success, error: authError } = await resetPasswordForEmail(trimmedEmail);
    setIsSubmitting(false);

    if (!success) {
      setError(authError ?? 'Unable to send the reset link right now.');
      return;
    }

    setIsSent(true);
  };

  return (
    <div className="auth-shell compact-shell">
      <div className="auth-form-panel full-width-panel">
        <div className="auth-card auth-card-sm">
          <p className="auth-kicker">PASSWORD RECOVERY</p>
          <h2>{isSent ? 'PASSWORD RESET EMAIL SENT' : 'RESET YOUR PASSWORD'}</h2>

          {isSent ? (
            <>
              <p className="auth-subtitle">A password reset link has been sent to your email.</p>
              <div className="auth-message success">If an account exists for this email, you will receive the reset instructions shortly.</div>
              <div className="auth-links centered-links">
                <Link to="/login">Back to login</Link>
              </div>
            </>
          ) : (
            <>
              <p className="auth-subtitle">Enter the email registered to your Zeptor account.</p>

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

                {error && <div className="auth-message error">{error}</div>}

                <button type="submit" className="btn-primary auth-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner-ring sm" />
                      SENDING EMAIL...
                    </>
                  ) : (
                    <>
                      SEND RESET LINK
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              <div className="auth-links centered-links">
                <Link to="/login">Back to login</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
