import React, { useState } from 'react';
import type { AppSettings } from '../types';
import { X, Save, Key } from 'lucide-react';
import './Settings.css';

interface SettingsProps {
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ settings, onSave, onClose }) => {
  const [apiKey, setApiKey] = useState(settings.geminiApiKey || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave({ geminiApiKey: apiKey });
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
          <h2>Settings</h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <div className="settings-section-header">
              <Key size={18} />
              <h3>Google Gemini API Key</h3>
            </div>
            <p className="settings-description">
              Enter your Google Gemini API key to enable the "Transform Draft" feature.
              Get your API key from{' '}
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google AI Studio
              </a>
            </p>
            <input
              type="password"
              placeholder="Enter your API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="settings-input"
            />
          </div>
        </div>

        <div className="settings-footer">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            <Save size={16} />
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};
