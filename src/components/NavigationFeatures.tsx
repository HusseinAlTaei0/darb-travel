import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Headphones, Compass, ShieldCheck, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   TYPES & CONSTANTS
   ═══════════════════════════════════════════════════════════ */
type Direction = "N" | "E" | "S" | "W";

interface Feature {
    direction: Direction;
    icon: LucideIcon;
    title: string;
    titleEn: string;
    description: string;
    detail: string;
    needleAngle: number;
}

const FEATURES: Feature[] = [
    {
        direction: "N",
        icon: Sparkles,
        title: "وصول حصري",
        titleEn: "Exclusive Access",
        description: "تجارب محجوزة للنُّخبة فقط",
        detail:
            "نفتح لك أبواباً مغلقة ووجهات لا يراها السائح العادي. جزر خاصة، فنادق سرية، وتجارب حصرية صُمّمت لمن يبحث عن الاستثنائي. عالمك الجديد يبدأ من هنا.",
        needleAngle: 0,
    },
    {
        direction: "E",
        icon: Compass,
        title: "رحلات مفصّلة",
        titleEn: "Bespoke Itineraries",
        description: "كل رحلة قطعة فنية فريدة",
        detail:
            "كل رحلة تُصمم كقطعة فنية فريدة تناسب ذوقك وشغفك. لا قوالب جاهزة، لا مسارات مكررة. نستمع لأحلامك ونحولها إلى واقع لا يُنسى.",
        needleAngle: 90,
    },
    {
        direction: "S",
        icon: ShieldCheck,
        title: "راحة بال مطلقة",
        titleEn: "Peace of Mind",
        description: "سفر بلا قلق",
        detail:
            "نهتم بأدق التفاصيل من لحظة خروجك من المنزل حتى عودتك. تأمين شامل، دعم لوجستي، وخطط بديلة لكل سيناريو. سافر واترك القلق لنا.",
        needleAngle: 180,
    },
    {
        direction: "W",
        icon: Headphones,
        title: "كونسيرج 24/7",
        titleEn: "24/7 Concierge",
        description: "خدمة لا تنام",
        detail:
            "فريق كامل تحت تصرفك في أي وقت وأي مكان حول العالم. حجوزات اللحظة الأخيرة، تعديلات مفاجئة، أو مجرد توصية لمطعم مميز — نحن هنا دائماً.",
        needleAngle: 270,
    },
];

/*
 * RTL-aware compass shift on click.
 * Compass moves OPPOSITE to the clicked direction using viewport units
 * to guarantee no overlap with the Info Card.
 *
 * East clicked → compass LEFT  (x: "-35vw"), card appears RIGHT
 * West clicked → compass RIGHT (x: "35vw"),  card appears LEFT
 * North clicked → compass DOWN (y: "30vh"),   card appears TOP-CENTER
 * South clicked → compass UP   (y: "-30vh"),  card appears BOTTOM-CENTER
 */
const COMPASS_SHIFT: Record<Direction, { x: string; y: string }> = {
    N: { x: "0px", y: "40vh" },
    S: { x: "0px", y: "-40vh" },
    E: { x: "-35vw", y: "0px" },
    W: { x: "35vw", y: "0px" },
};

const springTransition = {
    type: "spring" as const,
    stiffness: 200,
    damping: 22,
    mass: 0.8,
};

/* ═══════════════════════════════════════════════════════════
   COMPASS NEEDLE
   ═══════════════════════════════════════════════════════════ */
