export interface User {
    username: string;
    avatarUrl: string;
}

export interface Post {
    id: string;
    type: 'blog' | 'normal' | 'watchlist' | 'poll' | 'review';
    user: User;
    createdAt: string;
    content: string;
    stars?: number;
    options?: string[];
    votes?: { [key: string]: number };
    userVote?: string;
    likes: number;
    likedByCurrentUser: boolean;
}

