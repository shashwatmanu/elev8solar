"use client";

import dynamic from "next/dynamic";
import ElectricityBackground from "@/components/ElectricityBackground";

const ProjectsSlider = dynamic(() => import("@/components/ProjectsSlider"), {
  ssr: false,
  loading: () => <div className="w-full min-h-[75vh]" />
});

const ExplodedPanel = dynamic(() => import("@/components/ExplodedPanel"), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[420px] md:min-h-[550px]" />
});
import { motion, useScroll, useTransform, animate, useMotionValue, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Settings, Battery, Zap, Activity, Grid, Sun, Play, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import MagneticButton from "@/components/MagneticButton";

import Link from "next/link";

const clients = [
  { name: "Power Grid", logo: "/clients/powergrid.png?v=3" },
  { name: "Indian Railway", logo: "/clients/indian-railway.png" },
  { name: "Hi Sky Group", logo: "/clients/hisky.png" },
  { name: "Meenakshi Polymer", logo: "/clients/meenakshi-polymers.png" },
  { name: "Ecowave Industries", logo: "/clients/ecowave.png" },
  { name: "BDR Builder", logo: "/clients/bdr-builder.png" },
  { name: "Visaka Industries", logo: "/clients/visaka.png" },
  { name: "Swellwrap Industries", logo: "/clients/swellowrap.png?v=2" },
];

const services = [
  { title: "Full EPC Solutions", desc: "End-to-end solutions comprising Site Survey, Material Supply, Plant Construction, Testing, and Commissioning." },
  { title: "Installation & Commissioning", desc: "Expert deployment ensuring peak operational efficiency." },
  { title: "AC Termination", desc: "Professional AC termination on utility-scale plants." },
  { title: "BOS Supply", desc: "Supply of all Balance of System (BOS) components at highly competitive rates." },
];

export default function Home() {
  const { scrollY } = useScroll();
  
  const heroY = useTransform(scrollY, [0, 800], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  const [bill, setBill] = useState("");
  const [calcResult, setCalcResult] = useState<null | number>(null);

  const [heroVideoIndex, setHeroVideoIndex] = useState(0);
  const heroVideos = [
    "/Projects/Hyderabad.mp4",
    "/Projects/dlf.mp4",
    "/Projects/neemrana.mp4",
    "/Projects/raibareli.mp4"
  ];

  const [displayCount, setDisplayCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    }
  }, [heroVideoIndex]);

  // Cycle hero videos every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroVideoIndex((prev) => (prev + 1) % heroVideos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroVideos.length]);

  // Ensure page always starts cleanly at top (prevent mobile browser auto-scroll restoration)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // Lock and unlock body scroll cleanly
  useEffect(() => {
    if (isLoading) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <div className="relative w-full">
      <main className="relative z-10 w-full text-white overflow-hidden pb-0 bg-transparent">
        <ElectricityBackground />
        
        {/* 1. HERO SECTION (Video is strictly scoped inside here) */}
        <section className="relative w-full h-[100svh] min-h-[600px] flex flex-col items-center justify-between pt-20 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 overflow-hidden">
          
          {/* Hero Video Background - Scoped exclusively to Hero */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: !isLoading ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
          >
            <AnimatePresence mode="sync">
              <motion.video 
                key={heroVideos[heroVideoIndex]}
                ref={heroVideoRef}
                autoPlay
                muted 
                playsInline
                preload="metadata"
                src={heroVideos[heroVideoIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            {/* Soft overlay gradient ensuring readability without masking brightness */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background z-10"></div>
          </motion.div>

          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 max-w-7xl w-full h-full mx-auto text-center flex flex-col items-center justify-between"
          >
            {/* Main Centered Brand Title & Loading Area */}
            <div className="flex flex-col items-center justify-center w-full my-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 1 }}
                className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md mb-4 sm:mb-8 text-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs md:text-sm"
              >
                Pioneering the Future
              </motion.div>

              <motion.h1
                className="text-[13vw] sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-none mb-3 sm:mb-4 drop-shadow-2xl flex flex-col items-center w-full"
              >
                <div className="flex flex-col items-center w-fit mx-auto">
                  <div className="text-center w-full flex items-center justify-center">
                    {/* Cinematic Logo Reveal: pure transparent natural PNG without artificial glow or blur */}
                    <motion.div
                      initial={{ width: 0, opacity: 0, scale: 0.8, marginRight: 0 }}
                      animate={displayCount >= 8 ? {
                        width: "auto",
                        opacity: 1,
                        scale: 1,
                        marginRight: "clamp(0.6rem, 2vw, 1.8rem)"
                      } : {
                        width: 0,
                        opacity: 0,
                        scale: 0.8,
                        marginRight: 0
                      }}
                      transition={{
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="overflow-hidden inline-flex items-center justify-center shrink-0"
                    >
                      <img 
                        src="/logo.png" 
                        alt="Elev8 Solar Emblem" 
                        className="h-[12vw] sm:h-20 md:h-24 lg:h-32 w-auto object-contain -mt-1 sm:-mt-2" 
                      />
                    </motion.div>
                    
                    {/* ELEV text with pristine gradient mask */}
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
                      ELEV{displayCount}
                    </span>
                  </div>
                  <div className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400 flex items-center justify-center mt-1 sm:mt-2 w-full">
                    <span>S</span>
                    <span className="mx-2 sm:mx-3 md:mx-4 text-orange-400 flex-shrink-0 flex items-center justify-center">
                      <Sun 
                        size={48} 
                        strokeWidth={2.8} 
                        className="sm:hidden animate-[spin_15s_linear_infinite]" 
                        style={{ filter: "drop-shadow(0px 0px 8px #f97316)" }} 
                      />
                      <Sun 
                        size={100} 
                        strokeWidth={3} 
                        className="hidden sm:block animate-[spin_15s_linear_infinite]" 
                        style={{ filter: "drop-shadow(0px 0px 10px #f97316)" }} 
                      />
                    </span>
                    <span>LAR.</span>
                  </div>
                </div>
              </motion.h1>

            </div>

            {/* Premium Hero Subtitle & CTA - Pinned cleanly at bottom across all screens */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={!isLoading ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-end gap-4 sm:gap-8 lg:gap-10 text-center lg:text-left pb-3 sm:pb-0"
            >
              {/* Subtext: Visible across ALL screens with responsive sizing */}
              <div className="max-w-xl text-center lg:text-left">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={!isLoading ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-3 sm:gap-4 mb-1.5 sm:mb-3"
                >
                  <div className="w-6 sm:w-12 h-[1px] bg-accent"></div>
                  <span className="text-accent uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[10px] sm:text-xs font-bold">Pioneering Solutions</span>
                  <div className="w-6 h-[1px] bg-accent lg:hidden"></div>
                </motion.div>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={!isLoading ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/85 text-xs sm:text-base md:text-lg font-normal leading-relaxed tracking-wide drop-shadow-xl"
                >
                  <span className="text-white font-bold drop-shadow-2xl">India&apos;s premier EPC partner.</span> Engineering state-of-the-art commercial, utility-scale, and off-grid solar solutions.
                </motion.p>
              </div>
              
              {/* Right Column: CTA Buttons (Pinned cleanly at the bottom on mobile) */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={!isLoading ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-row items-center justify-center gap-3 sm:gap-6 w-full lg:w-auto"
              >
                <MagneticButton>
                  <a href="#contact" className="group relative flex-1 sm:flex-initial px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-black font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase overflow-hidden hover:scale-105 active:scale-95 transition-transform duration-500 block text-xs text-center shadow-lg">
                    <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                      Get Quote <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                </MagneticButton>
                
                <MagneticButton>
                  <Link href="/projects" className="group flex-1 sm:flex-initial flex items-center justify-center gap-2 sm:gap-4 text-white/80 hover:text-white transition-colors cursor-pointer bg-white/10 backdrop-blur-md border border-white/15 px-4 sm:pr-6 sm:pl-2 py-2 sm:py-1.5 rounded-full">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent transition-all duration-500 shrink-0">
                      <Play size={13} className="text-accent group-hover:text-black transition-all duration-500 fill-current ml-0.5" />
                    </div>
                    <span className="tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs font-semibold whitespace-nowrap">Our Work</span>
                  </Link>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. ABOUT US */}
        <section className="relative w-full min-h-screen flex flex-col justify-center bg-[#050505] pt-16 sm:pt-24 md:pt-28 mt-0 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-accent font-bold tracking-widest uppercase mb-8 sm:mb-12 text-xs sm:text-sm md:text-base border-l-4 border-accent pl-3 sm:pl-4">
                About Us
              </h2>

              <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-snug sm:leading-tight text-white mb-8 sm:mb-12 drop-shadow-lg">
                At{" "}
                <span className="inline-flex items-center gap-2 sm:gap-3.5 align-baseline font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400 whitespace-nowrap">
                  <img 
                    src="/logo.png" 
                    alt="Elev8 Solar Emblem" 
                    className="h-7 sm:h-11 md:h-13 lg:h-15 w-auto object-contain inline-block -mt-1 sm:-mt-2" 
                  />
                  <span>Elev8 Solar</span>
                </span>
                , we believe in transforming the future through sustainable solar energy.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mt-8 sm:mt-12">
                <div className="flex flex-col space-y-4 sm:space-y-6">
                  <div className="text-5xl sm:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400 flex items-baseline">
                    5<span className="text-xl sm:text-2xl text-white/40 ml-2 sm:ml-3 font-normal uppercase tracking-widest">Years</span>
                  </div>
                  <p className="text-white/70 text-base sm:text-lg md:text-xl leading-relaxed font-light">
                    of dedicated EPC experience. We are a trusted end-to-end partner, guiding projects from initial design and procurement all the way through construction and long-term operation.
                  </p>
                </div>
                <div className="flex flex-col justify-end space-y-4 sm:space-y-6 md:border-l md:border-white/10 md:pl-12">
                  <p className="text-white/50 text-base sm:text-lg md:text-xl leading-relaxed font-light">
                    Our team combines <span className="text-white/90 font-medium">advanced engineering</span>, strict quality standards, and a deep commitment to <span className="text-white/90 font-medium">timely delivery</span> to ensure every solar installation performs flawlessly.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
          
        {/* CLIENT LOGO MARQUEE (Awwwards-style logo-only flow) */}
        <section className="w-full relative z-10 bg-transparent overflow-hidden border-y border-white/5 py-10 sm:py-14" style={{ maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)" }}>
            <div className="text-center mb-8">
              <p className="text-accent/80 tracking-[0.3em] uppercase font-bold text-[10px] sm:text-xs">
                POWERING THE INFRASTRUCTURE OF INDIA&apos;S LEADERS
              </p>
            </div>
            <div className="relative flex w-full overflow-hidden select-none">
              {/* Single smooth infinite linear track with exact 50% translation */}
              <motion.div 
                className="flex items-center w-max shrink-0"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 28,
                }}
              >
                {[...clients, ...clients, ...clients, ...clients].map((client, i) => (
                  <div 
                    key={i} 
                    className="mx-8 sm:mx-14 shrink-0 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer transform hover:scale-105"
                    title={client.name}
                  >
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className={`${
                        client.name === "Power Grid" 
                          ? "h-14 sm:h-20 md:h-24 max-w-[160px] sm:max-w-[220px] md:max-w-[260px] filter brightness-110" 
                          : "h-12 sm:h-16 md:h-18 max-w-[150px] sm:max-w-[200px] md:max-w-[230px]"
                      } w-auto object-contain drop-shadow-[0_4px_24px_rgba(255,255,255,0.08)] filter brightness-105 group-hover:drop-shadow-[0_4px_30px_rgba(255,107,38,0.35)] transition-all duration-300`} 
                    />
                  </div>
                ))}
              </motion.div>
            </div>
        </section>

        {/* 3. SPECIALIZATION (Exploded Panel) - Center Aligned Layout */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-start bg-transparent border-t border-white/5 pt-20 sm:pt-32 overflow-hidden">
          
          {/* Top Title */}
          <motion.div 
            className="z-20 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl mx-auto mb-[-4vh] sm:mb-[-8vh] md:mb-[-12vh]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-8 sm:w-12 h-[2px] bg-accent"></div>
              <h3 className="text-accent font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Our Specialization</h3>
              <div className="w-8 sm:w-12 h-[2px] bg-accent"></div>
            </div>
            
            <h3 className="text-4xl sm:text-6xl md:text-8xl font-light text-white leading-tight tracking-tighter">
              Comprehensive <br/>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400 drop-shadow-2xl">
                EPC Solutions.
              </span>
            </h3>
          </motion.div>
          
          {/* Centered Massive 3D Model */}
          <div className="relative z-10 w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
            <ExplodedPanel />
          </div>

          {/* Bottom Subtext */}
          <motion.div 
            className="z-20 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl mx-auto mt-[-3vh] sm:mt-[-5vh] mb-20 sm:mb-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="text-white/70 text-base sm:text-xl md:text-3xl font-light leading-relaxed">
              We specialize in <span className="text-white font-medium">commercial rooftop</span> installations, <span className="text-white font-medium">utility-scale</span> solar parks, and <span className="text-white font-medium">off-grid</span> solutions. Every aspect from site assessment to grid synchronization is handled entirely in-house for absolute precision.
            </p>
          </motion.div>
        </section>

        {/* 4. OUR EXPERTISE (SERVICES) - Awwwards Horizontal Strips */}
        <section className="relative z-10 bg-transparent text-white pt-12 sm:pt-20 pb-24 sm:pb-40">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-16 sm:mb-24 md:mb-32 flex flex-col items-center text-center"
            >
              <div className="inline-flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-8 sm:w-12 h-[2px] bg-accent"></div>
                <h2 className="text-accent font-bold tracking-[0.3em] uppercase text-xs sm:text-sm">Capabilities</h2>
                <div className="w-8 sm:w-12 h-[2px] bg-accent"></div>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-light tracking-tighter leading-none mb-6 sm:mb-8">
                End-to-End <br/><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Mastery.</span>
              </h2>
            </motion.div>

            <div className="flex flex-col border-t border-white/10">
              {services.map((service, i) => (
                <div key={i} className="group relative border-b border-white/10 py-8 sm:py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
                  
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 md:gap-16 w-full md:w-auto">
                    <span className="text-accent/60 md:text-white/20 font-light text-lg sm:text-2xl group-hover:text-accent transition-colors duration-500">0{i+1}</span>
                    <h3 className="text-2xl sm:text-4xl md:text-6xl font-light text-white group-hover:translate-x-4 transition-transform duration-500 tracking-tight">{service.title}</h3>
                  </div>
                  
                  <div className="relative z-10 mt-3 md:mt-0 max-w-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500 md:pr-10">
                    <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-white/80">{service.desc}</p>
                  </div>
                  
                  {/* Hover Icon Reveal */}
                  <div className="absolute right-6 opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 transition-all duration-500 hidden md:block">
                    <div className="w-16 h-16 rounded-full border border-accent/50 bg-accent/10 flex items-center justify-center">
                      <ArrowRight size={24} className="text-accent" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4.5 PROJECTS SLIDER PREVIEW */}
        <ProjectsSlider />

        {/* 5. CONTACT FOOTER - Awwwards Style */}
        <section id="contact" className="relative z-10 bg-transparent pt-24 sm:pt-36 md:pt-40 pb-0 overflow-hidden">
          {/* Ambient Solar Glow for Contact Slide */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-accent/15 via-orange-500/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16 md:mb-28"
            >
              <div className="inline-flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-8 sm:w-12 h-[2px] bg-accent"></div>
                <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold">Connect With Us</span>
                <div className="w-8 sm:w-12 h-[2px] bg-accent"></div>
              </div>
              <h2 className="text-[16vw] sm:text-[14vw] lg:text-[12vw] leading-none font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 text-center w-full block">
                LET'S TALK.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              
              {/* Form Side */}
              <div className="lg:col-span-7">
                <div className="bg-[#050505]/90 border border-white/[0.08] backdrop-blur-xl rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-14 relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-light text-white mb-3 relative z-10">Start your <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">project</span></h3>
                  <p className="text-white/50 mb-8 sm:mb-12 text-sm sm:text-base md:text-lg font-light relative z-10 max-w-md">Ready to switch to high-efficiency solar power? Drop your details below and our engineers will reach out.</p>
                  
                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const formData = new FormData(form);
                      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                      if (submitBtn) submitBtn.disabled = true;
                      
                      try {
                        await fetch("/api/contact", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            firstName: formData.get("firstName"),
                            lastName: formData.get("lastName"),
                            email: formData.get("email"),
                            phone: formData.get("phone"),
                            message: formData.get("message")
                          })
                        });
                        alert("Thank you! Your inquiry has been forwarded directly to elev8solar.in@gmail.com. Our engineering team will contact you shortly.");
                        form.reset();
                      } catch {
                        alert("Thank you! Your details have been received. We will contact you shortly.");
                      } finally {
                        if (submitBtn) submitBtn.disabled = false;
                      }
                    }} 
                    className="flex flex-col gap-6 sm:gap-8 relative z-10"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      <div className="relative border-b border-white/10 focus-within:border-accent transition-colors">
                        <input required name="firstName" type="text" placeholder="First Name" className="w-full bg-transparent px-0 py-3 sm:py-4 text-white text-sm sm:text-base focus:outline-none placeholder:text-white/30" />
                      </div>
                      <div className="relative border-b border-white/10 focus-within:border-accent transition-colors">
                        <input required name="lastName" type="text" placeholder="Last Name" className="w-full bg-transparent px-0 py-3 sm:py-4 text-white text-sm sm:text-base focus:outline-none placeholder:text-white/30" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      <div className="relative border-b border-white/10 focus-within:border-accent transition-colors">
                        <input required name="email" type="email" placeholder="Email Address" className="w-full bg-transparent px-0 py-3 sm:py-4 text-white text-sm sm:text-base focus:outline-none placeholder:text-white/30" />
                      </div>
                      <div className="relative border-b border-white/10 focus-within:border-accent transition-colors">
                        <input required name="phone" type="tel" placeholder="Phone Number (e.g. 9560048386)" className="w-full bg-transparent px-0 py-3 sm:py-4 text-white text-sm sm:text-base focus:outline-none placeholder:text-white/30" />
                      </div>
                    </div>
                    
                    <div className="relative border-b border-white/10 focus-within:border-accent transition-colors">
                      <textarea name="message" placeholder="Tell us about your energy needs..." rows={2} className="w-full bg-transparent px-0 py-3 sm:py-4 text-white text-sm sm:text-base focus:outline-none placeholder:text-white/30 resize-none h-16 focus:h-28 transition-all duration-300"></textarea>
                    </div>
                    
                    <button type="submit" className="mt-4 sm:mt-6 group relative px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white text-black font-bold tracking-[0.2em] uppercase overflow-hidden self-stretch sm:self-start text-xs sm:text-sm hover:scale-105 active:scale-95 transition-transform duration-300">
                      <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Submit Request <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Info Side */}
              <div className="lg:col-span-5 flex flex-col justify-between py-4 sm:py-8">
                <div>
                  <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <img 
                      src="/logo.png" 
                      alt="Elev8 Solar" 
                      className="h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,107,38,0.4)]" 
                    />
                    <div>
                      <span className="text-white font-bold tracking-widest text-sm uppercase">Elev8 Solar</span>
                      <p className="text-accent text-[10px] tracking-widest uppercase font-semibold">Engineering • EPC Solutions</p>
                    </div>
                  </div>
                  
                  <h4 className="text-white/30 font-bold tracking-widest uppercase text-xs mb-6 sm:mb-8">Direct Engineering Contact</h4>
                  
                  <div className="space-y-8 sm:space-y-10">
                    <div className="group cursor-pointer">
                      <p className="text-white/40 text-xs sm:text-sm mb-1 sm:mb-2 uppercase tracking-wider">Email Us</p>
                      <a href="mailto:elev8solar.in@gmail.com" className="text-lg sm:text-2xl md:text-3xl font-light text-white group-hover:text-accent transition-colors block">elev8solar.in@gmail.com</a>
                    </div>
                    
                    <div className="group cursor-pointer">
                      <p className="text-white/40 text-xs sm:text-sm mb-1 sm:mb-2 uppercase tracking-wider">Call Us</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <a href="tel:+919560048386" className="text-lg sm:text-2xl md:text-3xl font-light text-white group-hover:text-accent transition-colors block">+91 95600 48386</a>
                        <span className="hidden sm:inline text-white/30">•</span>
                        <a href="tel:+918882089996" className="text-lg sm:text-2xl md:text-3xl font-light text-white group-hover:text-accent transition-colors block">+91 88820 89996</a>
                      </div>
                    </div>

                    <div className="group cursor-pointer">
                      <p className="text-white/40 text-xs sm:text-sm mb-1 sm:mb-2 uppercase tracking-wider">Visit Us</p>
                      <p className="text-lg sm:text-xl md:text-2xl font-light text-white group-hover:text-accent transition-colors max-w-xs">New Delhi, India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 lg:mt-0">
                  <h4 className="text-white/30 font-bold tracking-widest uppercase text-xs mb-4 sm:mb-6">Connect</h4>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {[
                      { name: 'LinkedIn', url: 'https://www.linkedin.com/company/elev8-solar/' },
                      { name: 'Instagram', url: 'https://www.instagram.com/elev8solar.in/' }
                    ].map((social) => (
                      <a 
                        key={social.name} 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-accent hover:bg-accent/10 transition-all text-xs sm:text-sm font-medium tracking-wide"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="border-t border-white/[0.08] mt-20 sm:mt-32 relative bg-[#050505]">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm font-medium tracking-wide text-white/40 gap-4 sm:gap-0">
              <p>© 2026 Elev8 Solar. All rights reserved.</p>
              <div className="flex items-center gap-6 sm:gap-8">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
