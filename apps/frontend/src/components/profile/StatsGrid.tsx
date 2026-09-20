import React from "react";

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
  badge?: string;
  trend?: string;
}

const StatCard = ({ icon, value, label, badge, trend }: StatCardProps) => {
  return (
    <div className="group bg-craft-panel rounded-xl p-4 border border-gray-800 hover:border-[#00FFA3]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#00FFA3]/20 hover:scale-105 cursor-pointer">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-2xl text-[#00FFA3] group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white group-hover:text-[#00FFA3] transition-colors duration-300">
              {value}
            </span>
            {badge && (
              <span className="bg-[#00FFA3] text-black text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                {badge}
              </span>
            )}
          </div>
        </div>
      </div>
      <p className="text-[#A0A0A0] text-xs">{label}</p>
      {trend && (
        <p className="text-[#00FFA3] text-xs font-medium mt-1">{trend}</p>
      )}
    </div>
  );
};

export const StatsGrid = () => {
  const stats = [
    {
      icon: "🧩",
      value: "347",
      label: "Problems Solved",
      trend: "+12 this week",
    },
    {
      icon: "🔥",
      value: "23",
      label: "Current Streak",
      trend: "Personal best!",
    },
    { icon: "🏆", value: "1,847", label: "Contest Rating", badge: "Expert" },
    { icon: "📝", value: "12", label: "Code Reviews", badge: "New" },
  ];

  return (
    <div className="grid grid-cols-1 gap-3">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};
