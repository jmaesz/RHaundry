import { useState } from "react";
import { useMachines } from "@/hooks/use-machines";
import { useBookings } from "@/hooks/use-bookings";
import { MachineCard } from "@/components/MachineCard";
import { BookingModal } from "@/components/BookingModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Filter } from "lucide-react";
import { motion } from "framer-motion";
import type { Machine } from "@shared/schema";

export default function Home() {
  const { data: machines, isLoading: machinesLoading } = useMachines();
  const { data: bookings, isLoading: bookingsLoading } = useBookings();
  
  const [selectedBlock, setSelectedBlock] = useState<string>("all");
  const [machineType, setMachineType] = useState<"all" | "washer" | "dryer">("all");
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  const isLoading = machinesLoading || bookingsLoading;

  // Filter Logic
  const filteredMachines = machines?.filter(m => {
    const blockMatch = selectedBlock === "all" || m.block === selectedBlock;
    const typeMatch = machineType === "all" || m.type === machineType;
    return blockMatch && typeMatch;
  });

  // Get unique blocks
  const blocks = Array.from(new Set(machines?.map(m => m.block) || [])).sort();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-mono font-bold tracking-tight text-white mb-1">
            Dashboard
          </h2>
          <p className="text-muted-foreground">Monitor and control laundry systems.</p>
        </div>

        <div className="flex gap-3">
          <Select value={selectedBlock} onValueChange={setSelectedBlock}>
            <SelectTrigger className="w-[140px] bg-card border-border">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" />
                <SelectValue placeholder="Block" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Blocks</SelectItem>
              {blocks.map(block => (
                <SelectItem key={block} value={block}>{block}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={(v) => setMachineType(v as any)}>
        <TabsList className="bg-card/50 p-1 border border-border/50">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">All Units</TabsTrigger>
          <TabsTrigger value="washer" className="data-[state=active]:bg-primary data-[state=active]:text-white">Washers</TabsTrigger>
          <TabsTrigger value="dryer" className="data-[state=active]:bg-primary data-[state=active]:text-white">Dryers</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredMachines && filteredMachines.length > 0 ? (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredMachines.map((machine) => {
            // Find active booking for this machine (not strictly efficient but fine for small list)
            const activeBooking = bookings?.find(b => b.machine.id === machine.id && !b.completed);
            
            return (
              <motion.div key={machine.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <MachineCard
                  machine={machine}
                  activeBooking={activeBooking}
                  onBook={setSelectedMachine}
                />
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-card/30 rounded-xl border border-dashed border-border">
          <p className="text-muted-foreground font-mono">No units found matching criteria.</p>
        </div>
      )}

      <BookingModal 
        machine={selectedMachine} 
        open={!!selectedMachine} 
        onOpenChange={(open) => !open && setSelectedMachine(null)}
      />
    </div>
  );
}
