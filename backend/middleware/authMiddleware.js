import { supabaseAdmin } from '../lib/supabaseClient.js';

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session.' });
  }

  req.user = data.user;
  return next();
};

export const requireAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }

  const role = req.user.app_metadata?.role || req.user.user_metadata?.role;

  if (role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required.' });
  }

  return next();
};
