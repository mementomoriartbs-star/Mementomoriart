import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";
import { Eye, MessageCircle } from "lucide-react";

export interface ArtPiece {
  id: number;
  title: string;
  medium: string;
  dimensions: string;
  year: number;
  price: number;
  sold: boolean;
  image: string;
  edition: string;
}

interface ArtCardProps {
  piece: ArtPiece;
  theme: "light" | "dark";
  onEnquire: (piece: ArtPiece) => void;
  onView: (piece: ArtPiece) => void;
  index: number;
}

export function ArtCard({ piece, theme, onEnquire, onView, index }: ArtCardProps) {
  const isDark = theme === "dark";
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // 3D tilt values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 140, damping: 22, mass: 0.5 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 140, damping: 22, mass: 0.5 });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["-30%", "130%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["-30%", "130%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.13) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      {/* 3D tilt wrapper */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
        className="relative"
      >
        {/* Image container */}
        <div
          className="relative overflow-hidden aspect-[3/4] mb-5"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.img
            src={piece.image}
            alt={piece.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Glare effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: glareBackground }}
          />

          {/* Hover overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex items-end justify-between p-5"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onView(piece)}
              className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/30 transition-colors"
              data-cursor-label="View"
            >
              <Eye size={14} />
            </motion.button>

            {!piece.sold ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onEnquire(piece)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[10px] font-['Space_Mono'] tracking-wider uppercase hover:bg-white/90 transition-colors"
                data-cursor-label="Enquire"
              >
                <MessageCircle size={11} />
                Enquire
              </motion.button>
            ) : (
              <span className="px-4 py-2.5 bg-black/50 backdrop-blur-sm text-white/45 text-[10px] font-['Space_Mono'] tracking-wider uppercase border border-white/10">
                Acquired
              </span>
            )}
          </motion.div>

          {/* Tags */}
          <div className="absolute top-4 right-4">
            <span
              className={`font-['Space_Mono'] text-[8px] tracking-[0.25em] uppercase px-3 py-1.5 backdrop-blur-sm ${
                isDark ? "bg-black/50 text-white/60" : "bg-white/60 text-black/60"
              }`}
            >
              {piece.edition}
            </span>
          </div>

          {piece.sold && (
            <div className="absolute top-4 left-4">
              <span className="font-['Space_Mono'] text-[8px] tracking-[0.25em] uppercase px-3 py-1.5 bg-black text-white/80">
                Acquired
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Info */}
      <motion.div
        animate={{ y: hovered ? -2 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-start justify-between gap-3"
      >
        <div>
          <h3
            className={`font-['Playfair_Display'] text-lg leading-snug mb-1.5 transition-colors duration-300 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {piece.title}
          </h3>
          <p
            className={`font-['Inter'] text-xs tracking-wide leading-relaxed ${
              isDark ? "text-white/35" : "text-black/35"
            }`}
          >
            {piece.medium}<br />{piece.dimensions} · {piece.year}
          </p>
        </div>
        <div className="text-right shrink-0 pt-0.5">
          {piece.sold ? (
            <span className={`font-['Space_Mono'] text-sm ${isDark ? "text-white/20" : "text-black/20"}`}>
              —
            </span>
          ) : (
            <motion.span
              whileHover={{ scale: 1.05 }}
              className={`block font-['Space_Mono'] text-sm ${isDark ? "text-white" : "text-black"}`}
            >
              €{piece.price.toLocaleString()}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Animated bottom line */}
      <div className={`mt-4 h-[1px] overflow-hidden ${isDark ? "bg-white/6" : "bg-black/6"}`}>
        <motion.div
          className={`h-full ${isDark ? "bg-white/30" : "bg-black/25"}`}
          animate={{ x: hovered ? "0%" : "-100%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}
