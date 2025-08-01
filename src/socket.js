import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); //  puerto del backend
export default socket;
