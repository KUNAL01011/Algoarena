import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";
import { User } from "@/api/auth";

interface Sheet {
  id: string;
  name: string;
  description: string;
  userId: string;
  visibility: string;
  createdAt: string;
  updatedAt: string;
  problems: Problem[];
  user: User;
}

interface ProblemSolved {
  id: string;
  userId: string;
  problemId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  problem: Problem;
}

export interface ProblemInSheet {
  id: string;
  sheetId: string;
  problemId: string;
  createdAt: string;
  updatedAt: string;
  sheet: Sheet;
  problem: Problem;
}

interface Submission {
  id: string;
  userId: string;
  problemId: string;
  sourceCode: string;
  language: string;
  stdin: string;
  stdout: string;
  stderr: string;
  compileOutput: string;
  status: string;
  memory: string;
  time: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  problem: Problem;
}

export interface Example {
  input: string;
  output: string;
  explanation: string;
}

export interface Examples {
  [key: string]: Example;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  userId: string;
  examples: Examples;
  constraints: string;
  hints: string;
  editorial: {
    code: string;
    explanation: string;
    language: string;
  };
  privateTestcases: string;
  publicTestcases: string;
  codeSnippets: string;
  referenceSolutions: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  submission: Submission[];
  solvedBy: ProblemSolved[];
  problemsSheets: ProblemInSheet[];
  message: string;
}

export interface PaginationData {
  problems: Problem[];
  pagination: {
    currentPage: string;
    totalPages: string;
    totalProblems: string;
    start: string;
    end: string;
    message: string;
  };
}

interface FilterQuery {
  search?: string;
  difficulty?: string;
  tags?: string;
  filter?: string;
}

// Pure API functions - no state storage, no loading states
export const problemsAPI = {
  // Get all problems with pagination
  getAllProblems: async (page: number = 1): Promise<PaginationData> => {
    try {
      const res = await axiosInstance.get(
        `/problems/get-all-problems?page=${page}`
      );
     
      return res.data.data;

    } catch (error: any) {
     console.log(error)
    }
  },

  // Get problem by ID
  getProblemById: async (id: string): Promise<Problem> => {
    try {
      const res = await axiosInstance.get(`/problems/get-problem/${id}`);
      return res.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch problem");
      throw error;
    }
  },

  // Get top 3 most solved problems
  getTop3Problems: async (): Promise<Problem[]> => {
    try {
      const res = await axiosInstance.get("/problems/get-most-solved-3problem");
      return res.data.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch top problems"
      );
      throw error;
    }
  },

  // Get solved problems by user
  getSolvedProblemsByUser: async (): Promise<ProblemSolved[]> => {
    try {
      const res = await axiosInstance.get("/problems/get-solved-problems");
      return res.data.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch solved problems"
      );
      throw error;
    }
  },

  // Get problems created by user
  getProblemsCreatedByUser: async (): Promise<Problem[]> => {
    try {
      const res = await axiosInstance.get("/problems/problem-created-by-user");
      return res.data.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch created problems"
      );
      throw error;
    }
  },

  // Get all tags
  getAllTags: async (): Promise<{ tag: string; count: number }[]> => {
    try {
      const res = await axiosInstance.get("/problems/get-all-tags");
      return res.data.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch tags");
      throw error;
    }
  },

  // Get all companies challenges
  getAllCompaniesChallenges: async (): Promise<any[]> => {
    try {
      const res = await axiosInstance.get(
        "/problems/get-all-companies-challenges"
      );
      return res.data.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch challenges"
      );
      throw error;
    }
  },

  // Get random problem
  getRandomProblem: async (): Promise<Problem> => {
    try {
      const res = await axiosInstance.get("problems/random-problem");
      return res.data.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch random problem"
      );
      throw error;
    }
  },

  // Create problem
  createProblem: async (problem: any): Promise<any> => {
    try {
      const res = await axiosInstance.post("/problems/create-problem", problem);
      toast.success(res.data.message);
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create problem");
      throw error;
    }
  },

  // Run code against test cases
  runCode: async (data: {
    source_code: string;
    language_id: number;
    problemId: string;
  }): Promise<any> => {
    try {
      const res = await axiosInstance.post("/execute-code/run", data);
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to run code");
      throw error;
    }
  },

  // Submit solution
  submitSolution: async (data: {
    source_code: string;
    language_id: number;
    problemId: string;
  }): Promise<any> => {
    try {
      const res = await axiosInstance.post("/execute-code/submit", data);
      toast.success(res.data.message || "Solution submitted successfully!");
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit solution");
      throw error;
    }
  },
};
