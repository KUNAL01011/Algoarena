
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Video, VideoOff, Clock, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import LiveQuestionBox from "@/components/LiveQuestionBox";
import LiveTranscript from "@/components/LiveTranscript";
import TimerCountdown from "@/components/TimerCountdown";

const InterviewSessionPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [sessionData, setSessionData] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [recognition, setRecognition] = useState<any>(null);

  const questions = [
    "Tell me about yourself and your background.",
    "What are your greatest strengths?",
    "Describe a challenging project you've worked on.",
    "How do you handle working under pressure?",
    "Where do you see yourself in 5 years?"
  ];

  useEffect(() => {
    // Check if permissions were granted
    const permissionsGranted = localStorage.getItem('permissionsGranted');
    if (!permissionsGranted) {
      toast({
        title: "Permissions Required",
        description: "Please grant camera and microphone permissions first.",
        variant: "destructive",
      });
      navigate('/interview');
      return;
    }

    initializeMediaAndSpeech();
    return () => cleanup();
  }, []);

  const initializeMediaAndSpeech = async () => {
    try {
      // Initialize camera
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: true 
      });
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      // Initialize speech recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event: any) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + ' ';
            }
          }
          if (finalTranscript) {
            setTranscript(prev => prev + finalTranscript);
          }
        };

        setRecognition(recognitionInstance);
      }
    } catch (error) {
      console.error('Error initializing media:', error);
      toast({
        title: "Setup Error",
        description: "Failed to initialize camera or microphone.",
        variant: "destructive",
      });
    }
  };

  const cleanup = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (recognition) {
      recognition.stop();
    }
  };

  const startRecording = () => {
    if (recognition) {
      recognition.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const nextQuestion = () => {
    // Save current answer
    const newEntry = {
      question: questions[currentQuestion],
      answer: transcript,
      duration: 120 - timeLeft
    };
    setSessionData(prev => [...prev, newEntry]);
    setTranscript("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      endInterview();
    }
  };

  const endInterview = () => {
    cleanup();
    // Store session data for analysis
    const finalData = {
      questions: sessionData,
      totalDuration: 120 - timeLeft,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('interviewData', JSON.stringify(finalData));
    navigate('/interview-analysis');
  };

  const onTimeUp = () => {
    endInterview();
  };

  return (
    <div className="min-h-screen text-white bg-craft-bg">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">AI Interview Session</h1>
            <p className="">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          <TimerCountdown timeLeft={timeLeft} onTimeUp={onTimeUp} setTimeLeft={setTimeLeft} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Feed */}
          <Card className="p-6 bg-craft-panel">
            <div className="aspect-video  rounded-lg overflow-hidden mb-4">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant={isRecording ? "destructive" : "default"}
                  size="sm"
                  onClick={isRecording ? stopRecording : startRecording}
                  className="bg-craft-accent text-black"
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isRecording ? "Stop" : "Start"} Recording
                </Button>
              </div>
              
              <Badge variant={isRecording ? "destructive" : "secondary"}>
                {isRecording ? "Recording" : "Ready"}
              </Badge>
            </div>
          </Card>

          {/* Interview Interface */}
          <div className="space-y-6">
            <LiveQuestionBox 
              question={questions[currentQuestion]}
              questionNumber={currentQuestion + 1}
            />
            
            <LiveTranscript transcript={transcript} />
            
            <div className="flex gap-3">
              <Button
                onClick={nextQuestion}
                className="flex-1 hover:outline cursor-pointer bg-craft-accent text-black"
                disabled={!transcript.trim()}
              
              >
                {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Interview"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button variant="outline" onClick={endInterview} className="text-black">
                End Early
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSessionPage;