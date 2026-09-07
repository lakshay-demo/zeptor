import express from 'express';
import { supabaseAdmin } from '../lib/supabaseClient.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', requireAuth, async (req, res) => {
  const userId = req.user.id;

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    return res.status(404).json({ success: false, message: 'Profile not found.' });
  }

  return res.json({ success: true, profile: data });
});

router.put('/me', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { full_name } = req.body || {};

  if (!full_name || !String(full_name).trim()) {
    return res.status(400).json({ success: false, message: 'Full name is required.' });
  }

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .upsert({
      id: userId,
      full_name: String(full_name).trim(),
      email: req.user.email,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' })
    .select()
    .single();

  if (error) {
    return res.status(400).json({ success: false, message: 'Unable to update profile.' });
  }

  return res.json({ success: true, profile: data, message: 'Profile updated successfully.' });
});

export default router;
