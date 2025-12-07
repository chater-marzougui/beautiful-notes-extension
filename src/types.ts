export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export type Theme = 'dark' | 'light' | 'midnight';
export type Language = 'en' | 'es' | 'fr' | 'ar';

export interface AppSettings {
  geminiApiKey?: string;
  theme?: Theme;
  language?: Language;
}

export interface StorageData {
  notes: Note[];
  settings: AppSettings;
}
