import { createContext, useContext, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";


export interface IChat {
    children: React.ReactNode;
}
export type ChatContextType = {
    user: any
    chats: any,
    selectedChat: any,
    logout: Function,
    setChats: Function,
    setSelectedChat: Function
};
const ChatContext = createContext<ChatContextType | null>(null);

const ChatProvider: React.FC<IChat> = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState();
    const [user, setUser] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState();
    const navigate = useNavigate();

    useEffect(() => {        
        const userInfo = JSON.parse(localStorage.getItem("userInfo") as string)
        setUser(userInfo);
        if (!userInfo) {
            navigate("/")
        }
    }, []);

    function logout() {
        localStorage.removeItem("userInfo")
    }

    return (
        <ChatContext.Provider value={{ user, logout, chats, selectedChat, setChats, setSelectedChat }}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = (): ChatContextType | null => {
    return useContext(ChatContext);
}

export default ChatProvider;