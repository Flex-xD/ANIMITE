import { ICard } from "../../../../../constants/types";

function Card({ title, image, description, color, headingColor }: ICard) {
    return (
        <div
            className="h-[16.7rem] w-56 bg-opacity-10 border-[0.1px] border-white rounded-xl shadow-2xl flex flex-col items-center justify-around mt-3"
            style={{
                background: `linear-gradient(to right, ${color ? color[0] : "transparent"}, ${color ? color[1] : "transparent"})`
            }}
        >
            <h2
                className="text-center font-orbitron tracking-widest"
                style={{
                    background: `linear-gradient(to right, ${headingColor ? headingColor[0] : "white"}, ${headingColor ? headingColor[1] : "grey"})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "900", // Maximum boldness
                    letterSpacing: "0.1em", // Slightly increase letter spacing
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Adds depth to the text
                }}
            >
                {title}
            </h2>

            {image ? (
                <div className="h-28 w-48 border-[0.1px] border-white rounded-xl" />
            ) : (
                <img
                    src="https://img.freepik.com/free-photo/cyberpunk-city-street-night-with-neon-lights-futuristic-aesthetic_23-2151488771.jpg"
                    className="bg-cover w-48 h-28 rounded-xl object-cover opacity-70"
                    alt="Anime couple scene"
                />
            )}

            <p className="text-white text-center tracking-widest leading-4 px-3 font-iceland">
                {description}
            </p>
        </div>
    )
}

export default Card;
