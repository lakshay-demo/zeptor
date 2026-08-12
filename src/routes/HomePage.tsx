import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heroScrimsPoster from '../assets/posters/WhatsApp Image 2026-08-11 at 11.34.56 PM (1).jpeg';
import heroRecruitmentPoster from '../assets/posters/WhatsApp Image 2026-08-11 at 11.34.56 PM (2).jpeg';
import heroTournamentPoster from '../assets/posters/WhatsApp Image 2026-08-11 at 11.34.56 PM.jpeg';
import { featuredTournament } from '../data/tournaments';
import { leaderboardTeams } from '../data/leaderboard';
import { news } from '../data/news';
import { results } from '../data/results';
import { promos, scrimSessions } from '../data/scrims';
import { siteConfig } from '../data/siteConfig';
import { stats } from '../data/stats';

const posterSlides = [
  {
    image: heroScrimsPoster,
    eyebrow: 'Free BGMI Scrims',
    title: 'Daily scrims are live',
    description: 'Competitive practice, fair rules, and premium BGMI match flow for serious squads.',
    href: '/scrims',
    cta: 'Join scrims',
  },
  {
    image: heroRecruitmentPoster,
    eyebrow: 'Recruitment',
    title: 'We are looking for players',
    description: 'Join a focused community built around skill, discipline, and tournament-ready play.',
    href: '/teams',
    cta: 'Explore teams',
  },
  {
    image: heroTournamentPoster,
    eyebrow: 'Tournament',
    title: 'Season 1 is on the way',
    description: 'Roadmap qualifiers, league stages and finals designed for aspiring BGMI teams.',
    href: '/tournaments',
    cta: 'See tournament',
  },
];

const sectionTitle = (title: string, subtitle: string) => (
  <div className="mb-8 max-w-2xl">
    <p className="text-sm uppercase tracking-[0.35em] text-violet/60">{title}</p>
    <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{subtitle}</h2>
  </div>
);

