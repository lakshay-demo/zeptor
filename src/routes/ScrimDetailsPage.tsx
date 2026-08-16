import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { scrimSessions } from '../data/scrims';
import { siteConfig } from '../data/siteConfig';

const whatsappRegistrationMessage = (sessionTitle: string) =>
  `Hi Shadow, I want to register for ${sessionTitle}. Please share the complete registration details and payment process.`;

const whatsappRegistrationLink = (sessionTitle: string) => {
  const phone = (siteConfig.scrimRegistrationPhone || siteConfig.contactPhone || '').replace(/\D/g, '');
  const text = encodeURIComponent(whatsappRegistrationMessage(sessionTitle));

  return phone ? `https://wa.me/${phone}?text=${text}` : siteConfig.whatsappCommunity;
};

const ScrimDetailsPage = () => {
  const { id } = useParams();
  const session = scrimSessions.find((item) => item.id === id);

  if (!session) {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-[40px] border border-white/10 bg-[#0f0f18] p-12 text-center text-silver/80 shadow-card">
          <h1 className="text-3xl font-semibold text-white">Scrim details unavailable</h1>
          <p className="mt-4">This scrim session is updating soon. Please visit the scrims page for the latest schedule.</p>
          <Link to="/scrims" className="mt-8 inline-flex rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
            VIEW SCRIMS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-[40px] border border-white/10 bg-[#0b0b13] p-8 shadow-card">
        <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Scrim details</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">{session.title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-silver/80 sm:text-base">Get the full match briefing, room information, rules and registration details for this BGMI scrim.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Time</p>
            <p className="mt-3 text-lg font-semibold text-white">{session.time} IST</p>
          </div>
          <div className="rounded-3xl bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Entry Fee</p>
            <p className="mt-3 text-lg font-semibold text-white">{session.entryFee}</p>
          </div>
          <div className="rounded-3xl bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Prize Pool</p>
            <p className="mt-3 text-lg font-semibold text-white">{session.prizePool}</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[32px] bg-[#0f0f18] p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Maps</p>
            <p className="mt-4 text-lg font-semibold text-white">{session.maps.join(' • ')}</p>
            <p className="mt-4 text-sm leading-7 text-silver/80">Match set for BGMI competitive pacing and map rotation.</p>
          </div>
          <div className="rounded-[32px] bg-[#0f0f18] p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Team slots</p>
            <p className="mt-4 text-lg font-semibold text-white">{session.teams}</p>
            <p className="mt-4 text-sm leading-7 text-silver/80">Designed for balanced competitive sessions with 16–18 teams.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] bg-[#0f0f18] p-6">
            <h2 className="text-xl font-semibold text-white">Registration & room details</h2>
            <p className="mt-4 text-sm leading-7 text-silver/80">Register through our community link and follow the match room instructions shared before the session. Payment is accepted via UPI or wallet transfer.</p>
            <ul className="mt-6 space-y-3 text-sm text-silver/80">
              <li>• Register early to secure your spot.</li>
              <li>• Join the WhatsApp community for live room updates.</li>
              <li>• Use the official match code shared by Zeptor admin.</li>
            </ul>
            <div className="mt-6 rounded-3xl border border-violet/20 bg-violet/5 p-4">
              <p className="text-[10px] uppercase tracking-[0.35em] text-violet/70">WhatsApp message</p>
              <p className="mt-3 text-sm leading-6 text-silver/80">{whatsappRegistrationMessage(session.title)}</p>
            </div>
          </div>
          <div className="rounded-[32px] bg-[#0f0f18] p-6">
            <h2 className="text-xl font-semibold text-white">Contact & support</h2>
            <p className="mt-4 text-sm leading-7 text-silver/80">Questions? Reach us through the community chat or email. We support team registration, payment verification and match support.</p>
            <p className="mt-6 text-sm font-semibold text-white">Community support</p>
            <p className="mt-2 text-sm text-silver/80">Visit the WhatsApp group for room instructions and match day help.</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/scrims" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-silver transition hover:bg-violet/10 hover:text-white">
            RETURN TO SCRIMS
          </Link>
          <a href={whatsappRegistrationLink(session.title)} target="_blank" rel="noreferrer" className="rounded-full bg-violet px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
            REGISTER NOW
          </a>
        </div>
      </motion.section>
    </div>
  );
};

export default ScrimDetailsPage;
