import { useState } from "react";
import { apiClient } from "../../lib/axios";
import { REGISTER_URL } from "../../constants/constants";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Input } from "../../components/ui/input";


function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSignup = async () => {
        const response = await apiClient.post(REGISTER_URL, {
            email,
            username,
            password
        });
        if (response) {
        }
    }

    const handleLogin = async () => {

    }

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
                                type="email"
                                className="rounded-full p-4 mt-5 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                placeholder="Password"
                                type="password"
                                className="rounded-full p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button className="rounded-full p-6 bg-gradient-to-r from-green-500 to-blue-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl" onClick={handleLogin}>Login</Button>

                        </TabsContent>
                        <TabsContent className="flex flex-col gap-5" value="signup">
                            <Input
                                placeholder="Email"
                                type="email"
                                className="rounded-full p-4 mt-5 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                placeholder="Username"
                                type="username"
                                className="rounded-full p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Input
                                placeholder="Password"
                                type="password"
                                className="rounded-full p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button className="rounded-full p-6 bg-gradient-to-r from-green-500 to-blue-500 shadow-xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl" onClick={handleSignup}>Signup</Button>
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
