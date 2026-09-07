import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock3, Crosshair, Instagram, MessageCircle, Radio, ShieldCheck, Trophy, Users, X, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firstHeroPoster from '../assets/posters/ChatGPT Image Aug 25, 2026, 08_53_19 PM.png';
import secondHeroPoster from '../assets/posters/ChatGPT Image Aug 25, 2026, 08_49_13 PM.png';
import { leaderboardTeams } from '../data/leaderboard';
import { results } from '../data/results';
import { scrimSessions } from '../data/scrims';
import { siteConfig } from '../data/siteConfig';
import { getVisitorSummary } from '../lib/visitorTracker';
import YouTubeHub from '../components/YouTubeHub';
import { addSeason2Registration, getSeason2Registrations, isValidIndianMobile, season2Config, season2RegistrationEvent, subscribeToSeason2Registrations } from '../lib/season2Registration';

type HeroBanner = { image: string; title: string };

const defaultBanners: HeroBanner[] = [
  { image: firstHeroPoster, title: 'Zeptor Esports daily competition' },
  { image: secondHeroPoster, title: 'Zeptor Esports competitive action' },
];

const entryColors = ['border-white/10', 'border-violet/40', 'border-bright/50'];

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay, duration: 0.4 }}>
    {children}
  </motion.div>
);

