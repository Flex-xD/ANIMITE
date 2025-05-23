import { useState } from 'react';
import { FeedItem } from '../../constants/types';
import CommunityLayout from './components/CommunityLayout/CommunityLayout';
import FeedContainer from './feed/FeedContainer';


export const mockFeed: FeedItem[] = [
    {
        id: '1',
        type: 'blog',
        user: { id: 'u1', username: 'CyberOtaku', avatar: '/avatars/cyber-otaku.png' },
        content: 'Just finished writing my analysis on the cyberpunk themes in Edgerunners. The way they portray the dystopian Night City while maintaining emotional character arcs is masterful. The contrast between David\'s idealism and the harsh reality creates such a compelling narrative tension.',
        likes: 42,
        timestamp: '2 hours ago'
    },
    {
        id: '2',
        type: 'fanart',
        user: { id: 'u2', username: 'NeonArtist', avatar: '/avatars/neon-artist.png' },
        content: 'My latest fanart of Lucy from Cyberpunk Edgerunners in a neon-lit alley. Tried to capture that melancholic cyberpunk vibe.',
        additionalData: { imageUrl: '/fanart/lucy-alley.jpg' },
        likes: 128,
        timestamp: '5 hours ago'
    },
    {
        id: '3',
        type: 'list',
        user: { id: 'u3', username: 'WatchlistMaster', avatar: '/avatars/watchlist-master.png' },
        content: 'My top 10 cyberpunk anime to watch this season:',
        additionalData: {
            items: [
                'Cyberpunk: Edgerunners',
                'Psycho-Pass',
                'Ghost in the Shell: SAC',
                'Akira',
                'Dorohedoro',
                'Serial Experiments Lain',
                'Ergo Proxy',
                'Texhnolyze',
                'Blame!',
                'Battle Angel Alita'
            ]
        },
        likes: 76,
        timestamp: '1 day ago'
    },
    {
        id: '4',
        type: 'poll',
        user: { id: 'u4', username: 'AnimePoller', avatar: '/avatars/anime-poller.png' },
        content: 'Which cyberpunk anime has the best world-building?',
        additionalData: {
            options: [
                { text: 'Ghost in the Shell', votes: 45 },
                { text: 'Psycho-Pass', votes: 38 },
                { text: 'Cyberpunk: Edgerunners', votes: 52 },
                { text: 'Akira', votes: 29 }
            ]
        },
        likes: 31,
        timestamp: '1 day ago'
    },
    {
        id: '5',
        type: 'review',
        user: { id: 'u5', username: 'CriticInBlack', avatar: '/avatars/critic-in-black.png' },
        content: 'Just rewatched Akira for the 10th time. The animation still holds up incredibly well after all these years. The themes of power, corruption, and societal collapse are more relevant than ever. The motorcycle chase scene remains one of the most beautifully animated sequences in anime history.',
        additionalData: { rating: 5 },
        likes: 94,
        timestamp: '2 days ago'
    }
];

const CommunityPage = () => {
    const [feed] = useState<FeedItem[]>(mockFeed);

    return (
        <CommunityLayout>
            <FeedContainer feedItems={feed} />
        </CommunityLayout>
    );
};

export default CommunityPage;