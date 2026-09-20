
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface TimerCountdownProps {
  timeLeft: number;
  onTimeUp: () => void;
  setTimeLeft: (time: number | ((prev: number) => number)) => void;
}

const TimerCountdown = ({ timeLeft, onTimeUp, setTimeLeft }: TimerCountdownProps) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, setTimeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft < 30;

  return (
    <Card className={`px-4 py-2 ${isLowTime ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
      <div className="flex items-center gap-2">
        <Clock className={`w-5 h-5 ${isLowTime ? 'text-red-600' : 'text-blue-600'}`} />
        <div className="text-center w-12">
          <div className={`text-md  font-bold ${isLowTime ? 'text-red-600' : 'text-blue-600'}`}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TimerCountdown;