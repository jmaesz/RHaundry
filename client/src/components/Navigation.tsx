import { Link, useLocation } from "wouter";
import { Home, ListOrdered, Bell, User, MessageSquare, LogOut, Send, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getUnreadMessageCount } from "@/lib/mock-messages";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useProfile } from "@/hooks/use-profile";


export function MobileNav() {
  const [location] = useLocation();
  const unreadCount = getUnreadMessageCount();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/leaderboard", icon: ListOrdered, label: "Rank" },
    { href: "/messages", icon: MessageSquare, label: "Messages", badge: unreadCount },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border/50 pb-safe md:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map(({ href, icon: Icon, label, badge }) => {
          const isActive = location === href;
          return (
            <Link key={href} href={href}>
              <div
                className={`flex flex-col items-center justify-center w-16 space-y-1 transition-all duration-200 relative ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="relative">
                  <Icon className={`w-6 h-6 ${isActive ? "drop-shadow-[0_0_8px_rgba(0,100,0,0.5)]" : ""}`} />
                  {badge && badge > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-4 min-w-4 flex items-center justify-center p-0 px-1 text-[10px]"
                    >
                      {badge}
                    </Badge>
                  )}
                </div>
                <span className="text-[10px] font-medium tracking-wide">{label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function DesktopSidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { data: profile } = useProfile();
  const unreadCount = getUnreadMessageCount();
  const { toast } = useToast();
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  

  const handleDemoSendAlert = async () => {
    setIsSendingEmail(true);
    console.log("📧 Attempting to send demo email...");

    const recipientEmail = user?.email || profile?.email || process.env.VITE_FALLBACK_EMAIL || 'rhaundry@example.com';
    console.log("📧 Using email:", recipientEmail);

    try {
      const response = await fetch('http://localhost:3001/api/email/send-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientName: profile?.displayName || user?.displayName || user?.username || 'Resident',
          recipientEmail: recipientEmail,
          message: "Your machine is done! Come collect your clothes!",
        }),
      });

      console.log("📬 Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Server error:", errorText);
        throw new Error(errorText || `Server responded ${response.status}`);
      }

      const data = await response.json();
      console.log("📨 Response data:", data);

      if (data.success) {
        toast({ title: "Alert Sent! 📧", description: `Email sent to ${recipientEmail}` });
        alert(`✅ Success!\n\nDemo alert email has been sent to:\n${recipientEmail}\n\nCheck your inbox!`);
      } else {
        toast({ title: "Failed to Send Alert", description: data.error || 'Failed to send email', variant: 'destructive' });
        alert(`❌ Failed to send email:\n\n${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("❌ Error sending email:", error);
      toast({
        title: "Failed to Send Alert",
        description: error instanceof Error ? error.message : "Is the email server running? Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const navItems = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/leaderboard", icon: ListOrdered, label: "Leaderboard" },
    { href: "/messages", icon: MessageSquare, label: "Messages", badge: unreadCount },
    { href: "/profile", icon: User, label: "My Profile" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-card border-r border-border/50">
      <div className="p-6">
        <h1 className="text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          RHaundry
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono">v1.0.4 [STABLE]</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map(({ href, icon: Icon, label, badge }) => {
          const isActive = location === href;
          return (
            <Link key={href} href={href}>
              <div
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </div>
                {badge && badge > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {badge}
                  </Badge>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/50 space-y-2">
        <Button
          onClick={handleDemoSendAlert}
          disabled={isSendingEmail}
          className="w-full bg-primary text-white hover:bg-primary/90"
        >
          {isSendingEmail ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Demo Send Alert
            </>
          )}
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={() => logout()}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
      
      
    </aside>
  );
}
