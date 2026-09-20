import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/StatsCard";
import {
  Play,
  Clock,
  TrendingUp,
  Target,
  BarChart3,
  History,
} from "lucide-react";
import { useState } from "react";
import PermissionModal from "@/components/PermissionModal";
import { Link } from "react-router-dom";

const InterviewPage = () => {
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const pastInterviews = [
    {
      id: 1,
      date: "2024-01-10",
      duration: "45m",
      score: 85,
      topic: "Arrays & Strings",
      problemsSolved: 3,
      difficulty: "Medium",
    },
    {
      id: 2,
      date: "2024-01-08",
      duration: "60m",
      score: 72,
      topic: "Dynamic Programming",
      problemsSolved: 2,
      difficulty: "Hard",
    },
  ];

  const InterviewCard = ({ interview }: { interview: any }) => (
    <Card className="bg-craft-panel border-craft-border hover:border-craft-accent/50 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-craft-text-primary font-semibold">
              {interview.topic}
            </h3>
            <p className="text-craft-text-secondary text-sm">
              {interview.date}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-craft-accent">
              {interview.score}%
            </div>
            <p className="text-craft-text-secondary text-sm">Score</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-craft-text-secondary mb-4">
          <span>Duration: {interview.duration}</span>
          <span>Problems: {interview.problemsSolved}</span>
          <Badge className="bg-craft-accent-secondary/20 text-craft-accent-secondary border-craft-accent-secondary/30">
            {interview.difficulty}
          </Badge>
        </div>
        <Link to={`/interview-analysis/demo`}>
          <Button
            variant="outline"
            className="w-full border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
          >
            View Report
          </Button>
        </Link>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-craft-text-primary mb-2">
            Mock Interviews
          </h1>
          <p className="text-craft-text-secondary">
            Practice coding interviews with real-time feedback and scoring
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Interviews Completed"
            value="24"
            subtitle="This month"
            badge="+5"
            icon={<Target className="w-5 h-5" />}
            glowColor="craft-success"
          />
          <StatsCard
            title="Average Score"
            value="78%"
            subtitle="Last 10 interviews"
            badge="↗ +3%"
            icon={<TrendingUp className="w-5 h-5" />}
            glowColor="craft-accent"
          />
          <StatsCard
            title="Best Performance"
            value="94%"
            subtitle="Arrays & Strings"
            badge="⭐"
            icon={<BarChart3 className="w-5 h-5" />}
            glowColor="craft-accent-secondary"
          />
        </div>

        {/* Start Interview Section */}
        <Card className="bg-craft-panel border-craft-border mb-8">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-craft-text-primary mb-4">
              Start New Mock Interview
            </h2>
            <p className="text-craft-text-secondary mb-6">
              Choose your interview duration and topics to begin
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Button
                variant="outline"
                className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
              >
                30 minutes
              </Button>
              <Button
                variant="outline"
                className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
              >
                45 minutes
              </Button>
              <Button
                variant="outline"
                className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
              >
                60 minutes
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                "Arrays",
                "Strings",
                "Dynamic Programming",
                "Trees",
                "Graphs",
                "System Design",
              ].map((topic) => (
                <Badge
                  key={topic}
                  variant="outline"
                  className="cursor-pointer border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent transition-all"
                >
                  {topic}
                </Badge>
              ))}
            </div>

            <Button
              className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg text-lg px-8 py-3"
              onClick={() => setShowPermissionModal(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Interview
            </Button>
          </div>
        </Card>

        {/* Past Interviews */}
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <History className="w-5 h-5 text-craft-accent" />
            <h2 className="text-xl font-bold text-craft-text-primary">
              Recent Interviews
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastInterviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        </div>
      </div>
      <PermissionModal
        open={showPermissionModal}
        onOpenChange={setShowPermissionModal}
      />
    </div>
  );
};

export default InterviewPage;
