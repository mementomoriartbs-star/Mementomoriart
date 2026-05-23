import { motion } from "motion/react";
import { Instagram, ArrowUp } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import logoImg from "../../imports/Memento_Mori_Art-2.png";

interface FooterProps {
  theme: "light" | "dark";
}

export function Footer({ theme }: FooterProps) {
  const isDark = theme === "dark";

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="pt-0 pb-10 transition-colors duration-500"
      style={{ backgroundColor: isDark ? "#000" : "#fff" }}
    >
      {/* Big brand section */}
      <div
        className={`border-t ${isDark ? "border-white/8" : "border-black/8"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
          <div className="flex items-start justify-between mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={logoImg}
                alt="mementomori arts"
                className="h-16 w-auto object-contain mb-4"
                style={{ filter: isDark ? "invert(1)" : "none" }}
              />
              <span
                className={`block font-['Space_Mono'] text-[9px] tracking-[0.4em] uppercase ${
                  isDark ? "text-white/25" : "text-black/25"
                }`}
              >
                by Priyanka Chandra
              </span>
            </motion.div>

            {/* Back to top */}
            <MagneticButton onClick={scrollTop} strength={0.4}>
              <motion.div
                whileHover={{ y: -3 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center border transition-colors duration-300 ${
                  isDark
                    ? "border-white/15 text-white/40 hover:border-white/40 hover:text-white"
                    : "border-black/12 text-black/35 hover:border-black/35 hover:text-black"
                }`}
                aria-label="Back to top"
              >
                <ArrowUp size={16} />
              </motion.div>
            </MagneticButton>
          </div>

          {/* Nav links */}
          <div className={`flex flex-wrap gap-x-12 gap-y-4 mb-16 pb-16 border-b ${isDark ? "border-white/8" : "border-black/8"}`}>
            {["Gallery", "About", "Process", "Contact"].map((link) => (
              <MagneticButton key={link} as="a" href={`#${link.toLowerCase()}`} strength={0.2}>
                <span
                  className={`font-['Space_Mono'] text-[9px] tracking-widest uppercase transition-colors duration-200 ${
                    isDark ? "text-white/30 hover:text-white/70" : "text-black/25 hover:text-black/65"
                  }`}
                >
                  {link}
                </span>
              </MagneticButton>
            ))}
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p
              className={`font-['Space_Mono'] text-[9px] tracking-widest ${
                isDark ? "text-white/18" : "text-black/18"
              }`}
            >
              © 2025 mementomori arts by Priyanka Chandra. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {["Privacy", "Terms", "Shipping"].map((l) => (
                <MagneticButton key={l} as="a" href="#" strength={0.2}>
                  <span
                    className={`font-['Space_Mono'] text-[9px] tracking-widest uppercase transition-colors duration-200 ${
                      isDark ? "text-white/18 hover:text-white/45" : "text-black/18 hover:text-black/45"
                    }`}
                  >
                    {l}
                  </span>
                </MagneticButton>
              ))}

              <div className="flex items-center gap-2 ml-4">
                <MagneticButton as="a" href="https://instagram.com/mementomori_in" strength={0.4}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      isDark
                        ? "text-white/30 hover:text-white hover:bg-white/10"
                        : "text-black/25 hover:text-black hover:bg-black/5"
                    }`}
                  >
                    <Instagram size={14} />
                  </div>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
