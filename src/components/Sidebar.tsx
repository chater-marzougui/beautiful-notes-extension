import React from 'react';
import type { Note } from '../types';
import { Plus, Settings as SettingsIcon, ChevronLeft, Search, HelpCircle, StickyNote, Lightbulb, Calendar } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
  onNewNote: () => void;
  onOpenSettings: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  notes,
  selectedNoteId,
  onSelectNote,
  onNewNote,
  onOpenSettings,
  searchQuery,
  onSearchChange,
  isCollapsed,
  onToggleCollapse,
}) => {
  // Filter notes based on search
  const filteredNotes = React.useMemo(() => {
    if (!searchQuery) return notes;
    const query = searchQuery.toLowerCase();
    return notes.filter(note =>
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [notes, searchQuery]);

  const getNoteIcon = (content: string) => {
    if (content.includes('#idea')) return Lightbulb;
    if (content.includes('- [ ]')) return Calendar;
    return StickyNote;
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button 
        className="sidebar-toggle" 
        onClick={onToggleCollapse}
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <ChevronLeft size={16} />
      </button>

      <div className="sidebar-header">
        <div className="profile-icon">
          <span>MN</span>
        </div>
        {!isCollapsed && (
          <div className="header-info">
            <h2>My Notes</h2>
            <span className="subtitle">local user</span>
          </div>
        )}
      </div>

      <div className="search-box">
        <Search size={18} />
        {!isCollapsed && (
          <input
            type="text"
            placeholder="Find a note..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        )}
      </div>

      <div className="notes-list">
        {filteredNotes.length === 0 && !isCollapsed ? (
          <div className="empty-state">
            <p>No notes found</p>
          </div>
        ) : (
          filteredNotes.map((note) => {
            const Icon = getNoteIcon(note.content);
            return (
              <div
                key={note.id}
                className={`note-item ${selectedNoteId === note.id ? 'active' : ''}`}
                onClick={() => onSelectNote(note.id)}
                title={isCollapsed ? note.title || 'Untitled' : undefined}
              >
                <div className="note-icon-box">
                  <Icon size={isCollapsed ? 20 : 24} />
                </div>
                {!isCollapsed && (
                  <div className="note-info">
                    <div className="note-title">{note.title || 'Untitled'}</div>
                    <div className="note-preview">
                      {note.content.substring(0, 40) || 'No content...'}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="sidebar-bottom">
        <button 
          className={`btn-new-note ${isCollapsed ? 'icon-only' : ''}`} 
          onClick={onNewNote}
          title="New Note"
        >
          {isCollapsed ? <Plus size={24} /> : 'New Note'}
        </button>

        <div className="sidebar-menu">
          <button className="menu-item" onClick={onOpenSettings} title="Settings">
            <SettingsIcon size={20} />
            {!isCollapsed && <span>Settings</span>}
          </button>
          <button className="menu-item" title="Help">
            <HelpCircle size={20} />
            {!isCollapsed && <span>Help</span>}
          </button>
        </div>
      </div>
    </div>
  );
};
