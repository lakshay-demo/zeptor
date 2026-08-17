import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { teams } from '../data/teams';

const TeamsPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="rounded-[40px] border border-violet/25 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
        <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">Competitive Teams</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Indian squads driven by long-term growth</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-silver-muted sm:text-base">
          Explore our roster of competitive teams, see player lineups, recent form and their performance in BGMI scrims and tournaments.
        </p>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {teams.map((team) => (
          <motion.div key={team.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-[36px] border border-violet/20 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur p-6 shadow-[0_0_30px_rgba(168,85,247,0.12)] hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] transition-all duration-300">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-violet/80 font-semibold">{team.region}</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{team.name}</h2>
              </div>
              <div className="rounded-3xl bg-gradient-to-r from-violet/10 to-purple/5 border border-violet/20 px-4 py-2 text-sm text-silver-muted">Team</div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-silver-muted">
              <p>Players: {team.members.join(', ')}</p>
              <p>Matches: {team.matches}</p>
              <p>Wins: {team.wins}</p>
              <p>Points: {team.points}</p>
              <p>Form: {team.form}</p>
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <Link to={`/teams/${team.id}`} className="text-sm font-semibold text-violet transition hover:text-violet-bright">
                View Profile
              </Link>
              <ArrowRight size={18} className="text-violet" />
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default TeamsPage;
