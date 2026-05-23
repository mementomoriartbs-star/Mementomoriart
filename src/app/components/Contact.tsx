import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Send } from "lucide-react";
import { SplitText } from "./SplitText";
import { MagneticButton } from "./MagneticButton";

// ─── Web3Forms ───────────────────────────────────────────────────────────────
// 1. Go to https://web3forms.com
// 2. Enter Priyanka's Gmail address and click "Create Access Key"
// 3. Replace the string below with the key you receive
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
// ─────────────────────────────────────────────────────────────────────────────

interface ContactProps {
  theme: "light" | "dark";
  prefillPiece?: string;
}

type Status = "idle" | "sending" | "sent" | "error";

export function Contact({ theme, prefillPiece }: ContactProps) {
  const isDark = theme === "dark";
  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: prefillPiece
      ? `Hi Priyanka, I'm interested in enquiring about "${prefillPiece}".`
      : "",
  });

  useEffect(() => {
    if (prefillPiece) {
      setForm(prev => ({
        ...prev,
        message: `Hi Priyanka, I'm interested in enquiring about "${prefillPiece}".`,
      }));
    }
  }, [prefillPiece]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Enquiry from ${form.name} — mementomori arts`,
          from_name: "mementomori arts website",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field: string) =>
    `w-full px-0 py-4 bg-transparent border-0 border-b outline-none font-['Inter'] text-sm transition-all duration-400 ${
      isDark
        ? `text-white placeholder:text-white/20 ${focused === field ? "border-white/50" : "border-white/12"}`
        : `text-black placeholder:text-black/20 ${focused === field ? "border-black/50" : "border-black/12"}`
    }`;

  return (
    <section
      id="contact"
      className="py-32 overflow-hidden"
      style={{ backgroundColor: isDark ? "#080808" : "#f2f2ef" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`font-['Space_Mono'] text-[10px] tracking-[0.4em] uppercase mb-6 flex items-center gap-3 ${
                isDark ? "text-white/35" : "text-black/35"
              }`}
            >
              <span className={`w-6 h-[1px] ${isDark ? "bg-white/25" : "bg-black/20"}`} />
              Enquiry
            </motion.p>

            <h2
              className={`font-['Playfair_Display'] leading-[0.9] mb-10 ${isDark ? "text-white" : "text-black"}`}
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
            >
              <SplitText text="Let's talk" delay={0.1} stagger={0.06} />
              <br />
              <SplitText text="about a piece." delay={0.35} stagger={0.06} className="italic" />
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className={`font-['Inter'] text-[15px] leading-[1.8] max-w-sm mb-14 ${
                isDark ? "text-white/45" : "text-black/45"
              }`}
            >
              Whether you have a specific work in mind or want to commission something new,
              I'm happy to have a conversation. I respond to every message personally.
            </motion.p>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className={`space-y-6 pt-10 border-t ${isDark ? "border-white/8" : "border-black/8"}`}
            >
              {[
                { label: "Artist", value: "Priyanka Chandra" },
                { label: "Instagram", value: "@mementomori_in" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-6">
                  <span
                    className={`font-['Space_Mono'] text-[8px] tracking-widest uppercase pt-0.5 w-16 shrink-0 ${
                      isDark ? "text-white/25" : "text-black/25"
                    }`}
                  >
                    {label}
                  </span>
                  <span className={`font-['Inter'] text-sm ${isDark ? "text-white/60" : "text-black/60"}`}>
                    {value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="pt-2 lg:pt-14"
          >
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-start justify-center h-full"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "3rem" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`h-[1px] mb-8 ${isDark ? "bg-white/40" : "bg-black/30"}`}
                />
                <p className={`font-['Playfair_Display'] text-4xl italic mb-4 ${isDark ? "text-white" : "text-black"}`}>
                  Thank you.
                </p>
                <p className={`font-['Inter'] text-sm leading-relaxed ${isDark ? "text-white/45" : "text-black/45"}`}>
                  Priyanka will be in touch within 48 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {[
                  { key: "name", label: "Your name", type: "text" },
                  { key: "email", label: "Email address", type: "email" },
                ].map(({ key, label, type }) => (
                  <div key={key} className="relative">
                    <input
                      type={type}
                      className={inputClass(key)}
                      placeholder={label}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      onFocus={() => setFocused(key)}
                      onBlur={() => setFocused(null)}
                      required
                    />
                  </div>
                ))}
                <div className="relative">
                  <textarea
                    className={`${inputClass("message")} resize-none`}
                    rows={5}
                    placeholder="Which piece are you interested in? Or tell me what you're looking for..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    required
                  />
                </div>

                {status === "error" && (
                  <p className="font-['Space_Mono'] text-[10px] tracking-wider text-red-500">
                    Something went wrong. Please try again or reach out on Instagram.
                  </p>
                )}

                <MagneticButton as="button" strength={0.3}>
                  <motion.div
                    whileHover={{ gap: "1.2rem" }}
                    className={`flex items-center gap-4 px-9 py-4 font-['Space_Mono'] text-[10px] tracking-widest uppercase transition-colors ${
                      isDark
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-black text-white hover:bg-black/85"
                    } ${status === "sending" ? "opacity-60 pointer-events-none" : ""}`}
                  >
                    {status === "sending" ? "Sending…" : "Send Enquiry"}
                    <Send size={12} />
                  </motion.div>
                </MagneticButton>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
