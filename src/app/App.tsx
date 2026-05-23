import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Toaster, toast } from "sonner";

import { SmoothScroll } from "./components/SmoothScroll";
import { CustomCursor } from "./components/CustomCursor";
import { PageLoader } from "./components/PageLoader";
import { GrainOverlay } from "./components/GrainOverlay";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { MarqueeStrip } from "./components/MarqueeStrip";
import { Gallery } from "./components/Gallery";
import { About } from "./components/About";
import { Process } from "./components/Process";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ArtPiece } from "./components/ArtCard";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [loaded, setLoaded] = useState(false);
  const [prefillPiece, setPrefillPiece] = useState<string | undefined>();
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.cursor = "none";
    return () => { document.documentElement.style.cursor = ""; };
  }, []);

  const toggleTheme = () => setTheme((p) => (p === "light" ? "dark" : "light"));

  const handleEnquire = (piece: ArtPiece) => {
    setPrefillPiece(undefined);
    requestAnimationFrame(() => setPrefillPiece(piece.title));
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
    toast.success(`Enquiring about "${piece.title}" — scroll down to send your message.`);
  };

  const isDark = theme === "dark";

  return (
    <SmoothScroll>
      <div
        style={{
          backgroundColor: isDark ? "#000" : "#fff",
          minHeight: "100vh",
        }}
      >
        <GrainOverlay opacity={isDark ? 0.04 : 0.025} />
        <CustomCursor theme={theme} />

        <AnimatePresence>
          {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}
        </AnimatePresence>

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: isDark ? "#111" : "#fff",
              color: isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.08)",
              fontFamily: "Space Mono, monospace",
              fontSize: "11px",
              letterSpacing: "0.06em",
              borderRadius: "0",
              boxShadow: isDark
                ? "0 20px 60px rgba(0,0,0,0.6)"
                : "0 20px 60px rgba(0,0,0,0.1)",
            },
          }}
        />

        <AnimatePresence>
          {loaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Navbar theme={theme} onToggleTheme={toggleTheme} />
              <Hero theme={theme} />
              <MarqueeStrip theme={theme} />
              <Gallery theme={theme} onEnquire={handleEnquire} />
              <About theme={theme} />
              <Process theme={theme} />
              <div ref={contactRef}>
                <Contact theme={theme} prefillPiece={prefillPiece} />
              </div>
              <Footer theme={theme} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SmoothScroll>
  );
}
