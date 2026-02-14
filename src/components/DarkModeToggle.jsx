import { useDarkMode } from '../context/DarkModeContext';
import { Moon, Sun } from 'lucide-react';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <button
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <div className="toggle-track">
                <div className={`toggle-thumb ${isDarkMode ? 'dark' : 'light'}`}>
                    {isDarkMode ? (
                        <Moon size={14} className="toggle-icon" />
                    ) : (
                        <Sun size={14} className="toggle-icon" />
                    )}
                </div>
            </div>
        </button>
    );
};

export default DarkModeToggle;
