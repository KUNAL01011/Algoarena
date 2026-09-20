import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Code, Play, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodePreviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
  challenge?: {
    title: string;
    code: string;
    language: string;
  };
}

const CodePreviewPanel = ({
  isOpen,
  onClose,
  challenge,
}: CodePreviewPanelProps) => {
  const [isTyping, setIsTyping] = useState(false);

  const sampleCode =
    challenge?.code ||
    `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}`;

  const handleTypewriterStart = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* VS Code-like Panel */}
          <motion.div
            initial={{ x: 400, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 400, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-[#1E1E1E] border-l border-neon-green/20 z-50 flex flex-col"
          >
            {/* VS Code-like Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-[#2D2D30]">
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-neon-green" />
                <span className="text-sm font-medium text-foreground">
                  {challenge?.title || "Two Sum - Solution Preview"}
                </span>
                <span className="text-xs text-muted-foreground bg-accent/20 px-2 py-1 rounded">
                  {challenge?.language || "JavaScript"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Code Editor Area */}
            <div className="flex-1 p-6 overflow-auto">
              <div className="flex items-center gap-2 mb-4">
                <Button
                  size="sm"
                  className="btn-primary text-xs"
                  onClick={handleTypewriterStart}
                >
                  <Play className="w-3 h-3 mr-1" />
                  Run Code
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              </div>

              {/* Code Block with Typewriter Effect */}
              <motion.div
                className="bg-[#1E1E1E] border border-border rounded-lg p-4 font-mono text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.pre
                  className="text-foreground overflow-x-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: isTyping ? 2 : 0.5,
                    ease: "easeOut",
                  }}
                >
                  <code className="language-javascript">{sampleCode}</code>
                </motion.pre>
              </motion.div>

              {/* Output Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border"
              >
                <h4 className="text-sm font-semibold text-neon-green mb-2">
                  Output:
                </h4>
                <p className="text-xs text-muted-foreground font-mono">
                  [0, 1] // Indices of numbers that add up to target
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CodePreviewPanel;
