import React, { useState } from "react";

const tabs = ["Overview", "Solutions", "Discussions", "Projects"];

const tabContent = {
  Overview: [
    {
      type: "submission",
      title: "Two Sum - Solved",
      time: "2 hours ago",
      difficulty: "Easy",
    },
    {
      type: "achievement",
      title: 'Earned "Speed Demon" badge',
      time: "1 day ago",
    },
    {
      type: "contest",
      title: "Participated in Weekly Contest 321",
      time: "3 days ago",
      rank: "#142",
    },
  ],
  Solutions: [
    {
      title: "Binary Tree Inorder Traversal",
      language: "Python",
      likes: 23,
      time: "1 day ago",
    },
    {
      title: "Merge Two Sorted Lists",
      language: "JavaScript",
      likes: 45,
      time: "3 days ago",
    },
    {
      title: "Valid Parentheses",
      language: "C++",
      likes: 67,
      time: "1 week ago",
    },
  ],
  Discussions: [
    {
      title: "Best approach for dynamic programming?",
      replies: 12,
      time: "2 days ago",
    },
    {
      title: "Time complexity analysis help needed",
      replies: 5,
      time: "4 days ago",
    },
    {
      title: "Interview preparation strategies",
      replies: 28,
      time: "1 week ago",
    },
  ],
  Projects: [
    {
      title: "AI Code Reviewer",
      tech: "React, Node.js, OpenAI",
      stars: 234,
      status: "Active",
    },
    {
      title: "Leetcode Analytics Dashboard",
      tech: "Vue.js, Python",
      stars: 89,
      status: "Completed",
    },
    {
      title: "Algorithm Visualizer",
      tech: "D3.js, TypeScript",
      stars: 156,
      status: "In Progress",
    },
  ],
};

export const TabbedSection = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="bg-craft-panel rounded-xl border border-gray-800">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 relative ${
              activeTab === tab
                ? "text-[#00FFA3] border-b-2 border-[#00FFA3]"
                : "text-[#A0A0A0] hover:text-white"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00FFA3] to-[#4DFFDF] animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <div className="space-y-4">
          {activeTab === "Overview" &&
            tabContent.Overview.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-craft-bg rounded-lg border border-gray-700 hover:border-[#00FFA3]/30 transition-all duration-300"
              >
                <div className="flex-1">
                  <h4 className="text-white font-medium">{item.title}</h4>
                  <p className="text-[#A0A0A0] text-sm">{item.time}</p>
                </div>
                {item.difficulty && (
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      item.difficulty === "Easy"
                        ? "bg-green-500/20 text-green-400"
                        : item.difficulty === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {item.difficulty}
                  </span>
                )}
                {item.rank && (
                  <span className="text-[#00FFA3] font-bold">{item.rank}</span>
                )}
              </div>
            ))}

          {activeTab === "Solutions" &&
            tabContent.Solutions.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-craft-bg rounded-lg border border-gray-700 hover:border-[#00FFA3]/30 transition-all duration-300"
              >
                <div className="flex-1">
                  <h4 className="text-white font-medium">{item.title}</h4>
                  <p className="text-[#A0A0A0] text-sm">
                    {item.language} • {item.time}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[#00FFA3]">
                  <span>👍</span>
                  <span className="font-bold">{item.likes}</span>
                </div>
              </div>
            ))}

          {activeTab === "Discussions" &&
            tabContent.Discussions.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-craft-bg rounded-lg border border-gray-700 hover:border-[#00FFA3]/30 transition-all duration-300"
              >
                <div className="flex-1">
                  <h4 className="text-white font-medium">{item.title}</h4>
                  <p className="text-[#A0A0A0] text-sm">{item.time}</p>
                </div>
                <div className="flex items-center gap-2 text-[#4DFFDF]">
                  <span>💬</span>
                  <span className="font-bold">{item.replies}</span>
                </div>
              </div>
            ))}

          {activeTab === "Projects" &&
            tabContent.Projects.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-craft-bg rounded-lg border border-gray-700 hover:border-[#00FFA3]/30 transition-all duration-300"
              >
                <div className="flex-1">
                  <h4 className="text-white font-medium">{item.title}</h4>
                  <p className="text-[#A0A0A0] text-sm">{item.tech}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-[#FFD86F]">
                    <span>⭐</span>
                    <span className="font-bold">{item.stars}</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      item.status === "Active"
                        ? "bg-[#00FFA3]/20 text-[#00FFA3]"
                        : item.status === "Completed"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-orange-500/20 text-orange-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
