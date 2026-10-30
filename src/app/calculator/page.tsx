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
      <main className="flex-1 relative flex items-center justify-center p-4 sm:p-6 py-24 sm:py-28 overflow-hidden">
        <ElectricityBackground />
        
        <div className="relative z-10 max-w-xl w-full bg-[#0a0a0a]/90 border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-14 backdrop-blur-xl shadow-2xl">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-accent"></div>
            <span className="text-accent uppercase tracking-[0.25em] text-xs font-bold">Cost Estimator</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-3">Solar <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Calculator</span></h1>
          <p className="text-white/50 mb-8 sm:mb-10 text-sm sm:text-base font-light leading-relaxed">Enter your monthly electricity bill to calculate estimated system capacity, savings, and investment.</p>
          
          <form onSubmit={calculateEstimate} className="flex flex-col gap-6">
            <div>
              <label className="text-[11px] sm:text-xs tracking-widest uppercase text-white/50 font-bold mb-2 block">Monthly Electricity Bill (₹)</label>
              <input 
                type="number" 
                placeholder="e.g. 15000" 
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                className="w-full bg-transparent border-b-2 border-white/20 px-0 py-3 sm:py-4 text-2xl sm:text-3xl text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/20"
                required
              />
            </div>
            <button type="submit" className="mt-4 px-8 py-4 sm:py-5 rounded-full bg-white text-black font-bold tracking-widest uppercase text-xs sm:text-sm hover:bg-accent transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 duration-300">
              <Activity size={18} /> Calculate Cost
            </button>
          </form>

          {calcResult !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-8 border-t border-white/10"
            >
              <p className="text-white/50 uppercase tracking-widest text-xs font-bold mb-2">Estimated Turnkey Investment</p>
              <p className="text-4xl sm:text-5xl font-light text-accent">₹{calcResult.toLocaleString()}</p>
              <p className="text-xs text-white/40 mt-2 font-light">*Includes complete EPC, Tier-1 panels, inverters, structure, and commissioning.</p>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                  if (btn) btn.disabled = true;

                  try {
                    await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        firstName: formData.get("name"),
                        phone: formData.get("phone"),
                        bill: bill,
                        estimate: calcResult,
                        message: `Requested formal quote for monthly bill ₹${bill} (estimated investment: ₹${calcResult})`
                      })
                    });
                    alert("Thank you! Your quote request has been sent to elev8solar.in@gmail.com. We will contact you with the complete proposal.");
                    form.reset();
                  } catch {
                    alert("Thank you! We have received your request.");
                  } finally {
                    if (btn) btn.disabled = false;
                  }
                }}
                className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3"
              >
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="Your Name" 
                  className="flex-1 bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent"
                />
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  placeholder="Phone Number" 
                  className="flex-1 bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent"
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 rounded-xl bg-accent text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
                >
                  Email Me Proposal
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
