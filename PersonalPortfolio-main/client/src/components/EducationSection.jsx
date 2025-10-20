import { motion } from "framer-motion";

const educationEntries = [
 {
  institution:"Graphic Era Hill University, Haldwani",
  degree: "B.Tech in Computer Science and Engineering",
  period: "2023 — 2027",
  logo: "/images/gehu.jpeg",
  details: [

    "Currently pursuing B.Tech in Computer Science and Engineering with a CGPA of 9.8.",
     "Actively building expertise in Web Development and Machine Learning through practical projects and hands-on learning."
  ],
},
{
  institution: "The Masters Senior Secondary School, Haldwani",
  degree: "Senior Secondary (Class 12th)",
  period: "2022 — 2023",
  logo: "/images/masters.jpeg",
  details: [
    "Completed Class 12 with a score of 95.6%, ranked among the top 20 in Nainital.",
    "Demonstrated strong academic performance and consistent results."
  ],
},
  {
  institution: "The Masters Senior Secondary School, Haldwani",
  degree: "Secondary (Class 10th)",
  period: "2021 — 2022",
  logo: "/images/masters.jpeg",
  details: [
    "Completed Class 10 with an overall score of 96%, achieving distinction in all subjects.",
    "Built a strong academic foundation."
  ],
}

];

export default function EducationSection() {
  return (
    <div className="relative px-4 md:px-8 my-8">
      {/* Vertical timeline line */}
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-[color-mix(in_srgb,var(--accent)_50%,transparent)]" />

      <motion.ul
        className="space-y-12 ml-12 md:ml-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        role="list"
        aria-label="Education timeline"
      >
        {educationEntries.map((edu, idx) => (
          <motion.li
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
            className="relative card-surface p-4 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-6 md:-left-8 top-6 w-3 h-3 rounded-full bg-accent timeline-dot" />

            <div className="flex justify-between items-start">
              {/* Left: Degree */}
              <div>
                <h4 className="text-lg font-semibold text-primary">{edu.degree}</h4>
                <ul className="list-disc list-inside mt-3 space-y-1 text-sm text-secondary">
                  {edu.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              {/* Right: Institution, period, logo */}
              <div className="flex flex-col items-end text-right">
                <p className="text-secondary text-sm font-medium whitespace-nowrap">{edu.institution}</p>
                <p className="text-secondary text-sm mt-1">{edu.period}</p>
                {edu.logo && (
                  <img
                    src={edu.logo}
                    alt={`${edu.institution} logo`}
                    className="w-12 h-12 object-contain rounded-full border border-gray-300 dark:border-gray-700 mt-2"
                  />
                )}
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
