import axios, { AxiosInstance } from "axios";
import { Post, FeedFilterOptions, CreatePostData, PostType } from "../types/post";

// Simulated API client
export const apiClient: AxiosInstance = axios.create({
    baseURL: "https://api.anime-feed.example.com",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Mock data generator
const generateMockPosts = (count: number): Post[] => {
    const types: PostType[] = ["blog", "normal", "watchlist", "poll", "review"];
    const users: User[] = [
        { username: "anime_lover42", avatarUrl: "https://i.pravatar.cc/150?img=1" },
        { username: "otaku_queen", avatarUrl: "https://i.pravatar.cc/150?img=2" },
        { username: "shounen_king", avatarUrl: "https://i.pravatar.cc/150?img=3" },
        { username: "cosplay_pro", avatarUrl: "https://i.pravatar.cc/150?img=4" },
    ];

    return Array.from({ length: count }, (_, i) => {
        const type = types[Math.floor(Math.random() * types.length)];
        const user = users[Math.floor(Math.random() * users.length)];

        const basePost = {
            id: `post-${i}`,
            type,
            user,
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
            content: getRandomContent(type),
            likes: Math.floor(Math.random() * 1000),
            likedByCurrentUser: Math.random() > 0.7,
        };

        if (type === "review") {
            return { ...basePost, stars: Math.floor(Math.random() * 5) + 1 };
        }

        if (type === "poll") {
            const options = ["Option A", "Option B", "Option C", "Option D"].slice(0, Math.floor(Math.random() * 4) + 2);
            return {
                ...basePost,
                options,
                votes: options.map(() => Math.floor(Math.random() * 100))
            };
        }

        return basePost;
    });
};

const getRandomContent = (type: PostType): string => {
    const contentMap = {
        blog: "Check out my latest blog post about the new anime season! So many great shows to watch...",
        normal: "Just finished watching the latest episode! That plot twist was insane! #anime #shocking",
        watchlist: "Currently watching: Demon Slayer, Jujutsu Kaisen, and Attack on Titan Final Season",
        poll: "Which anime are you most excited for this season?",
        review: "Just finished watching this series and here are my thoughts..."
    };
    return contentMap[type] || "Anime is life!";
};

// Mock API methods
export const fetchPosts = async (options?: FeedFilterOptions): Promise<Post[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let posts = generateMockPosts(40);

    if (options?.type) {
        posts = posts.filter(post => post.type === options.type);
    }

    if (options?.searchQuery) {
        const query = options.searchQuery.toLowerCase();
        posts = posts.filter(post =>
            post.content.toLowerCase().includes(query) ||
            post.user.username.toLowerCase().includes(query)
        );
    }

    return posts;
};

export const createPost = async (postData: CreatePostData): Promise<Post> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newPost: Post = {
        id: `post-${Date.now()}`,
        type: postData.type,
        user: {
            username: "current_user",
            avatarUrl: "https://i.pravatar.cc/150?img=5"
        },
        createdAt: new Date().toISOString(),
        content: postData.content,
        stars: postData.stars,
        options: postData.options,
        likes: 0,
        likedByCurrentUser: false,
    };

    if (postData.type === "poll") {
        newPost.votes = postData.options?.map(() => 0) || [];
    }

    return newPost;
};

export const toggleLike = async (postId: string): Promise<{ likes: number, liked: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
        likes: Math.floor(Math.random() * 1000),
        liked: Math.random() > 0.5
    };
};