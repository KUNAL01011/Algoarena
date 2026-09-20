import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

// Define types for user and payloads
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
  role?: string;
  localPassword?: string;
  bio?: string;
  currentStreak?: number;
  maxStreak?: number;
  lastSubmission?: Date | string;
  isVerified?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  problems?: any[]; // Replace `any` with specific problem type if available
  submission?: any[]; // Replace `any` with specific submission type if available
  problemSolved?: number;
  sheets?: any[]; // Replace with actual type if available
  links?: {
    [key: string]: string;
  };
  yearlyGrid?: {
    [year: string]: {
      [day: string]: number;
    };
  };
  achievements?: any[]; // Replace with actual achievement type if available
  badges?: any[]; // Replace with actual badge type if available
  xp?: string;
  level?: string;
  tier?: string;
  hintsUsed?: number;
  editorialUsed?: number;
}

interface SignupData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  data: string;
  password: string;
}

interface OtpData {
  otp: string;
}

interface ResetPasswordData {
  token: string;
  password: string;
}

interface SocialAuthData {
  provider: string;
  token: string;
}

interface ForgotPasswordData {
  email: string;
}

export interface UpdateUserData {
  name?: string;
  username?: string;
  bio?: string;
  image?: string;
}

export const authAPI = {
  checkAuth: async (): Promise<User> => {
    try {
      const res = await axiosInstance.get("/auth/check");
      return res.data.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          await axiosInstance.get("/refresh-token");
          const res = await axiosInstance.get("/auth/check");
          return res.data.data;
        } catch (refreshError) {
          throw new Error("Authentication failed");
        }
      } else {
        throw error;
      }
    }
  },

  signup: async (data: SignupData) => {
    try {
      const res = await axiosInstance.post("/auth/register", data, {
        withCredentials: true,
      });
      return res;
    } catch (error: any) {
      
      toast.error(error.response.data.message);
      throw error;
    }
  },

  verify: async (otp: OtpData) => {
    try {
      const res = await axiosInstance.post("/auth/verify-account", otp);
      return res;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },

  signin: async (data: LoginData) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      localStorage.setItem("userInfo", JSON.stringify(res.data.data));
      return res;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },

  forgotPassword: async (data: ForgotPasswordData) => {
    try {
      const res = await axiosInstance.post("/auth/forgot-password", data);
      if (res.data.success) {
        toast.success("Check your email");
      }
      return res;
    } catch (error: any) {
      toast.error("didn't find your email");
      
      throw error;
    }
  },

  resetPassword: async (data: ResetPasswordData) => {
    try {
      
      const res = await axiosInstance.post("/auth/reset-password", data);
      return res;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },

  socialAuth: async (data: SocialAuthData) => {
    try {
      const res = await axiosInstance.post("/auth/social-auth", data);
      return res;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      localStorage.removeItem("userInfo");
      return res;
    } catch (error: any) {
      
      toast.error("Error logging out");
      throw error;
    }
  },

  updateUser: async (data: UpdateUserData): Promise<User> => {
    try {
      const res = await axiosInstance.post("/user/update-profile", data);
      toast.success("Profile updated successfully!");
      return res.data.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to update profile";
      toast.error(message);
      throw error;
    }
  },
};
