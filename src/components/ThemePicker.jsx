import { useState } from 'react';

export default function ThemePicker() {
  const themes = ['linear', 'radial', 'conic'];
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  function setTheme(theme) {
    setCurrentTheme(theme);
    document.body.setAttribute('theme', theme);
  }

  return (
    <fieldset className="theme-picker">
      <legend>Theme</legend>
      <div>
        {themes.map((theme, idx) => (
          <span key={theme}>
            <input
              type="radio"
              id={`theme${idx}`}
              name={theme}
              value={theme}
              onChange={() => setTheme(theme)}
              checked={currentTheme === theme}
            />
            <label htmlFor={`theme${idx}`}>{theme}</label>
          </span>
        ))}
      </div>
    </fieldset>
  );
}
