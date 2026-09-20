import { useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/useAuth";
import { levels } from "@/constants/achivements";

/**
 * Custom hook to calculate the XP required for the next level
 * @param userLevel - Optional user level parameter. If not provided, uses authUser level from store
 * @returns nextLevelXp - The XP required to reach the next level
 */
export const useNextLevelXp = (userLevel?: number) => {
  const authUser = useCurrentUser();
  const [nextLevelXp, setNextLevelXp] = useState(0);

  useEffect(() => {
    // Use provided userLevel or fall back to authUser level
    const currentLevel = userLevel ?? authUser?.level;

    if (currentLevel != null) {
      const levelData = levels.find(
        (level) => level.level === Number(currentLevel) + 1
      );
      if (levelData) {
        setNextLevelXp(levelData.requiredXP);
      } else {
        // If no next level found (max level reached), set to current level's XP
        const currentLevelData = levels.find(
          (level) => level.level === Number(currentLevel)
        );
        setNextLevelXp(currentLevelData?.requiredXP || 0);
      }
    }
  }, [userLevel, authUser?.level]);

  return nextLevelXp;
};
