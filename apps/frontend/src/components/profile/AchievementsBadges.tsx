import React from "react";

const badges = [
  {
    name: "First Blood",
    icon: "🥇",
    tier: "gold",
    unlocked: true,
    description: "Solved first problem",
  },
  {
    name: "Speed Demon",
    icon: "⚡",
    tier: "platinum",
    unlocked: true,
    description: "Solved in under 2 minutes",
  },
  {
    name: "Night Owl",
    icon: "🦉",
    tier: "silver",
    unlocked: true,
    description: "Solved problems after midnight",
  },
  {
    name: "Marathon",
    icon: "🏃",
    tier: "gold",
    unlocked: true,
    description: "100+ day streak",
  },
  {
    name: "Algorithm Master",
    icon: "🧠",
    tier: "platinum",
    unlocked: false,
    description: "Master all algorithm categories",
  },
  {
    name: "Code Reviewer",
    icon: "📋",
    tier: "bronze",
    unlocked: true,
    description: "Reviewed 50+ submissions",
  },
];

export const AchievementsBadges = () => {
  return (
    <div className="bg-craft-panel rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span>🏆</span>
        Achievements & Badges
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className={`group relative p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
              badge.unlocked
                ? "bg-craft-bg border-gray-700 hover:border-[#00FFA3]/50 hover:shadow-lg hover:shadow-[#00FFA3]/20"
                : "bg-gray-800/50 border-gray-700 opacity-50"
            }`}
          >
            <div className="text-center">
              <div
                className={`text-3xl mb-2 transition-transform duration-300 ${
                  badge.unlocked ? "group-hover:scale-110" : "grayscale"
                }`}
              >
                {badge.icon}
              </div>
              <h4
                className={`font-medium text-sm mb-1 ${
                  badge.unlocked ? "text-white" : "text-gray-500"
                }`}
              >
                {badge.name}
              </h4>
              <div
                className={`w-full h-1 rounded-full ${
                  badge.tier === "platinum"
                    ? "bg-gradient-to-r from-purple-400 to-pink-400"
                    : badge.tier === "gold"
                    ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                    : badge.tier === "silver"
                    ? "bg-gradient-to-r from-gray-300 to-gray-400"
                    : "bg-gradient-to-r from-orange-400 to-yellow-600"
                } ${!badge.unlocked ? "opacity-30" : ""}`}
              ></div>
            </div>

            {badge.unlocked && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#00FFA3]/20 to-[#4DFFDF]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            )}

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-black/90 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                {badge.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
