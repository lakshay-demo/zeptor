import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CalendarDays, MessageSquare, PlusCircle, ShieldCheck, Trash2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import heroRecruitmentPoster from '../assets/posters/WhatsApp Image 2026-08-11 at 11.34.56 PM (2).jpeg';
import dailyScrimsPoster from '../assets/posters/ChatGPT Image Aug 22, 2026, 03_51_16 PM.png';
import { featuredTournament } from '../data/tournaments';
import { leaderboardTeams } from '../data/leaderboard';
import { scrimSessions } from '../data/scrims';

type BannerConfig = {
  image: string;
  title: string;
  subtitle: string;
};

const defaultBannerConfigs: BannerConfig[] = [
  { image: dailyScrimsPoster, title: 'Zeptor Daily Scrims', subtitle: 'Daily custom rooms for serious BGMI teams.' },
  { image: heroRecruitmentPoster, title: 'Zeptor Recruitment', subtitle: 'Talent scouting, team building, and roster growth.' },
  { image: dailyScrimsPoster, title: 'Zeptor Daily Scrims', subtitle: 'Daily custom rooms for serious BGMI teams.' },
];

const quickActions = [
  { icon: PlusCircle, title: 'Publish scrim', description: 'Create a new scrim event for teams and stream viewers.', action: 'Add session' },
  { icon: CalendarDays, title: 'Update tournament', description: 'Change schedule, rules, or tournament details in one place.', action: 'Manage event' },
  { icon: Trash2, title: 'Archive old results', description: 'Remove finished events and keep the dashboard focused.', action: 'Clean history' },
  { icon: ShieldCheck, title: 'Approve teams', description: 'Validate team registrations before publishing brackets.', action: 'Review roster' },
];

const adminMetrics = [
  { label: 'Live sessions', value: '3', detail: 'Active scrim windows' },
  { label: 'Registered teams', value: featuredTournament.registeredTeams, detail: 'Season 1 participants' },
  { label: 'Prize pool', value: featuredTournament.prizePool, detail: 'Committed payout' },
  { label: 'Pending tasks', value: '12', detail: 'Content / approvals' },
];

const recentActivity = [
  { id: 'activity-1', time: '5 min ago', title: 'New sign-up', message: 'Team Ghost Legends registered for daily scrims.' },
  { id: 'activity-2', time: '18 min ago', title: 'Schedule updated', message: 'Tournament roster and match timings refreshed.' },
  { id: 'activity-3', time: '1h ago', title: 'Content published', message: 'News announcement posted for Season 1 registration.' },
];

