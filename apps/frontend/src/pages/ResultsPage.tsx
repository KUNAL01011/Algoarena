
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import LeaderboardTable from "@/components/LeaderboardTable";
import TopPerformersSection from "@/components/TopPerformersSection";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowLeft, Trophy, Clock, Users } from "lucide-react";

const ResultsPage = () => {
  const { id } = useParams();

  // Mock leaderboard data
  const leaderboardData = [
  {
    rank: 1,
    name: "Aarav Sharma",
    timeTaken: "8:45",
    totalQuestions: 4,
    correctAnswers: 4,
    wrongAnswers: 0,
    rating: 5,
    xp: 2450
  },
  {
    rank: 2,
    name: "Diya Patel",
    timeTaken: "9:12",
    totalQuestions: 4,
    correctAnswers: 4,
    wrongAnswers: 0,
    rating: 5,
    xp: 2380
  },
  {
    rank: 3,
    name: "Vivaan Mehta",
    timeTaken: "9:58",
    totalQuestions: 4,
    correctAnswers: 4,
    wrongAnswers: 0,
    rating: 5,
    xp: 2320
  },
  {
    rank: 4,
    name: "Ishita Verma",
    timeTaken: "7:32",
    totalQuestions: 4,
    correctAnswers: 3,
    wrongAnswers: 1,
    rating: 4,
    xp: 1890
  },
  {
    rank: 5,
    name: "Kabir Reddy",
    timeTaken: "8:21",
    totalQuestions: 4,
    correctAnswers: 3,
    wrongAnswers: 1,
    rating: 4,
    xp: 1820
  },
  {
    rank: 6,
    name: "Ananya Desai",
    timeTaken: "9:45",
    totalQuestions: 4,
    correctAnswers: 3,
    wrongAnswers: 1,
    rating: 4,
    xp: 1750
  },
  {
    rank: 7,
    name: "Rohan Nair",
    timeTaken: "6:18",
    totalQuestions: 4,
    correctAnswers: 2,
    wrongAnswers: 2,
    rating: 3,
    xp: 1280
  },
  {
    rank: 8,
    name: "Meera Iyer",
    timeTaken: "9:03",
    totalQuestions: 4,
    correctAnswers: 2,
    wrongAnswers: 2,
    rating: 3,
    xp: 1150
  }
];


  const topThree = leaderboardData.slice(0, 3);
  const contestStats = {
    title: "Weekly Contest 387",
    totalParticipants: 12847,
    avgTime: "8:34",
    difficulty: "Mixed",
    date: "December 8, 2024"
  };

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />
      
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/contests" className="flex items-center text-craft-text-secondary hover:text-craft-accent transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Contests
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-craft-text-primary">
                  Leaderboard Results
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Contest Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-craft-text-primary mb-2">
                Leaderboard Results
              </h1>
              <p className="text-craft-text-secondary">
                {contestStats.title} • {contestStats.date}
              </p>
            </div>
            <Badge className="bg-craft-success/20 text-craft-success border-craft-success/30 w-fit">
              Completed
            </Badge>
          </div>
          
          <Card className="bg-craft-panel border-craft-border p-6 rounded-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-craft-accent/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-craft-accent" />
                </div>
                <div>
                  <p className="text-sm text-craft-text-secondary">Participants</p>
                  <p className="text-lg font-semibold text-craft-text-primary">
                    {contestStats.totalParticipants.toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-craft-accent-secondary/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-craft-accent-secondary" />
                </div>
                <div>
                  <p className="text-sm text-craft-text-secondary">Average Time</p>
                  <p className="text-lg font-semibold text-craft-text-primary">
                    {contestStats.avgTime}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-craft-text-secondary">Problems</p>
                  <p className="text-lg font-semibold text-craft-text-primary">
                    4 Questions
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Top Performers Section */}
        <TopPerformersSection winners={topThree} />

        {/* Full Leaderboard */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-craft-text-primary">
              All Participants
            </h2>
            <Badge variant="outline" className="text-craft-text-secondary border-craft-border">
              {leaderboardData.length} contestants
            </Badge>
          </div>
          <LeaderboardTable data={leaderboardData} />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;