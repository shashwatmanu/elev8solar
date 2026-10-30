"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const StoryCanvas = dynamic(() => import("./StoryCanvas"), {
  ssr: false,
});

const projectFiles = [
  { src: "/Projects/dlf.mp4", type: "video" },
  { src: "/Projects/Hyderabad.mp4", type: "video" },
  { src: "/Projects/neemrana.mp4", type: "video" },
  { src: "/Projects/raibareli.mp4", type: "video" },
];

export default function ProjectsSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { margin: "100px 0px" });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only mount and load Three.js on desktop devices (width >= 1024px and fine pointer)
    const checkDesktop = () => {
      const isWide = window.innerWidth >= 1024;
      const isFinePointer = !window.matchMedia("(pointer: coarse)").matches;
      setIsDesktop(isWide && isFinePointer);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[75vh] md:min-h-[85vh] bg-transparent overflow-hidden flex items-center justify-center border-t border-white/5 py-24 md:py-32">
      {/* 3D Story Canvas Background - Desktop Only for Instant Mobile Speed */}
      {isDesktop ? (
        <div 
          className="absolute inset-0 z-0 opacity-90 pointer-events-none" 
          style={{ 
            maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)", 
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" 
          }}
        >
          <StoryCanvas active={inView} />
        </div>
      ) : (
        /* Sleek, lightweight atmospheric solar grid aura on mobile */
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[70vh] bg-gradient-to-tr from-accent/15 via-orange-500/10 to-transparent blur-[120px] rounded-full" />
          <div 
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #f59e0b 1px, transparent 1px),
                linear-gradient(to bottom, #f59e0b 1px, transparent 1px)
              `,
              backgroundSize: '2.5rem 2.5rem'
            }}
          />
        </div>
      )}

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-8 md:w-12 h-[2px] bg-accent"></div>
            <span className="text-accent font-bold tracking-[0.25em] uppercase text-xs">Our Portfolio</span>
            <div className="w-8 md:w-12 h-[2px] bg-accent"></div>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 drop-shadow-xl tracking-tight leading-none">
            Powering the <br className="sm:hidden" />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Future.</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 drop-shadow-md font-light leading-relaxed">
            Explore our extensive portfolio of utility-scale, commercial rooftops, and remote micro-grids engineered across the country.
          </p>

          <MagneticButton>
            <Link 
              href="/projects" 
              className="group relative px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white text-black font-bold tracking-[0.2em] uppercase text-xs overflow-hidden inline-flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-2xl"
            >
              <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <span className="relative z-10 flex items-center gap-3 text-black">
                View All Projects
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </span>
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
