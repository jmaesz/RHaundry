import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WashingMachine, Shirt, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateBookingStatus, getMockBookingForMachine } from "@/lib/mock-data";
import type { Machine, Booking } from "@shared/schema";

interface MachineCardProps {
  machine: Machine;
  activeBooking?: Booking;
  onBook: (machine: Machine) => void;
  onBookingClick?: (machine: Machine, booking: Booking) => void;
}

export function MachineCard({ machine, activeBooking, onBook, onBookingClick }: MachineCardProps) {
  // If parent didn't pass an activeBooking prop (because of localStorage or timing),
  // attempt to resolve a mock booking locally so VIEW DETAILS always works for in_use machines.
  const fallbackBooking = getMockBookingForMachine(machine.id);
  const resolvedBooking = activeBooking ?? fallbackBooking;

  const isAvailable = !resolvedBooking && machine.status === "available";
  const Icon = machine.type === "washer" ? WashingMachine : Shirt;

  const [bookingStatus, setBookingStatus] = useState(resolvedBooking ? calculateBookingStatus(resolvedBooking) : null);

  // Update booking status every second
  useEffect(() => {
    if (!resolvedBooking) return;

    const interval = setInterval(() => {
      setBookingStatus(calculateBookingStatus(resolvedBooking));
    }, 1000);

    return () => clearInterval(interval);
  }, [resolvedBooking]);

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

        {!isAvailable && resolvedBooking && bookingStatus && (
          <div className="flex items-center text-xs font-mono p-2 rounded border transition-all"
               style={{
                 backgroundColor: bookingStatus.isLate ? "rgba(239, 68, 68, 0.1)" : "rgba(0, 100, 0, 0.1)",
                 borderColor: bookingStatus.isLate ? "rgba(239, 68, 68, 0.3)" : "rgba(0, 100, 0, 0.3)",
               }}>
            <Clock className="w-3 h-3 mr-2 flex-shrink-0" />
            <span className={bookingStatus.isLate ? "text-red-400" : "text-primary"}>
              {String(bookingStatus.minutes).padStart(2, "0")}:{String(bookingStatus.seconds).padStart(2, "0")}
            </span>
          </div>
        )}

        <Button
          className={`w-full font-bold tracking-wide transition-all ${
            isAvailable
              ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
              : "bg-muted text-muted-foreground hover:bg-muted/80 cursor-pointer"
          }`}
          disabled={false}
          onClick={(e) => {
            e.stopPropagation();
            console.log('Machine card clicked:', machine.machineNumber, 'Available:', isAvailable);

            if (isAvailable) {
              console.log('Calling onBook for machine:', machine);
              onBook(machine);
            } else if (onBookingClick) {
              const bookingToUse = resolvedBooking ?? getMockBookingForMachine(machine.id);
              console.log('Calling onBookingClick with booking:', bookingToUse);
              if (bookingToUse) onBookingClick(machine, bookingToUse);
            }
          }}
        >
          {isAvailable ? "INITIALIZE" : "VIEW DETAILS"}
        </Button>
      </div>
    </motion.div>
  );
}
