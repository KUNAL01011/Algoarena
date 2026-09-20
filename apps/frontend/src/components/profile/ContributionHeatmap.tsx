import React from "react";

export const ContributionHeatmap = () => {
  // Generate exactly 365 days (52 weeks + 1 day) of contribution data
  const generateContributions = () => {
    const contributions = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364); // Go back 364 days to get 365 total

    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      // Create more realistic contribution patterns
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const baseActivity = isWeekend ? 0.3 : 0.7;
      const randomFactor = Math.random();

      let count = 0;
      if (randomFactor < baseActivity) {
        count = Math.floor(Math.random() * 8) + 1; // 1-8 contributions
      }

      contributions.push({
        date: date.toISOString().split("T")[0],
        count,
        dayOfWeek,
      });
    }
    return contributions;
  };

  const contributions = generateContributions();

  const getIntensity = (count: number) => {
    if (count === 0) return "bg-craft-panel border border-gray-800";
    if (count <= 2) return "bg-[#0D4A2F] border border-[#0D4A2F]";
    if (count <= 4) return "bg-[#1A6B47] border border-[#1A6B47]";
    if (count <= 6) return "bg-[#26A65B] border border-[#26A65B]";
    return "bg-[#00FFA3] border border-[#00FFA3] shadow-sm shadow-[#00FFA3]/30";
  };

  const getTooltipText = (contribution: any) => {
    const date = new Date(contribution.date);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (contribution.count === 0) {
      return `No contributions on ${formattedDate}`;
    }
    return `${contribution.count} contribution${
      contribution.count > 1 ? "s" : ""
    } on ${formattedDate}`;
  };

  // Group contributions into weeks (7 days each)
  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-craft-panel rounded-xl p-6 border border-gray-800">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <span>📅</span>
        Contribution Activity
      </h3>

      {/* Responsive container */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Month labels */}
          <div className="flex mb-2 text-xs text-[#A0A0A0]">
            <div className="w-8"></div> {/* Space for day labels */}
            {monthLabels.map((month, index) => (
              <div key={month} className="flex-1 text-center">
                {month}
              </div>
            ))}
          </div>

          {/* Day labels and grid */}
          <div className="flex">
            {/* Day labels */}
            <div className="flex flex-col justify-around w-8 text-xs text-[#A0A0A0] pr-2">
              {dayLabels.map((day, index) => (
                <div key={day} className={index % 2 === 1 ? "" : "invisible"}>
                  {day}
                </div>
              ))}
            </div>

            {/* Contribution grid */}
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((contribution, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-3 h-3 rounded-sm ${getIntensity(
                        contribution.count
                      )} hover:ring-2 hover:ring-[#00FFA3]/50 transition-all duration-200 cursor-pointer group relative`}
                      title={getTooltipText(contribution)}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                        <div className="bg-black/90 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                          {getTooltipText(contribution)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-[#A0A0A0]">
          {contributions.reduce((sum, c) => sum + c.count, 0)} contributions in
          the last year
        </span>
        <div className="flex items-center gap-2 text-xs text-[#A0A0A0]">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-craft-panel border border-gray-800 rounded-sm"></div>
            <div className="w-3 h-3 bg-[#0D4A2F] rounded-sm"></div>
            <div className="w-3 h-3 bg-[#1A6B47] rounded-sm"></div>
            <div className="w-3 h-3 bg-[#26A65B] rounded-sm"></div>
            <div className="w-3 h-3 bg-[#00FFA3] rounded-sm"></div>
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
