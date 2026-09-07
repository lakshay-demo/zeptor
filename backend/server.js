import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const authRoutes = (await import('./routes/authRoutes.js')).default;
const profileRoutes = (await import('./routes/profileRoutes.js')).default;
const adminRoutes = (await import('./routes/adminRoutes.js')).default;
const registrationRoutes = (await import('./routes/registrationRoutes.js')).default;

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || true,
    credentials: true,
  })
);
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'zeptor-backend' });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/registrations', registrationRoutes);

app.use((error, req, res, next) => {
  console.error('Unhandled backend error:', error);
  res.status(error.statusCode || 500).json({
    success: false,
    message: 'Internal server error.',
  });
});

app.listen(port, () => {
  console.log(`Zeptor backend is running on http://localhost:${port}`);
});
