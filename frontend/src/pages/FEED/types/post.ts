export type PostType = "blog" | "normal" | "watchlist" | "poll" | "review";

export interface User {
    username: string;
    avatarUrl: string;
}

export interface Post {
    id: string;
    type: PostType;
    user: User;
    createdAt: string;
    content: string;
    stars?: number;         
    options?: string[];     
    votes?: number[];       
    likes: number;
    likedByCurrentUser: boolean;
}

export interface FeedFilterOptions {
    type?: PostType;
    searchQuery?: string;
}

export interface CreatePostData {
    type: PostType;
    content: string;
    stars?: number;
    options?: string[];
}