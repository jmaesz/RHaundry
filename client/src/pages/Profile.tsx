import { useAuth } from "@/hooks/use-auth";
import { useProfile, useUpdateProfile } from "@/hooks/use-profile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserProfileSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Save } from "lucide-react";
import { useEffect } from "react";
import { z } from "zod";

export default function Profile() {
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  const form = useForm<z.infer<typeof insertUserProfileSchema>>({
    resolver: zodResolver(insertUserProfileSchema),
    defaultValues: {
      displayName: "",
      telegramHandle: "",
      phoneNumber: "",
      block: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        displayName: profile.displayName || "",
        telegramHandle: profile.telegramHandle || "",
        phoneNumber: profile.phoneNumber || "",
        block: profile.block || "",
      });
    }
  }, [profile, form]);

  const onSubmit = (data: z.infer<typeof insertUserProfileSchema>) => {
    updateProfile.mutate(data);
  };

  if (isLoading) return <Loader2 className="animate-spin text-primary mx-auto my-20" />;

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-24 h-24 border-2 border-primary shadow-[0_0_20px_rgba(0,100,0,0.3)]">
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.displayName || user?.username}`} />
          <AvatarFallback className="text-2xl bg-muted text-primary">{(user?.displayName || user?.username)?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="text-2xl font-bold font-mono text-white">{user?.displayName || user?.username}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-primary font-mono text-lg">Resident Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} value={field.value || ""} className="bg-background/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="block"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Residential Block</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Block 4" {...field} value={field.value || ""} className="bg-background/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="telegramHandle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telegram Handle</FormLabel>
                      <FormControl>
                        <Input placeholder="@username" {...field} value={field.value || ""} className="bg-background/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+65 9123 4567" {...field} value={field.value || ""} className="bg-background/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-primary text-white hover:bg-primary/90 min-w-[140px]"
                  disabled={updateProfile.isPending}
                >
                  {updateProfile.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
