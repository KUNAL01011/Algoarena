
import { useEffect, useState } from "react";

interface XPProgressBarProps {
  currentXP: number;
  levelXP: number;
  level: number;
  animate?: boolean;
}

const XPProgressBar = ({ currentXP, levelXP, level, animate = false }: XPProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  const progressPercentage = (currentXP / levelXP) * 100;

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setProgress(progressPercentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setProgress(progressPercentage);
    }
  }, [progressPercentage, animate]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-craft-text-secondary">Level {level}</span>
        <span className="text-craft-text-secondary">
          {currentXP} / {levelXP} XP
        </span>
      </div>
      
      <div className="relative">
        <div className="w-full h-3 bg-craft-bg rounded-full border border-craft-border overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-craft-accent to-craft-accent-secondary rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Glow effect */}
        <div 
          className="absolute top-0 h-3 bg-gradient-to-r from-craft-accent/50 to-craft-accent-secondary/50 rounded-full blur-sm -z-10 transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default XPProgressBar;
