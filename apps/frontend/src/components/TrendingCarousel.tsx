import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { times, xp } from "@/constants/achivements";

const TrendingCarousel = ({ top3Problems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === top3Problems.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? top3Problems.length - 1 : prevIndex - 1;
      }
    });
  };

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
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
    <div className="relative ">
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => paginate(-1)}
          className="rounded-full border-neon-green/30 hover:border-neon-green hover:shadow-neon bg-secondary text-white "
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {currentIndex + 1} of {top3Problems.length}
          </p>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => paginate(1)}
          className="rounded-full border-neon-green/30 hover:border-neon-green hover:shadow-neon bg-secondary text-white"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Carousel */}
      <div className="relative h-64 overflow-hidden rounded-xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <div className="challenge-card h-full p-6 flex flex-col justify-between rounded-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge
                    className={`${getDifficultyClass(
                      top3Problems[currentIndex].difficulty
                    )} px-3 py-1`}
                  >
                    {top3Problems[currentIndex].difficulty}
                  </Badge>
                  <div className="text-neon-green font-orbitron font-bold">
                    +{xp[top3Problems[currentIndex].difficulty.toLowerCase()]}{" "}
                    XP
                  </div>
                </div>

                <h3 className="text-2xl font-orbitron font-bold mb-3 text-foreground">
                  {top3Problems[currentIndex].title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(top3Problems[currentIndex]?.tags || []).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-neon-green/30 text-neon-green"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span>
                    ⏱️{" "}
                    {times[top3Problems[currentIndex].difficulty.toLowerCase()]}
                  </span>
                  <span>
                    👥{" "}
                    {(
                      top3Problems[currentIndex]?.solvedBy || []
                    ).length.toLocaleString()}{" "}
                    solved
                  </span>
                </div>
              </div>

              <Link
                to={`/problem/${top3Problems[currentIndex].id}`}
                className="w-full"
              >
                <Button className="btn-primary w-full">Solve Challenge</Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {(top3Problems || []).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-neon-green shadow-neon"
                : "bg-muted hover:bg-neon-green/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingCarousel;
