import { io } from "socket.io-client";

const URL = "https://chatbt-production.up.railway.app";

export const socket = io(URL);
