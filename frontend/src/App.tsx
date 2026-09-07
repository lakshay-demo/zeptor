import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { RequireAdmin, RequireAuth } from './components/ProtectedRoute';
import AccountPage from './routes/AccountPage';
import AdminPage from './routes/AdminPage';
import ForgotPasswordPage from './routes/ForgotPasswordPage';
import HomePage from './routes/HomePage';
import LivePage from './routes/LivePage';
import LoginPage from './routes/LoginPage';
import MediaPage from './routes/MediaPage';
import NewsPage from './routes/NewsPage';
import ResetPasswordPage from './routes/ResetPasswordPage';
import ResultsPage from './routes/ResultsPage';
import ScrimDetailsPage from './routes/ScrimDetailsPage';
import ScrimsPage from './routes/ScrimsPage';
import SignupPage from './routes/SignupPage';
import TeamsPage from './routes/TeamsPage';
import LeaderboardPage from './routes/LeaderboardPage';
import AboutPage from './routes/AboutPage';
import ContactPage from './routes/ContactPage';
import CommunityPage from './routes/CommunityPage';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="scrims" element={<ScrimsPage />} />
      <Route path="scrims/:id" element={<ScrimDetailsPage />} />
      <Route path="leaderboard" element={<LeaderboardPage />} />
      <Route path="teams" element={<TeamsPage />} />
      <Route path="results" element={<ResultsPage />} />
      <Route path="live" element={<LivePage />} />
      <Route path="news" element={<NewsPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="community" element={<CommunityPage />} />
      <Route path="media" element={<MediaPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="account" element={<RequireAuth><AccountPage /></RequireAuth>} />
      <Route path="admin" element={<RequireAdmin><AdminPage /></RequireAdmin>} />
    </Route>
  </Routes>
);

export default App;
