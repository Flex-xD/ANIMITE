import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button"
import { IAuthButton, IProfileButton } from "../constants/types"

export const AuthButton = ({ buttonName, className }: IAuthButton) => {
    return (
        <Button className={`h-[6vh] w-36 w-max-24 rounded-3xl bg-gradient-to-b from-[#00bfff] to-[#b20bff] font-exo font-bold text-[#FFFFFF] text-xs ${className}`}>
            <span>
                {buttonName}
            </span>
        </Button>
    )
}

export const ProfileButton = ({ buttonName }: IProfileButton) => {
    return (
        <div className="flex items-center h-12 w-36 overflow-hidden rounded-full bg-gradient-to-b from-[rgba(47,0,255,0.69)] to-[rgba(255,0,255,0.69)] shadow-2xl boder-[0.1px] border-white">
            <AuthButton
                className="h-full flex-1 rounded-none border-r-0 bg-transparent pr-2"
                buttonName={buttonName}
            />
            <div className="h-full flex items-center justify-center w-12 pr-4">
                <Avatar className="h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>PFP</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};