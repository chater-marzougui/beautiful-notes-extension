import React, { useState } from 'react';
import type { AppSettings, Language, Theme } from '../types';
import { translations } from '../i18n';
import { X, Save, Key } from 'lucide-react';
import './Settings.css';

interface SettingsProps {
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
  onClose: () => void;
  language: Language;
}

export const Settings: React.FC<SettingsProps> = ({ settings, onSave, onClose, language }) => {
  const [apiKey, setApiKey] = useState(settings.geminiApiKey || '');
  const [theme, setTheme] = useState<Theme>(settings.theme || 'midnight');
  const [lang, setLang] = useState<Language>(settings.language || 'en');
  const [saved, setSaved] = useState(false);

  const t = translations[language].settings;

  const handleSave = () => {
    onSave({
      geminiApiKey: apiKey,
      theme,
      language: lang
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <div className="settings-header">
          <h2>{t.title}</h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <div className="settings-section-header">
              <Key size={18} />
              <h3>{t.geminiApiKey}</h3>
            </div>
            <p className="settings-description">
              {t.apiKeyHelp}
            </p>
            <input
              type="password"
              placeholder="API Key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="settings-input"
            />
          </div>

          <div className="settings-theme">
            <div className="settings-section">
              <div className="settings-section-header">
                <h3>{t.language}</h3>
              </div>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="settings-input"
              >
                <option value="en">{t.languageOptions.en}</option>
                <option value="fr">{t.languageOptions.fr}</option>
                <option value="ar">{t.languageOptions.ar}</option>
                <option value="es">{t.languageOptions.es}</option>
              </select>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <h3>{t.theme}</h3>
              </div>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as Theme)}
                className="settings-input"
              >
                <option value="midnight">{t.themeOptions.midnight}</option>
                <option value="dark">{t.themeOptions.dark}</option>
                <option value="light">{t.themeOptions.light}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <button className="btn" onClick={onClose}>
            {t.cancel}
          </button>
          <button className="btn-primary btn-with-icon" onClick={handleSave}>
            <Save size={16} />
            {saved ? 'Saved!' : t.save}
          </button>
        </div>
      </div>
    </div>
  );
};
