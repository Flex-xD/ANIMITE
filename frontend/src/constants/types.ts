import { JSX } from "react";

export interface IprivateRoutes {
    children: React.ReactNode;
    requireAuth: boolean;
    redirectTo: string;
}

export interface IAuthButton {
    className?: string,
    children?: React.ReactNode,
    buttonName: string , 
    navigate?:string ,
    onClick?:() => void
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
    className?:string
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
