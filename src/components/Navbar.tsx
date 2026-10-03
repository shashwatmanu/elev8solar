"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Sun } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <div className="fixed top-0 left-0 w-full z-[100] flex justify-center pointer-events-none">
      <motion.nav 
        layout
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          width: isScrolled ? "90%" : "100%",
          maxWidth: isScrolled ? "64rem" : "100%",
          marginTop: isScrolled ? "1.5rem" : "0px",
          paddingTop: isScrolled ? "0.75rem" : "2rem",
          paddingBottom: isScrolled ? "0.75rem" : "2rem",
          paddingLeft: isScrolled ? "1.5rem" : "3rem",
          paddingRight: isScrolled ? "1.5rem" : "3rem",
          borderRadius: isScrolled ? "9999px" : "0px",
          backgroundColor: isScrolled ? "rgba(5, 5, 5, 0.6)" : "rgba(0, 0, 0, 0)",
          borderColor: isScrolled ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0)"
        }}
        transition={{ 
          y: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: isHome ? 4.5 : 0.2 },
          layout: { type: "spring", stiffness: 100, damping: 20, mass: 0.5 },
          default: { duration: 0.6, ease: [0.32, 0.72, 0, 1] }
        }}
        className={`pointer-events-auto flex justify-between items-center ${isScrolled ? 'backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] border' : ''}`}
      >
        <MagneticButton>
          <motion.div
            layout
            animate={{ opacity: !isScrolled && isHome ? 0 : 1, filter: !isScrolled && isHome ? "blur(10px)" : "blur(0px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={!isScrolled && isHome ? "pointer-events-none" : ""}
          >
            <Link href="/" className="text-sm font-bold tracking-[0.2em] uppercase flex items-center gap-3 text-white">
              <Sun className="text-accent" size={18} /> ELEV8
            </Link>
          </motion.div>
        </MagneticButton>
        
        <motion.div layout className="flex items-center gap-6 md:gap-10">
          <MagneticButton>
            <Link href="/projects" className="text-xs font-semibold text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em] hidden md:block">
              Our Projects
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link href="/calculator" className="text-xs font-semibold text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em] hidden md:block">
              Quick Estimate
            </Link>
          </MagneticButton>
          <MagneticButton>
            <a href="/#contact" className="px-6 py-2.5 rounded-full bg-white text-black text-xs hover:scale-105 transition-transform font-bold uppercase tracking-[0.2em]">
              Get Quote
            </a>
          </MagneticButton>
        </motion.div>
      </motion.nav>
    </div>
  );
}
