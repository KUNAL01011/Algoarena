import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import FormInput from "@/components/FormInput";
import LoadingButton from "@/components/LoadingButton";
import {
  validateEmail,
} from "../lib/validation";
import { toast } from "@/hooks/use-toast";
import { useForgotPassword, useLogin } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { demoUser } from "@/constants/demoUser";

const ForgotPassword = () => {
  const { mutate: forgotPassword } = useForgotPassword();
 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
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

    const emailError = validateEmail(formData.email);
    // if (emailError) newErrors.email = emailError;


    if (emailError)
      newErrors.email = emailError;

 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    forgotPassword(formData);
  };


  const handleGuestLogin = async () => {
    formData.data = demoUser.username;
    formData.password = demoUser.password;

    signin(formData);
  }

  const isFormValid =
    formData.email && Object.keys(errors).length === 0;

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="forgot password by your email"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Email"
          type="text"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(value) => handleInputChange("email", value)}
          error={errors.email}
          required
        />

        <LoadingButton
          type="submit"
          disabled={!isFormValid}
          variant="primary"
        >
          Forgot Password
        </LoadingButton>

        <Button className="w-full" onClick={handleGuestLogin}>
          <span className="px-2 text-gray-400">
            Continue As Guest
          </span>
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

export default ForgotPassword;
