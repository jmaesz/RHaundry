import { useLeaderboard } from "@/hooks/use-leaderboard";
import { Loader2, Trophy, Medal, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Leaderboard() {
  const { data: leaderboard, isLoading } = useLeaderboard();

  // Mock data if empty
  const displayData = leaderboard && leaderboard.length > 0 
    ? leaderboard 
    : [
        { userId: "1", username: "Koon Wei", points: 67, rank: 1 },
        { userId: "2", username: "Sarah L.", points: 52, rank: 2 },
        { userId: "3", username: "Admin", points: 45, rank: 3 },
        { userId: "4", username: "Resident 4", points: 20, rank: 4 },
        { userId: "5", username: "Resident 5", points: 15, rank: 5 },
      ];

  if (isLoading) {
    return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary" /></div>;
  }

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-700" />;
      default: return <span className="font-mono text-muted-foreground w-6 text-center">#{rank}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      <div className="text-center py-8">
        <h1 className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-accent mb-2">
          Hall of Fame
        </h1>
        <p className="text-muted-foreground">Top laundry collectors of the month.</p>
      </div>

      <div className="grid gap-4">
        {displayData.map((entry, index) => (
          <motion.div
            key={entry.userId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`border-none ${index < 3 ? "bg-gradient-to-r from-card to-card/50 border-l-4 border-l-primary" : "bg-card/30"}`}>
              <div className="flex items-center p-4 gap-4">
                <div className="flex-shrink-0 w-10 flex justify-center">
                  {getRankIcon(index + 1)}
                </div>
                
                <Avatar className="h-10 w-10 border border-primary/20">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${entry.username}`} />
                  <AvatarFallback>{entry.username?.substring(0,2)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{entry.username || "Anonymous"}</h3>
                  <p className="text-xs text-muted-foreground">Raffles Hall • Block 4</p>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-primary">{entry.points}</span>
                  <span className="text-xs text-muted-foreground ml-1">PTS</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
