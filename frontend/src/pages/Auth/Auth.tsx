import { useState } from "react";
import { apiClient } from "../../lib/axios";
import { LOGIN_ROUTES, REGISTER_ROUTES } from "../../constants/constants";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Input } from "../../components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

function Auth() {
    const navigate = useNavigate();
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
            console.log(response);
            navigate("/profile");
            toast.success(`${isSignup ? "Signup" : "Login"} successful !`);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log({ error });
                return toast.error(`${isSignup ? "Signup" : "Login"} failed !`);
            } else {
                toast.error("An error occured !");
            }
        }
    }

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => setter(e.target.value);

    return (
        <div className="h-[100vh] w-[100vw] flex justify-center items-center">

            <div className="h-[100vh] w-[50vw] flex flex-col justify-center items-center bg-gradient-to-r from-blue-200 via-green-200 to-cyan-200 bg-animated-gradient">
                <div className="h-[20vh] w-[90%] flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600 font-[Poppins]">REGISTER AND BECOME ONE 
                        OF US !</h1>
                        <p className="text-center text-balance font-medium text-gray-700 text-sm">
                            Join our community and explore the world of anime with us. Sign up today and start your journey!
                        </p>
                </div>
                <div className="w-[64%] h-[60%] bg-gradient-to-r from-cyan-200 via-green-200 to-blue-200 bg-animated-gradient rounded-lg flex flex-col justify-center items-center shadow-2xl">
                    <Tabs className="w-3/4" defaultValue="login">
                        <TabsList className="bg-transparent rounded-none w-full">
                            <TabsTrigger value="login" className="data-[state=active]:bg-blue text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-blue-500 p-3 transition-all duration-300 shadow-xl">Login</TabsTrigger>
                            <TabsTrigger value="signup" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-blue-500 p-3 transition-all duration-300 shadow-xl">Signup</TabsTrigger>
                        </TabsList>
                        <TabsContent className="flex flex-col gap-5 mt-2" value="login">
                            <Input
                                placeholder="Email"
                                name="email"
                                type="email"
                                className="rounded-full p-4 mt-5 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                                value={email}
                                onChange={handleChange(setEmail)}
                            />
                            <Input
                                placeholder="Password"
                                name="password"
                                type="password"
                                className="rounded-full p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                                value={password}
                                onChange={handleChange(setPassword)}
                            />
                            <Button className="rounded-full p-6 bg-gradient-to-r from-green-500 to-blue-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl" onClick={() => handleAuth(false)}>LOGIN</Button>

                        </TabsContent>
                        <TabsContent className="flex flex-col gap-5" value="signup">
                            <Input
                                placeholder="Email"
                                type="email"
                                name="email"
                                className="rounded-full p-4 mt-5 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                                value={email}
                                onChange={handleChange(setEmail)}
                            />
                            <Input
                                placeholder="Username"
                                type="text"
                                name="username"
                                className="rounded-full p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                                value={username}
                                onChange={handleChange(setUsername)}
                            />
                            <Input
                                placeholder="Password"
                                type="password"
                                name="password"
                                className="rounded-full p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                                value={password}
                                onChange={handleChange(setPassword)}
                            />
                            <Button className="rounded-full p-6 bg-gradient-to-r from-green-500 to-blue-500 shadow-xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl" onClick={() => handleAuth(true)}>REGISTER</Button>
                        </TabsContent>
                    </Tabs>

                </div>
            </div>

            <div className="h-[100vh] w-[50vw] flex flex-col justify-center items-center">
                <div className="h-full w-full border-2 border-black flex flex-col items-center justify-center bg-gradient-to-r from-red-200 via-green-100 to-purple-200 bg-animated-gradient">
                    <div className="h-[27vh] w-[23vw] flex flex-col items-center justify-center border border-black bg-white">
                        LOGO
                    </div>
                    <h1 className="text-3xl font-bold">HEADING ....</h1>
                    <p className="text-balance text-center">Welcome to our platform! Experience seamless authentication and enjoy our services.
                        Join us today and be part of our community.</p>
                </div>
                <div className="h-full w-full border-2 border-black flex items-center justify-center bg-gradient-to-r from-purple-200 via-red-100 to-green-200 bg-animated-gradient">
                    <div className="h-[43vh] w-[46vw] border border-black">
                        <div className="h-full w-full flex justify-center items-center p-5 text-center bg-white">
                            Changing Images with changing Intervals and anime fact , quotes or news in between 
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Auth;