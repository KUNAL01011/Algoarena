
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic } from "lucide-react";

interface LiveTranscriptProps {
  transcript: string;
}

const LiveTranscript = ({ transcript }: LiveTranscriptProps) => {
  return (
    <Card className="p-4 bg-craft-panel text-white">
      <div className="flex items-center gap-2 mb-3">
        <Mic className="w-4 h-4 text-green-600" />
        <h3 className="font-semibold">Live Transcript</h3>
      </div>
      
      <ScrollArea className="h-32 text-white">
        <div className="text-sm leading-relaxed text-white">
          {transcript || (
            <span className="text-gray-400 italic">
              Start speaking to see your words appear here...
            </span>
          )}
        </div>
      </ScrollArea>
      
      {transcript && (
        <div className="mt-2 text-xs text-gray-500">
          Words: {transcript.split(' ').filter(word => word.length > 0).length}
        </div>
      )}
    </Card>
  );
};

export default LiveTranscript;