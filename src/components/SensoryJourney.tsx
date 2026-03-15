import { useRef, useState, useCallback, useEffect, useMemo, memo } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValueEvent,
    AnimatePresence,
} from "framer-motion";
import { Volume2, VolumeX, Headphones } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */
interface SensoryMoment {
    id: number;
    video: string;
    label: string;
    labelEn: string;
    size: number;
    x: string;
    y: string;
    rotate: number;
    accent: string;
    depth: number;
}

/* ═══════════════════════════════════════════════════════════
   DATA — 5 bubbles (lean & performant)
   ═══════════════════════════════════════════════════════════ */
const sensoryMoments: SensoryMoment[] = [
    {
        id: 1,
        video: "/desktop-video.webm",
        label: "ضحكة في شوارع باريس",
        labelEn: "Parisian Laughter",
        size: 18,
        x: "4%", y: "18%",
        rotate: -4, accent: "#FFAC4B", depth: 1,
    },
    {
        id: 2,
        video: "/desktop-video3.webm",
        label: "همسات الغابة",
        labelEn: "Forest Whisper",
        size: 22,
        x: "24%", y: "45%",
        rotate: 3, accent: "#74B49B", depth: 0,
    },
    {
        id: 3,
        video: "/Website_Launch_Animation_Creation.mp4",
        label: "غروب البوسفور الذهبي",
        labelEn: "Bosphorus Sunset",
        size: 28,
        x: "48%", y: "20%",
        rotate: -2, accent: "#FFAC4B", depth: 0,
    },
    {
        id: 4,
        video: "/desktop-video2.0.webm",
        label: "عبق أسواق إسطنبول",
        labelEn: "Istanbul Bazaar",
        size: 16,
        x: "72%", y: "55%",
        rotate: 4, accent: "#74B49B", depth: 1,
    },
    {
        id: 5,
        video: "/mobile-video.webm",
        label: "أمسية على البحر",
        labelEn: "Seaside Evening",
        size: 20,
        x: "88%", y: "12%",
        rotate: -3, accent: "#579E84", depth: 2,
    },
];

/* ═══════════════════════════════════════════════════════════
   SENSORY BUBBLE — Lightweight Video Portal
   ═══════════════════════════════════════════════════════════ */
