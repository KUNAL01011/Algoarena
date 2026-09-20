
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Mic, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PermissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PermissionModal = ({ open, onOpenChange }: PermissionModalProps) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const navigate = useNavigate();

  const requestPermissions = async () => {
    setIsRequesting(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: true 
      });
      
      // Store the stream for later use
      localStorage.setItem('permissionsGranted', 'true');
      
      // Stop the stream for now (we'll request it again in the session)
      stream.getTracks().forEach(track => track.stop());
      
      toast({
        title: "Permissions Granted",
        description: "Camera and microphone access granted successfully!",
      });
      
      onOpenChange(false);
      navigate('/interview-session');
    } catch (error) {
      console.error('Permission denied:', error);
      toast({
        title: "Permission Required",
        description: "Camera and microphone access is required for the interview.",
        variant: "destructive",
      });
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-craft-panel border-craft-border hover:border-craft-accent/50 text-craft-text-primary">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-craft-accent hover:bg-craft-accent/80 " />
            Ready to Start Your Interview?
          </DialogTitle>
          <DialogDescription>
            We'll need access to your microphone and camera to simulate a real interview experience.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-craft-bg">
            <Mic className="w-5 h-5 text-craft-accent hover:bg-craft-accent/80" />
            <div>
              <p className="font-medium ">Microphone Access</p>
              <p className="text-sm ">To record your responses</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-craft-bg text-craft-text-primary rounded-lg">
            <Camera className="w-5 h-5 text-craft-accent hover:bg-craft-accent/80" />
            <div>
              <p className="font-medium ">Camera Access</p>
              <p className="text-sm ">For a realistic interview setting</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-amber-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <p>Your data will not be stored permanently</p>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-black">
            Cancel
          </Button>
          <Button 
            onClick={requestPermissions}
            disabled={isRequesting}
            className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
          >
            {isRequesting ? "Requesting..." : "Allow Access"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionModal;