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