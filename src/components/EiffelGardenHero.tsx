import React from 'react';

const EiffelGardenHero = () => {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-[#FAF9F6] font-cairo" dir="rtl">
            {/* 1. طبقة الـ SVG الكاملة (المشهد المتجه) */}
            <div className="absolute inset-0 z-0 h-full w-full">
                <svg
                    viewBox="0 0 1440 800"
                    preserveAspectRatio="xMidYMax slice"
                    className="h-full w-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        {/* تدرج السماء الدافئ */}
                        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#F8D69A" /> {/* أصفر برتقالي عند الأفق */}
                            <stop offset="100%" stopColor="#FBEECC" /> {/* أصفر فاتح في الأعلى */}
                        </linearGradient>
                    </defs>

                    {/* أ. السماء والمنظر الخلفي */}
                    <rect width="1440" height="800" fill="url(#skyGradient)" />

                    {/* التلال الخلفية المنحدرة */}
                    <path d="M0,550 C300,500 600,600 900,520 C1200,600 1440,550 1440,550 V800 H0 Z" fill="#95C2AE" />

                    {/* برج إيفل (متماثل وفي المنتصف) */}
                    <g transform="translate(720, 300) scale(1.5)">
                        <path d="M-20,200 L20,200 L10,100 L-10,100 Z" fill="#4B3D2B" /> {/* القاعدة */}
                        <path d="M-10,100 L10,100 L3,10 L-3,10 Z" fill="#605342" /> {/* البرج الأوسط */}
                        <path d="M-3,10 L3,10 L1,-5 L-1,-5 Z" fill="#605342" /> {/* القمة */}
                        <circle cx="0" cy="-10" r="1.5" fill="#4B3D2B" /> {/* النقطة في القمة */}
                    </g>

                    {/* ب. الحديقة المتناظرة (مصفوفة الأشجار والشجيرات) */}
                    <g transform="translate(0, 450)">
                        {/* الأشجار المتماثلة في المنتصف */}
                        <g>
                            {[150, 450, 990, 1290].map((x) => (
                                <path key={`tree-${x}`} d={`M${x},100 Q${x - 30},50 ${x},0 Q${x + 30},50 ${x},100`} fill="#5C8B74" />
                            ))}
                            {[300, 1140].map((x) => (
                                <path key={`tree-large-${x}`} d={`M${x},120 Q${x - 40},60 ${x},0 Q${x + 40},60 ${x},120`} fill="#4E7A66" />
                            ))}
                        </g>

                        {/* الشجيرات المخروطية المتماثلة */}
                        <g>
                            {[380, 520, 920, 1060].map((x) => (
                                <path key={`conical-${x}`} d={`M${x},100 L${x - 20},50 L${x},0 L${x + 20},50 Z`} fill="#45715C" />
                            ))}
                        </g>
                    </g>

                    {/* ج. المسبح العاكس وزنابق الماء البيضاء */}
                    <g transform="translate(720, 600)">
                        <rect x="-200" y="0" width="400" height="150" fill="#EBF7F2" /> {/* المسبح */}
                        <path d="M-200,10 L200,10" stroke="#FAF9F6" strokeWidth="2" strokeDasharray="5,5" /> {/* خطوط الانعكاس */}
                        <g>
                            {[-150, -50, 50, 150].map((x) => (
                                <circle key={`lily-${x}`} cx={x} cy="75" r="5" fill="#FAF9F6" />
                            ))}
                        </g>
                    </g>

                    {/* د. الأعشاب الطويلة المتماثلة في المقدمة */}
                    <g transform="translate(0, 700)">
                        <path d="M0,100 Q50,0 100,100" fill="#5E8C73" />
                        <path d="M100,100 Q150,0 200,100" fill="#5E8C73" />
                        <path d="M1240,100 Q1290,0 1340,100" fill="#5E8C73" />
                        <path d="M1340,100 Q1390,0 1440,100" fill="#5E8C73" />
                    </g>

                </svg>
            </div>

            {/* 2. طبقة المحتوى (النصوص والأزرار) - متموضعة في السماء */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-32">
                <div className="text-center max-w-4xl mx-auto">

                    {/* العنوان الرئيسي العربي (نظيف وبدون قلقلة الحروف) */}
                    <h1 className="text-5xl md:text-7xl font-black text-[#1A2E35] mb-6 leading-tight drop-shadow-sm">
                        اكتشف جمال العالم
                        <span className="block text-4xl md:text-5xl mt-2">وجمال كل وجهات درب</span>
                    </h1>

                    {/* الوصف العربي */}
                    <p className="text-lg md:text-xl text-[#1A2E35]/80 max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-sm">
                        رحلات مصممة بعناية لتأخذك في مسارات استثنائية عبر أجمل الوجهات حول العالم.
                    </p>

                    {/* أزرار الإجراء (Actions) */}
                    <div className="flex flex-wrap items-center justify-center gap-5" dir="ltr">
                        {/* Primary Button */}
                        <a
                            href="#trips"
                            className="inline-flex items-center gap-2 px-10 py-4 
                         bg-gradient-to-l from-[#74B49B] to-[#579E84] text-white 
                         text-base font-bold rounded-full cursor-pointer
                         shadow-[0_6px_24px_rgba(116,180,155,0.3)]
                         transition-all duration-300
                         hover:shadow-[0_8px_32px_rgba(116,180,155,0.5)] hover:scale-[1.04]
                         active:scale-[0.97]"
                        >
                            ابدأ رحلتك
                            <svg className="w-5 h-5 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>

                        {/* Secondary Button */}
                        <button
                            className="inline-flex items-center gap-2 px-10 py-4 
                         bg-white/70 backdrop-blur-md text-[#1A2E35] 
                         text-base font-bold rounded-full cursor-pointer
                         border border-[#74B49B]/30
                         shadow-[0_4px_16px_rgba(0,0,0,0.05)]
                         transition-all duration-300
                         hover:bg-white/90 hover:border-[#74B49B]/50 hover:scale-[1.03]
                         active:scale-[0.97]"
                        >
                            <svg className="w-5 h-5 text-[#579E84]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            شاهد الفيديو
                        </button>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default EiffelGardenHero;