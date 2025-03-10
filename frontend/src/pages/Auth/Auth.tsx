import { useState } from "react";
import { apiClient } from "../../lib/axios";
import { LOGIN_ROUTES, REGISTER_ROUTES } from "../../constants/constants";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store";
import { AxiosError } from "axios";

function Auth() {
    const navigate = useNavigate();
    const { setUserInfo } = useAppStore();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const validateAuth = (isSignup: boolean = false) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.length) {
            toast.error("Email is required");
            return false;
        }
        if (!emailPattern.test(email)) {
            toast.error("Follow the correct email pattern!");
            return false;
        }
        if (!password.length) {
            toast.error("Password is required!");
            return false;
        }
        if (isSignup && !username.length) {
            toast.error("Username is required!");
            return false;
        }
        return true;
    };

    const handleAuth = async (isSignup: boolean = false) => {
        if (!validateAuth(isSignup)) return;
        try {
            const endpoint = isSignup ? REGISTER_ROUTES : LOGIN_ROUTES;
            const payload = isSignup ? { email, username, password } : { email, password };

            const response = await apiClient.post(endpoint, payload);
            setUserInfo(response.data);
            console.log({ response });
            console.log(response);
            navigate("/profile");
            toast.success(`${isSignup ? "Signup" : "Login"} successful!`);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log({ error });
                return toast.error(`${isSignup ? "Signup" : "Login"} failed!`);
            } else {
                toast.error("An error occurred!");
            }
        }
    };

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => setter(e.target.value);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0d001a] via-[#1a0033] to-[#2a004d] text-white overflow-hidden">
            <div className="relative w-[420px] bg-[#150028]/95 backdrop-blur-xl border border-[#6b00ff]/30 rounded-xl p-8 shadow-2xl shadow-[#6b00ff]/40 transform hover:scale-[1.02] transition-all duration-500">
                {/* Subtle glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6b00ff]/10 to-[#ff00cc]/10 opacity-50 blur-3xl animate-pulse"></div>

                <Tabs defaultValue="login" className="relative z-10">
                    <TabsList className="grid grid-cols-2 gap-4 mb-8 bg-transparent">
                        <TabsTrigger 
                            value="login" 
                            className="py-2 px-4 bg-[#2a004d]/50 border border-[#6b00ff]/50 rounded-md text-[#d4bfff] data-[state=active]:bg-[#6b00ff] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#6b00ff]/50 transition-all duration-300 hover:bg-[#6b00ff]/20"
                        >
                            Login
                        </TabsTrigger>
                        <TabsTrigger 
                            value="signup" 
                            className="py-2 px-4 bg-[#2a004d]/50 border border-[#6b00ff]/50 rounded-md text-[#d4bfff] data-[state=active]:bg-[#6b00ff] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#6b00ff]/50 transition-all duration-300 hover:bg-[#6b00ff]/20"
                        >
                            Sign Up
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="space-y-4">
                        <Input 
                            className="bg-[#21003d]/70 border-[#6b00ff]/50 text-white placeholder:text-[#d4bfff]/50 focus:border-[#6b00ff] focus:ring-2 focus:ring-[#6b00ff]/50 rounded-md transition-all duration-300 hover:bg-[#21003d]" 
                            placeholder="Email" 
                            type="email" 
                            value={email} 
                            onChange={handleChange(setEmail)} 
                        />
                        <Input 
                            className="bg-[#21003d]/70 border-[#6b00ff]/50 text-white placeholder:text-[#d4bfff]/50 focus:border-[#6b00ff] focus:ring-2 focus:ring-[#6b00ff]/50 rounded-md transition-all duration-300 hover:bg-[#21003d]" 
                            placeholder="Password" 
                            type="password" 
                            value={password} 
                            onChange={handleChange(setPassword)} 
                        />
                        <Button 
                            className="w-full bg-gradient-to-r from-[#6b00ff] to-[#ff00cc] text-white font-semibold rounded-md hover:from-[#7b00ff] hover:to-[#ff33cc] hover:shadow-xl hover:shadow-[#6b00ff]/50 transition-all duration-300 transform hover:-translate-y-1" 
                            onClick={() => handleAuth(false)}
                        >
                            Login
                        </Button>
                    </TabsContent>

                    <TabsContent value="signup" className="space-y-4">
                        <Input 
                            className="bg-[#21003d]/70 border-[#6b00ff]/50 text-white placeholder:text-[#d4bfff]/50 focus:border-[#6b00ff] focus:ring-2 focus:ring-[#6b00ff]/50 rounded-md transition-all duration-300 hover:bg-[#21003d]" 
                            placeholder="Username" 
                            value={username} 
                            onChange={handleChange(setUsername)} 
                        />
                        <Input 
                            className="bg-[#21003d]/70 border-[#6b00ff]/50 text-white placeholder:text-[#d4bfff]/50 focus:border-[#6b00ff] focus:ring-2 focus:ring-[#6b00ff]/50 rounded-md transition-all duration-300 hover:bg-[#21003d]" 
                            placeholder="Email" 
                            type="email" 
                            value={email} 
                            onChange={handleChange(setEmail)} 
                        />
                        <Input 
                            className="bg-[#21003d]/70 border-[#6b00ff]/50 text-white placeholder:text-[#d4bfff]/50 focus:border-[#6b00ff] focus:ring-2 focus:ring-[#6b00ff]/50 rounded-md transition-all duration-300 hover:bg-[#21003d]" 
                            placeholder="Password" 
                            type="password" 
                            value={password} 
                            onChange={handleChange(setPassword)} 
                        />
                        <Button 
                            className="w-full bg-gradient-to-r from-[#6b00ff] to-[#ff00cc] text-white font-semibold rounded-md hover:from-[#7b00ff] hover:to-[#ff33cc] hover:shadow-xl hover:shadow-[#6b00ff]/50 transition-all duration-300 transform hover:-translate-y-1" 
                            onClick={() => handleAuth(true)}
                        >
                            Sign Up
                        </Button>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default Auth;