const HomePage = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % posterSlides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = posterSlides[activeSlide];

  return (
    <div className="relative min-w-0 overflow-hidden px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-[500px] bg-hero-glow opacity-80" />
      <div className="relative mx-auto max-w-7xl">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="min-w-0 space-y-6 pb-8 pt-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-white/5 px-4 py-2 text-sm text-violet shadow-card">
              <span className="h-2 w-2 rounded-full bg-red-500" /> LIVE / UPCOMING
            </div>
            <div className="min-w-0">
              <p className="text-base uppercase tracking-[0.4em] text-violet/60">Zeptor Esports</p>
              <h1 className="mt-4 max-w-3xl break-words text-5xl font-semibold leading-[1.05] text-white sm:text-6xl">
                PLAY. COMPETE. <span className="text-violet">DOMINATE.</span>
              </h1>
            </div>
            <p className="max-w-2xl break-words text-base leading-8 text-silver/80 sm:text-lg">
              India-focused competitive BGMI tournaments, daily scrims and esports opportunities built for serious teams.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/scrims" className="inline-flex items-center justify-center rounded-2xl bg-violet px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#8c33ff]">
                JOIN DAILY SCRIMS
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/tournaments" className="inline-flex items-center justify-center rounded-2xl border border-violet/30 bg-white/5 px-6 py-4 text-sm font-semibold text-silver transition hover:border-violet hover:text-white">
                EXPLORE TOURNAMENTS
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="backdrop-frost rounded-3xl border border-white/10 p-5 shadow-card">
                <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Next stream</p>
                <p className="mt-4 text-lg font-semibold text-white">BGMI prime squad session</p>
                <p className="mt-3 text-sm text-silver/80">Aug 12, 2026 • 8:00 PM IST</p>
              </div>
              <div className="backdrop-frost rounded-3xl border border-white/10 p-5 shadow-card">
                <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Slot status</p>
                <p className="mt-4 text-lg font-semibold text-white">20 / 24 teams registered</p>
                <p className="mt-3 text-sm text-silver/80">Secure your place before the deadline.</p>
              </div>
              <div className="backdrop-frost rounded-3xl border border-white/10 p-5 shadow-card">
                <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Current mission</p>
                <p className="mt-4 text-lg font-semibold text-white">Scale BGMI competition across India.</p>
                <p className="mt-3 text-sm text-silver/80">Focused on teams, live events, and community growth.</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="min-w-0 space-y-6">
            <div className="rounded-[40px] border border-white/10 bg-[#0d0d16] p-4 shadow-card sm:p-5">
              <div className="relative overflow-hidden rounded-[28px] border border-violet/30 bg-[#05050a]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.title}
                    initial={{ opacity: 0, x: 26 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -26 }}
                    transition={{ duration: 0.45 }}
                    className="relative"
                  >
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.title}
                      className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[420px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06070b] via-[#06070b]/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <p className="text-xs uppercase tracking-[0.35em] text-violet/80">{currentSlide.eyebrow}</p>
                      <h3 className="mt-3 max-w-md break-words text-2xl font-semibold text-white sm:text-3xl">{currentSlide.title}</h3>
                      <p className="mt-3 max-w-lg break-words text-sm leading-6 text-silver/85">{currentSlide.description}</p>
                      <Link
                        to={currentSlide.href}
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-violet px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                      >
                        {currentSlide.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-4 left-4 right-4 hidden items-center justify-between gap-3 sm:flex">
                  <button
                    type="button"
                    onClick={() => setActiveSlide((current) => (current - 1 + posterSlides.length) % posterSlides.length)}
                    className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white transition hover:bg-white/10"
                  >
                    Previous
                  </button>
                  <div className="flex items-center justify-center gap-2">
                    {posterSlides.map((slide, index) => (
                      <button
                        key={slide.title}
                        type="button"
                        aria-label={`Show slide ${index + 1}`}
                        onClick={() => setActiveSlide(index)}
                        className={`h-2.5 rounded-full transition-all ${index === activeSlide ? 'w-8 bg-violet' : 'w-2.5 bg-white/25 hover:bg-white/40'}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveSlide((current) => (current + 1) % posterSlides.length)}
                    className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white transition hover:bg-white/10"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {promos.map((promo) => (
                  <div key={promo.id} className="rounded-[28px] border border-white/10 bg-[#0b0b12] p-5 shadow-card">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-violet/70">{promo.title}</p>
                        <p className="mt-2 text-lg font-semibold text-white">{promo.offerPrice}</p>
                      </div>
                      <span className="rounded-full bg-violet/10 px-3 py-2 text-xs uppercase tracking-[0.35em] text-violet">{promo.discount}</span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-silver/80">{promo.description}</p>
                    <p className="mt-4 text-xs uppercase tracking-[0.35em] text-silver/60">Ends {new Date(promo.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Live viewers</p>
                <p className="mt-4 text-4xl font-semibold text-white">1.2K</p>
                <p className="mt-2 text-sm text-silver/80">Live commentary and squad insights</p>
              </div>
              <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
                <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Upcoming event</p>
                <p className="mt-4 text-4xl font-semibold text-white">Zeptor Season 1</p>
                <p className="mt-2 text-sm text-silver/80">128 team bracket opening soon</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-16">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stats.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.35 }}
                className="backdrop-frost rounded-[32px] border border-white/10 p-6 shadow-card"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-violet/70">{item.label}</p>
                <p className="mt-5 text-4xl font-semibold text-white">{item.value}</p>
                <p className="mt-3 text-sm leading-6 text-silver/80">{item.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          {sectionTitle('Live / Upcoming Event', 'Zeptor Daily Scrims')}
          <div className="grid gap-5 lg:grid-cols-2">
            {scrimSessions.map((session) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="group rounded-[32px] border border-white/10 bg-[#0b0b11] p-6 shadow-card transition hover:-translate-y-1"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-violet/70">{session.time}</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{session.title}</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${session.status === 'LIVE' ? 'bg-red-500/15 text-red-300' : session.status === 'UPCOMING' ? 'bg-violet/10 text-violet' : 'bg-white/10 text-silver'}`}>
                    {session.status}
                  </span>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/5 p-4">
                    <p className="text-sm text-silver/80">Entry Fee</p>
                    <p className="mt-2 text-lg font-semibold text-white">{session.entryFee}</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-4">
                    <p className="text-sm text-silver/80">Prize Pool</p>
                    <p className="mt-2 text-lg font-semibold text-white">{session.prizePool}</p>
                  </div>
                </div>
                <div className="mt-5 text-sm text-silver/80">{session.description}</div>
                <div className="mt-5 flex flex-wrap gap-2 text-xs uppercase tracking-[0.22em] text-violet/70">
                  {session.maps.map((map) => (
                    <span key={map} className="rounded-full bg-white/5 px-3 py-2">{map}</span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm text-silver/80">{session.teams}</span>
                  <div className="flex gap-3">
                    <Link to="/scrims" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-silver transition hover:bg-violet/10 hover:text-white">
                      VIEW DETAILS
                    </Link>
                    <Link to="/scrims" className="rounded-full bg-violet px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                      JOIN SCRIM
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="rounded-[40px] border border-white/10 bg-[#0d0d16] p-8 shadow-card">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Featured Tournament</p>
                <h2 className="mt-3 text-4xl font-semibold text-white">{featuredTournament.name}</h2>
                <p className="mt-4 text-base leading-7 text-silver/80">{featuredTournament.summary}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-3xl bg-white/5 p-5 text-center">
                  <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Prize</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{featuredTournament.prizePool}</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-5 text-center">
                  <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Slots</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{featuredTournament.slots}</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-5 text-center">
                  <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Registered</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{featuredTournament.registeredTeams}</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-5 text-center">
                  <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Status</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{featuredTournament.status}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link to="/tournaments" className="rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                VIEW TOURNAMENT
              </Link>
              <p className="text-sm text-silver/70">Registration deadline • {featuredTournament.deadline}</p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          {sectionTitle('Tournament Roadmap', 'How Season 1 progresses')}
          <div className="space-y-5 rounded-[40px] border border-white/10 bg-[#0d0d16] p-8 shadow-card">
            {featuredTournament.stages.map((stage, idx) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.35 }}
                className="relative rounded-3xl border border-white/10 bg-[#0f0f18] p-6"
              >
                <div className="absolute left-5 top-5 h-3 w-3 rounded-full bg-violet shadow-[0_0_18px_rgba(140,51,255,0.35)]" />
                <p className="text-sm uppercase tracking-[0.35em] text-violet/70">{stage.title}</p>
                <p className="mt-2 text-lg font-semibold text-white">{stage.description}</p>
                <div className="mt-3 text-xs uppercase tracking-[0.35em] text-silver/70">{stage.status}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          {sectionTitle('Leaderboard Preview', 'Top teams in competition')}
          <div className="grid gap-5 lg:grid-cols-3">
            {leaderboardTeams.slice(0, 3).map((team) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="rounded-3xl bg-white/5 px-4 py-2 text-sm font-semibold text-violet">#{team.rank}</div>
                  <div className="rounded-3xl bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-silver/80">Top {team.rank}</div>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{team.name}</h3>
                <div className="mt-4 space-y-2 text-sm text-silver/80">
                  <p>Matches: {team.matches}</p>
                  <p>WWCD: {team.wwcd}</p>
                  <p>Total points: {team.totalPoints}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          {sectionTitle('Latest Results', 'Recent BGMI outcomes')}
          <div className="grid gap-5 lg:grid-cols-2">
            {results.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.35em] text-violet/70">{item.category}</span>
                  <span className="text-xs text-silver/70">{item.date}</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-white">{item.event}</h3>
                <p className="mt-4 text-sm leading-6 text-silver/80">Winner: {item.winner}</p>
                <p className="mt-2 text-sm leading-6 text-silver/80">Runner-up: {item.runnerUp}</p>
                <p className="mt-2 text-sm leading-6 text-silver/80">Prize Pool: {item.prizePool}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          {sectionTitle('Competitive Teams', 'Built for emerging squads')}
          <div className="grid gap-5 lg:grid-cols-3">
            {news.slice(0, 3).map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden rounded-[36px] border border-white/10 bg-[#0f0f18] shadow-card"
              >
                <div className="h-48 bg-slate-800" />
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-violet/70">{item.category}</p>
                  <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-silver/80">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[40px] border border-white/10 bg-[#0d0d16] p-10 shadow-card">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Community</p>
              <h2 className="mt-3 text-4xl font-semibold text-white">Join the Zeptor Esports Community</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-silver/80">
                Stay updated with daily scrims, tournaments, player opportunities, recruitment, live streams and competitive BGMI events.
              </p>
            </div>
            <div className="space-y-4 rounded-[32px] border border-white/10 bg-[#0f0f18] p-6">
              <div className="rounded-3xl bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Community CTA</p>
                <p className="mt-3 text-xl font-semibold text-white">JOIN • COMPETE • GROW</p>
              </div>
              <a href={siteConfig.whatsappCommunity} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center rounded-3xl bg-violet px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                JOIN WHATSAPP COMMUNITY
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
