import { motion, Variants } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { AuthButton, ProfileAvatar } from "../../../../../Built Components";
import { CyberpunkMergedAnimiteSectionProps } from '../../../../../constants/types';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            staggerChildren: 0.2,
            when: "beforeChildren"
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100
        }
    }
};

const CyberpunkMergedAnimiteSection: React.FC<CyberpunkMergedAnimiteSectionProps> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const gridSize = 20;
        const lines: { x: number, y: number, speed: number }[] = [];

        // Initialize grid lines
        for (let i = 0; i < canvas.width / gridSize; i++) {
            lines.push({
                x: i * gridSize,
                y: Math.random() * canvas.height,
                speed: 0.2 + Math.random() * 0.8
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw animated grid
            ctx.strokeStyle = 'rgba(100, 255, 255, 0.1)';
            ctx.lineWidth = 1;

            lines.forEach(line => {
                ctx.beginPath();
                ctx.moveTo(line.x, 0);
                ctx.lineTo(line.x, line.y);
                ctx.stroke();

                line.y += line.speed;
                if (line.y > canvas.height) line.y = 0;
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    const mergedSectionButtons = ["JOIN NOW" , "EXPLORE FEATURES"];

    return (
        <section className={`relative overflow-hidden ${className}`}>
            {/* Animated cyberpunk background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
            />

            {/* Glowing orbs */}
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />

            <motion.div
                className="relative max-w-6xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }} // Reduced margin to minimize gap
                variants={containerVariants}
            >
                <motion.div
                    className="relative bg-gradient-to-br from-gray-900/70 via-gray-800/50 to-gray-900/70 backdrop-blur-lg border border-cyan-400/20 rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{
                        y: -5,
                        boxShadow: '0 25px 50px -12px rgba(100, 255, 255, 0.3)'
                    }}
                >
                    {/* Holographic grid overlay */}
                    <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMDAsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />

                    {/* Neon border effect */}
                    <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent animate-pulse" style={{ boxShadow: 'inset 0 0 20px rgba(100, 255, 255, 0.3)' }} />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 p-8 md:p-12">
                        {/* Avatar with cyberpunk frame */}
                        <motion.div
                            className="relative flex-shrink-0"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
                                <ProfileAvatar className="w-full h-full rounded-lg" />
                                <div className="absolute inset-0 rounded-lg border-2 border-cyan-400/50 pointer-events-none" />
                                <div className="absolute -inset-2 rounded-lg border border-cyan-400/30 pointer-events-none animate-[spin_8s_linear_infinite]" />
                                <div className="absolute -inset-4 opacity-20 bg-cyan-400/10 rounded-lg blur-md pointer-events-none" />
                            </div>
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 text-center lg:text-left space-y-6">
                            <motion.h2
                                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                                variants={itemVariants}
                            >
                                <span className="text-white">UNLEASH YOUR</span> WEEB ENERGY
                            </motion.h2>

                            <motion.p
                                className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl"
                                variants={itemVariants}
                            >
                                Dive into the ultimate anime metaverse. Track your watchlist, create cyber-weeb art, compete in neural-net quizzes, and connect with fellow otaku in our neon-lit community hub.
                            </motion.p>

                            <motion.div
                                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                                variants={itemVariants}
                            >
                            
                                {
                                    mergedSectionButtons.map((button , buttonIndex) => (
                                        (
                                            <AuthButton buttonName={`${button}`} key={buttonIndex}/>
                                        )
                                    ))
                                }
                
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default CyberpunkMergedAnimiteSection;