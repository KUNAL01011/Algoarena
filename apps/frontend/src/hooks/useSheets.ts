import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sheetsAPI, FormData } from "@/api/sheets";

// Query keys
export const sheetKeys = {
  all: ["sheets"] as const,
  lists: () => [...sheetKeys.all, "list"] as const,
  mySheets: () => [...sheetKeys.lists(), "my"] as const,
  publicSheets: () => [...sheetKeys.lists(), "public"] as const,
  details: () => [...sheetKeys.all, "detail"] as const,
  detail: (id: string) => [...sheetKeys.details(), id] as const,
};

// Get all my sheets
export const useMySheets = () => {
  return useQuery({
    queryKey: sheetKeys.mySheets(),
    queryFn: sheetsAPI.getAllMySheets,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

// Get all public sheets
export const usePublicSheets = () => {
  return useQuery({
    queryKey: sheetKeys.publicSheets(),
    queryFn: sheetsAPI.getAllPublicSheets,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

// Get sheet by ID
export const useSheet = (sheetId: string) => {
  return useQuery({
    queryKey: sheetKeys.detail(sheetId),
    queryFn: () => sheetsAPI.getSheetById(sheetId),
    enabled: !!sheetId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Create sheet mutation
export const useCreateSheet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sheetsAPI.createSheet,
    onSuccess: () => {
      // Invalidate sheets lists to refetch
      queryClient.invalidateQueries({ queryKey: sheetKeys.mySheets() });
      queryClient.invalidateQueries({ queryKey: sheetKeys.publicSheets() });
    },
    onError: (error: any) => {
      console.error("Create sheet error:", error);
    },
  });
};

// Update sheet mutation
export const useUpdateSheet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sheetId, formData }: { sheetId: string; formData: FormData }) =>
      sheetsAPI.updateSheet(sheetId, formData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: sheetKeys.mySheets() });
      queryClient.invalidateQueries({ queryKey: sheetKeys.publicSheets() });
      queryClient.invalidateQueries({ queryKey: sheetKeys.detail(variables.sheetId) });
    },
    onError: (error: any) => {
      console.error("Update sheet error:", error);
    },
  });
};

// Delete sheet mutation
export const useDeleteSheet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sheetsAPI.deleteSheet,
    onSuccess: () => {
      // Invalidate sheets lists to refetch
      queryClient.invalidateQueries({ queryKey: sheetKeys.mySheets() });
      queryClient.invalidateQueries({ queryKey: sheetKeys.publicSheets() });
    },
    onError: (error: any) => {
      console.error("Delete sheet error:", error);
    },
  });
};

// Add problems to sheet mutation
export const useAddProblemsToSheet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sheetId, problemIds }: { sheetId: string; problemIds: any }) =>
      sheetsAPI.addProblemsInSheets(sheetId, problemIds),
    onSuccess: (data, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: sheetKeys.detail(variables.sheetId) });
      queryClient.invalidateQueries({ queryKey: sheetKeys.mySheets() });
    },
    onError: (error: any) => {
      console.error("Add problems to sheet error:", error);
    },
  });
};

// Remove problems from sheet mutation
export const useRemoveProblemsFromSheet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sheetId, problemIds }: { sheetId: string; problemIds: any }) =>
      sheetsAPI.removeProblemsInSheets(sheetId, problemIds),
    onSuccess: (data, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: sheetKeys.detail(variables.sheetId) });
      queryClient.invalidateQueries({ queryKey: sheetKeys.mySheets() });
    },
    onError: (error: any) => {
      console.error("Remove problems from sheet error:", error);
    },
  });
};
