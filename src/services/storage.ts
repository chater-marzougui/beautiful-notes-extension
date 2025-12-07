import type { Note, AppSettings, StorageData } from '../types';

const STORAGE_KEY = 'smart_notes_data';

class StorageService {
  private saveTimeout: number | null = null;

  async getData(): Promise<StorageData> {
    return new Promise((resolve) => {
      chrome.storage.local.get([STORAGE_KEY], (result: { [key: string]: StorageData }) => {
        const data = result[STORAGE_KEY] || {
          notes: [],
          settings: {},
        };
        resolve(data);
      });
    });
  }

  async saveData(data: StorageData): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [STORAGE_KEY]: data }, () => {
        resolve();
      });
    });
  }

  async getNotes(): Promise<Note[]> {
    const data = await this.getData();
    return data.notes;
  }

  async saveNotes(notes: Note[]): Promise<void> {
    const data = await this.getData();
    data.notes = notes;
    await this.saveData(data);
  }

  async getSettings(): Promise<AppSettings> {
    const data = await this.getData();
    return data.settings;
  }

  async saveSettings(settings: AppSettings): Promise<void> {
    const data = await this.getData();
    data.settings = settings;
    await this.saveData(data);
  }

  // Debounced save for real-time editing
  debouncedSave(notes: Note[], delay = 500): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      this.saveNotes(notes);
    }, delay);
  }
}

export const storage = new StorageService();
