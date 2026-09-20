import { useQuery } from "@tanstack/react-query";
import { potdAPI } from "@/store/usePotdStore";

// Query keys
export const potdKeys = {
  all: ["potd"] as const,
  current: () => [...potdKeys.all, "current"] as const,
};

// Get problem of the day
export const usePotd = () => {
  return useQuery({
    queryKey: potdKeys.current(),
    queryFn: potdAPI.getPotd,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 2,
  });
};
