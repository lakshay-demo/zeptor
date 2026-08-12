import { motion } from 'framer-motion';
import { MessageCircle, Users } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

const CommunityPage = () => (
  <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
    <section className="rounded-[40px] border border-white/10 bg-[#0b0b13] p-8 shadow-card">
      <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Community</p>
      <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Join the Zeptor Esports community</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-silver/80 sm:text-base">
        Stay updated with daily scrims, tournaments, player opportunities, recruitment, live streams and competitive BGMI events.
      </p>
    </section>

    <section className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="rounded-[40px] border border-white/10 bg-[#0f0f18] p-8 shadow-card">
        <div className="flex items-center gap-4 text-violet">
          <Users size={28} />
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Community growth</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">A network built around serious BGMI players</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-[32px] bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/70">What you get</p>
            <p className="mt-4 text-sm leading-7 text-silver/80">Daily scrim invites, tournament alerts, recruitment support and event announcements.</p>
          </div>
          <div className="rounded-[32px] bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Why join</p>
            <p className="mt-4 text-sm leading-7 text-silver/80">A focused BGMI community for teams that want consistency, structure and performance opportunities.</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-[40px] border border-white/10 bg-[#0f0f18] p-8 shadow-card">
        <div className="flex items-center gap-4 text-violet">
          <MessageCircle size={28} />
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Join the conversation</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">JOIN WHATSAPP COMMUNITY</h2>
          </div>
        </div>
        <p className="mt-6 text-sm leading-7 text-silver/80">Access daily updates, link with teams and secure fast support for scrims or tournament entries.</p>
        <a href={siteConfig.whatsappCommunity} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-violet px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5">
          Join WhatsApp Community
        </a>
      </motion.div>
    </section>
  </div>
);

export default CommunityPage;
