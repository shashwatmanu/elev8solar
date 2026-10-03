"use client";

import { motion } from "framer-motion";

export default function AwwwardsBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Ambient Moving Orbs (Solar Hues) */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#fbbf24]/[0.12] blur-[120px] md:blur-[150px]"
      />
      <motion.div
        animate={{
          x: [0, -150, 100, 0],
          y: [0, 150, -50, 0],
          scale: [1, 1.5, 0.9, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#f97316]/[0.1] blur-[150px] md:blur-[180px]"
      />

      {/* 2. Very Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      />
    </div>
  );
}
