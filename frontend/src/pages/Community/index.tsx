
type Props = {}

function Community({ }: Props) {
    return (
        <div className="h-screen w-screen bg-purple-400 flex flex-col items-center justify-center gap-10">
        <h1 className="text-4xl font-extrabold">CURRENTLY IN DEVELOPMENT !</h1>
        <h1>THIS IS GOING TO BE THE COMMUNITY PAGE ( Possible features are listed below ) </h1>
        <ul>
            <li>1. Community creation and joining other people's community.</li>
            <li>2. Some particular features inside communities </li>
                    <li className="ml-20 font-bold">. Community Members Chat</li>
                    <li className="ml-20 font-bold">. Communities own feed !</li>
                    <li className="ml-20 font-bold">. Debate section inside community</li>
                    <li className="ml-20 font-bold">. community anime watch list !</li>
            <li>3. A lot of communities being randomly shown.</li>
        </ul>
    </div>
    )
}

export default Community;