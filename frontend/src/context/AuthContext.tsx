import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export type ProfileRecord = {
  id: string;
  full_name: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
};

type SignUpInput = {
  fullName: string;
  email: string;
  password: string;
};

type SignInInput = {
  email: string;
  password: string;
};

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  profile: ProfileRecord | null;
  loading: boolean;
  isLoggedIn: boolean;
  isEmailVerified: boolean;
  isAdmin: boolean;
  signUp: (input: SignUpInput) => Promise<{ success: boolean; needsVerification?: boolean; email?: string; error?: string }>; 
  signIn: (input: SignInInput) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  sendVerificationEmail: (email: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  resetPasswordForEmail: (email: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  updateProfile: (fullName: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const getFriendlyAuthError = (error: { message?: string } | null | undefined): string => {
  const message = error?.message ?? '';

  if (!message) {
    return 'Something went wrong. Please try again.';
  }

  if (/invalid login credentials|email or password is incorrect|wrong password/i.test(message)) {
    return 'Email or password is incorrect.';
  }

  if (/email.*not confirmed|confirm.*email|verify.*email/i.test(message)) {
    return 'Please verify your email before logging in.';
  }

  if (/user already registered|already.*exist|duplicate key|unique constraint/i.test(message)) {
    return 'An account with this email already exists.';
  }

  if (/weak password|password.*at least 8|password is too short/i.test(message)) {
    return 'Password must contain at least 8 characters.';
  }

  if (/invalid email|email.*valid/i.test(message)) {
    return 'Please enter a valid email address.';
  }

  if (/rate limit|too many requests/i.test(message)) {
    return 'Too many attempts. Please wait a moment and try again.';
  }

  return 'Something went wrong. Please try again.';
};

const fetchProfile = async (userId: string): Promise<ProfileRecord | null> => {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();

  if (error && error.code !== 'PGRST116') {
    console.warn('Unable to fetch profile:', error.message);
    return null;
  }

  return data as ProfileRecord | null;
};

const fetchAdminStatus = async (): Promise<boolean> => {
  if (!supabase) {
    return false;
  }

  const { data, error } = await supabase.rpc('is_admin_user');

  if (error) {
    console.warn('Unable to verify admin status:', error.message);
    return false;
  }

  return Boolean(data);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileRecord | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const client = supabase;

  const refreshProfile = async () => {
    if (!user?.id || !client) {
      setProfile(null);
      return;
    }

    const nextProfile = await fetchProfile(user.id);
    setProfile(nextProfile);
    const adminStatus = await fetchAdminStatus();
    setIsAdmin(adminStatus);
  };

  useEffect(() => {
    if (!client) {
      setLoading(false);
      return;
    }

    const initializeSession = async () => {
      const {
        data: { session: currentSession },
      } = await client.auth.getSession();

      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        const nextProfile = await fetchProfile(currentSession.user.id);
        setProfile(nextProfile);
        setIsAdmin(await fetchAdminStatus());
      }

      setLoading(false);
    };

    void initializeSession();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      if (nextSession?.user) {
        const nextProfile = await fetchProfile(nextSession.user.id);
        setProfile(nextProfile);
        setIsAdmin(await fetchAdminStatus());
        return;
      }

      setProfile(null);
      setIsAdmin(false);
    });

    return () => subscription.unsubscribe();
  }, [client]);

  const signUp = async ({ fullName, email, password }: SignUpInput) => {
    if (!client) {
      return { success: false, error: 'Authentication service is unavailable.' };
    }

    const trimmedName = fullName.trim();

    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: trimmedName,
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      return { success: false, error: getFriendlyAuthError(error) };
    }

    const needsVerification = !data.session;

    if (needsVerification) {
      return {
        success: true,
        needsVerification: true,
        email: data.user?.email ?? email,
      };
    }

    return { success: true, needsVerification: false, email: data.user?.email ?? email };
  };

  const signIn = async ({ email, password }: SignInInput) => {
    if (!client) {
      return { success: false, error: 'Authentication service is unavailable.' };
    }

    const { error } = await client.auth.signInWithPassword({ email, password });

    if (error) {
      return { success: false, error: getFriendlyAuthError(error) };
    }

    return { success: true };
  };

  const signOut = async () => {
    if (!client) {
      return;
    }

    await client.auth.signOut();
    setProfile(null);
    setIsAdmin(false);
  };

  const sendVerificationEmail = async (email: string) => {
    if (!client) {
      return { success: false, error: 'Authentication service is unavailable.' };
    }

    const { error } = await client.auth.resend({
      type: 'signup',
      email,
    });

    if (error) {
      return { success: false, error: getFriendlyAuthError(error) };
    }

    return { success: true, message: 'Verification email sent.' };
  };

  const resetPasswordForEmail = async (email: string) => {
    if (!client) {
      return { success: false, error: 'Authentication service is unavailable.' };
    }

    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      return { success: false, error: getFriendlyAuthError(error) };
    }

    return { success: true, message: 'Password reset email sent.' };
  };

  const updatePassword = async (password: string) => {
    if (!client) {
      return { success: false, error: 'Authentication service is unavailable.' };
    }

    const { error } = await client.auth.updateUser({ password });

    if (error) {
      return { success: false, error: getFriendlyAuthError(error) };
    }

    return { success: true, message: 'Password updated successfully.' };
  };

  const updateProfile = async (fullName: string) => {
    if (!client || !user?.id) {
      return { success: false, error: 'You need to be signed in to update your profile.' };
    }

    const trimmedName = fullName.trim();

    const { error } = await client
      .from('profiles')
      .upsert(
        {
          id: user.id,
          full_name: trimmedName,
          email: user.email ?? null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .select();

    if (error) {
      return { success: false, error: 'Unable to update your profile right now.' };
    }

    await refreshProfile();

    return { success: true, message: 'Profile updated successfully.' };
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      profile,
      loading,
      isLoggedIn: Boolean(session),
      isEmailVerified: Boolean(user?.email_confirmed_at),
      isAdmin,
      signUp,
      signIn,
      signOut,
      sendVerificationEmail,
      resetPasswordForEmail,
      updatePassword,
      updateProfile,
      refreshProfile,
    }),
    [session, user, profile, loading, isAdmin]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
};
