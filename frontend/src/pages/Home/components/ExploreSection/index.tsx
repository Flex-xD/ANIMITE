import AnimiteLogo from "../../../../images/animiteLogo.png";

type Props = {}

function ExploreSection({ }: Props) {
    return (
        <div className="h-[130vh] w-[100vw] bg-gradient-to-r from-[#7733EC] to-[rgba(142,0,250,0.7)] flex flex-col items-center justify-evenly">

            {/* FIRST MAIN DIV */}
            <div className="flex items-center justify-evenly bg- border border-white h-[62vh] w-screen">

                <div className="h-[61vh] w-3/6 border border-white">
                </div>

                <div className="h-[61vh] w-2/5 border border-white flex items-center justify-center">
                    <img src={AnimiteLogo} alt="Animite Logo" className="h-72 opacity-85 "/>
                </div>
            </div>

            {/* SECOND MAIN DIV */}
            <div className="flex items-center justify-evenly border border-white h-[62vh] w-screen"></div>
        </div>
    )
}

export default ExploreSection 