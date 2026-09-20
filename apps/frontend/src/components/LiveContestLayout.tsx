import { ReactNode } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

interface LiveContestLayoutProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
  leftPanelWidth: number;
  onResizeStart: (e: React.MouseEvent) => void;
}

const LiveContestLayout = ({
  leftPanel,
  rightPanel,
  leftPanelWidth,
  onResizeStart,
}: LiveContestLayoutProps) => {
  return (
    <div className="flex h-[calc(100vh-80px)] container mx-auto px-6">
      <ResizablePanelGroup direction="horizontal">
        {/* Left Panel - Problem Description */}
        <ResizablePanel>
          <div className="bg-craft-panel border-r border-craft-border overflow-y-auto [scrollbar-gutter:stable] h-full">
            {leftPanel}
          </div>
        </ResizablePanel>

        {/* Resize Handle */}
        <ResizableHandle />

        {/* Right Panel - Code Editor */}
        <ResizablePanel>
          {" "}
          <div className="bg-craft-panel border-r border-craft-border overflow-y-auto [scrollbar-gutter:stable] h-full">
            {rightPanel}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default LiveContestLayout;
