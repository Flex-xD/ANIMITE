type ListPostProps = {
    content: string;
    items: string[];
};

const ListPost = ({ content, items }: ListPostProps) => {
    return (
        <>
            <p className="mb-4 text-gray-300">{content}</p>
            <ul className="mb-4 space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start group">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs mr-2 mt-0.5 transition-colors group-hover:bg-purple-500/40">
                            {index + 1}
                        </span>
                        <span className="text-gray-300 group-hover:text-purple-200 transition-colors">
                            {item}
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ListPost;