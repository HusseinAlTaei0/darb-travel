import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
  Star,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { TRIPS } from "../data/trips";

/* ═══════════════════════════════════════════════════════════
   TRIP DETAILS PAGE
   ═══════════════════════════════════════════════════════════ */
export default function TripDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const trip = TRIPS.find((t) => t.id === Number(id));

  /* 404 fallback */
  if (!trip) {
    return (
      <div
        dir="rtl"
        className="min-h-screen flex flex-col items-center justify-center font-cairo gap-6"
      >
        <Sparkles size={56} className="text-mint-500/20" />
        <h1 className="text-3xl font-black text-navy">
          عذراً، لم نجد هذه الرحلة
        </h1>
        <Link
          to="/trips"
          className="text-mint-500 font-bold hover:underline flex items-center gap-2"
        >
          العودة إلى الرحلات
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen font-cairo">
      {/* ════════════════════════════════════════════
          HERO IMAGE
          ════════════════════════════════════════════ */}
      <div className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${trip.image})` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b1f] via-[#0d1b1f]/40 to-transparent" />

        {/* Back navigation */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate("/trips")}
          className="absolute top-28 right-6 md:right-12 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold cursor-none hover:bg-white/20 transition-colors z-20"
        >
          <ArrowRight size={16} />
          جميع الرحلات
        </motion.button>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10 md:pb-14 z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 mb-5"
            >
              <span className="px-4 py-1.5 rounded-full bg-mint-500/20 text-mint-300 text-xs font-bold border border-mint-500/20">
                {trip.category}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-sm font-bold">
                <Clock size={14} />
                {trip.duration}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-sm font-bold">
                <MapPin size={14} />
                {trip.nameEn}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight"
            >
              {trip.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/70 font-medium max-w-2xl leading-relaxed"
            >
              {trip.description}
            </motion.p>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          MAIN CONTENT
          ════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* ── Left Column: Itinerary ── */}
          <div className="lg:col-span-2">
            {/* Long description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-3xl p-8 mb-8 border border-white/50"
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(20px)",
              }}
            >
              <h2 className="text-2xl font-black text-navy mb-4">
                عن هذه الرحلة
              </h2>
              <p className="text-base text-muted leading-relaxed font-medium">
                {trip.longDescription}
              </p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="rounded-3xl p-8 mb-8 border border-white/50"
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(20px)",
              }}
            >
              <h2 className="text-2xl font-black text-navy mb-6">
                أبرز المميزات
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trip.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-mint-500/5 border border-mint-500/10"
                  >
                    <Star
                      size={18}
                      className="text-[#FFAC4B] mt-0.5 shrink-0"
                      fill="#FFAC4B"
                    />
                    <span className="text-sm font-bold text-navy">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Itinerary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-3xl p-8 border border-white/50"
              style={{
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(20px)",
              }}
            >
              <h2 className="text-2xl font-black text-navy mb-8 flex items-center gap-3">
                <Calendar size={24} className="text-mint-500" />
                برنامج الرحلة
              </h2>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute top-0 bottom-0 right-[19px] w-px bg-mint-500/15" />

                <div className="space-y-0">
                  {trip.itinerary.map((day, i) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="relative flex gap-5 pb-8 last:pb-0"
                    >
                      {/* Timeline dot */}
                      <div className="relative z-10 shrink-0">
                        <div className="w-10 h-10 rounded-full bg-mint-500/10 border-2 border-mint-500/30 flex items-center justify-center">
                          <span className="text-xs font-black text-mint-500">
                            {day.day}
                          </span>
                        </div>
                      </div>

                      {/* Day content */}
                      <div className="flex-1 rounded-2xl p-5 bg-white/40 border border-white/40 hover:bg-white/60 transition-colors duration-300">
                        <h4 className="text-base font-black text-navy mb-1.5">
                          {day.title}
                        </h4>
                        <p className="text-sm text-muted font-medium leading-relaxed">
                          {day.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: Sticky Sidebar ── */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:sticky lg:top-28 rounded-3xl p-8 border border-white/50"
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Price */}
              <div className="text-center mb-8">
                <span className="text-sm text-muted font-bold block mb-2">
                  يبدأ من
                </span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-black text-navy">
                    {trip.price}
                  </span>
                  <span className="text-base font-bold text-muted">
                    $ / للشخص
                  </span>
                </div>
              </div>

              {/* Trip Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-white/40">
                  <span className="text-sm font-bold text-muted flex items-center gap-2">
                    <Clock size={16} className="text-mint-500" />
                    المدة
                  </span>
                  <span className="text-sm font-black text-navy">
                    {trip.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-white/40">
                  <span className="text-sm font-bold text-muted flex items-center gap-2">
                    <MapPin size={16} className="text-mint-500" />
                    الوجهة
                  </span>
                  <span className="text-sm font-black text-navy">
                    {trip.nameEn}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-white/40">
                  <span className="text-sm font-bold text-muted flex items-center gap-2">
                    <Calendar size={16} className="text-mint-500" />
                    عدد الأيام
                  </span>
                  <span className="text-sm font-black text-navy">
                    {trip.itinerary.length} أيام
                  </span>
                </div>
              </div>

              {/* Book CTA */}
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-2xl font-black text-base text-white cursor-none relative overflow-hidden group"
                style={{
                  background:
                    "linear-gradient(135deg, #FFAC4B, #FF8C00)",
                  boxShadow:
                    "0 8px 25px -5px rgba(255,172,75,0.4)",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  احجز رحلتك الآن
                  <ChevronLeft size={18} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.button>

              {/* Guarantee */}
              <p className="text-center text-xs text-muted/60 font-medium mt-4">
                إلغاء مجاني حتى 14 يوماً قبل الرحلة
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-24" />
    </div>
  );
}
