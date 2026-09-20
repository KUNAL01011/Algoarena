
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Target, Zap } from "lucide-react";

interface LeaderboardData {
  rank: number;
  name: string;
  timeTaken: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  rating: number;
  xp: number;
}

interface LeaderboardTableProps {
  data: LeaderboardData[];
  currentUserId?: string;
}

const LeaderboardTable = ({ data, currentUserId }: LeaderboardTableProps) => {
  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      const colors = {
        1: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
        2: "bg-gray-400/20 text-gray-400 border-gray-400/30",
        3: "bg-amber-600/20 text-amber-600 border-amber-600/30"
      };
      return <Badge className={colors[rank as keyof typeof colors]}>#{rank}</Badge>;
    }
    return <Badge className="bg-craft-text-secondary/20 text-craft-text-secondary border-craft-text-secondary/30">#{rank}</Badge>;
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating 
                ? "text-yellow-500 fill-yellow-500" 
                : "text-craft-text-secondary"
            }`}
          />
        ))}
      </div>
    );
  };

  const isCurrentUser = (participantName: string) => {
    return currentUserId && participantName === currentUserId;
  };

  return (
    <>
      {/* Desktop Table */}
      <Card className="bg-craft-panel border-craft-border rounded-2xl hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="border-craft-border hover:bg-transparent">
              <TableHead className="text-craft-text-primary font-semibold">Rank</TableHead>
              <TableHead className="text-craft-text-primary font-semibold">Participant</TableHead>
              <TableHead className="text-craft-text-primary font-semibold">XP</TableHead>
              <TableHead className="text-craft-text-primary font-semibold">Time</TableHead>
              <TableHead className="text-craft-text-primary font-semibold">Correct</TableHead>
              <TableHead className="text-craft-text-primary font-semibold">Wrong</TableHead>
              <TableHead className="text-craft-text-primary font-semibold">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((participant) => (
              <TableRow 
                key={participant.rank} 
                className={`border-craft-border transition-colors ${
                  isCurrentUser(participant.name) 
                    ? 'bg-craft-accent/10 border-craft-accent/20' 
                    : 'hover:bg-craft-bg/50'
                }`}
              >
                <TableCell>
                  {getRankBadge(participant.rank)}
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-craft-accent text-craft-bg text-sm">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-craft-text-primary font-medium">
                        {participant.name}
                      </span>
                      {isCurrentUser(participant.name) && (
                        <Badge className="ml-2 bg-craft-accent/20 text-craft-accent border-craft-accent/30 text-xs">
                          You
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4 text-craft-accent-secondary" />
                    <span className="text-craft-text-primary font-medium">
                      {participant.xp.toLocaleString()}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-craft-text-secondary" />
                    <span className="text-craft-text-secondary">
                      {participant.timeTaken}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <Badge className="bg-craft-success/20 text-craft-success border-craft-success/30">
                    {participant.correctAnswers}
                  </Badge>
                </TableCell>
                
                <TableCell>
                  <Badge className="bg-craft-error/20 text-craft-error border-craft-error/30">
                    {participant.wrongAnswers}
                  </Badge>
                </TableCell>
                
                <TableCell>
                  {renderStars(participant.rating)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        {data.map((participant) => (
          <Card 
            key={participant.rank}
            className={`p-4 rounded-2xl transition-all duration-300 ${
              isCurrentUser(participant.name)
                ? 'bg-craft-accent/10 border-craft-accent/30 shadow-lg shadow-craft-accent/10'
                : 'bg-craft-panel border-craft-border hover:bg-craft-bg/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getRankBadge(participant.rank)}
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-craft-accent text-craft-bg text-sm">
                    {participant.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <span className="text-craft-text-primary font-medium">
                    {participant.name}
                  </span>
                  {isCurrentUser(participant.name) && (
                    <Badge className="ml-2 bg-craft-accent/20 text-craft-accent border-craft-accent/30 text-xs">
                      You
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4 text-craft-accent-secondary" />
                <span className="text-craft-text-primary font-semibold">
                  {participant.xp.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  <Clock className="w-4 h-4 text-craft-text-secondary" />
                  <span className="text-xs text-craft-text-secondary">Time Taken</span>
                </div>
                <span className="text-craft-text-primary font-medium">
                  {participant.timeTaken}
                </span>
              </div>
              
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  <Target className="w-4 h-4 text-craft-success" />
                  <span className="text-xs text-craft-text-secondary">Problems Solved</span>
                </div>
                <div className="flex space-x-2">
                  <Badge className="bg-craft-success/20 text-craft-success border-craft-success/30 text-xs">
                    {participant.correctAnswers} ✓
                  </Badge>
                  <Badge className="bg-craft-error/20 text-craft-error border-craft-error/30 text-xs">
                    {participant.wrongAnswers} ✗
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-craft-border">
              <div className="flex items-center justify-between">
                <span className="text-xs text-craft-text-secondary">Rating</span>
                {renderStars(participant.rating)}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default LeaderboardTable;