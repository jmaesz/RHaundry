import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateBooking } from "@/hooks/use-bookings";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import type { Machine } from "@shared/schema";

interface BookingModalProps {
  machine: Machine | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingModal({ machine, open, onOpenChange }: BookingModalProps) {
  const { user } = useAuth();
  const createBooking = useCreateBooking();
  
  const [duration, setDuration] = useState<"30" | "60">("60");
  const [notes, setNotes] = useState("");
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  if (!machine) return null;

  const handleBooking = async () => {
    try {
      await createBooking.mutateAsync({
        machineId: machine.id,
        durationMinutes: parseInt(duration),
        notes: notes || null,
        telegramHandle: null // Ideally fetch from profile
      });
      onOpenChange(false);
      setNotes("");
      setDuration("60");
    } catch (error) {
      // Error handled by query/toast ideally
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="font-mono text-xl text-primary">
            Initialize Machine #{machine.machineNumber}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {machine.block} • {machine.type.toUpperCase()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Duration</Label>
            <RadioGroup 
              defaultValue="60" 
              value={duration} 
              onValueChange={(v) => setDuration(v as "30"|"60")}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="30" id="m30" className="peer sr-only" />
                <Label
                  htmlFor="m30"
                  className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/5 hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                >
                  <span className="text-2xl font-bold">30</span>
                  <span className="text-xs">MINUTES</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="60" id="m60" className="peer sr-only" />
                <Label
                  htmlFor="m60"
                  className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent/5 hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                >
                  <span className="text-2xl font-bold">60</span>
                  <span className="text-xs">MINUTES</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Log Entry (Optional)</Label>
            <Textarea
              placeholder="e.g. Coming back at 2:00PM sharp!"
              className="resize-none bg-black/20 border-border focus:border-primary font-mono text-sm"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2 rounded-lg border p-4 bg-muted/20">
            <Checkbox 
              id="alerts" 
              checked={alertsEnabled}
              onCheckedChange={(c) => setAlertsEnabled(c as boolean)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="alerts"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Enable Smart Alerts
              </label>
              <p className="text-xs text-muted-foreground">
                Get notified via Telegram when done.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-border hover:bg-muted">
            Cancel
          </Button>
          <Button 
            onClick={handleBooking} 
            disabled={createBooking.isPending}
            className="bg-primary hover:bg-primary/90 text-white min-w-[120px]"
          >
            {createBooking.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
