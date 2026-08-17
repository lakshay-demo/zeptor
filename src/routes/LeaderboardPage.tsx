import { motion } from 'framer-motion';
import { Search, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { leaderboardTeams } from '../data/leaderboard';

const LeaderboardPage = () => {
  const [query, setQuery] = useState('');
  const filteredTeams = useMemo(
    () => leaderboardTeams.filter((team) => team.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="rounded-[40px] border border-violet/25 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
        <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">Leaderboard</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Rankings for India's top BGMI squads</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-silver-muted sm:text-base">
          Search teams, compare points and track the top contenders fighting for qualification.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">Search team</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Find the squad you need</h2>
              </div>
              <div className="relative w-full sm:w-80">
                <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-silver/60" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by team name"
                  className="w-full rounded-3xl border border-violet/20 bg-gradient-to-br from-violet/5 to-purple/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-violet focus:ring-2 focus:ring-violet/30"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">Leaderboard table</p>
                <p className="mt-2 text-sm text-silver/80">Top teams are displayed with rank points and performance.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet/10 to-purple/5 border border-violet/20 px-4 py-2 text-sm text-silver-muted">
                <Star size={16} className="text-violet" /> Top 3 highlighted
              </div>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-silver/80">
                <thead>
                  <tr className="border-b border-violet/10 text-xs uppercase tracking-[0.35em] text-violet/80 font-semibold">
                    <th className="px-3 py-4">Rank</th>
                    <th className="px-3 py-4">Team</th>
                    <th className="px-3 py-4">Matches</th>
                    <th className="px-3 py-4">WWCD</th>
                    <th className="px-3 py-4">Placement</th>
                    <th className="px-3 py-4">Kills</th>
                    <th className="px-3 py-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.map((team) => (
                    <tr key={team.id} className={`border-b border-violet/10 transition ${team.status === 'qualified' ? 'bg-violet/5' : 'hover:bg-violet/5'}`}>
                      <td className="px-3 py-4 font-semibold text-white">{team.rank}</td>
                      <td className="px-3 py-4 text-white">{team.name}</td>
                      <td className="px-3 py-4">{team.matches}</td>
                      <td className="px-3 py-4">{team.wwcd}</td>
                      <td className="px-3 py-4">{team.placementPoints}</td>
                      <td className="px-3 py-4">{team.killPoints}</td>
                      <td className="px-3 py-4 font-semibold text-white">{team.totalPoints}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredTeams.length === 0 && (
                <div className="rounded-3xl bg-gradient-to-br from-violet/5 to-purple/5 border border-violet/20 p-8 text-center text-sm text-silver-muted">No teams found. Try another search term.</div>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">Top podium</p>
            <div className="mt-6 space-y-4">
              {leaderboardTeams.slice(0, 3).map((team) => (
                <motion.div key={team.id} className="rounded-3xl border border-violet/20 bg-gradient-to-br from-violet/5 to-purple/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-silver/80">#{team.rank}</p>
                      <h3 className="mt-2 text-xl font-semibold text-white">{team.name}</h3>
                    </div>
                    <span className="rounded-full bg-violet/15 px-3 py-2 text-xs uppercase tracking-[0.35em] text-violet">Top {team.rank}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-silver/80">
                    <div>
                      <p className="font-semibold text-white">Matches</p>
                      <p>{team.matches}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Points</p>
                      <p>{team.totalPoints}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
            <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Qualification</p>
            <p className="mt-4 text-sm leading-7 text-silver/80">Qualified squads receive priority seeding in the next Zeptor event and live match slots.</p>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default LeaderboardPage;
