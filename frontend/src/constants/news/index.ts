export interface NewsItem {
    id: number;
    title: string;
    url: string;
    date: string;
    author: {
        username: string;
        url: string;
    };
    excerpt: string;
    thumbnail: string | null;
}

export interface Anime {
    id: number;
    title: string;
    image: string;
    url: string;
}

export interface AnimeWithNews {
    anime: Anime;
    newsCount: number;
    news: NewsItem[];
}

export interface TrendingAnimeResponse {
    success: boolean;
    totalTrending: number;
    data: AnimeWithNews[];
}