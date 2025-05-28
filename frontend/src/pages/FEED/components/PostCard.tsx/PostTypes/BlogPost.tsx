interface BlogPostProps {
    content: string;
}

export const BlogPost = ({ content }: BlogPostProps) => {
    return (
        <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">Blog Post</h3>
            <p className="text-white/80">{content}</p>
            <div className="bg-gradient-to-r from-purple-500/10 to-transparent p-4 rounded-lg border border-purple-500/20">
                <p className="text-sm text-purple-300">Read full blog post...</p>
            </div>
        </div>
    );
};