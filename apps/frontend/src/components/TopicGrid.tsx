import React from "react";
import { motion } from "motion/react";
import { iconMap } from "@/constants/tags";

const TopicGrid = ({ tags }) => {
  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    return null;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {(tags || []).map((tag, index) => {
        const tagLower = tag.tag?.toLowerCase();
        const matchedIcon = iconMap[tagLower];

        if (!matchedIcon) return null;
        return (
          <motion.div
            key={tag.tag}
            className="topic-card neon-glow group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-center">
              <motion.div
                className="text-4xl mb-3 group-hover:animate-float"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                {iconMap[tag.tag?.toLowerCase()]}
              </motion.div>
              <h3 className="font-semibold text-sm mb-2 text-foreground group-hover:text-neon-green transition-colors">
                {tag.tag}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                {tag.count} challenges
              </p>

              {/* Progress Bar */}
              {/* <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${topic.progress}%` }}
                transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
              />
            </div>
            <p className="text-xs text-neon-green mt-1 font-medium">
              {topic.progress}% complete
            </p> */}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TopicGrid;
