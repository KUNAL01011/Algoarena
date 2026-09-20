import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthCheck } from "@/hooks/useAuth";
import { useProblems } from "@/hooks/useProblems";
import LoadingAnimation from "./LoadingAnimation";

function AuthCheck() {
  const navigate = useNavigate();
  const { data: authUser, isLoading: isCheckingAuth, error } = useAuthCheck();
  const userInfo = localStorage.getItem("userInfo");

  // Prefetch problems when user is authenticated
  useProblems(1);

  useEffect(() => {
    if (error && !userInfo && !authUser) {
      navigate("/signin");
    }
  }, [error, userInfo, authUser, navigate]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-craft-bg flex items-center justify-center">
        <LoadingAnimation size="4xl" />
      </div>
    );
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthCheck;
