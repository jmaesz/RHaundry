import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { User } from "@shared/models/auth";
import { STORAGE_KEYS } from "@/lib/mock-data";

async function fetchUser(): Promise<User | null> {
  // Get user from localStorage (mock authentication)
  const userJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!userJson) {
    return null;
  }

  try {
    const user = JSON.parse(userJson);
    return user;
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    return null;
  }
}

async function logout(): Promise<void> {
  // Clear user from localStorage
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

export function useAuth() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["current-user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: Infinity, // User data doesn't change unless we update it
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["current-user"], null);
      setLocation("/");
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
