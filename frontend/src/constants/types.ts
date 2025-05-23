import { JSX } from "react";

export interface IprivateRoutes {
    children: React.ReactNode;
    requireAuth: boolean;
    redirectTo: string;
}

export interface IAuthButton {
    className?: string,
    children?: React.ReactNode,
    buttonName: string,
    navigate?: string,
    onClick?: () => void
}

export interface IProfileButton {
    children?: React.ReactNode,
    buttonName: string
}

export interface ICard {
    title: string,
    image?: string,
    color?: string[],
    headingColor?: string[],
    className?: string,
    description: string,
}

export interface IUser {
    email: string,
    username: string,
    password: string,
    profilePicture?: string,
    bio?: string,
    role: "user" | "admin",
    friends: [],
    favourite: [],
    blogs?: [],
    community?: [],
    badges: [],
    notifications: string[],
    watchList: []
}

export interface IRoute {
    path: string;
    element: JSX.Element;
    isPrivate?: boolean;
    redirectTo?: string;
    allowAuthenticated?: boolean;
}

export interface IProfileAvatar {
    className?: string
}

export interface CyberpunkMergedAnimiteSectionProps {
    className?: string;
}

export interface AnimeData {
    id: number;
    title: {
        english?: string;
        romaji?: string;
        native?: string;
    };
    coverImage: {
        large: string;
    };
    averageScore?: number;
    startDate?: {
        year?: number;
        month?: number;
        day?: number;
    };
    nextAiringEpisode?: {
        airingAt: number;
        episode: number;
    };
    episodes?: number;
    status?: string;
    genres?: string[];
    description?: string;
    endDate?: {
        year?: number;
        month?: number;
        day?: number;
    };
}

export interface AnimeNews {
    mal_id: number;
    url: string;
    date: string;
    title: string;
    content: string;
    excerpt: string;
}


// ? COMMUNITY PAGE PROPS

export type Community = {
    id: string;
    name: string;
    members: number;
    icon: string;
};

export type User = {
    id: string;
    username: string;
    avatar: string;
};

export type FeedItemType = 'blog' | 'fanart' | 'list' | 'poll' | 'review';

export type FeedItemBase = {
    id: string;
    type: FeedItemType;
    user: User;
    content: string;
    likes: number;
    timestamp: string;
};

export type BlogPost = FeedItemBase & {
    type: 'blog';
};

export type FanArtPost = FeedItemBase & {
    type: 'fanart';
    additionalData: {
        imageUrl: string;
    };
};

export type ListPost = FeedItemBase & {
    type: 'list';
    additionalData: {
        items: string[];
    };
};

export type PollPost = FeedItemBase & {
    type: 'poll';
    additionalData: {
        options: {
            text: string;
            votes: number;
        }[];
    };
};

export type ReviewPost = FeedItemBase & {
    type: 'review';
    content:string
    additionalData: {
        rating: number;
    };
};

export type FeedItem = BlogPost | FanArtPost | ListPost | PollPost | ReviewPost;