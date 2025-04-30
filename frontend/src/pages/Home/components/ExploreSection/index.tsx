import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import MergedAnimiteSection from "./components/index";

const CyberGridBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const controls = useAnimation();

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Cyber grid animation
        let frameCount = 0;
        const animateGrid = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw dynamic grid
            const gridSize = 40;
            ctx.strokeStyle = `rgba(100, 255, 255, ${0.05 + Math.sin(frameCount * 0.02) * 0.05})`;
            ctx.lineWidth = 1;

            for (let x = 0; x < canvas.width; x += gridSize) {
                const offsetX = Math.sin(frameCount * 0.01 + x * 0.005) * 10;
                ctx.beginPath();
                ctx.moveTo(x + offsetX, 0);
                ctx.lineTo(x + offsetX, canvas.height);
                ctx.stroke();
            }

            for (let y = 0; y < canvas.height; y += gridSize) {
                const offsetY = Math.cos(frameCount * 0.01 + y * 0.005) * 10;
                ctx.beginPath();
                ctx.moveTo(0, y + offsetY);
                ctx.lineTo(canvas.width, y + offsetY);
                ctx.stroke();
            }

            // Draw floating particles
            ctx.fillStyle = 'rgba(255, 100, 255, 0.8)';
            for (let i = 0; i < 20; i++) {
                const x = (Math.sin(frameCount * 0.02 + i * 0.5) * canvas.width * 0.3 + canvas.width / 2);
                const y = (Math.cos(frameCount * 0.015 + i * 0.3) * canvas.height * 0.3 + canvas.height / 2);
                const size = 2 + Math.sin(frameCount * 0.05 + i) * 1.5;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }

            frameCount++;
            requestAnimationFrame(animateGrid);
        };

        const animationId = requestAnimationFrame(animateGrid);

        // Animate glow elements
        controls.start({
            opacity: [0.3, 0.6, 0.3],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        });

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [controls]);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
            />
            <motion.div
                className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
                animate={controls}
            />
            <motion.div
                className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                    transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }
                }}
            />
        </>
    );
};

const FeatureCard = ({
    title,
    description,
    icon,
    gradient
}: {
    title: string;
    description: string;
    icon: string;
    gradient: string;
}) => {
    return (
        <motion.div
            className="relative bg-[#380955] backdrop-blur-md rounded-xl p-6 border border-white/40 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden group"
            whileHover={{ y: -5 }}
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`} />
            <div className="relative flex flex-col h-full">
                <motion.div
                    className="text-5xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                    {icon}
                </motion.div>
                <h3 className="font-orbitron text-xl font-semibold text-white mb-2 tracking-wider">
                    {title}
                </h3>
                <p className="font-raleway text-white/70 text-sm leading-relaxed">
                    {description}
                </p>
                <motion.div
                    className={`h-0.5 bg-gradient-to-r ${gradient} mt-4 w-0 group-hover:w-full`}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </motion.div>
    );
};

const ExploreSection = () => {
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

    return (
        <section className="relative min-h-screen w-full bg-gradient-to-b from-[#6c2bb6] to-[#1a0b3b] flex flex-col items-center justify-center py-16 px-4 overflow-hidden">
            {/* Futuristic Background */}
            <CyberGridBackground/>

            {/* Data Stream Effects */}
            <motion.div
                className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/80 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/80 to-transparent"
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 3 }}
            />

            {/* Main Content */}
            <div className="relative w-full max-w-6xl mx-auto">
                <MergedAnimiteSection className="-mt-4 -mb-10" />
            </div>

            {/* Features Grid */}
            <motion.div
                className="mt-20 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ staggerChildren: 0.1 }}
            >
                {featureItems.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </motion.div>

            {/* Floating UI Elements */}
            <motion.div
                className="absolute top-1/3 left-1/4 w-24 h-24 border-2 border-cyan-400/20 rounded-full pointer-events-none"
                animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                    transition: { duration: 15, repeat: Infinity, ease: "linear" }
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-16 h-16 border-2 border-pink-400/20 rounded-full pointer-events-none"
                animate={{
                    rotate: -360,
                    scale: [1, 1.3, 1],
                    transition: { duration: 12, repeat: Infinity, ease: "linear", delay: 2 }
                }}
            />
        </section>
    );
};

export default ExploreSection;