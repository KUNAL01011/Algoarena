import { Zap } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center space-x-2 group">
      <div className="w-8 h-8 bg-gradient-to-br from-craft-accent to-craft-accent-secondary rounded-lg flex items-center justify-center group-hover:animate-glow-pulse">
        <Zap className="w-5 h-5 text-craft-bg" />
      </div>
      <span className="text-craft-text-primary font-bold text-xl">
        AlgoArena
      </span>
    </div>
  );
}

export default Logo;
