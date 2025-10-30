import { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const QuestionForm = () => {
  const { t } = useContext(LanguageContext);
  const questions = t.questions;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // Functional update to avoid stale state
  const handleAnswer = (questionId, score) => {
    setResponses(prev => {
      const updated = { ...prev, [questionId]: score };
      return updated;
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goNext = () => {
    const q = questions[currentQuestion];
    if (responses[q.id] !== undefined && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const submitQuiz = () => {
    const allAnswered = questions.every(q => responses[q.id] !== undefined);
    if (allAnswered) {
      const scores = calculateScores(responses);
      navigate('/report', { state: { name: name.trim() || 'User', scores } });
    }
  };

  // REVERSED SCORING: Top = 4, Bottom = 1 (flipped end result)
  const calculateScores = (responses) => {
    const capitals = ['Intellectual', 'Political', 'Social', 'Financial', 'Network', 'Moral'];
    const scores = {};

    capitals.forEach(capital => {
      const qs = questions.filter(q => q.capital === capital);
      let total = 0;
      let count = 0;

      qs.forEach(q => {
        const s = responses[q.id];
        if (s !== undefined) {
          total += (5 - s); // ← REVERSE: 1→4, 2→3, 3→2, 4→1
          count++;
        }
      });

      scores[capital] = count > 0 ? (total / count).toFixed(2) : '0.00';
    });

    return scores;
  };

  const question = questions[currentQuestion];
  const isAnswered = responses[question.id] !== undefined;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">{t.header}</h1>

      <input
        type="text"
        placeholder={t.welcome}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-8 text-lg focus:ring-2 focus:ring-indigo-500"
      />

      <div className="bg-white p-6 rounded-xl shadow-md border">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Question {currentQuestion + 1} of {questions.length}
        </h2>
        <p className="text-lg mb-6 text-gray-700">{question.text}</p>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const selected = responses[question.id] === option.score;
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(question.id, option.score)}
                className={`w-full p-4 text-left border-2 rounded-lg transition-all text-base font-medium
                  ${selected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-gray-800'
                  }`}
              >
                {option.text}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <p className="text-sm text-gray-600 font-medium">
            Answered: {Object.keys(responses).length} / {questions.length}
          </p>

          <div className="space-x-2">
            {currentQuestion > 0 && (
              <button
                onClick={goBack}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium"
              >
                Back
              </button>
            )}

            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={goNext}
                disabled={!isAnswered}
                className={`px-5 py-2 rounded-lg text-sm font-medium
                  ${isAnswered
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Next
              </button>
            ) : (
              <button
                onClick={submitQuiz}
                disabled={!isAnswered}
                className={`px-6 py-2 rounded-lg font-medium
                  ${isAnswered
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Submit
              </button>
            )}
          </div>
        </div>

        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(Object.keys(responses).length / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
