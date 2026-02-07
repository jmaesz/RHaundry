import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useMachines() {
  return useQuery({
    queryKey: [api.machines.list.path],
    queryFn: async () => {
      const res = await fetch(api.machines.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch machines");
      return api.machines.list.responses[200].parse(await res.json());
    },
  });
}

export function useMachine(id: number) {
  return useQuery({
    queryKey: [api.machines.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.machines.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch machine");
      return api.machines.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
