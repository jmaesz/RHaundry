import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Zap, ShieldCheck } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-3xl space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-mono font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50">
            RHaundry<span className="text-primary">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
            The next-gen laundry management system for <span className="text-white font-medium">Raffles Hall</span> residents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          {[
            { icon: Lock, title: "Secure Access", desc: "Verified residents only" },
            { icon: Zap, title: "Live Status", desc: "Real-time machine availability" },
            { icon: ShieldCheck, title: "Smart Alerts", desc: "Never forget your laundry" },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary/50 transition-colors"
            >
              <item.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="/api/login">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-[0_0_20px_rgba(0,100,0,0.4)] hover:shadow-[0_0_30px_rgba(0,100,0,0.6)] transition-all">
              Login via Replit <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </motion.div>
      </motion.div>

      <footer className="absolute bottom-6 text-xs text-muted-foreground font-mono opacity-50">
        SYSTEM STATUS: OPERATIONAL • V1.0.4
      </footer>
    </div>
  );
}
