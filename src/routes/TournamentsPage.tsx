import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, ClipboardList, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { featuredTournament } from '../data/tournaments';

const TournamentsPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="rounded-[40px] border border-white/10 bg-[#0b0b13] p-8 shadow-card">
        <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Tournament discovery</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Premium BGMI events for emerging teams</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-silver/80 sm:text-base">
          Discover tournaments that blend competitive structure, real cash prizes and a clear road to the grand final.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-[40px] border border-white/10 bg-[#0f0f18] p-8 shadow-card">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Featured Tournament</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{featuredTournament.name}</h2>
            </div>
            <div className="rounded-3xl bg-violet/10 px-5 py-3 text-sm font-semibold text-violet">{featuredTournament.status}</div>
          </div>
          <p className="mt-5 text-sm leading-7 text-silver/80">{featuredTournament.summary}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/70">Prize Pool</p>
              <p className="mt-3 text-2xl font-semibold text-white">{featuredTournament.prizePool}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/70">Slots</p>
              <p className="mt-3 text-2xl font-semibold text-white">{featuredTournament.slots}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/70">Registered</p>
              <p className="mt-3 text-2xl font-semibold text-white">{featuredTournament.registeredTeams}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/70">Deadline</p>
              <p className="mt-3 text-2xl font-semibold text-white">{featuredTournament.deadline}</p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-silver/70">Format</p>
              <p className="mt-3 text-lg font-semibold text-white">{featuredTournament.format}</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-silver/70">Progress</p>
              <p className="mt-3 text-lg font-semibold text-white">{featuredTournament.percentComplete}%</p>
            </div>
          </div>
          <Link to={`/tournaments/${featuredTournament.id}`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
            VIEW TOURNAMENT
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
            <div className="flex items-center gap-3 text-violet">
              <Trophy size={20} />
              <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Prize distribution</p>
            </div>
            <div className="mt-5 space-y-4 text-sm text-silver/80">
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="font-semibold text-white">1st place</p>
                <p>45%</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="font-semibold text-white">2nd place</p>
                <p>20%</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="font-semibold text-white">Top 7</p>
                <p>Consolation and performance rewards</p>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08 }} className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
            <div className="flex items-center gap-3 text-violet">
              <CalendarDays size={20} />
              <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Tournament stages</p>
            </div>
            <div className="mt-5 space-y-4">
              {featuredTournament.stages.map((stage) => (
                <div key={stage.id} className="rounded-3xl bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">{stage.title}</p>
                  <p className="mt-1 text-sm text-silver/80">{stage.description}</p>
                  <span className="mt-3 inline-flex rounded-full bg-violet/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-violet">{stage.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mt-12 rounded-[40px] border border-white/10 bg-[#0f0f18] p-8 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Tournament roadmap</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Match flow from registration to champion</h2>
          </div>
          <div className="rounded-3xl bg-white/5 px-5 py-3 text-sm text-silver/80">Designed for structured team progress</div>
        </div>
        <div className="mt-10 space-y-5">
          {featuredTournament.stages.map((stage, index) => (
            <div key={stage.id} className="relative rounded-[28px] border border-white/10 bg-[#12121b] p-6">
              <div className="absolute left-[-0.75rem] top-6 h-4 w-4 rounded-full bg-violet shadow-[0_0_20px_rgba(140,51,255,0.35)]" />
              <div className="flex items-center gap-4">
                <div className="min-w-[3rem] text-3xl font-semibold text-violet">{index + 1}</div>
                <div>
                  <p className="text-xl font-semibold text-white">{stage.title}</p>
                  <p className="mt-2 text-sm text-silver/80">{stage.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TournamentsPage;
