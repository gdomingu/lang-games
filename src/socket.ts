import {io, type Socket} from "socket.io-client";

let socket: Socket | undefined;

export function getSocket() {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3001");
  }
  return socket;
}