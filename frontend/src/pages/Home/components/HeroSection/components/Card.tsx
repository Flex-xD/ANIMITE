import { ICard } from "../../../../../constants/types";

function Card({ title, image, description, color, headingColor }: ICard) {
    return (
        <div
            className="h-[16.7rem] w-56 rounded-3xl shadow-2xl flex flex-col items-center justify-between 
                transform transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]
                border border-opacity-20 border-white bg-opacity-10 overflow-hidden relative group"
            style={{
                background: `linear-gradient(135deg, ${color?.[0] || 'rgba(255,255,255,0.1)'}, ${color?.[1] || 'rgba(255,255,255,0.05)'})`,
            }}
        >
            
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <h2
                className="text-center font-orbitron tracking-widest pt-4 px-3 z-10
                    transition-all duration-300 group-hover:scale-105"
                style={{
                    background: `linear-gradient(to right, ${headingColor?.[0] || '#ffffff'}, ${headingColor?.[1] || '#9ca3af'})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 900,
                    letterSpacing: "0.1em",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
            >
                {title}
            </h2>

            <div className="relative h-28 w-48 mx-4 z-10 transition-transform duration-300 group-hover:scale-105">
                {image ? (
                    <img
                        src={image}
                        className="w-full h-full rounded-lg object-cover border border-white/20 
                            transition-all duration-300 group-hover:border-white/40"
                        alt={title}
                    />
                ) : (
                    <img
                        src={image}
                        className="w-full h-full rounded-lg object-cover opacity-80 border border-white/20
                            transition-all duration-300 group-hover:opacity-90 group-hover:border-white/40"
                        alt="Default cyberpunk scene"
                    />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <p className="text-white text-center tracking-widest leading-4 px-4 pb-4 font-iceland text-sm z-10
                transition-all duration-300 group-hover:text-opacity-90">
                {description}
            </p>

            {/* Bottom decorative line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent 
                via-white/20 to-transparent" />
        </div>
    );
}

export default Card;