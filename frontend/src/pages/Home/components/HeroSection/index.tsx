import backgroundImage from "../../../../images/DALL·E 2025-02-26 16.59.11 - A futuristic anime-style background featuring a neon-lit cyberpunk cityscape. The scene includes towering skyscrapers with holographic billboards, fly.webp"
import Navbar from "../Navbar"



function HeroSection() {
    return (
        <div
            className="m-0 p-0 w-screen h-screen flex items-center justify-center"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 31, 0.8) 60%, rgba(168, 48, 219, 0.8) 100%), url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>

            <Navbar />

        </div>
    )
}

export default HeroSection;
