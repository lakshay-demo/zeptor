import { motion } from 'framer-motion';
import type { SVGProps } from 'react';
import { Mail, Send } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

const ContactPage = () => (
  <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
    <section className="rounded-[40px] border border-white/10 bg-[#0b0b13] p-8 shadow-card">
      <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Contact</p>
      <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Connect with Zeptor for partnerships and enquiries</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-silver/80 sm:text-base">
        Reach out to collaborate, partner, sponsor or join the competitive BGMI community through our professional support channels.
      </p>
    </section>

    <section className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-[40px] border border-white/10 bg-[#0f0f18] p-8 shadow-card">
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { label: 'General Enquiries', icon: Mail, value: siteConfig.email },
            { label: 'Team / Player Enquiries', icon: Users, value: siteConfig.whatsappCommunity },
            { label: 'Tournament Partnerships', icon: Trophy, value: 'partnerships@zeptoresports.in' },
            { label: 'Promotions', icon: Sparkles, value: 'media@zeptoresports.in' },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl bg-white/5 p-5">
              <div className="flex items-center gap-3 text-violet">
                <item.icon size={18} />
                <p className="text-sm uppercase tracking-[0.35em] text-violet/70">{item.label}</p>
              </div>
              <p className="mt-4 text-sm text-silver/80 break-words">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.form initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08 }} className="rounded-[40px] border border-white/10 bg-[#0f0f18] p-8 shadow-card">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-silver/80">
            Name
            <input type="text" placeholder="Your name" className="w-full rounded-3xl border border-white/10 bg-[#0b0b13] px-4 py-3 text-white outline-none transition focus:border-violet focus:ring-2 focus:ring-violet/20" />
          </label>
          <label className="space-y-2 text-sm text-silver/80">
            Email
            <input type="email" placeholder="you@example.com" className="w-full rounded-3xl border border-white/10 bg-[#0b0b13] px-4 py-3 text-white outline-none transition focus:border-violet focus:ring-2 focus:ring-violet/20" />
          </label>
          <label className="space-y-2 text-sm text-silver/80">
            Phone
            <input type="tel" placeholder="+91 9XXXXXXXXX" className="w-full rounded-3xl border border-white/10 bg-[#0b0b13] px-4 py-3 text-white outline-none transition focus:border-violet focus:ring-2 focus:ring-violet/20" />
          </label>
          <label className="space-y-2 text-sm text-silver/80">
            Subject
            <input type="text" placeholder="Partnership request" className="w-full rounded-3xl border border-white/10 bg-[#0b0b13] px-4 py-3 text-white outline-none transition focus:border-violet focus:ring-2 focus:ring-violet/20" />
          </label>
        </div>
        <label className="mt-5 block space-y-2 text-sm text-silver/80">
          Message
          <textarea rows={6} placeholder="Tell us what you need" className="w-full rounded-3xl border border-white/10 bg-[#0b0b13] px-4 py-3 text-white outline-none transition focus:border-violet focus:ring-2 focus:ring-violet/20" />
        </label>
        <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
          <Send size={18} /> Send Message
        </button>
      </motion.form>
    </section>
  </div>
);

const Users = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Trophy = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M4 7h16" />
    <path d="M6 7a6 6 0 0 0 12 0" />
    <path d="M4 7v4a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V7" />
  </svg>
);

const Sparkles = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12l2 2 4-4" />
    <path d="M19 12l-2 2-4-4" />
    <path d="M12 2l0 20" />
  </svg>
);

export default ContactPage;
