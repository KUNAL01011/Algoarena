import { useCurrentUser, useLogout } from "@/hooks/useAuth";

interface ProfileHeaderProps {
  onEditClick: () => void;
}

export const ProfileHeader = ({ onEditClick }: ProfileHeaderProps) => {
  const { mutate: logout } = useLogout();

  const handleLogout = async () => {
    logout();
  };
  const authUser = useCurrentUser();
  if (authUser === null) return null;
  const { name, username, level, bio } = authUser;

  return (
    <div className="bg-craft-panel rounded-2xl p-6 border border-gray-800 hover:border-[#00FFA3]/30 transition-all duration-300">
      {/* Avatar Section */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00FFA3] to-[#4DFFDF] p-1 animate-pulse">
            <div className="w-full h-full rounded-full bg-craft-panel flex items-center justify-center">
              <img
                src={authUser?.image ? authUser?.image : "https://jqj85xu4kj.ufs.sh/f/ebjSeZwBViRsJGBNrwpphUq4X3FdtTAI7NRfyEug5aMZzCvL"}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#00FFA3] rounded-full flex items-center justify-center shadow-lg shadow-[#00FFA3]/50">
            <span className="text-xs font-bold text-black">{level}</span>
          </div>
        </div>

        {/* User Info */}
        <h1 className="text-xl font-bold mb-1 bg-gradient-to-r from-[#00FFA3] to-[#4DFFDF] bg-clip-text text-transparent">
          {name}
        </h1>
        <p className="text-[#A0A0A0] text-sm mb-3">@{username}</p>

        {/* Status Chip */}
        <div className="inline-flex items-center gap-2 bg-[#00FFA3]/10 border border-[#00FFA3]/30 rounded-full px-3 py-1 mb-4">
          <span className="text-sm">🔥</span>
          <span className="text-[#00FFA3] font-medium text-sm">
            Active Coder
          </span>
        </div>

        {/* Bio */}
        <p className="text-[#A0A0A0] text-sm leading-relaxed mb-4">
          {bio
            ? bio
            : `Full-stack developer passionate about clean code and innovative
          solutions. Currently exploring AI/ML.`}
        </p>

        {/* Edit Profile Button */}
        <button
          onClick={onEditClick}
          className="group relative bg-transparent border-2 border-[#00FFA3] text-[#00FFA3] px-4 py-2 rounded-xl font-medium hover:bg-[#00FFA3] hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#00FFA3]/50 text-sm w-full"
        >
          <span className="relative z-10">Edit Profile</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00FFA3] to-[#4DFFDF] opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 blur-sm"></div>
        </button>

        <button
          className="mt-4 group relative bg-transparent border-2 border-craft-border text-[#00FFA3] px-4 py-2 rounded-xl font-medium hover:bg-[#00FFA3] hover:text-black transition-all duration-300 hover:shadow-lg  text-sm w-full"
          onClick={handleLogout}
        >
          <span className="relative z-10">Sign Out</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00FFA3] to-[#4DFFDF] opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 blur-sm"></div>
        </button>
      </div>
    </div>
  );
};
