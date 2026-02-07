import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/use-auth";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function Alerts() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Eh bro, your laundry at Block 4 Machine #2 done alr via. Go take now or -1 point ah.",
      sender: "bot",
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput("");

    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "Ok can. Don't say I never warn you hor. I give you 5 more mins.",
        sender: "bot",
        timestamp: new Date()
      }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col max-w-3xl mx-auto bg-card rounded-xl border border-border overflow-hidden shadow-2xl">
      <div className="bg-muted/50 p-4 border-b border-border flex items-center gap-3">
        <div className="bg-primary/20 p-2 rounded-full">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-bold">Laundry Bot</h2>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                ${msg.sender === "user" ? "bg-accent text-accent-foreground" : "bg-primary/20 text-primary"}
              `}>
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              
              <div className={`
                max-w-[80%] rounded-2xl px-4 py-2 text-sm
                ${msg.sender === "user" 
                  ? "bg-accent text-accent-foreground rounded-tr-none" 
                  : "bg-muted text-foreground rounded-tl-none border border-border/50"}
              `}>
                <p>{msg.text}</p>
                <span className="text-[10px] opacity-50 mt-1 block">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 bg-muted/30 border-t border-border flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Reply to bot..."
          className="bg-background border-border focus:border-primary"
        />
        <Button onClick={handleSend} size="icon" className="bg-primary hover:bg-primary/90 text-white">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
