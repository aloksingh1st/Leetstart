import { useEffect } from "react";
import { motion } from "framer-motion";

function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-emerald-600 hover:bg-emerald-500 focus:ring-4 focus:ring-emerald-400 focus:outline-none text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function StoryStyledLanding() {


  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Inject fogMove keyframes if not present
    if (!document.getElementById("fogMove-keyframes")) {
      const style = document.createElement("style");
      style.id = "fogMove-keyframes";
      style.textContent = `
        @keyframes fogMove {
          0% { background-position: 0 0; }
          100% { background-position: 1000px 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const sections = [
    {
      title: "Your Journey to DSA Mastery Begins Here.",
      subtitle:
        "LeetStart transforms your problem-solving skills with story-driven learning and real-time coding.",
      actions: ["Start Solving"],
      bg: "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950",
      textColor: "text-white",
    },
    {
      title: "The Problem Forest",
      subtitle:
        "Every coder starts in the forest of problems. But unlike others, you have a map.",
      bg: "bg-[url('/forest.jpg')] bg-cover bg-center",
      textColor: "text-white",
    },
    {
      title: "Open a Problem",
      subtitle: "Click a challenge, and you step into the zone.",
      bg: "bg-gradient-to-b from-slate-900 to-slate-950",
      textColor: "text-white",
    },
    {
      title: "Write Code. Live.",
      subtitle: "Write. Test. Iterate. All in one flow.",
      bg: "bg-gradient-to-r from-slate-800 via-teal-900 to-slate-800",
      textColor: "text-white",
    },
    {
      title: "The Victory Slide",
      subtitle: "With every correct submission, you level up.",
      bg: "bg-gradient-to-tr from-yellow-700 via-yellow-500 to-orange-400",
      textColor: "text-slate-900",
    },
    {
      title: "Join the Journey",
      subtitle:
        "Daily challenges, streaks, and a smart roadmap tailored for you.",
      button: "Start Now",
      bg: "bg-gradient-to-b from-emerald-700 to-emerald-900",
      textColor: "text-white",
    },
  ];

  return (
    <div className="scroll-smooth">
      {sections.map((section, index) => (
        <section
          key={index}
          className={`relative min-h-screen flex flex-col md:flex-row ${index % 2 === 0 ? "" : "md:flex-row-reverse"
            } justify-between items-center px-6 md:px-20 py-20 gap-12 overflow-hidden z-10 ${section.bg} ${section.textColor}`}
          aria-label={section.title}
        >
          {/* Fog overlay only on "The Problem Forest" */}
          {section.title === "The Problem Forest" && (
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "url('https://i.ibb.co/5LzZpGq/fog-texture.png') repeat-x",
                opacity: 0.15,
                animation: "fogMove 60s linear infinite",
                filter: "blur(8px)",
                zIndex: 1,
              }}
            />
          )}

          {/* Dynamic Light Overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.08), transparent 60%)",
              zIndex: 0,
            }}
          />

          {/* Text Section */}
          <div className="flex-1 relative z-10 max-w-xl">
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: index % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {section.title}
            </motion.h2>

            {section.subtitle && (
              <motion.p
                className="text-lg md:text-xl mt-4 mb-8 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {section.subtitle}
              </motion.p>
            )}

            {/* Actions */}
            {section.actions && (
              <motion.div
                className="flex flex-wrap gap-4 justify-center md:justify-start"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {section.actions.map((label, i) => (
                  <Button key={i}>{label}</Button>
                ))}
              </motion.div>
            )}

            {/* Single Button */}
            {section.button && (
              <motion.div
                className="mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Button>{section.button}</Button>
              </motion.div>
            )}
          </div>

          {/* Image Section */}
          <motion.div
            className="flex justify-center items-center flex-1 relative z-10"
            initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={`https://source.unsplash.com/400x400/?coding,technology,abstract&sig=${index}`}
              alt={`${section.title} illustration`}
              className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-3xl shadow-2xl brightness-90 transition-transform duration-300 hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </section>
      ))}

      {/* CSS Keyframes for fog animation */}
      <style>{`
        @keyframes fogMove {
          0% {
            background-position-x: 0;
          }
          100% {
            background-position-x: 1000px;
          }
        }
      `}</style>
    </div>
  );
}