const SensoryBubble = memo(
    ({ item, index }: { item: SensoryMoment; index: number }) => {
        const videoRef = useRef<HTMLVideoElement>(null);
        const [isHovered, setIsHovered] = useState(false);
        const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);

        useEffect(() => {
            const video = videoRef.current;
            if (!video) return;
            video.muted = true;
            video.play().catch(() => { });
        }, []);

        const fadeAudioIn = useCallback(() => {
            const video = videoRef.current;
            if (!video) return;
            video.muted = false;
            video.volume = 0;
            video.play().catch(() => { });
            let vol = 0;
            if (fadeRef.current) clearInterval(fadeRef.current);
            fadeRef.current = setInterval(() => {
                vol = Math.min(vol + 0.05, 0.4);
                video.volume = vol;
                if (vol >= 0.4 && fadeRef.current) clearInterval(fadeRef.current);
            }, 30);
        }, []);

        const fadeAudioOut = useCallback(() => {
            const video = videoRef.current;
            if (!video) return;
            let vol = video.volume;
            if (fadeRef.current) clearInterval(fadeRef.current);
            fadeRef.current = setInterval(() => {
                vol = Math.max(vol - 0.05, 0);
                video.volume = vol;
                if (vol <= 0) {
                    video.muted = true;
                    if (fadeRef.current) clearInterval(fadeRef.current);
                }
            }, 30);
        }, []);

        const handleEnter = useCallback(() => {
            setIsHovered(true);
            fadeAudioIn();
        }, [fadeAudioIn]);

        const handleLeave = useCallback(() => {
            setIsHovered(false);
            fadeAudioOut();
        }, [fadeAudioOut]);

        const depthScale = item.depth === 0 ? 1 : item.depth === 1 ? 0.88 : 0.72;
        const depthOpacity = item.depth === 0 ? 1 : item.depth === 1 ? 0.85 : 0.65;

        const floatDur = 5 + (index * 0.7) % 3;
        const floatAmp = 8 + (index % 3) * 4;
        const floatDelay = index * 0.4;

        return (
            <motion.div
                className="absolute min-w-[100px] min-h-[100px] sm:min-w-[140px] sm:min-h-[140px] md:min-w-0 md:min-h-0"
                style={{
                    left: item.x,
                    top: item.y,
                    width: `${item.size}vw`,
                    height: `${item.size}vw`,
                    scale: depthScale,
                    opacity: depthOpacity,
                    zIndex: 2 - item.depth,
                }}
                animate={{ y: [0, -floatAmp, 0] }}
                transition={{
                    duration: floatDur,
                    repeat: Infinity,
                    ease: [0.45, 0.05, 0.55, 0.95],
                    delay: floatDelay,
                }}
            >
                <motion.div
                    data-listen="true"
                    className="relative w-full h-full rounded-full overflow-hidden cursor-none"
                    style={{ rotate: item.rotate }}
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                >
                    <video
                        ref={videoRef}
                        src={item.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full rounded-full object-cover transition-all"
                        style={{
                            filter: isHovered ? "blur(0px)" : "blur(12px)",
                            transition: "filter 0.6s ease-in-out",
                            willChange: "filter"
                        }}
                    />

                    <div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                            background: "linear-gradient(135deg, rgba(26,46,53,0.45) 0%, rgba(26,46,53,0.1) 60%, transparent 100%)",
                            opacity: isHovered ? 0 : 1,
                            transition: "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                    />

                    <div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                            boxShadow: isHovered
                                ? `0 0 0 3px ${item.accent}, 0 0 30px ${item.accent}60, 0 0 60px ${item.accent}25`
                                : `0 0 0 1px rgba(255,255,255,0.08), 0 0 0 transparent`,
                            transition: "box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                    />

                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 8 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 8 }}
                                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-lg z-30 flex items-center gap-1.5"
                            >
                                <Volume2 size={12} className="text-white" />
                                <span className="text-white text-[10px] font-bold tracking-wider uppercase">
                                    Live
                                </span>
                                <motion.div
                                    className="w-1.5 h-1.5 rounded-full bg-red-500"
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!isHovered && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 opacity-35">
                            <VolumeX size={14} className="text-white" />
                        </div>
                    )}

                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 16 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute top-3 left-1/2 -translate-x-1/2 bg-navy/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 z-20 text-center whitespace-nowrap pointer-events-none"
                            >
                                <p className="text-white font-black text-xs leading-tight">
                                    {item.label}
                                </p>
                                <p className="text-white/50 text-[9px] font-bold tracking-[0.2em] uppercase mt-0.5">
                                    {item.labelEn}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        );
    }
);

SensoryBubble.displayName = "SensoryBubble";

/* ═══════════════════════════════════════════════════════════
   LIGHTWEIGHT DECORATIVE PARTICLES
   ═══════════════════════════════════════════════════════════ */
function FloatingParticles() {
    const particles = useMemo(
        () =>
            [...Array(8)].map((_, i) => ({
                id: i,
                size: 3 + Math.random() * 5,
                top: `${10 + Math.random() * 80}%`,
                left: `${5 + Math.random() * 90}%`,
                color: i % 2 === 0 ? "rgba(116,180,155,0.4)" : "rgba(255,172,75,0.3)",
                duration: 5 + Math.random() * 5,
                yRange: -(15 + Math.random() * 25),
            })),
        []
    );

    return (
        <>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: p.size,
                        height: p.size,
                        top: p.top,
                        left: p.left,
                        backgroundColor: p.color,
                    }}
                    animate={{
                        y: [0, p.yRange, 0],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </>
    );
}

/* ═══════════════════════════════════════════════════════════
   SINGLE DECORATIVE SVG PATH
   ═══════════════════════════════════════════════════════════ */
function ScrollPath({ progress }: { progress: number }) {
    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            preserveAspectRatio="none"
            viewBox="0 0 2000 800"
        >
            <path
                d="M0,400 C300,200 600,600 1000,350 C1400,100 1700,400 2000,350"
                stroke="#74B49B"
                strokeWidth="1.2"
                strokeOpacity="0.15"
                fill="none"
                strokeDasharray="6 14"
                style={{ strokeDashoffset: -progress * 200 }}
            />
        </svg>
    );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT — SensoryJourney
   ═══════════════════════════════════════════════════════════ */
