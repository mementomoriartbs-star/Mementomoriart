import { motion } from "motion/react";

interface MarqueeStripProps {
  theme: "light" | "dark";
}

const ITEMS = [
  "Original Works",
  "Fine Art",
  "Oils",
  "Acrylic",
  "Mixed Medium",
  "Certificate of Authenticity",
];

export function MarqueeStrip({ theme }: MarqueeStripProps) {
  const isDark = theme === "dark";
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className="overflow-hidden py-5 border-y transition-colors duration-500"
      style={{
        backgroundColor: isDark ? "#0a0a0a" : "#f0f0ec",
        borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
      }}
    >
      <motion.div
        className="flex whitespace-nowrap gap-0"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8 px-8">
            <span
              className={`font-['Space_Mono'] text-[10px] tracking-[0.35em] uppercase ${
                isDark ? "text-white/25" : "text-black/30"
              }`}
            >
              {item}
            </span>
            <span
              className={`w-1 h-1 rounded-full ${isDark ? "bg-white/15" : "bg-black/20"}`}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
