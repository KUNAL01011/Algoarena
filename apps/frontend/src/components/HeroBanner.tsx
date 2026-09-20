import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Play, Target, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { landingPage } from "@/constants/landingPage";
import VideoDialog from "./VideoDialog";

const HeroBanner = () => {
  const [open, setOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleMouseEnter = () => {
    if (!videoLoaded) {
      setVideoLoaded(true);
    }
  };

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-hero-gradient"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-green rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl font-orbitron font-black mb-6">
            <span className="hero-text">{landingPage.hero.heading}</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-orbitron font-bold mb-4">
            {/* <span className="hero-text">{landingPage.hero.subheading}</span> */}
          </h2>
          <p className="text-xl text-[rgb(160,160,160)] mb-8 max-w-2xl mx-auto">
            {landingPage.hero.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <Link to={landingPage.hero.buttonLink}>
            <Button
              className="btn-primary animate-glow-pulse text-lg px-8 py-4 group text-[rgb(13,13,13)] rounded-none"
              size="lg"
            >
              {landingPage.hero.buttonText}
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button
            className="bg-craft-panel text-white text-lg px-8 py-4 group rounded-none border-2 border-craft-accent"
            size="lg"
            onClick={handleOpen}
            onMouseEnter={handleMouseEnter}
          >
            <Play />
            Watch Demo
          </Button>
        </motion.div>
        <VideoDialog open={open} setOpen={setOpen} />
        {/* Stats */}
        {/* Enhanced Stats with improved visual hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl md:max-w-4xl mx-auto mt-16"
        >
          {[
            {
              label: "Active Coders",
              value: "50K+",
              icon: Users,
              color: "craft-accent",
            },
            {
              label: "Challenges",
              value: "2.5K+",
              icon: Target,
              color: "white",
            },
            {
              label: "Success Rate",
              value: "94%",
              icon: Zap,
              color: "craft-accent",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 rounded-xl text-center group hover:scale-105 transition-all duration-300 backdrop-blur-lg border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-center mb-3">
                <div
                  className={`p-3 rounded-full bg-${stat.color}/20 border border-${stat.color}/30`}
                >
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
              </div>
              <div
                className={`text-2xl md:text-3xl font-orbitron font-bold text-${stat.color} mb-1`}
              >
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {landingPage.hero.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-orbitron font-bold text-neon-green mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div> */}
      </div>
    </div>
  );
};

export default HeroBanner;
