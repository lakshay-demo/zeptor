import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Instagram, Youtube, Users } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logoPoster from '../assets/posters/WhatsApp Image 2026-08-11 at 11.34.55 PM.jpeg';
import { siteConfig } from '../data/siteConfig';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/scrims', label: 'Scrims' },
  { path: '/tournaments', label: 'Tournaments' },
  { path: '/leaderboard', label: 'Leaderboards' },
  { path: '/teams', label: 'Teams' },
  { path: '/results', label: 'Results' },
  { path: '/live', label: 'Live' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-frost border-b border-violet/20 shadow-card py-3' : 'bg-transparent py-4'}`}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-white hover:text-violet/80 transition">
          <img
            src={logoPoster}
            alt="Zeptor Esports logo"
            className="h-12 w-12 rounded-2xl border border-violet/40 bg-gradient-to-br from-violet/10 to-purple/5 object-cover shadow-[0_0_30px_rgba(168,85,247,0.2)]"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-violet/70">Zeptor</p>
            <p className="text-sm font-semibold">Esports</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm transition ${isActive ? 'text-white font-semibold' : 'text-silver/80 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="text-silver/80 transition hover:text-white">
            <Instagram size={18} />
          </a>
          <a href={siteConfig.youtube} target="_blank" rel="noreferrer" className="text-silver/80 transition hover:text-white">
            <Youtube size={18} />
          </a>
          <a
            href={siteConfig.whatsappCommunity}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-violet px-5 py-2 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(140,51,255,0.18)] transition hover:-translate-y-0.5"
          >
            JOIN COMMUNITY
          </a>
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center rounded-full border border-violet/30 bg-violet/5 p-3 text-silver/70 transition hover:bg-violet/10 hover:text-violet hover:border-violet/50 lg:hidden"
        >
          <Menu size={22} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute right-4 top-4 w-[calc(100%-2rem)] max-w-sm rounded-3xl border border-violet/20 bg-gradient-to-br from-violet/5 to-purple/5 backdrop-blur-xl p-6 shadow-[0_20px_60px_rgba(168,85,247,0.15)]" onClick={(event) => event.stopPropagation()}>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-violet/70">Menu</p>
                  <p className="text-lg font-semibold text-white">Zeptor Navigation</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-silver/80 hover:text-white">
                  Close
                </button>
              </div>
              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-base text-silver transition hover:bg-violet/10 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-6 text-silver/80">
                <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white hover:text-violet">
                  <Instagram size={18} /> Instagram
                </a>
                <a href={siteConfig.whatsappCommunity} target="_blank" rel="noreferrer" className="rounded-full bg-violet px-5 py-2 text-sm font-semibold text-white">
                  Join
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
