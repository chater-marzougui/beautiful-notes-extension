import { useState, useEffect } from 'react';
import type { Note, AppSettings } from './types';
import { storage } from './services/storage';
import { Sidebar } from './components/Sidebar';
import { Editor } from './components/Editor';
import { Settings } from './components/Settings';
import { Help } from './components/Help';
import './App.css';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [settings, setSettings] = useState<AppSettings>({});
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedNotes = await storage.getNotes();
        const loadedSettings = await storage.getSettings();
        setNotes(loadedNotes);
        setSettings(loadedSettings);

        // Apply theme from settings or default to 'midnight'
        const theme = loadedSettings.theme || 'midnight';
        document.body.setAttribute('data-theme', theme);

        // Select first note if available
        if (loadedNotes.length > 0 && !selectedNoteId) {
          setSelectedNoteId(loadedNotes[0].id);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: '',
      content: '',
      tags: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    setSelectedNoteId(newNote.id);
    storage.saveNotes(updatedNotes);
  };

  const handleUpdateNote = (updatedNote: Note) => {
    const updatedNotes = notes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    storage.debouncedSave(updatedNotes);
  };

  const handleDeleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    storage.saveNotes(updatedNotes);

    // Select another note if the deleted one was selected
    if (selectedNoteId === id) {
      setSelectedNoteId(updatedNotes.length > 0 ? updatedNotes[0].id : null);
    }
  };

  const handleSaveSettings = async (newSettings: AppSettings) => {
    setSettings(newSettings);
    // Apply new theme immediately
    if (newSettings.theme) {
      document.body.setAttribute('data-theme', newSettings.theme);
    }
    await storage.saveSettings(newSettings);
  };

  // Default language to 'en' if not set
  const currentLanguage = settings.language || 'en';

  const selectedNote = notes.find(note => note.id === selectedNoteId) || null;

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={setSelectedNoteId}
        onNewNote={handleNewNote}
        onOpenSettings={() => setShowSettings(true)}
        onOpenHelp={() => setShowHelp(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        language={currentLanguage}
      />
      <Editor
        note={selectedNote}
        onUpdateNote={handleUpdateNote}
        onDeleteNote={handleDeleteNote}
        apiKey={settings.geminiApiKey}
        language={currentLanguage}
      />
      {showSettings && (
        <Settings
          settings={settings}
          onSave={handleSaveSettings}
          onClose={() => setShowSettings(false)}
          language={currentLanguage}
        />
      )}
      {showHelp && (
        <Help
          onClose={() => setShowHelp(false)}
          language={currentLanguage}
        />
      )}
    </div>
  );
}

export default App;
