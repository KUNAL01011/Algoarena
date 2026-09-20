
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Trophy, Star } from "lucide-react";
import { useAuthCheck } from "@/hooks/useAuth";

interface CelebrationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  xpGained: number;
  currentXP: number;
  newXP: number;
}



const CelebrationPopup = ({ isOpen, onClose, xpGained, currentXP, newXP }: CelebrationPopupProps) => {
  const [animatedXP, setAnimatedXP] = useState(currentXP);
  const [showConfetti, setShowConfetti] = useState(false);
  const { data: authUser, refetch } = useAuthCheck();

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      // Animate XP count up
      const duration = 1500;
      const steps = 60;
      const increment = (newXP - currentXP) / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        if (step <= steps) {
          setAnimatedXP(currentXP + (increment * step));
        } else {
          setAnimatedXP(newXP);
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isOpen, currentXP, newXP]);

  const confettiPieces = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className={`absolute w-2 h-2 rounded-full animate-bounce`}
      style={{
        backgroundColor: ['#00FFC6', '#FFAC33', '#4ADE80', '#EF4444'][i % 4],
        left: `${20 + (i * 3)}%`,
        top: `${10 + (i % 4) * 10}%`,
        animationDelay: `${i * 100}ms`,
        animationDuration: `${2000 + (i * 100)}ms`,
      }}
    />
  ));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-craft-panel border-craft-border max-w-md mx-auto overflow-hidden">
        {/* Confetti Background */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {confettiPieces}
            <div className="absolute inset-0 bg-gradient-to-br from-craft-accent/10 to-craft-accent-secondary/10 animate-pulse" />
          </div>
        )}

        <div className="relative z-10 text-center p-6 space-y-6">
          {/* Central Trophy/Coin */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-craft-accent to-craft-accent-secondary rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-craft-accent/25">
                <Trophy className="w-10 h-10 text-craft-bg" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-craft-success rounded-full flex items-center justify-center animate-pulse">
                <Star className="w-3 h-3 text-craft-bg" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-craft-text-primary animate-fade-in">
              You Crushed It! 🎉
            </h2>
            <p className="text-craft-text-secondary animate-fade-in">
              All test cases passed successfully
            </p>
          </div>

          {/* XP Gain Display */}
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-craft-accent to-craft-accent-secondary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-craft-bg" />
              </div>
              <span className="text-3xl font-bold text-craft-accent animate-pulse">
                +{xpGained  || 0} XP
              </span>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm">
              <span className="text-craft-text-secondary">
                {newXP || 0} XP
              </span>
              <div className="w-2 h-2 bg-craft-accent rounded-full animate-pulse" />
              <Badge className="bg-craft-accent/20 text-craft-accent border-craft-accent/30">
                Level {authUser?.level}
              </Badge>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-craft-accent to-craft-accent-secondary hover:from-craft-accent/80 hover:to-craft-accent-secondary/80 text-craft-bg font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Keep Solving! 🚀
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CelebrationPopup;