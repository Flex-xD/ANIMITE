import { motion } from 'framer-motion';

type FanArtPostProps = {
    content: string;
    imageUrl: string;
};

const FanArtPost = ({ content, imageUrl }: FanArtPostProps) => {
    return (
        <>
            <p className="mb-4 text-gray-300">{content}</p>
            <motion.div
                className="mb-4 rounded-lg overflow-hidden border border-gray-700/50"
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
                <img
                    src={imageUrl}
                    alt="Fan art"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                />
            </motion.div>
        </>
    );
};

export default FanArtPost;