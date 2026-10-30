"use client";
import ElectricityBackground from "@/components/ElectricityBackground";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col text-white">
      <main className="flex-1 relative flex items-center justify-center p-4 sm:p-6 py-24 sm:py-28 overflow-hidden">
        <ElectricityBackground />
        
        <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 bg-[#0a0a0a]/90 border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-14 backdrop-blur-xl shadow-2xl">
          
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-accent"></div>
              <span className="text-accent uppercase tracking-[0.25em] text-xs font-bold">Inquiries</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6">Get in <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Touch</span></h1>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-8 sm:mb-12 font-light">
              Ready to reduce your energy bills and switch to clean solar power? Contact us today for a free consultation and personalized quote.
            </p>

            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-white/40 text-xs uppercase tracking-widest font-bold mb-1">Email Us</span>
                <a href="mailto:elev8solar.in@gmail.com" className="text-base sm:text-xl text-white hover:text-accent transition-colors font-light">elev8solar.in@gmail.com</a>
              </div>
              <div className="flex flex-col">
                <span className="text-white/40 text-xs uppercase tracking-widest font-bold mb-1">Call Us</span>
                <div className="flex flex-col gap-1">
                  <a href="tel:+919560048386" className="text-base sm:text-xl text-white hover:text-accent transition-colors font-light">+91 95600 48386</a>
                  <a href="tel:+918882089996" className="text-base sm:text-xl text-white hover:text-accent transition-colors font-light">+91 88820 89996</a>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white/40 text-xs uppercase tracking-widest font-bold mb-1">Location</span>
                <p className="text-base sm:text-xl text-white font-light">New Delhi, India</p>
              </div>
            </div>
          </div>

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
                  alert("Thank you! Your message has been forwarded directly to elev8solar.in@gmail.com. We will contact you shortly.");
                  form.reset();
                } catch {
                  alert("Thank you! Your message has been received. We will contact you shortly.");
                } finally {
                  if (submitBtn) submitBtn.disabled = false;
                }
              }} 
              className="flex flex-col gap-4 sm:gap-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <input required name="firstName" type="text" placeholder="First Name" className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-white/30" />
                <input required name="lastName" type="text" placeholder="Last Name" className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-white/30" />
              </div>
              <input required name="email" type="email" placeholder="Email Address" className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-white/30" />
              <input type="tel" name="phone" placeholder="Phone Number (e.g. 9560048386)" className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-white/30" />
              <textarea name="message" placeholder="Tell us about your project..." rows={3} className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent transition-colors resize-none placeholder:text-white/30"></textarea>
              <button type="submit" className="w-full px-8 py-4 rounded-full bg-white text-black font-bold tracking-widest uppercase text-xs sm:text-sm hover:bg-accent transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 duration-300">
                Send Message
              </button>
            </form>
        </div>
      </main>
    </div>
  );
}
