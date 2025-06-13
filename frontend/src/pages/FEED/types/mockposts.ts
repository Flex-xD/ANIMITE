import { Post } from "./types";

// Sample Data
export const mockPosts: Post[] = [
    {
        id: '1',
        type: 'blog',
        user: { username: 'AnimeReviewer', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnimeReviewer' },
        createdAt: '2024-05-28T10:30:00Z',
        content: 'Just finished watching the latest episode of Attack on Titan! The animation quality is incredible this season.',
        likes: 124,
        likedByCurrentUser: false,
    },
    {
        id: '2',
        type: 'review',
        user: { username: 'OtakuCritic', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=OtakuCritic' },
        createdAt: '2024-05-28T08:15:00Z',
        content: 'Your Name (Kimi no Na wa) - A masterpiece blending romance and stunning visuals.',
        stars: 5,
        likes: 89,
        likedByCurrentUser: true,
    },
    {
        id: '3',
        type: 'poll',
        user: { username: 'AnimeFan2024', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnimeFan2024' },
        createdAt: '2024-05-27T20:45:00',
        content: 'Which Studio Ghibli movie is the best?',
        options: ['Spirited Away', 'My Neighbor Totoro', 'Princess Mononoke', 'Howl\'s Moving Castle'],
        votes: { 'Spirited Away': 45, 'My Neighbor Totoro': 23, 'Princess Mononoke': 31, 'Howl\'s Moving Castle': 18 },
        userVote: 'Spirited Away',
        likes: 67,
        likedByCurrentUser: false,
    },
    {
        id: '4',
        type: 'watchlist',
        user: { username: 'BingeWatcher', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BingeWatcher' },
        createdAt: '2024-05-27T16:20:00Z',
        content: 'Updated my watchlist: Demon Slayer S4, My Hero Academia S7, and Frieren.',
        likes: 34,
        likedByCurrentUser: true,
    },
    {
        id: '5',
        type: 'normal',
        user: { username: 'CasualViewer', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CasualViewer' },
        createdAt: '2024-05-27T12:10:00Z',
        content: 'Just discovered anime! Started with One Piece and I’m hooked!',
        likes: 156,
        likedByCurrentUser: false,
    },
];