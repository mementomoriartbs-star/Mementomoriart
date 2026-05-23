import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ArtCard, ArtPiece } from "./ArtCard";
import { SplitText } from "./SplitText";
import { MagneticButton } from "./MagneticButton";

const artPieces: ArtPiece[] = [
  {
    id: 1,
    title: "Dissolution I",
    medium: "Oil on linen",
    dimensions: "120 × 90 cm",
    year: 2024,
    price: 3800,
    sold: false,
    image: "https://images.unsplash.com/photo-1779055659853-853441a5d1ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydCUyMHBhaW50aW5nJTIwY29udGVtcG9yYXJ5JTIwZ2FsbGVyeXxlbnwxfHx8fDE3NzkyNTg5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    edition: "Original",
  },
  {
    id: 2,
    title: "Quietude",
    medium: "Acrylic on canvas",
    dimensions: "80 × 80 cm",
    year: 2024,
    price: 2400,
    sold: false,
    image: "https://images.unsplash.com/photo-1775658256058-2f031d0a07a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGFydCUyMHBhaW50aW5nJTIwY29udGVtcG9yYXJ5JTIwZ2FsbGVyeXxlbnwxfHx8fDE3NzkyNTg5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    edition: "Original",
  },
  {
    id: 3,
    title: "Erosion Study",
    medium: "Mixed media",
    dimensions: "100 × 140 cm",
    year: 2025,
    price: 5200,
    sold: true,
    image: "https://images.unsplash.com/photo-1768731801130-6e8a14947974?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxhYnN0cmFjdCUyMGFydCUyMHBhaW50aW5nJTIwY29udGVtcG9yYXJ5JTIwZ2FsbGVyeXxlbnwxfHx8fDE3NzkyNTg5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    edition: "Original",
  },
  {
    id: 4,
    title: "Threshold",
    medium: "Oil on canvas",
    dimensions: "60 × 90 cm",
    year: 2025,
    price: 2900,
    sold: false,
    image: "https://images.unsplash.com/photo-1765850262426-55d6a1edea93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxhYnN0cmFjdCUyMGFydCUyMHBhaW50aW5nJTIwY29udGVtcG9yYXJ5JTIwZ2FsbGVyeXxlbnwxfHx8fDE3NzkyNTg5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    edition: "Original",
  },
  {
    id: 7,
    title: "Palette of Hours",
    medium: "Oil on panel",
    dimensions: "50 × 70 cm",
    year: 2024,
    price: 2200,
    sold: false,
    image: "https://images.unsplash.com/photo-1758522276889-ec31a6fa3492?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxvaWwlMjBwYWludGluZyUyMHNjdWxwdHVyZSUyMGZpbmUlMjBhcnQlMjBzdHVkaW98ZW58MXx8fHwxNzc5MjU4OTI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    edition: "Original",
  },
];

const FILTERS = ["All", "Paintings", "Acrylic", "Oils", "Prints", "Garments", "Mixed Medium"];

interface GalleryProps {
  theme: "light" | "dark";
  onEnquire: (piece: ArtPiece) => void;
}

