import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  User,
  MapPin,
  Calendar,
  Users,
  Mail,
  Phone,
  CheckCircle2,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */
interface FormData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  date: string;
  guests: string;
}

const INITIAL: FormData = {
  name: "",
  email: "",
  phone: "",
  destination: "",
  date: "",
  guests: "",
};

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════ */
const STATIC = {
  flightClass: "VIP FIRST",
  flightNo: "DRB-882",
  gate: "G-01",
  seat: "01A",
  airline: "DARB Airways",
};

const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
};

/* ═══════════════════════════════════════════════════════════
   GOLD DUST PARTICLES — Floating ambient particles
   ═══════════════════════════════════════════════════════════ */
function GoldDustParticles() {
  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1.5 + Math.random() * 3,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 8,
    opacity: 0.15 + Math.random() * 0.35,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(212,175,55,${p.opacity}), rgba(255,215,0,${p.opacity * 0.5}))`,
            boxShadow: `0 0 ${p.size * 2}px rgba(212,175,55,${p.opacity * 0.4})`,
          }}
          animate={{
            y: [0, -30, -10, -40, 0],
            x: [0, 10, -5, 8, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.6, p.opacity * 1.2, p.opacity],
            scale: [1, 1.3, 0.8, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DECORATIVE GOLD LINES — Top header arabesques
   ═══════════════════════════════════════════════════════════ */
function GoldHeaderDecoration() {
  return (
    <div className="flex items-center justify-center gap-4 md:gap-6 mb-3">
      {/* Left decorative line group */}
      <div className="flex items-center gap-1.5">
        <div
          className="h-px w-6 md:w-12"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5))",
          }}
        />
        <div
          className="w-1.5 h-1.5 rotate-45"
          style={{ background: "rgba(212,175,55,0.6)" }}
        />
        <div
          className="h-[1.5px] w-10 md:w-20"
          style={{
            background: "linear-gradient(90deg, rgba(212,175,55,0.7), rgba(212,175,55,0.3))",
          }}
        />
        <div
          className="w-2 h-2 rotate-45 border"
          style={{ borderColor: "rgba(212,175,55,0.5)" }}
        />
      </div>

      {/* Center diamond ornament */}
      <div className="relative flex items-center justify-center">
        <div
          className="w-3 h-3 rotate-45"
          style={{
            background: "linear-gradient(135deg, #D4AF37, #F5D76E)",
            boxShadow: "0 0 12px rgba(212,175,55,0.4)",
          }}
        />
        <div
          className="absolute w-5 h-5 rotate-45 border"
          style={{ borderColor: "rgba(212,175,55,0.25)" }}
        />
      </div>

      {/* Right decorative line group */}
      <div className="flex items-center gap-1.5">
        <div
          className="w-2 h-2 rotate-45 border"
          style={{ borderColor: "rgba(212,175,55,0.5)" }}
        />
        <div
          className="h-[1.5px] w-10 md:w-20"
          style={{
            background: "linear-gradient(90deg, rgba(212,175,55,0.3), rgba(212,175,55,0.7))",
          }}
        />
        <div
          className="w-1.5 h-1.5 rotate-45"
          style={{ background: "rgba(212,175,55,0.6)" }}
        />
        <div
          className="h-[1px] w-6 md:w-12"
          style={{
            background: "linear-gradient(90deg, rgba(212,175,55,0.5), transparent)",
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BARCODE — CSS-only realistic barcode
   ═══════════════════════════════════════════════════════════ */
function FakeBarcode() {
  const bars = [
    2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 1, 3, 1, 2,
    1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 1, 2, 1, 3,
    1, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1,
  ];
  return (
    <div className="flex items-end justify-center gap-[1px] h-10 opacity-60">
      {bars.map((w, i) => (
        <div
          key={i}
          style={{
            width: w,
            height: `${60 + ((i * 7) % 40)}%`,
            background: "rgba(80,50,0,0.75)",
            borderRadius: 0.5,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   TICKET NOTCH — Semi-circle cutouts
   ═══════════════════════════════════════════════════════════ */
function TicketNotch({ side }: { side: "left" | "right" }) {
  const pos = side === "left" ? { left: -14 } : { right: -14 };
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 w-7 h-7 rounded-full z-10"
      style={{
        ...pos,
        background: "#FAFAF5",
        boxShadow: side === "left"
          ? "inset -3px 0 6px rgba(212,175,55,0.1)"
          : "inset 3px 0 6px rgba(212,175,55,0.1)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   GOLDEN TICKET — Luxurious embossed boarding pass
   ═══════════════════════════════════════════════════════════ */
function GoldenTicket({ data }: { data: FormData }) {
  return (
    <motion.div
      layout
      whileHover={{
        scale: 1.02,
        boxShadow: "0px 25px 80px -15px rgba(180,140,40,0.45)",
      }}
      transition={springTransition}
      className="relative w-full max-w-md mx-auto rounded-3xl overflow-visible select-none"
      style={{
        background:
          "linear-gradient(145deg, #f5d76e 0%, #f0c040 25%, #e8a820 50%, #f0c040 75%, #f5d76e 100%)",
        boxShadow:
          "0px 15px 60px -10px rgba(180,140,40,0.35), 0px 3px 12px -3px rgba(180,140,40,0.2)",
      }}
    >
      {/* Notches */}
      <TicketNotch side="left" />
      <TicketNotch side="right" />

      {/* ── Decorative gold pattern overlay ── */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(120,80,0,1) 8px, rgba(120,80,0,1) 9px),
            repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(120,80,0,1) 8px, rgba(120,80,0,1) 9px)
          `,
        }}
      />

      {/* ── Decorative top metallic strip ── */}
      <div
        className="h-11 rounded-t-3xl flex items-center justify-between px-4 md:px-6"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05), rgba(255,255,255,0.3))",
          borderBottom: "1px dashed rgba(120,80,0,0.2)",
        }}
      >
        <span className="text-en text-[10px] font-black tracking-[0.35em] text-amber-900/70 uppercase">
          {STATIC.airline}
        </span>
        <Plane size={16} className="text-amber-900/50 -rotate-45" />
      </div>

      {/* ── Main ticket body ── */}
      <div className="px-4 md:px-6 pt-4 md:pt-5 pb-4" dir="rtl">
        {/* PASSENGER NAME */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <p className="text-en text-[9px] font-black text-amber-900/50 uppercase tracking-[0.2em] mb-1">
              PASSENGER NAME
            </p>
            <p className="text-[10px] font-bold text-amber-900/40 mb-0.5">
              اسم المسافر
            </p>
            <p className="text-lg font-black text-amber-950 truncate leading-tight">
              {data.name || (
                <span className="text-amber-800/30 italic">اسم المسافر...</span>
              )}
            </p>
          </div>
          <div
            className="shrink-0 px-3 py-1.5 rounded-full text-en text-[9px] font-black text-amber-950 tracking-[0.15em] mr-3"
            style={{
              background: "rgba(255,255,255,0.35)",
              border: "1px solid rgba(120,80,0,0.1)",
            }}
          >
            CLASS: {STATIC.flightClass}
          </div>
        </div>

        {/* DESTINATION + DATE */}
        <div className="flex gap-6 mb-4">
          <div className="flex-1 min-w-0">
            <p className="text-en text-[9px] font-black text-amber-900/50 uppercase tracking-[0.2em] mb-0.5 flex items-center gap-1">
              <MapPin size={9} /> DESTINATION
            </p>
            <p className="text-[10px] font-bold text-amber-900/40 mb-0.5">
              وجهة الحلم
            </p>
            <p className="text-base font-bold text-amber-950 truncate">
              {data.destination || (
                <span className="text-amber-800/30 italic">وجهة الحلم...</span>
              )}
            </p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-en text-[9px] font-black text-amber-900/50 uppercase tracking-[0.2em] mb-0.5 flex items-center gap-1">
              <Calendar size={9} /> DATE
            </p>
            <p className="text-[10px] font-bold text-amber-900/40 mb-0.5">
              تاريخ الرحلة
            </p>
            <p className="text-base font-bold text-amber-950 text-en" dir="ltr">
              {data.date || (
                <span className="text-amber-800/30 italic font-cairo" dir="rtl">
                  XX/XX/XXXX
                </span>
              )}
            </p>
          </div>
        </div>

        {/* FLIGHT NO / GATE / SEAT strip */}
        <div
          className="flex items-center justify-between rounded-xl px-4 py-3 mb-4"
          style={{
            background: "rgba(255,255,255,0.22)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {[
            { label: "FLIGHT NO", value: STATIC.flightNo },
            { label: "GATE", value: STATIC.gate },
            { label: "SEAT", value: STATIC.seat },
          ].map((item) => (
            <div key={item.label} className="text-center flex-1">
              <p className="text-en text-[7px] font-bold text-amber-900/50 tracking-[0.2em] uppercase">
                {item.label}
              </p>
              <p className="text-en text-sm font-black text-amber-950 mt-0.5">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dashed tear line + barcode ── */}
      <div
        className="px-4 md:px-6 pt-3 pb-5 rounded-b-3xl"
        style={{
          borderTop: "2px dashed rgba(120,80,0,0.15)",
          background: "rgba(255,255,255,0.08)",
        }}
      >
        <FakeBarcode />
        <p
          dir="ltr"
          className="text-en text-center text-[8px] font-bold text-amber-900/40 tracking-[0.3em] mt-2 uppercase"
        >
          DARB • Golden boarding pass • {new Date().getFullYear()}
        </p>
      </div>

      {/* ── Shimmer overlay ── */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{
          background: [
            "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.0) 50%, transparent 70%)",
            "linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.18) 50%, transparent 80%)",
            "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.0) 50%, transparent 70%)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FORM FIELD — Pearl-white premium input style
   ═══════════════════════════════════════════════════════════ */
function FormField({
  icon: Icon,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  dir = "rtl",
}: {
  icon: typeof User;
  label: string;
  name: keyof FormData;
  type?: string;
  value: string;
  onChange: (name: keyof FormData, value: string) => void;
  placeholder: string;
  dir?: string;
}) {
  return (
    <div className="group relative">
      <label
        className="block text-xs font-bold mb-2 tracking-wide"
        style={{ color: "rgba(26,46,53,0.5)" }}
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          size={16}
          className="absolute top-1/2 -translate-y-1/2 transition-colors duration-300"
          style={
            dir === "rtl"
              ? { right: 14, color: "rgba(212,175,55,0.4)" }
              : { left: 14, color: "rgba(212,175,55,0.4)" }
          }
        />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          dir={dir}
          className="w-full rounded-xl py-3.5 text-sm font-medium outline-none transition-all duration-300 cursor-none"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "1.5px solid rgba(212,175,55,0.15)",
            color: "#1A2E35",
            ...(dir === "rtl"
              ? { paddingRight: 42, paddingLeft: 16 }
              : { paddingLeft: 42, paddingRight: 16 }),
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(212,175,55,0.45)";
            e.target.style.boxShadow =
              "0 0 20px rgba(212,175,55,0.08), 0 4px 12px rgba(212,175,55,0.06)";
            // Update icon color
            const icon = e.target.previousElementSibling as HTMLElement;
            if (icon) icon.style.color = "rgba(212,175,55,0.8)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(212,175,55,0.15)";
            e.target.style.boxShadow = "none";
            const icon = e.target.previousElementSibling as HTMLElement;
            if (icon) icon.style.color = "rgba(212,175,55,0.4)";
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DATE PICKER UI — Integrated calendar selector
   ═══════════════════════════════════════════════════════════ */
function DatePickerField({
  value,
  onChange,
}: {
  value: string;
  onChange: (name: keyof FormData, value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => {
    const d = value ? new Date(value) : new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const daysInMonth = new Date(viewMonth.year, viewMonth.month + 1, 0).getDate();
  const firstDay = new Date(viewMonth.year, viewMonth.month, 1).getDay();
  const monthNames = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
  ];
  const dayLabels = ["أحد", "إثن", "ثلا", "أرب", "خمي", "جمع", "سبت"];

  const selectDate = (day: number) => {
    const m = String(viewMonth.month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    onChange("date", `${viewMonth.year}-${m}-${d}`);
    setIsOpen(false);
  };

  const prevMonth = () => {
    setViewMonth((v) => {
      if (v.month === 0) return { year: v.year - 1, month: 11 };
      return { ...v, month: v.month - 1 };
    });
  };

  const nextMonth = () => {
    setViewMonth((v) => {
      if (v.month === 11) return { year: v.year + 1, month: 0 };
      return { ...v, month: v.month + 1 };
    });
  };

  const formattedValue = value
    ? new Date(value).toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="group relative" ref={containerRef}>
      <label
        className="block text-xs font-bold mb-2 tracking-wide"
        style={{ color: "rgba(26,46,53,0.5)" }}
      >
        تاريخ الرحلة
      </label>
      <div className="relative">
        <Calendar
          size={16}
          className="absolute top-1/2 -translate-y-1/2 transition-colors duration-300"
          style={{ right: 14, color: "rgba(212,175,55,0.4)" }}
        />
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full rounded-xl py-3.5 text-sm font-medium cursor-none select-none transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: `1.5px solid rgba(212,175,55,${isOpen ? 0.45 : 0.15})`,
            color: value ? "#1A2E35" : "rgba(26,46,53,0.3)",
            paddingRight: 42,
            paddingLeft: 16,
            boxShadow: isOpen
              ? "0 0 20px rgba(212,175,55,0.08), 0 4px 12px rgba(212,175,55,0.06)"
              : "none",
          }}
        >
          {formattedValue || "اختر تاريخ الرحلة"}
        </div>
      </div>

      {/* Calendar dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 left-0 z-50 rounded-2xl p-4"
            style={{
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
              border: "1.5px solid rgba(212,175,55,0.2)",
              boxShadow:
                "0 20px 60px -15px rgba(26,46,53,0.12), 0 8px 24px -8px rgba(212,175,55,0.08)",
            }}
          >
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={nextMonth}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors duration-200 cursor-none"
                style={{
                  color: "#D4AF37",
                  background: "rgba(212,175,55,0.08)",
                }}
              >
                ‹
              </button>
              <span
                className="text-sm font-bold"
                style={{ color: "#1A2E35" }}
              >
                {monthNames[viewMonth.month]} {viewMonth.year}
              </span>
              <button
                onClick={prevMonth}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors duration-200 cursor-none"
                style={{
                  color: "#D4AF37",
                  background: "rgba(212,175,55,0.08)",
                }}
              >
                ›
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {dayLabels.map((d) => (
                <div
                  key={d}
                  className="text-center text-[10px] font-bold py-1"
                  style={{ color: "rgba(26,46,53,0.35)" }}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }, (_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const dateStr = `${viewMonth.year}-${String(viewMonth.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isSelected = value === dateStr;
                return (
                  <button
                    key={day}
                    onClick={() => selectDate(day)}
                    className="w-full aspect-square rounded-lg text-xs font-semibold transition-all duration-200 cursor-none flex items-center justify-center"
                    style={{
                      background: isSelected
                        ? "linear-gradient(135deg, #D4AF37, #F0C040)"
                        : "transparent",
                      color: isSelected ? "#fff" : "#1A2E35",
                      boxShadow: isSelected
                        ? "0 4px 12px rgba(212,175,55,0.3)"
                        : "none",
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   GOLDEN AIRPLANE ICON — SVG for the button
   ═══════════════════════════════════════════════════════════ */
function GoldenAirplaneIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
      style={{ transform: "rotate(-15deg)" }}
    >
      <path
        d="M21.5 3.5L10.5 14.5M21.5 3.5L15 21L10.5 14.5M21.5 3.5L3 9.5L10.5 14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 9.5L10.5 14.5L15 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
      {/* Wing detail */}
      <path
        d="M14 8L18 4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
      />
      <circle cx="21.5" cy="3.5" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN SECTION — GoldenTicketSection
   ═══════════════════════════════════════════════════════════ */
export default function GoldenTicketSection() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = useCallback((name: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.name || !form.destination) return;
      setIsSubmitted(true);
    },
    [form.name, form.destination]
  );

  return (
    <section
      id="golden-ticket"
      dir="rtl"
      className="relative py-16 md:py-36 px-4 sm:px-6 lg:px-8 font-cairo overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FAFAF5 0%, #FBF9F3 30%, #F8F5EE 60%, #FAFAF5 100%)",
      }}
    >
      {/* ── Ambient gold glow blobs ── */}
      <div
        className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full opacity-[0.06] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.6), transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.5), transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* ── Gold dust particles ── */}
      <GoldDustParticles />

      {/* ── Subtle gold border lines at top and bottom ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), rgba(212,175,55,0.35), rgba(212,175,55,0.2), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), rgba(212,175,55,0.35), rgba(212,175,55,0.2), transparent)",
        }}
      />

      {/* ── Header with gold decorations ── */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GoldHeaderDecoration />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-2xl md:text-4xl lg:text-[2.8rem] font-black mb-5 leading-[1.6]"
          style={{ color: "#1A2E35" }}
        >
          صغ رحلتك، ونحن نصنع{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #D4AF37, #B8860B, #D4AF37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            الذكريات
          </span>
          .
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GoldHeaderDecoration />
        </motion.div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">
        {/* ──── LEFT COLUMN (in RTL = visually right): Golden Ticket ──── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center justify-center lg:sticky lg:top-32"
        >
          <GoldenTicket data={form} />
        </motion.div>

        {/* ──── RIGHT COLUMN (in RTL = visually left): Form ──── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.4 } }}
                className="rounded-3xl p-5 md:p-9"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(16px)",
                  border: "1.5px solid rgba(212,175,55,0.12)",
                  boxShadow:
                    "0 16px 64px -16px rgba(26,46,53,0.06), 0 4px 16px -4px rgba(212,175,55,0.04)",
                }}
              >
                <div className="space-y-5">
                  {/* Row 1: Name */}
                  <FormField
                    icon={User}
                    label="الاسم الكامل"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="أدخل اسمك الكامل"
                  />

                  {/* Row 2: Email */}
                  <FormField
                    icon={Mail}
                    label="البريد الإلكتروني"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    dir="ltr"
                  />

                  {/* Row 3: Phone */}
                  <FormField
                    icon={Phone}
                    label="رقم الهاتف"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+966 5XX XXX XXXX"
                    dir="ltr"
                  />

                  {/* Row 4: Destination */}
                  <FormField
                    icon={MapPin}
                    label="الوجهة المطلوبة"
                    name="destination"
                    value={form.destination}
                    onChange={handleChange}
                    placeholder="مثال: جزر المالديف"
                  />

                  {/* Row 5: Guests */}
                  <FormField
                    icon={Users}
                    label="عدد المسافرين"
                    name="guests"
                    type="number"
                    value={form.guests}
                    onChange={handleChange}
                    placeholder="مثال: 2"
                    dir="ltr"
                  />

                  {/* Row 6: Date Picker */}
                  <DatePickerField value={form.date} onChange={handleChange} />
                </div>

                {/* ── Single golden CTA button ── */}
                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.02,
                    y: -3,
                    boxShadow:
                      "0 20px 60px -10px rgba(212,175,55,0.45), 0 8px 24px -6px rgba(180,140,40,0.3), inset 0 1px 0 rgba(255,255,255,0.4)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={springTransition}
                  className="w-full mt-8 py-5 rounded-2xl text-lg font-black tracking-wide cursor-none relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #F5D76E 0%, #D4AF37 30%, #B8860B 60%, #D4AF37 80%, #F5D76E 100%)",
                    color: "#1A2E35",
                    boxShadow:
                      "0 12px 40px -8px rgba(212,175,55,0.4), 0 4px 16px -4px rgba(180,140,40,0.25), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 4px rgba(120,80,0,0.15)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    textShadow: "0 1px 2px rgba(120,80,0,0.15)",
                  }}
                >
                  {/* Embossed pattern overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(120,80,0,1) 4px, rgba(120,80,0,1) 5px)",
                    }}
                  />

                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{
                      background: [
                        "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0) 50%, transparent 60%)",
                        "linear-gradient(105deg, transparent 10%, rgba(255,255,255,0.25) 50%, transparent 90%)",
                        "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0) 50%, transparent 60%)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <GoldenAirplaneIcon />
                    تأكيد رحلة العمر
                  </span>
                </motion.button>

                <p
                  className="text-center text-[11px] mt-4 font-medium"
                  style={{ color: "rgba(26,46,53,0.25)" }}
                >
                  بياناتك آمنة تماماً — لن نشاركها مع أي طرف ثالث.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center py-16 px-8 rounded-3xl"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(16px)",
                  border: "1.5px solid rgba(212,175,55,0.12)",
                  boxShadow:
                    "0 16px 64px -16px rgba(26,46,53,0.06)",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: 0.2,
                  }}
                  className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))",
                    border: "2px solid rgba(212,175,55,0.3)",
                  }}
                >
                  <CheckCircle2
                    size={40}
                    style={{ color: "#D4AF37" }}
                    strokeWidth={1.5}
                  />
                </motion.div>

                <h3
                  className="text-2xl md:text-3xl font-black mb-4"
                  style={{ color: "#1A2E35" }}
                >
                  تم تجهيز رحلتك{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, #D4AF37, #B8860B)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    الذهبية
                  </span>
                </h3>
                <p
                  className="text-sm md:text-base font-medium leading-relaxed max-w-sm mx-auto mb-8"
                  style={{ color: "rgba(26,46,53,0.45)" }}
                >
                  سنتواصل معك قريباً لتفصيل رحلتك وإتمام كل التفاصيل.
                  <br />
                  استعد لتجربة لا مثيل لها.
                </p>

                <motion.button
                  onClick={() => {
                    setIsSubmitted(false);
                    setForm(INITIAL);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm font-bold transition-colors duration-300 cursor-none"
                  style={{ color: "rgba(212,175,55,0.6)" }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#D4AF37")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(212,175,55,0.6)")
                  }
                >
                  حجز رحلة جديدة ←
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
