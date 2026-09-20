import ForgotPassword from "@/components/ForgotPassword";
import { Navigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return !userInfo ? <ForgotPassword /> : <Navigate to="/dashboard" replace />;
};

export default ForgotPasswordPage;
