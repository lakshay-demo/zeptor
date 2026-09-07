import express from 'express';
import { supabaseAdmin } from '../lib/supabaseClient.js';
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', requireAuth, requireAdmin, async (req, res) => {
  const { data, error } = await supabaseAdmin.from('profiles').select('*').limit(100);

  if (error) {
    return res.status(400).json({ success: false, message: 'Unable to load admin data.' });
  }

  return res.json({ success: true, profiles: data });
});

export default router;
