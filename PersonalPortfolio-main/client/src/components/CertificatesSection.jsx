import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CertificatesSection = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Helper to derive a human title from image filename
  const titleFromPath = (path) => {
    if (!path) return null;
    try {
      const base = path 
        .split("/")
        .pop()
        .replace(/\.[^.]+$/, "");
      return base
        .replace(/[\-_]+/g, " ")
        .replace(/\b\w/g, (m) => m.toUpperCase());
    } catch (_) {
      return null;
    }
  };

  const certificates = [
    {
      id: 1,
      title: "Google Project Management",
      issuer: "Google",
      issuedOn: "2025-04-07",
   
      hasImage: true,
      imagePath: "/certs/ProjectManagement.jpg",
      verificationLink:
        "https://coursera.org/verify/professional-cert/Z477NAMJR8EM",
    },
    {
      id: 2,
      title: "AWS Cloud Practitioner Essentials",
      issuer: "AWS",
      issuedOn: "2025-03-16",
      hasImage: true,
      imagePath: "/certs/AWS.jpg",
     
    },
    {
      id: 3,
      title: "Introduction to Generative AI",
      issuer: "Google Cloud",
      issuedOn: "2025-04-03",
     
      hasImage: true,
      imagePath: "/certs/Ai.jpg",
      verificationLink:
        "https://coursera.org/verify/5RA4C1X9FM25 ",
    },
    {
      id: 4,
      title: "Machine Learning with Python",
      issuer: "IBM",
      issuedOn: "2025-08-23",
      
      hasImage: true,
      imagePath: "/certs/ML.jpg",
      verificationLink:
        "https://coursera.org/verify/A2MSWA0I3KM5 ",
    },
    {
      id: 5,
      title: "Foundation of User Experience",
      issuer: "Google",
      issuedOn: "2025-08-07",
    
      hasImage: true,
      imagePath: "/certs/ux.jpg",
      verificationLink: "https://coursera.org/verify/57MDGCPTIB5V",
    },
   
  ];

  const handleViewCertificate = (certificate) => {
    // Always open live image modal; external link remains available inside modal as a secondary action
    setSelectedCertificate(certificate);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gray-100/90 dark:bg-gray-800/60 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-300 dark:border-gray-700"
          >
            {/* Banner with Title (uniform white) */}
            <div className="w-full h-16 rounded-lg mb-4 bg-white dark:bg-white text-center flex items-center justify-center px-3 overflow-hidden border border-primary/20">
              <h3 className="text-sm md:text-base font-semibold text-black dark:text-black line-clamp-2 w-full">
                {cert.title}
              </h3>
            </div>

            {/* Issuer, Issued Date, Credential ID */}
            <div className="text-center mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {cert.issuer}
              </p>
              {cert.issuedOn && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Issued{" "}
                  {new Date(cert.issuedOn).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                  })}
                </p>
              )}
              {cert.credentialId && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Credential ID:{" "}
                  <span className="font-mono">{cert.credentialId}</span>
                </p>
              )}
              {cert.verificationLink && (
                <a
                  href={cert.verificationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-primary underline underline-offset-4 hover:opacity-80"
                >
                  Verify Credential
                </a>
              )}
            </div>

            {/* View Certificate Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleViewCertificate(cert)}
              className="w-full py-2 px-4 text-primary font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border border-gray-300 bg-gray-100/90 dark:text-white dark:border-gray-700 dark:bg-gray-800/60"
            >
              <span>View Certificate</span>
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
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
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
              >
                ✕
              </button>

              {/* Certificate Image */}
              <div className="p-4">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {selectedCertificate.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedCertificate.issuer}
                    {selectedCertificate.issuedOn && (
                      <>
                        {" "}
                        • Issued{" "}
                        {new Date(
                          selectedCertificate.issuedOn
                        ).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                        })}
                      </>
                    )}
                    {selectedCertificate.credentialId && (
                      <>
                        {" "}
                        • ID:{" "}
                        <span className="font-mono">
                          {selectedCertificate.credentialId}
                        </span>
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <img
                    src={selectedCertificate.imagePath}
                    alt={selectedCertificate.title}
                    className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  <div
                    className="hidden flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-700 rounded-lg"
                    style={{ display: "none" }}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-4">📄</div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Certificate image not found
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                        {selectedCertificate.imagePath}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedCertificate.verificationLink && (
                  <div className="text-center mt-4">
                    <a
                      href={selectedCertificate.verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary/50 text-primary hover:scale-105 transition-transform"
                    >
                      Open Verification
                      <span>🔗</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificatesSection;
