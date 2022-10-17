import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";

const HomePage = () => {
    return (
        <Container maxW="50%" p="0" centerContent>
            <Box display="flex" justifyContent="center" bg="whiteAlpha.900" w="100%" p="3" borderRadius="lg" m="40px 0 15px 0">
                <Text fontSize="4xl" fontFamily="Roboto Flex" color="black" fontWeight="bold">Chat App</Text>
            </Box>
            <Box w="100%">
                <Tabs isFitted variant='enclosed'>
                    <TabList mb='1em'>
                        <Tab>Login</Tab>
                        <Tab>Register</Tab>
                    </TabList>
                    <TabPanels >
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <SignUp />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
}

export default HomePage;