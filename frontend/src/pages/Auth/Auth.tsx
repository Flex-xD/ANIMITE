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

    const handleSignUp = async () => {
        const response = await apiClient.post(REGISTER_URL, {
            email,
            username,
            password
        });
        if (response) {
        }
    }

    return (
        <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-gray-300">

            <div className="h-[100vh] w-[50vw] flex justify-center items-center bg-gradient-to-r from-blue-400 to-green-400">
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="register">Register</TabsTrigger>
                        <TabsTrigger value="signup">Signup</TabsTrigger>
                    </TabsList>
                    <TabsContent value="register">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="username"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={handleSignUp}>
                            Submit
                        </Button>
                    </TabsContent>
                    <TabsContent value="signup">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={handleSignUp}>
                            Submit
                        </Button>
                    </TabsContent>
                </Tabs>

            </div>

            <div className="h-[100vh] w-[50vw] bg-gradient-to-tr from-cyan-400 to-green-300">

            </div>

        </div>
    )
}

export default Auth;
