import { useState, useEffect } from "react";
import { AuthButton, ProfileButton } from "../../../../Built Components";
import { buttons, tabs } from "../../../../constants/tabs/index";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../../../../store";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const isAuthenticated = useAppStore((state) => state.isAuthenticated);
    const navigate = useNavigate();

    const logout = () => {
        alert("Logout button clicked !");
    }

    const handleClick = () => {
        if (isAuthenticated) {
            logout();
        } else {
            navigate("/auth")
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed top-0 left-1/2 transform -translate-x-1/2 h-[12vh] flex items-center justify-evenly transition-all duration-300 ease-in-out ${isScrolled
                    ? "w-11/12 bg-opacity-10 backdrop-blur-lg bg-gray-900 border-none shadow-xl rounded-full top-3 z-10"
                    : "w-full"
                }`}
        >
            {/* NAVBAR PROFILE BUTTON */}
            <div className="w-[10vw]">
                <Link to="/profile">
                    <ProfileButton buttonName="PROFILE" />

                </Link>
            </div>

            {/* NAVBAR TABS */}
            <div
                className={`h-[10vh] flex items-center justify-evenly transition-all duration-300 ease-in-out ${isScrolled ? "gap-x-6 scale-90" : "gap-x-10 scale-100"
                    }`}
            >
                {tabs.map((tab, tabIndex) => (
                    <Link
                        to={`/${tab.toLowerCase()}`}
                        key={tabIndex}
                        className={`cursor-pointer text-[#B8CFFF] font-raleway font-bold transition-all duration-300 ${isScrolled ? "text-[clamp(12px,1vw,14px)]" : "text-lg"
                            }`}
                    >
                        {tab}
                    </Link>
                ))}
            </div>

            {/* NAVBAR LOGIN & LOGOUT BUTTONS */}
            <div className="w-44 h-[10vh] flex items-center justify-around">
                {buttons.map((button, buttonIndex) => (
                    <AuthButton key={buttonIndex} buttonName={`${button}`} onCLick={handleClick}>
                        {button}
                    </AuthButton>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