function CompassNeedle({ angle }: { angle: number }) {
    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            animate={{ rotate: angle }}
            transition={springTransition}
        >
            {/* Top half — Mint */}
            <div
                className="absolute flex flex-col items-center"
                style={{ top: "10%", bottom: "50%" }}
            >
                <div
                    className="w-[3.5px] h-full rounded-full"
                    style={{
                        background: "linear-gradient(to top, rgba(116,180,155,0.2), #74B49B, #A7D7C5)",
                        boxShadow: "0 0 14px rgba(116,180,155,0.5), 0 0 5px rgba(116,180,155,0.8)",
                    }}
                />
                <div
                    className="absolute -top-1"
                    style={{
                        width: 0,
                        height: 0,
                        borderLeft: "7px solid transparent",
                        borderRight: "7px solid transparent",
                        borderBottom: "18px solid #74B49B",
                        filter: "drop-shadow(0 0 8px rgba(116,180,155,0.7))",
                    }}
                />
            </div>
            {/* Bottom half — Amber */}
            <div
                className="absolute flex flex-col items-center"
                style={{ top: "50%", bottom: "16%" }}
            >
                <div
                    className="w-[3px] h-full rounded-full"
                    style={{
                        background: "linear-gradient(to bottom, rgba(255,172,75,0.2), #FFAC4B)",
                        boxShadow: "0 0 10px rgba(255,172,75,0.4)",
                    }}
                />
            </div>
            {/* Pivot */}
            <div
                className="absolute w-5 h-5 rounded-full z-30"
                style={{
                    background: "radial-gradient(circle at 35% 35%, #fff, #e8e8e8, #bbb)",
                    boxShadow: "0 0 12px rgba(116,180,155,0.5), inset 0 1px 3px rgba(255,255,255,0.9)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   DIRECTION BUTTON — Strict geometry on compass ring stroke
   
   Positioning formula (on the exact ring edge):
   N: top-0    left-1/2  → translateX(-50%) translateY(-50%)
   S: bottom-0 left-1/2  → translateX(-50%) translateY(50%)
   E: top-1/2  right-0   → translateX(50%)  translateY(-50%)
   W: top-1/2  left-0    → translateX(-50%) translateY(-50%)
   ═══════════════════════════════════════════════════════════ */
function DirectionButton({
    feature,
    isActive,
    isHovered,
    onHoverStart,
    onHoverEnd,
    onClick,
}: {
    feature: Feature;
    isActive: boolean;
    isHovered: boolean;
    onHoverStart: () => void;
    onHoverEnd: () => void;
    onClick: () => void;
}) {
    const Icon = feature.icon;

    const posStyles: Record<Direction, string> = {
        N: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
        S: "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
        E: "absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
        W: "absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
    };

    return (
        <motion.button
            className={`${posStyles[feature.direction]} z-30 cursor-none flex items-center gap-2.5 px-5 py-3 rounded-full border font-cairo font-bold text-sm whitespace-nowrap`}
            style={{
                background: isActive
                    ? "rgba(116,180,155,0.25)"
                    : isHovered
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.65)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                borderColor: isActive
                    ? "#74B49B"
                    : isHovered
                        ? "rgba(116,180,155,0.5)"
                        : "rgba(255,255,255,0.5)",
                boxShadow: isHovered
                    ? "0 10px 35px -6px rgba(116,180,155,0.25)"
                    : "0 4px 20px -4px rgba(26,46,53,0.08)",
                transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            onClick={onClick}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
        >
            <Icon size={18} className="text-mint-500" strokeWidth={2} />
            <span className="text-navy">{feature.title}</span>
        </motion.button>
    );
}

/* ═══════════════════════════════════════════════════════════
   FEATURE DETAIL PANEL — Vertically centered, absolutely positioned
   
   Placement (relative to the compass arena container):
   E clicked → card: right-[8%]   top-1/2 -translate-y-1/2
   W clicked → card: left-[8%]    top-1/2 -translate-y-1/2
   N clicked → card: left-1/2 -translate-x-1/2  top-[5%]
   S clicked → card: left-1/2 -translate-x-1/2  bottom-[5%]
   ═══════════════════════════════════════════════════════════ */
function FeatureDetail({
    feature,
    onClose,
}: {
    feature: Feature;
    onClose: () => void;
}) {
    const Icon = feature.icon;

    /* Position classes based on direction */
    const posClasses: Record<Direction, string> = {
        E: "absolute top-1/2 right-[4%] md:right-[8%] -translate-y-1/2",
        W: "absolute top-1/2 left-[4%] md:left-[8%] -translate-y-1/2",
        N: "absolute top-[10vh] left-1/2 -translate-x-1/2",
        S: "absolute bottom-[10vh] left-1/2 -translate-x-1/2",
    };

    /* Motion initial offset (slides in from direction) */
    const initials: Record<Direction, { x: number; y: number }> = {
        E: { x: 80, y: 0 },
        W: { x: -80, y: 0 },
        N: { x: 0, y: -40 },
        S: { x: 0, y: 40 },
    };

    const init = initials[feature.direction];

    return (
        <motion.div
            key={feature.direction}
            initial={{ opacity: 0, x: init.x, y: init.y, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={springTransition}
            className={`${posClasses[feature.direction]} z-40 w-[90vw] sm:w-[85vw] md:w-full md:max-w-md`}
            dir="rtl"
        >
            <div
                className="relative rounded-4xl p-6 md:p-10 border"
                style={{
                    background: "rgba(255,255,255,0.78)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    borderColor: "rgba(116,180,155,0.3)",
                    boxShadow: "0 30px 70px -15px rgba(116,180,155,0.15), 0 0 0 1px rgba(255,255,255,0.3)",
                }}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-5 left-5 w-9 h-9 rounded-full flex items-center justify-center cursor-none transition-colors duration-300 hover:bg-mint-500/10"
                    style={{ border: "1px solid rgba(116,180,155,0.2)" }}
                >
                    <X size={16} className="text-muted" />
                </button>

                {/* Icon */}
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: "rgba(116,180,155,0.12)" }}
                >
                    <Icon size={32} className="text-mint-500" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-black text-navy mb-2">
                    {feature.title}
                </h3>
                <span
                    dir="ltr"
                    className="text-en text-[10px] font-bold tracking-[0.3em] uppercase text-mint-500/50 block mb-6"
                >
                    {feature.titleEn}
                </span>

                {/* Detail */}
                <p className="text-sm md:text-base text-muted leading-relaxed font-medium">
                    {feature.detail}
                </p>

                <div className="mt-8 h-1 w-20 rounded-full bg-mint-500/25" />
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════
   MAIN — NavigationFeatures
   ═══════════════════════════════════════════════════════════ */
export default function NavigationFeatures() {
    const [hoveredDirection, setHoveredDirection] = useState<Direction | null>(null);
    const [activeFeature, setActiveFeature] = useState<Direction | null>(null);

    const activeData = activeFeature
        ? FEATURES.find((f) => f.direction === activeFeature)!
        : null;

    const needleAngle = activeFeature
        ? FEATURES.find((f) => f.direction === activeFeature)!.needleAngle
        : hoveredDirection
            ? FEATURES.find((f) => f.direction === hoveredDirection)!.needleAngle
            : 0;

    const handleDirectionHover = useCallback((dir: Direction) => setHoveredDirection(dir), []);
    const handleHoverEnd = useCallback(() => setHoveredDirection(null), []);
    const handleClick = useCallback((dir: Direction) => {
        setActiveFeature((prev) => (prev === dir ? null : dir));
    }, []);
    const handleClose = useCallback(() => setActiveFeature(null), []);

    const compassAnimate = activeFeature
        ? {
            scale: 0.65,
            x: COMPASS_SHIFT[activeFeature].x,
            y: COMPASS_SHIFT[activeFeature].y,
            opacity: 0.8,
        }
        : { scale: 1, x: "0px", y: "0px", opacity: 1 };

    return (
        <section
            id="features"
            dir="rtl"
            className="relative flex flex-col items-center justify-start pt-24 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 font-cairo bg-transparent overflow-hidden min-h-dvh md:min-h-screen"
        >
            {/* ── Section Header ── */}
            <div className="relative z-10 text-center max-w-2xl mx-auto mb-10 md:mb-14">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-4 mb-5"
                >
                    <div className="h-0.5 w-10 bg-mint-500/30" />
                    <span
                        dir="ltr"
                        className="text-en text-[12px] font-bold tracking-[0.4em] text-mint-500 uppercase"
                    >
                        Why Darb
                    </span>
                    <div className="h-0.5 w-10 bg-mint-500/30" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl md:text-4xl lg:text-5xl font-black text-navy mb-4 leading-tight"
                >
                    الرفاهية،{" "}
                    <span className="text-mint-500">بتعريف جديد</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-sm md:text-base text-muted font-medium leading-relaxed max-w-lg mx-auto"
                >
                    اكتشف ميزاتنا — حرّك البوصلة واستكشف عالم درب.
                </motion.p>
            </div>

            {/* ── Compass Arena (full-width, relative container for absolute children) ── */}
            <div
                className="relative z-10 w-full flex-1 flex items-center justify-center"
                style={{ minHeight: 560 }}
            >
                {/* ── Compass Assembly ── */}
                <motion.div
                    className="relative shrink-0"
                    animate={compassAnimate}
                    transition={springTransition}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    {/*
                     * Compass circle: aspect-square + rounded-full enforces perfect circle.
                     * Responsive: 16rem → 20rem → 28rem → 32rem
                     */}
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] aspect-square rounded-full">

                        {/* ── Outer Glow ── */}
                        <div
                            className="absolute rounded-full pointer-events-none"
                            style={{
                                inset: -30,
                                background: "radial-gradient(circle, rgba(116,180,155,0.1) 0%, transparent 65%)",
                                filter: "blur(30px)",
                            }}
                        />

                        {/* ── Outer Ring ── */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: "rgba(255,255,255,0.5)",
                                backdropFilter: "blur(30px)",
                                WebkitBackdropFilter: "blur(30px)",
                                border: "1.5px solid rgba(116,180,155,0.2)",
                                boxShadow: "0 25px 70px -15px rgba(26,46,53,0.1), inset 0 1px 1px rgba(255,255,255,0.8), inset 0 -2px 6px rgba(116,180,155,0.06)",
                            }}
                        />

                        {/* ── Inner Ring ── */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                inset: "15%",
                                background: "radial-gradient(circle at 30% 30%, rgba(116,180,155,0.12), rgba(255,172,75,0.06), rgba(167,215,197,0.08), transparent 80%)",
                                border: "1px solid rgba(116,180,155,0.12)",
                                boxShadow: "inset 0 2px 10px rgba(116,180,155,0.08)",
                            }}
                        />

                        {/* ── Innermost ── */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                inset: "30%",
                                background: "radial-gradient(circle at 60% 40%, rgba(255,172,75,0.05), rgba(116,180,155,0.04), transparent 70%)",
                                border: "1px solid rgba(116,180,155,0.06)",
                            }}
                        />

                        {/* ── Cardinal Letters ── */}
                        <div className="absolute inset-0 pointer-events-none">
                            <span className="absolute text-en text-sm font-black text-mint-500 tracking-widest" style={{ top: "18%", left: "50%", transform: "translateX(-50%)" }}>N</span>
                            <span className="absolute text-en text-sm font-black text-mint-500/35 tracking-widest" style={{ bottom: "18%", left: "50%", transform: "translateX(-50%)" }}>S</span>
                            <span className="absolute text-en text-sm font-black text-mint-500/35 tracking-widest" style={{ right: "18%", top: "50%", transform: "translateY(-50%)" }}>E</span>
                            <span className="absolute text-en text-sm font-black text-mint-500/35 tracking-widest" style={{ left: "18%", top: "50%", transform: "translateY(-50%)" }}>W</span>
                        </div>

                        {/* ── Tick Marks ── */}
                        <div className="absolute inset-0 pointer-events-none">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute"
                                    style={{
                                        width: i % 3 === 0 ? 2.5 : 1.5,
                                        height: i % 3 === 0 ? 16 : 8,
                                        background: i % 3 === 0 ? "rgba(116,180,155,0.4)" : "rgba(116,180,155,0.15)",
                                        borderRadius: 2,
                                        top: "6%",
                                        left: "50%",
                                        transformOrigin: "50% 733%",
                                        transform: `translateX(-50%) rotate(${i * 30}deg)`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* ── Needle ── */}
                        <CompassNeedle angle={needleAngle} />

                        {/* ── Buttons (strict geometry on ring edge) ── */}
                        {FEATURES.map((f) => (
                            <DirectionButton
                                key={f.direction}
                                feature={f}
                                isActive={activeFeature === f.direction}
                                isHovered={hoveredDirection === f.direction}
                                onHoverStart={() => handleDirectionHover(f.direction)}
                                onHoverEnd={handleHoverEnd}
                                onClick={() => handleClick(f.direction)}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* ── Info Card (vertically centered, absolute) ── */}
                <AnimatePresence mode="wait">
                    {activeData && (
                        <FeatureDetail
                            key={activeData.direction}
                            feature={activeData}
                            onClose={handleClose}
                        />
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
