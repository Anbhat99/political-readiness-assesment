import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="flex gap-4 p-4">
      <button
        className={`px-4 py-2 rounded ${language === 'en' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        onClick={() => setLanguage('en')}
      >
        English
      </button>
      <button
        className={`px-4 py-2 rounded ${language === 'hi' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        onClick={() => setLanguage('hi')}
      >
        Hindi
      </button>
    </div>
  );
};

export default LanguageToggle;