import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { IAuthButton, IProfileButton } from "../constants/types";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";


// ? AUTH BUTTON COMPONENT

export const AuthButton = ({ buttonName, className, onClick }: IAuthButton) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const tiltX = useTransform(mouseY, [0, 200], [-6, 6]);
    const tiltY = useTransform(mouseX, [0, 200], [6, -6]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left - width / 2);
        mouseY.set(e.clientY - top - height / 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            className={`relative inline-flex items-center justify-center ${className}`}
            style={{ perspective: 400 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="
            absolute -inset-1 rounded-full
            bg-gradient-to-br from-[#00bfff] to-[#b20bff]
            opacity-50 blur-md
            pointer-events-none
        "
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            <Button
                onClick={onClick}
                className={`
            relative min-h-[6vh] px-8 py-3 rounded-full
            bg-gradient-to-br from-[#00bfff] to-[#b20bff]
            text-white font-exo font-semibold text-sm tracking-tight
            shadow-lg group
            overflow-hidden border-none
            transition-all duration-300 ease-out
        `}
                style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateX(${tiltX.get()}deg) rotateY(${tiltY.get()}deg)`,
                }}
            >
                <motion.div
                    className="
            absolute inset-0 opacity-0 group-hover:opacity-25
            bg-[linear-gradient(45deg,rgba(255,255,255,0.15),rgba(255,255,255,0.5),rgba(255,255,255,0.15))]
            pointer-events-none
            "
                    animate={{
                        x: ["-100%", "100%"],
                        transition: {
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 1.2,
                                ease: "linear",
                            },
                        },
                    }}
                />

                <div
                    className="
            absolute inset-0 rounded-full
            opacity-0 group-hover:opacity-15
            shadow-[inset_0_0_10px_rgba(255,255,255,0.9)]
            pointer-events-none
            transition-opacity duration-300
            "
                />

                <motion.span
                    className="relative z-10 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]"
                    whileHover={{
                        y: -1,
                        scale: 1.03,
                        transition: { duration: 0.2 },
                    }}
                >
                    {buttonName}
                </motion.span>
            </Button>
        </motion.div>
    );
};

// ? PROFILE BUTTON COMPONENT 

export const ProfileButton = ({ buttonName }: IProfileButton) => {
    return (
        <motion.div
            className="relative flex items-center gap-4 group"
            initial="initial"
            whileHover="hover"
        >
            <motion.div
                variants={{
                    initial: { x: 0 },
                    hover: { x: -12 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
                <AuthButton
                    buttonName={buttonName}
                    className="group-hover:pr-10 transition-all duration-300"
                />
            </motion.div>

            <motion.div
                className="relative"
                variants={{
                    initial: { x: -20, opacity: 0, scale: 0.8 },
                    hover: { x: -60, opacity: 1, scale: 1.1 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
                <motion.div
                    className="
            absolute -inset-1 rounded-full
            bg-gradient-to-br from-[#00bfff]/30 to-[#b20bff]/30
            blur-md opacity-0 group-hover:opacity-60
            pointer-events-none
            "
                    variants={{
                        initial: { scale: 0.9 },
                        hover: { scale: 1.2 },
                    }}
                    transition={{ duration: 0.3 }}
                />

                <Avatar
                    className="
            h-12 w-12
            border-2 border-white/80
            group-hover:border-[#b20bff]/90
            shadow-md
            transition-all duration-300
            "
                >
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback
                        className="
                bg-gradient-to-br from-[#00bfff]/80 to-[#b20bff]/80
                text-white font-exo
                "
                    >
                        PFP
                    </AvatarFallback>
                </Avatar>
            </motion.div>

            <motion.div
                className="
            absolute h-[2px] bottom-1/3 left-0 right-0 -z-10
            bg-gradient-to-r from-[#00bfff]/60 to-[#b20bff]/60
            rounded-full
            "
                variants={{
                    initial: { scaleX: 0, opacity: 0 },
                    hover: { scaleX: 1, opacity: 1 },
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
            />
        </motion.div>
    );
};


export const ProfileAvatar = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            container.style.setProperty('--mouse-x', `${x}px`);
            container.style.setProperty('--mouse-y', `${y}px`);

            particlesRef.current.forEach((particle) => {
                if (!particle) return;

                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 30 + 20;

                particle.style.opacity = '1';
                particle.style.transform = `translate(
            ${Math.cos(angle) * distance}px,
            ${Math.sin(angle) * distance}px
            )`;
            });
        };

        const handleMouseLeave = () => {
            particlesRef.current.forEach(particle => {
                if (!particle) return;
                particle.style.opacity = '0';
                particle.style.transform = 'translate(-50%, -50%)';
                particle.style.transitionDuration = '600ms';
            });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative group flex items-center justify-center w-fit"
            style={{
                '--mouse-x': '0px',
                '--mouse-y': '0px',
            } as React.CSSProperties}
        >
            <div className="absolute h-[120%] w-[120%] rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 transition-all duration-1000 ease-out group-hover:duration-300 group-hover:h-[140%] group-hover:w-[140%] motion-safe:group-hover:animate-float"></div>

            <div className="absolute h-28 w-28 rounded-full border-[3px] border-transparent group-hover:border-cyan-300/40 transition-all duration-700 ease-out group-hover:h-[7.5rem] group-hover:w-[7.5rem] motion-safe:group-hover:animate-ripple"></div>

            <Avatar className="relative h-24 w-24 rounded-full border-[3px] border-white/80 shadow-lg transition-all duration-500 ease-[cubic-bezier(0.18,0.89,0.32,1.28)] group-hover:-translate-y-3 group-hover:shadow-xl group-hover:shadow-cyan-100/30 overflow-hidden">
                <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-xl">
                    CN
                </AvatarFallback>

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(16)].map((_, i) => (
                        <div
                            key={i}
                            ref={el => { particlesRef.current[i] = el as HTMLDivElement; }}
                            className="absolute rounded-full bg-white/90 group-hover:bg-cyan-200 transition-all duration-1000 ease-out"
                            style={{
                                top: '50%',
                                left: '50%',
                                width: `${Math.random() * 4 + 2}px`,
                                height: `${Math.random() * 4 + 2}px`,
                                opacity: 0,
                                transform: 'translate(-50%, -50%)',
                                transitionDelay: `${i * 50}ms`,
                                willChange: 'transform, opacity'
                            }}
                        />
                    ))}
                </div>
            </Avatar>

            <div
                className="absolute -z-10 h-16 w-16 rounded-full bg-cyan-400/10 blur-xl transition-all duration-300 ease-out pointer-events-none opacity-0 group-hover:opacity-100"
                style={{
                    transform: 'translate(var(--mouse-x), var(--mouse-y))',
                    left: '50%',
                    top: '50%'
                }}
            ></div>

            {[...Array(8)].map((_, i) => (
                <div
                    key={`bubble-${i}`}
                    className="absolute rounded-full bg-white/30 group-hover:bg-cyan-200/40 transition-all duration-1000 ease-out pointer-events-none"
                    style={{
                        width: `${Math.random() * 8 + 4}px`,
                        height: `${Math.random() * 8 + 4}px`,
                        bottom: '0%',
                        left: `${Math.random() * 100}%`,
                        opacity: 0.5,
                        animation: `float-up ${Math.random() * 6 + 4}s infinite`,
                        animationDelay: `${Math.random() * 5}s`,
                        willChange: 'transform, opacity'
                    }}
                />
            ))}
        </div>
    );
};