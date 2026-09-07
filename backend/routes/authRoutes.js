import express from 'express';
import { supabaseAdmin } from '../lib/supabaseClient.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, full_name } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const { data, error } = await supabaseAdmin.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: full_name || '',
      },
    },
  });

  if (error) {
    return res.status(400).json({ success: false, message: 'Unable to create account.' });
  }

  return res.status(201).json({
    success: true,
    user: data.user,
    session: data.session,
    needsVerification: !data.session,
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(401).json({ success: false, message: 'Email or password is incorrect.' });
  }

  return res.json({ success: true, user: data.user, session: data.session });
});

router.post('/logout', async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(400).json({ success: false, message: 'No active session found.' });
  }

  const { error } = await supabaseAdmin.auth.signOut();

  if (error) {
    return res.status(400).json({ success: false, message: 'Unable to logout.' });
  }

  return res.json({ success: true, message: 'Logged out successfully.' });
});

router.post('/resend-verification', async (req, res) => {
  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  const { error } = await supabaseAdmin.auth.resend({
    type: 'signup',
    email,
  });

  if (error) {
    return res.status(400).json({ success: false, message: 'Unable to resend verification email.' });
  }

  return res.json({ success: true, message: 'Verification email sent.' });
});

router.post('/reset-password', async (req, res) => {
  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password`,
  });

  if (error) {
    return res.status(400).json({ success: false, message: 'Unable to send reset link.' });
  }

  return res.json({ success: true, message: 'Password reset email sent.' });
});

export default router;
