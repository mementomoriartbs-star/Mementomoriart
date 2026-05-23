import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, ArrowRight } from "lucide-react";
import { ArtPiece } from "./ArtCard";

interface CartItem extends ArtPiece {
  qty: number;
}

interface CartProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  theme: "light" | "dark";
}

export function Cart({ open, onClose, items, onRemove, theme }: CartProps) {
  const isDark = theme === "dark";
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md flex flex-col"
            style={{ backgroundColor: isDark ? "#0a0a0a" : "#fafafa" }}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between px-8 py-7 border-b ${
                isDark ? "border-white/10" : "border-black/8"
              }`}
            >
              <div>
                <p
                  className={`font-['Space_Mono'] text-[9px] tracking-[0.35em] uppercase mb-1 ${
                    isDark ? "text-white/35" : "text-black/35"
                  }`}
                >
                  Your Selection
                </p>
                <h2
                  className={`font-['Playfair_Display'] text-2xl ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  Cart
                </h2>
              </div>
              <button
                onClick={onClose}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  isDark ? "text-white/50 hover:text-white hover:bg-white/10" : "text-black/40 hover:text-black hover:bg-black/5"
                }`}
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`flex flex-col items-center justify-center h-full pt-24 text-center ${
                      isDark ? "text-white/25" : "text-black/25"
                    }`}
                  >
                    <p className="font-['Playfair_Display'] text-2xl italic mb-3">Empty</p>
                    <p className="font-['Inter'] text-sm">
                      Browse the gallery to find a piece that speaks to you.
                    </p>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-5 pb-6 border-b ${
                        isDark ? "border-white/8" : "border-black/6"
                      }`}
                    >
                      <div className="w-20 h-24 shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4
                            className={`font-['Playfair_Display'] text-base leading-snug mb-1 ${
                              isDark ? "text-white" : "text-black"
                            }`}
                          >
                            {item.title}
                          </h4>
                          <p
                            className={`font-['Inter'] text-xs ${
                              isDark ? "text-white/35" : "text-black/35"
                            }`}
                          >
                            {item.medium}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-['Space_Mono'] text-sm ${
                              isDark ? "text-white" : "text-black"
                            }`}
                          >
                            €{item.price.toLocaleString()}
                          </span>
                          <button
                            onClick={() => onRemove(item.id)}
                            className={`w-8 h-8 flex items-center justify-center transition-colors duration-200 ${
                              isDark
                                ? "text-white/30 hover:text-white/80"
                                : "text-black/25 hover:text-black/70"
                            }`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className={`px-8 py-8 border-t ${
                  isDark ? "border-white/10" : "border-black/8"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`font-['Inter'] text-sm ${
                      isDark ? "text-white/50" : "text-black/50"
                    }`}
                  >
                    Subtotal ({items.length} {items.length === 1 ? "work" : "works"})
                  </span>
                  <span
                    className={`font-['Space_Mono'] text-xl ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    €{total.toLocaleString()}
                  </span>
                </div>
                <p
                  className={`font-['Inter'] text-xs mb-6 leading-relaxed ${
                    isDark ? "text-white/30" : "text-black/30"
                  }`}
                >
                  Shipping, insurance, and framing options confirmed on next step.
                  All works come with a certificate of authenticity.
                </p>
                <button
                  className={`w-full py-4 flex items-center justify-center gap-3 font-['Space_Mono'] text-xs tracking-widest uppercase transition-colors duration-200 ${
                    isDark
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-black text-white hover:bg-black/85"
                  }`}
                >
                  Proceed to Enquiry
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export type { CartItem };
