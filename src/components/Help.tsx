import React from 'react';
import type { Language } from '../types';
import { translations } from '../i18n';
import { X, Github, Mail, AlertCircle } from 'lucide-react';
import './Help.css';

interface HelpProps {
    onClose: () => void;
    language: Language;
}

export const Help: React.FC<HelpProps> = ({ onClose, language }) => {
    const t = translations[language].help;

    return (
        <div className="help-overlay">
            <div className="help-modal">
                <div className="help-header">
                    <h2>{t.title}</h2>
                    <button className="btn-icon" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="help-content">
                    <div className="help-section">
                        <h3>{t.about}</h3>
                        <a href="https://github.com/chater-marzougui" target="_blank" rel="noopener noreferrer" className="help-description">
                            {t.madeBy} <strong>Chater Marzougui</strong>
                        </a>
                        <p className="help-description">
                            {t.description}
                        </p>
                    </div>

                    <div className="help-section">
                        <div className="help-section-header">
                            <Github size={18} />
                            <h3>{t.repository}</h3>
                        </div>
                        <p className="help-description">
                            {t.repoText}
                        </p>
                        <a
                            href="https://github.com/chater-marzougui/beautiful-notes-extension"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="help-link"
                        >
                            github.com/chater-marzougui/beautiful-notes-extension
                        </a>
                    </div>

                    <div className="help-section">
                        <div className="help-section-header">
                            <AlertCircle size={18} />
                            <h3>{t.issues}</h3>
                        </div>
                        <p className="help-description">
                            {t.issuesText}
                        </p>
                        <ol className="help-list">
                            <li>{t.step1}</li>
                            <li>{t.step2}</li>
                            <li>{t.step3}</li>
                            <li>{t.step4}</li>
                        </ol>
                        <a
                            href="https://github.com/chater-marzougui/beautiful-notes-extension/issues/new"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="help-link-button"
                        >
                            {t.createIssue}
                        </a>
                    </div>

                    <div className="help-section">
                        <div className="help-section-header">
                            <Mail size={18} />
                            <h3>{t.contact}</h3>
                        </div>
                        <p className="help-description">
                            {t.contactText}
                        </p>
                    </div>
                </div>

                <div className="help-footer">
                    <button className="btn-primary close-btn" onClick={onClose}>
                        {t.close}
                    </button>
                </div>
            </div>
        </div>
    );
};
