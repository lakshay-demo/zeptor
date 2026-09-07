import { useEffect, useState } from 'react';
import { CheckCircle2, LogOut, PencilLine, ShieldCheck, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, updateProfile, isEmailVerified } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || user?.user_metadata?.full_name || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setFullName(profile?.full_name || user?.user_metadata?.full_name || '');
  }, [profile, user]);

  const handleSave = async () => {
    setError('');
    setSuccess('');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setIsSaving(true);
    const { success: didSave, error: saveError, message } = await updateProfile(fullName);
    setIsSaving(false);

    if (!didSave) {
      setError(saveError ?? 'Unable to update your profile.');
      return;
    }

    setSuccess(message ?? 'Profile updated successfully.');
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div className="auth-card account-shell">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="auth-kicker">MY ZEPTOR ACCOUNT</p>
            <h2>MY ZEPTOR ACCOUNT</h2>
          </div>
          <button type="button" className="btn-secondary px-5 py-3 text-xs" onClick={handleLogout}>
            <LogOut size={16} />
            LOGOUT
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-5">
            <div className="account-detail-card">
              <div className="account-icon"><UserRound size={18} /></div>
              <div>
                <p className="account-label">Full Name</p>
                {isEditing ? (
                  <input
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="account-input"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="account-value">{profile?.full_name || user?.user_metadata?.full_name || 'Not provided yet'}</p>
                )}
              </div>
            </div>

            <div className="account-detail-card">
              <div className="account-icon"><span>@</span></div>
              <div>
                <p className="account-label">Email</p>
                <p className="account-value">{user?.email || 'Not available'}</p>
              </div>
            </div>

            <div className="account-detail-card">
              <div className="account-icon"><ShieldCheck size={18} /></div>
              <div>
                <p className="account-label">Email Verification Status</p>
                <p className={`account-value ${isEmailVerified ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {isEmailVerified ? 'Verified' : 'Pending verification'}
                </p>
              </div>
            </div>

            <div className="account-detail-card">
              <div className="account-icon"><CheckCircle2 size={18} /></div>
              <div>
                <p className="account-label">Account creation date</p>
                <p className="account-value">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : '—'}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-violet/20 bg-violet/5 p-5 shadow-card">
            <p className="account-label">Quick actions</p>
            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                className="btn-primary px-5 py-3 text-xs"
                onClick={() => setIsEditing((current) => !current)}
              >
                <PencilLine size={16} />
                {isEditing ? 'CANCEL' : 'EDIT PROFILE'}
              </button>

              {isEditing && (
                <button type="button" className="btn-secondary px-5 py-3 text-xs" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
                </button>
              )}
            </div>

            {error && <div className="auth-message error mt-4">{error}</div>}
            {success && <div className="auth-message success mt-4">{success}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
