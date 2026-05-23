import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SplitText } from "./SplitText";

interface ProcessProps {
  theme: "light" | "dark";
}

const steps = [
  {
    num: "01",
    title: "Acquire",
    desc: "Browse the current collection. Each piece is a one-of-a-kind original. Click any work to see full details, dimensions, and provenance notes.",
  },
  {
    num: "02",
    title: "Enquire",
    desc: "Add to cart and proceed to enquiry. I respond personally to every collector within 48 hours to discuss the work, shipping, and any questions.",
  },
  {
    num: "03",
    title: "Receive",
    desc: "Works are carefully wrapped and shipped with full insurance. Every piece arrives with documentation, provenance, and a signed letter from me.",
  },
];

export function Process({ theme }: ProcessProps) {
  const isDark = theme === "dark";
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true });

  return (
    <section
      id="process"
      className="py-32 transition-colors duration-500 overflow-hidden"
      style={{ backgroundColor: isDark ? "#000" : "#fff" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`font-['Space_Mono'] text-[10px] tracking-[0.4em] uppercase mb-5 flex items-center gap-3 ${
              isDark ? "text-white/35" : "text-black/35"
            }`}
          >
            <span className={`w-6 h-[1px] ${isDark ? "bg-white/25" : "bg-black/20"}`} />
            How it works
          </motion.p>
          <h2
            className={`font-['Playfair_Display'] ${isDark ? "text-white" : "text-black"}`}
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.9 }}
          >
            <SplitText text="The process" delay={0.1} stagger={0.06} />
          </h2>
        </div>

        {/* Animated horizontal rule */}
        <div ref={lineRef} className={`h-[1px] mb-0 ${isDark ? "bg-white/6" : "bg-black/6"}`}>
          <motion.div
            className={`h-full ${isDark ? "bg-white/20" : "bg-black/15"}`}
            animate={{ scaleX: lineInView ? 1 : 0 }}
            initial={{ scaleX: 0 }}
            style={{ transformOrigin: "left" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.14, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={`group pt-10 pb-12 pr-8 border-b md:border-b-0 md:border-r last:border-r-0 transition-colors duration-500 ${
                isDark ? "border-white/6" : "border-black/6"
              } ${i > 0 ? "pl-0 md:pl-10" : ""}`}
            >
              <span
                className={`block font-['Space_Mono'] text-[9px] tracking-[0.3em] uppercase mb-8 transition-colors duration-300 ${
                  isDark
                    ? "text-white/20 group-hover:text-white/40"
                    : "text-black/20 group-hover:text-black/40"
                }`}
              >
                {step.num}
              </span>

              <motion.div
                className={`w-8 h-[1px] mb-8 transition-all duration-500 group-hover:w-16 ${
                  isDark ? "bg-white/20" : "bg-black/15"
                }`}
              />

              <h3
                className={`font-['Playfair_Display'] text-3xl mb-5 transition-colors duration-300 ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`font-['Inter'] text-[14px] leading-[1.8] ${
                  isDark ? "text-white/40" : "text-black/45"
                }`}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
