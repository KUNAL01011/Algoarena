import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authAPI, User } from "@/api/auth";

// Query keys
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

// Check authentication hook using React Query
export const useAuthCheck = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: authAPI.checkAuth,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

// Get current user from React Query cache
export const useCurrentUser = (): User | undefined => {
  const { data: authUser } = useAuthCheck();
  return authUser as User | undefined;
};

// Login mutation
export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.signin,
    onSuccess: async (response) => {
      // Update the auth query cache with the user data
      queryClient.setQueryData(authKeys.user(), response.data.data);
      toast.success("Login successful!");

      // Perform auth check before navigation to ensure user is properly authenticated
      try {
        await queryClient.refetchQueries({ queryKey: authKeys.user() });
        navigate("/dashboard");
      } catch (error) {
        console.error("Auth check failed after login:", error);
        toast.error(
          "Authentication verification failed. Please try logging in again."
        );
      }
    },
    onError: (error: any) => {
      // Error is already handled in authAPI.signin
      console.error("Login error:", error);
    },
  });
};

// Signup mutation
export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authAPI.signup,
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success(
          "Account created successfully! Please verify your email."
        );
        navigate("/verify-account");
      }
    },
    onError: (error: any) => {
      // Error is already handled in authAPI.signup
      console.error("Signup error:", error);
    },
  });
};

// Verify account mutation
export const useVerify = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authAPI.verify,
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success("Account verified successfully!");

        // Small delay to ensure verification is processed
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      }
    },
    onError: (error: any) => {
      // Error is already handled in authAPI.verify
      console.error("Verify error:", error);
    },
  });
};

// Forgot password mutation
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authAPI.forgotPassword,
    onSuccess: () => {
      // Success is already handled in authAPI.forgotPassword
    },
    onError: (error: any) => {
      // Error is already handled in authAPI.forgotPassword
      console.error("Forgot password error:", error);
    },
  });
};

// Reset password mutation
export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authAPI.resetPassword,
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success("Password reset successfully!");
        navigate("/signin");
      }
    },
    onError: (error: any) => {
      // Error is already handled in authAPI.resetPassword
      console.error("Reset password error:", error);
    },
  });
};

// Social auth mutation
export const useSocialAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.socialAuth,
    onSuccess: async (response) => {
      if (response.data.success) {
        queryClient.setQueryData(authKeys.user(), response.data.data);
        toast.success("Login successful!");

        // Perform auth check before navigation to ensure user is properly authenticated
        try {
          await queryClient.refetchQueries({ queryKey: authKeys.user() });
          navigate("/dashboard");
        } catch (error) {
          console.error("Auth check failed after social login:", error);
          toast.error(
            "Authentication verification failed. Please try logging in again."
          );
        }
      }
    },
    onError: (error: any) => {
      // Error is already handled in authAPI.socialAuth
      console.error("Social auth error:", error);
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
      toast.success("Logged out successfully");
      navigate("/signin");
    },
    onError: (error: any) => {
      // Error is already handled in authAPI.logout
      console.error("Logout error:", error);
    },
  });
};

// Update user mutation
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.updateUser,
    onSuccess: (updatedUser) => {
      // Update the auth query cache with the updated user data
      queryClient.setQueryData(authKeys.user(), updatedUser);

      // Optionally refetch to ensure data consistency
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
    onError: (error: any) => {
      // Error is already handled in authAPI.updateUser
      console.error("Update user error:", error);
    },
  });
};
