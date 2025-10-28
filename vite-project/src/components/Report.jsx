import { useLocation } from 'react-router-dom';
import RadarChartComponent from './RadarChart';
import { generatePDF } from '../utils/pdfGenerator';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const Report = () => {
  const { t } = useContext(LanguageContext);
  const { state } = useLocation();
  const { name, scores } = state;

  const getInterpretation = (avgScore) => {
    if (avgScore <= 1.5) return t.interpretations.emerging_leader;
    if (avgScore <= 2.5) return t.interpretations.developing_stage;
    return t.interpretations.needs_improvement;
  };

  const avgScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / 6;

  return (
    <div id="report-section" className="p-4 max-w-2xl mx-auto bg-white">
      <h1 className="text-2xl font-bold mb-4">{t.header}</h1>
      <h2 className="text-xl font-semibold">Political Readiness Report for {name}</h2>
      <div className="my-6">
        <RadarChartComponent scores={scores} />
      </div>
      <h3 className="text-lg font-medium">Score Summary</h3>
      <ul className="my-2">
        {Object.entries(scores).map(([capital, score]) => (
          <li key={capital}>
            {capital}: {score.toFixed(2)}
          </li>
        ))}
      </ul>
      <p className="my-2">Average Score: {avgScore.toFixed(2)}</p>
      <p className="my-2">Interpretation: {getInterpretation(avgScore)}</p>
      <button
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        onClick={() => generatePDF(name, scores)}
      >
        Download PDF Report
      </button>
    </div>
  );
};

export default Report;