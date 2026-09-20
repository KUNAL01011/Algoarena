
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
}

interface TestCaseManagerProps {
  testCases: TestCase[];
  onChange: (testCases: TestCase[]) => void;
}

const TestCaseManager = ({ testCases, onChange }: TestCaseManagerProps) => {
  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: Date.now().toString(),
      input: "",
      expectedOutput: ""
    };
    onChange([...testCases, newTestCase]);
  };

  const updateTestCase = (id: string, field: keyof Omit<TestCase, 'id'>, value: string) => {
    const updated = testCases.map(tc => 
      tc.id === id ? { ...tc, [field]: value } : tc
    );
    onChange(updated);
  };

  const removeTestCase = (id: string) => {
    onChange(testCases.filter(tc => tc.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-craft-text-primary font-semibold">Test Cases</h3>
        <Button
          type="button"
          onClick={addTestCase}
          className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Test Case
        </Button>
      </div>

      {testCases.map((testCase, index) => (
        <Card key={testCase.id} className="bg-craft-panel border-craft-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-craft-text-primary font-medium">Test Case {index + 1}</h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeTestCase(testCase.id)}
              className="border-craft-error/50 text-craft-error hover:bg-craft-error/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-craft-text-secondary text-sm mb-2 block">Input</label>
              <Textarea
                value={testCase.input}
                onChange={(e) => updateTestCase(testCase.id, 'input', e.target.value)}
                placeholder="Enter test input..."
                className="bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
              />
            </div>
            <div>
              <label className="text-craft-text-secondary text-sm mb-2 block">Expected Output</label>
              <Textarea
                value={testCase.expectedOutput}
                onChange={(e) => updateTestCase(testCase.id, 'expectedOutput', e.target.value)}
                placeholder="Enter expected output..."
                className="bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
              />
            </div>
          </div>
        </Card>
      ))}

      {testCases.length === 0 && (
        <Card className="bg-craft-panel border-craft-border border-dashed p-8 text-center">
          <p className="text-craft-text-secondary">No test cases yet. Add your first test case to get started.</p>
        </Card>
      )}
    </div>
  );
};

export default TestCaseManager;
