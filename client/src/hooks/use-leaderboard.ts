import { useQuery } from "@tanstack/react-query";
import { mockLeaderboard, STORAGE_KEYS } from "@/lib/mock-data";

export function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Get current user from localStorage to mark them in the leaderboard
      const currentUserJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      const currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;

      // Start with mock leaderboard
      let allUsers = [...mockLeaderboard];

      // Check if current user is already in the leaderboard
      const isCurrentUserInMock = mockLeaderboard.some(entry => entry.userId === currentUser?.id);

      // If current user is not in mock data, add them
      if (currentUser && !isCurrentUserInMock) {
        allUsers.push({
          userId: currentUser.id,
          username: currentUser.username,
          displayName: currentUser.displayName || currentUser.username,
          email: currentUser.email,
          telegramHandle: currentUser.telegramHandle,
          points: currentUser.punctualityPoints || 0,
          rank: 0, // Will be recalculated
          isCurrentUser: true,
        });
      }

      // Return leaderboard, updating isCurrentUser based on logged-in user
      // Sort by points: highest to lowest
      return allUsers
        .map(entry => ({
          ...entry,
          isCurrentUser: currentUser ? entry.userId === currentUser.id : entry.isCurrentUser
        }))
        .sort((a, b) => b.points - a.points)
        .map((entry, index) => ({
          ...entry,
          rank: index + 1 // Update rank based on sorted position
        }));
    },
    staleTime: 0, // Always refetch to check current user
  });
}
