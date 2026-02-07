import { motion } from "framer-motion";
import { WashingMachine, Shirt, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { mockMachines } from "@/lib/mock-data";

interface MachineTypeSelectorProps {
  selectedBlock: string;
  onSelectType: (type: "washer" | "dryer") => void;
}

export function MachineTypeSelector({ selectedBlock, onSelectType }: MachineTypeSelectorProps) {
  // Count machines by type for the selected block
  const getTypeCount = (type: "washer" | "dryer") => {
    return mockMachines.filter(m => m.block === selectedBlock && m.type === type).length;
  };

  const getAvailableCount = (type: "washer" | "dryer") => {
    return mockMachines.filter(
      m => m.block === selectedBlock && m.type === type && m.status === "available"
    ).length;
  };

  const types = [
    {
      id: "washer" as const,
      label: "Washing Machines",
      icon: WashingMachine,
      color: "from-blue-500/20 to-primary/20",
      iconColor: "text-blue-400",
    },
    {
      id: "dryer" as const,
      label: "Dryers",
      icon: Shirt,
      color: "from-orange-500/20 to-primary/20",
      iconColor: "text-orange-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          Choose Machine Type
        </h2>
        <p className="text-muted-foreground">
          {selectedBlock} - Select washer or dryer
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {types.map((type, index) => {
          const totalCount = getTypeCount(type.id);
          const availableCount = getAvailableCount(type.id);
          const Icon = type.icon;

          return (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Card
                className="cursor-pointer border-2 border-border hover:border-primary/50 transition-all duration-200 bg-card hover:bg-card/80 h-full"
                onClick={() => onSelectType(type.id)}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-6 rounded-2xl bg-gradient-to-br ${type.color}`}>
                      <Icon className={`w-12 h-12 ${type.iconColor}`} />
                    </div>

                    <div>
                      <h3 className="font-mono font-bold text-2xl mb-2">
                        {type.label}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {totalCount} machines in {selectedBlock}
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          availableCount > 0 ? "bg-primary" : "bg-destructive"
                        }`} />
                        <span className={`text-sm font-medium ${
                          availableCount > 0 ? "text-primary" : "text-destructive"
                        }`}>
                          {availableCount} available now
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground text-sm mt-2">
                      <span>View Machines</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
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
