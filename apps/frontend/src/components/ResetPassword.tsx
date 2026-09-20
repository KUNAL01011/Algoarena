import React, { useState } from "react";
import {
  useNavigate,
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import { useLogin, useResetPassword } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { demoUser } from "@/constants/demoUser";

const ResetPassword = () => {
  const { mutate: resetPassword } = useResetPassword();
  const navigate = useNavigate();
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    token: "",
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

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if(!token) return;
    formData.token = token;

    resetPassword(formData);
  };

  const handleGuestLogin = async () => {
    formData.password = demoUser.password;

    resetPassword(formData);
  };

  const isFormValid = formData.password && Object.keys(errors).length === 0;

  return (
    <AuthLayout title="Reset Password" subtitle="Enter new Password here">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          value={formData.password}
          onChange={(value) => handleInputChange("password", value)}
          error={errors.password}
          required
        />


        <LoadingButton type="submit" disabled={!isFormValid} variant="primary">
          Reset Password
        </LoadingButton>

        <Button className="w-full" onClick={handleGuestLogin}>
          <span className="px-2 text-gray-400">Continue As Guest</span>
        </Button>

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
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
