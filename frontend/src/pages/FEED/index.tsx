import { Sidebar } from "lucide-react";
import { Navbar } from "./components/Navbar";


export const AnimeFeedPage = () => {
    // ... existing code ...

    return (
        <div className="flex flex-col min-h-screen bg-gray-950">
            <Navbar />

            <div className="flex flex-1 pt-16">
                <Sidebar />

                <div className="flex-1 overflow-y-auto">
                    <div className="container mx-auto px-4 py-8 max-w-4xl">
                        {/* ... existing feed content ... */}
                    </div>
                </div>
            </div>
        </div>
    );
};