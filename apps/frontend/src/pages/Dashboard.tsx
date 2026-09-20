import Header from "@/components/Header";
import ProblemCard from "@/components/ProblemCard";
import XPProgressBar from "@/components/XPProgressBar";
import StatsCard from "@/components/StatsCard";
import FilterBar from "@/components/FilterBar";
import { Button } from "@/components/ui/button";
import { Zap, Target, Trophy, Users, TrendingUp, Code } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useProblems, useRandomProblem, useSolvedProblems } from "@/hooks/useProblems";
import { useCurrentUser } from "@/hooks/useAuth";
import { useNextLevelXp } from "@/hooks/useNextLevelXp";
import { useContestStore } from "@/store/useContestStore";
import { toast } from "sonner";
import { usePotd } from "@/hooks/usePotd";

const Index = () => {
  const navigate = useNavigate();
  const { data, isLoading: isProblemsLoading } = useProblems(1);
  const { data: randomProblem, refetch: getRandomProblem } = useRandomProblem();
  const authUser = useCurrentUser();
  // const { latestRating } = useContestStore();
  const { data: potd } = usePotd();
  const {data:solvedProblems} = useSolvedProblems();

  const nextLevelXp = useNextLevelXp();


  const handleRandomProblemClick = async () => {
    try {
      if (!randomProblem) {
        const result = await getRandomProblem();
        if (result.data) {
          navigate(`/problem/${result.data.id}`);
        }
      } else {
        navigate(`/problem/${randomProblem.id}`);
      }
    } catch (err) {
      console.error("Error fetching random problem:", err);
      toast.error("Something went wrong. Try again later.");
    }
  };

  const handleDailyChallengeClick = () => {
    if (potd) {
      navigate(`/problem/${potd.problemId}`);
    } else {
      toast.error("Daily challenge not available");
    }
  };

  const handleJoinContestClick = () => {
    navigate("/contests");
  };

 

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />

      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-6 h-6 text-craft-accent animate-glow-pulse" />
            <h1 className="text-3xl font-bold text-craft-text-primary">
              Welcome {authUser?.name || "Coder"}!
            </h1>
          </div>
          <p className="text-craft-text-secondary text-lg">
            Continue your coding journey and level up your skills.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Problems Solved"
            value={solvedProblems?.length || 0}
            subtitle="Great progress!"
            badge={`+${authUser?.submission?.length || 0}`}
            icon={<Target className="w-5 h-5" />}
            glowColor="craft-success"
          />
          <StatsCard
            title="Current Streak"
            value={authUser?.currentStreak || 23}
            subtitle="days in a row"
            badge="🔥"
            icon={<TrendingUp className="w-5 h-5" />}
            glowColor="craft-accent-secondary"
          />
          <StatsCard
            title="Contest Rating"
            value={1847}
            subtitle="Latest Contest"
            badge="⭐"
            icon={<Trophy className="w-5 h-5" />}
            glowColor="craft-accent"
          />
          <StatsCard
            title="Code Reviews"
            value={12}
            subtitle="This month"
            badge="New"
            icon={<Code className="w-5 h-5" />}
            glowColor="craft-accent"
          />
        </div>

        {/* XP Progress */}
        <div className="bg-craft-panel border border-craft-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-craft-text-primary font-semibold text-lg">
                Level Progress
              </h3>
              <p className="text-craft-text-secondary">
                Keep coding to reach the next level!
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-craft-accent to-craft-accent-secondary rounded-full flex items-center justify-center">
              <span className="text-craft-bg font-bold">
                {authUser?.level || 0}
              </span>
            </div>
          </div>
          <XPProgressBar
            currentXP={Number(authUser?.xp) || 0}
            levelXP={nextLevelXp}
            level={Number(authUser?.level) || 0}
            animate={true}
          />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            onClick={handleRandomProblemClick}
            className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg font-semibold"
          >
            <Zap className="w-4 h-4 mr-2" />
            Random Problem
          </Button>

          <Button
            onClick={handleDailyChallengeClick}
            className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg font-semibold"
          >
            <Target className="w-4 h-4 mr-2" />
            Daily Challenge
          </Button>

          <Button
            onClick={handleJoinContestClick}
            className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg font-semibold"
          >
            <Users className="w-4 h-4 mr-2" />
            Join Contest
          </Button>
        </div>

        {/* Filter Bar */}
        {/* <FilterBar /> */}

        {/* Problems List */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-craft-text-primary">
              Problems
            </h2>
            <span className="text-sm text-craft-text-secondary">
              {data?.pagination?.message || ""}
            </span>
          </div>

          <div className="grid gap-4">
            {isProblemsLoading ? (
              <div className="flex items-center justify-center text-white">
                Loading...
              </div>
            ) : data?.problems?.length > 0 ? (
              data?.problems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))
            ) : (
              <div className="text-craft-text-secondary text-center">
                No problems found.
              </div>
            )}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Link to="/problems">
            <Button
              variant="outline"
              className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
            >
              Load More Problems
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
