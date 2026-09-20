import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Bookmark, Share, Lightbulb } from "lucide-react";
import { Problem } from "@/api/problems";
import { useState } from "react";
import Code from "./Code";

interface ProblemDescriptionProps {
  problem: Problem;
}

const ProblemDescription = ({ problem }: ProblemDescriptionProps) => {
  const [visibleHintCount, setVisibleHintCount] = useState(1);

  const handleShowNextHint = () => {
    if (visibleHintCount < problem.hints.length) {
      setVisibleHintCount(visibleHintCount + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          variant="ghost"
          className="text-craft-text-secondary hover:text-craft-accent"
        >
          <Heart className="w-4 h-4 mr-1" />
          Like
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-craft-text-secondary hover:text-craft-accent"
        >
          <Bookmark className="w-4 h-4 mr-1" />
          Save
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-craft-text-secondary hover:text-craft-accent"
        >
          <Share className="w-4 h-4 mr-1" />
          Share
        </Button>
      </div>

      <Tabs defaultValue="description" className="h-[calc(100vh-200px)]">
        <TabsList className="bg-craft-bg border border-craft-border gap-2 max-sm:gap-0 w-full grid grid-cols-3 px-1">
          <TabsTrigger
            value="description"
            className="data-[state=active]:bg-craft-border data-[state=active]:text-craft-text-primary"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="hints"
            className="data-[state=active]:bg-craft-border data-[state=active]:text-craft-text-primary"
          >
            <Lightbulb className="w-4 h-4 mr-1" />
            Hints
          </TabsTrigger>
          <TabsTrigger
            value="editorial"
            className="data-[state=active]:bg-craft-border data-[state=active]:text-craft-text-primary"
          >
            Editorial
          </TabsTrigger>
        </TabsList>

        {/* description  */}
        <TabsContent value="description" className="space-y-6 mt-6 p-4 ">
          {/* Problem Statement */}
          <div>
            <p className="text-craft-text-primary leading-relaxed whitespace-pre-line">
              {problem?.description}
            </p>
          </div>

          {/* Examples */}
          <div>
            <h3 className="text-craft-text-primary font-semibold mb-4">
              Examples
            </h3>
            <div className="space-y-4">
              {problem &&
                Object.entries(problem.examples).map(([keyid, example]) => (
                  <Card
                    key={keyid}
                    className="bg-craft-bg border-craft-border p-4"
                  >
                    <div className="space-y-2">
                      <div>
                        <span className="text-craft-text-secondary text-sm font-medium">
                          Input:{" "}
                        </span>
                        <code className="text-craft-accent font-mono text-sm">
                          {example.input}
                        </code>
                      </div>
                      <div>
                        <span className="text-craft-text-secondary text-sm font-medium">
                          Output:{" "}
                        </span>
                        <code className="text-craft-accent font-mono text-sm">
                          {example.output}
                        </code>
                      </div>
                      <div>
                        <span className="text-craft-text-secondary text-sm font-medium">
                          Explanation:{" "}
                        </span>
                        <span className="text-craft-text-primary text-sm">
                          {example.explanation}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          {/* Constraints */}
          <div>
            <h3 className="text-craft-text-primary font-semibold mb-4">
              Constraints
            </h3>
            <p className="px-4 text-craft-accent font-mono text-sm">
              {problem?.constraints}
            </p>
          </div>
        </TabsContent>

        {/* hints  */}
        <TabsContent value="hints" className="mt-6">
          <div className="space-y-4">
            {problem?.hints && (
              <>
                {Object.entries(problem.hints)
                  .slice(0, visibleHintCount)
                  .map(([key, value], index) => (
                    <Card className="bg-craft-bg border-craft-border p-4">
                      <div className="flex items-start space-x-3" key={key}>
                        <Lightbulb className="w-5 h-5 text-craft-accent-secondary mt-0.5" />
                        <div>
                          <h4 className="text-craft-text-primary font-medium mb-2">
                            Hint {index + 1}
                          </h4>
                          <p className="text-craft-text-secondary text-sm">
                            {value}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}

                {visibleHintCount < problem.hints.length && (
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={handleShowNextHint}
                  >
                    Show Next Hint
                  </Button>
                )}
              </>
            )}
          </div>
        </TabsContent>

        {/* editorial  */}
        <TabsContent value="editorial" className="mt-6">
          <div className="space-y-4">
            {problem?.editorial && (
              <div>
                <h3 className="text-craft-text-primary font-semibold mb-4">
                  Editorial
                </h3>
                <p className="text-craft-text-primary leading-relaxed whitespace-pre-line">
                  {problem.editorial?.explanation}
                </p>
                <Code
                  code={problem.editorial?.code}
                  language={problem.editorial?.language}
                />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProblemDescription;
