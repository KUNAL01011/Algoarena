import SignUp from "@/components/SignUp";
import { Navigate } from "react-router-dom";

function SignUpPage() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return !userInfo ? <SignUp /> : <Navigate to="/dashboard" replace />;
}

export default SignUpPage;
