
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/StatsCard";
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Clock, 
  Download, 
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from "lucide-react";
import SkillsRadarChart from "@/components/SkillsRadarChart";
import ResponseTimeChart from "@/components/ResponseTimeChart";
import SkillsDistributionChart from "@/components/SkillsDistributionChart";

const DemoInterviewAnalysisPage = () => {
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);

  useEffect(() => {
    const interviewData = localStorage.getItem('interviewData');
    if (!interviewData) {
      navigate('/interview');
      return;
    }

    const data = JSON.parse(interviewData);
    setAnalysisData(data);
    generateInsights(data);
  }, [navigate]);

  const generateInsights = (data: any) => {
    // Mock AI analysis - in real implementation, this would call OpenAI API
    const totalWords = data.questions.reduce((sum: number, q: any) => 
      sum + (q.answer?.split(' ').filter((w: string) => w.length > 0).length || 0), 0
    );
    
    const avgResponseTime = data.questions.reduce((sum: number, q: any) => sum + q.duration, 0) / data.questions.length;
    
    const skillsAnalysis = {
      communication: Math.min(100, Math.max(20, totalWords / 5 + Math.random() * 20)),
      confidence: Math.min(100, Math.max(30, 70 + Math.random() * 30)),
      clarity: 82,
      structure: Math.min(100, Math.max(35, 65 + Math.random() * 25)),
      enthusiasm: Math.min(100, Math.max(45, 75 + Math.random() * 20)),
      technicalKnowledge: Math.min(100, Math.max(40, 60 + Math.random() * 30))
    };

    const overallScore = (Math.round(Object.values(skillsAnalysis).reduce((a: number, b: number) => a + b, 0) / Object.keys(skillsAnalysis).length)) || 0;

    const insights = {
      overallScore,
      totalWords,
      avgResponseTime: (Math.round(avgResponseTime) || 0),
      questionsAnswered: data.questions.length,
      skills: skillsAnalysis,
      strengths: [
        "Clear communication style",
        "Good response structure",
        "Confident delivery"
      ],
      improvements: [
        "Provide more specific examples",
        "Elaborate on technical details",
        "Include measurable outcomes"
      ],
      recommendations: [
        "Practice the STAR method for behavioral questions",
        "Prepare specific examples from your experience",
        "Research common interview questions for your field"
      ]
    };

    setInsights(insights);
  };

  const tryAgain = () => {
    localStorage.removeItem('interviewData');
    navigate('/interview');
  };

  const downloadReport = () => {
    // Mock download functionality
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(insights, null, 2)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'interview-analysis.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!analysisData || !insights) {
    return (
      <div className="min-h-screen bg-craft-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-craft-accent mx-auto mb-4"></div>
          <p className="text-craft-text-secondary">Analyzing your interview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-craft-text-primary mb-2">
            Interview Analysis Complete! 🎉
          </h1>
          <p className="text-craft-text-secondary">
            You did great! Here's your detailed performance analysis and improvement tips.
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Overall Score"
            value={`${85}%`}
            subtitle="Great performance!"
            badge="⭐"
            icon={<Target className="w-5 h-5" />}
            glowColor="craft-accent"
          />
          <StatsCard
            title="Questions Answered"
            value={4}
            subtitle="Out of 5 questions"
            icon={<CheckCircle className="w-5 h-5" />}
            glowColor="craft-success"
          />
          <StatsCard
            title="Total Words"
            value={154}
            subtitle="Words spoken"
            icon={<BarChart3 className="w-5 h-5" />}
            glowColor="craft-accent-secondary"
          />
          <StatsCard
            title="Avg Response Time"
            value={`${57}s`}
            subtitle="Per question"
            icon={<Clock className="w-5 h-5" />}
            glowColor="craft-accent"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SkillsRadarChart skills={insights.skills} />
          <SkillsDistributionChart skills={insights.skills} />
        </div>

        <div className="mb-8">
          {analysisData.questions.length > 0 && <ResponseTimeChart questions={analysisData.questions} />}
        </div>

        {/* Feedback Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Strengths */}
          <Card className="bg-green-50 border-green-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-green-900">Your Strengths</h3>
            </div>
            <ul className="space-y-2">
              {insights.strengths.map((strength: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-green-800">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  {strength}
                </li>
              ))}
            </ul>
          </Card>

          {/* Areas for Improvement */}
          <Card className="bg-amber-50 border-amber-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-amber-900">Areas to Improve</h3>
            </div>
            <ul className="space-y-2">
              {insights.improvements.map((improvement: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-amber-800">
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                  {improvement}
                </li>
              ))}
            </ul>
          </Card>

          {/* Recommendations */}
          <Card className="bg-blue-50 border-blue-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-blue-900">Recommendations</h3>
            </div>
            <ul className="space-y-2">
              {insights.recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-blue-800">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  {rec}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={tryAgain}
            className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Another Interview
          </Button>
          
          <Button 
            variant="outline" 
            onClick={downloadReport}
            className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemoInterviewAnalysisPage;