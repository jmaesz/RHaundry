import { Link, useLocation } from "wouter";
import { Home, ListOrdered, Bell, User, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/leaderboard", icon: ListOrdered, label: "Rank" },
    { href: "/alerts", icon: Bell, label: "Alerts" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border/50 pb-safe md:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = location === href;
          return (
            <Link key={href} href={href}>
              <div
                className={`flex flex-col items-center justify-center w-16 space-y-1 transition-all duration-200 ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "drop-shadow-[0_0_8px_rgba(0,100,0,0.5)]" : ""}`} />
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
  const { logout } = useAuth();

  const navItems = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/leaderboard", icon: ListOrdered, label: "Leaderboard" },
    { href: "/alerts", icon: Bell, label: "Alerts & Chat" },
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
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = location === href;
          return (
            <Link key={href} href={href}>
              <div
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/50">
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
