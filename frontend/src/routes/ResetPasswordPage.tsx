import { useState } from 'react';
import { ArrowRight, CheckCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { updatePassword } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    if (newPassword.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    if (!/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      setError('Password must include letters and numbers.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    const { success, error: authError, message } = await updatePassword(newPassword);
    setIsSubmitting(false);

    if (!success) {
      setError(authError ?? 'Unable to update your password.');
      return;
    }

    setSuccessMessage(message ?? 'Password updated successfully.');
    setTimeout(() => navigate('/login', { replace: true }), 1200);
  };

  return (
    <div className="auth-shell compact-shell">
      <div className="auth-form-panel full-width-panel">
        <div className="auth-card auth-card-sm">
          <p className="auth-kicker">UPDATE PASSWORD</p>
          <h2>UPDATE PASSWORD</h2>
          <p className="auth-subtitle">Create a new secure password for your Zeptor account.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>New Password</span>
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="Enter new password"
                autoComplete="new-password"
              />
            </label>

            <label className="auth-field">
              <span>Confirm New Password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm your new password"
                autoComplete="new-password"
              />
            </label>

            {error && <div className="auth-message error">{error}</div>}
            {successMessage && (
              <div className="auth-message success">
                <CheckCheck size={16} />
                {successMessage}
              </div>
            )}

            <button type="submit" className="btn-primary auth-submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner-ring sm" />
                  UPDATING PASSWORD...
                </>
              ) : (
                <>
                  UPDATE PASSWORD
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="auth-links centered-links">
            <Link to="/login">Back to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
