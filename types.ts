
export enum Section {
  HOME = 'home',
  TEAMS = 'teams',
  LORE = 'lore',
  JOIN = 'join'
}

export interface Character {
  name: string;
  role: 'Protagonist' | 'Antagonist';
  description: string;
  color: string;
}

export interface Milestone {
  date: string;
  title: string;
  description: string;
}

// FIX: Added missing HistoryEvent interface required by HistoryTimeline.tsx
export interface HistoryEvent {
  year: string;
  title: string;
  description: string;
}
