import { motion } from 'framer-motion';
import { ProfileAvatar } from "../../../../../Built Components";
import AnimiteLogo from '../../../../../images/DALL·E 2025-02-26 16.59.11 - A futuristic anime-style background featuring a neon-lit cyberpunk cityscape. The scene includes towering skyscrapers with holographic billboards, fly.webp';

const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            when: 'beforeChildren',
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};


// ? Animite Logo Component
export const AnimiteLogoComponent = () => {
    return (

        <div className="h-[48vh] w-2/4 border border-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center p-4 shadow-2xl animite-float-pulse bg-black/10">
            <img
                src={AnimiteLogo}
                alt="Animite Logo"
                className="h-72 animite-glow"
            />
        </div>

    )
}


export const MergedAnimiteSection = () => {
    return (
        <div className="relative max-w-7xl w-full flex items-center justify-center px-4 py-8">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative w-full bg-black/40 backdrop-blur-2xl rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl flex flex-col items-center justify-center gap-8 overflow-hidden animiteGlow"
                // FIX OPACITY OF THE IMAGE
                style={{
                    backgroundImage: `url(${AnimiteLogo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                whileHover={{
                    y: -12,
                    boxShadow: '0 25px 50px -12px rgba(147, 51, 234, 0.7)',
                }}
                transition={{ duration: 0.4 }}
            >
                {/* Background Overlay for Readability */}
                <div className="absolute inset-0 bg-black/50 animiteFadeScale" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-lg">
                    <motion.div
                        variants={itemVariants}
                        className="relative"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ProfileAvatar className="animiteGlow animiteFloatPulse" />
                    </motion.div>
                    <motion.h2
                        variants={itemVariants}
                        className="font-orbitron font-extrabold text-3xl md:text-4xl lg:text-5xl text-center bg-gradient-to-r from-[#00f0b0] via-[#68FFDC] to-[#B7FFF7] text-transparent bg-clip-text"
                    >
                        UNLEASH YOUR WEEB VIBE
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="font-raleway text-base md:text-lg text-center text-white/80 leading-relaxed max-w-md"
                    >
                        Dive into a universe of anime fandom—share your art, craft blogs, curate watchlists, join quizzes, and connect with fellow weebs!
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
};