const HomePage = () => {
  const banners = defaultBanners;
  const [activeBanner, setActiveBanner] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [season2Count, setSeason2Count] = useState(0);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [formValues, setFormValues] = useState({ teamName: '', teamLeaderName: '', mobileNumber: '' });

  useEffect(() => {
    const timer = window.setInterval(() => setActiveBanner((current) => (current + 1) % banners.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const refresh = async () => setSeason2Count((await getSeason2Registrations()).length);
    void refresh();
    window.addEventListener(season2RegistrationEvent, refresh);
    const unsubscribe = subscribeToSeason2Registrations(() => void refresh());
    return () => { window.removeEventListener(season2RegistrationEvent, refresh); unsubscribe(); };
  }, []);

  useEffect(() => {
    const refresh = () => setVisitorCount(getVisitorSummary().activeVisitors);
    refresh();
    const timer = window.setInterval(refresh, 15000);
    return () => window.clearInterval(timer);
  }, []);

  const dailyResults = results.filter((result) => result.category === 'Daily Scrim');
  const registrationFull = season2Count >= season2Config.maxTeams;

  const submitRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRegistrationError('');
    if (!formValues.teamName.trim() || !formValues.teamLeaderName.trim()) {
      setRegistrationError('Team name and team leader name are required.');
      return;
    }
    if (!isValidIndianMobile(formValues.mobileNumber)) {
      setRegistrationError('Enter a valid 10-digit Indian mobile number.');
      return;
    }
    const result = await addSeason2Registration(formValues);
    if (!result.ok) {
      setRegistrationError(result.error);
      return;
    }
    setRegistrationMessage('Registration submitted successfully. Your team has been added to the Season 2 registration list.');
    setFormValues({ teamName: '', teamLeaderName: '', mobileNumber: '' });
  };

  return (
    <div className="home-shell">
      <section className="hero-grid mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pt-20">
        <div className="relative z-10 max-w-3xl self-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p className="eyebrow"><span className="status-dot" /> Professional BGMI scrims platform</p>
            <h1 className="hero-heading mt-5">ZEPTOR<br /><span>ESPORTS</span></h1>
            <p className="hero-kicker mt-5">DAILY BGMI SCRIMS FOR SERIOUS TEAMS.</p>
            <p className="mt-5 max-w-xl text-base leading-8 text-silver sm:text-lg">Compete in reliable daily custom rooms with affordable entry fees, fixed lobbies and professional match management.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/scrims" className="btn-primary px-6 py-4 text-sm"><Crosshair size={17} /> Book a scrim slot <ArrowRight size={16} /></Link>
              {!registrationFull && <button type="button" onClick={() => { setIsRegistrationOpen(true); setRegistrationMessage(''); setRegistrationError(''); }} className="btn-primary px-6 py-4 text-sm"><Trophy size={17} /> Register your team <ArrowRight size={16} /></button>}
              <a href={siteConfig.whatsappCommunity} target="_blank" rel="noreferrer" className="btn-secondary px-6 py-4 text-sm"><MessageCircle size={17} /> Join community</a>
            </div>
          </motion.div>
          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3 border-t border-white/10 pt-6">
            <div><p className="metric-value">4</p><p className="metric-label">Daily slots</p></div>
            <div><p className="metric-value">₹25</p><p className="metric-label">Entry from</p></div>
            <div><p className="metric-value">16</p><p className="metric-label">Team lobby</p></div>
          </div>
        </div>

        <div className="hero-poster relative mt-12 lg:mt-0">
          <AnimatePresence mode="wait">
            <motion.img key={banners[activeBanner]?.image} src={banners[activeBanner]?.image || defaultBanners[0].image} alt={banners[activeBanner]?.title || 'Zeptor Esports'} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.45 }} />
          </AnimatePresence>
          <div className="poster-controls">
            {banners.map((banner, index) => <button key={`${banner.title}-${index}`} type="button" aria-label={`Show banner ${index + 1}`} onClick={() => setActiveBanner(index)} className={index === activeBanner ? 'active' : ''} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="activity-strip">
          <div className="activity-lead"><Radio size={17} /><div><p className="eyebrow">Zeptor live activity</p><p className="mt-1 text-sm text-silver">Live signals from this browser session</p></div></div>
          <div className="activity-stat"><span className="live-dot" /><strong>{visitorCount}</strong><span>Players online</span></div>
          <div className="activity-stat"><strong>{scrimSessions.length}</strong><span>Daily sessions</span></div>
          <div className="activity-note"><ShieldCheck size={16} /> Room management via WhatsApp</div>
        </div>
      </section>

      <section id="daily-scrims" className="section-band mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <div className="section-heading"><div><p className="eyebrow">The main event</p><h2>DAILY SCRIMS</h2><p>Choose your slot. Build your squad. Enter the lobby.</p></div><Link to="/scrims" className="text-link">View all details <ArrowRight size={16} /></Link></div>
        <div className="home-scrim-grid mt-10 grid gap-4 lg:grid-cols-2">
          {scrimSessions.map((session, index) => (
            <Reveal key={session.id} delay={index * 0.05}>
              <article className="scrim-card">
                <div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Zeptor daily scrim</p><h3 className="mt-3">{session.time}</h3></div><Clock3 className="text-violet" size={22} /></div>
                <div className="mt-7 grid gap-2 sm:grid-cols-3">
                  {session.entryOptions.map((option, optionIndex) => <div key={option.entryFee} className={`entry-tile ${entryColors[optionIndex]}`}><p className="entry-fee">₹{option.entryFee}</p><p className="entry-copy">₹{option.prizePool} prize pool</p><Link to={`/scrims/${session.id}`} className="entry-link"><span className="entry-link-label">Book slot</span><ArrowRight size={13} /></Link></div>)}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="season2-event mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="season2-event-copy">
          <p className="eyebrow">Zeptor Esports x Insane Esports</p>
          <h2>SEASON 2 <span>RISING TOGETHER</span></h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-silver">A new chapter for ambitious teams ready to make their mark.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-silver"><span>48 teams</span><span>Limited slots</span><span>Entry fee: ₹{season2Config.entryFee}</span><span>Prize pool: ₹{season2Config.prizePool}</span></div>
        </div>
        <div className="season2-event-action">
          <div><p className="season2-count">{Math.min(season2Count, season2Config.maxTeams)} <span>/ {season2Config.maxTeams}</span></p><p className="text-xs uppercase tracking-[0.25em] text-silver/70">Teams registered</p></div>
          {registrationFull ? <div className="mt-6"><p className="font-display text-xl text-white">REGISTRATION FULL</p><p className="mt-2 text-sm text-silver">All 48 team registrations have been received.</p></div> : <button type="button" onClick={() => { setIsRegistrationOpen(true); setRegistrationMessage(''); setRegistrationError(''); }} className="btn-primary mt-6 px-5 py-3 text-sm">Register your team <ArrowRight size={16} /></button>}
        </div>
      </section>

      {isRegistrationOpen && <div className="registration-modal" role="dialog" aria-modal="true" aria-labelledby="registration-title">
        <div className="registration-panel">
          <button type="button" aria-label="Close registration form" onClick={() => setIsRegistrationOpen(false)} className="registration-close"><X size={20} /></button>
          <p className="eyebrow">Season 2 interest list</p><h2 id="registration-title" className="mt-3">REGISTER YOUR TEAM</h2><p className="mt-3 text-sm leading-7 text-silver">Team Leaders — submit your team details to secure your interest for Season 2.</p>
          {registrationMessage ? <div className="mt-7 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-sm leading-7 text-emerald-100"><strong className="block text-base text-white">Registration submitted successfully.</strong>{registrationMessage.replace('Registration submitted successfully. ', '')}</div> : <form onSubmit={submitRegistration} className="mt-7 grid gap-4">
            <label>Team name<input required value={formValues.teamName} onChange={(event) => setFormValues({ ...formValues, teamName: event.target.value })} placeholder="Enter your team name" /></label>
            <label>Team leader name<input required value={formValues.teamLeaderName} onChange={(event) => setFormValues({ ...formValues, teamLeaderName: event.target.value })} placeholder="Enter the leader's name" /></label>
            <label>Mobile number<input required inputMode="numeric" maxLength={10} value={formValues.mobileNumber} onChange={(event) => setFormValues({ ...formValues, mobileNumber: event.target.value.replace(/\D/g, '').slice(0, 10) })} placeholder="10-digit Indian mobile number" /></label>
            {registrationError && <p className="text-sm text-red-300" role="alert">{registrationError}</p>}
            <button type="submit" className="btn-primary mt-2 px-5 py-3 text-sm">Submit team <ArrowRight size={16} /></button>
          </form>}
        </div>
      </div>}

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="section-heading"><div><p className="eyebrow">Today at Zeptor</p><h2>SCRIM SCHEDULE</h2></div></div>
        <div className="schedule-list mt-8">{scrimSessions.map((session, index) => <div className="schedule-row" key={session.id}><span className="schedule-index">0{index + 1}</span><strong>{session.time}</strong><span>₹25 / ₹35 / ₹60</span><span>₹500 / ₹700 / ₹1000</span><Link to={`/scrims/${session.id}`} aria-label={`Book ${session.time}`}><ArrowRight size={18} /></Link></div>)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <YouTubeHub compact />
      </section>

      <section className="section-band mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="section-heading"><div><p className="eyebrow">Built for the grind</p><h2>WHY ZEPTOR</h2></div></div>
        <div className="feature-grid mt-10">{[[Trophy, 'Competitive scrims', 'Structured matches that sharpen your team.'], [Clock3, 'On-time rooms', 'Clear sessions and dependable room drops.'], [Users, 'Fixed team lobbies', 'A focused field for serious squads.'], [CheckCircle2, 'Transparent results', 'Match outcomes that stay easy to follow.'], [ShieldCheck, 'Affordable entry', 'Three clear tiers for every team.'], [MessageCircle, 'Active community', 'Updates, support and match-day help.']].map(([Icon, title, description], index) => { const FeatureIcon = Icon as typeof Trophy; return <Reveal key={title as string} delay={index * 0.04}><div className="feature-item"><FeatureIcon size={22} /><div><h3>{title as string}</h3><p>{description as string}</p></div></div></Reveal>; })}</div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"><div className="section-heading"><div><p className="eyebrow">Four moves to match day</p><h2>HOW IT WORKS</h2></div></div><div className="steps-grid mt-10">{[['01', 'Choose your slot'], ['02', 'Select entry'], ['03', 'Register your team'], ['04', 'Join the room & compete']].map(([number, title]) => <div className="step-item" key={number}><span>{number}</span><h3>{title}</h3></div>)}</div></section>
      
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div className="results-panel"><div className="section-heading"><div><p className="eyebrow">Match-day archive</p><h2>RECENT RESULTS</h2></div><Link to="/results" className="text-link">All results <ArrowRight size={16} /></Link></div>{dailyResults.length ? dailyResults.map((result) => <div className="result-row" key={result.id}><div><p className="text-xs uppercase tracking-[0.2em] text-violet">{result.event}</p><p className="mt-2 font-semibold text-white">{result.winner} <span className="font-normal text-muted">over {result.runnerUp}</span></p></div><div className="text-right"><p className="font-display text-xl text-white">{result.prizePool}</p><p className="text-xs text-muted">{result.date}</p></div></div>) : <p className="mt-8 text-sm text-muted">No scrim results published yet.</p>}</div>
        <div className="leader-panel"><div className="section-heading"><div><p className="eyebrow">Performance table</p><h2>TOP TEAMS</h2></div><Link to="/leaderboard" className="text-link"><ArrowRight size={16} /></Link></div>{leaderboardTeams.slice(0, 3).map((team) => <div className="leader-row" key={team.id}><span className="leader-rank">0{team.rank}</span><strong>{team.name}</strong><span>{team.totalPoints} pts</span></div>)}</div>
      </section>
      
  <section className="community-cta mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8"><div><p className="eyebrow">Stay match ready</p><h2>JOIN THE ZEPTOR COMMUNITY</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-silver">Get daily scrim updates, slot announcements, room details and important Zeptor Esports updates directly on WhatsApp.</p></div><a href={siteConfig.whatsappCommunity} target="_blank" rel="noreferrer" className="btn-primary whitespace-nowrap px-6 py-4 text-sm"><MessageCircle size={17} /> Join WhatsApp community</a></section>
      
  <footer className="home-social mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"><p className="eyebrow">Follow the action</p><div className="mt-4 flex flex-wrap gap-5 text-sm text-silver"><a href={siteConfig.instagram} target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram</a><a href={siteConfig.youtube} target="_blank" rel="noreferrer"><Youtube size={16} /> YouTube</a><a href={siteConfig.whatsappCommunity} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a></div></footer>
    </div>
  );
};

export default HomePage;
