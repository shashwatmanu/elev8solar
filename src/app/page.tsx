"use client";

import ExplodedPanel from "@/components/ExplodedPanel";
import ElectricityBackground from "@/components/ElectricityBackground";
import ProjectsSlider from "@/components/ProjectsSlider";
import { motion, useScroll, useTransform, animate, useMotionValue, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Settings, Battery, Zap, Activity, Grid, Sun, Play, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import MagneticButton from "@/components/MagneticButton";

import Link from "next/link";

const clients = [
  { name: "Indian Railway", domain: "indianrailways.gov.in" },
  { name: "Power Grid", domain: "powergrid.in" },
  { name: "Visaka Industries", domain: "visaka.co" },
  { name: "L&T", domain: "larsentoubro.com" },
  { name: "Tata Power", domain: "tatapower.com" },
  { name: "Adani Solar", domain: "adanisolar.com" },
  { name: "Suzlon", domain: "suzlon.com" },
  { name: "Ecovave Industries", domain: "" },
  { name: "BDR Builder", domain: "" },
  { name: "Meenakshi Polymer", domain: "" }
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

  const assetProgress = useMotionValue(0);
  const timeProgress = useMotionValue(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [isCanvasActive, setIsCanvasActive] = useState(true);

  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isLoading && heroVideoRef.current) {
      heroVideoRef.current.play();
    } else if (isLoading && heroVideoRef.current) {
      heroVideoRef.current.pause();
    }
  }, [isLoading, heroVideoIndex]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 1200 && isCanvasActive) setIsCanvasActive(false);
    if (latest <= 1200 && !isCanvasActive) setIsCanvasActive(true);
  });

  // 1. Sync actual asset progress smoothly (Simulated since 3D canvas is removed)
  useEffect(() => {
    animate(assetProgress, 100, { duration: 2, ease: "easeOut" });
  }, [assetProgress]);

  // 1.5 Cycle hero videos every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroVideoIndex((prev) => (prev + 1) % heroVideos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroVideos.length]);

  // 2. Sync the minimum cinematic timer (always 2.5s)
  useEffect(() => {
    animate(timeProgress, 100, { duration: 2.5, ease: "linear" });
  }, [timeProgress]);

  // 3. Continuously compute the minimum of both values to drive the counter safely
  useEffect(() => {
    if (!isLoading) return;
    
    let animationFrameId: number;
    const updateCount = () => {
      const p1 = assetProgress.get();
      const p2 = timeProgress.get();
      const effectiveProgress = Math.min(p1, p2);
      
      // We don't want to re-render constantly if the value hasn't actually rounded to a new whole number
      setDisplayCount((prev) => {
        const next = Math.round((effectiveProgress / 100) * 8);
        return prev !== next ? next : prev;
      });

      if (effectiveProgress >= 99.9) {
        setIsLoading(false);
      } else {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isLoading, assetProgress, timeProgress]);

  // 4. Lock and unlock body scroll cleanly
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

  const calculateEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if(bill) setCalcResult(Number(bill) * 1.25);
  };

  return (
    <div className={isLoading ? "h-screen overflow-hidden fixed inset-0 w-full" : ""}>
      
      {/* Cinematic Video Background */}
      {/* Hidden initially so the global grid acts as the loading screen background. Fades in after loading finishes. */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2.5, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0 overflow-hidden"
      >
        <AnimatePresence mode="popLayout">
          <motion.video 
            key={heroVideos[heroVideoIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            ref={heroVideoRef}
            autoPlay
            muted 
            loop 
            playsInline
            src={heroVideos[heroVideoIndex]}
            style={{ 
              y: useTransform(scrollY, [0, 1000], [0, 250]),
              scale: useTransform(scrollY, [0, 1000], [1, 1.15]),
              opacity: useTransform(scrollY, [500, 1000], [0.6, 0])
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Lighter gradient overlay to keep it bright while retaining readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background z-10"></div>
      </motion.div>

      <main className="relative z-10 w-full text-white overflow-hidden pb-0 bg-transparent">
        <ElectricityBackground />
        {/* 1. HERO SECTION */}
        <section className="relative w-full h-[120vh] flex flex-col items-center justify-start pt-32 md:pt-40 px-6">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 max-w-7xl w-full h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] mx-auto text-center flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1 }}
              className="px-6 py-2 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md mb-8 text-accent font-semibold tracking-widest uppercase text-sm"
            >
              Pioneering the Future
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-none mb-4 drop-shadow-2xl flex flex-col items-center w-full"
            >
              <div className="flex flex-col items-center w-fit mx-auto">
                <div className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 text-center w-full">
                  ELEV{displayCount}
                </div>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400 flex items-center justify-center mt-2 w-full">
                  <span>S</span>
                  <span className="mx-2 md:mx-4 text-orange-400 flex-shrink-0">
                    <Sun size={100} strokeWidth={3} className="animate-[spin_15s_linear_infinite]" style={{ filter: "drop-shadow(0px 0px 10px #f97316)" }} />
                  </span>
                  <span>LAR.</span>
                </div>
              </div>
            </motion.h1>

            {/* Fading Sub-loader text */}
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 0, height: 0, margin: 0, pointerEvents: "none" }}
              transition={{ duration: 0.4, delay: 2.5, ease: "easeInOut" }}
              className="text-accent tracking-[0.3em] font-bold text-sm mb-4 uppercase"
            >
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Loading...
              </motion.span>
            </motion.div>

            {/* Premium Hero Subtitle & CTA - Editorial Bottom Layout */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={!isLoading ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute bottom-32 md:bottom-20 left-0 w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 text-left"
            >
              {/* Left Column: Subtext */}
              <div className="max-w-lg">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={!isLoading ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-4 mb-6"
                >
                  <div className="w-12 h-[1px] bg-accent"></div>
                  <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold">Pioneering Solutions</span>
                </motion.div>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={!isLoading ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/90 text-base md:text-lg font-normal leading-relaxed tracking-wide drop-shadow-xl"
                >
                  <span className="text-white font-bold drop-shadow-2xl">India's premier EPC partner.</span> Engineering state-of-the-art commercial, utility-scale, and off-grid solar solutions for a sustainable tomorrow.
                </motion.p>
              </div>
              
              {/* Right Column: CTA Buttons */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={!isLoading ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto"
              >
                <MagneticButton>
                  <a href="#contact" className="group relative px-8 py-4 rounded-full bg-white text-black font-bold tracking-[0.2em] uppercase overflow-hidden hover:scale-105 transition-transform duration-500 block text-xs w-full sm:w-auto text-center">
                    <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Get Quote <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                </MagneticButton>
                
                <MagneticButton>
                  <Link href="/projects" className="group flex items-center gap-4 text-white/70 hover:text-white transition-colors cursor-pointer bg-white/5 backdrop-blur-md border border-white/10 pr-6 rounded-full w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent transition-all duration-500 shrink-0">
                      <Play size={16} className="text-accent group-hover:text-black transition-all duration-500 fill-current" />
                    </div>
                    <span className="tracking-[0.2em] uppercase text-xs font-semibold whitespace-nowrap">Our Work</span>
                  </Link>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. ABOUT US */}
        <section className="relative w-full min-h-screen flex flex-col justify-center bg-gradient-to-b from-transparent via-background/90 to-background pt-32 mt-32">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-accent font-bold tracking-widest uppercase mb-12 text-sm md:text-base border-l-4 border-accent pl-4">About Us</h2>
              <p className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight text-white mb-12 drop-shadow-lg">
                At <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Elev8 Solar</span>, we believe in transforming the future through sustainable solar energy.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                <div className="flex flex-col space-y-6">
                  <div className="text-7xl font-light text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400 flex items-baseline">
                    5<span className="text-2xl text-white/40 ml-3 font-normal uppercase tracking-widest">Years</span>
                  </div>
                  <p className="text-white/70 text-lg md:text-xl leading-relaxed font-light">
                    of dedicated EPC experience. We are a trusted end-to-end partner, guiding projects from initial design and procurement all the way through construction and long-term operation.
                  </p>
                </div>
                <div className="flex flex-col justify-end space-y-6 md:border-l md:border-white/10 md:pl-12">
                  <p className="text-white/50 text-lg md:text-xl leading-relaxed font-light">
                    Our team combines <span className="text-white/90 font-medium">advanced engineering</span>, strict quality standards, and a deep commitment to <span className="text-white/90 font-medium">timely delivery</span> to ensure every solar installation performs flawlessly.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
          
        {/* CLIENT MARQUEE */}
        <section className="w-full relative z-10 bg-transparent overflow-hidden border-y border-white/5 py-12" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
            <div className="text-center mb-8">
              <p className="text-white/40 tracking-widest uppercase font-semibold text-xs md:text-sm">Trusted By Industry Leaders</p>
            </div>
            <div className="relative flex w-full flex-nowrap">
              <motion.div 
                animate={{ x: [0, -2500] }} 
                transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                className="flex gap-20 whitespace-nowrap px-10 items-center"
              >
                {[...clients, ...clients, ...clients].map((client, i) => (
                  <div key={i} className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default">
                    {client.domain && (
                      <img src={`https://logo.clearbit.com/${client.domain}`} alt={client.name} className="h-10 w-auto object-contain bg-white/90 rounded p-1" onError={(e) => (e.currentTarget.style.display = "none")} />
                    )}
                    <span className="text-2xl md:text-4xl font-bold text-white tracking-tighter">
                      {client.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
        </section>

        {/* 3. SPECIALIZATION (Exploded Panel) - Center Aligned Layout */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-start bg-transparent border-t border-white/5 pt-32 overflow-hidden">
          
          {/* Top Title */}
          <motion.div 
            className="z-20 flex flex-col items-center text-center px-6 max-w-4xl mx-auto mb-[-8vh] md:mb-[-12vh]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-accent"></div>
              <h3 className="text-accent font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Our Specialization</h3>
              <div className="w-12 h-[2px] bg-accent"></div>
            </div>
            
            <h3 className="text-5xl md:text-8xl font-light text-white leading-tight tracking-tighter">
              Comprehensive <br/>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400 drop-shadow-2xl">
                EPC Solutions.
              </span>
            </h3>
          </motion.div>
          
          {/* Centered Massive 3D Model */}
          <div className="relative z-10 w-full h-[70vh] md:h-[80vh]">
            <ExplodedPanel />
          </div>

          {/* Bottom Subtext */}
          <motion.div 
            className="z-20 flex flex-col items-center text-center px-6 max-w-4xl mx-auto mt-[-5vh] mb-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="text-white/60 text-xl md:text-3xl font-light leading-relaxed">
              We specialize in <span className="text-white">commercial rooftop</span> installations, <span className="text-white">utility-scale</span> solar parks, and <span className="text-white">off-grid</span> solutions. Every aspect from site assessment to grid synchronization is handled entirely in-house for absolute precision.
            </p>
          </motion.div>
        </section>

        {/* 4. OUR EXPERTISE (SERVICES) - Awwwards Horizontal Strips */}
        <section className="relative z-10 bg-transparent text-white pt-20 pb-40">
          <div className="max-w-[1400px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-24 md:mb-32 flex flex-col items-center text-center"
            >
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-accent"></div>
                <h2 className="text-accent font-bold tracking-[0.3em] uppercase text-sm">Capabilities</h2>
                <div className="w-12 h-[2px] bg-accent"></div>
              </div>
              <h2 className="text-5xl md:text-8xl font-light tracking-tighter leading-none mb-8">
                End-to-End <br/><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Mastery.</span>
              </h2>
            </motion.div>

            <div className="flex flex-col border-t border-white/10">
              {services.map((service, i) => (
                <div key={i} className="group relative border-b border-white/10 py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-16 w-full md:w-auto">
                    <span className="text-white/20 font-light text-2xl group-hover:text-accent transition-colors duration-500">0{i+1}</span>
                    <h3 className="text-4xl md:text-6xl font-light text-white group-hover:translate-x-4 transition-transform duration-500 tracking-tight">{service.title}</h3>
                  </div>
                  
                  <div className="relative z-10 mt-6 md:mt-0 max-w-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500 pr-10">
                    <p className="text-lg font-light leading-relaxed">{service.desc}</p>
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
        <section id="contact" className="relative z-10 bg-transparent pt-40 pb-0 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6">
            
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-20 md:mb-32"
            >
              <h2 className="text-[12vw] leading-none font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 text-center w-full block">
                LET'S TALK.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              
              {/* Form Side */}
              <div className="lg:col-span-7">
                <div className="bg-[#050505] border border-white/[0.05] rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 transition-opacity duration-1000"></div>
                  
                  <h3 className="text-3xl md:text-5xl font-light text-white mb-4 relative z-10">Start your <span className="font-bold">project</span></h3>
                  <p className="text-white/40 mb-12 text-lg font-light relative z-10 max-w-md">Ready to switch to high-efficiency solar power? Drop your details below and our engineers will reach out.</p>
                  
                  <form className="flex flex-col gap-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="relative border-b border-white/10 focus-within:border-accent transition-colors">
                        <input type="text" placeholder="First Name" className="w-full bg-transparent px-0 py-4 text-white focus:outline-none placeholder:text-white/20" />
                      </div>
                      <div className="relative border-b border-white/10 focus-within:border-accent transition-colors">
                        <input type="text" placeholder="Last Name" className="w-full bg-transparent px-0 py-4 text-white focus:outline-none placeholder:text-white/20" />
                      </div>
                    </div>
                    
                    <div className="relative border-b border-white/10 focus-within:border-accent transition-colors">
                      <input type="email" placeholder="Email Address" className="w-full bg-transparent px-0 py-4 text-white focus:outline-none placeholder:text-white/20" />
                    </div>
                    
                    <div className="relative border-b border-white/10 focus-within:border-accent transition-colors">
                      <textarea placeholder="Tell us about your energy needs..." rows={1} className="w-full bg-transparent px-0 py-4 text-white focus:outline-none placeholder:text-white/20 resize-none h-14 focus:h-32 transition-all duration-300"></textarea>
                    </div>
                    
                    <button type="submit" className="mt-8 group relative px-10 py-5 rounded-full bg-white text-black font-bold tracking-[0.2em] uppercase overflow-hidden self-start">
                      <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                      <span className="relative z-10 flex items-center gap-3">
                        Submit Request <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Info Side */}
              <div className="lg:col-span-5 flex flex-col justify-between py-8">
                <div>
                  <h4 className="text-white/20 font-bold tracking-widest uppercase text-xs mb-8">Reach Out Directly</h4>
                  
                  <div className="space-y-10">
                    <div className="group cursor-pointer">
                      <p className="text-white/40 text-sm mb-2 uppercase tracking-wider">Email Us</p>
                      <p className="text-2xl md:text-3xl font-light text-white group-hover:text-accent transition-colors">info@elev8solar.in</p>
                    </div>
                    
                    <div className="group cursor-pointer">
                      <p className="text-white/40 text-sm mb-2 uppercase tracking-wider">Call Us</p>
                      <p className="text-2xl md:text-3xl font-light text-white group-hover:text-accent transition-colors">+91 98765 43210</p>
                    </div>

                    <div className="group cursor-pointer">
                      <p className="text-white/40 text-sm mb-2 uppercase tracking-wider">Visit Us</p>
                      <p className="text-xl md:text-2xl font-light text-white group-hover:text-accent transition-colors max-w-xs">New Delhi, India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-20 lg:mt-0">
                  <h4 className="text-white/20 font-bold tracking-widest uppercase text-xs mb-6">Socials</h4>
                  <div className="flex flex-wrap gap-4">
                    {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                      <a key={social} href="#" className="px-6 py-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-accent hover:bg-accent/10 transition-all text-sm font-medium tracking-wide">
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="border-t border-white/[0.05] mt-32 relative bg-transparent">
            <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium tracking-wide text-white/30">
              <p>© 2026 Elev8 Solar. All rights reserved.</p>
              <div className="flex items-center gap-8 mt-4 md:mt-0">
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
