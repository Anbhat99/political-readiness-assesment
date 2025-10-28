import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LanguageToggle from './components/LanguageToggle';
import QuestionForm from './components/QuestionForm';
import Report from './components/Report';
import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <LanguageToggle />
        <Routes>
          <Route path="/" element={<QuestionForm />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;