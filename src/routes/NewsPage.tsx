import { motion } from 'framer-motion';
import { news } from '../data/news';

const NewsPage = () => (
  <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
    <section className="rounded-[40px] border border-violet/25 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
      <p className="text-sm uppercase tracking-[0.35em] text-violet/80 font-semibold">News & Updates</p>
      <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Announcements that matter to the Zeptor community</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-silver-muted sm:text-base">
        Stay informed with the latest tournament announcements, scrim release notes and event updates.
      </p>
    </section>

    <section className="mt-10 grid gap-6 lg:grid-cols-3">
      {news.map((item, idx) => (
        <motion.article key={item.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05, duration: 0.35 }} className="overflow-hidden rounded-[36px] border border-violet/20 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur shadow-[0_0_30px_rgba(168,85,247,0.12)] hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] transition-all duration-300">
          <div className="h-52 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
          <div className="p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-violet/80 font-semibold">{item.category}</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-silver-muted">{item.description}</p>
            <div className="mt-6 flex items-center justify-between text-sm text-silver-muted border-t border-violet/10 pt-4">
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
