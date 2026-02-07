import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

// Layout
import { MobileNav, DesktopSidebar } from "@/components/Navigation";

// Pages
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
import Leaderboard from "@/pages/Leaderboard";
import Alerts from "@/pages/Alerts";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";

function PrivateRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Landing />;
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex">
      <DesktopSidebar />
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto h-screen w-full">
        <div className="max-w-6xl mx-auto h-full">
          <Component />
        </div>
      </main>
      <MobileNav />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <PrivateRoute component={Home} />} />
      <Route path="/leaderboard" component={() => <PrivateRoute component={Leaderboard} />} />
      <Route path="/alerts" component={() => <PrivateRoute component={Alerts} />} />
      <Route path="/profile" component={() => <PrivateRoute component={Profile} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
