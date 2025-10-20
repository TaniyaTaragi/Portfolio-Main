import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AchievementsSection = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const achievements = [
    {
  id: 1,
  title: "Webathon 3.0 Winner",
  issuer: "Graphic Era Hill University, Haldwani",
  issuedOn: "2025-08-21",
  imagePath: "/images/webathon.JPG",
  description: "Team WebHeads secured 1st position among 30+ teams in Webathon 3.0, an intercampus web designing competition, winning a cash prize of ₹4,000.",

},
{
  id: 2,
  title: "Academic Topper (2024 & 2025)",
  issuer: "Graphic Era Deemed To Be University, Dehradun",
  issuedOn: "2025-04-15",
  imagePath: "/images/AchieversMeet.jpg",
  description:
    "Recognized as the Academic Topper for the years 2024 and 2025 for achieving the highest SGPA of 9.91 in the B.Tech Computer Science and Engineering program.",
},
    
   {
  id: 3,
  title: "Coding Competition Winner",
  issuer: "Graphic Era Hill University, Haldwani",
  issuedOn: "2025-08-23",
  imagePath: "/images/CodingComp.JPG",
  description:
    "Secured 1st position in a university-level coding competition by demonstrating strong problem-solving and algorithmic skills.",
},
 {
  id: 4,
  title: "Tech Club Leadership",
  issuer: "Graphic Era Hill University, Tech Club",
  issuedOn: "2024-06-05",
  imagePath: "/images/techclub.jpg",
  description:
    "Organized various coding competitions, hackathons, and tech events as part of the university’s Tech Club, fostering innovation and teamwork among students.",
},
{
  id: 5,
  title: "Anchoring & Public Speaking Recognition",
  issuer: "ARIES Nainital",
  issuedOn: "2024-02-28",
  imagePath: "/images/SpeechComp.jpg",
  description:
    "Recognized for excellent communication, stage presence, and public speaking skills during a speech competition at ARIES Nainital.",
},

  ];

  const openModal = (achievement) => setSelectedAchievement(achievement);
  const closeModal = () => setSelectedAchievement(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach, index) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="max-w-sm rounded-lg overflow-hidden shadow-lg m-2 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-gray-200 dark:bg-gray-800 flex flex-col"
          >
            {/* Image */}
            {ach.imagePath ? (
              <img
                src={ach.imagePath}
                alt={ach.title}
                className="w-full h-40 object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              <div className="flex items-center justify-center h-40 w-full bg-gray-100 dark:bg-gray-700">
                <span className="text-5xl">🏆</span>
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col flex-1 px-4 py-3">
              <div className="font-bold text-xl mb-1 text-gray-900 dark:text-white">
                {ach.title}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                {ach.issuer}
              </p>
              {ach.issuedOn && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Issued{" "}
                  {new Date(ach.issuedOn).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                  })}
                </p>
              )}

              {ach.description && (
                <p className="text-base text-gray-800 dark:text-gray-300 flex-1">
                  {ach.description.length > 100
                    ? ach.description.slice(0, 100) + "..."
                    : ach.description}
                </p>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal(ach)}
                className="mt-3 w-full py-2 px-4 text-primary font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border border-gray-300 bg-gray-100/90 dark:text-white dark:border-gray-700 dark:bg-gray-800/60"
              >
                View Achievement
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
              >
                ✕
              </button>

              <div className="p-1 flex flex-col items-center">
                <h3 className="text-2xl font-bold text-primary mb-2 text-center">
                  {selectedAchievement.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
                  {selectedAchievement.issuer} • Issued{" "}
                  {new Date(selectedAchievement.issuedOn).toLocaleDateString(
                    undefined,
                    { year: "numeric", month: "short" }
                  )}
                </p>

                {selectedAchievement.imagePath ? (
                  <img
                    src={selectedAchievement.imagePath}
                    alt={selectedAchievement.title}
                    className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-lg mb-4"
                  />
                ) : (
                  <div className="flex items-center justify-center h-64 w-full bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🏆</div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Achievement image not available
                      </p>
                    </div>
                  </div>
                )}

                <p className="text-center text-gray-700 dark:text-gray-300 px-6">
                  {selectedAchievement.description}
                </p>
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AchievementsSection;
