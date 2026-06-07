
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: GroundingSource[];
  suggestion?: string;
  isCommand?: boolean;
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export enum AppSection {
  CHAT = 'chat',
  PLANNER = 'planner',
  RESOURCES = 'resources',
  STATS = 'stats',
  CODE = 'code',
  ARENA = 'arena',
  MUSIC = 'music',
  PROBLEMS = 'problems',
  AVATAR_STORE = 'avatar_store',
  VIDEO_STORE = 'video_store',
  CUSTOM = 'custom'
}

export interface AvatarItem {
  id: string;
  name: string;
  price: number;
  type: 'hat' | 'glasses' | 'effect';
  icon: string;
}

export interface VideoCourse {
  id: string;
  title: string;
  description: string;
  price: number;
  youtubeId: string;
  thumbnail: string;
}

export interface UserProfile {
  email: string;
  username: string;
  rankKey: 'junior' | 'expert' | 'master' | 'founder';
  avatar: string;
  educationLevel: string;
  isAdmin?: boolean;
  unlockedItems: string[];
  unlockedVideos: string[];
  activeHat?: string;
}

export interface SystemState {
  arenaEffect: 'none' | 'hacker' | 'gold' | 'glitch' | 'rainbow' | 'tsunami';
  broadcastMessage: string | null;
  disabledSections: string[];
  logs: any[];
}

export type Country = {
  id: string;
  name: string;
  flag: string;
  lang: 'TR' | 'EN' | 'DE' | 'JP' | 'FR';
  welcome: string;
};

// Added CustomSection interface for system extensions
export interface CustomSection {
  name: string;
  icon: string;
  description: string;
  content: string;
}

// Added MusicTrack interface for focus music tracks
export interface MusicTrack {
  id: string;
  name: string;
  icon: string;
  color: string;
  url: string;
}

// Added UserStats interface for study progress visualization
export interface UserStats {
  studyHours: number;
  completedTasks: number;
  points: number | 'unlimited';
  weeklyProgress: any[];
}
