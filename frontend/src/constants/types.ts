import { ReactNode } from "react";

export interface IprivateRoutes {
    children: React.ReactNode;
    requireAuth:boolean;
    redirectTo:string;
}

export interface IUser {
    email:string , 
    username:string , 
    password:string , 
    profilePicture?:string ,
    bio?:string ,
    role:"user" | "admin" ,
    friends:[] ,
    favourite:[] ,
    blogs?:[] ,
    community?:[] ,
    badges:[] ,
    notifications:string[], 
    watchList:[]
}
