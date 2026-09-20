import React, { useState } from "react";
import { motion } from "motion/react";
import { Clock, Award, Users, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { times, xp } from "@/constants/achivements";

const FloatingChallengeCard = ({ challenge, onPreview }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "difficulty-easy";
      case "medium":
        return "difficulty-medium";
      case "hard":
        return "difficulty-hard";
      default:
        return "difficulty-easy";
    }
  };

  return (
    <motion.div
      className="challenge-card group cursor-pointer relative"
      whileHover={{
        scale: 1.02,
        rotate: 1,
        y: -5,
      }}
      whileTap={{ scale: 0.98, rotate: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-neon-green/20 blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-neon-green transition-colors">
              {challenge.title}
            </h3>
            <div className="flex items-center gap-2">
              <span
                className={`${getDifficultyClass(
                  challenge.difficulty
                )} px-2 py-1 rounded text-xs font-medium`}
              >
                {challenge.difficulty}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="w-3 h-3" />
                {challenge.solvedBy.length.toLocaleString()}
              </div>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onPreview();
              }}
              className="text-muted-foreground hover:text-neon-green"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-neon-green" />
            <span className="text-neon-green font-semibold">
              +{xp[challenge.difficulty.toLowerCase()]} XP
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>~{times[challenge.difficulty.toLowerCase()]}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {challenge.tags.map((tag) => (
            <motion.span
              key={tag}
              className="px-2 py-1 bg-secondary text-xs rounded-full text-muted-foreground border border-border"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(0, 255, 163, 0.5)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Action Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to={`/problem/${challenge.id}`} className="w-full">
            <Button className="w-full btn-primary group">
              Start Challenge
              <motion.div
                className="ml-2"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.div>
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FloatingChallengeCard;
