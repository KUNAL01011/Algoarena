import Lottie from "react-lottie";
import animationData from "@/lib/loader.json";

interface LoadingAnimationProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

const LoadingAnimation = ({
  className = "",
  size = "md",
}: LoadingAnimationProps) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
    "2xl": "w-64 h-64",
    "3xl": "w-80 h-80",
    "4xl": "w-96 h-96",
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="grid place-content-center h-screen p-12 bg-craft-bg">
      <div className={`${sizeClasses[size]} ${className}`}>
        <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
      </div>
    </div>
  );
};

export default LoadingAnimation;
