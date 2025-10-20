import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";
import Section from "./components/Section";
import Background from "./components/Background";
import TypingText from "./components/TypingText";
import ExperienceTimeline from "./components/ExperienceTimeline";
import SectionAnimation from "./components/SectionAnimation";
import ProjectCard from "./components/ProjectCard";
import CertificatesSection from "./components/CertificatesSection";
import EducationSection from "./components/EducationSection";
import AchievementsSection from "./components/AchievementsSection.jsx";
const backendUrl = "http://localhost:5000";
export default function App() {
  const myPhoto = "/images/myPhoto.jpg"; // Fixed path
  const dummyImage = "/images/myPhoto.jpg"; // Fixed path
  const [showLatestWork, setShowLatestWork] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return false;
  });
  const [views, setViews] = useState(null);
  const [projectColumns, setProjectColumns] = useState(1);
  const modalScrollRef = useRef(null);
  const [pullOffset, setPullOffset] = useState(0);
  const readyToCloseRef = useRef(false);
  const projects = useMemo(
    () => [
      {
        title: "Cloud-Based-Blood-Management-System",
        desc: "This group project was developed for the Cloud Computing and Virtualization course during our B.Tech at Graphic Era Hill University. It showcases a cloud-based web app using AWS EC2, highlighting scalability, availability, and cloud resource provisioning.",
        image: "/images/CloudBasedPro.png",
        github: "https://github.com/TaniyaTaragi/Cloud-Based-Blood-Management-System",
        tech: ["HTML", "Css", "JavaScript", "PHP","MySQL"],
      },
      {
        title: "HuffMin",
        desc: "Huffmin is a browser-based file compression tool using Huffman Coding. It supports compressing and decompressing various file types (JPG, PNG, PDFs, binaries) entirely in-browser, with no external software or server needed. Fast, efficient, and privacy-friendly.",
        image: "/images/huffmin.png",
        github: "https://github.com/TaniyaTaragi/Huffmin",
        tech: [
          "HTML",
          "Css",
          "JavaScript",
        ],
      },
      {
        title: "UI-UX-Library",
        desc: "GRID GURU is a simple, fast, and flexible CSS UI library that helps developers build modern, responsive web interfaces with ease. Inspired by Tailwind CSS and Bootstrap, it focuses on performance, simplicity, and customization without unnecessary complexity.",
        image: "/images/uiux.png",
        github: "https://github.com/TaniyaTaragi/UI-UX-Library",
        tech: ["HTML","Css","JavaScript","Python"],
      },
      {
        title: "Webathon-Project",
        desc: "A collaborative web project built during Webathon, featuring responsive design, creative UI/UX, and innovative functionality to showcase teamwork, coding skills, and modern web development practices.",
        image: "/images/webathon.png",
        github: "https://github.com/TaniyaTaragi/Webathon1",
        tech: ["HTML", "CSS", "JavaScript"],
      },
      {
        title: "DSA-prep",
        desc: "Welcome to my DSA Practice Repository! I’m solving problems daily in C++, following Striver’s A2Z DSA Sheet, structured topic-wise with clean and beginner-friendly code.",
        image: "/images/dsa.png",
        github: "https://github.com/TaniyaTaragi/DSA-prep",
        tech: [
          "C++",
        ],
      },
    ],
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch(`${backendUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      alert("Form submitted successfully! Your message has been sent.");
      form.reset();
    } catch (err) {
      alert("Sorry, something went wrong. Please try again later.");
    }
  };

  // Disable page scroll while modal is open and handle Escape to close
  useEffect(() => {
    if (showLatestWork) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKeyDown = (e) => {
        if (e.key === "Escape") setShowLatestWork(false);
      };
      window.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [showLatestWork]);

  // No scroll-based pagination now; render all projects.

  // Pull-to-close behavior on modal: overscroll at top to close (touch and wheel)
  useEffect(() => {
    if (!showLatestWork) return;
    const el = modalScrollRef.current;
    if (!el) return;

    const getThreshold = () =>
      Math.max(160, Math.floor(el.clientHeight * 0.33));
    let startY = 0;
    let trackingTouch = false;
    let atTopAtStart = false;
    let touchStartTime = 0;
    let wheelAccum = 0;
    let wheelTimer = null;
    let topIdleTimer = null;

    // Become "ready" only after being idle at the top briefly
    const handleScroll = () => {
      if (el.scrollTop === 0) {
        if (topIdleTimer) clearTimeout(topIdleTimer);
        topIdleTimer = setTimeout(() => {
          readyToCloseRef.current = true;
        }, 200);
      } else {
        readyToCloseRef.current = false;
        if (topIdleTimer) {
          clearTimeout(topIdleTimer);
          topIdleTimer = null;
        }
      }
    };
    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    const onTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        atTopAtStart = el.scrollTop <= 0 && readyToCloseRef.current;
        trackingTouch = atTopAtStart;
        startY = e.touches[0].clientY;
        touchStartTime = Date.now();
        setPullOffset(0);
      }
    };
    const onTouchMove = (e) => {
      if (!trackingTouch) return;
      if (e.touches && e.touches.length > 0) {
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;
        const elapsed = Date.now() - touchStartTime;
        if (deltaY > 0) {
          const clamped = Math.min(deltaY, getThreshold() * 1.2);
          setPullOffset(clamped);
        } else {
          setPullOffset(0);
        }
        if (
          atTopAtStart &&
          readyToCloseRef.current &&
          el.scrollTop <= 0 &&
          deltaY > getThreshold() &&
          elapsed < 700
        ) {
          setShowLatestWork(false);
        }
      }
    };
    const onTouchEnd = () => {
      trackingTouch = false;
      startY = 0;
      atTopAtStart = false;
      // Snap back
      setPullOffset(0);
    };
    const onWheel = (e) => {
      // Only accumulate quick successive upward deltas while at the very top
      if (readyToCloseRef.current && el.scrollTop <= 0 && e.deltaY < 0) {
        wheelAccum += -e.deltaY;
        // Visual stretch on wheel pull
        const clamped = Math.min(wheelAccum, getThreshold() * 1.2);
        setPullOffset(clamped);
        if (wheelTimer) clearTimeout(wheelTimer);
        wheelTimer = setTimeout(() => {
          wheelAccum = 0;
          setPullOffset(0);
        }, 250);
        if (wheelAccum > getThreshold()) {
          setShowLatestWork(false);
          wheelAccum = 0;
          if (wheelTimer) {
            clearTimeout(wheelTimer);
            wheelTimer = null;
          }
          setPullOffset(0);
        }
      } else {
        wheelAccum = 0;
        setPullOffset(0);
        if (wheelTimer) {
          clearTimeout(wheelTimer);
          wheelTimer = null;
        }
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", handleScroll);
      if (topIdleTimer) clearTimeout(topIdleTimer);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, [showLatestWork]);

  // Dark mode effect
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Views: increment and fetch on load
  useEffect(() => {
    async function incrementAndFetch() {
      try {
        await fetch(`${backendUrl}/api/views/increment`, { method: "POST" });
        const res = await fetch(`${backendUrl}/api/views`);
        const data = await res.json();
        if (typeof data.count === "number") setViews(data.count);
      } catch (e) {}
    }
    incrementAndFetch();
  }, []);

  return (
    <div>
      <Background />

      {/* Top-right controls: theme toggle and views */}
      <div className="fixed top-3 right-3 z-40 flex items-center gap-3 px-3 py-2 rounded-md backdrop-blur bg-white/40 dark:bg-gray-800/40">
        <button
          onClick={() => setIsDark(!isDark)}
          className="px-2 py-1 rounded-md transition-colors"
          aria-label="Toggle color theme"
          style={{ border: "none", boxShadow: "none" }}
        >
          {isDark ? "🌞" : "🌙"}
        </button>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded"
          style={{ color: "var(--text)", backgroundColor: "transparent" }}
        >
          Views: {views ?? "—"}
        </span>
      </div>

      {/* Hero Section */}
      <Section
        id="hero"
        className="w-full px-0 py-0 min-h-screen backdrop-blur-lg"
        style={{
          background: isDark
            ? "color-mix(in srgb, #1f2937 96%, #ef4444 4%)" // subtler red tint
            : "rgba(255,255,255,0.40)",
        }}
      >
        <SectionAnimation>
          <div className="m-0 w-full min-h-[70vh] flex flex-col items-center justify-center gap-4 px-6 md:px-12 text-center">
            <p className="text-2xl text-body">Hello, my name is</p>
            <h1 className="text-7xl md:text-9xl font-extrabold text-body">
              Taniya Taragi
            </h1>
            <p className="text-2xl text-body">And I am</p>

            <div className="text-3xl md:text-4xl font-medium text-primary w-full max-w-5xl typing-text">
              <TypingText
                phrases={[
                  "Full Stack Developer",
                  "Open Source Contributor",
                  "Exploring AI And Machine Learning",
                  "Building Scalable And Production Efficient Systems",
                  "Passionate About Learning & Improving Everyday",
                ]}
              />
            </div>

            <div className="mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-cta"
                onClick={() => setShowLatestWork(true)}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                Latest Work
              </motion.button>
            </div>
          </div>
        </SectionAnimation>
      </Section>

      {/* All other sections removed; homepage only as requested */}

      {/* Latest Work Modal */}
      <AnimatePresence mode="wait">
        {showLatestWork && (
          <motion.div
            key="latest-work-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 backdrop-blur-lg"
            style={{
              background: isDark
                ? "color-mix(in srgb, #1f2937 96%, #ef4444 4%)"
                : "rgba(255,255,255,0.40)",
            }}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              key="latest-work-card"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1,
              }}
              className="relative h-full w-full overflow-y-auto scroll-smooth no-scrollbar will-change-scroll"
              id="latest-work-scroll-root"
              ref={modalScrollRef}
            >
              {/* Pull-to-close hint */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs opacity-60 select-none">
                Pull down to close
              </div>

              {/* Modal Card container: desktop centered card, mobile full-screen */}
              <div className="min-h-full w-full px-4 py-8 sm:px-6 md:px-8">
                <motion.div
                  className="mx-auto max-w-7xl rounded-2xl p-8 shadow-lg shadow-black/30 backdrop-blur-lg origin-top transition-transform duration-150"
                  style={{
                    transform: `translateY(${pullOffset * 0.35}px) scaleY(${
                      1 + pullOffset / 1200
                    })`,
                    background: isDark
                      ? "color-mix(in srgb, rgba(31,41,55,0.50) 97%, rgba(239,68,68,0.50) 3%)"
                      : "rgba(255,255,255,0.50)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                >
                  <div className="space-y-20 md:space-y-28">
                    {/* Education Section */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.1 }}
  transition={{
    duration: 0.9,
    delay: 0.1,
    ease: "easeOut",
  }}
>
  <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center">
    Education
  </h2>
  <div className="mt-8">
    <EducationSection />
  </div>
</motion.div>
                    {/* Projects Section (first) */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                    >
                      <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center">
                        Projects
                      </h2>
                      <p className="mt-2 text-center text-sm md:text-base opacity-80">
                        A small collection of my recent work.
                      </p>
                      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((p, i) => (
                          <ProjectCard
                            key={i}
                            image={p.image}
                            title={p.title}
                            description={p.desc}
                            tech={p.tech}
                            githubLink={p.github}
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Experience Section
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center">
                        Work Experience
                      </h2>
                      <div className="mt-8">
                        <ExperienceTimeline />
                      </div>
                    </motion.div> */}

                {/* Technologies Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 1.0,
                        delay: 0.3,
                        ease: "easeOut",
                      }}
                    >
                      <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center">
                        Technical and Academic Skills
                      </h2>
                      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4 w-full">
                        {[
                          "C",
                          "C++",
                          "Java",
                          "HTML",
                          "Css",
                          "JavaScript",
                          "Tailwind Css",
                          "Bootstrap",
                          "Node.js",
                        "GitHub ",
                         
                         "Java",
                          "Git",
                          "Operating System",
                          "Data Structures",
                          "Database Management System",
                          "Design and Analysis of Algorithms",
                          "MySQL",
                          "MongoDB",
                        
                          "Postman",
                          
                          
                        ].map((skill, idx) => (
                          <div
                            key={idx}
                            className="h-16 flex items-center justify-center rounded-lg border border-gray-300 bg-gray-100/90 dark:border-gray-700 dark:bg-gray-800/60 text-sm font-medium hover:scale-105 transition-transform"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </motion.div>
{/* Certificates & Courses Section */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.1 }}
  transition={{
    duration: 0.9,
    delay: 0.2,
    ease: "easeOut",
  }}
>
  <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center">
    Certifications
  </h2>
  <p className="mt-2 text-center text-sm md:text-base opacity-80">
    Professional certifications and completed courses.
  </p>
  <div className="mt-8">
    <CertificatesSection />
  </div>
</motion.div>

{/* Achievements Section */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.1 }}
  transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
>
  <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center">
    Achievements
  </h2>
  <p className="mt-2 text-center text-sm md:text-base opacity-80">
    Recognitions, awards, and milestones I've earned so far.
  </p>
  <div className="mt-8">
    <AchievementsSection />
  </div>
</motion.div>




                    {/* LinkedIn Button Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                      className="flex justify-center"
                    >
                      <a
                        href="https://www.linkedin.com/in/taniya-taragi-479369326/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-12 md:px-16 py-4 rounded-lg border border-gray-300 bg-gray-100/90 dark:border-gray-700 dark:bg-gray-800/60 hover:scale-105 transition-transform text-primary font-semibold text-lg dark:text-white"
                      >
                        LinkedIn
                      </a>
                    </motion.div>

                    

                    {/* Contact Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center">
                        Contact
                      </h2>
                      <p className="mt-2 text-center text-base opacity-80">
                        Let's talk — fill out the form.
                      </p>
                      <div className="mt-8">
                        <form
                          onSubmit={handleSubmit}
                          className="max-w-2xl mx-auto flex flex-col gap-4 p-8 bg-white rounded-lg shadow-lg"
                        >
                          <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                            className="p-3 border rounded bg-gray-100/90 border-gray-300 dark:bg-white dark:border-gray-300 dark:text-gray-900"
                          />
                          <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            required
                            className="p-3 border rounded bg-gray-100/90 border-gray-300 dark:bg-white dark:border-gray-300 dark:text-gray-900"
                          />
                          <textarea
                            name="message"
                            placeholder="Your Message"
                            required
                            className="p-3 border rounded bg-gray-100/90 border-gray-300 dark:bg-white dark:border-gray-300 dark:text-gray-900"
                            rows="5"
                          ></textarea>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform dark:bg-gray-800/60 dark:text-white dark:border dark:border-primary/60"
                            style={{
                              background:
                                "color-mix(in srgb, var(--primary) 18%, #ffffff)",
                              color: "var(--primary)",
                              border:
                                "1px solid color-mix(in srgb, var(--primary) 45%, transparent)",
                            }}
                          >
                            Send Message
                          </button>
                        </form>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
