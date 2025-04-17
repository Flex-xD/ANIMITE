import { ProfileAvatar } from "../../../../Built Components";
import { AnimiteLogoComponent } from "./components";

type Props = {}

function ExploreSection({ }: Props) {
    return (
        <div className="h-[130vh] w-[100vw] bg-gradient-to-r from-[#7733EC] to-[rgba(142,0,250,0.7)] flex flex-col items-center justify-evenly">

            {/* FIRST MAIN DIV */}
            <div className="flex flex-col items-center justify-center h-[62vh] w-screen p-2">

                <div className="h-[52vh] w-full flex items-center justify-evenly p-2 gap-3">

                    <div className="h-[48vh] w-2/4 border border-white/30 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-evenly gap-6 shadow-2xl transition-all duration-300 ease-in-out bg-black/10">
                        <ProfileAvatar />

                        <h1 className="font-orbitron font-bold text-center text-2xl md:text-3xl lg:text-3xl bg-gradient-to-r from-[#00f0b0] via-[#68FFDC] to-[#B7FFF7] text-transparent bg-clip-text drop-shadow-md 
                        ">
                            WHAT'S ON YOUR MIND WEEB ?
                        </h1>

                        <p className="font-raleway text-sm md:text-base text-center tracking-wide text-white/90 max-w-2xl leading-relaxed px-4 font-bold ">
                            Share your thoughts, fan arts, write blogs, make a watch list, give your reviews & opinions,
                            anime recommendations, participate in quizzes, and much more!
                        </p>
                    </div>

                    <AnimiteLogoComponent />


                </div>

                <div className="h-[9vh] w-full p-2 flex items-center justify-center">
                    <div className="h-[8vh] w-[20vw] border border-white">
                        I will have buttons here !
                    </div>
                </div>

            </div>

            {/* SECOND MAIN DIV */}
            <div className="flex items-center justify-evenly border border-white h-[62vh] w-screen bg-pink-400 opacity-50">

            </div>
        </div>
    )
}

export default ExploreSection 