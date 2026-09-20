import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";
import { Problem } from "../api/problems";

export interface Potd {
  id: string;
  date: Date;
  problemId: string;
  userId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  problem: Problem;
  solvedUsers: string[];
}

// Pure API functions - no state storage, no loading states
export const potdAPI = {
  // Get problem of the day
  getPotd: async (): Promise<Potd> => {
    try {
      const res = await axiosInstance.get("/potd/get-potd");
      return res.data.data;
    } catch (error: any) {
      console.error("Error fetching POTD:", error);
      toast.error("Failed to fetch problem of the day");
      throw error;
    }
  },
};
