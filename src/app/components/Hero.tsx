import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowDown } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { SplitText } from "./SplitText";

interface HeroProps {
  theme: "light" | "dark";
}

export function Hero({ theme }: HeroProps) {
  const isDark = theme === "dark";

  // Use raw scrollY pixels for accurate hero-range parallax
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], ["0%", "22%"]);
  const textY  = useTransform(scrollY, [0, 700], ["0%", "14%"]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0, 0.55]);

  // Smooth the parallax so it feels like water
  const imageYSpring = useSpring(imageY, { stiffness: 60, damping: 20, mass: 0.8 });
  const textYSpring  = useSpring(textY,  { stiffness: 60, damping: 20, mass: 0.8 });

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: isDark ? "#000" : "#fff" }}
    >
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[
          {
            style: { top: "-20%", left: "-10%", width: "70%", height: "70%", filter: "blur(80px)" },
            bg: isDark
              ? "radial-gradient(ellipse, rgba(80,80,80,0.22) 0%, transparent 70%)"
              : "radial-gradient(ellipse, rgba(200,200,200,0.4) 0%, transparent 70%)",
            anim: { x: [0, 50, -25, 0], y: [0, -35, 22, 0], scale: [1, 1.1, 0.96, 1] },
            dur: 28,
            delay: 0,
          },
          {
            style: { bottom: "-10%", right: "-15%", width: "60%", height: "60%", filter: "blur(100px)" },
            bg: isDark
              ? "radial-gradient(ellipse, rgba(60,60,60,0.18) 0%, transparent 70%)"
              : "radial-gradient(ellipse, rgba(180,180,180,0.3) 0%, transparent 70%)",
            anim: { x: [0, -50, 30, 0], y: [0, 40, -20, 0], scale: [1, 0.9, 1.08, 1] },
            dur: 32,
            delay: 4,
          },
          {
            style: { top: "30%", left: "40%", width: "40%", height: "40%", filter: "blur(60px)" },
            bg: isDark
              ? "radial-gradient(ellipse, rgba(50,50,50,0.12) 0%, transparent 70%)"
              : "radial-gradient(ellipse, rgba(160,160,160,0.22) 0%, transparent 70%)",
            anim: { x: [0, 30, -40, 0], y: [0, -20, 30, 0] },
            dur: 22,
            delay: 8,
          },
        ].map((blob, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ ...blob.style, background: blob.bg } as React.CSSProperties}
            animate={blob.anim}
            transition={{ duration: blob.dur, repeat: Infinity, ease: "easeInOut", delay: blob.delay }}
          />
        ))}
      </div>

      {/* Parallax image */}
      <div className="absolute inset-0 z-0">
        <motion.div className="absolute inset-0" style={{ y: imageYSpring }}>
          <img
            src="https://images.unsplash.com/photo-1766289496802-6a8b6977ca55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGFydCUyMHBhaW50aW5nJTIwY29udGVtcG9yYXJ5JTIwZ2FsbGVyeXxlbnwxfHx8fDE3NzkyNTg5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt=""
            className="w-full h-[120%] object-cover"
            style={{
              filter: isDark
                ? "brightness(0.18) grayscale(0.2)"
                : "brightness(0.86) grayscale(0.08)",
            }}
          />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.8) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.9) 100%)",
          }}
        />
        <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)"
            : "linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main content */}
      <motion.div
        style={{ y: textYSpring }}
        className="relative z-10 flex-1 flex flex-col items-start justify-end max-w-7xl mx-auto w-full px-6 lg:px-12 pb-28 pt-44"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <span className={`w-8 h-[1px] ${isDark ? "bg-white/40" : "bg-black/30"}`} />
          <span className={`font-['Space_Mono'] text-[10px] tracking-[0.45em] uppercase ${isDark ? "text-white/50" : "text-black/45"}`}>
            Original Works · 2024 / 25
          </span>
        </motion.div>

        <h1
          className={`font-['Playfair_Display'] leading-[0.88] mb-10 ${isDark ? "text-white" : "text-black"}`}
          style={{ fontSize: "clamp(3.8rem, 11vw, 10rem)", fontWeight: 500 }}
        >
          <SplitText text="Where silence" delay={0.2} stagger={0.055} />
          <br />
          <SplitText text="becomes form." delay={0.45} stagger={0.055} className="italic" />
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-end gap-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={`font-['Inter'] text-[15px] max-w-xs leading-relaxed ${isDark ? "text-white/55" : "text-black/55"}`}
          >
            Each piece is a singular conversation between intention and chance —
            painted, crafted, released into one collector's world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-6"
          >
            <MagneticButton
              as="a"
              href="#gallery"
              strength={0.4}
              className={`inline-flex items-center gap-3 px-9 py-4 text-sm tracking-widest uppercase font-['Space_Mono'] ${
                isDark ? "bg-white text-black hover:bg-white/85" : "bg-black text-white hover:bg-black/80"
              }`}
              data-cursor-label="View"
            >
              View Gallery
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#about"
              strength={0.3}
              className={`font-['Space_Mono'] text-[10px] tracking-widest uppercase border-b pb-0.5 ${
                isDark
                  ? "text-white/45 border-white/20 hover:text-white hover:border-white"
                  : "text-black/40 border-black/20 hover:text-black hover:border-black"
              }`}
            >
              The Artist
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1.2 }}
        className="relative z-10 flex items-center gap-4 max-w-7xl mx-auto w-full px-6 lg:px-12 pb-10"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={13} className={isDark ? "text-white/30" : "text-black/30"} />
        </motion.div>
        <span className={`font-['Space_Mono'] text-[9px] tracking-[0.35em] uppercase ${isDark ? "text-white/25" : "text-black/25"}`}>
          Scroll to explore
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9 }}
        className={`absolute bottom-10 right-6 lg:right-12 z-10 font-['Space_Mono'] text-[9px] tracking-widest ${isDark ? "text-white/18" : "text-black/18"}`}
      >
        2024 / 25
      </motion.div>
    </section>
  );
}
