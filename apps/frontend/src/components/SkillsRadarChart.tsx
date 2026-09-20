
import { Card } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface SkillsRadarChartProps {
  skills: {
    communication: number;
    confidence: number;
    clarity: number;
    structure: number;
    enthusiasm: number;
    technicalKnowledge: number;
  };
}

const SkillsRadarChart = ({ skills }: SkillsRadarChartProps) => {
  const data = [
    { skill: 'Communication', value: skills.communication },
    { skill: 'Confidence', value: skills.confidence },
    { skill: 'Clarity', value: skills.clarity },
    { skill: 'Structure', value: skills.structure },
    { skill: 'Enthusiasm', value: skills.enthusiasm },
    { skill: 'Technical', value: skills.technicalKnowledge },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-craft-text-primary mb-4">Skills Assessment</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" className="text-sm" />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              className="text-xs"
            />
            <Radar
              name="Skills"
              dataKey="value"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SkillsRadarChart;