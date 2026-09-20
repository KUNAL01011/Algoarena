import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader, Play, Send, Settings } from "lucide-react";
import CodeEditor from "./CodeEditor";
import TerminalCard from "./TerminalCard";
import LoadingAnimation from "./LoadingAnimation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CodeFormatter } from "@/utils/codeFormatter";

interface ContestCodePanelProps {
  code: string;
  onChange: (value: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  onRunCode: () => void;
  onMarkSolved: () => void;
  isRunning: boolean;
  showTerminal: boolean;
  terminalOutput: string;
  terminalTestResults: Array<{ id: number; passed: boolean }>;
  onCloseTerminal: () => void;
}

const langMap = {
  CPP: "cpp",
  JAVA: "java",
  PYTHON: "python",
  JAVASCRIPT: "javascript",
};

const ContestCodePanel = ({
  code,
  onChange,
  language,
  onLanguageChange,
  onRunCode,
  onMarkSolved,
  isRunning,
  showTerminal,
  terminalOutput,
  terminalTestResults,
  onCloseTerminal,
}: ContestCodePanelProps) => {
  const handleFormat = () => {
    const formattedCode = CodeFormatter.formatForJudge0(code, language);
    onChange(formattedCode);
  };
  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel>
        <div className="flex flex-col">
          {/* Editor Header */}
          <div className="bg-craft-panel border-b border-craft-border p-4 h-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  className="bg-craft-bg border border-craft-border rounded px-3 py-1 text-craft-text-primary focus:border-craft-accent"
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-craft-text-secondary hover:text-craft-accent"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-craft-bg border-craft-border text-craft-text-primary hover:bg-craft-bg/80">
                    <DropdownMenuLabel>Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleFormat}>
                      Format
                    </DropdownMenuItem>
                    <DropdownMenuItem>Reset</DropdownMenuItem>
                    <DropdownMenuItem>FullScreen</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={onRunCode}
                  disabled={isRunning}
                  variant="outline"
                  className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
                  title="Run your code"
                >
                  {isRunning ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  Run
                </Button>
                <Button
                  onClick={onMarkSolved}
                  disabled={isRunning}
                  className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
                  title="Submit your solution"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </Button>
              </div>
            </div>
          </div>

          {/* Code Editor */}

          <div className="h-screen">
            <CodeEditor
              value={code}
              onChange={onChange}
              language={langMap[language.toUpperCase()]}
            />
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle />
      {/* Terminal Card */}
      <ResizablePanel>
        <TerminalCard
          outputText={terminalOutput}
          testResults={terminalTestResults}
          isVisible={showTerminal}
          onClose={onCloseTerminal}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ContestCodePanel;
