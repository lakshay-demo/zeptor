import { Instagram, Youtube, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Scrims', path: '/scrims' },
  { label: 'Tournaments', path: '/tournaments' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Results', path: '/results' },
  { label: 'Live', path: '/live' },
  { label: 'Community', path: '/community' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Footer = () => (
  <footer className="border-t border-white/10 bg-[#050507] py-12 text-silver">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet/30 bg-gradient-to-br from-violet/20 to-purple/10 text-lg font-semibold text-violet shadow-card">
            Z
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-violet/70">Zeptor Esports</p>
            <p className="text-lg font-semibold text-white">PLAY. COMPETE. DOMINATE.</p>
          </div>
        </div>
        <p className="max-w-sm text-sm leading-6 text-silver/80">
          A competitive BGMI ecosystem built for serious teams and emerging players across India.
        </p>
        <div className="flex items-center gap-4 text-silver/80">
          <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="transition hover:text-white">
            <Instagram size={20} />
          </a>
          <a href={siteConfig.youtube} target="_blank" rel="noreferrer" className="transition hover:text-white">
            <Youtube size={20} />
          </a>
          <a href={siteConfig.whatsappCommunity} target="_blank" rel="noreferrer" className="transition hover:text-white">
            <MessageCircle size={20} />
          </a>
        </div>
      </div>

      <div>
        <h3 className="mb-5 text-sm uppercase tracking-[0.3em] text-violet/70">Navigation</h3>
        <div className="grid gap-3 text-sm text-silver/80">
          {footerLinks.map((item) => (
            <Link key={item.label} to={item.path} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-5 text-sm uppercase tracking-[0.3em] text-violet/70">Contact</h3>
        <div className="space-y-3 text-sm text-silver/80">
          <p>WhatsApp community</p>
          <a href={siteConfig.whatsappCommunity} target="_blank" rel="noreferrer" className="block text-white hover:text-violet">
            Join the group
          </a>
          <p>Email</p>
          <a href={`mailto:${siteConfig.email}`} className="block text-white hover:text-violet">
            {siteConfig.email}
          </a>
          <p>Phone</p>
          <a href={`tel:${siteConfig.contactPhone}`} className="block text-white hover:text-violet">
            {siteConfig.contactPhone}
          </a>
        </div>
      </div>
    </div>
    <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-silver/60">
      © 2026 Zeptor Esports. All rights reserved.
    </div>
  </footer>
);

export default Footer;
