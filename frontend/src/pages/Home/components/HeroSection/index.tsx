import backgroundImage from "../../../../images/DALL·E 2025-02-26 16.59.11 - A futuristic anime-style background featuring a neon-lit cyberpunk cityscape. The scene includes towering skyscrapers with holographic billboards, fly.webp"
import Navbar from "../Navbar"
import Card from "./components/Card";



export const HeroSection = () => {
    return (
        <div
            className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 31, 0.85) 60%, rgba(168, 48, 219, 0.85) 100%), url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Navbar />

            <div className="flex flex-col items-center text-center px-6 sm:px-0 mt-28">
                <h2 className="font-orbitron text-5xl sm:text-5xl font-bold bg-gradient-to-r from-[#a650f2] to-[#ec2d89] text-transparent bg-clip-text">
                    WELCOME TO
                </h2>
                <h1 className="font-orbitron text-7xl sm:text-8xl font-extrabold bg-gradient-to-r from-[#9d51e0] to-[#35cef4] text-transparent bg-clip-text mt-2">
                    ANIMITE
                </h1>
                <p className="font-iceland text-lg sm:text-xl bg-gradient-to-r from-[#8FE5FF] to-[#E097FF] text-transparent bg-clip-text max-w-2xl mt-4">
                    Dive into a cosmic anime odyssey. Connect with fans across the galaxy. Your weeb journey starts here.
                </p>
            </div>

            <div className="w-full h-[19rem] {bg-gradient-to-t from-purple-600 to-transparent} flex items-center justify-center">
                <Card title="SHOW CASE YOUR TALENT" description="Display your anime art, fan fiction, and skills. Inspire fans worldwide with your unique creations!"
                />
            </div>
        </div>
    )
}

export default HeroSection;
