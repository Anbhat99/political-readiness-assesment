import { useLocation } from 'react-router-dom';
import RadarChartComponent from './RadarChart';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const Report = () => {
  const { t } = useContext(LanguageContext);
  const { state } = useLocation();

  // FULL SAFETY CHECK
  if (!state || !state.name || !state.scores || typeof state.scores !== 'object') {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center text-red-600">
        <h2 className="text-2xl font-bold mb-2">Error: No Report Data</h2>
        <p>Please complete the quiz first.</p>
      </div>
    );
  }

  const { name, scores } = state;

  // Reverse scores: 1 → 4, 4 → 1
  const reversedScores = Object.fromEntries(
    Object.entries(scores).map(([key, value]) => {
      const num = parseFloat(value);
      return [key, isNaN(num) ? 0 : 5 - num];
    })
  );

  // Safe average calculation
  const avgScore =
    Object.values(reversedScores).reduce((sum, score) => sum + score, 0) / 6;

  const getInterpretation = (avg) => {
    if (avg >= 3.5) return t.interpretations?.emerging_leader || 'Emerging Leader';
    if (avg >= 2.5) return t.interpretations?.developing_stage || 'Developing Stage';
    return t.interpretations?.needs_improvement || 'Needs Improvement';
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">{t.header}</h1>
      <h2 className="text-xl font-semibold mb-4">
        Report for <span className="text-indigo-600">{name}</span>
      </h2>

      {/* Radar Chart */}
      <div className="my-8">
        <RadarChartComponent scores={reversedScores} />
      </div>

      {/* Score Summary */}
      <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Score Summary (Higher = Better)
        </h3>
        <ul className="space-y-2">
          {Object.entries(reversedScores).map(([capital, score]) => (
            <li key={capital} className="flex justify-between">
              <span className="font-medium text-gray-700">{capital}:</span>
              <span className="font-mono text-indigo-600">
                {score.toFixed(2)} / 4.0
              </span>
            </li>
          ))}
        </ul>

        {/* Average & Interpretation */}
        <div className="mt-5 pt-4 border-t border-gray-200">
          <p className="text-lg font-bold">
            Average Score:{' '}
            <span className="text-indigo-600">{avgScore.toFixed(2)}</span> / 4.0
          </p>
          <p className="mt-2 text-lg">
            <strong>Interpretation:</strong>{' '}
            <span className="text-green-600 font-medium">
              {getInterpretation(avgScore)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Report;
