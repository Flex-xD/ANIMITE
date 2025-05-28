interface NormalPostProps {
    content: string;
}

export const NormalPost = ({ content }: NormalPostProps) => {
    return (
        <p className="text-white/90">{content}</p>
    );
};