import { Avatar, Box, Button, Divider, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Icon, IconButton, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spacer, Spinner, Text, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { FaBell, FaChevronCircleDown, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { backendInstance } from "../config/backend";
import { ChatContextType, ChatState } from "../Context/chatContext";

const SideDrawer = () => {
    const [search, setSearch] = useState<string>("");
    const [searchResult, setSearchResult] = useState<Array<string>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingChat, setLoadingChat] = useState<boolean>(false);
    const { user, logout, chats, setChats, setSelectedChat } = (ChatState() as ChatContextType);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await backendInstance.get(`http://localhost:3001/api/user?search=${search}`, config);
            console.log(data);
            setLoading(false);

            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const accessChat = async (userId: string) => {

        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await backendInstance.post(`/api/chat`, { userID: userId }, config);
                
            if (!chats.find((c:any) => c._id === data._id))
            setChats([data, ...chats]);
            console.log([data, ...chats]);
                
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                // description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    return (<>
        <Flex justifyContent="space-between" color="blackAlpha.900" alignItems="center" bg="white" w="100%" p="5px 10px 10px 10px" borderWidth="5px" >
            <Tooltip label="Search Users" hasArrow placement="bottom-end" >
                <Button leftIcon={<FaSearch />} onClick={onOpen}>
                    <Text display={{ base: "none", md: "flex" }}>Search</Text>
                </Button>
            </Tooltip>
            <Text fontSize="3xl">Chat</Text>
            <Flex>
                <IconButton aria-label="Notification">
                    <FaBell size="20px" />
                </IconButton>
                <Menu>
                    <MenuButton as="button" aria-label="User">
                        <Avatar size="md" cursor="pointer" name="KM" src={user.picture} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            My Profile
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={() => {
                            logout()
                            navigate("/")
                        }}>
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>
                    <Flex>
                        <Input placeholder="Search by name or email" onChange={(e) => { setSearch(e.target.value) }} />
                        <IconButton aria-label="search" icon={<FaSearch />} onClick={handleSearch}></IconButton>
                    </Flex>
                </DrawerHeader>
                <DrawerBody>
                    {loading ? <Spinner /> : (searchResult as Array<any>).map((_user) => {
                        return <Box key={_user.id} onClick={() => { accessChat(_user.id) }}>{_user.name}</Box>
                    })}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
    );
}

export default SideDrawer;