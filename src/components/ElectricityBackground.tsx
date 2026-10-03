"use client";
import { motion } from "framer-motion";

export default function ElectricityBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="glow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>
          <filter id="blurGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        <motion.line
          x1="20%" y1="0%" x2="20%" y2="100%"
          stroke="url(#glow)"
          strokeWidth="2"
          filter="url(#blurGlow)"
          animate={{
            strokeDasharray: ["0, 1000", "500, 1000", "1000, 0"],
            strokeDashoffset: [1000, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.line
          x1="80%" y1="0%" x2="80%" y2="100%"
          stroke="url(#glow)"
          strokeWidth="1.5"
          filter="url(#blurGlow)"
          animate={{
            strokeDasharray: ["0, 1000", "300, 1000", "1000, 0"],
            strokeDashoffset: [-1000, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
        />
        
        <motion.line
          x1="50%" y1="0%" x2="50%" y2="100%"
          stroke="url(#glow)"
          strokeWidth="3"
          filter="url(#blurGlow)"
          animate={{
            strokeDasharray: ["0, 1000", "600, 1000", "1000, 0"],
            strokeDashoffset: [1000, -1000]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>
    </div>
  );
}
