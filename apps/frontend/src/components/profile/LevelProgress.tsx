import { useCurrentUser } from "@/hooks/useAuth";
import { useNextLevelXp } from "@/hooks/useNextLevelXp";

export const LevelProgress = () => {
  const authUser = useCurrentUser();
  const currentXP = Number(authUser?.xp || 0);
  const currentLevel = Number(authUser?.level) || 0;
  const maxXP = useNextLevelXp();
  const progress = maxXP > 0 ? (currentXP / maxXP) * 100 : 0;

  return (
    <div className="bg-craft-panel rounded-xl p-6 mb-8 border border-gray-800">
      <div className="flex items-center mb-4 gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00FFA3] to-[#4DFFDF] flex items-center justify-center shadow-lg shadow-[#00FFA3]/30 animate-bounce"
              style={{ animationDuration: "3s" }}
            >
              <span className="text-black font-bold text-xl">
                {currentLevel}
              </span>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#FFD86F] rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-black">★</span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex xl:flex-col -translate-y-2 justify-between flex-row">
            <div>
              <h3 className="text-xl font-bold text-white">
                Level {currentLevel}
              </h3>
            </div>
            <p className="text-md font-bold text-[#00FFA3]">
              {currentXP} / {maxXP} XP
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-craft-accent to-craft-accent-secondary rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-[#A0A0A0] text-sm mt-2 text-center">
        {Math.max(0, maxXP - currentXP)} XP until next level
      </p>
    </div>
  );
};
