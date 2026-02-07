import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlockSelector } from "./BlockSelector";
import { MachineTypeSelector } from "./MachineTypeSelector";

interface SelectionFlowProps {
  onComplete: (block: string, type: "washer" | "dryer") => void;
}

export function SelectionFlow({ onComplete }: SelectionFlowProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedBlock, setSelectedBlock] = useState<string>("");
  const [selectedType, setSelectedType] = useState<"washer" | "dryer" | null>(null);

  const handleBlockSelect = (block: string) => {
    setSelectedBlock(block);
    setStep(2);
  };

  const handleTypeSelect = (type: "washer" | "dryer") => {
    setSelectedType(type);
    onComplete(selectedBlock, type);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setSelectedType(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb / Progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className={step === 1 ? "text-primary font-medium" : "text-muted-foreground"}>
            1. Select Block
          </span>
          <span className="text-muted-foreground">→</span>
          <span className={step === 2 ? "text-primary font-medium" : "text-muted-foreground"}>
            2. Select Type
          </span>
          <span className="text-muted-foreground">→</span>
          <span className="text-muted-foreground">
            3. Choose Machine
          </span>
        </div>

        {step === 2 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
        )}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="block-selector"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <BlockSelector onSelectBlock={handleBlockSelect} />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="type-selector"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <MachineTypeSelector
              selectedBlock={selectedBlock}
              onSelectType={handleTypeSelect}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
