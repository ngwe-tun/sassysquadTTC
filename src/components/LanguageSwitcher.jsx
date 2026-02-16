import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'my', name: 'မြန်မာ', flag: '🇲🇲' },
        { code: 'th', name: 'ไทย', flag: '🇹🇭' }
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const changeLanguage = (langCode) => {
        i18n.changeLanguage(langCode);
    };

    return (
        <div className="language-switcher">
            <button className="language-toggle" aria-label="Change language">
                <Globe size={20} />
                <span className="current-lang">{currentLanguage.flag}</span>
            </button>
            <div className="language-dropdown">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        className={`language-option ${i18n.language === lang.code ? 'active' : ''}`}
                        onClick={() => changeLanguage(lang.code)}
                    >
                        <span className="lang-flag">{lang.flag}</span>
                        <span className="lang-name">{lang.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSwitcher;
