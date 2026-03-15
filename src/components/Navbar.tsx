import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  Plane,
  Home,
  Map,
  Sparkles,
  PhoneCall,
  ArrowLeft,
  type LucideIcon,
} from 'lucide-react';

/* ──────────────────────────────────────
   Types & Data
   ────────────────────────────────────── */
interface NavLink {
  label: string;
  path: string;
  Icon: LucideIcon;
}

const navLinks: NavLink[] = [
  { label: 'الرئيسية', path: '/', Icon: Home },
  { label: 'الرحلات', path: '/trips', Icon: Map },
  { label: 'خدماتنا', path: '/services', Icon: Sparkles },
  { label: 'اتصل بنا', path: '/contact', Icon: PhoneCall },
];

/* ──────────────────────────────────────
   Burst icon positions (تأثير التناثر)
   ────────────────────────────────────── */
const burstPositions = [
  { x: -22, y: -22, rotate: -15 },   // أعلى اليسار
  { x: 22, y: -18, rotate: 15 },     // أعلى اليمين
  { x: 0, y: 22, rotate: 180 },      // أسفل الوسط
];

/* ──────────────────────────────────────
   Single Nav Link — Burst Pop-Behind
   ────────────────────────────────────── */
const NavItem = ({ link, isScrolled }: { link: NavLink; isScrolled: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const IconComponent = link.Icon;

  return (
    <Link to={link.path} data-clickable>
      <motion.div
        className="relative flex items-center justify-center px-3 py-1 cursor-pointer outline-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* 3 Burst Icons — تتناثر خلف النص */}
        {burstPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
            initial={false}
            animate={{
              x: hovered ? pos.x : 0,
              y: hovered ? pos.y : 0,
              opacity: hovered ? 0.95 : 0,
              scale: hovered ? 1 : 0,
              rotate: hovered ? pos.rotate : 0,
            }}
            transition={{
              type: 'spring',
              bounce: 0.5,
              delay: hovered ? i * 0.03 : 0,
            }}
          >
            <IconComponent
              size={14}
              className="text-[#FFAC4B]"
              strokeWidth={2.5}
            />
          </motion.div>
        ))}

        {/* Text — always on top */}
        <motion.span
          className="relative z-10 text-[14px] font-bold select-none transition-colors shrink-0 min-w-max whitespace-nowrap leading-relaxed"
          animate={{
            color: hovered
              ? '#FFAC4B' // برتقالي عند التمرير
              : '#1A2E35' // اللون الأساسي (Dark Navy)
          }}
          transition={{ duration: 0.2 }}
        >
          {link.label}
        </motion.span>
      </motion.div>
    </Link>
  );
};

/* ──────────────────────────────────────
   CTA Button — Compact Version
   ────────────────────────────────────── */
const BookNowButton = ({ full = false }: { full?: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.95 }}
      className={`
                relative overflow-hidden bg-[#FFAC4B] text-white
                rounded-full font-bold shadow-btn outline-none
                hover:shadow-[0_6px_20px_rgba(255,172,75,0.4)]
                transition-shadow shrink-0 min-w-max whitespace-nowrap
                ${full ? 'py-4 px-10 text-base' : 'py-2 px-5 text-[13px]'} 
            `}
      data-clickable
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-l from-white/20 via-transparent to-transparent"
        initial={{ x: '100%' }}
        animate={hovered ? { x: '-100%' } : { x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      <motion.span
        className="relative z-10 flex items-center justify-center gap-2 leading-relaxed"
        animate={{
          paddingLeft: full ? undefined : hovered ? '1.5rem' : '1rem',
          paddingRight: full ? undefined : hovered ? '1.8rem' : '1rem',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        <motion.span
          animate={{
            opacity: hovered ? 1 : 0,
            x: hovered ? 0 : 8,
            width: hovered ? 'auto' : 0,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="overflow-hidden flex items-center"
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
        </motion.span>

        <span>احجز الآن</span>

        <motion.span
          animate={{
            x: hovered ? [0, -2, 0] : 0,
            rotate: hovered ? -35 : -35,
          }}
          transition={{ type: 'spring', stiffness: 250, damping: 18 }}
        >
          <Plane size={14} strokeWidth={2.5} className="rotate-[-35deg]" />
        </motion.span>
      </motion.span>
    </motion.button>
  );
};

/* ──────────────────────────────────────
   Main Navbar — Apple Capsule Style
   ────────────────────────────────────── */
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // مراقبة حركة السكرول
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.1 }}
      // التمركز ككبسولة عائمة (Floating Capsule)
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-300"
    >
      {/* ── Desktop bar (The Capsule) ── */}
      <div
        className={`w-full rounded-full transition-all duration-500 flex items-center justify-between px-3 md:px-4 py-2 ${isScrolled
          ? 'bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
          : 'bg-white/30 backdrop-blur-md border border-white/20 shadow-sm'
          }`}
        dir="rtl"
      >
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2.5 group outline-none ml-2" data-clickable>
          <motion.div
            whileHover={{ rotate: -10, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 250, damping: 14 }}
            className="bg-gradient-to-br from-mint-400 to-mint-600 rounded-full p-2 shadow-md shadow-mint-500/20"
          >
            <Plane size={18} className="text-white" />
          </motion.div>
          <div className="flex flex-col leading-none">
            <span className="text-[1.2rem] font-black text-navy tracking-tight">
              Darb
            </span>
            <span className="text-[9px] text-navy/70 font-bold tracking-widest mt-0.5">
              درب
            </span>
          </div>
        </Link>

        {/* ── Desktop Links ── */}
        <div className="hidden lg:flex flex-wrap items-center justify-center gap-6 px-4">
          {navLinks.map((link) => (
            <NavItem key={link.path} link={link} isScrolled={isScrolled} />
          ))}
        </div>

        {/* ── CTA + Mobile Toggle ── */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <BookNowButton />
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-full transition-colors ${isScrolled ? 'hover:bg-mint-50/80 text-navy' : 'text-navy hover:bg-white/30'}`}
            data-clickable
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-[-100vh] bg-navy/10 backdrop-blur-sm lg:hidden -z-10"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              // القائمة تظهر تحت الكبسولة مباشرة
              className="absolute top-[calc(100%+12px)] inset-x-0 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-6 lg:hidden overflow-hidden"
              dir="rtl"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      data-clickable
                      className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[14px] font-bold text-navy-light hover:text-navy hover:bg-mint-50/70 transition-colors outline-none"
                    >
                      <div className="w-8 h-8 rounded-full bg-mint-50 flex items-center justify-center">
                        <link.Icon size={16} className="text-[#74B49B]" />
                      </div>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="mt-6 flex justify-center"
              >
                <BookNowButton full />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;