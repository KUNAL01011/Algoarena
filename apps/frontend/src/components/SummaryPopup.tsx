
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface QuestionState {
  id: number;
  answered: boolean;
  timeSpent: number;
}

interface SummaryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  questionStates: QuestionState[];
  timeLeft: number;
}

const SummaryPopup = ({ isOpen, onClose, onSubmit, questionStates, timeLeft }: SummaryPopupProps) => {
  const answeredCount = questionStates.filter(q => q.answered).length;
  const unansweredCount = questionStates.length - answeredCount;
  const totalTime = 600; // 10 minutes in seconds
  const timeSpent = totalTime - timeLeft;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-craft-panel border-craft-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-craft-text-primary text-xl">Contest Summary</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-craft-success/10 rounded-lg border border-craft-success/30">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-6 h-6 text-craft-success" />
              </div>
              <div className="text-2xl font-bold text-craft-success">{answeredCount}</div>
              <div className="text-sm text-craft-text-secondary">Answered</div>
            </div>
            
            <div className="text-center p-4 bg-craft-error/10 rounded-lg border border-craft-error/30">
              <div className="flex items-center justify-center mb-2">
                <XCircle className="w-6 h-6 text-craft-error" />
              </div>
              <div className="text-2xl font-bold text-craft-error">{unansweredCount}</div>
              <div className="text-sm text-craft-text-secondary">Unanswered</div>
            </div>
          </div>

          {/* Time Spent */}
          <div className="text-center p-4 bg-craft-accent/10 rounded-lg border border-craft-accent/30">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-craft-accent" />
            </div>
            <div className="text-2xl font-bold text-craft-accent">{formatTime(timeSpent)}</div>
            <div className="text-sm text-craft-text-secondary">Time Spent</div>
          </div>

          {/* Question Breakdown */}
          <div className="space-y-2">
            <h4 className="text-craft-text-primary font-semibold">Question Breakdown:</h4>
            {questionStates.map((question, index) => (
              <div key={question.id} className="flex items-center justify-between p-2 bg-craft-bg rounded border border-craft-border">
                <span className="text-craft-text-primary">Question {index + 1}</span>
                <Badge className={
                  question.answered 
                    ? "bg-craft-success/20 text-craft-success border-craft-success/30"
                    : "bg-craft-error/20 text-craft-error border-craft-error/30"
                }>
                  {question.answered ? "Solved" : "Not Solved"}
                </Badge>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
            >
              Cancel
            </Button>
            <Button 
              onClick={onSubmit}
              className="flex-1 bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
            >
              Submit Contest
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SummaryPopup;