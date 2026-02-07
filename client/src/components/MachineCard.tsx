import { motion } from "framer-motion";
import { WashingMachine, Shirt, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow, addMinutes } from "date-fns";
import type { Machine, Booking } from "@shared/schema";

interface MachineCardProps {
  machine: Machine;
  activeBooking?: Booking;
  onBook: (machine: Machine) => void;
}

export function MachineCard({ machine, activeBooking, onBook }: MachineCardProps) {
  const isAvailable = !activeBooking && machine.status === "available";
  const Icon = machine.type === "washer" ? WashingMachine : Shirt; // Shirt as pseudo-dryer icon

  // Calculate time remaining if busy
  let timeRemaining = "";
  if (activeBooking) {
    const endTime = addMinutes(new Date(activeBooking.startTime), activeBooking.durationMinutes);
    // Simple mock calculation for display
    timeRemaining = formatDistanceToNow(endTime, { addSuffix: true });
  }

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`
        relative overflow-hidden rounded-xl border p-5 transition-all
        ${isAvailable 
          ? "bg-card border-primary/20 hover:border-primary/50 shadow-[0_0_15px_-5px_rgba(0,100,0,0.1)]" 
          : "bg-card/50 border-border opacity-80"
        }
      `}
    >
      {/* Status Indicator */}
      <div className={`absolute top-0 right-0 p-3`}>
        <div className={`w-2 h-2 rounded-full ${isAvailable ? "bg-accent shadow-[0_0_8px_#0f0]" : "bg-red-500"}`} />
      </div>

      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${isAvailable ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
          <Icon className="w-8 h-8" />
        </div>
        <div className="text-right">
          <h3 className="font-mono font-bold text-lg leading-none">#{machine.machineNumber}</h3>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{machine.type}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm font-mono">
          {isAvailable ? (
            <span className="text-primary flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              SYSTEM READY
            </span>
          ) : (
            <span className="text-destructive flex items-center">
              <XCircle className="w-4 h-4 mr-2" />
              IN USE
            </span>
          )}
        </div>

        {!isAvailable && activeBooking && (
          <div className="flex items-center text-xs text-muted-foreground bg-black/20 p-2 rounded">
            <Clock className="w-3 h-3 mr-2" />
            <span>Free {timeRemaining}</span>
          </div>
        )}

        <Button 
          className={`w-full font-bold tracking-wide transition-all ${
            isAvailable 
              ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20" 
              : "bg-muted text-muted-foreground cursor-not-allowed hover:bg-muted"
          }`}
          disabled={!isAvailable}
          onClick={() => isAvailable && onBook(machine)}
        >
          {isAvailable ? "INITIALIZE" : "UNAVAILABLE"}
        </Button>
      </div>
    </motion.div>
  );
}
