import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Problem } from "@/api/problems";
import { useCurrentUser } from "@/hooks/useAuth";

const difficultyColors = {
  EASY: "bg-craft-success/20 text-craft-success border-craft-success/30",
  MEDIUM:
    "bg-craft-accent-secondary/20 text-craft-accent-secondary border-craft-accent-secondary/30",
  HARD: "bg-craft-error/20 text-craft-error border-craft-error/30",
};

const ProblemCard = ({ problem }: { problem: Problem }) => {
  
  const { id, title, tags, difficulty } = problem;
  const authUser = useCurrentUser();
  const solved = problem?.solvedBy?.some(
    (solvedProblem) => solvedProblem.userId === authUser?.id
  );
  const diffPercent =
    difficulty == "EASY"
      ? 92.73
      : difficulty == "MEDIUM"
      ? 76.92
      : difficulty == "HARD"
      ? 61.54
      : 0;
  return (
    <Link to={`/problem/${id}`}>
      <Card className="bg-craft-panel border-craft-border hover:border-craft-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-craft-accent/10 group cursor-pointer">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              {solved && <CheckCircle className="w-5 h-5 text-craft-success" />}
              <div>
                <h3 className="text-craft-text-primary font-semibold group-hover:text-craft-accent transition-colors">
                  {title}
                </h3>
              </div>
            </div>
            <Badge className={difficultyColors[problem.difficulty.toUpperCase()]}>{difficulty}</Badge>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags?.slice(0, 3).map((topic) => (
              <Badge
                key={topic}
                variant="outline"
                className="text-xs text-craft-text-secondary border-craft-border hover:border-craft-accent/50 hover:text-craft-accent transition-all"
              >
                {topic}
              </Badge>
            ))}
            {tags?.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs text-craft-text-secondary border-craft-border"
              >
                +{tags?.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-craft-text-secondary">
              Acceptance: <span className="text-white">{diffPercent}%</span>
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-craft-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-craft-text-secondary group-hover:text-craft-accent transition-colors">
                Solve
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProblemCard;
