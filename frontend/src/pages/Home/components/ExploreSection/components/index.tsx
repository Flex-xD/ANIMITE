import AnimiteLogo from "../../../../../images/animiteLogo.png";


// ? Animite Logo Component
export const AnimiteLogoComponent = () => {
    return (

        <div className="h-[48vh] w-2/4 border border-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center p-4 shadow-2xl animite-float-pulse bg-black/10">
            <img
                src={AnimiteLogo}
                alt="Animite Logo"
                className="h-72 opacity-90 animite-glow"
            />
        </div>

    )
}
