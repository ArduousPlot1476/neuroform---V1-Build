export interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  createdAt: Date;
}

export interface WallPost {
  id: string;
  author: {
    name: string;
    type: 'user' | 'mentor' | 'system';
    avatarUrl: string;
  };
  content: {
    type: 'text' | 'weekly_summary';
    text?: string;
    title?: string;
    date: string;
    likes: number;
    comments: Comment[];
    report?: {
      title: string;
      content: string[];
    };
  };
}