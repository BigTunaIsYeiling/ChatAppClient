import { io } from "socket.io-client";

const URL = "https://chatbtserver.onrender.com";

export const socket = io(URL);
