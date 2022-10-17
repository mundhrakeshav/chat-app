import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendInstance } from "../../config/backend";
import { cloudinaryInstance } from "../../config/cloudinary";

const SignUp = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [picture, setPicture] = useState<File | null>();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password) {
            toast({
                title: "Fill all the required blocks",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-right"
            });
        }
        try {
            const res = await backendInstance.post("/api/user/register", { name, email, password, picture })
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            navigate("/chats")
        } catch (error) {
            return toast({
                title: `Error in call ${error}`,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-right"
            });
        } finally {
            setLoading(false)
        }
    }

    const postPicture = async (picture: File) => {
        setLoading(true)
        if (picture == null) {
            toast({
                title: "No image selected",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom-right"
            });
            setLoading(false)    
            return;
        }
        const formData = new FormData();
        formData.append("file", picture);
        formData.append("upload_preset", "chat-app");
        const response = await cloudinaryInstance.post("/", formData)
        setPicture(response.data.url);
        setLoading(false)
    }

    return (
        <VStack spacing="5px" bg="whiteAlpha.100" p="20px 50px" borderRadius="lg">
            <FormControl isRequired>
                <FormLabel>
                    Name
                </FormLabel>
                <Input placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
            </FormControl>
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
                        <Button size="sm" h="2rem" onClick={()=>setShow(!show)}>
                            {show ? "Show" : "Hide"}
                        </Button>
                    </InputRightElement>
            </InputGroup>
            </FormControl>
            <FormControl>
                <FormLabel>
                    Upload a picture
                </FormLabel>
                <Input type="file" accept="image/*" onChange={(e) => postPicture(e.target.files![0])} border="hidden" />
            </FormControl>
            <Button colorScheme="blue" style={{margin: "40px"}} w="100%" onClick={submitHandler} isLoading={loading}>
                Sign Up!
            </Button>
        </VStack>
    );
}

export default SignUp;