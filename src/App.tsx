import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './routes/HomePage';
import ScrimsPage from './routes/ScrimsPage';
import TournamentsPage from './routes/TournamentsPage';
import LeaderboardPage from './routes/LeaderboardPage';
import TeamsPage from './routes/TeamsPage';
import ResultsPage from './routes/ResultsPage';
import LivePage from './routes/LivePage';
import NewsPage from './routes/NewsPage';
import AboutPage from './routes/AboutPage';
import ContactPage from './routes/ContactPage';
import CommunityPage from './routes/CommunityPage';
import ScrimDetailsPage from './routes/ScrimDetailsPage';
import TournamentDetailsPage from './routes/TournamentDetailsPage';
import AdminPage from './routes/AdminPage';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="scrims" element={<ScrimsPage />} />
      <Route path="scrims/:id" element={<ScrimDetailsPage />} />
      <Route path="tournaments" element={<TournamentsPage />} />
      <Route path="tournaments/:id" element={<TournamentDetailsPage />} />
      <Route path="leaderboard" element={<LeaderboardPage />} />
      <Route path="teams" element={<TeamsPage />} />
      <Route path="results" element={<ResultsPage />} />
      <Route path="live" element={<LivePage />} />
      <Route path="news" element={<NewsPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="community" element={<CommunityPage />} />
      <Route path="admin" element={<AdminPage />} />
    </Route>
  </Routes>
);

export default App;
