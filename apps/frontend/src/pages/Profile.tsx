import { useState } from "react";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { StatsGrid } from "../components/profile/StatsGrid";
import { LevelProgress } from "../components/profile/LevelProgress";
import { TabbedSection } from "../components/profile/TabbedSection";
import { AchievementsBadges } from "../components/profile/AchievementsBadges";
import { SkillsLanguages } from "../components/profile/SkillsLanguages";
import { ContributionHeatmap } from "../components/profile/ContributionHeatmap";
import { CommunityStats } from "../components/profile/CommunityStats";
import { EditProfileModal } from "../components/profile/EditProfileModal";
import Header from "@/components/Header";

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-craft-bg text-white font-sans">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Three Column Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Left Column - Identity & Quick Stats */}
            <div className="xl:col-span-3 space-y-6">
              <ProfileHeader onEditClick={() => setIsEditModalOpen(true)} />
              <StatsGrid />
              <LevelProgress />
            </div>

            {/* Middle Column - Dynamic Content */}
            <div className="xl:col-span-6 space-y-6">
              <TabbedSection />
              <AchievementsBadges />
              <ContributionHeatmap />
            </div>

            {/* Right Column - Skills & Community */}
            <div className="xl:col-span-3 space-y-6">
              <SkillsLanguages />
              <CommunityStats />
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      </div>
    </>
  );
};

export default Profile;
