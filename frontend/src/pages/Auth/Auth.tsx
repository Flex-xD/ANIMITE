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
import { motion } from "framer-motion";



const Auth = () => {
    const navigate = useNavigate();
    const { setUserInfo , setIsAuthenticated } = useAppStore();
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
            setUserInfo(response.data.user);
            setIsAuthenticated(true);
            console.log({ response });
            setTimeout(() => {
                navigate("/profile");
            }, 100); 
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
    // Theme Colors from ProfilePage
    const colors = {
        bgDark: "bg-[#150028]",
        bgGradient: "bg-gradient-to-br from-[#0d001a] via-[#1a0033] to-[#2a004d]",
        borderNeon: "border-[#6b00ff]/30",
        textNeon: "text-[#d4bfff]",
        accentPurple: "bg-[#6b00ff]",
        accentPink: "bg-[#ff00cc]",
        glowPurple: "shadow-[#6b00ff]/40",
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className={`flex items-center justify-center min-h-screen ${colors.bgGradient} text-white overflow-hidden`}
        >
            <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative w-[420px] ${colors.bgDark}/95 backdrop-blur-xl ${colors.borderNeon} rounded-xl p-8 shadow-2xl ${colors.glowPurple} transform hover:scale-[1.02] transition-all duration-500`}
            >
                {/* Glowing Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6b00ff]/20 to-[#ff00cc]/20 opacity-40 blur-3xl animate-pulse" />

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative z-10 text-center mb-8"
                >
                    <h1 className={`text-4xl font-bold ${colors.textNeon} tracking-wider neon-text`}>
                        Animite
                    </h1>
                    <p className="text-sm text-[#d4bfff]/60 mt-2">
                        Join the ultimate anime universe
                    </p>
                </motion.div>

                {/* Tabs */}
                <Tabs defaultValue="login" className="relative z-10">
                    <TabsList className="grid grid-cols-2 gap-4 mb-8 bg-transparent">
                        <TabsTrigger
                            value="login"
                            className={`py-2 px-4 ${colors.bgDark}/50 ${colors.borderNeon} ${colors.textNeon} rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6b00ff] data-[state=active]:to-[#ff00cc] data-[state=active]:text-white data-[state=active]:${colors.glowPurple} hover:bg-[#6b00ff]/20 transition-all duration-300`}
                        >
                            Login
                        </TabsTrigger>
                        <TabsTrigger
                            value="signup"
                            className={`py-2 px-4 ${colors.bgDark}/50 ${colors.borderNeon} ${colors.textNeon} rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6b00ff] data-[state=active]:to-[#ff00cc] data-[state=active]:text-white data-[state=active]:${colors.glowPurple} hover:bg-[#6b00ff]/20 transition-all duration-300`}
                        >
                            Sign Up
                        </TabsTrigger>
                    </TabsList>

                    {/* Login Tab */}
                    <TabsContent value="login" className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <Input
                                className={`${colors.bgDark}/70 ${colors.borderNeon} ${colors.textNeon} placeholder:text-[#d4bfff]/50 focus:border-[#6b00ff] focus:ring-2 focus:ring-[#6b00ff]/50 rounded-md transition-all duration-300 hover:bg-[#21003d]/80`}
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={handleChange(setEmail)}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <Input
                                className={`${colors.bgDark}/70 ${colors.borderNeon} ${colors.textNeon} placeholder:text-[#d4bfff]/50 focus:border-[#6b00ff] focus:ring-2 focus:ring-[#6b00ff]/50 rounded-md transition-all duration-300 hover:bg-[#21003d]/80`}
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={handleChange(setPassword)}
                            />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <Button
                                className={`w-full bg-gradient-to-r from-[#6b00ff] to-[#ff00cc] text-white font-semibold rounded-md hover:from-[#7b00ff] hover:to-[#ff33cc] hover:${colors.glowPurple} transition-all duration-300`}
                                onClick={() => handleAuth(false)}
                            >
                                Login
                            </Button>
                        </motion.div>
                    </TabsContent>

                    {/* Sign Up Tab */}
                    <TabsContent value="signup" className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <Input
                                className={`${colors.bgDark}/70 ${colors.borderNeon} ${colors.textNeon} placeholder:text-[#d4bfff]/50 focus:border-[#6b00ff] focus:ring-2 focus:ring-[#6b00ff]/50 rounded-md transition-all duration-300 hover:bg-[#21003d]/80`}
                                placeholder="Username"
                                value={username}
                                onChange={handleChange(setUsername)}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <Input
                                className={`${colors.bgDark}/70 ${colors.borderNeon} ${colors.textNeon} placeholder:text-[#d4bfff]/50 focus:border-[#6b00ff] focus:ring-2 focus:ring-[#6b00ff]/50 rounded-md transition-all duration-300 hover:bg-[#21003d]/80`}
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={handleChange(setEmail)}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <Input
                                className={`${colors.bgDark}/70 ${colors.borderNeon} ${colors.textNeon} placeholder:text-[#d4bfff]/50 focus:border-[#6b00ff] focus:ring-2 focus:ring-[#6b00ff]/50 rounded-md transition-all duration-300 hover:bg-[#21003d]/80`}
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={handleChange(setPassword)}
                            />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <Button
                                className={`w-full bg-gradient-to-r from-[#6b00ff] to-[#ff00cc] text-white font-semibold rounded-md hover:from-[#7b00ff] hover:to-[#ff33cc] hover:${colors.glowPurple} transition-all duration-300`}
                                onClick={() => handleAuth(true)}
                            >
                                Sign Up
                            </Button>
                        </motion.div>
                    </TabsContent>
                </Tabs>

                {/* Footer Text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="relative z-10 text-center text-sm text-[#d4bfff]/50 mt-6"
                >
                    Share, connect, and conquer the anime multiverse
                </motion.p>
            </motion.div>

            {/* Tailwind Animation Styles */}
            <style>{`
        .neon-text {
          text-shadow: 0 0 5px rgba(107, 0, 255, 0.8), 0 0 10px rgba(255, 0, 204, 0.6);
        }
      `}</style>
        </motion.div>
    );
};

export default Auth;