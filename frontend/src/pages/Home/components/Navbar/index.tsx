import { useState, useEffect } from "react";
import { AuthButton, ProfileButton } from "../../../../Built Components";
import { buttons, tabs } from "../../../../constants/tabs";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed top-0 left-1/2 transform -translate-x-1/2 h-[12vh] flex items-center justify-evenly transition-all duration-300 ${isScrolled
                    ? "w-11/12 bg-opacity-10 backdrop-blur-sm bg-gray-900 border-none shadow-lg rounded-full top-3"
                    : "w-full"
                }`}
        >



            {/* NAVBAR PROFILE BUTTON */}
            <div className="w-[10vw]">
                <ProfileButton buttonName="PROFILE" />
            </div>

            {/* NAVBAR TABS */}
            <div className="h-[10vh] w-96 flex items-center justify-evenly ml-24">
                {tabs.map((tab, tabIndex) => (
                    <span key={tabIndex} className="text-base font-raleway font-extrabold text-[#B8CFFF] cursor-pointer">
                        {tab}
                    </span>
                ))}
            </div>

            {/* NAVBAR LOGIN & LOGOUT BUTTONS */}
            <div className="w-44 h-[10vh] flex items-center justify-around ml-20">
                {buttons.map((button, buttonIndex) => (
                    <AuthButton key={buttonIndex} buttonName={`${button}`}>
                        {button}
                    </AuthButton>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
