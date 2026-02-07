import { useLeaderboard } from "@/hooks/use-leaderboard";
import { Loader2, Trophy, Medal, Award, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Leaderboard() {
  const { data: leaderboard, isLoading } = useLeaderboard();

  if (isLoading) {
    return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary" /></div>;
  }

  const displayData = leaderboard || [];

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
          Punctuality Hall of Fame
        </h1>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <p>Most on-time laundry collectors</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  +1 point for on-time pickup (within 5 minutes)<br />
                  -1 point for late pickup (30+ minutes)
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="grid gap-4">
        {displayData.map((entry, index) => {
          const pointsColor = entry.points >= 0 ? "text-green-500" : "text-red-500";
          const isCurrentUser = entry.isCurrentUser;

          return (
            <motion.div
              key={entry.userId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`border-none ${
                isCurrentUser
                  ? "bg-gradient-to-r from-primary/20 to-primary/10 border-2 border-primary"
                  : index < 3
                    ? "bg-gradient-to-r from-card to-card/50 border-l-4 border-l-primary"
                    : "bg-card/30"
              }`}>
                <div className="flex items-center p-4 gap-4">
                  <div className="flex-shrink-0 w-10 flex justify-center">
                    {getRankIcon(entry.rank)}
                  </div>

                  <Avatar className="h-10 w-10 border border-primary/20">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${entry.displayName || entry.username}`} />
                    <AvatarFallback>{(entry.displayName || entry.username)?.substring(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-foreground">{entry.displayName || entry.username || "Anonymous"}</h3>
                      {isCurrentUser && (
                        <Badge variant="outline" className="bg-primary/20 text-primary border-primary">
                          YOU
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {entry.email} • {entry.telegramHandle}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className={`text-2xl font-mono font-bold ${pointsColor}`}>
                      {entry.points >= 0 ? '+' : ''}{entry.points}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">PTS</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
