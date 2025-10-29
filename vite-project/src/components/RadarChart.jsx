import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const RadarChartComponent = ({ scores }) => {
  // Guard: if scores missing or invalid
  if (!scores || typeof scores !== 'object') {
    return (
      <div className="w-full h-96 flex items-center justify-center text-gray-500">
        No data available for chart.
      </div>
    );
  }

  // Convert scores to numbers safely
  const data = [
    { capital: 'Intellectual', score: parseFloat(scores['Intellectual']) || 0 },
    { capital: 'Political',    score: parseFloat(scores['Political']) || 0 },
    { capital: 'Social',       score: parseFloat(scores['Social']) || 0 },
    { capital: 'Financial',    score: parseFloat(scores['Financial']) || 0 },
    { capital: 'Network',      score: parseFloat(scores['Network']) || 0 },
    { capital: 'Moral',        score: parseFloat(scores['Moral']) || 0 },
  ];

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid stroke="#e0e7ff" strokeWidth={1} />
          <PolarAngleAxis
            dataKey="capital"
            tick={{ fill: '#1f2937', fontSize: 14, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 4]}
            tickCount={5}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <Radar
            name="Readiness"
            dataKey="score"
            stroke="#4f46e5"
            fill="#4f46e5"
            fillOpacity={0.6}
            dot={{ r: 5, fill: '#4f46e5', strokeWidth: 2 }}
            animationDuration={800}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;
