import React from "react";

const communityStats = [
  { icon: "👁️", label: "Profile Views", value: "2,847", trend: "+12%" },
  { icon: "💬", label: "Discussions", value: "156", trend: "+8%" },
  { icon: "⭐", label: "Solution Likes", value: "1,234", trend: "+24%" },
  { icon: "⬆️", label: "Reputation", value: "8,952", trend: "+15%" },
];

export const CommunityStats = () => {
  return (
    <div className="bg-craft-panel rounded-xl p-6 border border-gray-800">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <span>👥</span>
        Community Stats
      </h3>

      <div className="space-y-4">
        {communityStats.map((stat, index) => (
          <div
            key={index}
            className="group flex items-center justify-between p-3 bg-craft-bg rounded-lg border border-gray-700 hover:border-[#00FFA3]/30 hover:shadow-lg hover:shadow-[#00FFA3]/10 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </span>
              <span className="text-[#A0A0A0] text-sm">{stat.label}</span>
            </div>
            <div className="text-right">
              <div className="text-white font-bold group-hover:text-[#00FFA3] transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-[#00FFA3] text-xs font-medium">
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
