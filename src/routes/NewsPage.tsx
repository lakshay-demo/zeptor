import { motion } from 'framer-motion';
import { news } from '../data/news';

const NewsPage = () => (
  <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
    <section className="rounded-[40px] border border-white/10 bg-[#0b0b13] p-8 shadow-card">
      <p className="text-sm uppercase tracking-[0.35em] text-violet/70">News & Updates</p>
      <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Announcements that matter to the Zeptor community</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-silver/80 sm:text-base">
        Stay informed with the latest tournament announcements, scrim release notes and event updates.
      </p>
    </section>

    <section className="mt-10 grid gap-6 lg:grid-cols-3">
      {news.map((item, idx) => (
        <motion.article key={item.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05, duration: 0.35 }} className="overflow-hidden rounded-[36px] border border-white/10 bg-[#0f0f18] shadow-card">
          <div className="h-52 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
          <div className="p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-violet/70">{item.category}</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-silver/80">{item.description}</p>
            <div className="mt-6 flex items-center justify-between text-sm text-silver/70">
              <span>{item.date}</span>
              <a href={item.link} className="text-violet hover:text-white">
                Read More
              </a>
            </div>
          </div>
        </motion.article>
      ))}
    </section>
  </div>
);

export default NewsPage;
