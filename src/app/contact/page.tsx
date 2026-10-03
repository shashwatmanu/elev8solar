"use client";
import ElectricityBackground from "@/components/ElectricityBackground";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col text-white">
      <nav className="w-full z-50 p-6 flex justify-between items-center border-b border-white/10">
        <a href="/" className="text-xl font-bold tracking-widest uppercase">Elev8 <span className="text-accent">Solar</span></a>
        <a href="/calculator" className="px-6 py-2 rounded-full bg-white/10 text-sm hover:bg-white/20 transition font-semibold border border-white/10">Calculator</a>
      </nav>

      <main className="flex-1 relative flex items-center justify-center p-6 py-20 overflow-hidden">
        <ElectricityBackground />
        
        <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/[0.03] border border-white/10 rounded-[2rem] p-10 md:p-14 backdrop-blur-md">
          
          <div>
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-white/60 text-lg leading-relaxed mb-12">
              Ready to reduce your energy bills and switch to clean solar power? Contact us today for a free consultation and personalized quote.
            </p>

            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-white/40 text-sm uppercase tracking-widest font-bold mb-1">Email Us</span>
                <a href="mailto:info@elev8solar.in" className="text-2xl text-white hover:text-accent transition-colors">info@elev8solar.in</a>
              </div>
              <div className="flex flex-col">
                <span className="text-white/40 text-sm uppercase tracking-widest font-bold mb-1">Call Us</span>
                <a href="tel:+919876543210" className="text-2xl text-white hover:text-accent transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex flex-col">
                <span className="text-white/40 text-sm uppercase tracking-widest font-bold mb-1">Location</span>
                <p className="text-xl text-white">Delhi, India</p>
              </div>
            </div>
          </div>

          <div>
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-6">
                <input type="text" placeholder="First Name" className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
                <input type="text" placeholder="Last Name" className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
              <input type="tel" placeholder="Phone Number" className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" />
              <textarea placeholder="Tell us about your project..." rows={4} className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none"></textarea>
              <button type="submit" className="w-full px-8 py-4 rounded-lg bg-accent text-black font-bold tracking-widest uppercase hover:bg-accent/90 transition-all flex items-center justify-center gap-2">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}
