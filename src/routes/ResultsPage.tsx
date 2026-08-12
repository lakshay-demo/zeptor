import { motion } from 'framer-motion';
import { Filter, Trophy } from 'lucide-react';
import { useState } from 'react';
import { results } from '../data/results';

const filters = ['All', 'Daily Scrims', 'Tournaments', 'Recent'];

const ResultsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = results.filter((item) => activeFilter === 'All' || item.category === activeFilter);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="rounded-[40px] border border-white/10 bg-[#0b0b13] p-8 shadow-card">
        <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Latest Results</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Recent winners and tournament outcomes</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-silver/80 sm:text-base">
          Track results from daily scrims and tournaments, with a clean esports scoreboard for teams and champions.
        </p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Filter results</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Find the right event type</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-silver/80">
                <Filter size={18} />
                {activeFilter}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeFilter === filter ? 'bg-violet text-white' : 'bg-white/5 text-silver/80 hover:bg-white/10'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-violet/70">{item.category}</p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{item.event}</h3>
                    </div>
                    <div className="rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-silver/80">{item.date}</div>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-3 text-sm text-silver/80">
                    <div className="rounded-3xl bg-white/5 p-4">
                      <p className="font-semibold text-white">Winner</p>
                      <p className="mt-2">{item.winner}</p>
                    </div>
                    <div className="rounded-3xl bg-white/5 p-4">
                      <p className="font-semibold text-white">Runner-up</p>
                      <p className="mt-2">{item.runnerUp}</p>
                    </div>
                    <div className="rounded-3xl bg-white/5 p-4">
                      <p className="font-semibold text-white">Prize</p>
                      <p className="mt-2">{item.prizePool}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-10 text-center text-sm text-silver/80">
                No results published yet. Check back soon.
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
            <div className="flex items-center gap-3 text-violet">
              <Trophy size={20} />
              <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Performance</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-silver/80">Highlight the highest prize pools, recent champions and the teams setting the pace in Zeptor competition.</p>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default ResultsPage;
