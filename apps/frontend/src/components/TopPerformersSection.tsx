import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Trophy, Medal, Award, Clock, Zap, Target } from "lucide-react";
interface Winner {
  rank: number;
  name: string;
  timeTaken: string;
  correctAnswers: number;
  totalQuestions: number;
  xp: number;
}
interface TopPerformersSectionProps {
  winners: Winner[];
}
const TopPerformersSection = ({
  winners
}: TopPerformersSectionProps) => {
  const getPositionIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return null;
    }
  };
  const getCardStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/30 shadow-lg shadow-yellow-500/10";
      case 2:
        return "bg-gradient-to-br from-gray-400/10 to-gray-500/5 border-gray-400/30 shadow-lg shadow-gray-400/10";
      case 3:
        return "bg-gradient-to-br from-amber-600/10 to-amber-700/5 border-amber-600/30 shadow-lg shadow-amber-600/10";
      default:
        return "bg-craft-panel border-craft-border";
    }
  };
  const PerformerCard = ({
    winner
  }: {
    winner: Winner;
  }) => <Card className={`${getCardStyle(winner.rank)} hover:scale-105 transition-all duration-300`}>
      <div className="text-center space-y-4 p-6 bg-slate-900 rounded-lg">
        {/* Rank Icon */}
        <div className="flex justify-center">
          {getPositionIcon(winner.rank)}
        </div>
        
        {/* Avatar */}
        <Avatar className="w-16 h-16 mx-auto border-2 border-craft-border">
          <AvatarFallback className="bg-craft-accent text-craft-bg text-lg font-semibold">
            {winner.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        {/* Name & Rank Badge */}
        <div className="space-y-2">
          <h3 className="font-semibold text-craft-text-primary text-lg">
            {winner.name}
          </h3>
          <Badge className={`${winner.rank === 1 ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' : winner.rank === 2 ? 'bg-gray-400/20 text-gray-400 border-gray-400/30' : winner.rank === 3 ? 'bg-amber-600/20 text-amber-600 border-amber-600/30' : 'bg-craft-accent/20 text-craft-accent border-craft-accent/30'}`}>
            #{winner.rank}
          </Badge>
        </div>
        
        {/* XP Badge */}
        <Badge className="bg-craft-accent/20 text-craft-accent border-craft-accent/30 text-lg px-4 py-1">
          <Zap className="w-4 h-4 mr-1" />
          {winner.xp.toLocaleString()} XP
        </Badge>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center">
            <div className="flex justify-center mb-1">
              <Clock className="w-4 h-4 text-craft-accent-secondary" />
            </div>
            <p className="text-xs text-craft-text-secondary mb-1">Time</p>
            <p className="text-sm font-medium text-craft-text-primary">
              {winner.timeTaken}
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-1">
              <Target className="w-4 h-4 text-craft-success" />
            </div>
            <p className="text-xs text-craft-text-secondary mb-1">Solved</p>
            <p className="text-sm font-medium text-craft-text-primary">
              {winner.correctAnswers}/{winner.totalQuestions}
            </p>
          </div>
        </div>
      </div>
    </Card>;
  return <div className="mb-8">
      <h2 className="text-2xl font-bold text-craft-text-primary mb-6">
        Top Performers
      </h2>
      
      {/* Desktop View - 3 Cards Side by Side */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {winners.map(winner => <PerformerCard key={winner.rank} winner={winner} />)}
      </div>
      
      {/* Mobile View - Carousel */}
      <div className="md:hidden">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {winners.map(winner => <CarouselItem key={winner.rank} className="pl-2 md:pl-4 basis-4/5">
                <PerformerCard winner={winner} />
              </CarouselItem>)}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </div>;
};
export default TopPerformersSection;