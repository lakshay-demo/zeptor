import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (scrollTop / height) * 100 : 0;
      const progressBar = document.getElementById('zeptor-scroll-progress');
      if (progressBar) {
        progressBar.style.width = `${Math.min(progress, 100)}%`;
      }
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, [location.pathname]);

  return (
    <div className="min-h-screen text-silver">
      <div id="zeptor-scroll-progress" className="scroll-progress" style={{ width: 0 }} />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative overflow-hidden"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Layout;
