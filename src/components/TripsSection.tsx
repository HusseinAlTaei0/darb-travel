import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronLeft, ChevronRight, Compass, Star } from 'lucide-react';

interface Destination { id: number; name: string; nameEn: string; description: string; price: string; duration: string; rating: string; tags: string[]; image: string; }

const destinations: Destination[] = [
    { id: 1, name: 'المالديف', nameEn: 'Maldives', description: 'ملاذ استوائي فاخر حيث الهدوء المطلق، المياه الفيروزية الصافية، والمنتجعات التي تأخذك لعالم من الخيال.', price: '2,499', duration: '5 Days', rating: '4.9', tags: ['Romantic', 'Beaches'], image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1400&h=900&fit=crop' },
    { id: 2, name: 'بالي', nameEn: 'Bali', description: 'مزيج ساحر بين الغابات الاستوائية الخضراء، الشواطئ الذهبية، والثقافة الروحانية التي تمنحك سلاماً داخلياً.', price: '1,899', duration: '7 Days', rating: '4.8', tags: ['Adventure', 'Nature'], image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1400&h=900&fit=crop' },
    { id: 3, name: 'باريس', nameEn: 'Paris', description: 'عاصمة النور والرومانسية؛ استمتع بسحر الشوارع العتيقة، المقاهي الكلاسيكية، وإطلالة لا تُنسى على برج إيفل.', price: '3,199', duration: '4 Days', rating: '4.9', tags: ['Romantic', 'Culture'], image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&h=900&fit=crop' },
    { id: 4, name: 'إسطنبول', nameEn: 'Istanbul', description: 'حيث يلتقي سحر الشرق بعبق الغرب؛ مدينة التاريخ العريق، الأسواق النابضة بالحياة، وجمال مضيق البوسفور.', price: '999', duration: '3 Days', rating: '4.7', tags: ['Culture', 'History'], image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1400&h=900&fit=crop' },
];

const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? '50%' : '-50%', opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { x: { type: 'spring' as const, stiffness: 250, damping: 30 }, opacity: { duration: 0.4 } } },
    exit: (direction: number) => ({ x: direction > 0 ? '-50%' : '50%', opacity: 0, transition: { x: { type: 'spring' as const, stiffness: 250, damping: 30 }, opacity: { duration: 0.3 } } }),
};

export default function TripsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => {
            const next = prev + newDirection;
            if (next < 0) return destinations.length - 1;
            if (next >= destinations.length) return 0;
            return next;
        });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => paginate(1), 6000);
        return () => clearInterval(timer);
    }, [currentIndex, paginate]);

    const currentDest = destinations[currentIndex];

    return (
        <section id="trips" className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 font-cairo overflow-hidden bg-transparent" dir="rtl">

            {/* ── الأنيميشن الخلفي (Animated Blobs) المريح للعين ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <motion.div animate={{ scale: [1, 1.1, 1], x: [0, 40, 0], y: [0, 20, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[10%] -right-[5%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#74B49B]/15 to-transparent blur-3xl opacity-60" />
                <motion.div animate={{ scale: [1, 1.2, 1], x: [0, -30, 0], y: [0, 30, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[5%] -left-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-[#579E84]/15 to-transparent blur-3xl opacity-50" />
            </div>

            <div className="text-center mb-8 z-10">
                <span className="text-[#74B49B] font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">Destinations</span>
                <h2 className="text-3xl md:text-4xl font-black text-[#1A2E35]">وجهاتنا المميزة</h2>
            </div>

            <div className="relative w-full max-w-[850px] mx-auto z-10">
                <div className="flex flex-col bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(26,46,53,0.15)] overflow-hidden">

                    {/* ── تصغير ارتفاع الصورة ── */}
                    <div className="relative w-full h-[180px] sm:h-[220px] md:h-[280px] shrink-0 bg-slate-100 overflow-hidden">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.img key={currentDest.id} src={currentDest.image} alt={currentDest.name} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
                        </AnimatePresence>
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                            <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur text-[#1A2E35] font-bold text-xs sm:text-sm px-4 py-2 rounded-full shadow-md">
                                <Star size={16} className="text-[#FFAC4B] fill-[#FFAC4B]" /> <span>{currentDest.rating}</span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur text-[#1A2E35] font-bold text-xs sm:text-sm px-4 py-2 rounded-full shadow-md">
                                <Clock size={16} className="text-[#74B49B]" /> <span>{currentDest.duration}</span>
                            </div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
                    </div>

                    {/* ── تصغير المسافات والخطوط لتناسب الشاشة ── */}
                    <div className="relative z-20 flex flex-col gap-3 p-5 md:p-8 pb-5 md:pb-6 w-full bg-white">
                        <AnimatePresence mode="wait">
                            <motion.div key={currentDest.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="flex flex-col gap-3.5 w-full">
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-black text-[#1A2E35] leading-none">{currentDest.name}</h3>
                                    <span className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-1.5 block">{currentDest.nameEn}</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {currentDest.tags.map((tag) => <span key={tag} className="bg-[#F1F8F6] text-[#579E84] text-xs font-bold px-4 py-1.5 rounded-full border border-[#A7D7C5]/30">{tag}</span>)}
                                </div>

                                <p className="text-sm sm:text-[15px] text-[#3A5A68]/80 leading-relaxed font-medium line-clamp-2">{currentDest.description}</p>

                                <div className="flex items-baseline gap-2 mt-1">
                                    <span className="text-2xl sm:text-3xl font-black text-[#FFAC4B] leading-none">${currentDest.price}</span>
                                    <span className="text-slate-400 font-bold text-xs">/ للشخص</span>
                                </div>

                                <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-l from-[#74B49B] to-[#579E84] text-white text-base font-black px-6 py-3.5 rounded-full shadow-[0_8px_20px_rgba(116,180,155,0.4)] transition-all mt-1">
                                    <Compass size={20} strokeWidth={2.5} /> <span>احجز رحلتك</span>
                                </motion.button>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Arrows */}
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => paginate(-1)} className="absolute z-30 top-[35%] -translate-y-1/2 -right-3 md:-right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-[#1A2E35] hover:bg-slate-50 border border-slate-100">
                    <ChevronRight size={24} />
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => paginate(1)} className="absolute z-30 top-[35%] -translate-y-1/2 -left-3 md:-left-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-[#1A2E35] hover:bg-slate-50 border border-slate-100">
                    <ChevronLeft size={24} />
                </motion.button>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-6">
                    {destinations.map((dest, i) => (
                        <button key={dest.id} onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }} className="p-1">
                            <motion.div className="h-2 rounded-full" animate={{ width: i === currentIndex ? 32 : 8, backgroundColor: i === currentIndex ? '#74B49B' : '#A7D7C5', opacity: i === currentIndex ? 1 : 0.5 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}