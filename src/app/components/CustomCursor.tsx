import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface CustomCursorProps {
  theme: "light" | "dark";
}

export function CustomCursor({ theme }: CustomCursorProps) {
  const isDark = theme === "dark";
  const [hoveringLink, setHoveringLink] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [label, setLabel] = useState("");

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Dot — very snappy, almost instant
  const dotX = useSpring(mouseX, { stiffness: 900, damping: 55, mass: 0.2 });
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 55, mass: 0.2 });

  // Ring — silky lag behind
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 30, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 30, mass: 0.6 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setHidden(false);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor], input, textarea");
      if (interactive) {
        setHoveringLink(true);
        const el = interactive as HTMLElement;
        setLabel(el.getAttribute("data-cursor-label") || "");
      } else {
        setHoveringLink(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, [mouseX, mouseY]);

  const color = isDark ? "255,255,255" : "0,0,0";

  return (
    <>
      {/* Outer ring — lags smoothly */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full border flex items-center justify-center"
        style={{
          left: ringX,
          top: ringY,
          x: "-50%",
          y: "-50%",
          borderColor: `rgba(${color}, ${hoveringLink ? 0.7 : 0.3})`,
        } as any}
        animate={{
          width: hoveringLink ? 60 : clicking ? 20 : 38,
          height: hoveringLink ? 60 : clicking ? 20 : 38,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {label && (
          <span
            className="text-[7px] tracking-widest uppercase whitespace-nowrap select-none"
            style={{ fontFamily: "Space Mono, monospace", color: `rgba(${color},0.9)` }}
          >
            {label}
          </span>
        )}
      </motion.div>

      {/* Inner dot — near-instant */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          left: dotX,
          top: dotY,
          x: "-50%",
          y: "-50%",
          backgroundColor: `rgba(${color},1)`,
        } as any}
        animate={{
          width: hoveringLink ? 5 : clicking ? 12 : 5,
          height: hoveringLink ? 5 : clicking ? 12 : 5,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      />
    </>
  );
}
