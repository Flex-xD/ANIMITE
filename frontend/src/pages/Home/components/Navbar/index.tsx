import { useState, useEffect } from "react";
import { AuthButton, ProfileButton } from "../../../../Built Components";
import { buttons, tabs } from "../../../../constants/tabs/index";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../../../../store";
import { apiClient } from "../../../../lib/axios";
import { LOGOUT_ROUTE } from "../../../../constants/constants";
import { toast } from "sonner";
import { AxiosError } from "axios";


const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const isAuthenticated = useAppStore((state) => state.isAuthenticated);
    const navigate = useNavigate();


    const logout = async () => {
        try {
            const response = await apiClient.post(LOGOUT_ROUTE);
            if (response.status === 200) {
                useAppStore.setState({ isAuthenticated: false });
                useAppStore.setState({ userInfo: null })
                toast.success(response.data.msg);
                setTimeout(() => {
                    navigate("/auth")
                }, 300)
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log({ error });
                if (error.response || error.response!.data.msg) {
                    return toast.success(error.response?.data.msg);
                } else {
                    toast.error("Something went wrong , please try again later");
                }
            }
        }
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
                    <ProfileButton buttonName={`${isAuthenticated ? "PROFILE" : "CREATE PROFILE"}`} />

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
                        className={`
            relative cursor-pointer font-raleway font-bold 
            transition-all duration-300 
            ${isScrolled ? "text-[clamp(15px,9vw,14px)]" : "text-lg"}
            
            /* Base text styling */
            text-[#B8CFFF] hover:text-white
            
            /* Hover animation parent */
            group
        `}
                    >
                        <span className="relative z-10 block px-2 py-1">
                            {tab}
                        </span>

                        <span className="
            absolute bottom-0 left-0 h-0.5 w-0 
            bg-gradient-to-r from-[#00F0FF] to-[#5773FF]
            transition-all duration-300 
            group-hover:w-full
        "/>

                        <span className="
            absolute inset-0 rounded-md 
            bg-[#1E3A8A]/0 
            transition-all duration-500
            group-hover:bg-[#1E3A8A]/20
        "/>
                    </Link>
                ))}
            </div>

            {/* NAVBAR AUTH BUTTON */}
            <div className="w-44 h-[10vh] flex items-center justify-around">
                {buttons.map((button, buttonIndex) => (
                    <AuthButton key={buttonIndex} buttonName={`${isAuthenticated ? "LOGOUT" : button}`} onClick={handleClick}>
                        {button}
                    </AuthButton>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
