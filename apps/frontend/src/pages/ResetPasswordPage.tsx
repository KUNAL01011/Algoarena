import ResetPassword from "@/components/ResetPassword";
import { Navigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return !userInfo ? <ResetPassword /> : <Navigate to="/dashboard" replace />;
};

export default ResetPasswordPage;
