"use client";
import { useState } from "react";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";
import ElectricityBackground from "@/components/ElectricityBackground";

export default function CalculatorPage() {
  const [bill, setBill] = useState("");
  const [calcResult, setCalcResult] = useState<null | number>(null);

  const calculateEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (bill) setCalcResult(Number(bill) * 1.25);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col text-white">
      <main className="flex-1 relative flex items-center justify-center p-6 py-20 overflow-hidden">
        <ElectricityBackground />
        
        <div className="relative z-10 max-w-xl w-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-10 md:p-14 backdrop-blur-md">
          <h1 className="text-4xl font-bold mb-4">Solar Calculator</h1>
          <p className="text-white/50 mb-10 text-lg">Enter your monthly electricity bill to see your potential system cost and savings.</p>
          
          <form onSubmit={calculateEstimate} className="flex flex-col gap-6">
            <div>
              <label className="text-xs tracking-widest uppercase text-white/40 font-bold mb-2 block">Monthly Bill (₹)</label>
              <input 
                type="number" 
                placeholder="e.g. 15000" 
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                className="w-full bg-transparent border-b-2 border-white/20 px-0 py-4 text-2xl text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/10"
                required
              />
            </div>
            <button type="submit" className="mt-4 px-8 py-4 rounded-full bg-accent text-black font-bold tracking-widest uppercase text-sm hover:bg-accent/90 transition-all flex items-center justify-center gap-2">
              <Activity size={18} /> Calculate Cost
            </button>
          </form>

          {calcResult !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 pt-10 border-t border-white/10"
            >
              <p className="text-white/40 uppercase tracking-widest text-xs font-bold mb-2">Estimated Investment</p>
              <p className="text-5xl font-light text-accent">₹{calcResult.toLocaleString()}</p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
