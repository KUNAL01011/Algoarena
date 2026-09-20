import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import FormInput from "./FormInput";
import LoadingButton from "./LoadingButton";
import GoogleSignInButton from "./GoogleSignInButton";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../lib/validation";
import { toast } from "@/hooks/use-toast";
import { useSignup } from "@/hooks/useAuth";

const SignUp = () => {
  const { mutate: signup, isPending: isSigninUp } = useSignup();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
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

    const usernameError = validateUsername(formData.username);
    if (usernameError) newErrors.username = usernameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    signup(formData);
  };

  const handleGoogleSignIn = async () => {
    try {
      toast({
        title: "Welcome!",
        description: "You have successfully signed up with Google.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Google sign up failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const isFormValid =
    formData.name &&
    formData.username &&
    formData.email &&
    formData.password &&
    Object.keys(errors).length === 0;

  return (
    <AuthLayout title="Create Account" subtitle="Sign up to AlgoArena">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Name"
          type="text"
          placeholder="Enter a name"
          value={formData.name}
          onChange={(value) => handleInputChange("name", value)}
          error={errors.name}
          required
        />
        <FormInput
          label="Username"
          type="text"
          placeholder="Choose a username"
          value={formData.username}
          onChange={(value) => handleInputChange("username", value)}
          error={errors.username}
          required
        />

        <FormInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(value) => handleInputChange("email", value)}
          error={errors.email}
          required
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={(value) => handleInputChange("password", value)}
          error={errors.password}
          required
        />

        <LoadingButton
          type="submit"
          loading={isSigninUp}
          disabled={!isFormValid}
          variant="primary"
        >
          Create Account
        </LoadingButton>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <GoogleSignInButton onClick={handleGoogleSignIn} loading={isSigninUp} />

        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-xs text-blue-300 text-center">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
