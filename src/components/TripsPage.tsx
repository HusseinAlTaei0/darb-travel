import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Clock,
  MapPin,
  Sparkles,
  Palmtree,
  Mountain,
  Heart,
  Landmark,
  ChevronLeft,
  DollarSign,
} from "lucide-react";
import { TRIPS, CATEGORIES } from "../data/trips";
import type { Trip, Category } from "../data/trips";
import type { LucideIcon } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   CATEGORY ICON MAP
   ═══════════════════════════════════════════════════════════ */
const categoryIconMap: Record<string, LucideIcon> = {
  الكل: Sparkles,
  استرخاء: Palmtree,
  مغامرة: Mountain,
  "شهر العسل": Heart,
  ثقافة: Landmark,
};

/* ═══════════════════════════════════════════════════════════
   TRIP CARD
   ═══════════════════════════════════════════════════════════ */
function TripCard({ trip }: { trip: Trip }) {
  const CatIcon = categoryIconMap[trip.category] || Sparkles;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        layout: { type: "spring", stiffness: 400, damping: 30 },
        duration: 0.3,
      }}
      className="group rounded-3xl overflow-hidden cursor-none bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_-10px_rgba(26,46,53,0.07)]"
      whileHover={{
        y: -4,
        boxShadow:
          "0 20px 40px rgba(255, 172, 75, 0.12), 0 0 15px rgba(255, 172, 75, 0.08)",
      }}
    >
      <Link to={`/trips/${trip.id}`} className="block">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ backgroundImage: `url(${trip.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Price Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-navy font-black text-sm shadow-md">
            <DollarSign size={14} />
            <span>{trip.price}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-500/10 text-mint-500 border border-mint-500/10">
              <CatIcon size={14} />
              <span className="text-xs font-bold leading-none">
                {trip.category}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-muted">
              <Clock size={14} />
              <span className="text-xs font-bold">{trip.duration}</span>
            </div>
          </div>

          <h3 className="text-xl font-black text-navy mb-2 group-hover:text-mint-500 transition-colors duration-300">
            {trip.name}
          </h3>

          <p className="text-sm font-medium text-muted/80 leading-relaxed mb-6 line-clamp-2">
            {trip.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-white/40">
            <span className="text-xs font-bold text-muted flex items-center gap-1">
              <MapPin size={14} strokeWidth={2.5} />
              {trip.nameEn}
            </span>
            <span className="flex items-center gap-1 text-xs font-black text-navy group/btn">
              تفاصيل الرحلة
              <ChevronLeft
                size={16}
                className="transition-transform group-hover/btn:-translate-x-1"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN — TripsPage
   ═══════════════════════════════════════════════════════════ */
export default function TripsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("الكل");

  const filteredTrips =
    activeFilter === "الكل"
      ? TRIPS
      : TRIPS.filter((t) => t.category === activeFilter);

  return (
    <div
      dir="rtl"
      className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-cairo"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-px w-10 bg-mint-500/30" />
            <span className="text-[10px] font-black tracking-widest text-mint-500 uppercase">
              Exclusive Tours
            </span>
            <div className="h-px w-10 bg-mint-500/30" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-navy mb-4"
          >
            وجهات صُممت لتخلد في{" "}
            <span className="text-mint-500">الذاكرة</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-medium text-muted max-w-xl mx-auto"
          >
            اختر رحلتك القادمة بكل سهولة.
          </motion.p>
        </header>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="sticky top-28 z-40 flex flex-wrap items-center justify-center gap-3 mb-16 pb-4"
        >
          {CATEGORIES.map(({ label, icon: CatIcon }) => {
            const isActive = activeFilter === label;
            return (
              <motion.button
                key={label}
                onClick={() => setActiveFilter(label)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 cursor-none shadow-sm ${
                  isActive
                    ? "bg-mint-500 text-white shadow-mint-500/20"
                    : "bg-white/60 backdrop-blur-md text-navy border border-white/50 hover:bg-white/80"
                }`}
              >
                <CatIcon size={16} />
                <span>{label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Trips Grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Empty State */}
        {filteredTrips.length === 0 && (
          <div className="text-center py-32">
            <Sparkles size={48} className="mx-auto text-mint-500/20 mb-4" />
            <p className="text-xl font-bold text-muted/40">
              عذراً، لا توجد رحلات متوفرة في هذه الفئة حالياً.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
