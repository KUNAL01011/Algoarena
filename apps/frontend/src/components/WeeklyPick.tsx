import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const WeeklyPick = () => {
  return (
    <motion.div
      className="relative max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="glass-card p-8 rounded-2xl relative overflow-hidden text-white">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-transparent to-neon-blue/10 pointer-events-none"></div>

        {/* Weekly Badge */}
        <motion.div
          className="absolute top-4 right-4"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Badge className="bg-accent2 text-black font-bold px-3 py-1 shadow-accent-glow">
            ⭐ WEEKLY PICK
          </Badge>
        </motion.div>

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Content */}
            <div className="flex-1">
              <motion.h3
                className="text-3xl lg:text-4xl font-orbitron font-bold mb-4"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="hero-text">Maximum Subarray</span>
              </motion.h3>

              <motion.p
                className="text-muted-foreground mb-6 text-lg"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                A classic dynamic programming challenge that every developer
                should master. Find the contiguous subarray with the largest sum
                in O(n) time.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Badge className="difficulty-medium px-3 py-1">Medium</Badge>
                <Badge
                  variant="outline"
                  className="border-neon-green/30 text-neon-green"
                >
                  Dynamic Programming
                </Badge>
                <Badge
                  variant="outline"
                  className="border-neon-green/30 text-neon-green"
                >
                  Arrays
                </Badge>
              </motion.div>

              <motion.div
                className="text-sm text-muted-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="italic">
                  "Handpicked by the Loveable Team - This challenge perfectly
                  demonstrates the elegance of dynamic programming and is asked
                  in 70% of technical interviews."
                </p>
              </motion.div>
            </div>

            {/* Stats & CTA */}
            <div className="flex flex-col items-center text-center space-y-6">
              <motion.div
                className="text-6xl font-orbitron font-black text-neon-green"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
              >
                +750
              </motion.div>
              <div className="text-sm text-muted-foreground">XP Reward</div>

              <motion.div
                className="space-y-2 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="flex items-center gap-2">
                  <span>🏆</span>
                  <span>Exclusive Badge</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>Est. 40 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>1,234 attempted this week</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={"/signin"}>
                  <Button className="btn-primary text-lg px-8 py-3">
                    Accept Challenge
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeeklyPick;
