import React from "react";

const skillCategories = {
  Advanced: [
    { name: "JavaScript", level: 95 },
    { name: "React", level: 90 },
    { name: "Python", level: 88 },
  ],
  Intermediate: [
    { name: "Node.js", level: 75 },
    { name: "TypeScript", level: 70 },
    { name: "AWS", level: 65 },
  ],
  Fundamental: [
    { name: "Docker", level: 45 },
    { name: "Rust", level: 35 },
    { name: "Go", level: 40 },
  ],
};

const languages = [
  "JavaScript",
  "Python",
  "TypeScript",
  "C++",
  "Java",
  "Rust",
  "Go",
  "SQL",
];

export const SkillsLanguages = () => {
  return (
    <div className="space-y-6">
      {/* Skills */}
      <div className="bg-craft-panel rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <span>🧠</span>
          Skills
        </h3>

        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category} className="mb-6 last:mb-0">
            <h4 className="text-[#00FFA3] font-medium text-sm mb-3 uppercase tracking-wide">
              {category}
            </h4>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white text-sm">{skill.name}</span>
                    <span className="text-[#A0A0A0] text-xs">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00FFA3] to-[#4DFFDF] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    >
                      <div className="h-full bg-gradient-to-r from-[#00FFA3] to-[#4DFFDF] animate-pulse opacity-75"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Languages */}
      <div className="bg-craft-panel rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <span>💻</span>
          Languages
        </h3>

        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <span
              key={language}
              className="px-3 py-1 bg-[#00FFA3]/10 border border-[#00FFA3]/30 text-[#00FFA3] rounded-full text-sm font-medium hover:bg-[#00FFA3]/20 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              {language}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
