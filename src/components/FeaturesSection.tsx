import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronLeft, ChevronRight, Compass, Star } from 'lucide-react';

/* ──────────────────────────────────────
   Destination Data
   ────────────────────────────────────── */
interface Destination {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  price: string;
  duration: string;
  rating: string;
  tags: string[];
  image: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'المالديف',
    nameEn: 'Maldives',
    description: 'ملاذ استوائي فاخر حيث الهدوء المطلق، المياه الفيروزية الصافية، والمنتجعات التي تأخذك لعالم من الخيال.',
    price: '2,499',
    duration: '5 Days',
    rating: '4.9',
    tags: ['Romantic', 'Beaches'],
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1400&h=900&fit=crop',
  },
  {
    id: 2,
    name: 'بالي',
    nameEn: 'Bali',
    description: 'مزيج ساحر بين الغابات الاستوائية الخضراء، الشواطئ الذهبية، والثقافة الروحانية التي تمنحك سلاماً داخلياً.',
    price: '1,899',
    duration: '7 Days',
    rating: '4.8',
    tags: ['Adventure', 'Nature'],
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1400&h=900&fit=crop',
  },
  {
    id: 3,
    name: 'باريس',
    nameEn: 'Paris',
    description: 'عاصمة النور والرومانسية؛ استمتع بسحر الشوارع العتيقة، المقاهي الكلاسيكية، وإطلالة لا تُنسى على برج إيفل.',
    price: '3,199',
    duration: '4 Days',
    rating: '4.9',
    tags: ['Romantic', 'Culture'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&h=900&fit=crop',
  },
  {
    id: 4,
    name: 'إسطنبول',
    nameEn: 'Istanbul',
    description: 'حيث يلتقي سحر الشرق بعبق الغرب؛ مدينة التاريخ العريق، الأسواق النابضة بالحياة، وجمال مضيق البوسفور.',
    price: '999',
    duration: '3 Days',
    rating: '4.7',
    tags: ['Culture', 'History'],
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1400&h=900&fit=crop',
  },
];

/* ──────────────────────────────────────
   Slide Animation Variants
   ────────────────────────────────────── */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '50%' : '-50%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 250, damping: 30 },
      opacity: { duration: 0.4 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-50%' : '50%',
    opacity: 0,
    transition: {
      x: { type: 'spring' as const, stiffness: 250, damping: 30 },
      opacity: { duration: 0.3 },
    },
  }),
};

/* ──────────────────────────────────────
   Hero Section — Apple-Style Single Card
   ────────────────────────────────────── */
const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        const next = prev + newDirection;
        if (next < 0) return destinations.length - 1;
        if (next >= destinations.length) return 0;
        return next;
      });
    },
    []
  );

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [currentIndex, paginate]);

  const currentDest = destinations[currentIndex];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4" dir="rtl">
      {/* Background handled by GlobalBackground */}

      {/* Card + Controls Wrapper */}
      <div className="relative w-full max-w-4xl mx-auto z-10 mt-16 md:mt-24">

        {/* ═══════════════════════════════
                    THE SINGLE PREMIUM CARD
                   ═══════════════════════════════ */}
        <div
          className="flex flex-col bg-white rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden"
          dir="rtl"
        >
          {/* ── TOP: Image ── */}
          <div className="relative w-full h-[150px] sm:h-[220px] md:h-[300px] shrink-0 bg-slate-100">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={currentDest.id}
                src={currentDest.image}
                alt={currentDest.name}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            </AnimatePresence>

            {/* Floating Badges */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
              <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur text-[#1A2E35] font-bold text-sm sm:text-base px-5 py-2.5 rounded-full shadow-md whitespace-nowrap">
                <Star size={18} className="text-[#FFAC4B] fill-[#FFAC4B]" />
                <span>{currentDest.rating}</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur text-[#1A2E35] font-bold text-sm sm:text-base px-5 py-2.5 rounded-full shadow-md whitespace-nowrap">
                <Clock size={18} className="text-[#74B49B]" />
                <span>{currentDest.duration}</span>
              </div>
            </div>

            {/* Bottom gradient for smooth blend into white */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent z-10" />
          </div>

          {/* ── BOTTOM: Vertically Stacked Content ── */}
          <div className="relative z-20 flex flex-col gap-4 p-6 md:p-8 pb-5 md:pb-8 w-full bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDest.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 w-full"
              >
                {/* 1. Title Block */}
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black text-[#1A2E35] leading-normal">
                    {currentDest.name}
                  </h2>
                  <span className="text-sm text-slate-400 font-bold tracking-widest uppercase mt-0.5 block leading-normal">
                    {currentDest.nameEn}
                  </span>
                </div>

                {/* 2. Tags Row */}
                <div className="flex flex-wrap gap-3">
                  {currentDest.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#F1F8F6] text-[#74B49B] text-sm sm:text-base font-bold px-6 py-2.5 rounded-full border border-[#A7D7C5]/30 whitespace-nowrap leading-normal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 2.5 Description Paragraph */}
                <p className="text-sm sm:text-[15px] text-[#3A5A68]/85 leading-relaxed font-medium mt-2 mb-1 line-clamp-2" dir="rtl">
                  {currentDest.description}
                </p>

                {/* 3. Price Block */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#FFAC4B] leading-normal">
                    ${currentDest.price}
                  </span>
                  <span className="text-slate-400 font-bold text-xs sm:text-sm leading-normal">/ person</span>
                </div>

                {/* 4. CTA Button (Full Width) */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#FFAC4B] hover:bg-orange-500 text-white text-base sm:text-lg font-black px-6 py-3 md:py-3.5 rounded-full shadow-lg transition-colors whitespace-nowrap shrink-0 min-h-[56px] leading-normal"
                  style={{ boxShadow: '0 10px 30px -5px rgba(255, 172, 75, 0.5)' }}
                >
                  <Compass size={22} strokeWidth={2.5} />
                  <span>Book Now</span>
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Navigation Arrows (overlapping card edges) ── */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="absolute z-30 top-[40%] -translate-y-1/2 -right-4 md:-right-8 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl text-[#1A2E35] hover:bg-slate-50 transition-colors"
        >
          <ChevronRight size={28} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="absolute z-30 top-[40%] -translate-y-1/2 -left-4 md:-left-8 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl text-[#1A2E35] hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft size={28} />
        </motion.button>

        {/* ── Dot Pagination ── */}
        <div className="flex items-center justify-center gap-2.5 mt-10">
          {destinations.map((dest, i) => (
            <button
              key={dest.id}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className="p-1.5"
            >
              <motion.div
                className="h-2.5 rounded-full"
                animate={{
                  width: i === currentIndex ? 36 : 10,
                  backgroundColor: i === currentIndex ? '#FFAC4B' : '#A7D7C5',
                  opacity: i === currentIndex ? 1 : 0.5,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;