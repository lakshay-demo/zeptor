import express from 'express';
import { supabaseAdmin } from '../lib/supabaseClient.js';
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/season2', async (req, res) => {
  const { team_name, team_leader_name, mobile_number } = req.body || {};

  if (!team_name || !team_leader_name || !mobile_number) {
    return res.status(400).json({ success: false, message: 'All registration fields are required.' });
  }

  const { error } = await supabaseAdmin.from('season2_registrations').insert({
    team_name,
    team_leader_name,
    mobile_number,
    status: 'PENDING',
  });

  if (error) {
    return res.status(400).json({ success: false, message: 'Registration could not be saved.' });
  }

  return res.status(201).json({ success: true, message: 'Season 2 registration saved.' });
});

router.get('/season2', requireAuth, requireAdmin, async (req, res) => {
  const { data, error } = await supabaseAdmin.from('season2_registrations').select('*').order('created_at', { ascending: false });

  if (error) {
    return res.status(400).json({ success: false, message: 'Unable to fetch registrations.' });
  }

  return res.json({ success: true, registrations: data });
});

export default router;
