import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { scrimSessions } from '../data/scrims';
import { siteConfig } from '../data/siteConfig';

const whatsappRegistrationMessage = (sessionTitle: string, entryFee: number) =>
  `Hi Shadow, I want to register for ${sessionTitle} with ₹${entryFee} entry. Please share the complete registration details and payment process.`;

const whatsappRegistrationLink = (sessionTitle: string, entryFee: number) => {
  const phone = (siteConfig.scrimRegistrationPhone || siteConfig.contactPhone || '').replace(/\D/g, '');
  const text = encodeURIComponent(whatsappRegistrationMessage(sessionTitle, entryFee));

  return phone ? `https://wa.me/${phone}?text=${text}` : siteConfig.whatsappCommunity;
};

const ScrimDetailsPage = () => {
  const { id } = useParams();
  const session = scrimSessions.find((item) => item.id === id);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

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
        <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Scrim timing</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">{session.time} IST</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-silver/80 sm:text-base">Choose your entry option to book a slot. Select the entry fee that works best for you and confirm your registration.</p>
        
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

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-6">Select entry option</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {session.entryOptions.map((option, idx) => (
              <motion.div
                key={option.entryFee}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                onClick={() => setSelectedOption(idx)}
                className={`rounded-[32px] p-6 cursor-pointer border-2 transition-all duration-200 ${
                  selectedOption === idx
                    ? 'border-violet bg-violet/10'
                    : 'border-white/10 bg-[#0f0f18] hover:border-violet/50'
                }`}
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-violet/70">Entry Option</p>
                    <p className="mt-3 text-2xl font-semibold text-white">₹{option.entryFee}</p>
                    <p className="mt-2 text-sm text-silver/80">Prize Pool: ₹{option.prizePool}</p>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-xs uppercase tracking-[0.35em] text-violet/70 mb-3">Prize Distribution</p>
                    <div className="space-y-2 text-sm">
                      {option.prizeDistribution.map((dist) => (
                        <div key={dist.rank} className="flex justify-between text-silver/80">
                          <span>{dist.rank}</span>
                          <span className="text-white font-semibold">{dist.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedOption === idx && (
                    <a 
                      href={whatsappRegistrationLink(session.title, option.entryFee)} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-violet px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                    >
                      REGISTER NOW
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] bg-[#0f0f18] p-6">
            <h2 className="text-xl font-semibold text-white">Registration & room details</h2>
            <p className="mt-4 text-sm leading-7 text-silver/80">Register through our community link and follow the match room instructions shared before the session. Payment is accepted via UPI or wallet transfer.</p>
            <ul className="mt-6 space-y-3 text-sm text-silver/80">
              <li>• Register early to secure your spot.</li>
              <li>• Join the WhatsApp community for live room updates.</li>
              <li>• Use the official match code shared by Zeptor admin.</li>
            </ul>
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
          {selectedOption !== null && (
            <a href={whatsappRegistrationLink(session.title, session.entryOptions[selectedOption].entryFee)} target="_blank" rel="noreferrer" className="rounded-full bg-violet px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              REGISTER NOW
            </a>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default ScrimDetailsPage;
