import { motion } from 'framer-motion';
import { ArrowRight, Crown, ShieldCheck, Sparkles, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { computeEligibilityStatus, rewardItems, rewardLeaderboard, rewardSettings, rewardWinners } from '../data/rewards';

const MonthlyRewardsPage = () => (
  <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
    <section className="rounded-[42px] border border-violet/20 bg-gradient-to-br from-[#09090d] via-[#101017] to-[#09090d] p-8 shadow-[0_0_60px_rgba(168,85,247,0.18)]">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.38em] text-violet/80 font-semibold">Zeptor Monthly Rewards</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            PLAY MORE. PERFORM BETTER. GET REWARDED.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-silver/80">
            The more consistently your team competes in Zeptor scrims and the better you perform, the better your eligibility for our monthly team rewards.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link to="/scrims" className="btn-primary px-6 py-3.5 text-sm">Play scrims</Link>
            <Link to="/admin" className="btn-secondary px-6 py-3.5 text-sm">Admin dashboard</Link>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-[#111118] p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.35em] text-violet/80">This month</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">{rewardSettings.monthLabel}</h2>
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-violet/15 bg-violet/5 px-4 py-3">
              <span className="text-sm text-silver/80">Minimum score</span>
              <span className="text-lg font-semibold text-white">{rewardSettings.minEligibilityScore}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-violet/15 bg-violet/5 px-4 py-3">
              <span className="text-sm text-silver/80">Max draw entries</span>
              <span className="text-lg font-semibold text-white">{rewardSettings.maxDrawEntries}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-violet/15 bg-violet/5 px-4 py-3">
              <span className="text-sm text-silver/80">Draw window</span>
              <span className="text-lg font-semibold text-white">Monthly</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="mt-16">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">This month’s rewards</p>
        <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Premium gadgets and BGMI rewards</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {rewardItems.map((reward, index) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            whileHover={{ y: -5 }}
            className="premium-card rounded-[32px] border border-white/10 bg-[#0d0d15] p-6 shadow-card"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet/10 text-3xl shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-transform duration-300 group-hover:scale-110">
              {reward.emoji}
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.35em] text-violet/70">{reward.category}</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{reward.name}</h3>
            <p className="mt-3 text-sm leading-7 text-silver/80">{reward.description}</p>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[34px] border border-white/10 bg-[#0d0d15] p-6 shadow-card">
        <div className="flex items-center gap-3 text-violet">
          <ShieldCheck className="h-5 w-5" />
          <p className="text-sm uppercase tracking-[0.35em] font-semibold">Eligibility model</p>
        </div>

        <div className="mt-6 space-y-5">
          <div className="rounded-3xl border border-violet/15 bg-violet/5 p-4">
            <p className="text-xs uppercase tracking-[0.35em] text-violet/80">Participation</p>
            <p className="mt-3 text-lg font-semibold text-white">+1 point per completed scrim</p>
          </div>
          <div className="rounded-3xl border border-violet/15 bg-violet/5 p-4">
            <p className="text-xs uppercase tracking-[0.35em] text-violet/80">Performance</p>
            <p className="mt-3 text-lg font-semibold text-white">Top 10 +2 • Top 5 +4 • Top 3 +6 • WWCD +8</p>
          </div>
          <div className="rounded-3xl border border-violet/15 bg-violet/5 p-4">
            <p className="text-xs uppercase tracking-[0.35em] text-violet/80">Consistency</p>
            <p className="mt-3 text-lg font-semibold text-white">Monthly participation across multiple days is rewarded.</p>
          </div>
        </div>
      </div>

      <div className="rounded-[34px] border border-white/10 bg-[#0d0d15] p-6 shadow-card">
        <div className="flex items-center gap-3 text-violet">
          <Sparkles className="h-5 w-5" />
          <p className="text-sm uppercase tracking-[0.35em] font-semibold">Fair draw rules</p>
        </div>

        <ul className="mt-6 space-y-4 text-sm leading-7 text-silver/80">
          <li>• Only valid and completed scrim participation counts.</li>
          <li>• Cancelled, duplicate, failed-payment, and rejected registrations are excluded.</li>
          <li>• Teams earn weighted entries based on their monthly score.</li>
          <li>• Draws are reviewed by admin before a winner is announced.</li>
          <li>• Rewards may vary and are not guaranteed for every team.</li>
        </ul>
      </div>
    </section>

    <section className="mt-16 rounded-[34px] border border-white/10 bg-[#0d0d15] p-6 shadow-card">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">Team progress</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Monthly reward leaderboard</h2>
        </div>
        <Link to="/rewards/winners" className="inline-flex items-center gap-2 text-sm font-semibold text-violet hover:text-white">
          View winners <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-[28px] border border-violet/15">
        <div className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_0.8fr] bg-violet/10 px-4 py-3 text-xs uppercase tracking-[0.28em] text-silver/80">
          <span>Team</span>
          <span>Score</span>
          <span>Draws</span>
          <span>Status</span>
          <span>Progress</span>
        </div>

        {rewardLeaderboard.map((team) => (
          <div key={team.teamId} className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_0.8fr] items-center gap-2 border-t border-violet/10 bg-[#111118] px-4 py-4 text-sm text-silver/80">
            <div>
              <p className="font-semibold text-white">{team.teamName}</p>
              <p className="mt-1 text-xs text-silver/60">{team.participation} scrims</p>
            </div>
            <span className="font-semibold text-white">{team.totalScore}</span>
            <span>{team.drawEntries}</span>
            <span className={team.status === 'Eligible' ? 'text-violet' : 'text-amber-300'}>{team.status}</span>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-violet to-purple" style={{ width: `${Math.min((team.totalScore / rewardSettings.minEligibilityScore) * 100, 100)}%` }} />
              </div>
              <span className="min-w-[40px] text-right text-xs text-white">{Math.min(Math.round((team.totalScore / rewardSettings.minEligibilityScore) * 100), 100)}%</span>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="mt-16 rounded-[34px] border border-white/10 bg-[#0d0d15] p-6 shadow-card">
      <div className="flex items-center gap-3 text-violet">
        <Crown className="h-5 w-5" />
        <p className="text-sm uppercase tracking-[0.35em] font-semibold">Winner announcement</p>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {rewardWinners.map((winner) => (
          <div key={`${winner.month}-${winner.winningTeam}`} className="rounded-[28px] border border-violet/15 bg-violet/5 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-violet/80">{winner.month}</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">{winner.reward}</h3>
            <p className="mt-3 text-sm text-silver/80">Winning team: <span className="font-semibold text-white">{winner.winningTeam}</span></p>
            <p className="mt-2 text-sm text-silver/80">Score: <span className="font-semibold text-white">{winner.score}</span></p>
            <p className="mt-2 text-sm text-silver/80">Published: {winner.winnerDate}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mt-16 rounded-[34px] border border-violet/20 bg-gradient-to-br from-violet/5 to-[#101017] p-6 shadow-[0_0_50px_rgba(168,85,247,0.12)]">
      <div className="flex items-center gap-3 text-violet">
        <Trophy className="h-5 w-5" />
        <p className="text-sm uppercase tracking-[0.35em] font-semibold">Transparent terms</p>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold text-white">Eligibility criteria</h3>
          <p className="mt-3 text-sm leading-7 text-silver/80">Teams must complete valid scrims and meet the monthly point threshold to enter the lucky draw. The score is based on participation, performance and consistency.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Disqualification conditions</h3>
          <p className="mt-3 text-sm leading-7 text-silver/80">Cancelled matches, fake sign-ups, duplicate entries, failed payments, and admin-rejected registrations do not contribute to reward eligibility.</p>
        </div>
      </div>
    </section>
  </div>
);

export default MonthlyRewardsPage;
