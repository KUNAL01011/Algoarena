
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

interface TestCaseResultItemProps {
  testNumber: number;
  passed: boolean;
}

const TestCaseResultItem = ({ testNumber, passed }: TestCaseResultItemProps) => {
  return (
    <div className="flex items-center justify-between p-3 bg-craft-bg rounded-lg border border-craft-border">
      <div className="flex items-center space-x-3">
        {passed ? (
          <CheckCircle className="w-5 h-5 text-craft-success" />
        ) : (
          <XCircle className="w-5 h-5 text-craft-error" />
        )}
        
        <span className="text-craft-text-primary font-medium">
          Test Case {testNumber}
        </span>
      </div>
      
      <Badge className={passed ? 
        "bg-craft-success/20 text-craft-success border-craft-success/30" : 
        "bg-craft-error/20 text-craft-error border-craft-error/30"
      }>
        {passed ? "Passed" : "Failed"}
      </Badge>
    </div>
  );
};

export default TestCaseResultItem;