import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Plane,
  Castle,
  Star,
  Headphones,
  Ship,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

/* ──────────────────────────────────────
   Service Data
   ────────────────────────────────────── */
interface Service {
  icon: LucideIcon;
  title: string;
  titleEn: string;
  description: string;
  accent: string;
}

const services: Service[] = [
  {
    icon: Plane,
    title: 'الطيران الخاص',
    titleEn: 'Private Jets',
    description:
      'طائرات خاصة بأعلى معايير الفخامة والراحة. نختار لك أفضل الأساطيل العالمية لتصل إلى وجهتك بأناقة مطلقة.',
    accent: '#FFAC4B',
  },
  {
    icon: Castle,
    title: 'الفيلات والقصور',
    titleEn: 'Luxury Villas & Palaces',
    description:
      'إقامة في قصور تاريخية وفيلات خاصة بإطلالات خلابة. كل إقامة هي تجربة ملكية لا تُنسى.',
    accent: '#74B49B',
  },
  {
    icon: Star,
    title: 'الحجوزات المستحيلة',
    titleEn: 'Impossible Reservations',
    description:
      'طاولتك محفوظة في أرقى مطاعم العالم وأكثر الفعاليات حصرية. نفتح لك أبواباً لا تُفتح للعامة.',
    accent: '#FFAC4B',
  },
  {
    icon: Headphones,
    title: 'كونسيرج شخصي 24/7',
    titleEn: '24/7 Personal Concierge',
    description:
      'فريق متخصص تحت تصرفك على مدار الساعة. من حجز المواعيد إلى ترتيب المفاجآت، نحن هنا دائماً.',
    accent: '#74B49B',
  },
  {
    icon: Ship,
    title: 'يخوت فاخرة',
    titleEn: 'Luxury Yachts',
    description:
      'أبحر في أجمل بحار العالم على متن يخوت فاخرة مجهزة بالكامل. تجربة بحرية لا مثيل لها.',
    accent: '#FFAC4B',
  },
  {
    icon: ShieldCheck,
    title: 'حماية وخصوصية',
    titleEn: 'Privacy & Security',
    description:
      'أمان تام وخصوصية مطلقة في كل تفاصيل رحلتك. فريق حماية محترف يرافقك أينما ذهبت.',
    accent: '#74B49B',
  },
];

/* ──────────────────────────────────────
   Animation Variants
   ────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 18 },
  },
};

/* ──────────────────────────────────────
   Service Card Component
   ────────────────────────────────────── */
function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group relative rounded-4xl p-8 md:p-10 border border-white/50 cursor-none"
      style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 8px 32px -10px rgba(26, 46, 53, 0.06)',
      }}
    >
      {/* Top accent bar on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-4xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"
        style={{ backgroundColor: service.accent }}
      />

      {/* Icon Container */}
      <div
        className="mb-7 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
        style={{
          backgroundColor: `${service.accent}15`,
        }}
      >
        <Icon
          size={30}
          style={{ color: service.accent }}
          strokeWidth={1.8}
        />
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-black text-navy mb-2 leading-tight">
        {service.title}
      </h3>
      <span
        dir="ltr"
        className="text-en text-[10px] font-bold tracking-[0.3em] uppercase block mb-5"
        style={{ color: `${service.accent}80` }}
      >
        {service.titleEn}
      </span>

      {/* Description */}
      <p className="text-sm md:text-[15px] text-muted leading-relaxed font-medium">
        {service.description}
      </p>

      {/* Hover indicator */}
      <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span
          className="text-xs font-bold"
          style={{ color: service.accent }}
        >
          المزيد
        </span>
        <ArrowLeft size={14} style={{ color: service.accent }} />
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   MAIN — ServicesPage
   ══════════════════════════════════════ */
export default function ServicesPage() {
  return (
    <div dir="rtl" className="font-cairo min-h-screen pt-40 pb-24 px-4 sm:px-6 lg:px-8">
      {/* ─── Page Header ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-3xl mx-auto mb-20"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-white/50 rounded-full px-6 py-3 mb-8 shadow-sm"
        >
          <Sparkles size={16} className="text-orange-accent" />
          <span
            dir="ltr"
            className="text-en text-[11px] font-bold tracking-[0.4em] text-orange-accent uppercase"
          >
            Premium Services
          </span>
        </motion.div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy leading-tight mb-6">
          خدماتنا{' '}
          <span className="text-orange-accent">الاستثنائية</span>
        </h1>

        <p className="text-base md:text-lg text-muted font-medium leading-relaxed max-w-xl mx-auto">
          نُقدّم لك باقة من الخدمات الفاخرة المصممة خصيصاً لتجعل كل
          لحظة في رحلتك تجربة لا تُضاهى. لأنك تستحق الأفضل، دائماً.
        </p>
      </motion.div>

      {/* ─── Services Grid ─── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8 mb-24"
      >
        {services.map((service) => (
          <ServiceCard key={service.titleEn} service={service} />
        ))}
      </motion.div>

      {/* ─── Bottom CTA Banner ─── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1A2E35 0%, #2A4A55 100%)',
          boxShadow: '0 30px 60px -20px rgba(26, 46, 53, 0.3)',
        }}
      >
        {/* Decorative orbs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-accent/10 rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-mint-500/10 rounded-full blur-[80px]" />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            جاهز لتجربة{' '}
            <span className="text-orange-accent">لا مثيل لها</span>؟
          </h2>
          <p className="text-white/60 text-base md:text-lg font-medium mb-10 max-w-lg mx-auto leading-relaxed">
            دعنا نصمم لك رحلة أحلامك. فريقنا مستعد لتحويل رؤيتك إلى
            واقع استثنائي.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/#golden-ticket">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-orange-accent text-white px-10 py-4 rounded-full font-black text-lg shadow-[0_8px_30px_rgba(255,172,75,0.4)] hover:shadow-[0_12px_40px_rgba(255,172,75,0.5)] transition-shadow"
              >
                <span>احجز الآن</span>
                <Plane size={20} className="rotate-[-35deg]" />
              </motion.button>
            </Link>

            <Link to="/trips">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-white/10 border border-white/20 text-white px-10 py-4 rounded-full font-black text-lg backdrop-blur-md hover:bg-white/20 transition-colors"
              >
                <span>استكشف الرحلات</span>
                <ArrowLeft size={18} />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
