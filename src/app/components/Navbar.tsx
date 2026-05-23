import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { MagneticButton } from "./MagneticButton";
import logoImg from "../../imports/Memento_Mori_Art-2.png";

interface NavbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const isDark = theme === "dark";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = ["Gallery", "About", "Process", "Contact"];

  const glassStyle = scrolled
    ? isDark
      ? {
          backgroundColor: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 1px 40px rgba(0,0,0,0.4)",
        }
      : {
          backgroundColor: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 1px 40px rgba(0,0,0,0.08)",
        }
    : {};

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={glassStyle as any}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] origin-left"
          style={{
            scaleX,
            background: isDark
              ? "linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2))"
              : "linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0.15))",
            width: "100%",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <MagneticButton as="a" href="#" strength={0.2}>
            <motion.img
              src={logoImg}
              alt="mementomori arts"
              className="h-10 w-auto object-contain"
              style={{ filter: isDark ? "invert(1)" : "none" }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </MagneticButton>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <MagneticButton key={link} as="a" href={`#${link.toLowerCase()}`} strength={0.2}>
                <span
                  className={`relative font-['Space_Mono'] text-[10px] tracking-[0.3em] uppercase transition-all duration-300 group ${
                    isDark ? "text-white/45 hover:text-white" : "text-black/40 hover:text-black"
                  }`}
                >
                  {link}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-400 ${
                      isDark ? "bg-white" : "bg-black"
                    }`}
                  />
                </span>
              </MagneticButton>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <MagneticButton onClick={onToggleTheme} strength={0.4}>
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDark
                    ? "bg-white/8 text-white hover:bg-white/15"
                    : "bg-black/6 text-black hover:bg-black/12"
                }`}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                  >
                    {isDark ? <Sun size={15} /> : <Moon size={15} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </MagneticButton>

            <MagneticButton as="a" href="#contact" strength={0.4}>
              <div
                className={`px-4 h-9 rounded-full flex items-center justify-center font-['Space_Mono'] text-[9px] tracking-widest uppercase transition-all duration-300 ${
                  isDark
                    ? "bg-white/8 text-white hover:bg-white/15"
                    : "bg-black/6 text-black hover:bg-black/12"
                }`}
              >
                Enquire
              </div>
            </MagneticButton>

            {/* Mobile */}
            <MagneticButton
              onClick={() => setMobileOpen(!mobileOpen)}
              strength={0.3}
              className="md:hidden"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDark
                    ? "bg-white/8 text-white hover:bg-white/15"
                    : "bg-black/6 text-black hover:bg-black/12"
                }`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mobileOpen ? "open" : "closed"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mobileOpen ? <X size={15} /> : <Menu size={15} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </MagneticButton>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[72px] left-0 right-0 z-40 px-8 py-10 flex flex-col gap-7"
            style={{
              backgroundColor: isDark ? "rgba(0,0,0,0.96)" : "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.06)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                onClick={() => setMobileOpen(false)}
                className={`font-['Playfair_Display'] text-3xl transition-colors duration-200 ${
                  isDark ? "text-white/80 hover:text-white" : "text-black/70 hover:text-black"
                }`}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
