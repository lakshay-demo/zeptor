import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { featuredTournament } from '../data/tournaments';

const TournamentDetailsPage = () => {
  const { id } = useParams();
  const tournament = id === featuredTournament.id ? featuredTournament : null;

  if (!tournament) {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-[40px] border border-white/10 bg-[#0f0f18] p-12 text-center text-silver/80 shadow-card">
          <h1 className="text-3xl font-semibold text-white">Tournament details updating soon</h1>
          <p className="mt-4">This event will appear once it is published. Check the tournaments page for current openings.</p>
          <Link to="/tournaments" className="mt-8 inline-flex rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
            View tournaments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-[40px] border border-white/10 bg-[#0b0b13] p-8 shadow-card">
        <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Tournament Details</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">{tournament.name}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-silver/80 sm:text-base">{tournament.summary}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-silver/70">Prize Pool</p>
            <p className="mt-3 text-2xl font-semibold text-white">{tournament.prizePool}</p>
          </div>
          <div className="rounded-3xl bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-silver/70">Slots</p>
            <p className="mt-3 text-2xl font-semibold text-white">{tournament.slots}</p>
          </div>
          <div className="rounded-3xl bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-silver/70">Registered</p>
            <p className="mt-3 text-2xl font-semibold text-white">{tournament.registeredTeams}</p>
          </div>
          <div className="rounded-3xl bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-silver/70">Stage</p>
            <p className="mt-3 text-2xl font-semibold text-white">{tournament.status}</p>
          </div>
        </div>
        <div className="mt-8 rounded-[32px] border border-white/10 bg-[#0f0f18] p-6">
          <h2 className="text-xl font-semibold text-white">Format</h2>
          <p className="mt-3 text-sm leading-7 text-silver/80">{tournament.format}</p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 rounded-[32px] bg-[#0f0f18] p-6">
            <div>
              <h3 className="text-xl font-semibold text-white">Prize Distribution</h3>
              <p className="mt-3 text-sm leading-7 text-silver/80">Podium rewards are built for serious competitive teams and top placements.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/5 p-4 text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-silver/70">Champion</p>
                <p className="mt-2 text-2xl font-semibold text-white">45%</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4 text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-silver/70">Runner-up</p>
                <p className="mt-2 text-2xl font-semibold text-white">20%</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4 text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-silver/70">Top 7</p>
                <p className="mt-2 text-2xl font-semibold text-white">35%</p>
              </div>
            </div>
          </div>
          <div className="rounded-[32px] bg-[#0f0f18] p-6">
            <h3 className="text-xl font-semibold text-white">Schedule</h3>
            <div className="mt-5 space-y-4">
              {tournament.stages.map((stage) => (
                <div key={stage.id} className="rounded-3xl bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">{stage.title}</p>
                  <p className="mt-2 text-sm text-silver/80">{stage.description}</p>
                  <span className="mt-3 inline-flex rounded-full bg-violet/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-violet">{stage.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/tournaments" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-silver transition hover:bg-violet/10 hover:text-white">
            Back to tournaments
          </Link>
          <a href="mailto:hello@zeptoresports.in" className="rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
            Register team
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default TournamentDetailsPage;
