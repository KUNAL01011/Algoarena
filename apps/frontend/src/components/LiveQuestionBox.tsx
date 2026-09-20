
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";

interface LiveQuestionBoxProps {
  question: string;
  questionNumber: number;
}

const LiveQuestionBox = ({ question, questionNumber }: LiveQuestionBoxProps) => {
  return (
    <Card className="p-6 bg-craft-panel text-white border-blue-200">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-blue-600 rounded-lg bg-craft-accent/20 ">
          <MessageSquare className="w-5 h-5 text-craft-accent" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="hover:bg-neon-green/50 bg-craft-accent text-black">Question {questionNumber}</Badge>
            <span className="text-sm ">AI Interviewer</span>
          </div>
          
          <p className="text-lg text-craft-accent leading-relaxed">{question}</p>
          
          <div className="mt-4 text-sm ">
            💡 Take your time and speak clearly. The AI is listening to your response.
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LiveQuestionBox;