interface WatchlistPostProps {
    content: string;
}

export const WatchlistPost = ({ content }: WatchlistPostProps) => {
    const animeList = content.split(",").map(item => item.trim());

    return (
        <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">Currently Watching</h3>
            <ul className="space-y-2">
                {animeList.map((anime, index) => (
                    <li key={index} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                        <span className="text-white/80">{anime}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};