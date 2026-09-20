import { sub } from "date-fns";
import { stat } from "fs";

export const landingPage = {
  hero: {
    heading: "MASTER ALGORITHMS",
    // subheading: "SOLVE & LEVEL UP",
    description:
      "Dive into the neon-powered coding universe. Solve challenges, level up your skills, and join the elite.",
    buttonText: "Start a Challenge",
    buttonLink: "/problems",
    stats: [
      { label: "Active Coders", value: "50K+" },
      { label: "Challenges", value: "2.5K+" },
      { label: "Companies", value: "100+" },
    ],
  },
  filters: {
    searchPlaceholder: "Search challenges, topics...",
    filterOptions: [
      { label: "All", value: "all" },
      { label: "Easy", value: "easy" },
      { label: "Medium", value: "medium" },
      { label: "Hard", value: "hard" },
      { label: "New", value: "new" },
      { label: "Trending", value: "trending" },
    ],
    suggestButtonText: "Suggest Me One",
  },
};
