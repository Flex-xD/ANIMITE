import { motion } from "framer-motion";
import { ProfileAvatar } from "../../../../Built Components";
import { AnimiteLogoComponent, MergedAnimiteSection } from "./components";
import AnimiteLogo from "../../../../images/image.png";


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

const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            ease: "easeOut",
            duration: 0.6,
        },
    },
};

const neonGlow = {
    initial: {
        boxShadow: "0 0 0 0 rgba(147, 51, 234, 0)",
        borderColor: "rgba(255, 255, 255, 0.1)",
    },
    hover: {
        boxShadow: [
            "0 0 10px 3px rgba(147, 51, 234, 0.5)",
            "0 0 20px 6px rgba(147, 51, 234, 0.6)",
            "0 0 15px 4px rgba(147, 51, 234, 0.5)",
        ],
        borderColor: "rgba(192, 132, 252, 0.9)",
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
        gradient: "from-pink-600 to-purple-700",
    },
    {
        title: "Showcase Art",
        description: "Display your fan art and connect with other talented artists.",
        icon: "🎨",
        gradient: "from-cyan-500 to-blue-600",
    },
    {
        title: "Curate Lists",
        description: "Build and share your ultimate anime watchlists and favorites.",
        icon: "📋",
        gradient: "from-green-500 to-teal-600",
    },
    {
        title: "Engage in Forums",
        description: "Join vibrant discussions about your favorite anime series.",
        icon: "💬",
        gradient: "from-yellow-500 to-orange-600",
    },
    {
        title: "Challenge Quizzes",
        description: "Test your anime expertise with exciting community quizzes.",
        icon: "🧠",
        gradient: "from-red-500 to-pink-600",
    },
    {
        title: "Collect Badges",
        description: "Earn unique badges to showcase your anime passion.",
        icon: "🏆",
        gradient: "from-purple-500 to-indigo-600",
    },
];

function ExploreSection() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-150px" }}
            variants={containerVariants}
            className="relative min-h-screen w-full bg-gradient-to-br from-[#1a0b3b] via-[#2d1b5e] to-[#4b248a] flex flex-col items-center justify-center py-20 px-6 overflow-hidden z-0"
        >
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wOCkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"
                    animate={{ opacity: [0.2, 0.3, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                    className="absolute w-96 h-96 bg-purple-500/10 rounded-full -top-20 -left-20 blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div
                    className="absolute w-96 h-96 bg-cyan-500/10 rounded-full -bottom-20 -right-20 blur-3xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.4, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </div>

            {/* Main Content */}
            <MergedAnimiteSection/>

            {/* Features Grid */}
            <motion.div
                className="mt-24 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, staggerChildren: 0.1 }}
            >
                {featureItems.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="relative bg-black/40 backdrop-blur-md rounded-lg p-6 border border-white/10 overflow-hidden"
                        initial="initial"
                        whileHover="hover"
                        variants={neonGlow}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Animated Gradient Background */}
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