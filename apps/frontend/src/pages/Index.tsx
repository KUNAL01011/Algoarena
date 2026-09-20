import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import HeroBanner from "../components/HeroBanner";
import SearchAndFilters from "../components/SearchAndFilters";
import FeaturedChallenge from "../components/FeaturedChallenge";
import XPMissions from "../components/XPMissions";
import TopicGrid from "../components/TopicGrid";
import TagExplorer from "../components/TagExplorer";
import TrendingCarousel from "../components/TrendingCarousel";
import CompanyZone from "../components/CompanyZone";
import WeeklyPick from "../components/WeeklyPick";
import LiveFeed from "../components/LiveFeed";
import Leaderboard from "../components/Leaderboard";
import CodePreviewPanel from "../components/CodePreviewPanel";
import FloatingChallengeCard from "../components/FloatingChallengeCard";
import AnimatedTabs from "../components/AnimatedTabs";
import CodeRainBackground from "../components/CodeRainBackground";
import { usePotd } from "@/hooks/usePotd";
import {
  useTop3Problems,
  useTags,
  useCompaniesChallenges,
} from "@/hooks/useProblems";
import { useLeaderboardStore } from "@/store/useLeaderboard";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/TestimonialsSection";

const Index = () => {
  const [isCodePanelOpen, setIsCodePanelOpen] = useState(false);
  const { data: potd, isLoading: isPotdGetting } = usePotd();
  const { data: top3Problems, isLoading: isTop3ProblemsLoading } =
    useTop3Problems();
  const { data: tags } = useTags();
  const { data: companiesChallenges } = useCompaniesChallenges();
  // const { leaderboard, getLeaderboard, isLeaderboardGetting } =
  //   useLeaderboardStore();

  const tabsData = [
    {
      id: "trending",
      label: "🔥 Trending",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(top3Problems || []).map((challenge) => (
            <FloatingChallengeCard
              key={challenge.id}
              challenge={challenge}
              onPreview={() => setIsCodePanelOpen(true)}
            />
          ))}
        </div>
      ),
    },
    {
      id: "daily",
      label: "📅 Daily Challenges",
      content: <XPMissions />,
    },
    {
      id: "sheets",
      label: "📋 Problem Sheets",
      content: <CompanyZone />,
    },
  ];

  return (
    <>
      <CodeRainBackground />

      <motion.div
        className="min-h-screen bg-[#0D0D0D] relative z-10 hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section with enhanced animations */}
        <br />
        <br />
        <br />

        <motion.section
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <HeroBanner />
        </motion.section>

        <br />
        <br />
        <br />

        {/* Main Content */}
        <div className="container mx-auto px-4 space-y-12 pb-16">
          {/* Search & Filters */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SearchAndFilters />
          </motion.section>

          {/* Explore by Tags */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl font-orbitron font-bold mb-6">
              <span className="hero-text">Explore by Tags</span>
            </h2>
            <TagExplorer tags={tags} />
          </motion.section>

          {/* Featured Challenge */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {potd && <FeaturedChallenge potd={potd} />}
          </motion.section>

          {/* Animated Tabs Section */}
          {(top3Problems || []).length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">
                <span className="hero-text">Explore Challenges</span>
              </h2>
              <AnimatedTabs tabs={tabsData} defaultTab="trending" />
            </motion.section>
          )}

          {/* Topics to Explore */}
          {(tags || []).length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">
                <span className="hero-text">Topics to Explore</span>
              </h2>
              <TopicGrid tags={tags || []} />
            </motion.section>
          )}

          {/* Trending Challenges */}
          {(top3Problems || []).length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-orbitron font-bold mb-8 text-center">
                <span className="hero-text">Trending Challenges</span>
              </h2>
              <TrendingCarousel top3Problems={top3Problems || []} />
            </motion.section>
          )}

          {/* Weekly Pick  */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <WeeklyPick />
          </motion.section>

          {/* Testimonials Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <TestimonialsSection />
          </motion.section>

          {/* Leaderboard */}
          <div className="grid grid-cols-1 gap-8 sm:container">
            <motion.section
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-2xl font-orbitron font-bold mb-6">
                <span className="hero-text">Leaderboard</span>
              </h2>
              <Leaderboard />
            </motion.section>
          </div>
        </div>
        <Footer />

        {/* VS Code-like Code Preview Panel */}
        <CodePreviewPanel
          isOpen={isCodePanelOpen}
          onClose={() => setIsCodePanelOpen(false)}
        />
      </motion.div>
    </>
  );
};

export default Index;
