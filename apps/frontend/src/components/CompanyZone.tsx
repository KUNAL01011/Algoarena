import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const companies = [
  {
    name: "Google",
    logo: "https://ynxir50uoi.ufs.sh/f/k9OWiEDGjYKIE2t2vQSzPMARQk8Srayv6U9YjqfsKTWt43I7",
    challenges: 156,
    avgTime: "32 min",
    solveRate: 68,
    color: "#4285f4",
  },
  {
    name: "Amazon",
    logo: "https://www.vectorlogo.zone/logos/amazon/amazon-tile.svg",
    challenges: 203,
    avgTime: "28 min",
    solveRate: 72,
    color: "#ff9900",
  },
  {
    name: "Meta",
    logo: "https://ynxir50uoi.ufs.sh/f/k9OWiEDGjYKIqitDgDnizyklb7YQnI8qtUjRNuOop0HPFgh5",
    challenges: 134,
    avgTime: "35 min",
    solveRate: 65,
    color: "#1877f2",
  },
  {
    name: "Apple",
    logo: "https://ynxir50uoi.ufs.sh/f/k9OWiEDGjYKIZ5x7JTr0CxpoStX7PY5UhKa4e3HIj8AiuLbV",
    challenges: 89,
    avgTime: "30 min",
    solveRate: 70,
    color: "#007aff",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Microsoft_icon.svg/250px-Microsoft_icon.svg.png",
    challenges: 167,
    avgTime: "29 min",
    solveRate: 74,
    color: "#00bcf2",
  },
  {
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2015_N_logo.svg/1280px-Netflix_2015_N_logo.svg.png",
    challenges: 76,
    avgTime: "38 min",
    solveRate: 62,
    color: "#e50914",
  },
];

const CompanyZone = () => {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const navigate = useNavigate();
  const handlerClickTag = (tagName: string) => {
    navigate(`/problems?companyTag=${tagName}`);
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {(companies || []).map((company, index) => (
        <motion.div
          key={company.name}
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          onHoverStart={() => setHoveredCompany(company.name)}
          onHoverEnd={() => setHoveredCompany(null)}
        >
          <motion.div
            className="topic-card text-center group cursor-pointer"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlerClickTag(company.name)}
          >
            <div
              className="company-logo mx-auto mb-3 font-bold transition-all duration-300 group-hover:shadow-neon"
              style={{ color: company.color }}
            >
              <img src={company.logo} alt="google" className="w-5 h-5"/>
            </div>
            <h3 className="font-semibold text-sm mb-2 group-hover:text-neon-green text-neon-green transition-colors">
              {company.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {company.challenges} challenges
            </p>
          </motion.div>

          {/* Hover Stats Popup */}
          {/* <AnimatePresence>
            {hoveredCompany === company.name && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50"
              >
                <div className="glass-card p-4 rounded-lg shadow-xl min-w-48">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Avg Time
                      </span>
                      <span className="text-sm font-medium text-neon-green">
                        {company.avgTime}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Solve Rate
                      </span>
                      <span className="text-sm font-medium text-neon-green">
                        {company.solveRate}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <motion.div
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${company.solveRate}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                    <Button size="sm" className="w-full btn-primary text-xs">
                      Solve Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence> */}
        </motion.div>
      ))}
    </div>
  );
};

export default CompanyZone;
