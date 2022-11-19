import { Box, Flex } from "@chakra-ui/react";
import ChatBox from "../components/Auth/ChatBox";
import MyChats from "../components/Auth/MyChats";
import SideDrawer from "../components/SideDrawer";
import { ChatState, ChatContextType } from "../Context/chatContext";

const ChatsPage = () => {
    const { user } = (ChatState() as ChatContextType)
    return (<Box w="100%">
        {user && <SideDrawer/>}
        <Flex justifyContent="space-between" w="100%" p="10px" h="90vh">
            {user && <MyChats/>}
            {user && <ChatBox/>}
        </Flex>
    </Box> );
}
 
export default ChatsPage;