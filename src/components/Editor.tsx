import React, { useState, useEffect } from 'react';
import type { Note, Language } from '../types';
import { translations } from '../i18n';
import { Sparkles, Trash2, Eye, Edit, Wand2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { transformDraft, suggestFileName } from '../services/gemini';
import './Editor.css';

interface EditorProps {
  note: Note | null;
  onUpdateNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  apiKey?: string;
  language: Language;
}

export const Editor: React.FC<EditorProps> = ({ note, onUpdateNote, onDeleteNote, apiKey, language }) => {
  const [isPreview, setIsPreview] = useState(note?.content ? true : false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [isSuggestingName, setIsSuggestingName] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[language].editor;

  // Update preview mode when switching notes
  useEffect(() => {
    setIsPreview(note?.content ? true : false);
  }, [note?.id]);

  if (!note) {
    return (
      <div className="editor-empty">
        <Edit size={48} />
        <h3>{t.emptyStateTitle}</h3>
        <p>{t.emptyStateText}</p>
      </div>
    );
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;

    // Extract tags from content
    const tagMatches = newContent.match(/#(\w+)/g) || [];
    const tags = tagMatches.map(tag => tag.substring(1));

    onUpdateNote({
      ...note,
      content: newContent,
      tags: Array.from(new Set(tags)),
      updatedAt: Date.now(),
    });
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Shift+Enter to enable preview mode
    if (e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      setIsPreview(true);
    }
    // Ctrl+Shift+V to enable preview mode
    if (e.ctrlKey && e.shiftKey && e.key === 'v') {
      e.preventDefault();
      setIsPreview(true);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateNote({
      ...note,
      title: e.target.value,
      updatedAt: Date.now(),
    });
  };

  const handleSuggestFileName = async () => {
    if (!apiKey) {
      setError('Please set your Google API Key in Settings first');
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (!note.content.trim()) {
      setError('Add some content first to generate a filename');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsSuggestingName(true);
    setError(null);

    try {
      const suggestedName = await suggestFileName(note.content, apiKey);

      onUpdateNote({
        ...note,
        title: suggestedName,
        updatedAt: Date.now(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to suggest filename');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsSuggestingName(false);
    }
  };

  const handleTransformDraft = async () => {
    if (!apiKey) {
      setError('Please set your Google API Key in Settings first');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsTransforming(true);
    setError(null);

    try {
      const transformed = await transformDraft(note.content, apiKey);

      // Extract tags from transformed content
      const tagMatches = transformed.match(/#(\w+)/g) || [];
      const tags = tagMatches.map(tag => tag.substring(1));

      // Auto-suggest filename if title is empty
      let newTitle = note.title;
      if (!note.title || note.title === '') {
        try {
          newTitle = await suggestFileName(transformed, apiKey);
        } catch (err) {
          // If filename suggestion fails, just keep empty title
          console.error('Failed to suggest filename:', err);
        }
      }

      onUpdateNote({
        ...note,
        title: newTitle,
        content: transformed,
        tags: Array.from(new Set(tags)),
        updatedAt: Date.now(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : t.error);
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsTransforming(false);
    }
  };

  const handleCheckboxChange = (checked: boolean, index: number) => {
    const lines = note.content.split('\n');

    let checkboxCount = 0;
    const lineIndex = lines.findIndex(line => {
      if (/- \[[ x]\]/i.test(line)) {
        if (checkboxCount === index) {
          return true;
        }
        checkboxCount++;
      }
      return false;
    });

    if (lineIndex !== -1) {
      const line = lines[lineIndex];
      const newLine = checked
        ? line.replace(/- \[ \]/, '- [x]')
        : line.replace(/- \[x\]/i, '- [ ]');
      lines[lineIndex] = newLine;

      onUpdateNote({
        ...note,
        content: lines.join('\n'),
        updatedAt: Date.now(),
      });
    }
  };

  return (
    <div className="editor">
      <div className="editor-header">
        <div className="editor-title-group">
          <input
            type="text"
            className="editor-title"
            placeholder={t.untitled}
            value={note.title}
            onChange={handleTitleChange}
          />
          {(!note.title || note.title === '') && note.content && (
            <button
              className="btn-icon btn-suggest-name"
              onClick={handleSuggestFileName}
              disabled={isSuggestingName}
              title={t.tooltips.suggest}
            >
              <Wand2 size={16} className={isSuggestingName ? 'spinning' : ''} />
            </button>
          )}
        </div>
        <div className="editor-actions">
          <button
            className={`btn-icon ${isPreview ? 'active' : ''}`}
            onClick={() => setIsPreview(!isPreview)}
            title={isPreview ? t.tooltips.edit : t.tooltips.preview}
          >
            {isPreview ? <Edit size={18} /> : <Eye size={18} />}
          </button>
          <button
            className="btn-icon"
            onClick={handleTransformDraft}
            disabled={isTransforming}
            title={t.tooltips.transform}
          >
            <Sparkles size={18} className={isTransforming ? 'spinning' : ''} />
          </button>
          <button
            className="btn-icon danger"
            onClick={() => onDeleteNote(note.id)}
            title={t.tooltips.delete}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {error && (
        <div className="editor-error">
          {error}
        </div>
      )}

      <div className="editor-content">
        {isPreview ? (
          <div className="markdown-preview markdown-body" onDoubleClick={() => setIsPreview(!isPreview)}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                input: (props: any) => {
                  if (props.type === 'checkbox') {
                    // Use a closure to capture the current index
                    const currentIndex = (window as any).__checkboxIndex || 0;
                    (window as any).__checkboxIndex = currentIndex + 1;

                    return (
                      <input
                        type="checkbox"
                        checked={props.checked}
                        onChange={(e) => {
                          (window as any).__checkboxIndex = 0; // Reset for next render
                          handleCheckboxChange(e.target.checked, currentIndex);
                        }}
                      />
                    );
                  }
                  return <input {...props} />;
                }
              }}
            >
              {(() => {
                (window as any).__checkboxIndex = 0; // Reset counter before render
                return note.content;
              })()}
            </ReactMarkdown>
          </div>
        ) : (
          <textarea
            className="editor-textarea"
            placeholder={t.placeholder}
            value={note.content}
            onChange={handleContentChange}
            onKeyDown={handleTextareaKeyDown}
          />
        )}
      </div>
    </div>
  );
};
