import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Lock, Mail, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { CaptchaField } from "@/components/CaptchaField";
import { useToast } from "@/hooks/use-toast";
import { mockUsers, mockUserProfiles, STORAGE_KEYS } from "@/lib/mock-data";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaValid, setCaptchaValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaValid) {
      toast({
        title: "Captcha Required",
        description: "Please solve the captcha correctly",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find user (check by username or email)
    let user = mockUsers.find(
      (u) => u.username === email.toLowerCase() || u.username === email
    );

    // If user doesn't exist, create a new user
    if (!user) {
      user = {
        id: Date.now(),
        username: email.toLowerCase() || email,
        password: password,
        createdAt: new Date(),
      };
    }

    // Get or create user profile
    let profile = mockUserProfiles.find(p => p.userId === user.id);
    if (!profile) {
      profile = {
        id: Date.now(),
        userId: user.id,
        displayName: email.split('@')[0] || email,
        email: email,
        phoneNumber: "" as any,
        telegramHandle: "" as any,
        punctualityPoints: 0,
        block: "" as any,
        preferences: "" as any,
        updatedAt: new Date(),
      } as any;
    }

    // Store user in localStorage
    const currentUser = {
      ...user,
      ...profile,
    };

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));

    // Invalidate auth query to refresh user state
    queryClient.invalidateQueries({ queryKey: ["current-user"] });

    toast({
      title: "Login Successful!",
      description: `Welcome, ${profile?.displayName}!`,
    });

    // Small delay to allow query to refetch
    setTimeout(() => setLocation("/"), 100);

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md border-primary/20">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Lock className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                RHaundry
              </span>
            </CardTitle>
            <CardDescription className="text-center">
              Login to access your laundry dashboard
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-mono">Email or Username</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="text"
                    placeholder="Demo: Enter jamesng242@gmail.com "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter any username or email
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-mono">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter any password
                </p>
              </div>

              <CaptchaField
                value={captcha}
                onChange={setCaptcha}
                onValidChange={setCaptchaValid}
              />
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full font-bold"
                disabled={isLoading || !captchaValid}
              >
                {isLoading ? (
                  "Logging in..."
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </>
                )}
              </Button>

              <div className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Register here
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
