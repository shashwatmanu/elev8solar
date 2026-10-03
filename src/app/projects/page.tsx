"use client";

import { motion } from "framer-motion";

const allProjects = [
  { title: "DLF Commercial", location: "Haryana", src: "/Projects/dlf.mp4", type: "video" },
  { title: "Aligarh Plant I", location: "Uttar Pradesh", src: "/Projects/aligarh1.jpeg", type: "image" },
  { title: "Aligarh Plant II", location: "Uttar Pradesh", src: "/Projects/aligarh2.jpeg", type: "image" },
  { title: "Hyderabad Tech Park", location: "Telangana", src: "/Projects/Hyderabad.mp4", type: "video" },
  { title: "Hauz Khas Installations", location: "Delhi", src: "/Projects/hauzkhas.jpeg", type: "image" },
  { title: "Hauz Khas Installations II", location: "Delhi", src: "/Projects/haizkhas.jpeg", type: "image" },
  { title: "Kalaburagi Facility", location: "Karnataka", src: "/Projects/kalaburagi.jpeg", type: "image" },
  { title: "Neemrana Industrial", location: "Rajasthan", src: "/Projects/neemrana.mp4", type: "video" },
  { title: "Raibareli Project", location: "Uttar Pradesh", src: "/Projects/raibareli.mp4", type: "video" },
  { title: "Raibareli Ext", location: "Uttar Pradesh", src: "/Projects/raybarelyjha.jpeg", type: "image" },
  { title: "Modinagar Plant", location: "Uttar Pradesh", src: "/Projects/modinagar.jpeg", type: "image" },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6">Our <span className="font-bold text-accent">Projects</span>.</h1>
          <p className="text-xl text-white/50 max-w-2xl">
            A showcase of our extensive engineering, procurement, and construction (EPC) portfolio across the nation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 aspect-square cursor-pointer"
            >
              {project.type === "video" ? (
                <video 
                  src={project.src} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <img 
                  src={project.src} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 pointer-events-none">
                <p className="text-accent uppercase tracking-widest text-xs font-bold mb-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {project.location}
                </p>
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
