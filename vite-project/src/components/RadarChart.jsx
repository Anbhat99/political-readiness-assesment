import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const RadarChartComponent = ({ scores }) => {
  // Prepare data for Recharts
  const data = [
    { capital: 'Intellectual', score: 5 - scores['Intellectual'] },
    { capital: 'Political', score: 5 - scores['Political'] },
    { capital: 'Social', score: 5 - scores['Social'] },
    { capital: 'Financial', score: 5 - scores['Financial'] },
    { capital: 'Network', score: 5 - scores['Network'] },
    { capital: 'Moral', score: 5 - scores['Moral'] },
  ];

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid gridType="polygon" stroke="#e0e7ff" />
          <PolarAngleAxis
            dataKey="capital"
            tick={{ fill: '#1f2937', fontFamily: "'Inter', sans-serif", fontSize: 14 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 4]}
            tick={{ fill: '#1f2937', fontFamily: "'Inter', sans-serif", fontSize: 12 }}
            tickFormatter={(value) => 5 - value} // Invert for display
          />
          <Radar
            name="Political Readiness"
            dataKey="score"
            stroke="#4f46e5"
            fill="rgba(79, 70, 229, 0.2)"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;