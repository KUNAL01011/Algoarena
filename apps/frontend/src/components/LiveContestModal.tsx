
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LiveContestModalProps {
  isOpen: boolean;
  onClose: () => void;
  contestId: number;
}

const LiveContestModal = ({ isOpen, onClose, contestId }: LiveContestModalProps) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    onClose();
    navigate(`/live-contest/${contestId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-craft-panel border-craft-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-craft-text-primary text-xl">Register for Contest</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-craft-accent/20 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-craft-accent" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-craft-text-primary mb-2">Weekly Contest 387</h3>
              <div className="space-y-2 text-sm text-craft-text-secondary">
                <div className="flex items-center justify-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>12,847 participants</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>1h 23m remaining</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>4 problems</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-craft-bg p-4 rounded-lg border border-craft-border">
            <h4 className="text-craft-text-primary font-medium mb-2">Contest Rules:</h4>
            <ul className="text-sm text-craft-text-secondary space-y-1">
              <li>• Complete as many problems as possible</li>
              <li>• 10 minutes time limit</li>
              <li>• Camera monitoring enabled</li>
              <li>• No external resources allowed</li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRegister}
              className="flex-1 bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
            >
              Join Contest
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LiveContestModal;