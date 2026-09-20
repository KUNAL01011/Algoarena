import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { PaginationData, Problem, problemsAPI } from "@/api/problems";

// Query keys
export const problemKeys = {
  all: ["problems"] as const,
  lists: () => [...problemKeys.all, "list"] as const,
  list: (page: number) => [...problemKeys.lists(), page] as const,
  details: () => [...problemKeys.all, "detail"] as const,
  detail: (id: string) => [...problemKeys.details(), id] as const,
  top3: () => [...problemKeys.all, "top3"] as const,
  solved: () => [...problemKeys.all, "solved"] as const,
  created: () => [...problemKeys.all, "created"] as const,
  tags: () => [...problemKeys.all, "tags"] as const,
  companies: () => [...problemKeys.all, "companies"] as const,
  random: () => [...problemKeys.all, "random"] as const,
};

// Get all problems with pagination using React Query
export const useProblems = () => {
  return useInfiniteQuery<
    PaginationData,
    Error,
    { problems: Problem[]; pagination: PaginationData["pagination"] }, // ← Transformed shape
    [string],
    number
  >({
    queryKey: ["problems"],
    queryFn: ({ pageParam = 1 }) => problemsAPI.getAllProblems(pageParam),
    getNextPageParam: (lastPage) => {
      const currentPage = Number(lastPage?.pagination?.currentPage);
      const totalPages = Number(lastPage?.pagination?.totalPages);

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,

    // 👇 This transforms the raw infinite `pages` into one flat object
    select: (data) => {
      return {
        problems: data.pages.flatMap((page) => page.problems),
        pagination: data.pages[data.pages.length - 1].pagination, // Use latest page's pagination
      };
    },
  });
};


// Get problem by ID
export const useProblem = (id: string) => {
  return useQuery({
    queryKey: problemKeys.detail(id),
    queryFn: () => problemsAPI.getProblemById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Get random problem - for Dashboard
export const useRandomProblem = () => {
  return useQuery({
    queryKey: problemKeys.random(),
    queryFn: problemsAPI.getRandomProblem,
    enabled: false, // Only fetch when explicitly called
    staleTime: 0, // Always fresh
    gcTime: 5 * 60 * 1000,
  });
};

// Get top 3 problems - for Index page
export const useTop3Problems = () => {
  return useQuery({
    queryKey: problemKeys.top3(),
    queryFn: problemsAPI.getTop3Problems,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Get solved problems by user
export const useSolvedProblems = () => {
  return useQuery({
    queryKey: problemKeys.solved(),
    queryFn: problemsAPI.getSolvedProblemsByUser,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Get problems created by user
export const useCreatedProblems = () => {
  return useQuery({
    queryKey: problemKeys.created(),
    queryFn: problemsAPI.getProblemsCreatedByUser,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Get all tags - for Index page
export const useTags = () => {
  return useQuery({
    queryKey: problemKeys.tags(),
    queryFn: problemsAPI.getAllTags,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};

// Get companies challenges - for Index page
export const useCompaniesChallenges = () => {
  return useQuery({
    queryKey: problemKeys.companies(),
    queryFn: problemsAPI.getAllCompaniesChallenges,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

// Create problem mutation
export const useCreateProblem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: problemsAPI.createProblem,
    onSuccess: () => {
      // Invalidate problems list to refetch
      queryClient.invalidateQueries({ queryKey: problemKeys.lists() });
      queryClient.invalidateQueries({ queryKey: problemKeys.created() });
      // Navigation is handled in the component
    },
    onError: (error: any) => {
      console.error("Create problem error:", error);
    },
  });
};
