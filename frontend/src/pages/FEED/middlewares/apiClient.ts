import { mockPosts } from "../types/mockposts";

// Mock API Client
export const apiClient = {
    get: async (url: string) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        if (url === '/posts') return { data: mockPosts };
        return { data: [] };
    },
    post: async (_url: string, _data: any) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { data: { success: true, data: { id: Date.now().toString() } } };
    },
    delete: async (_url: string) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return { data: [] };
    },

};