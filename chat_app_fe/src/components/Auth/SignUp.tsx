import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import { useState } from "react";

const SignUp = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [picture, setPicture] = useState<File | null>();
    const [show, setShow] = useState(false);
    
    const submitHandler = () => {
        console.log(name, email, password, picture);
        
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
                <Input type="file" accept="image/*" onChange={(e) => setPicture(e.target.files ? e.target.files[0]: null)} border="hidden" />
            </FormControl>
            <Button colorScheme="blue" style={{margin: "40px"}} w="100%" onClick={submitHandler}>
                Sign Up!
            </Button>
        </VStack>
    );
}

export default SignUp;