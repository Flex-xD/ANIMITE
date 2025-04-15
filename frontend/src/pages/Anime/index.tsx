type Props = {}

function Anime({ }: Props) {
    return (
        <div className="h-screen w-screen bg-pink-400 flex flex-col items-center justify-center gap-10">
            <h1 className="text-4xl font-extrabold">CURRENTLY IN DEVELOPMENT !</h1>
            <h1>THIS IS GOING TO BE THE ANIME PAGE ( Possible features are listed below ) </h1>
            <ul>
                <li>1. Anime searching through filtering ( May be )</li>
                <li>2.. Anime reviews by people .</li>
                <li>3. People's watchlist ( if public then , through a like system shown)</li>
                <li>4. AI anime recommendation based on you anime prefrence !</li>
            </ul>
        </div>
    )
}

export default Anime;