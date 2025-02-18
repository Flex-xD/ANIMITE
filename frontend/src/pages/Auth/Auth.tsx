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

    const handleChange = (setter:React.Dispatch<React.SetStateAction<string>>) => (
        e:React.ChangeEvent<HTMLInputElement>
    ) => setter(e.target.value);

    return (
        <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-gray-300">

            <div className="h-[100vh] w-[50vw] flex justify-center items-center bg-gradient-to-r from-blue-200 to-green-200">
                <div className="w-[64%] h-[60%] bg-gradient-to-t from-cyan-100 to-blue-100 rounded-lg flex flex-col justify-center items-center shadow-2xl">
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

            <div className="h-[100vh] w-[50vw] bg-gradient-to-r from-cyan-300 to-green-300">

            </div>

        </div>
    )
}

export default Auth;