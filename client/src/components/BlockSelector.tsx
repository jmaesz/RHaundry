import { motion } from "framer-motion";
import { Building2, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAllBlocks, mockMachines } from "@/lib/mock-data";

interface BlockSelectorProps {
  onSelectBlock: (block: string) => void;
}

export function BlockSelector({ onSelectBlock }: BlockSelectorProps) {
  const blocks = getAllBlocks();

  // Count machines per block
  const getMachineCount = (block: string) => {
    return mockMachines.filter(m => m.block === block).length;
  };

  // Count available machines per block
  const getAvailableCount = (block: string) => {
    return mockMachines.filter(m => m.block === block && m.status === "available").length;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          Select Your Block
        </h2>
        <p className="text-muted-foreground">
          Choose which block you want to check laundry machines for
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blocks.map((block, index) => {
          const totalMachines = getMachineCount(block);
          const availableMachines = getAvailableCount(block);

          return (
            <motion.div
              key={block}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="cursor-pointer border-2 border-border hover:border-primary/50 transition-all duration-200 bg-card hover:bg-card/80"
                onClick={() => onSelectBlock(block)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-mono font-bold text-xl mb-1">
                          {block}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {totalMachines} machines total
                        </p>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            availableMachines > 0 ? "bg-primary" : "bg-destructive"
                          }`} />
                          <span className={`text-sm font-medium ${
                            availableMachines > 0 ? "text-primary" : "text-destructive"
                          }`}>
                            {availableMachines} available
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
