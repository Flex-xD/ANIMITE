type BlogPostProps = {
    content: string;
};

const BlogPost = ({ content }: BlogPostProps) => (
    <p className="mb-4 text-gray-300">{content}</p>
);

export default BlogPost;