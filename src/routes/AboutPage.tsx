import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

const AboutPage = () => (
  <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
    <section className="rounded-[40px] border border-violet/25 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
      <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">Built for competition</p>
      <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">An emerging BGMI ecosystem crafted for serious teams</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-silver-muted sm:text-base">
        {siteConfig.organizationName} is an upcoming competitive BGMI esports organization focused on creating structured tournaments, daily scrims and player opportunities.
      </p>
    </section>

    <section className="mt-10 grid gap-8 lg:grid-cols-3">
      {[
        {
          icon: Globe,
          title: 'India-focused',
          description: 'Designed specifically for competitive BGMI teams across India, with IST schedules and regional community support.',
        },
        {
          icon: ShieldCheck,
          title: 'Professional structure',
          description: 'From scrims to tournament stages, every offering is built for teams that want predictable, premium competition.',
        },
        {
          icon: Sparkles,
          title: 'Community driven',
          description: 'A serious platform for growing players, finding teammates, and making competitive esports progress together.',
        },
      ].map((item) => (
        <motion.div key={item.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-[36px] border border-violet/20 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur p-6 shadow-[0_0_30px_rgba(168,85,247,0.12)] hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] transition-all duration-300">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-violet/20 to-purple/10 border border-violet/30 text-violet">
            <item.icon size={22} />
          </div>
          <h2 className="mt-5 text-2xl font-semibold text-white">{item.title}</h2>
          <p className="mt-3 text-sm leading-7 text-silver-muted">{item.description}</p>
        </motion.div>
      ))}
    </section>

    <section className="mt-12 rounded-[40px] border border-violet/20 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
      <h2 className="text-3xl font-semibold text-white">The Zeptor mission</h2>
      <div className="mt-6 space-y-5 text-sm leading-7 text-silver-muted">
        <p>We are building a competitive BGMI organization that is small today, but clearly built to become something big. The focus is on fair matches, meaningful rewards and a strong path for rising teams.</p>
        <p>Players should be able to compete, improve, get noticed, find teams, participate in tournaments and become part of a serious community backed by structured events.</p>
        <p>Zeptor aims to create a premium Indian esports product that supports scrims, tournaments, leaderboard tracking, live coverage and community growth.</p>
      </div>
    </section>
  </div>
);

export default AboutPage;
