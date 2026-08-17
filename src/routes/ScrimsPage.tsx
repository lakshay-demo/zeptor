import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock3, Globe, ShieldCheck } from 'lucide-react';
import { scrimSessions, promos } from '../data/scrims';
import { siteConfig } from '../data/siteConfig';

const whatsappRegistrationMessage = (sessionTitle: string, entryFee: number) =>
  `Hi Shadow, I want to register for ${sessionTitle} with ₹${entryFee} entry. Please share the full registration details and payment process.`;

const whatsappRegistrationLink = (sessionTitle: string, entryFee: number) => {
  const phone = (siteConfig.scrimRegistrationPhone || siteConfig.contactPhone || '').replace(/\D/g, '');
  const message = encodeURIComponent(whatsappRegistrationMessage(sessionTitle, entryFee));

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

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="rounded-[40px] border border-violet/25 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">Zeptor Daily Scrims</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Compete. Practice. Improve. Dominate.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-silver/80 sm:text-base">
              Build momentum with daily BGMI scrims, structured sessions, and consistent competitive practice in IST.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-1 lg:auto-cols-max lg:grid-flow-col">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/70">Daily Sessions</p>
              <p className="mt-3 text-3xl font-semibold text-white">{scrimSessions.length}</p>
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
              className="rounded-[36px] border border-violet/20 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur p-6 shadow-[0_0_30px_rgba(168,85,247,0.12)] hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] hover:border-violet/35 transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-violet/70">{session.time}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{session.title}</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.35em] text-violet/70">
                  {session.maps.map((map) => (
                    <span key={map} className="rounded-full bg-violet/10 border border-violet/20 px-3 py-2 text-violet/80">{map}</span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <p className="text-sm font-semibold text-silver/80">Choose your entry:</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {session.entryOptions.map((option) => (
                    <div key={option.entryFee} className="rounded-3xl border border-violet/20 bg-white/5 p-5 hover:bg-violet/10 transition-colors">
                      <div className="flex flex-col gap-2">
                        <div>
                          <p className="text-sm font-semibold text-white">₹{option.entryFee} Entry</p>
                          <p className="mt-1 text-xs text-silver/70">Prize Pool: ₹{option.prizePool}</p>
                        </div>
                        <a href={whatsappRegistrationLink(session.title, option.entryFee)} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center justify-center rounded-full bg-violet px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5">
                          BOOK SLOT →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-5 flex items-center text-sm text-silver/80">
                <span>{session.teams}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="rounded-[36px] border border-violet/20 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur p-6 shadow-[0_0_30px_rgba(168,85,247,0.12)] hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] transition-all duration-300">
            <div className="flex items-center gap-3 text-violet">
              <ShieldCheck size={20} />
              <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">Tournament-ready format</p>
            </div>
            <div className="mt-5 space-y-3 text-sm leading-7 text-silver/80">
              <p>Lobby Size: 16–18 Teams</p>
              <p>Advance Room</p>
              <p>Stream + Casting</p>
              <p>Maps: Erangel, Miramar and Rondo</p>
              <p>Bonus Reward: Back-to-Back WWCD • 65+ total kills • ₹200</p>
            </div>
          </div>
          <div className="rounded-[36px] border border-violet/20 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur p-6 shadow-[0_0_30px_rgba(168,85,247,0.12)] hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] transition-all duration-300">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">Promotional Offer</p>
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
            <a href={siteConfig.whatsappCommunity} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-full items-center justify-center btn-primary px-5 py-3 text-sm">
              CLAIM OFFER
            </a>
          </div>
          <div className="rounded-[36px] border border-violet/20 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur p-6 shadow-[0_0_30px_rgba(168,85,247,0.12)] hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] transition-all duration-300">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">Schedule</p>
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
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default ScrimsPage;
