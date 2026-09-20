
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  badge?: string;
  icon?: React.ReactNode;
  glowColor?: string;
}

const StatsCard = ({ title, value, subtitle, badge, icon, glowColor = 'craft-accent' }: StatsCardProps) => {
  return (
    <Card className="bg-craft-panel border-craft-border hover:border-craft-accent/30 transition-all duration-300 group relative overflow-hidden">
      {/* Subtle glow effect on hover */}
      <div className={`absolute inset-0 bg-${glowColor}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      <div className="p-6 relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-craft-text-secondary text-sm font-medium">{title}</span>
          {icon && (
            <div className={`text-${glowColor}`}>
              {icon}
            </div>
          )}
        </div>
        
        <div className="flex items-end space-x-2 mb-2">
          <span className="text-3xl font-bold text-craft-text-primary">{value}</span>
          {badge && (
            <Badge className={`bg-${glowColor}/20 text-${glowColor} border-${glowColor}/30 mb-1`}>
              {badge}
            </Badge>
          )}
        </div>
        
        {subtitle && (
          <p className="text-craft-text-secondary text-sm">{subtitle}</p>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;
