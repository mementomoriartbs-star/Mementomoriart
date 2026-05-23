import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  "data-cursor-label"?: string;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.35,
  as: Tag = "button",
  href,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const sharedProps = {
    className,
    onClick,
    ...(Tag === "a" ? { href } : {}),
    ...props,
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      className="inline-block"
    >
      <motion.div style={{ x: springX, y: springY }}>
        {Tag === "a" ? (
          <a {...(sharedProps as any)}>{children}</a>
        ) : (
          <button type="button" {...(sharedProps as any)}>{children}</button>
        )}
      </motion.div>
    </div>
  );
}
