"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Sun, Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40);
  });

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[100] flex justify-center pointer-events-none px-4 sm:px-6">
        <motion.nav 
          layout
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            width: isScrolled ? "95%" : "100%",
            maxWidth: isScrolled ? "64rem" : "100%",
            marginTop: isScrolled ? "1rem" : "0px",
            paddingTop: isScrolled ? "0.6rem" : "1.5rem",
            paddingBottom: isScrolled ? "0.6rem" : "1.5rem",
            paddingLeft: isScrolled ? "1.25rem" : "1.5rem",
            paddingRight: isScrolled ? "1.25rem" : "1.5rem",
            borderRadius: isScrolled ? "9999px" : "0px",
            backgroundColor: isScrolled ? "rgba(5, 5, 5, 0.75)" : "rgba(0, 0, 0, 0)",
            borderColor: isScrolled ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0)"
          }}
          transition={{ 
            y: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: isHome ? 3.5 : 0.1 },
            layout: { type: "spring", stiffness: 120, damping: 20 },
            default: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
          }}
          className={`pointer-events-auto flex justify-between items-center transition-all ${isScrolled ? 'backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] border' : ''}`}
        >
          <MagneticButton>
            <motion.div
              layout
              animate={{ 
                opacity: (!isScrolled && isHome) ? 0 : 1, 
                filter: (!isScrolled && isHome) ? "blur(8px)" : "blur(0px)" 
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={(!isScrolled && isHome) ? "pointer-events-none" : ""}
            >
              <Link href="/" className="text-sm font-bold tracking-[0.2em] uppercase flex items-center gap-2.5 text-white group">
                <img 
                  src="/logo.png" 
                  alt="Elev8 Solar" 
                  className="h-6 w-auto object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(255,107,38,0.5)]" 
                />
                <span>ELEV<span className="text-accent">8</span> SOLAR</span>
              </Link>
            </motion.div>
          </MagneticButton>
          
          {/* Desktop Nav Items */}
          <motion.div layout className="hidden md:flex items-center gap-8">
            <MagneticButton>
              <Link href="/projects" className={`text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${pathname === "/projects" ? "text-accent" : "text-white/60 hover:text-white"}`}>
                Our Projects
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/calculator" className={`text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${pathname === "/calculator" ? "text-accent" : "text-white/60 hover:text-white"}`}>
                Quick Estimate
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a href="/#contact" className="group relative px-6 py-2.5 rounded-full bg-white text-black text-xs hover:scale-105 transition-transform font-bold uppercase tracking-[0.2em] overflow-hidden inline-block">
                <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full pointer-events-none" />
                <span className="relative z-10">Get Quote</span>
              </a>
            </MagneticButton>
          </motion.div>

          {/* Mobile Right Controls: Quote button + Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <a 
              href="/#contact" 
              className="px-4 py-1.5 rounded-full bg-white text-black text-[11px] font-bold uppercase tracking-wider active:scale-95 transition-transform"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Quote
            </a>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[95] bg-[#050505]/95 flex flex-col justify-between pt-28 pb-12 px-8 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-white/30 text-xs font-bold tracking-[0.25em] uppercase border-b border-white/10 pb-3">Navigation</span>
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl font-light tracking-tight flex items-center justify-between ${pathname === "/" ? "text-accent font-medium" : "text-white"}`}
              >
                <span>Home</span>
                <ArrowUpRight size={22} className="text-white/30" />
              </Link>
              <Link 
                href="/projects" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl font-light tracking-tight flex items-center justify-between ${pathname === "/projects" ? "text-accent font-medium" : "text-white"}`}
              >
                <span>Our Projects</span>
                <ArrowUpRight size={22} className="text-white/30" />
              </Link>
              <Link 
                href="/calculator" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl font-light tracking-tight flex items-center justify-between ${pathname === "/calculator" ? "text-accent font-medium" : "text-white"}`}
              >
                <span>Quick Estimate</span>
                <ArrowUpRight size={22} className="text-white/30" />
              </Link>
              <a 
                href="/#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-light tracking-tight flex items-center justify-between text-accent font-medium"
              >
                <span>Get a Quote</span>
                <ArrowUpRight size={22} className="text-accent" />
              </a>
            </div>

            <div className="border-t border-white/10 pt-6 flex flex-col gap-3">
              <p className="text-xs uppercase tracking-widest text-white/40">Direct Inquiries</p>
              <a href="mailto:info@elev8solar.in" className="text-lg text-white font-light">info@elev8solar.in</a>
              <a href="tel:+919876543210" className="text-lg text-accent font-medium">+91 98765 43210</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
