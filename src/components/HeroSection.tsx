import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* ──────────────────────────────────────────────────
   ANIMATION VARIANTS
   ────────────────────────────────────────────────── */
const fadeUp = {
    hidden: { y: 40, opacity: 0 },
    visible: (delay: number) => ({
        y: 0,
        opacity: 1,
        transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
    }),
};

// أيقونة البوصلة الجديدة لزر "صمم رحلتك"
function CompassIcon() {
    return (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
    );
}

export default function HeroSection() {
    return (
        <section id="home" className="relative min-h-screen font-cairo overflow-hidden" dir="rtl">

            {/* ═══════════════════════════════════════════
                1. خلفية اللابتوب
                ═══════════════════════════════════════════ */}
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/Screenshot 2026-03-11 011618.png"
                className="absolute inset-0 w-full h-full object-cover hidden md:block"
            >
                <source src="/desktop-video3.webm" type="video/webm" />
            </video>

            {/* ═══════════════════════════════════════════
                2. خلفية الموبايل
                ═══════════════════════════════════════════ */}
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/Screenshot 2026-03-11 040022.png"
                className="absolute inset-0 w-full h-full object-cover block md:hidden"
            >
                <source src="/mobile-video.webm" type="video/webm" />
            </video>

            {/* ═══════════════════════════════════════════
                3. محتوى النصوص والأزرار (تصميم ممركز ومريح)
                ═══════════════════════════════════════════ */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center mt-[-5vh] container mx-auto">

                <div className="max-w-[800px] flex flex-col items-center">

                    {/* Subtitle */}
                    <motion.p
                        dir="ltr"
                        className="text-en text-xs md:text-sm font-bold tracking-[0.3em] text-[#D1EBE0] mb-5 uppercase drop-shadow-md"
                        variants={fadeUp} custom={0.3} initial="hidden" animate="visible"
                    >
                        Explore The Extraordinary
                    </motion.p>

                    {/* Title */}
                    <motion.h1
                        className="text-5xl md:text-6xl lg:text-[4.5rem] font-black text-white mb-6 leading-[1.2] drop-shadow-xl"
                        variants={fadeUp} custom={0.5} initial="hidden" animate="visible"
                    >
                        عالم من الجمال بانتظارك
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed font-semibold max-w-2xl drop-shadow-lg"
                        variants={fadeUp} custom={0.7} initial="hidden" animate="visible"
                    >
                        نصحبك في رحلات فاخرة ومصممة خصيصاً لتمنحك ذكريات لا تُنسى في أجمل بقاع الأرض. دعنا نخطط لمغامرتك القادمة.
                    </motion.p>

                    {/* Buttons - أزرار جديدة بقيمة تفاعلية عالية */}
                    <motion.div
                        className="flex flex-wrap items-center justify-center gap-4"
                        variants={fadeUp} custom={0.9} initial="hidden" animate="visible" dir="ltr"
                    >
                        {/* الزر الأساسي: الوجهات الجاهزة */}
                        <Link to="/trips" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-l from-[#74B49B] to-[#579E84] text-white text-base font-bold rounded-full shadow-[0_6px_24px_rgba(116,180,155,0.4)] transition-all hover:scale-105 hover:shadow-[0_8px_32px_rgba(116,180,155,0.6)]">
                            <span dir="rtl">اكتشف الوجهات</span>
                            <svg className="w-5 h-5 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </Link>

                        {/* الزر الثانوي: الرحلات المخصصة (بديل شاهد الفيديو) */}
                        <Link to="/#golden-ticket" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white text-base font-bold rounded-full border border-white/20 shadow-lg transition-all hover:bg-white/20 hover:scale-105">
                            <CompassIcon />
                            <span dir="rtl" className="text-white">صمم رحلتك</span>
                        </Link>
                    </motion.div>
                </div>
            </div>

        </section>
    );
}