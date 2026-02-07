import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Clock, MapPin, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageModal } from "@/components/MessageModal";
import { mockIncomingMessages, markMessageAsRead, type IncomingMessage } from "@/lib/mock-messages";
import { mockUserProfiles } from "@/lib/mock-data";

export default function Messages() {
  const [selectedMessage, setSelectedMessage] = useState<IncomingMessage | null>(null);
  const [messageModalOpen, setMessageModalOpen] = useState(false);

  const handleMessageClick = (message: IncomingMessage) => {
    setSelectedMessage(message);
    markMessageAsRead(message.id);
    setMessageModalOpen(true);
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const selectedUserProfile = selectedMessage
    ? mockUserProfiles.find(p => p.userId === selectedMessage.fromUserId)
    : null;

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-mono font-bold tracking-tight text-white mb-1">
          Messages
        </h2>
        <p className="text-muted-foreground">
          People are chasing you to collect your clothes!
        </p>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {mockIncomingMessages.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No messages yet</p>
            </CardContent>
          </Card>
        ) : (
          mockIncomingMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer border-2 transition-all duration-200 hover:border-primary/50 ${
                  message.read ? "border-border/30 bg-card/50" : "border-primary/30 bg-card"
                }`}
                onClick={() => handleMessageClick(message)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      {/* Header */}
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{message.fromUserName}</h3>
                        {!message.read && (
                          <Badge variant="default" className="bg-primary text-primary-foreground">
                            New
                          </Badge>
                        )}
                      </div>

                      {/* Message Preview */}
                      <p className="text-sm text-foreground line-clamp-2">
                        {message.message}
                      </p>

                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimeAgo(message.timestamp)}</span>
                        </div>
                        {message.machineNumber && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{message.block} - {message.machineNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Message Modal */}
      <MessageModal
        userProfile={selectedUserProfile as any}
        open={messageModalOpen}
        onOpenChange={setMessageModalOpen}
        isYouLate={true}
        initialMessage={selectedMessage?.message}
      />
    </div>
  );
}
