import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import FormInput from "@/components/FormInput";
import LoadingButton from "@/components/LoadingButton";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../lib/validation";
import { toast } from "@/hooks/use-toast";
import { useLogin } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { demoUser } from "@/constants/demoUser";

const SignIn = () => {
  const { mutate: signin, isPending: isLoggingIn } = useLogin();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    data: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const emailError = validateEmail(formData.data);
    // if (emailError) newErrors.email = emailError;

    const usernameError = validateUsername(formData.data);

    if (usernameError && emailError)
      newErrors.data = usernameError ? usernameError : emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    signin(formData);
  };

  const handleGoogleSignIn = async () => {
    try {
      toast({
        title: "Welcome!",
        description: "You have successfully signed in with Google.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Google sign in failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };
  const handleGuestLogin = async () => {
    formData.data = demoUser.username;
    formData.password = demoUser.password;

    signin(formData);
  }

  const isFormValid =
    formData.data && formData.password && Object.keys(errors).length === 0;

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your AlgoArena account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Email or Username"
          type="text"
          placeholder="Enter your email or username"
          value={formData.data}
          onChange={(value) => handleInputChange("data", value)}
          error={errors.data}
          required
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(value) => handleInputChange("password", value)}
          error={errors.password}
          required
        />

        <div className="flex items-center justify-between">
          <Link
            to="/forgot-password"
            className="text-sm text-green-400 hover:text-green-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <LoadingButton
          type="submit"
          loading={isLoggingIn}
          disabled={!isFormValid}
          variant="primary"
        >
          Sign In
        </LoadingButton>

        <Button className="w-full" onClick={handleGuestLogin}>
          <span className="px-2 text-gray-400">
            Continue As Guest
          </span>
        </Button>

        <div className="text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
