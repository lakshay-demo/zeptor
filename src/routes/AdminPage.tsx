import { motion } from 'framer-motion';
import { PlusCircle, Pencil, Trash2, ShieldCheck } from 'lucide-react';

const AdminPage = () => (
  <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
    <section className="rounded-[40px] border border-white/10 bg-[#0b0b13] p-8 shadow-card">
      <p className="text-sm uppercase tracking-[0.35em] text-violet/70">Admin placeholder</p>
      <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Future admin dashboard</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-silver/80 sm:text-base">
        This route is prepared for future backend integration and administrative management of scrims, tournaments, teams and content.
      </p>
    </section>

    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mt-10 grid gap-6 sm:grid-cols-2">
      {[
        { icon: PlusCircle, title: 'Create event', description: 'Add new scrim or tournament configurations through the backend later.' },
        { icon: Pencil, title: 'Edit schedule', description: 'Update session timings, entry fees and prize pools in one platform.' },
        { icon: Trash2, title: 'Remove content', description: 'Delete outdated scrims, results or news cards in real time.' },
        { icon: ShieldCheck, title: 'Approve listings', description: 'Validate team registrations and match schedules before publication.' },
      ].map((item) => (
        <div key={item.title} className="rounded-[36px] border border-white/10 bg-[#0f0f18] p-6 shadow-card">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-violet/10 text-violet">
            <item.icon size={22} />
          </div>
          <h2 className="mt-5 text-xl font-semibold text-white">{item.title}</h2>
          <p className="mt-3 text-sm leading-7 text-silver/80">{item.description}</p>
        </div>
      ))}
    </motion.div>
  </div>
);

export default AdminPage;
