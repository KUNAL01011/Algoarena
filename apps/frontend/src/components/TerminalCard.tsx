
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Terminal } from "lucide-react";
import ToggleViewSwitcher from "./ToggleViewSwitcher";
import TestCaseResultItem from "./TestCaseResultItem";
import OutputTerminalBlock from "./OutputTerminalBlock";

interface TerminalCardProps {
  outputText: string;
  testResults: Array<{ id: number; passed: boolean }>;
  isVisible: boolean;
  onClose: () => void;
}

const TerminalCard = ({ outputText, testResults, isVisible, onClose }: TerminalCardProps) => {
  const [viewMode, setViewMode] = useState<"output" | "testcases">("output");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-switch to test cases if all tests pass
  const allTestsPassed = testResults.length > 0 && testResults.every(test => test.passed);
  
  // If all tests passed and we have test results, show test cases view
  const currentViewMode = allTestsPassed && testResults.length > 0 ? "testcases" : viewMode;

  if (!isVisible) return null;

  return (
    <Card className="bg-craft-panel border-craft-border shadow-lg mx-4 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-craft-border">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-craft-accent" />
          <h3 className="text-craft-text-primary font-semibold">Terminal</h3>
        </div>
        
        <div className="flex items-center space-x-4">
          <ToggleViewSwitcher
            currentView={currentViewMode}
            onViewChange={setViewMode}
            hasTestResults={testResults.length > 0}
          />
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-craft-text-secondary hover:text-craft-accent"
          >
            {isCollapsed ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="text-craft-text-secondary hover:text-craft-accent"
          >
            ×
          </Button>
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-4">
          {currentViewMode === "output" ? (
            <OutputTerminalBlock outputText={outputText} />
          ) : (
            <div className="space-y-2">
              {testResults.map((test) => (
                <TestCaseResultItem
                  key={test.id}
                  testNumber={test.id}
                  passed={test.passed}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default TerminalCard;