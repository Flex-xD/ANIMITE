export interface registerControllerType{
    email:string;
    username:string;
    password:string;
}

export interface ICommunityName {
    communityName: string
}

// ? ANIME NEWS TYPE
export type AnimeNews = {
    mal_id: number;
    url: string;
    title: string;
    date: string;
    author_username: string;
    author_url: string;
    excerpt: string;
    thumbnail?: string;
};