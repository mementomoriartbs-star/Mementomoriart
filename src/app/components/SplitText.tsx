import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  type?: "words" | "chars";
  once?: boolean;
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
  type = "words",
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });
  const units = type === "words" ? text.split(" ") : text.split("");

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`} aria-label={text}>
      {units.map((unit, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          aria-hidden
          style={{ marginRight: type === "words" ? "0.25em" : undefined }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.75,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {unit === " " ? " " : unit}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