export default function SensoryJourney() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.5,
        stiffness: 80,
        damping: 20,
        restDelta: 0.001,
    });

    // ── هنا يتم تحريك الشاشة لليسار بناءً على النزول ──
    const x = useTransform(smoothProgress, [0, 1], ["0%", "-60%"]);
    const watermarkX = useTransform(smoothProgress, [0, 1], ["8%", "-20%"]);
    const watermarkOpacity = useTransform(
        scrollYProgress,
        [0, 0.15, 0.7, 1],
        [0, 0.03, 0.03, 0]
    );
    const headingX = useTransform(smoothProgress, [0, 1], ["0%", "-6%"]);

    useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

    return (
        <section
            ref={containerRef}
            id="sensory"
            dir="ltr"
            className="relative h-[300vh]"
        >
            {/* ── حل المشكلة القاطع: استخدام style={{ position: 'sticky', top: 0 }} ── */}
            <div
                className="w-full overflow-hidden sticky top-0 h-[100dvh]"
            >
                {/* Watermark */}
                <motion.div
                    className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap select-none pointer-events-none z-0"
                    style={{ x: watermarkX, opacity: watermarkOpacity }}
                >
                    <span className="text-[18vw] font-black text-navy tracking-tighter leading-none">
                        VOICES OF DARB
                    </span>
                </motion.div>

                {/* ── Horizontal track ── */}
                <motion.div
                    style={{ x }}
                    className="absolute top-0 left-0 flex items-center w-[320vw] md:w-[250vw] h-full"
                >
                    {/* ── INTRO PANEL (100vw) ── */}
                    <motion.div
                        style={{ x: headingX }}
                        className="shrink-0 flex flex-col justify-center relative z-10 w-[100vw] px-[5vw]"
                        dir="rtl"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="w-10 h-10 rounded-full bg-orange-accent/10 border border-orange-accent/20 flex items-center justify-center">
                                <Headphones size={16} className="text-orange-accent" />
                            </div>
                            <span
                                dir="ltr"
                                className="text-en text-[11px] font-bold tracking-[0.35em] text-orange-accent uppercase"
                            >
                                Sensory Journey
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="text-3xl md:text-5xl lg:text-7xl font-black text-navy leading-[1.15] mb-6"
                        >
                            أصوات{" "}
                            <span className="text-orange-accent">من خلف</span>
                            <br />
                            الشاشة
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="text-[#3A5A68]/60 text-base md:text-lg max-w-md font-medium leading-relaxed mb-8"
                        >
                            مرر الماوس فوق اللحظات لتسمع ضحكاتهم، أنفاس
                            الطبيعة، وصوت المغامرة الحقيقي.
                            <br />
                            <span className="text-[#3A5A68]/40 text-sm mt-2 block">
                                كل فقاعة هي بوابة حسية لعالم جديد.
                            </span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35 }}
                            className="flex items-center gap-4"
                        >
                            <div className="relative w-16 h-[3px] rounded-full bg-navy/8 overflow-hidden">
                                <div
                                    className="absolute inset-y-0 right-0 rounded-full"
                                    style={{
                                        width: `${progress * 100}%`,
                                        background: "linear-gradient(to left, #74B49B, #FFAC4B)",
                                    }}
                                />
                            </div>
                            <span className="text-en text-[10px] font-bold text-navy/25 tracking-[0.2em] uppercase">
                                Scroll to explore
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* ── BUBBLE FIELD (150vw) ── */}
                    <div
                        className="relative shrink-0 w-[220vw] md:w-[150vw] h-full"
                    >
                        <ScrollPath progress={progress} />
                        <FloatingParticles />

                        {sensoryMoments.map((item, index) => (
                            <SensoryBubble key={item.id} item={item} index={index} />
                        ))}
                    </div>
                </motion.div>

                {/* ── Bottom progress bar ── */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2">
                    <div className="w-28 h-[2px] rounded-full bg-navy/8 overflow-hidden">
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: `${progress * 100}%`,
                                background: "linear-gradient(to right, #74B49B, #FFAC4B)",
                            }}
                        />
                    </div>
                    <span className="text-en text-[9px] font-bold text-navy/20 tracking-[0.15em]">
                        {Math.round(progress * 100)}%
                    </span>
                </div>
            </div>
        </section>
    );
}