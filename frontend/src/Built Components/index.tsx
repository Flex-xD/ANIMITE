import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { IAuthButton, IProfileButton } from "../constants/types";
import { motion, useMotionValue, useTransform } from "framer-motion";


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
                    hover: { x: -40, opacity: 1, scale: 1.1 },
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