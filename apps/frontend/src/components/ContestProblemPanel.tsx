
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";


interface ContestProblemPanelProps {
  problem: {
    id: number;
    title: string;
    difficulty: string;
    description: string;
    examples: Array<{
      input: string;
      output: string;
      explanation: string;
    }>;
    constraints: string[];
  };
}

const ContestProblemPanel = ({ problem }: ContestProblemPanelProps) => {
  return (
    <div className="p-6 space-y-6">
      {/* Problem Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-craft-text-primary">
            {problem.id}. {problem.title}
          </h1>
          <Badge className={`${
            problem.difficulty === 'Easy' ? 'bg-craft-success/20 text-craft-success border-craft-success/30' :
            problem.difficulty === 'Medium' ? 'bg-craft-accent-secondary/20 text-craft-accent-secondary border-craft-accent-secondary/30' :
            'bg-craft-error/20 text-craft-error border-craft-error/30'
          }`}>
            {problem.difficulty}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="description" className="w-full">
        <TabsContent value="description" className="space-y-6 mt-6">
          {/* Problem Statement */}
          <div>
            <p className="text-craft-text-primary leading-relaxed whitespace-pre-line">
              {problem.description}
            </p>
          </div>

          {/* Examples */}
          <div>
            <h3 className="text-craft-text-primary font-semibold mb-4">Examples</h3>
            <div className="space-y-4">
              {problem.examples.map((example, index) => (
                <Card key={index} className="bg-craft-bg border-craft-border p-4">
                  <div className="space-y-2">
                    <div>
                      <span className="text-craft-text-secondary text-sm font-medium">Input: </span>
                      <code className="text-craft-accent font-mono text-sm">{example.input}</code>
                    </div>
                    <div>
                      <span className="text-craft-text-secondary text-sm font-medium">Output: </span>
                      <code className="text-craft-accent font-mono text-sm">{example.output}</code>
                    </div>
                    <div>
                      <span className="text-craft-text-secondary text-sm font-medium">Explanation: </span>
                      <span className="text-craft-text-primary text-sm">{example.explanation}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Constraints */}
          <div>
            <h3 className="text-craft-text-primary font-semibold mb-4">Constraints</h3>
            <ul className="space-y-2">
              {problem.constraints.map((constraint, index) => (
                <li key={index} className="text-craft-text-secondary text-sm flex items-start">
                  <span className="text-craft-accent mr-2">•</span>
                  <code className="font-mono">{constraint}</code>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContestProblemPanel;