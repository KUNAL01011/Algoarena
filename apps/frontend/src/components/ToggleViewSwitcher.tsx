
import { Button } from "@/components/ui/button";

interface ToggleViewSwitcherProps {
  currentView: "output" | "testcases";
  onViewChange: (view: "output" | "testcases") => void;
  hasTestResults: boolean;
}

const ToggleViewSwitcher = ({ currentView, onViewChange, hasTestResults }: ToggleViewSwitcherProps) => {
  return (
    <div className="flex items-center bg-craft-bg rounded-lg p-1 border border-craft-border">
      <Button
        size="sm"
        variant={currentView === "output" ? "default" : "ghost"}
        onClick={() => onViewChange("output")}
        className={`px-3 py-1 text-xs ${
          currentView === "output" 
            ? "bg-craft-accent text-craft-bg hover:bg-craft-accent/80" 
            : "text-craft-text-secondary hover:text-craft-accent hover:bg-transparent"
        }`}
      >
        Output
      </Button>
      
      <Button
        size="sm"
        variant={currentView === "testcases" ? "default" : "ghost"}
        onClick={() => onViewChange("testcases")}
        disabled={!hasTestResults}
        className={`px-3 py-1 text-xs ${
          currentView === "testcases" 
            ? "bg-craft-accent text-craft-bg hover:bg-craft-accent/80" 
            : "text-craft-text-secondary hover:text-craft-accent hover:bg-transparent disabled:opacity-50"
        }`}
      >
        Test Cases
      </Button>
    </div>
  );
};

export default ToggleViewSwitcher;