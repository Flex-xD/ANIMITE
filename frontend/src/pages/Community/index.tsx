import Sidebar from "./components/Sidebar";


const CommunityPage = () => {
    return (
        <div className="flex items-center justify-center">
            <Sidebar />
            <div className="flex-1 p-6">
                {/* Your main content goes here */}
                <h1 className="text-2xl font-bold">Main Content Area</h1>
                <p>This area will expand to fill the remaining space.</p>
            </div>
        </div>
    )
}

export default CommunityPage;