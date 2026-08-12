import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock3, Globe, ShieldCheck } from 'lucide-react';
import { scrimSessions, promos } from '../data/scrims';
import { siteConfig } from '../data/siteConfig';

const whatsappRegistrationLink = (sessionTitle: string) => {
  const phone = (siteConfig.scrimRegistrationPhone || siteConfig.contactPhone || '').replace(/\D/g, '');
  const message = encodeURIComponent(`Hi Zeptor, I want to register for ${sessionTitle}. Please share the full registration details and payment process.`);

  return phone ? `https://wa.me/${phone}?text=${message}` : siteConfig.whatsappCommunity;
};

const ScrimsPage = () => {
  const offer = promos[0];
  const [countdown, setCountdown] = useState('00d 00h 00m 00s');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const target = new Date(offer.expiresAt);
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown('Offer expired');
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setCountdown(`${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`);
    };
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [offer.expiresAt]);

  const liveCount = useMemo(() => scrimSessions.filter((session) => session.status === 'LIVE').length, []);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="rounded-[40px] border border-white/10 bg-[#0b0b13] p-8 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Zeptor Daily Scrims</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Compete. Practice. Improve. Dominate.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-silver/80 sm:text-base">
              Build momentum with daily BGMI scrims, structured sessions, and live match coverage in IST.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:auto-cols-max lg:grid-flow-col">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/70">Current sessions</p>
              <p className="mt-3 text-3xl font-semibold text-white">{scrimSessions.length}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/70">Live now</p>
              <p className="mt-3 text-3xl font-semibold text-white">{liveCount}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          {scrimSessions.map((session, idx) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.35 }}
              className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-violet/70">{session.time}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{session.title}</h2>
                  <p className="mt-3 text-sm text-silver/80">{session.description}</p>
                </div>
                <span className={`rounded-full px-4 py-2 text-xs font-semibold uppercase ${session.status === 'LIVE' ? 'bg-red-500/15 text-red-300' : session.status === 'UPCOMING' ? 'bg-violet/10 text-violet' : 'bg-white/10 text-silver'}`}>{session.status}</span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-silver/70">Entry Fee</p>
                  <p className="mt-2 text-lg font-semibold text-white">{session.entryFee}</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-silver/70">Prize Pool</p>
                  <p className="mt-2 text-lg font-semibold text-white">{session.prizePool}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.35em] text-violet/70">
                {session.maps.map((map) => (
                  <span key={map} className="rounded-full bg-white/5 px-3 py-2">{map}</span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-silver/80">{session.teams}</p>
                <div className="flex gap-3">
                  <Link to={`/scrims/${session.id}`} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-silver transition hover:bg-violet/10 hover:text-white">
                    VIEW DETAILS
                  </Link>
                  <a href={whatsappRegistrationLink(session.title)} target="_blank" rel="noreferrer" className="rounded-full bg-violet px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                    JOIN SCRIM
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
            <div className="flex items-center gap-3 text-violet">
              <ShieldCheck size={20} />
              <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Tournament-ready format</p>
            </div>
            <div className="mt-5 space-y-3 text-sm leading-7 text-silver/80">
              <p>Team slots are balanced for scrim quality, matchmaking depth and meaningful practice.</p>
              <p>Matches run in IST and are optimized for BGMI competitive play.</p>
            </div>
          </div>
          <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Promotional Offer</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">{offer.title}</h3>
            <p className="mt-3 text-sm text-silver/80">{offer.description}</p>
            <div className="mt-6 flex items-center gap-3 text-sm">
              <span className="text-silver/60 line-through">{offer.regularPrice}</span>
              <span className="text-3xl font-semibold text-white">{offer.offerPrice}</span>
            </div>
            <p className="mt-3 text-sm text-violet/70">Save {offer.discount}</p>
            <div className="mt-6 rounded-3xl bg-white/5 p-4 text-sm text-silver/80">
              <p className="uppercase tracking-[0.35em] text-violet/70">Offer expires in</p>
              <p className="mt-2 text-lg font-semibold text-white">{countdown}</p>
            </div>
            <a href={siteConfig.whatsappCommunity} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-violet px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              CLAIM OFFER
            </a>
          </div>
          <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Schedule</p>
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3 text-sm">
                <span>1:00 PM – 3:00 PM</span>
                <span className="text-violet">IST</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3 text-sm">
                <span>3:00 PM – 5:00 PM</span>
                <span className="text-violet">IST</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3 text-sm">
                <span>7:00 PM – 9:00 PM</span>
                <span className="text-violet">IST</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3 text-sm">
                <span>9:00 PM – 11:00 PM</span>
                <span className="text-violet">IST</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3 text-sm">
                <span>11:00 PM – 1:00 AM</span>
                <span className="text-violet">IST</span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default ScrimsPage;
