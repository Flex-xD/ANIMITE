import { motion } from 'framer-motion';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
}

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
        >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                {title}
            </h2>
            {subtitle && (
                <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
            )}
        </motion.div>
    );
};