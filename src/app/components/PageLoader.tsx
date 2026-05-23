import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "../../imports/Memento_Mori_Art-2.png";

interface PageLoaderProps {
  onComplete: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 1800;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 900);
        }, 150);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] bg-black flex flex-col items-start justify-end p-10 md:p-16 overflow-hidden"
        >
          {/* Animated gradient blobs */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 2, times: [0, 0.5, 1] }}
          >
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(120,120,120,0.15) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
            <div
              className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(80,80,80,0.12) 0%, transparent 70%)",
                filter: "blur(80px)",
              }}
            />
          </motion.div>

          {/* Progress line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10">
            <motion.div
              className="h-full bg-white"
              style={{ width: `${count}%`, transformOrigin: "left" }}
              transition={{ ease: "linear" }}
            />
          </div>

          {/* Brand name */}
          <motion.div
            className="absolute top-10 left-10 md:top-16 md:left-16"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <img src={logoImg} alt="mementomori arts" className="h-9 w-auto object-contain" style={{ filter: "invert(1)" }} />
          </motion.div>

          {/* Big counter */}
          <div className="relative z-10">
            <motion.div
              className="font-['Space_Mono'] text-white leading-none select-none"
              style={{ fontSize: "clamp(5rem, 18vw, 16rem)", opacity: 0.08 }}
            >
              {String(count).padStart(2, "0")}
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="font-['Inter'] text-white/30 text-xs tracking-widest uppercase mt-2"
            >
              Loading collection
            </motion.p>
          </div>

          {/* Bottom tagline */}
          <motion.div
            className="absolute bottom-10 right-10 md:bottom-16 md:right-16 text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="font-['Playfair_Display'] italic text-white/20 text-xl">
              mementomori arts
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
