import SignIn from "@/components/SignIn";
import { Navigate } from "react-router-dom";

const SignInPage = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return !userInfo ? <SignIn /> : <Navigate to="/dashboard" replace />;
};

export default SignInPage;
