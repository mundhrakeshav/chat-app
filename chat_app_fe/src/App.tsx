import { ChakraProvider,Flex,theme } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import ChatsPage from "./pages/chats"
import "./App.css";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
export const App = () => (
	<ChakraProvider theme={theme}>
		<Flex h="30px" justifyContent="flex-end" maxW="1100px" m="auto"> <ColorModeSwitcher/> </Flex>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/chats" element={<ChatsPage />} />
			</Routes>
		</BrowserRouter>
	</ChakraProvider>
)
