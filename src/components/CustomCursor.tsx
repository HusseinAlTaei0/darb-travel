import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Send, Ear } from 'lucide-react';

type CursorMode = 'default' | 'hover' | 'listen';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [mode, setMode] = useState<CursorMode>('default');
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        // Don't enable on touch devices
        if (window.matchMedia('(max-width: 1023px)').matches) return;

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for "listen" state first (sensory bubbles)
            const isListenable = target.closest('[data-listen]');
            if (isListenable) {
                setMode('listen');
                return;
            }

            // Check for generic clickable
            const isClickable =
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[role="button"]') ||
                target.closest('[data-clickable]') ||
                target.closest('.cursor-pointer');

            setMode(isClickable ? 'hover' : 'default');
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible]);

    // Don't render on mobile
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches) {
        return null;
    }

    const scaleValue = isClicking ? 0.8 : mode === 'listen' ? 1.6 : mode === 'hover' ? 1.2 : 1;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-9999"
            animate={{
                x: position.x - 16,
                y: position.y - 16,
                scale: scaleValue,
                opacity: isVisible ? 1 : 0,
            }}
            transition={{
                type: 'spring',
                stiffness: 500,
                damping: 28,
                mass: 0.5,
            }}
        >
            <AnimatePresence mode="wait">
                {mode === 'listen' ? (
                    /* ── Listen Mode (Sensory Bubbles) ── */
                    <motion.div
                        key="listen"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="w-8 h-8 flex items-center justify-center"
                    >
                        <div className="relative">
                            {/* Pulsing ring */}
                            <motion.div
                                className="absolute -inset-2 rounded-full border-2 border-orange-accent/50"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <div className="relative bg-orange-accent rounded-full p-2 shadow-lg shadow-orange-accent/30">
                                <Ear size={12} className="text-white" strokeWidth={2.5} />
                            </div>
                        </div>
                    </motion.div>
                ) : mode === 'hover' ? (
                    /* ── Hover Mode (Links / Buttons) ── */
                    <motion.div
                        key="hover"
                        initial={{ rotate: -45, scale: 0, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: 45, scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="w-8 h-8 flex items-center justify-center -rotate-90"
                    >
                        <Send
                            size={24}
                            strokeWidth={2.5}
                            className="text-mint-300"
                        />
                    </motion.div>
                ) : (
                    /* ── Default Mode ── */
                    <motion.div
                        key="default"
                        initial={{ rotate: 90, scale: 0, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: -90, scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="w-8 h-8 flex items-center justify-center"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-mint-300 rounded-full blur-md opacity-40" />
                            <div className="relative bg-navy rounded-full p-2 shadow-lg">
                                <Compass size={14} className="text-mint-300" strokeWidth={2.5} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CustomCursor;
