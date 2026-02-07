import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertBooking } from "@shared/schema";

export function useBookings() {
  return useQuery({
    queryKey: [api.bookings.list.path],
    queryFn: async () => {
      const res = await fetch(api.bookings.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch bookings");
      return api.bookings.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertBooking) => {
      const res = await fetch(api.bookings.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.bookings.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        if (res.status === 401) {
            throw new Error("You must be logged in to book.");
        }
        throw new Error("Failed to create booking");
      }
      return api.bookings.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.bookings.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.machines.list.path] }); // Machine status might change
    },
  });
}

export function useCompleteBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.bookings.complete.path, { id });
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to complete booking");
      return api.bookings.complete.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.bookings.list.path] });
    },
  });
}
