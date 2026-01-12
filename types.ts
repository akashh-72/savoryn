export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio?: string;
  followers: number;
  following: number;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  createdAt: string;
}

export interface RecipeMetadata {
  ingredients: string[];
  steps: string[];
  cookingTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Chef';
  calories?: number;
}

export interface Post {
  id: string;
  type: 'video' | 'image';
  url: string;
  thumbnailUrl?: string;
  caption: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  user: User;
  recipe?: RecipeMetadata;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface Story {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  mediaUrl: string;
  hasUnseen: boolean;
}

export interface ChatPreview {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unread: number;
}