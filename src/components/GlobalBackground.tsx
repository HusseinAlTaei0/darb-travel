import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const GlobalBackground = () => {
    // إعدادات تتبع الماوس
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // استخدام النوابض (Spring) لحركة ناعمة
    const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 200);
            mouseY.set(e.clientY - 200);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 z-[-1] bg-[#FAF9F6] overflow-hidden pointer-events-none">

            {/* 1. التوهج التفاعلي الذي يتبع الماوس (لون برتقالي قوي وواضح) */}
            <motion.div
                className="absolute w-[400px] h-[400px] bg-[#FFAC4B]/40 rounded-full blur-[90px]"
                style={{ x: springX, y: springY }}
            />

            {/* 2. الكرات اللونية الطافية (تأثير التنفس بألوان حيوية) */}
            <div className="absolute inset-0">
                {/* الكرة النعناعية العميقة (Mint) */}
                <motion.div
                    className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-[#74B49B]/35 rounded-full blur-[100px]"
                    animate={{
                        x: [0, 60, -40, 0],
                        y: [0, -50, 40, 0],
                        scale: [1, 1.15, 0.9, 1]
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* الكرة البرتقالية الواضحة */}
                <motion.div
                    className="absolute -bottom-[15%] -right-[10%] w-[700px] h-[700px] bg-[#FFAC4B]/25 rounded-full blur-[100px]"
                    animate={{
                        x: [0, -50, 50, 0],
                        y: [0, 60, -30, 0],
                        scale: [1, 1.2, 0.85, 1]
                    }}
                    transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* 3. الجزيئات السحرية الطافية (Particles) - صارت أوضح بهواية */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-[#579E84]/60 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -50, 0],
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* 4. مسارات الرحلة (SVG Paths) - خطوط بارزة */}
            <div className="absolute inset-0 opacity-80">
                <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
                    {/* المسار الرئيسي */}
                    <motion.path
                        d="M-50,200 C200,100 400,500 700,400 C1000,300 1200,600 1500,450"
                        stroke="#579E84"
                        strokeWidth="2.5"
                        strokeOpacity="0.4"
                        fill="none"
                        strokeDasharray="8 12"
                        animate={{ strokeDashoffset: [0, -100] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    />
                    {/* مسار ثانوي متقاطع */}
                    <motion.path
                        d="M-50,600 C300,700 600,300 900,500 C1200,700 1400,200 1600,300"
                        stroke="#FFAC4B"
                        strokeWidth="2"
                        strokeOpacity="0.35"
                        fill="none"
                        strokeDasharray="6 15"
                        animate={{ strokeDashoffset: [0, 100] }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    />
                </svg>
            </div>

        </div>
    );
};

export default GlobalBackground;