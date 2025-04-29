import { motion } from "framer-motion";
import  MergedAnimiteSection  from "./components/index";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};


const neonGlow = {
    initial: {
        boxShadow: "0 0 0 0 rgba(255, 105, 180, 0)",
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    hover: {
        boxShadow: [
            "0 0 10px 3px rgba(255, 105, 180, 0.5)",
            "0 0 20px 6px rgba(255, 105, 180, 0.6)",
            "0 0 15px 4px rgba(255, 105, 180, 0.5)",
        ],
        borderColor: "rgba(255, 182, 193, 0.9)",
        transition: {
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse" as const,
        },
    },
};

const featureItems = [
    {
        title: "Create Content",
        description: "Share your anime reviews, blogs, and recommendations with the global community.",
        icon: "✍️",
        gradient: "from-pink-500 to-purple-600",
    },
    {
        title: "Showcase Art",
        description: "Display your fan art and connect with other talented artists.",
        icon: "🎨",
        gradient: "from-blue-600 to-purple-700",
    },
    {
        title: "Curate Lists",
        description: "Build and share your ultimate anime watchlists and favorites.",
        icon: "📋",
        gradient: "from-cyan-500 to-blue-600",
    },
    {
        title: "Engage in Forums",
        description: "Join vibrant discussions about your favorite anime series.",
        icon: "💬",
        gradient: "from-purple-500 to-pink-600",
    },
    {
        title: "Challenge Quizzes",
        description: "Test your anime expertise with exciting community quizzes.",
        icon: "🧠",
        gradient: "from-blue-500 to-cyan-600",
    },
    {
        title: "Collect Badges",
        description: "Earn unique badges to showcase your anime passion.",
        icon: "🏆",
        gradient: "from-purple-600 to-blue-700",
    },
];

function ExploreSection() {
    return (
        <motion.section
            className="relative min-h-screen w-full bg-gradient-to-b from-[rgba(168,28,264,0.95)] to-[#1a0b3b] flex flex-col items-center justify-center py-20 px-6 overflow-hidden z-0"
        >
            {/* Dynamic Anime-Style Background Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Grid Pattern */}
                <motion.div
                    className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wOCkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"
                    animate={{ opacity: [0.2, 0.3, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                {/* Glowing Particles */}
                <motion.div
                    className="absolute w-4 h-4 bg-pink-400 rounded-full top-1/4 left-1/4 blur-sm"
                    animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-3 h-3 bg-cyan-400 rounded-full bottom-1/3 right-1/4 blur-sm"
                    animate={{ y: [0, 15, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                <motion.div
                    className="absolute w-5 h-5 bg-purple-400 rounded-full top-1/2 left-3/4 blur-sm"
                    animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                {/* Rotating Geometric Shape (Anime Sparkle Effect) */}
                <motion.div
                    className="absolute w-32 h-32 border-2 border-dashed border-cyan-300 rounded-[20%] top-1/3 right-1/3 opacity-30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute w-16 h-16 border-2 border-dashed border-pink-300 rounded-[20%] top-1/3 right-1/3 opacity-30"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                {/* Gradient Glow Blobs */}
                <motion.div
                    className="absolute w-96 h-96 bg-pink-500/10 rounded-full -top-20 -left-20 blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div
                    className="absolute w-96 h-96 bg-blue-500/10 rounded-full -bottom-20 -right-20 blur-3xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.4, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </div>

            {/* Main Content */}
            <MergedAnimiteSection className="-mt-7 -mb-8"/>

            {/* Features Grid */}
            <motion.div
                className="mt-24 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                {featureItems.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="relative bg-black/40 backdrop-blur-md rounded-lg p-6 border border-white/10 overflow-hidden"
                        variants={neonGlow}
                        initial="initial"
                        whileHover="hover"
                        transition={{ duration: 0.4 }}
                    >
                        <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 -z-10`}
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 0.4 }}
                            transition={{ duration: 0.5 }}
                        />
                        <div className="relative flex flex-col h-full">
                            <motion.div
                                className="text-5xl mb-4"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                {feature.icon}
                            </motion.div>
                            <h3 className="font-orbitron text-xl font-semibold text-white mb-2 tracking-wider">
                                {feature.title}
                            </h3>
                            <p className="font-raleway text-white/70 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                            <motion.div
                                className={`h-0.5 bg-gradient-to-r ${feature.gradient} mt-4`}
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}

export default ExploreSection;