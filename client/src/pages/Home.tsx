import { useState } from "react";
import { mockMachines, getMockBookingForMachine, getUserProfile } from "@/lib/mock-data";
import { MachineCard } from "@/components/MachineCard";
import { BookingModal } from "@/components/BookingModal";
import { BookingDetailsModal } from "@/components/BookingDetailsModal";
import { MessageModal } from "@/components/MessageModal";
import { SelectionFlow } from "@/components/SelectionFlow";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import type { Machine, Booking } from "@shared/schema";

export default function Home() {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"washer" | "dryer" | null>(null);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [messageUserId, setMessageUserId] = useState<number | null>(null);

  // Handle selection completion
  const handleSelectionComplete = (block: string, type: "washer" | "dryer") => {
    setSelectedBlock(block);
    setSelectedType(type);
  };

  // Handle booking details click
  const handleBookingDetailsClick = (machine: Machine, booking: Booking) => {
    console.log('handleBookingDetailsClick called:', machine.machineNumber);
    setSelectedMachine(machine);
    setSelectedBooking(booking);
    setBookingDetailsOpen(true);
  };

  // Handle booking (initialize) click
  const handleBookMachine = (machine: Machine) => {
    console.log('handleBookMachine called:', machine.machineNumber);
    setSelectedMachine(machine);
    setBookingDetailsOpen(false); // Ensure booking details modal is closed
  };

  // Handle send message click
  const handleSendMessage = (userId: number) => {
    setMessageUserId(userId);
    setMessageModalOpen(true);
  };

  // Handle closing booking details modal
  const handleBookingDetailsOpenChange = (open: boolean) => {
    setBookingDetailsOpen(open);
    if (!open) {
      setSelectedMachine(null);
    }
  };

  // Go back one step
  const handleBack = () => {
    setSelectedType(null);
    setSelectedMachine(null);
  };

  // Reset selection
  const handleReset = () => {
    setSelectedBlock(null);
    setSelectedType(null);
    setSelectedMachine(null);
  };

  // Filter machines based on selection
  const filteredMachines = selectedBlock && selectedType
    ? mockMachines.filter(m => m.block === selectedBlock && m.type === selectedType)
    : [];

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

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-mono font-bold tracking-tight text-white mb-1">
            Dashboard
          </h2>
          <p className="text-muted-foreground">
            {selectedBlock && selectedType
              ? `Showing ${selectedType}s in ${selectedBlock}`
              : "Select a block and machine type to get started"
            }
          </p>
        </div>

        {selectedBlock && selectedType && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleBack}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Start Over
            </Button>
          </div>
        )}
      </div>

      {/* Selection Flow or Machine Grid */}
      {!selectedBlock || !selectedType ? (
        <SelectionFlow onComplete={handleSelectionComplete} />
      ) : (
        <div>
          {filteredMachines.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredMachines.map((machine) => {
                const activeBooking = getMockBookingForMachine(machine.id);

                return (
                  <motion.div
                    key={machine.id}
                    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  >
                    <MachineCard
                      machine={machine}
                      activeBooking={activeBooking}
                      onBook={handleBookMachine}
                      onBookingClick={handleBookingDetailsClick}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-card/30 rounded-xl border border-dashed border-border">
              <p className="text-muted-foreground font-mono">No machines found.</p>
            </div>
          )}
        </div>
      )}

      <BookingDetailsModal
        machine={selectedMachine}
        booking={selectedBooking}
        open={bookingDetailsOpen}
        onOpenChange={handleBookingDetailsOpenChange}
        onSendMessage={handleSendMessage}
      />

      <BookingModal
        machine={selectedMachine}
        open={!!selectedMachine && !bookingDetailsOpen}
        onOpenChange={(open) => !open && setSelectedMachine(null)}
        onBookingComplete={() => {
          setSelectedMachine(null);
          setRefreshKey(prev => prev + 1);
        }}
      />

      <MessageModal
        userProfile={messageUserId ? (getUserProfile(messageUserId) as any) : null}
        open={messageModalOpen}
        onOpenChange={setMessageModalOpen}
      />
    </div>
  );
}
