import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Paperclip, Smile, Send, Loader2 } from "lucide-react";
import type { UserProfile } from "@shared/schema";
import { getChatResponse, isOpenAIConfigured } from "@/lib/openai-chat";

interface MessageModalProps {
  userProfile: UserProfile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isYouLate?: boolean; // If true, you're late and they're chasing you
  initialMessage?: string; // Initial message from the other person
}

interface ChatMessage {
  id: number;
  sender: "user" | "other";
  text: string;
  timestamp: Date;
}

export function MessageModal({
  userProfile,
  open,
  onOpenChange,
  isYouLate = false,
  initialMessage
}: MessageModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [isAIResponding, setIsAIResponding] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with the initial message when modal opens
  useEffect(() => {
    if (open && initialMessage) {
      // Reset messages and set the initial message
      const firstMessage: ChatMessage = {
        id: 1,
        sender: "other",
        text: initialMessage,
        timestamp: new Date(),
      };
      setMessages([firstMessage]);
    } else if (!open) {
      // Clear messages when modal closes
      setMessages([]);
    }
  }, [open, initialMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    console.log("💬 handleSend called");
    console.log("📝 Message input:", messageInput);
    console.log("🤖 AI responding?", isAIResponding);

    if (messageInput.trim() && !isAIResponding) {
      console.log("✅ Conditions passed, sending message");

      const userMessage: ChatMessage = {
        id: messages.length + 1,
        sender: "user",
        text: messageInput,
        timestamp: new Date(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setMessageInput("");
      console.log("📤 User message added to state");

      // Get AI response if OpenAI is configured
      if (isOpenAIConfigured()) {
        console.log("🔄 Getting AI response...");
        setIsAIResponding(true);

        try {
          // Build conversation history for context
          const conversationHistory = updatedMessages.map(msg => ({
            role: msg.sender === "user" ? "user" as const : "assistant" as const,
            content: msg.text,
          }));
          console.log("📚 Conversation history built:", conversationHistory.length, "messages");

          // Get AI response (pass isYouLate to determine which persona to use)
          const aiResponseText = await getChatResponse(messageInput, conversationHistory, isYouLate);
          console.log("📥 AI response received:", aiResponseText);

          // Add AI response to messages
          const aiMessage: ChatMessage = {
            id: updatedMessages.length + 1,
            sender: "other",
            text: aiResponseText,
            timestamp: new Date(),
          };

          console.log("➕ Adding AI message to state");
          setMessages([...updatedMessages, aiMessage]);
          console.log("✅ AI message added successfully");
        } catch (error) {
          console.error("❌ Error getting AI response:", error);

          // Add fallback message if AI fails
          const fallbackMessage: ChatMessage = {
            id: updatedMessages.length + 1,
            sender: "other",
            text: "Eh sorry ah, can't reply now leh... maybe later!",
            timestamp: new Date(),
          };
          setMessages([...updatedMessages, fallbackMessage]);
          console.log("⚠️ Fallback message added");
        } finally {
          setIsAIResponding(false);
          console.log("🏁 AI responding set to false");
        }
      } else {
        console.log("⚠️ OpenAI not configured, no AI response");
      }
    } else {
      console.log("❌ Conditions not met:", {
        hasInput: messageInput.trim().length > 0,
        isAIResponding
      });
    }
  };

  if (!userProfile) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-0 p-0 h-[600px] max-w-md bg-card border-border/50">
        {/* Header */}
        <DialogHeader className="p-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-primary/20">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${userProfile.displayName}`} />
              <AvatarFallback>{userProfile.displayName?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-foreground text-sm">{userProfile.displayName}</p>
              <p className="text-xs text-muted-foreground">
                {isAIResponding ? "Typing..." : "Active"}
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted border border-border text-foreground rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {/* AI Typing Indicator */}
          {isAIResponding && (
            <div className="flex justify-start">
              <div className="max-w-xs px-4 py-2 rounded-lg bg-muted border border-border text-foreground rounded-bl-none">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border/30 space-y-3">
          <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 border border-border/30">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input
              placeholder="Write a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="border-0 bg-transparent text-foreground placeholder-muted-foreground focus-visible:ring-0 flex-1"
            />
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <Smile className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleSend}
              disabled={!messageInput.trim() || isAIResponding}
              className="h-8 px-3 bg-primary hover:bg-primary/90 text-primary-foreground text-xs gap-1"
            >
              {isAIResponding ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Wait
                </>
              ) : (
                <>
                  <Send className="w-3 h-3" />
                  Send
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
