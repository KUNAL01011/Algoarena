
import { useState } from "react";
import Header from "@/components/Header";
import LiveContestModal from "@/components/LiveContestModal";
import UpcomingRegisterModal from "@/components/UpcomingRegisterModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Clock, Users, Calendar, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContestsPage = () => {
  const navigate = useNavigate();
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [showUpcomingModal, setShowUpcomingModal] = useState(false);
  const [selectedContest, setSelectedContest] = useState<any>(null);

  const liveContests = [
    {
      id: 1,
      title: "Weekly Contest 387",
      status: "live",
      participants: 12847,
      timeLeft: "1h 23m",
      problems: 4,
      rating: "1200-2400",
      hasJoined: false
    }
  ];

  const upcomingContests = [
    {
      id: 2,
      title: "Biweekly Contest 125",
      status: "upcoming",
      startTime: "2025-01-15T14:30:00Z",
      duration: "1h 30m",
      problems: 4,
      rating: "All levels"
    },
    {
      id: 3,
      title: "AlgoArena Monthly Championship",
      status: "upcoming", 
      startTime: "2025-01-20T10:00:00Z",
      duration: "3h 00m",
      problems: 6,
      rating: "Expert+"
    }
  ];

  const pastContests = [
    {
      id: 4,
      title: "Weekly Contest 386",
      status: "finished",
      participants: 15632,
      myRank: 1247,
      problems: 4,
      rating: "1200-2400"
    },
    {
      id: 5,
      title: "New Year Contest 2025",
      status: "finished",
      participants: 28945,
      myRank: 892,
      problems: 5,
      rating: "All levels"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return <Badge className="bg-craft-error/20 text-craft-error border-craft-error/30 animate-pulse">LIVE</Badge>;
      case "upcoming":
        return <Badge className="bg-craft-accent-secondary/20 text-craft-accent-secondary border-craft-accent-secondary/30">Upcoming</Badge>;
      case "finished":
        return <Badge className="bg-craft-text-secondary/20 text-craft-text-secondary border-craft-text-secondary/30">Finished</Badge>;
      default:
        return null;
    }
  };

  const handleLiveContestAction = (contest: any) => {
    if (contest.hasJoined) {
      navigate(`/results/${contest.id}`);
    } else {
      setSelectedContest(contest);
      setShowLiveModal(true);
    }
  };

  const handleUpcomingRegister = (contest: any) => {
    setSelectedContest(contest);
    setShowUpcomingModal(true);
  };

  const handlePastResults = (contest: any) => {
    navigate(`/results/${contest.id}`);
  };

  const ContestCard = ({ contest, onAction }: { contest: any; onAction: (contest: any) => void }) => (
    <Card className="bg-craft-panel border-craft-border hover:border-craft-accent/50 transition-all duration-300 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-craft-text-primary font-semibold text-lg group-hover:text-craft-accent transition-colors">
                {contest.title}
              </h3>
              {getStatusBadge(contest.status)}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-craft-text-secondary mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{contest.timeLeft || contest.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{contest.participants || 'TBD'} participants</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4" />
                <span>{contest.problems} problems</span>
              </div>
            </div>

            <p className="text-craft-text-secondary text-sm">Rating: {contest.rating}</p>
            {contest.myRank && (
              <p className="text-craft-accent text-sm font-medium mt-1">Your rank: #{contest.myRank}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          {contest.status === "live" && (
            <Button 
              onClick={() => onAction(contest)}
              className={
                contest.hasJoined 
                  ? "bg-white hover:bg-gray-100 text-black border border-gray-300"
                  : "bg-craft-error hover:bg-craft-error/80 text-white"
              }
            >
              <Play className="w-4 h-4 mr-2" />
              {contest.hasJoined ? "See Results" : "Join Contest"}
            </Button>
          )}
          {contest.status === "upcoming" && (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-1 text-craft-text-secondary text-sm">
                <Calendar className="w-4 h-4" />
                <span>{new Date(contest.startTime).toLocaleDateString()}</span>
              </div>
              <Button 
                onClick={() => onAction(contest)}
                variant="outline" 
                className="border-craft-accent text-craft-accent hover:bg-craft-accent/10"
              >
                Register
              </Button>
            </div>
          )}
          {contest.status === "finished" && (
            <Button 
              onClick={() => onAction(contest)}
              variant="outline" 
              className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
            >
              See Results
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-craft-text-primary mb-2">Contests</h1>
          <p className="text-craft-text-secondary">Compete with coders worldwide and climb the leaderboard</p>
        </div>

        <Tabs defaultValue="live" className="w-full">
          <TabsList className="bg-craft-panel border border-craft-border mb-8">
            <TabsTrigger value="live" className="data-[state=active]:bg-craft-accent data-[state=active]:text-craft-bg">
              Live
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-craft-accent data-[state=active]:text-craft-bg">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-craft-accent data-[state=active]:text-craft-bg">
              Past Contests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {liveContests.map((contest) => (
                <ContestCard 
                  key={contest.id} 
                  contest={contest} 
                  onAction={handleLiveContestAction}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {upcomingContests.map((contest) => (
                <ContestCard 
                  key={contest.id} 
                  contest={contest} 
                  onAction={handleUpcomingRegister}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {pastContests.map((contest) => (
                <ContestCard 
                  key={contest.id} 
                  contest={contest} 
                  onAction={handlePastResults}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <LiveContestModal
        isOpen={showLiveModal}
        onClose={() => setShowLiveModal(false)}
        contestId={selectedContest?.id || 1}
      />

      <UpcomingRegisterModal
        isOpen={showUpcomingModal}
        onClose={() => setShowUpcomingModal(false)}
        contestTitle={selectedContest?.title || ""}
      />
    </div>
  );
};

export default ContestsPage;