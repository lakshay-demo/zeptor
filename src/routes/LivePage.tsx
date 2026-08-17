import { motion } from 'framer-motion';
import { Youtube, Clock3 } from 'lucide-react';

const LivePage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="rounded-[40px] border border-violet/25 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
        <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">Zeptor Esports Live</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Watch live BGMI matches and community streams</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-silver-muted sm:text-base">
          Stay connected with live broadcasts, upcoming streams and curated event coverage for Zeptor competition.
        </p>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-[40px] border border-violet/20 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur p-6 shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:shadow-[0_0_60px_rgba(168,85,247,0.25)] transition-all duration-300">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">LIVE NOW</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Zeptor Season 1 stream</h2>
            </div>
            <div className="rounded-3xl bg-red-500/15 px-4 py-2 text-sm uppercase tracking-[0.35em] text-red-300">Live</div>
          </div>
          <div className="mt-8 aspect-[16/9] overflow-hidden rounded-[32px] bg-slate-900">
            <div className="relative h-full w-full bg-[linear-gradient(135deg,_rgba(140,51,255,0.25),_transparent_70%)]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-40" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6 text-white">
                <div className="mb-4 flex items-center gap-3 rounded-full bg-black/60 px-4 py-2 text-sm uppercase tracking-[0.35em] text-red-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> Live stream
                </div>
                <div className="max-w-2xl">
                  <h3 className="text-3xl font-semibold">BGMI Season 1: main event coverage</h3>
                  <p className="mt-3 text-sm text-silver/80">Expert commentary, match breakdowns and competitive team action.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/5 p-4 text-sm text-silver/80">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/70">Viewers</p>
              <p className="mt-2 text-xl font-semibold text-white">12.4K</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-4 text-sm text-silver/80">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/70">Start</p>
              <p className="mt-2 text-xl font-semibold text-white">8:00 PM IST</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-4 text-sm text-silver/80">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/70">Platform</p>
              <p className="mt-2 text-xl font-semibold text-white">YouTube</p>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <a href="https://www.youtube.com/@zeptoresports" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400">
              <Youtube size={18} /> WATCH LIVE
            </a>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-3 text-sm text-silver/80">
              <Clock3 size={18} /> Upcoming stream at 11:00 PM IST
            </div>
          </div>
        </motion.div>

        <aside className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Upcoming streams</p>
            <div className="mt-6 space-y-4">
              {['Aug 13 • 7:00 PM', 'Aug 14 • 10:00 PM'].map((time) => (
                <div key={time} className="rounded-3xl bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">BGMI Prime Round</p>
                  <p className="mt-2 text-sm text-silver/80">{time}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08 }} className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Why watch</p>
            <ul className="mt-5 space-y-3 text-sm text-silver/80">
              <li>• Live match commentary for BGMI competitive teams</li>
              <li>• Strategy breakdowns and team highlights</li>
              <li>• Real-time results and player insights</li>
            </ul>
          </motion.div>
        </aside>
      </div>
    </div>
  );
};

export default LivePage;
