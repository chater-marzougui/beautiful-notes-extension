import React from 'react';
import type { Note, Language } from '../types';
import { translations } from '../i18n';
import { Plus, Settings as SettingsIcon, ChevronLeft, Search, HelpCircle, StickyNote, Lightbulb, Calendar } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
    notes: Note[];
    selectedNoteId: string | null;
    onSelectNote: (id: string) => void;
    onNewNote: () => void;
    onOpenSettings: () => void;
    onOpenHelp: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    language: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({
    notes,
    selectedNoteId,
    onSelectNote,
    onNewNote,
    onOpenSettings,
    onOpenHelp,
    searchQuery,
    onSearchChange,
    isCollapsed,
    onToggleCollapse,
    language,
}) => {
    const t = translations[language].sidebar;

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
                <img className="profile-icon" src="icon128.png" alt="Profile" />
                {!isCollapsed && (
                    <div className="header-info">
                        <h2>{t.myNotes}</h2>
                    </div>
                )}
            </div>

            <div className="search-box">
                <Search size={18} />
                {!isCollapsed && (
                    <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                )}
            </div>

            <div className="notes-list">
                {filteredNotes.length === 0 && !isCollapsed ? (
                    <div className="empty-state">
                        <p>{t.emptyState}</p>
                    </div>
                ) : (
                    filteredNotes.map((note) => {
                        const Icon = getNoteIcon(note.content);
                        return (
                            <div
                                key={note.id}
                                className={`note-item ${selectedNoteId === note.id ? 'active' : ''}`}
                                onClick={() => onSelectNote(note.id)}
                                title={isCollapsed ? note.title || t.newNote.replace('New', 'Untitled') : undefined}
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
                    title={t.newNote}
                >
                    {isCollapsed ? <Plus size={24} /> : t.newNote}
                </button>

                <div className="sidebar-menu">
                    <button className="menu-item" onClick={onOpenSettings} title={t.settings}>
                        <SettingsIcon size={20} />
                        {!isCollapsed && <span>{t.settings}</span>}
                    </button>
                    <button className="menu-item" onClick={onOpenHelp} title={t.help}>
                        <HelpCircle size={20} />
                        {!isCollapsed && <span>{t.help}</span>}
                    </button>
                </div>
            </div>
        </div>
    );
};
