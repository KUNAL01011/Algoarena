
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ResponseTimeChartProps {
  questions: Array<{
    question: string;
    answer: string;
    duration: number;
  }>;
}

const ResponseTimeChart = ({ questions }: ResponseTimeChartProps) => {
  const data = questions.map((q, index) => ({
    question: `Q${index + 1}`,
    duration: q.duration,
    words: q.answer?.split(' ').filter(w => w.length > 0).length || 0
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-craft-text-primary mb-4">Response Analysis</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="question" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                name === 'duration' ? `${value}s` : `${value} words`,
                name === 'duration' ? 'Response Time' : 'Word Count'
              ]}
            />
            <Bar dataKey="duration" fill="#3b82f6" name="duration" />
            <Bar dataKey="words" fill="#10b981" name="words" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ResponseTimeChart;