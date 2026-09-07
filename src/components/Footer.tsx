import { Instagram, Youtube, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoPoster from '../assets/posters/logo.png';
import { siteConfig } from '../data/siteConfig';

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Daily Scrims', path: '/scrims' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Results', path: '/results' },
  { label: 'Media', path: '/media' },
  { label: 'Community', path: '/community' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Footer = () => (
  <footer className="border-t border-violet/15 bg-gradient-to-b from-purple/5 to-surface py-12 text-silver">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[1.3fr_1.7fr] lg:px-8">
      <div className="footer-brand space-y-3">
        <div className="flex items-center gap-3">
          <img src={logoPoster} alt="Zeptor Esports logo" className="h-12 w-12 rounded-2xl border border-violet/40 bg-gradient-to-br from-violet/10 to-purple/5 object-cover shadow-[0_0_30px_rgba(168,85,247,0.2)]" />
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-violet/80 font-semibold">Zeptor Esports</p>
            <p className="text-lg font-semibold text-white">PLAY. COMPETE. DOMINATE.</p>
          </div>
        </div>
        <p className="max-w-sm text-sm leading-6 text-silver-muted">
          A competitive BGMI ecosystem built for serious teams and emerging players across India.
        </p>
        <div className="flex items-center gap-4 text-silver-muted">
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="transition hover:text-violet">
            <Instagram size={20} />
          </a>
          <a href={siteConfig.youtube} target="_blank" rel="noreferrer" className="transition hover:text-violet">
            <Youtube size={20} />
          </a>
          <a href={siteConfig.whatsappCommunity} target="_blank" rel="noreferrer" className="transition hover:text-violet">
            <MessageCircle size={20} />
          </a>
        </div>
      </div>

      <div className="grid gap-8 grid-cols-2">
        <div>
          <h3 className="mb-3 text-xs uppercase tracking-[0.24em] text-violet/80 font-semibold">Navigation</h3>
          <div className="grid gap-2 text-xs text-silver/80">
            {footerLinks.map((item) => (
              <Link key={item.label} to={item.path} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-xs uppercase tracking-[0.24em] text-violet/80 font-semibold">Contact</h3>
          <div className="space-y-3 text-xs text-silver-muted">
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-silver/60">WhatsApp</p>
              <a href={siteConfig.whatsappCommunity} target="_blank" rel="noreferrer" className="block text-white transition hover:text-violet">
                Join community
              </a>
            </div>

            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-silver/60">Email</p>
              <a href={`mailto:${siteConfig.email}`} className="block break-all text-white transition hover:text-violet">
                {siteConfig.email}
              </a>
            </div>

            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-silver/60">Phone</p>
              <a href={`tel:${siteConfig.contactPhone}`} className="block text-white transition hover:text-violet">
                {siteConfig.contactPhone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-10 border-t border-violet/10 pt-6 text-center text-sm text-silver-muted">
      © 2026 Zeptor Esports. All rights reserved.
    </div>
  </footer>
);

export default Footer;
