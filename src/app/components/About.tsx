import { motion } from "motion/react";
import { SplitText } from "./SplitText";
import { MagneticButton } from "./MagneticButton";
import priyankaPhoto from "../../imports/WhatsApp_Image_2025-05-08_at_11.52.59_AM.jpeg";

interface AboutProps {
  theme: "light" | "dark";
}

function CountUp({ target, suffix = "" }: { target: number | string; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {target}{suffix}
    </motion.span>
  );
}

export function About({ theme }: AboutProps) {
  const isDark = theme === "dark";

  return (
    <section
      id="about"
      className="py-32 overflow-hidden"
      style={{ backgroundColor: isDark ? "#080808" : "#f2f2ef" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <motion.img
                initial={{ scale: 1.06 }}
                style={{
                  filter: isDark ? "grayscale(0.3) brightness(0.8)" : "grayscale(0.05) brightness(0.97)",
                }}
                src={priyankaPhoto}
                alt="Memento Mori Art"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating caption card */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="absolute -bottom-8 -right-6 p-6 hidden md:block"
              style={{
                backgroundColor: isDark ? "#0f0f0f" : "#fff",
                border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                boxShadow: isDark
                  ? "0 20px 60px rgba(0,0,0,0.5)"
                  : "0 20px 60px rgba(0,0,0,0.08)",
              }}
            >
              <p className={`font-['Space_Mono'] text-[8px] tracking-widest uppercase mb-2 ${isDark ? "text-white/30" : "text-black/30"}`}>
                Artist
              </p>
              <p className={`font-['Playfair_Display'] italic text-lg ${isDark ? "text-white/80" : "text-black/80"}`}>
                Priyanka Chandra
              </p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className={`font-['Space_Mono'] text-[10px] tracking-[0.4em] uppercase mb-6 flex items-center gap-3 ${
                isDark ? "text-white/35" : "text-black/35"
              }`}
            >
              <span className={`w-6 h-[1px] ${isDark ? "bg-white/25" : "bg-black/20"}`} />
              About
            </p>

            <h2
              className={`font-['Playfair_Display'] leading-[0.9] mb-10 ${isDark ? "text-white" : "text-black"}`}
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              <SplitText text="Making art with" delay={0.1} stagger={0.05} />
              <br />
              <SplitText text="intention, without" delay={0.35} stagger={0.05} className="italic" />
              <br />
              <SplitText text="certainty." delay={0.6} stagger={0.05} />
            </h2>

            <div
              className={`space-y-5 font-['Inter'] text-[15px] leading-[1.8] mb-12 ${
                isDark ? "text-white/50" : "text-black/50"
              }`}
            >
              {[
                "Priyanka Chandra is the artist behind mementomori arts — a practice rooted in the fleeting, the fragile, and the deeply human.",
                "Her work explores themes of memory, mortality, and meaning through painting and mixed media. Each piece is an original, made with intention and released into one collector's world.",
                "Every original comes with a signed certificate of authenticity and personal correspondence from the artist about the work's history.",
              ].map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.7 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-0 mb-10 pt-10 border-t ${
                isDark ? "border-white/8" : "border-black/8"
              }`}
            >
              {[
                { num: "80+", label: "Works Sold" },
                { num: "12", label: "Years Practice" },
                { num: "6", label: "Exhibitions" },
              ].map(({ num, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                  className={`pr-6 ${i > 0 ? `pl-6 border-l ${isDark ? "border-white/8" : "border-black/8"}` : ""}`}
                >
                  <p
                    className={`font-['Playfair_Display'] text-4xl mb-1 ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    <CountUp target={num} />
                  </p>
                  <p
                    className={`font-['Space_Mono'] text-[8px] tracking-widest uppercase ${
                      isDark ? "text-white/25" : "text-black/25"
                    }`}
                  >
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>

            <MagneticButton as="a" href="#contact" strength={0.3}>
              <span
                className={`inline-flex items-center gap-3 font-['Space_Mono'] text-[10px] tracking-widest uppercase border-b pb-0.5 transition-colors duration-300 ${
                  isDark
                    ? "text-white/50 border-white/20 hover:text-white hover:border-white"
                    : "text-black/45 border-black/20 hover:text-black hover:border-black"
                }`}
              >
                Get in touch
              </span>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
