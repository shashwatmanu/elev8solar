"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface ProjectItem {
  id: number;
  location: string;
  client?: string;
  capacity: string;
  src: string;
  type: "video" | "image";
}

const allProjects: ProjectItem[] = [
  {
    id: 1,
    location: "Hyderabad, Telangana",
    client: "Mehdipatnam Main Govt. Bus Stand",
    capacity: "125 kW",
    src: "/Projects/Hyderabad.mp4",
    type: "video"
  },
  {
    id: 2,
    location: "Neemrana, Rajasthan",
    client: "Meenakshi Polymer",
    capacity: "250 kW",
    src: "/Projects/neemrana.mp4",
    type: "video"
  },
  {
    id: 3,
    location: "Raebarely, Uttar Pradesh",
    client: "Visaka Industries Pvt. Ltd",
    capacity: "625 kW",
    src: "/Projects/raibareli.mp4",
    type: "video"
  },
  {
    id: 4,
    location: "DLF Phase 3, Gurgaon",
    client: "Commercial Facility",
    capacity: "18.30 kW",
    src: "/Projects/dlf.mp4",
    type: "video"
  },
  {
    id: 5,
    location: "Hauz Khas, Delhi",
    client: "Premium Residential",
    capacity: "10 kW",
    src: "/Projects/hauzkhas.jpeg",
    type: "image"
  },
  {
    id: 6,
    location: "Modi Nagar, Uttar Pradesh",
    client: "Aero Edge",
    capacity: "125 kW",
    src: "/Projects/modinagar.jpeg",
    type: "image"
  },
  {
    id: 7,
    location: "Hauz Khas, Delhi",
    client: "Rooftop Commercial",
    capacity: "20 kW",
    src: "/Projects/haizkhas.jpeg",
    type: "image"
  },
  {
    id: 8,
    location: "Raebarely, Uttar Pradesh",
    client: "Jha Industries",
    capacity: "200 kW",
    src: "/Projects/raybarelyjha.jpeg",
    type: "image"
  },
  {
    id: 9,
    location: "Raebarely, Uttar Pradesh",
    client: "Visaka Industries Pvt. Ltd",
    capacity: "350 kW",
    src: "/Projects/raibareli.mp4",
    type: "video"
  },
  {
    id: 10,
    location: "Kalaburagi, Karnataka",
    client: "AKC",
    capacity: "40 kW",
    src: "/Projects/kalaburagi.jpeg",
    type: "image"
  },
  {
    id: 11,
    location: "Aligarh, Khair (UP)",
    client: "Power Grid Corporation of India",
    capacity: "50 kW",
    src: "/Projects/aligarh1.jpeg",
    type: "image"
  },
  {
    id: 12,
    location: "Delhi, Delhi",
    client: "Delhi Tourism",
    capacity: "10 kW",
    src: "/Projects/hauzkhas.jpeg",
    type: "image"
  },
  {
    id: 13,
    location: "Shahjahanpur, Uttar Pradesh",
    client: "Power Grid Corporation of India",
    capacity: "50 kW",
    src: "/Projects/aligarh2.jpeg",
    type: "image"
  },
  {
    id: 14,
    location: "Sector 99, Gurgaon",
    client: "Urban Residential",
    capacity: "10 kW",
    src: "/Projects/dlf.mp4",
    type: "video"
  },
  {
    id: 15,
    location: "Azadpur, Delhi",
    client: "Commercial Agro Market",
    capacity: "10 kW",
    src: "/Projects/haizkhas.jpeg",
    type: "image"
  }
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>("all");

  const filteredProjects = allProjects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "utility") return parseInt(p.capacity) >= 100;
    if (filter === "commercial") return parseInt(p.capacity) < 100 && parseInt(p.capacity) >= 20;
    if (filter === "residential") return parseInt(p.capacity) < 20;
    return true;
  });

  return (
    <main className="min-h-screen bg-transparent pt-24 sm:pt-32 pb-24 sm:pb-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Dynamic Solar Amber & Radiant Brown Atmospheric Hues matching homepage */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -60, 30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[80vw] sm:w-[45vw] h-[80vw] sm:h-[45vw] rounded-full bg-[#fbbf24]/[0.18] sm:bg-[#fbbf24]/[0.12] blur-[100px] sm:blur-[150px]"
        />
        
        <motion.div
          animate={{
            x: [0, -80, 50, 0],
            y: [0, 80, -30, 0],
            scale: [1, 1.3, 0.85, 1],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[90vw] sm:w-[55vw] h-[90vw] sm:h-[55vw] rounded-full bg-[#f97316]/[0.20] sm:bg-[#f97316]/[0.14] blur-[120px] sm:blur-[160px]"
        />

        <div className="absolute top-[35%] left-[20%] w-[60vw] h-[40vw] rounded-full bg-gradient-to-tr from-[#ea580c]/[0.12] via-[#f59e0b]/[0.08] to-transparent blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 sm:gap-4 mb-4">
              <div className="w-8 sm:w-12 h-[2px] bg-accent"></div>
              <span className="text-accent uppercase tracking-[0.25em] text-xs font-bold">EPC Portfolio</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight">
              Our <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Projects</span>.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl font-light leading-relaxed mt-3">
              15+ utility, commercial, and high-performance solar installations delivered across India with precision engineering.
            </p>
          </motion.div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All (15)" },
              { id: "utility", label: "High Capacity (≥100kW)" },
              { id: "commercial", label: "Commercial (20-100kW)" },
              { id: "residential", label: "Rooftop (≤20kW)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase transition-all duration-300 ${
                  filter === tab.id
                    ? "bg-accent text-black font-bold shadow-lg shadow-accent/20"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.04, 0.25), duration: 0.5 }}
              className="group relative rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 flex flex-col hover:border-accent/40 transition-all duration-500 shadow-xl"
            >
              {/* Media Container with 16:11 Aspect Ratio */}
              <div className="relative w-full aspect-[16/11] overflow-hidden bg-black/60">
                {project.type === "video" ? (
                  <video 
                    src={project.src} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <img 
                    src={project.src} 
                    alt={project.location} 
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                )}

                {/* Number Badge (as requested: "#01", "#02", etc.) */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-accent font-mono text-xs font-bold tracking-wider shadow">
                    #{String(project.id).padStart(2, "0")}
                  </div>
                </div>

                {/* Capacity Pill Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="px-3 py-1 rounded-full bg-accent/90 text-black font-sans text-xs font-extrabold tracking-tight shadow-lg shadow-accent/20">
                    {project.capacity}
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
              </div>

              {/* Information Block */}
              <div className="p-6 flex flex-col justify-between flex-grow bg-gradient-to-b from-white/[0.02] to-white/[0.04]">
                <div>
                  {/* Location with Icon */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <p className="text-white/50 uppercase tracking-widest text-[11px] font-semibold">
                      {project.location}
                    </p>
                  </div>

                  {/* Client Name */}
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-accent transition-colors">
                    {project.client || "Institutional / Private Client"}
                  </h3>
                </div>

                {/* Card Footer Details */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">System Capacity</span>
                    <span className="text-sm font-semibold text-white/90">{project.capacity}</span>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">Execution</span>
                    <span className="text-xs font-medium text-accent">Turnkey EPC</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-transparent border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Have a project in mind for <span className="font-bold text-accent">your rooftop or land?</span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base mt-1">
              Calculate your exact savings and schedule an on-site feasibility survey today.
            </p>
          </div>
          <Link
            href="/calculator"
            className="px-8 py-4 rounded-full bg-accent text-black font-bold uppercase tracking-wider text-xs hover:bg-orange-400 transition-all shadow-xl shadow-accent/20 whitespace-nowrap"
          >
            Calculate ROI Now
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
