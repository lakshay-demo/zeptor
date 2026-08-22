import { Trophy } from 'lucide-react';
import { rewardWinners } from '../data/rewards';

const RewardWinnersPage = () => (
  <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
    <section className="rounded-[42px] border border-violet/20 bg-gradient-to-br from-[#09090d] via-[#101017] to-[#09090d] p-8 shadow-[0_0_80px_rgba(168,85,247,0.18)]">
      <p className="text-sm uppercase tracking-[0.38em] text-violet/80 font-semibold">Monthly reward winners</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">🏆 AUGUST 2026</h1>
      <p className="mt-4 text-base leading-8 text-silver/80">Winning teams are selected after an admin-reviewed weighted draw. The winner is never announced without confirmation.</p>
    </section>

    <section className="mt-10 grid gap-6 lg:grid-cols-2">
      {rewardWinners.map((winner) => (
        <article key={`${winner.month}-${winner.winningTeam}`} className="rounded-[34px] border border-white/10 bg-[#0d0d15] p-6 shadow-card">
          <div className="flex items-center gap-3 text-violet">
            <Trophy className="h-5 w-5" />
            <p className="text-xs uppercase tracking-[0.35em]">{winner.month}</p>
          </div>

          <h2 className="mt-4 text-3xl font-semibold text-white">{winner.reward}</h2>
          <p className="mt-6 text-sm uppercase tracking-[0.35em] text-silver/70">Winner</p>
          <p className="mt-3 text-3xl font-semibold text-white">{winner.winningTeam}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-violet/15 bg-violet/5 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/80">Score</p>
              <p className="mt-2 text-2xl font-semibold text-white">{winner.score}</p>
            </div>
            <div className="rounded-2xl border border-violet/15 bg-violet/5 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/80">Participation</p>
              <p className="mt-2 text-2xl font-semibold text-white">{winner.participation}</p>
            </div>
            <div className="rounded-2xl border border-violet/15 bg-violet/5 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/80">Performance</p>
              <p className="mt-2 text-2xl font-semibold text-white">{winner.performance}</p>
            </div>
            <div className="rounded-2xl border border-violet/15 bg-violet/5 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-violet/80">Announcement</p>
              <p className="mt-2 text-sm font-semibold text-white">{winner.winnerDate}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  </div>
);

export default RewardWinnersPage;
