import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const Header = () => {
  const { t } = useContext(LanguageContext);

  return (
    <header className="header">
      <h1 className="text-2xl font-bold">{t.header}</h1>
    </header>
  );
};

export default Header;