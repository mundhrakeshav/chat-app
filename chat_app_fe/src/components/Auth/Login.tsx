import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendInstance } from "../../config/backend";

const Login = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            setLoading(false)
            return toast({
            title: "Fill all the required blocks",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-right"
            });
        }
        try {
            const response = await backendInstance.post("/api/user/login", { email, password });
            localStorage.setItem("userInfo", JSON.stringify(response.data));
                        navigate("/chats");
        } catch (error) {
            return toast({
                title: `Error in call ${error}`,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-right"
            });
        } finally {
            setLoading(false);
        }
}        

    return (
        <VStack spacing="5px" bg="whiteAlpha.100" p="20px 50px" borderRadius="lg">
            <FormControl isRequired>
                <FormLabel>
                    Email
                </FormLabel>
                <Input placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>
                    Password
                </FormLabel>
                <InputGroup>
                    <Input placeholder="Enter your password" type={show ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement>
                        <Button size="sm" h="2rem" onClick={() => setShow(!show)}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button colorScheme="blue" style={{ margin: "40px" }} w="100%" onClick={submitHandler} isLoading={loading}>
                Login
            </Button>
        </VStack>
    );
}

export default Login;