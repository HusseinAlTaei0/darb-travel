import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  MessageCircle,
  Shield,
  Crown,
  CheckCircle2,
  User,
  Sparkles // 👈 ضفنا هذا الاستدعاء المفقود
} from 'lucide-react';

/* ──────────────────────────────────────
   Contact Info Data
   ────────────────────────────────────── */
const contactInfo = [
  {
    icon: MapPin,
    label: 'الموقع',
    labelEn: 'Location',
    value: 'بغداد، العراق — حي المنصور',
    accent: '#74B49B',
  },
  {
    icon: Phone,
    label: 'الهاتف',
    labelEn: 'Phone',
    value: '+964 770 000 0000\n+964 771 111 1111',
    accent: '#FFAC4B',
  },
  {
    icon: Mail,
    label: 'البريد الإلكتروني',
    labelEn: 'Email',
    value: 'vip@darb.travel\nsupport@darb.travel',
    accent: '#74B49B',
  },
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: MessageCircle, label: 'WhatsApp', href: '#' },
];

/* ──────────────────────────────────────
   Golden Ticket Form
   ────────────────────────────────────── */
function GoldenTicketForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  /* 3D Tilt */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setForm({ name: '', email: '', message: '' });
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative rounded-4xl p-12 md:p-16 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #1A2E35 0%, #2A4A55 100%)',
          boxShadow: '0 30px 60px -15px rgba(26, 46, 53, 0.4)',
        }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#74B49B]/10 rounded-full blur-3xl" />
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          className="w-20 h-20 rounded-2xl bg-[#74B49B]/20 flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 size={40} className="text-[#74B49B]" />
        </motion.div>
        <h3 className="text-3xl font-black text-white mb-4">شكراً لك!</h3>
        <p className="text-white/60 font-medium leading-relaxed">
          لقد استلمنا تذكرتك الذهبية.<br />سيتواصل معك أحد مستشاري السفر لدينا قريباً.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className="relative group/ticket"
    >
      <div
        className="relative rounded-4xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #1A2E35 0%, #233A42 50%, #1A2E35 100%)',
          boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255,255,255,0.1)',
        }}
      >
        <motion.div
          animate={{
            background: [
              'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0) 40%, transparent 100%)',
              'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
              'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0) 60%, transparent 100%)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none"
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] rotate-[-25deg]">
          <h4 className="text-[120px] font-black tracking-tighter text-white border-[12px] border-white px-10 rounded-[40px]">
            VIP
          </h4>
        </div>

        <div className="relative px-10 pt-10 pb-6 border-b border-white/5 flex items-center justify-between" dir="rtl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFAC4B]/20 flex items-center justify-center">
              <Crown size={22} className="text-[#FFAC4B]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white leading-tight">طلب تذكرة ذهبية</h3>
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#FFAC4B] uppercase block">
                Golden Pass Request
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20">
              <Shield size={18} />
            </div>
            <span className="text-[8px] font-bold tracking-widest text-white/20 mt-2 uppercase">SECURE END-TO-END</span>
          </div>
        </div>

        <div className="relative h-8 flex items-center">
          <div className="absolute left-0 right-0 h-px bg-white/10 border-t border-dashed mx-6" />
          <div className="absolute -left-4 w-8 h-8 rounded-full bg-cream" />
          <div className="absolute -right-4 w-8 h-8 rounded-full bg-cream" />
        </div>

        <form onSubmit={handleSubmit} className="px-10 pt-4 pb-10 space-y-7" dir="rtl">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-1">
              <label className="text-white/40 text-[10px] font-black uppercase tracking-widest">
                From — <span className="text-white/60">الاسم</span>
              </label>
              <User size={12} className="text-white/20" />
            </div>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="الاسم الكامل"
              required
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 font-bold text-[15px] focus:outline-none focus:border-[#FFAC4B]/40 focus:bg-white/[0.06] transition-all"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between mb-1">
              <label className="text-white/40 text-[10px] font-black uppercase tracking-widest">
                Via — <span className="text-white/60">البريد</span>
              </label>
              <Mail size={12} className="text-white/20" />
            </div>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="example@mail.com"
              required
              dir="ltr"
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 font-bold text-[15px] text-right focus:outline-none focus:border-[#FFAC4B]/40 focus:bg-white/[0.06] transition-all"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between mb-1">
              <label className="text-white/40 text-[10px] font-black uppercase tracking-widest">
                Subject — <span className="text-white/60">الرسالة</span>
              </label>
              <MessageCircle size={12} className="text-white/20" />
            </div>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="كيف يمكننا مساعدتك؟"
              required
              rows={4}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 font-bold text-[15px] resize-none focus:outline-none focus:border-[#FFAC4B]/40 focus:bg-white/[0.06] transition-all"
            />
          </div>

          <div className="relative pt-4">
            <div className="absolute top-1/2 -left-2 w-4 h-4 rounded-full bg-[#1A2E35] z-20" />
            <div className="absolute top-1/2 -right-2 w-4 h-4 rounded-full bg-[#1A2E35] z-20" />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full relative overflow-hidden bg-[#FFAC4B] text-white py-6 rounded-2xl font-black text-xl shadow-[0_15px_40px_-5px_rgba(255,172,75,0.4)] flex items-center justify-center gap-4 group"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">تأكيد الحجز الذهبي</span>
            </motion.button>
          </div>
        </form>

        <div className="px-10 pb-8 flex items-center justify-between" dir="ltr">
          <div className="flex gap-1.5 grayscale opacity-20">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1 h-6 bg-white rounded-full" />
            ))}
          </div>
          <span className="text-white/10 text-[9px] font-black tracking-[0.5em] uppercase">
            EST. 2024 · LUXURY CLASS
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────
   Info Card Component
   ────────────────────────────────────── */
function InfoCard() {
  return (
    <div className="space-y-6">
      {contactInfo.map((item) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.labelEn}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl p-6 md:p-8 border border-white/50 bg-white/65 backdrop-blur-2xl shadow-sm"
          >
            <div className="flex items-start gap-4" dir="rtl">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${item.accent}15` }}
              >
                <Icon size={22} style={{ color: item.accent }} strokeWidth={1.8} />
              </div>
              <div>
                <h4 className="text-base font-black text-[#1A2E35] mb-0.5">{item.label}</h4>
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase block mb-2" style={{ color: `${item.accent}80` }}>
                  {item.labelEn}
                </span>
                {item.value.split('\n').map((line, i) => (
                  <p key={i} className="text-sm text-[#6B7F86] font-medium leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-3xl p-6 md:p-8 border border-white/50 bg-white/65 backdrop-blur-2xl shadow-sm"
      >
        <h4 className="text-base font-black text-[#1A2E35] mb-4" dir="rtl">تابعنا</h4>
        <div className="flex items-center gap-4" dir="rtl">
          {socialLinks.map((social) => {
            const SocialIcon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-2xl bg-[#1A2E35]/5 hover:bg-[#FFAC4B]/10 flex items-center justify-center transition-colors"
              >
                <SocialIcon size={20} className="text-[#1A2E35]/60" />
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN — ContactPage
   ══════════════════════════════════════ */
export default function ContactPage() {
  return (
    <div dir="rtl" className="font-cairo min-h-screen pt-52 pb-24 px-4 sm:px-6 lg:px-8 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-white/50 rounded-full px-6 py-3 mb-8 shadow-sm"
        >
          <Sparkles size={16} className="text-[#FFAC4B]" />
          <span className="text-[11px] font-bold tracking-[0.4em] text-[#FFAC4B] uppercase">
            Get in Touch
          </span>
        </motion.div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A2E35] leading-tight mb-6">
          اتصل <span className="text-[#FFAC4B]">بنا</span>
        </h1>

        <p className="text-base md:text-lg text-[#6B7F86] font-medium leading-relaxed max-w-xl mx-auto">
          نحن هنا لنحول أحلام سفرك إلى واقع. تواصل معنا وسنعتني
          بكل التفاصيل من البداية حتى النهاية.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-3"
        >
          <GoldenTicketForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <InfoCard />
        </motion.div>
      </div>
    </div>
  );
}