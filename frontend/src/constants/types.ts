export interface IprivateRoutes {
    children: React.ReactNode;
    requireAuth:boolean;
    redirectTo:string;
}

export interface IAuthButton {
    className?:string ,
    children?:React.ReactNode , 
    buttonName:string
}

export interface IProfileButton {
    children?:React.ReactNode , 
    buttonName:string
}

export interface ICard {
    title:string ,
    image ?:string ,
    color?:[string, string] ,
    description:string ,
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
