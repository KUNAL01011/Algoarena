import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";
import { User } from "@/api/auth";
import { ProblemInSheet } from "@/api/problems";

export interface Sheet {
  id: string;
  name: string;
  description: string;
  userId: string;
  visibility: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  problems: ProblemInSheet[];
  user: User;
}

export interface FormData {
  name: string;
  description: string;
  tags: string[];
  visibility: "Public" | "Private";
  problemIds?: string[];
}

// Pure API functions - no state storage, no loading states
export const sheetsAPI = {
  // Create sheet
  createSheet: async (formData: FormData): Promise<any> => {
    try {
      const res = await axiosInstance.post("/sheets/create-sheet", formData);
      toast.success("Sheet created successfully!");
      return res.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to create sheet";
      toast.error(message);
      throw error;
    }
  },

  // Get all public sheets
  getAllPublicSheets: async (): Promise<Sheet[]> => {
    try {
      const res = await axiosInstance.get("sheets/public");
      return res.data.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to fetch public sheets";
      toast.error(message);
      throw error;
    }
  },

  // Get all my sheets
  getAllMySheets: async (): Promise<Sheet[]> => {
    try {
      const res = await axiosInstance.get("sheets/my-sheets");
      return res.data.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to fetch your sheets";
      toast.error(message);
      throw error;
    }
  },

  // Get sheet by ID
  getMySheetById: async (sheetId: string): Promise<Sheet> => {
    try {
      const res = await axiosInstance.get(`sheets/${sheetId}`);
      return res.data.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to fetch sheet";
      toast.error(message);
      throw error;
    }
  },

  getSheetById: async (sheetId: string): Promise<Sheet> => {
    try {
      const res = await axiosInstance.get(`sheets/get-sheet-by-id/${sheetId}`);
      return res.data.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to fetch sheet";
      toast.error(message);
      throw error;
    }
  },

  // Update sheet
  updateSheet: async (sheetId: string, formData: FormData): Promise<any> => {
    try {
      const res = await axiosInstance.post(
        `sheets/update-sheet/${sheetId}`,
        formData
      );
      toast.success("Sheet updated successfully!");
      return res.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to update sheet";
      toast.error(message);
      throw error;
    }
  },

  // Delete sheet
  deleteSheet: async (sheetId: string): Promise<void> => {
    try {
      await axiosInstance.delete(`sheets/${sheetId}`);
      toast.success("Sheet deleted successfully!");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to delete sheet";
      toast.error(message);
      throw error;
    }
  },

  // Add problems to sheet
  addProblemsInSheets: async (
    sheetId: string,
    problemIds: any
  ): Promise<any> => {
    try {
      const res = await axiosInstance.post(
        `sheets/${sheetId}/add-problems`,
        problemIds
      );
      toast.success("Problems added to sheet successfully!");
      return res.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to add problems to sheet";
      toast.error(message);
      throw error;
    }
  },

  // Remove problems from sheet
  removeProblemsInSheets: async (
    sheetId: string,
    problemIds: any
  ): Promise<any> => {
    try {
      const res = await axiosInstance.post(
        `/remove-problems/${sheetId}`,
        problemIds
      );
      toast.success("Problems removed from sheet successfully!");
      return res.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Failed to remove problems from sheet";
      toast.error(message);
      throw error;
    }
  },
};