export function Gallery({ theme, onEnquire }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null);
  const isDark = theme === "dark";

  const filtered = artPieces.filter((p) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Paintings")
      return p.medium.toLowerCase().includes("oil") || p.medium.toLowerCase().includes("acrylic") || p.medium.toLowerCase().includes("paint");
    if (activeFilter === "Acrylic")
      return p.medium.toLowerCase().includes("acrylic");
    if (activeFilter === "Oils")
      return p.medium.toLowerCase().includes("oil");
    if (activeFilter === "Prints")
      return p.medium.toLowerCase().includes("print");
    if (activeFilter === "Garments")
      return p.medium.toLowerCase().includes("garment") || p.medium.toLowerCase().includes("fabric") || p.medium.toLowerCase().includes("textile");
    if (activeFilter === "Mixed Medium")
      return p.medium.toLowerCase().includes("mixed");
    return true;
  });

  const selectedIdx = selectedPiece ? artPieces.findIndex((p) => p.id === selectedPiece.id) : -1;
  const prevPiece = () => {
    if (selectedIdx > 0) setSelectedPiece(artPieces[selectedIdx - 1]);
  };
  const nextPiece = () => {
    if (selectedIdx < artPieces.length - 1) setSelectedPiece(artPieces[selectedIdx + 1]);
  };

  return (
    <section
      id="gallery"
      className="py-32 transition-colors duration-500"
      style={{ backgroundColor: isDark ? "#000" : "#fff" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`font-['Space_Mono'] text-[10px] tracking-[0.4em] uppercase mb-5 flex items-center gap-3 ${
                isDark ? "text-white/35" : "text-black/35"
              }`}
            >
              <span className={`w-6 h-[1px] ${isDark ? "bg-white/30" : "bg-black/25"}`} />
              Works
            </motion.p>
            <h2
              className={`font-['Playfair_Display'] leading-[0.9] ${
                isDark ? "text-white" : "text-black"
              }`}
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              <SplitText text="Current" delay={0.1} stagger={0.06} />
              <br />
              <SplitText text="Collection" delay={0.3} stagger={0.06} className="italic" />
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <MagneticButton key={f} onClick={() => setActiveFilter(f)} strength={0.25}>
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`block px-4 py-2 font-['Space_Mono'] text-[9px] tracking-widest uppercase transition-all duration-250 ${
                    activeFilter === f
                      ? isDark
                        ? "bg-white text-black"
                        : "bg-black text-white"
                      : isDark
                      ? "border border-white/15 text-white/40 hover:border-white/40 hover:text-white/70"
                      : "border border-black/12 text-black/35 hover:border-black/35 hover:text-black/65"
                  }`}
                >
                  {f}
                </motion.span>
              </MagneticButton>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filtered.map((piece, i) => (
              <motion.div key={piece.id} layout>
                <ArtCard
                  piece={piece}
                  theme={theme}
                  onEnquire={onEnquire}
                  onView={setSelectedPiece}
                  index={i}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-28 font-['Playfair_Display'] italic text-2xl ${
              isDark ? "text-white/20" : "text-black/20"
            }`}
          >
            No works in this category.
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPiece && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ backgroundColor: "rgba(0,0,0,0.94)", backdropFilter: "blur(12px)" }}
            onClick={() => setSelectedPiece(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl w-full flex flex-col md:flex-row bg-[#0f0f0f] overflow-hidden"
              style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPiece.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35 }}
                  className="md:w-[55%]"
                >
                  <img
                    src={selectedPiece.image}
                    alt={selectedPiece.title}
                    className="w-full h-full object-cover max-h-[80vh]"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="md:w-[45%] p-10 flex flex-col justify-between">
                <div>
                  <p className="font-['Space_Mono'] text-[9px] tracking-[0.35em] uppercase text-white/30 mb-5">
                    {selectedPiece.edition}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedPiece.id + "-text"}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-['Playfair_Display'] text-4xl text-white leading-tight mb-4">
                        {selectedPiece.title}
                      </h3>
                      <div className="space-y-1 mb-8">
                        {[selectedPiece.medium, selectedPiece.dimensions, String(selectedPiece.year)].map(
                          (line, i) => (
                            <p key={i} className="font-['Inter'] text-sm text-white/40 leading-relaxed">
                              {line}
                            </p>
                          )
                        )}
                      </div>
                      <p className="font-['Inter'] text-sm text-white/35 leading-loose">
                        An original work from the artist's ongoing exploration of form, material, and the
                        space between intention and accident. Each piece is unique and comes with a signed
                        certificate of authenticity.
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-10">
                  {!selectedPiece.sold ? (
                    <>
                      <div className="flex items-baseline gap-2 mb-6">
                        <span className="font-['Space_Mono'] text-3xl text-white">
                          €{selectedPiece.price.toLocaleString()}
                        </span>
                        <span className="font-['Inter'] text-xs text-white/30">incl. VAT</span>
                      </div>
                      <MagneticButton
                        onClick={() => {
                          onEnquire(selectedPiece);
                          setSelectedPiece(null);
                        }}
                        strength={0.2}
                        className="w-full"
                      >
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 bg-white text-black font-['Space_Mono'] text-[10px] tracking-widest uppercase text-center hover:bg-white/92 transition-colors"
                        >
                          Enquire About This Piece
                        </motion.div>
                      </MagneticButton>
                    </>
                  ) : (
                    <p className="font-['Space_Mono'] text-sm text-white/25 tracking-widest uppercase">
                      This work has been acquired.
                    </p>
                  )}
                </div>
              </div>

              {/* Close */}
              <MagneticButton
                onClick={() => setSelectedPiece(null)}
                strength={0.4}
                className="absolute top-4 right-4"
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                  <X size={16} />
                </div>
              </MagneticButton>

              {/* Nav arrows */}
              {selectedIdx > 0 && (
                <MagneticButton
                  onClick={prevPiece}
                  strength={0.4}
                  className="absolute left-4 top-1/2 -translate-y-1/2 md:-left-16"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white bg-white/10 hover:bg-white/20 transition-colors">
                    <ChevronLeft size={18} />
                  </div>
                </MagneticButton>
              )}
              {selectedIdx < artPieces.length - 1 && (
                <MagneticButton
                  onClick={nextPiece}
                  strength={0.4}
                  className="absolute right-4 top-1/2 -translate-y-1/2 md:-right-16"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white bg-white/10 hover:bg-white/20 transition-colors">
                    <ChevronRight size={18} />
                  </div>
                </MagneticButton>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export { artPieces };
