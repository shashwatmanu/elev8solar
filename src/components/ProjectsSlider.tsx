"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

const projectFiles = [
  { src: "/Projects/dlf.mp4", type: "video" },
  { src: "/Projects/Hyderabad.mp4", type: "video" },
  { src: "/Projects/neemrana.mp4", type: "video" },
  { src: "/Projects/raibareli.mp4", type: "video" },
];

export default function ProjectsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectFiles.length);
    }, 12000); // Change slide every 12 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] bg-transparent overflow-hidden flex items-center justify-center border-t border-white/5 pt-20 pb-20">
      
      {/* Masked Video Container to blend cleanly into the global background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)" }}
      >
        <AnimatePresence mode="popLayout">
          {projectFiles.map((file, index) => (
            index === currentIndex && (
              <motion.div
                key={file.src}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {file.type === "video" ? (
                  <video 
                    src={file.src} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover opacity-[0.85] mix-blend-screen"
                  />
                ) : (
                  <img 
                    src={file.src} 
                    alt="Elev8 Solar Project" 
                    className="w-full h-full object-cover opacity-[0.85] mix-blend-screen"
                  />
                )}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-light text-white mb-6 drop-shadow-xl">
            Powering the <span className="font-bold text-accent">Future</span>.
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 drop-shadow-md">
            Explore our vast portfolio of utility-scale, commercial, and off-grid solar installations across the country.
          </p>
          <MagneticButton>
            <Link href="/projects" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold tracking-widest uppercase rounded-full hover:bg-accent transition-all group">
              View All Projects
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
        {projectFiles.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-8 bg-accent" : "w-3 bg-white/30"}`}
          />
        ))}
      </div>
    </section>
  );
}
