import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

export interface TestResultsT {
  passed: number;
  total: number;
  cases: Array<{
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
    time: string;
  }>;
}

interface TestResultsProps {
  results: TestResultsT;
}

const TestResults = ({ results }: TestResultsProps) => {
  
  const overallPassed = results.passed === results.total;

  return (
    <div className="bg-craft-panel border-t border-craft-border p-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-craft-text-primary font-semibold flex items-center space-x-2">
          {overallPassed ? (
            <CheckCircle className="w-5 h-5 text-craft-success" />
          ) : (
            <XCircle className="w-5 h-5 text-craft-error" />
          )}
          <span>Test Results</span>
        </h3>

        <Badge
          className={
            overallPassed
              ? "bg-craft-success/20 text-craft-success border-craft-success/30 font-normal"
              : "bg-craft-error/20 text-craft-error border-craft-error/30 font-normal"
          }
        >
          {results.passed}/{results.total} passed
        </Badge>
      </div>

      <div className="space-y-3">
        {results.cases.map((testCase, index) => (
          <Card
            key={index}
            className={`bg-craft-bg border ${
              testCase.passed
                ? "border-craft-success/30"
                : "border-craft-error/30"
            }`}
          >
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {testCase.passed ? (
                    <CheckCircle className="w-4 h-4 text-craft-success" />
                  ) : (
                    <XCircle className="w-4 h-4 text-craft-error" />
                  )}
                  <span className="text-craft-text-primary text-sm font-medium">
                    Test Case {index + 1}
                  </span>
                </div>

                <div className="flex items-center space-x-1 text-craft-text-secondary text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{testCase.time}</span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div>
                  <span className="text-craft-text-secondary">Input: </span>
                  <code className="text-craft-text-primary font-mono bg-craft-panel px-1 rounded">
                    {testCase.input}
                  </code>
                </div>

                <div>
                  <span className="text-craft-text-secondary">Expected: </span>
                  <code className="text-craft-success font-mono bg-craft-panel px-1 rounded">
                    {testCase.expected}
                  </code>
                </div>

                <div>
                  <span className="text-craft-text-secondary">Actual: </span>
                  <code
                    className={`font-mono bg-craft-panel px-1 rounded ${
                      testCase.passed
                        ? "text-craft-success"
                        : "text-craft-error"
                    }`}
                  >
                    {testCase.actual}
                  </code>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestResults;
