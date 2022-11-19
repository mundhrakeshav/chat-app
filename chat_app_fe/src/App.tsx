import { ChakraProvider, Flex, theme } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import ChatsPage from "./pages/chats"
import "./App.css";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import ChatProvider from "./Context/chatContext";
export const App = () => (
	<BrowserRouter>
		<ChakraProvider theme={theme}>
			<ChatProvider>
				<Flex h="30px" justifyContent="flex-end" maxW="1100px" m="auto"> <ColorModeSwitcher /> </Flex>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/chats" element={<ChatsPage />}  />
				</Routes>
			</ChatProvider>
		</ChakraProvider>
	</BrowserRouter>
)
