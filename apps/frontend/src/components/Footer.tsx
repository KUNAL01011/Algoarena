import React from "react";
import { motion } from "motion/react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Code,
  Heart,
  Zap,
} from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const quickLinks = [
    { label: "Explore", href: "/" },
    { label: "Leaderboard", href: "#leaderboard" },
    { label: "Problems", href: "/problems" },
    { label: "Sheets", href: "/sheets" },
    { label: "Interview", href: "/interview" },
    { label: "Contests", href: "/contests" },
  ];

  const supportLinks = [
    { label: "Terms & Privacy", href: "/terms-privacy" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://x.com/Kunal_098", label: "Twitter" },
    { icon: Github, href: "https://github.com/KUNAL01011", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/kunal003/",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:kunal34255@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-[rgb(13, 13, 13)] p-2 border-t border-neon-green/20 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Empowering developers to master coding through interactive
              challenges and community-driven learning.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
              <span>for developers</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-neon-green transition-colors duration-200 relative inline-block group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-green transition-all duration-200 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-neon-green transition-colors duration-200 relative inline-block group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-green transition-all duration-200 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Connect
            </h4>
            <div className="flex gap-4 mb-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-secondary border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-neon-green hover:border-neon-green/50 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Follow us for updates, tips, and community highlights
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm text-muted-foreground">
            © 2025 AlgoArena. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              All systems operational
            </span>
            <span>Version 2.1.0</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
