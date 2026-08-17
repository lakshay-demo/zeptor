import { motion } from 'framer-motion';
import { MessageCircle, Users } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

const CommunityPage = () => (
  <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
    <section className="rounded-[40px] border border-violet/25 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
      <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">Community</p>
      <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Join the Zeptor Esports community</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-silver-muted sm:text-base">
        Stay updated with daily scrims, tournaments, player opportunities, recruitment, live streams and competitive BGMI events.
      </p>
    </section>

    <section className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="rounded-[40px] border border-violet/20 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
        <div className="flex items-center gap-4 text-violet">
          <Users size={28} />
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">Community growth</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">A network built around serious BGMI players</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-[32px] bg-gradient-to-br from-violet/5 to-purple/5 border border-violet/20 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">What you get</p>
            <p className="mt-4 text-sm leading-7 text-silver-muted">Daily scrim invites, tournament alerts, recruitment support and event announcements.</p>
          </div>
          <div className="rounded-[32px] bg-gradient-to-br from-violet/5 to-purple/5 border border-violet/20 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">Why join</p>
            <p className="mt-4 text-sm leading-7 text-silver-muted">A focused BGMI community for teams that want consistency, structure and performance opportunities.</p>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-[40px] border border-violet/20 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
        <div className="flex items-center gap-4 text-violet">
          <MessageCircle size={28} />
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">Join the conversation</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">JOIN WHATSAPP COMMUNITY</h2>
          </div>
        </div>
        <p className="mt-6 text-sm leading-7 text-silver-muted">Access daily updates, link with teams and secure fast support for scrims or tournament entries.</p>
        <a href={siteConfig.whatsappCommunity} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-full items-center justify-center btn-primary px-6 py-4 text-sm">
          Join WhatsApp Community
        </a>
      </motion.div>
    </section>
  </div>
);

export default CommunityPage;
