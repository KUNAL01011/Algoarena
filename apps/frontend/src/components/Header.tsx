import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { User, Menu, Zap, Trophy, Target, Code } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useCurrentUser } from "@/hooks/useAuth";

const Header = () => {
  const location = useLocation();
  const authUser = useCurrentUser();

  const navItems = [
    { name: "Problems", path: "/problems", icon: Code },
    { name: "Sheets", path: "/sheets", icon: Target },
    { name: "Contests", path: "/contests", icon: Trophy },
    { name: "Interview", path: "/interview", icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-craft-panel border-b border-craft-border sticky top-0 z-50 backdrop-blur-sm bg-craft-panel/95">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path}>
                <Button
                  variant="ghost"
                  className={`text-craft-text-secondary hover:text-craft-accent hover:bg-craft-accent/10 transition-all duration-200 ${
                    isActive(item.path)
                      ? "text-craft-accent bg-craft-accent/10"
                      : ""
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <Badge className="bg-craft-accent/20 text-craft-accent border-craft-accent/30">
                Level {authUser?.level || 0}
              </Badge>
              <span className="text-craft-text-secondary text-sm">
                {authUser?.xp || 0} XP
              </span>
            </div>

            {/* Profile Button */}
            <Link to={"/profile"}>
              <div className="w-8 h-8 bg-gradient-to-br from-craft-accent to-craft-accent-secondary rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-craft-accent/25 transition-all duration-200">
                <User className="w-4 h-4 text-craft-bg" />
              </div>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-craft-text-secondary hover:text-craft-accent"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-craft-panel border-craft-border">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.name} to={item.path}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start text-craft-text-secondary hover:text-craft-accent hover:bg-craft-accent/10 ${
                          isActive(item.path)
                            ? "text-craft-accent bg-craft-accent/10"
                            : ""
                        }`}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
