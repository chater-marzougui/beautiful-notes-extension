import React, { useState } from 'react';
import type { Note } from '../types';
import { Sparkles, Trash2, Eye, Edit, Wand2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { transformDraft, suggestFileName } from '../services/gemini';
import './Editor.css';

interface EditorProps {
  note: Note | null;
  onUpdateNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  apiKey?: string;
}

export const Editor: React.FC<EditorProps> = ({ note, onUpdateNote, onDeleteNote, apiKey }) => {
  const [isPreview, setIsPreview] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [isSuggestingName, setIsSuggestingName] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!note) {
    return (
      <div className="editor-empty">
        <Edit size={48} />
        <h3>No note selected</h3>
        <p>Select a note from the sidebar or create a new one</p>
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
      setError(err instanceof Error ? err.message : 'Failed to transform draft');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsTransforming(false);
    }
  };

  const handleCheckboxToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' && target.getAttribute('type') === 'checkbox') {
      const checkbox = target as HTMLInputElement;
      const lines = note.content.split('\n');
      
      // Find which line contains this checkbox
      let checkboxIndex = 0;
      const lineIndex = lines.findIndex(line => {
        if (/- \[[ x]\]/i.test(line)) {
          if (checkboxIndex === Array.from(e.currentTarget.querySelectorAll('input[type="checkbox"]')).indexOf(checkbox)) {
            return true;
          }
          checkboxIndex++;
        }
        return false;
      });

      if (lineIndex !== -1) {
        const line = lines[lineIndex];
        const newLine = checkbox.checked
          ? line.replace(/- \[ \]/, '- [x]')
          : line.replace(/- \[x\]/i, '- [ ]');
        lines[lineIndex] = newLine;
        
        onUpdateNote({
          ...note,
          content: lines.join('\n'),
          updatedAt: Date.now(),
        });
      }
    }
  };

  return (
    <div className="editor">
      <div className="editor-header">
        <div className="editor-title-group">
          <input
            type="text"
            className="editor-title"
            placeholder="Untitled"
            value={note.title}
            onChange={handleTitleChange}
          />
          {(!note.title || note.title === '') && note.content && (
            <button
              className="btn-icon btn-suggest-name"
              onClick={handleSuggestFileName}
              disabled={isSuggestingName}
              title="Suggest filename with AI"
            >
              <Wand2 size={16} className={isSuggestingName ? 'spinning' : ''} />
            </button>
          )}
        </div>
        <div className="editor-actions">
          <button
            className={`btn-icon ${isPreview ? 'active' : ''}`}
            onClick={() => setIsPreview(!isPreview)}
            title={isPreview ? 'Edit' : 'Preview'}
          >
            {isPreview ? <Edit size={18} /> : <Eye size={18} />}
          </button>
          <button
            className="btn-icon"
            onClick={handleTransformDraft}
            disabled={isTransforming}
            title="Transform Draft with AI"
          >
            <Sparkles size={18} className={isTransforming ? 'spinning' : ''} />
          </button>
          <button
            className="btn-icon danger"
            onClick={() => onDeleteNote(note.id)}
            title="Delete Note"
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
          <div className="markdown-preview markdown-body" onClick={handleCheckboxToggle}>
            <ReactMarkdown>{note.content}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            className="editor-textarea"
            placeholder="Start typing... Use # for tags, - [ ] for checkboxes"
            value={note.content}
            onChange={handleContentChange}
          />
        )}
      </div>
    </div>
  );
};
