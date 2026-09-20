
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X } from "lucide-react";
import TimerCountdown from "./TimerCountdown";

interface ContestTopBarProps {
  questionsCount: number;
  answeredCount: number;
  timeLeft: number;
  onTimeUp: () => void;
  setTimeLeft: (time: number | ((prev: number) => number)) => void;
  onSubmitContest: () => void;
  onToggleNavMenu: () => void;
  isNavMenuOpen: boolean;
}

const ContestTopBar = ({
  questionsCount,
  answeredCount,
  timeLeft,
  onTimeUp,
  setTimeLeft,
  onSubmitContest,
  onToggleNavMenu,
  isNavMenuOpen
}: ContestTopBarProps) => {
  const unansweredCount = questionsCount - answeredCount;

  return (
    <div className="sticky top-0 bg-craft-panel border-b border-craft-border p-4 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            size="sm"
            variant="ghost"
            onClick={onToggleNavMenu}
            className="text-craft-text-secondary hover:text-craft-accent"
          >
            {isNavMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
          <span className="text-craft-text-primary font-semibold">
            Questions: {questionsCount}
          </span>
          <Badge className="bg-craft-success/20 text-craft-success border-craft-success/30">
            Answered: {answeredCount}
          </Badge>
          <Badge className="bg-craft-text-secondary/20 text-craft-text-secondary border-craft-text-secondary/30">
            Remaining: {unansweredCount}
          </Badge>
        </div>
        
        <TimerCountdown 
          timeLeft={timeLeft}
          onTimeUp={onTimeUp}
          setTimeLeft={setTimeLeft}
        />
        
        <Button 
          onClick={onSubmitContest}
          className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
        >
          Submit Contest
        </Button>
      </div>
    </div>
  );
};

export default ContestTopBar;