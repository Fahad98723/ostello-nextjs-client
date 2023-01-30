import { createContext } from "react";
import { io } from "socket.io-client";

export let socket = io("https://api.ostello.co.in", {
  upgrade: false,
  maxHttpBufferSize: 1e6,
  transports: ["websocket"],
});

export const SocketContext = createContext(socket);
