export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface AppSettings {
  geminiApiKey?: string;
}

export interface StorageData {
  notes: Note[];
  settings: AppSettings;
}
