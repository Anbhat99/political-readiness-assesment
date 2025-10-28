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

  const handleAnswer = (questionId, score) => {
    setResponses({ ...responses, [questionId]: score });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate capital scores (average of 2 questions per capital)
      const capitalScores = calculateScores(responses);
      navigate('/report', { state: { name, scores: capitalScores } });
    }
  };

  const calculateScores = (responses) => {
    const capitals = ['Intellectual', 'Political', 'Social', 'Financial', 'Network', 'Moral'];
    const scores = {};
    capitals.forEach((capital) => {
      const capitalQuestions = questions.filter((q) => q.capital === capital);
      const totalScore = capitalQuestions.reduce((sum, q) => sum + (responses[q.id] || 4), 0);
      scores[capital] = totalScore / capitalQuestions.length;
    });
    return scores;
  };

  const question = questions[currentQuestion];

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{t.header}</h1>
      <input
        type="text"
        placeholder={t.welcome}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />
      <h2 className="text-xl font-semibold mb-2">
        Question {currentQuestion + 1} of {questions.length}: {question.text}
      </h2>
      <div className="space-y-2">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            className="block w-full p-3 text-left bg-indigo-100 hover:bg-indigo-200 rounded"
            onClick={() => handleAnswer(question.id, option.score)}
          >
            {option.text}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Progress: {currentQuestion + 1}/{questions.length}
      </p>
    </div>
  );
};

export default QuestionForm;