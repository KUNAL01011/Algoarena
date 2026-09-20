import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VideoDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const VideoDialog: React.FC<VideoDialogProps> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[725px] bg-craft-panel text-white">
        <DialogHeader>
          <DialogTitle>Demo Video</DialogTitle>
          <DialogDescription className="text-white">
            See how our platform can help you improve your skills.
          </DialogDescription>
        </DialogHeader>
        <div className="aspect-w-16 aspect-h-9">
          <video width="100%" height="auto" controls autoPlay>
            <source
              src="https://ynxir50uoi.ufs.sh/f/k9OWiEDGjYKIbnMXi3kq4aGnNMjS6Q9Vhpo5dZg8kyisLu0H"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDialog;