const AdminPage = () => {
  const [banners, setBanners] = useState<BannerConfig[]>(defaultBannerConfigs);
  const [saveMessage, setSaveMessage] = useState('');
  const [rewardStats, setRewardStats] = useState({
    eligibleTeams: 6,
    totalEntries: 84,
    topParticipatingTeam: 'TEAM X',
    topPerformingTeam: 'TEAM X',
    avgTeamScore: 42,
    totalRewardsDistributed: 3,
  });

  useEffect(() => {
    const saved = localStorage.getItem('zeptorHeroBanners');
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as BannerConfig[];
      if (Array.isArray(parsed) && parsed.length) {
        setBanners(parsed);
      }
    } catch {
      // ignore invalid banner data
    }
  }, []);

  const updateBanner = (index: number, field: keyof BannerConfig, value: string) => {
    setBanners((current) => current.map((banner, currentIndex) => (currentIndex === index ? { ...banner, [field]: value } : banner)));
  };

  const saveBanners = () => {
    localStorage.setItem('zeptorHeroBanners', JSON.stringify(banners));
    setSaveMessage('Banner settings saved successfully.');
    window.dispatchEvent(new Event('storage'));
  };

  const resetBanners = () => {
    setBanners(defaultBannerConfigs);
    localStorage.setItem('zeptorHeroBanners', JSON.stringify(defaultBannerConfigs));
    setSaveMessage('Banner settings reset to default.');
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
    <section className="rounded-[40px] border border-white/10 bg-[#0b0b13] p-8 shadow-card">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Admin Dashboard</p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Manage Zeptor operations with clarity</h1>
          <p className="mt-4 text-sm leading-7 text-silver/80 sm:text-base">
            Monitor scrims, tournaments, team approvals and content from one polished control panel. This dashboard is built for growth-ready esports management.
          </p>
        </div>
        <div className="rounded-[32px] border border-white/10 bg-[#0f0f18] p-6 text-silver/80 shadow-card">
          <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Season snapshot</p>
          <p className="mt-3 text-3xl font-semibold text-white">{featuredTournament.name}</p>
          <p className="mt-3 text-sm leading-6">{featuredTournament.summary}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/5 p-4 text-sm">
              <p className="text-silver/70">Slots</p>
              <p className="mt-2 text-lg font-semibold text-white">{featuredTournament.slots}</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-4 text-sm">
              <p className="text-silver/70">Registered</p>
              <p className="mt-2 text-lg font-semibold text-white">{featuredTournament.registeredTeams}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="mt-10 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {adminMetrics.map((metric) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-[32px] border border-white/10 bg-[#0f0f18] p-6 shadow-card"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-violet/70">{metric.label}</p>
              <p className="mt-4 text-3xl font-semibold text-white">{metric.value}</p>
              <p className="mt-3 text-sm leading-6 text-silver/80">{metric.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Quick actions</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Fast management tools</h2>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-violet px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              New action
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-6 rounded-[30px] border border-violet/20 bg-violet/5 p-5">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Home banner control</p>
            <h3 className="mt-3 text-xl font-semibold text-white">Manage homepage slider</h3>
            <div className="mt-5 space-y-4">
              {banners.map((banner, index) => (
                <div key={`${banner.title}-${index}`} className="rounded-[24px] border border-white/10 bg-[#12121b] p-4">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-silver/60">Slide {index + 1}</p>
                  <div className="mt-3 grid gap-3">
                    <input
                      value={banner.title}
                      onChange={(event) => updateBanner(index, 'title', event.target.value)}
                      className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-silver/40"
                      placeholder="Banner title"
                    />
                    <textarea
                      value={banner.subtitle}
                      onChange={(event) => updateBanner(index, 'subtitle', event.target.value)}
                      rows={2}
                      className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-silver/40"
                      placeholder="Banner subtitle"
                    />
                    <input
                      value={banner.image}
                      onChange={(event) => updateBanner(index, 'image', event.target.value)}
                      className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-silver/40"
                      placeholder="Image URL"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={saveBanners} className="btn-primary px-5 py-3 text-sm">
                Save banners
              </button>
              <button type="button" onClick={resetBanners} className="btn-secondary px-5 py-3 text-sm">
                Reset defaults
              </button>
            </div>
            {saveMessage && <p className="mt-4 text-sm text-violet/80">{saveMessage}</p>}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {quickActions.map((item) => (
              <div key={item.title} className="rounded-[28px] border border-white/10 bg-[#12121b] p-5">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-violet/10 text-violet">
                  <item.icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-silver/80">{item.description}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.35em] text-silver/60">{item.action}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Daily sessions</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Next scrim schedule</h2>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {scrimSessions.slice(0, 3).map((session) => (
              <div key={session.id} className="rounded-3xl border border-white/10 bg-[#12121b] p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-silver/70">{session.time}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{session.title}</p>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm text-silver/80">
                  <p>Entries: {session.entryOptions.length} options</p>
                  <p>Starting at ₹{session.entryOptions[0].entryFee}</p>
                  <p>{session.teams}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Tournament insight</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Season progress</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-silver/80">
              <BarChart3 size={18} /> Progress
            </div>
          </div>
          <div className="mt-6 rounded-[28px] border border-white/10 bg-[#12121b] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-silver/60">Current stage</p>
                <p className="mt-2 text-lg font-semibold text-white">League Stage</p>
              </div>
              <div className="rounded-full bg-violet/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-violet">45% complete</div>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[45%] rounded-full bg-violet" />
            </div>
            <div className="mt-5 grid gap-3 text-sm text-silver/80">
              {featuredTournament.stages.slice(0, 3).map((stage) => (
                <div key={stage.id} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span>{stage.title}</span>
                  <span className="text-xs uppercase tracking-[0.35em] text-silver/60">{stage.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Top teams</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Competitive leaderboard</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-silver/80">
              <Users size={18} /> Teams
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {leaderboardTeams.slice(0, 4).map((team) => (
              <div key={team.id} className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-[#12121b] p-4">
                <div>
                  <p className="text-sm font-semibold text-white">{team.name}</p>
                  <p className="text-xs uppercase tracking-[0.35em] text-silver/60">Rank #{team.rank}</p>
                </div>
                <div className="text-right text-sm text-silver/80">
                  <p>{team.totalPoints} pts</p>
                  <p className="mt-1 text-xs">WWCD {team.wwcd}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Monthly rewards</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Reward cycle control</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-silver/80">
              <MessageSquare size={18} /> Admin
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-violet/15 bg-violet/5 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/80">Eligible teams</p>
              <p className="mt-2 text-2xl font-semibold text-white">{rewardStats.eligibleTeams}</p>
            </div>
            <div className="rounded-2xl border border-violet/15 bg-violet/5 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/80">Draw entries</p>
              <p className="mt-2 text-2xl font-semibold text-white">{rewardStats.totalEntries}</p>
            </div>
            <div className="rounded-2xl border border-violet/15 bg-violet/5 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/80">Top participant</p>
              <p className="mt-2 text-lg font-semibold text-white">{rewardStats.topParticipatingTeam}</p>
            </div>
            <div className="rounded-2xl border border-violet/15 bg-violet/5 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/80">Top performer</p>
              <p className="mt-2 text-lg font-semibold text-white">{rewardStats.topPerformingTeam}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn-primary px-5 py-3 text-sm">Create reward cycle</button>
            <button type="button" className="btn-secondary px-5 py-3 text-sm">Run draw</button>
            <button type="button" className="btn-secondary px-5 py-3 text-sm">Publish winner</button>
          </div>
        </div>

        <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Activity feed</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Recent operations</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-silver/80">
              <MessageSquare size={18} /> Feed
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="rounded-3xl border border-white/10 bg-[#12121b] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <span className="text-xs uppercase tracking-[0.35em] text-silver/60">{item.time}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-silver/80">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AdminPage;
