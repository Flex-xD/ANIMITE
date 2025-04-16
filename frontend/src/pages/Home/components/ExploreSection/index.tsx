import AnimiteLogo from "../../../../images/animiteLogo.png";

type Props = {}

function ExploreSection({ }: Props) {
    return (
        <div className="h-[130vh] w-[100vw] bg-gradient-to-r from-[#7733EC] to-[rgba(142,0,250,0.7)] flex flex-col items-center justify-evenly">

            {/* FIRST MAIN DIV */}
            <div className="flex flex-col items-center justify-center bg- border border-white h-[62vh] w-screen p-2">

                <div className="h-[52vh] w-full border-2 bord flex items-center justify-evenly p-2">

                    <div className="h-[48vh] w-4/6 border border-white p-2">

                    </div>

                    <div className="h-[48vh] w-3/5 border border-white flex items-center justify-center p-2">
                        <img src={AnimiteLogo} alt="Animite Logo" className="h-72 opacity-70 " />
                    </div>

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