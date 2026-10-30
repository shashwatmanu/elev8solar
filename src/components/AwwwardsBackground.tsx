"use client";

import { motion } from "framer-motion";

export default function AwwwardsBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Ambient Moving Orbs (Rich Solar Hues: Amber and Vibrant Orange) */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.25, 0.85, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-5%] left-[-15%] sm:top-[-10%] sm:left-[-10%] w-[90vw] h-[90vw] sm:w-[50vw] sm:h-[50vw] rounded-full bg-[#fbbf24]/[0.22] sm:bg-[#fbbf24]/[0.14] blur-[90px] sm:blur-[140px]"
      />
      
      <motion.div
        animate={{
          x: [0, -100, 80, 0],
          y: [0, 100, -40, 0],
          scale: [1, 1.35, 0.9, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-15%] sm:bottom-[-20%] sm:right-[-10%] w-[100vw] h-[100vw] sm:w-[60vw] sm:h-[60vw] rounded-full bg-[#f97316]/[0.24] sm:bg-[#f97316]/[0.15] blur-[100px] sm:blur-[160px]"
      />

      {/* Center atmospheric warm solar core for mobile aura */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[90vw] h-[60vw] sm:w-[50vw] sm:h-[40vw] rounded-full bg-gradient-to-tr from-[#f97316]/[0.14] via-[#fbbf24]/[0.10] to-transparent blur-[110px] pointer-events-none" />

      {/* 2. Solar Grid Pattern (Vibrant and crisp on mobile & desktop) */}
      <div 
        className="absolute inset-0 opacity-[0.06] sm:opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f59e0b 1px, transparent 1px),
            linear-gradient(to bottom, #f59e0b 1px, transparent 1px)
          `,
          backgroundSize: '3rem 3rem'
        }}
      />
    </div>
  );
}
