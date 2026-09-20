import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const TagExplorer = ({ tags }: { tags: { tag: string; count: number }[] }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const navigate = useNavigate();
  const handlerClickTag = (tagName: string) => {
    navigate(`/problems?tags=${tagName}`);
  };
  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3 min-w-max">
          {(tags || []).map((tag, index) => (
            <motion.button
              key={tag.tag}
              onClick={() => handlerClickTag(tag.tag)}
              className={`pill-shaped px-4 py-2 rounded-full border transition-all duration-300 whitespace-nowrap ${
                selectedTag === tag.tag
                  ? "bg-neon-green text-black border-neon-green"
                  : "bg-secondary backdrop-blur border-border text-foreground hover:border-neon-green/50 hover:bg-neon-green/10"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-medium">#{tag.tag}</span>
              <span className="ml-2 text-xs opacity-75">{tag.count}</span>
              {/* {selectedTag === tag.name && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-neon-green/20"
                  layoutId="tagGlow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )} */}
            </motion.button>
          ))}
        </div>
      </div>

      {selectedTag && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-card rounded-lg p-4"
        >
          <p className="text-muted-foreground">
            Showing challenges tagged with{" "}
            <span className="text-neon-green font-semibold">
              #{selectedTag}
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TagExplorer;
