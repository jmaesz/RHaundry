import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, CheckCircle2, MessageCircle } from "lucide-react";
import { calculateBookingStatus, getUserProfile } from "@/lib/mock-data";
import type { Machine, Booking } from "@shared/schema";

interface BookingDetailsModalProps {
  machine: Machine | null;
  booking: Booking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendMessage?: (userId: number) => void;
}

export function BookingDetailsModal({ machine, booking, open, onOpenChange, onSendMessage }: BookingDetailsModalProps) {
  const [status, setStatus] = useState(booking ? calculateBookingStatus(booking) : null);
  const userProfile = booking ? getUserProfile(booking.userId) : null;

  useEffect(() => {
    if (!booking) return;

    const interval = setInterval(() => {
      setStatus(calculateBookingStatus(booking));
    }, 1000);

    return () => clearInterval(interval);
  }, [booking]);

  if (!machine || !booking || !userProfile || !status) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="font-mono text-xl text-primary">
            Machine #{machine.machineNumber} Details
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {machine.block} • {machine.type.toUpperCase()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* User Info */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/20 border border-border">
            <Avatar className="h-12 w-12 border border-primary/20">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${userProfile.displayName}`} />
              <AvatarFallback>{userProfile.displayName?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-bold text-foreground">{userProfile.displayName}</h3>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
              {userProfile.telegramHandle && (
                <p className="text-xs text-primary mt-1">{userProfile.telegramHandle}</p>
              )}
            </div>
          </div>

          {/* Booking Duration Info */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Booking Duration</p>
            <div className="text-sm text-foreground hover:text-primary transition-colors">
              {booking.durationMinutes} minutes total
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/20 border border-border">
            <div className="flex-shrink-0">
              {status.isLate ? (
                <AlertCircle className="w-6 h-6 text-destructive animate-pulse" />
              ) : (
                <Clock className="w-6 h-6 text-primary" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                {status.isLate ? "Status: LATE" : "Status: IN PROGRESS"}
              </p>
              <p className={`text-2xl font-mono font-bold ${status.isLate ? "text-destructive" : "text-primary"}`}>
                {String(status.minutes).padStart(2, "0")}:{String(status.seconds).padStart(2, "0")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{status.message}</p>
            </div>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Notes</p>
              <div className="p-3 rounded-lg bg-muted/20 border border-border text-sm text-foreground font-mono">
                "{booking.notes}"
              </div>
            </div>
          )}

          {/* Alert Message */}
          {status.isLate && (
            <div className="flex gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="text-sm text-destructive">
                User has not collected their laundry. Has been late for {status.minutes}m {status.seconds}s.
              </div>
            </div>
          )}

          {!status.isLate && (
            <div className="flex gap-3 p-3 rounded-lg bg-primary/10 border border-primary/30">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-primary">
                Booking will be completed in {status.minutes}m {status.seconds}s.
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-border hover:bg-muted flex-1"
          >
            Close
          </Button>
          <Button
            onClick={() => onSendMessage?.(booking.userId)}
            className="gap-2 bg-primary hover:bg-primary/90 flex-1"
          >
            <MessageCircle className="w-4 h-4" />
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
