
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface QuestionNavMenuProps {
  questions: Array<{
    id: number;
    title: string;
    difficulty: string;
  }>;
  questionStates: Array<{
    id: number;
    answered: boolean;
    timeSpent: number;
  }>;
  currentQuestion: number;
  onQuestionChange: (index: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const QuestionNavMenu = ({
  questions,
  questionStates,
  currentQuestion,
  onQuestionChange,
  isOpen,
  onClose
}: QuestionNavMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex">
      <Card className="bg-craft-panel border-craft-border w-80 h-full p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-craft-text-primary font-semibold">Questions</h3>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="text-craft-text-secondary hover:text-craft-accent"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {questions.map((question, index) => (
            <button
              key={question.id}
              onClick={() => {
                onQuestionChange(index);
                onClose();
              }}
              className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                currentQuestion === index
                  ? 'border-craft-accent bg-craft-accent/10'
                  : questionStates[index].answered
                  ? 'border-craft-success bg-craft-success/10'
                  : 'border-craft-border bg-craft-bg hover:border-craft-accent/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-craft-text-primary font-medium">
                  {index + 1}. {question.title}
                </span>
                <span className={`w-3 h-3 rounded-full ${
                  questionStates[index].answered 
                    ? 'bg-craft-success' 
                    : 'bg-craft-text-secondary/30'
                }`} />
              </div>
              <Badge className={`mt-1 ${
                question.difficulty === 'Easy' ? 'bg-craft-success/20 text-craft-success border-craft-success/30' :
                question.difficulty === 'Medium' ? 'bg-craft-accent-secondary/20 text-craft-accent-secondary border-craft-accent-secondary/30' :
                'bg-craft-error/20 text-craft-error border-craft-error/30'
              }`}>
                {question.difficulty}
              </Badge>
            </button>
          ))}
        </div>
      </Card>
      
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};

export default QuestionNavMenu;