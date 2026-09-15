import { io } from "socket.io-client";
//#region src/socket.ts
var socket;
function getSocket() {
	if (!socket) socket = io("http://localhost:3001");
	return socket;
}
//#endregion
export { getSocket as t };
